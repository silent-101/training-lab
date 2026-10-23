import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/form")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<form method="post" action="/api/gameinfo">
				<label>
					Name:
					<input type="text" name="name" />
				</label>
				<br />
				<label>
					Category:
					<input type="text" name="category" />
				</label>
				<br />
				<label>
					Description:
					<textarea name="description"></textarea>
				</label>
				<br />
				<label>
					Image URL:
					<input type="file" name="image" />
				</label>
				<br />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
