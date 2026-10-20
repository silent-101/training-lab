import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "#/components/section-page";

export const Route = createFileRoute("/threats")({
	component: ThreatDatabasePage,
});

function ThreatDatabasePage() {
	return (
		<SectionPage title="Threat Database" description="The threat database." />
	);
}
