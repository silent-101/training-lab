import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "#/components/section-page";

export const Route = createFileRoute("/journal")({
	component: JournalPage,
});

function JournalPage() {
	return <SectionPage title="Field Journal" description="The field journal." />;
}
