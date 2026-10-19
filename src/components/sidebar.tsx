import {
	AiNetworkIcon,
	BookOpen01Icon,
	ChartLineData01Icon,
	DashboardSquare01Icon,
	Database01Icon,
	ScanIcon,
	Settings01Icon,
	Target01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "#/lib/utils.ts";

const NAV = [
	{
		id: "overview",
		label: "Overview",
		icon: DashboardSquare01Icon,
		to: "/overview",
	},
	{ id: "training", label: "Training Lab", icon: AiNetworkIcon, to: "/" },
	{
		id: "threats",
		label: "Threat Database",
		icon: Database01Icon,
		to: "/threats",
	},
	{ id: "live", label: "Live Diagnostics", icon: ScanIcon, to: "/live" },
	{ id: "arena", label: "Simulation Arena", icon: Target01Icon, to: "/arena" },
	{
		id: "eval",
		label: "Model Evaluation",
		icon: ChartLineData01Icon,
		to: "/evaluation",
	},
	{
		id: "journal",
		label: "Field Journal",
		icon: BookOpen01Icon,
		to: "/journal",
	},
	{ id: "settings", label: "Settings", icon: Settings01Icon, to: "/settings" },
];

export function Sidebar() {
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});

	return (
		<aside className="hidden w-53.75 shrink-0 flex-col border-r border-white/[0.07] bg-[#0c0d12] lg:flex">
			<div className="px-6 pb-6 pt-6">
				<div className="mb-3 flex items-center gap-2">
					<span className="size-1.75 rounded-full bg-white" />
					<span className="h-px w-4 bg-white" />
					<span className="size-xs rounded-full bg-white" />
				</div>
				<div className="text-[26px] font-bold leading-none tracking-tight text-white">
					BAYMAX
				</div>
				<div className="mt-3 font-mono text-[11px] tracking-[0.12em] text-[#ff3350]">
					{"// PROTOCOL"}
				</div>
			</div>

			<nav className="mt-2 flex flex-col gap-0.5">
				{NAV.map((item) => {
					const isActive = item.to === pathname;
					const className = cn(
						"group relative flex items-center gap-3 px-6 py-3 text-left text-[13px] transition-colors",
						isActive
							? "bg-[#ff3350]/10 font-semibold text-white"
							: "text-zinc-500 hover:text-zinc-200",
					);

					const content = (
						<>
							{isActive && (
								<span className="absolute inset-y-0 left-0 w-[3px] bg-[#ff3350]" />
							)}
							<HugeiconsIcon
								icon={item.icon}
								size={17}
								className={isActive ? "text-[#ff3350]" : undefined}
							/>
							<span className="flex-1">{item.label}</span>
						</>
					);

					return (
						<Link key={item.id} to={item.to} className={className}>
							{content}
						</Link>
					);
				})}
			</nav>

			<div className="mt-auto p-4">
				<div className="rounded-[3px] border border-indigo-400/30 bg-indigo-400/3 p-4">
					<div className="text-indigo-400">Sandbox Environment</div>
					<p className="mt-2 text-[12.5px] leading-relaxed text-zinc-300">
						Synthetic data. Fictional threats. Real learning.
					</p>
					<div className="mt-4 block">Build 0.9.4 / Reverie</div>
				</div>
			</div>
		</aside>
	);
}
