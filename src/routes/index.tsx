import { createFileRoute } from "@tanstack/react-router";
import TrainingLab from "#/components/lab.tsx";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return <TrainingLab />;
}
