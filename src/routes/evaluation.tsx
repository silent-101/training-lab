import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "#/components/section-page";

export const Route = createFileRoute("/evaluation")({
	component: ModelEvaluationPage,
});

function ModelEvaluationPage() {
	return (
		<SectionPage
			title="Model Evaluation"
			description="The model evaluation page."
		/>
	);
}
