import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "#/components/section-page";

export const Route = createFileRoute("/arena")({
	component: SimulationArenaPage,
});

function SimulationArenaPage() {
	return (
		<SectionPage title="Simulation Arena" description="The simulation arena." />
	);
}
