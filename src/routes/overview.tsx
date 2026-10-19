import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "#/components/section-page";

export const Route = createFileRoute("/overview")({
	component: OverviewPage,
});

function OverviewPage() {
	return (
		<SectionPage
			title="Overview"
			description="The overview"
        />

	);
}
