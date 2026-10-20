import { createFileRoute } from "@tanstack/react-router";
import Lab from "#/components/lab";

export const Route = createFileRoute("/lab")({
	component: LabPage,
});

function LabPage() {
	return <Lab />;
}
