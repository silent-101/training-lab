import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/gameinfo")({
	server: {
		handlers: {
			GET: async () => {
				return new Response(
					JSON.stringify({
						health: 100,
					}),
					{
						headers: {
							"Content-Type": "application/json",
						},
					},
				);
			},
			POST: async ({ request }) => {
				const formData = await request.formData();
				const name = formData.get("name");
				const category = formData.get("category");
				const description = formData.get("description");
				const image = formData.get("image");
				return new Response(
					JSON.stringify({
						name,
						category,
						description,
						image,
					}),
					{
						headers: {
							"Content-Type": "application/json",
						},
					},
				);
			},
		},
	},
});
