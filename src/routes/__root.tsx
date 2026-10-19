import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Sidebar } from "../components/sidebar";
import { TopBar } from "../components/top-bar";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
	component: RootLayout,
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "BAYMAX // Protocol",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootLayout() {
	return (
		<div className="flex min-h-screen bg-[#0b0c10] text-zinc-200 antialiased [font-family:var(--font-sans,Inter,system-ui,sans-serif)]">
			<Sidebar />
			<div className="flex min-w-0 flex-1 flex-col">
				<TopBar activeModel="Model101" />
				<Outlet />
			</div>
		</div>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
