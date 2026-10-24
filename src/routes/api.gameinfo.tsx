import { GameInfoModel } from "#/server/db/schema.ts";
import { createFileRoute } from "@tanstack/react-router";
import mongoose from "mongoose";
import { connectDB } from "../server/db";

function json(data: unknown, status = 200) {
	return new Response(JSON.stringify(data), {
		status,
		headers: { "Content-Type": "application/json" },
	});
}

export const Route = createFileRoute("/api/gameinfo")({
	server: {
		handlers: {
			GET: async () => {
				try {
					await connectDB();
					const records = await GameInfoModel.find()
						.sort({ createdAt: -1 })
						.lean()
						.exec();

					// The database stores the GridFS file ID (or, for older entries,
					// the filename). The browser can request the actual image itself.
					const gameInfo = records.map((record) => {
						const storedImage = record.image;
						const image =
							storedImage &&
							!storedImage.startsWith("data:") &&
							!storedImage.startsWith("/") &&
							!storedImage.startsWith("http://") &&
							!storedImage.startsWith("https://")
								? `/api/file?fileId=${encodeURIComponent(storedImage)}`
								: storedImage;

						return { ...record, image };
					});

					return json({ gameInfo });
				} catch (error) {
					console.error("[api/gameinfo] GET error:", error);
					return json({ error: "Failed to load game info" }, 500);
				}
			},

			POST: async ({ request }) => {
				try {
					await connectDB();
					const formData = await request.formData();
					const name = formData.get("name");
					const category = formData.get("category");
					const description = formData.get("description");
					const image = formData.get("image");

					if (
						typeof name !== "string" || !name.trim() ||
						typeof category !== "string" || !category.trim() ||
						typeof description !== "string" || !description.trim()
					) {
						return json({ error: "Missing game info fields" }, 400);
					}
					if (!(image instanceof File) || image.size === 0 || !image.type.startsWith("image/")) {
						return json({ error: "A valid image file is required" }, 400);
					}

					const db = mongoose.connection.db;
					if (!db) throw new Error("Database connection unavailable");

					const bucket = new mongoose.mongo.GridFSBucket(db, {
						bucketName: "fs", // Same bucket used by /api/file
					});
					const fileName = `gameinfo-${crypto.randomUUID()}-${image.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
					const bytes = Buffer.from(await image.arrayBuffer());

					// Crucially, wait until GridFS confirms the entire file was saved.
					const fileId = await new Promise<string>((resolve, reject) => {
						const upload = bucket.openUploadStream(fileName, {
							metadata: { contentType: image.type, mimeType: image.type },
						});
						upload.once("error", reject);
						upload.once("finish", () => resolve(upload.id.toString()));
						upload.end(bytes);
					});

					const record = await GameInfoModel.create({
						name,
						category,
						description,
						image: fileId,
					});

					return json(
						{
							message: "Game info created successfully",
							id: record._id.toString(),
							image: `/api/file?fileId=${fileId}`,
						},
						201,
					);
				} catch (error) {
					console.error("[api/gameinfo] POST error:", error);
					return json({ error: "Failed to save game info or image" }, 500);
				}
			},
		},
	},
});
