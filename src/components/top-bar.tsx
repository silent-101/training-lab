import {
	ArrowDown01Icon,
	Notification01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function TopBar({ activeModel }: { activeModel: string }) {
	return (
		<header className="flex h-[72px] shrink-0 items-center justify-between border-b border-white/[0.07] px-6 lg:px-8">
			<div className="flex items-center gap-4">
				<span className="font-[family-name:var(--font-display)] text-[13px] font-bold uppercase tracking-[0.1em] text-white">
					The Reverie
				</span>
				<span className="flex items-center gap-2 rounded-[2px] border border-cyan-300/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-cyan-300">
					<span className="size-1.5 bg-cyan-300" />
					Online
				</span>
			</div>

			<div className="flex items-center gap-5">
				<div className="hidden font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500 sm:block">
					Active model <span className="mx-1">/</span>
					<span className="text-zinc-200">{activeModel}</span>
				</div>
				<button
					type="button"
					aria-label="Notifications"
					className="text-zinc-400 transition-colors hover:text-white"
				>
					<HugeiconsIcon icon={Notification01Icon} size={18} />
				</button>
				<span className="h-7 w-px bg-white/10" />
				<button type="button" className="flex items-center gap-3">
					<span className="grid size-8 place-items-center rounded-[2px] bg-cyan-300/10 font-mono text-[11px] text-cyan-300">
						OP
					</span>
					<span className="hidden font-mono text-[11px] uppercase tracking-[0.1em] text-zinc-200 sm:block">
						Operator
					</span>
					<HugeiconsIcon
						icon={ArrowDown01Icon}
						size={14}
						className="text-zinc-500"
					/>
				</button>
			</div>
		</header>
	);
}
