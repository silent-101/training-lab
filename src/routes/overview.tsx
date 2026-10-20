import { createFileRoute } from "@tanstack/react-router";
import Overview from "#/components/overview";

export const Route = createFileRoute("/overview")({
	component: OverviewPage,
});

function OverviewPage() {
	return <Overview />;
}
