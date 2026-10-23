import { GameInfoModel } from "#/server/db/schema.ts";
import { createFileRoute } from "@tanstack/react-router";
import { connectDB } from "../server/db";

export const Route = createFileRoute("/api/gameinfo")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				try {
					await connectDB();

					// 1. Fetch game records from the database
					const allGameInfo = await GameInfoModel.find()
						.sort({ createdAt: -1 })
						.exec();
					if (!allGameInfo || allGameInfo.length === 0) {
						return new Response(
							JSON.stringify({ error: "No game info found" }),
							{ status: 200, headers: { "Content-Type": "application/json" } },
						);
					}

					const url = new URL(request.url);

					// 2. Map arrays to explicit promises instead of using a broken forEach loop
					const updatedGameInfoPromises = allGameInfo.map(
						async (gameInfoDoc) => {
							// Convert the mongoose document to a plain object so we can mutate its fields cleanly
							const gameInfo = gameInfoDoc.toObject();

							if (!gameInfo.image) return gameInfo;

							try {
								const testApiUrl = `${url.origin}/api/file?fileId=${gameInfo.image}`;
								const res = await fetch(testApiUrl, { method: "GET" });

								if (res.ok) {
									// 3. Extract the image binary stream directly as an ArrayBuffer
									const arrayBuffer = await res.arrayBuffer();
									const buffer = Buffer.from(arrayBuffer);

									// 4. Capture the content-type header returned by your /api/file route
									const contentType =
										res.headers.get("Content-Type") || "image/jpeg";

									// 5. Build a server-safe Base64 Data URI string
									const base64Image = buffer.toString("base64");
									gameInfo.image = `data:${contentType};base64,${base64Image}`;
								} else {
									console.error(
										`Failed to fetch image for game info ${gameInfo._id}`,
									);
								}
							} catch (fetchError) {
								console.error(
									`Network error getting file asset for ${gameInfo._id}:`,
									fetchError,
								);
							}

							return gameInfo;
						},
					);

					// 6. Wait completely for all asynchronous fetch promises to settle concurrently
					const resolvedGameInfo = await Promise.all(updatedGameInfoPromises);

					return new Response(
						JSON.stringify({
							gameInfo: resolvedGameInfo,
						}),
						{
							headers: {
								"Content-Type": "application/json",
							},
						},
					);
				} catch (error) {
					console.error("Error in GET demo handler:", error);
					return new Response(
						JSON.stringify({ error: "Failed to fetch demo data" }),
						{ status: 500, headers: { "Content-Type": "application/json" } },
					);
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

					const url = new URL(request.url);
					const fileUploadUrl = `${url.origin}/api/file`;

					if (image instanceof File) {
						const fileFormData = new FormData();
						fileFormData.append("file", image);

						const fileUploadResponse = await fetch(fileUploadUrl, {
							method: "POST",
							body: fileFormData,
							headers: {
								Accept: "application/json",
							},
						});

						if (!fileUploadResponse.ok) {
							throw new Error(
								`File upload failed with status: ${fileUploadResponse.status}`,
							);
						}

						const fileUploadResult = (await fileUploadResponse.json()) as {
							filename: string;
						};
						const newInfo = await GameInfoModel.create({
							name: name as string,
							category: category as string,
							description: description as string,
							image: fileUploadResult.filename,
						});

						if (!newInfo) {
							return new Response(
								JSON.stringify({
									error: "Failed to create game info",
								}),
								{
									status: 500,
									headers: {
										"Content-Type": "application/json",
									},
								},
							);
						}

						return new Response(
							JSON.stringify({
								message: "Game info created successfully",
							}),
							{
								headers: {
									"Content-Type": "application/json",
								},
							},
						);
					} else {
						return new Response(
							JSON.stringify({
								error: "Image file is required",
							}),
							{
								status: 400,
								headers: {
									"Content-Type": "application/json",
								},
							},
						);
					}
				} catch (error) {
					console.error("Error creating game info:", error);
					return new Response(
						JSON.stringify({
							error: "Internal server error",
						}),
						{
							status: 500,
							headers: {
								"Content-Type": "application/json",
							},
						},
					);
				}
			},
		},
	},
});
