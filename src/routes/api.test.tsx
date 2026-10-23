import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/test")({
	server: {
		handlers: {
			GET: async () => {
				return new Response(
					JSON.stringify({ message: "Hello from the test API!" }),
					{
						headers: { "Content-Type": "application/json" },
					},
				);
			},
		},
	},
});
