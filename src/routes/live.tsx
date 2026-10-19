import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "#/components/section-page";

export const Route = createFileRoute("/live")({
	component: LiveDiagnosticsPage,
});

function LiveDiagnosticsPage() {
	return (
		<SectionPage
			title="Live Diagnostics"
			description="The live."
		/>
	);
}
