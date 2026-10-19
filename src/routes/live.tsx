import { createFileRoute } from "@tanstack/react-router";
import LiveDiagnostics from "#/components/LiveDiagnostics";

export const Route = createFileRoute("/live")({
	component: LiveDiagnosticsPage,
});

function LiveDiagnosticsPage() {
	return <LiveDiagnostics />;
}
