import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

type GameInfo = {
	_id?: string;
	name: string;
	category: string;
	description: string;
	image?: string;
};

export const Route = createFileRoute("/threats")({
	component: ThreatDatabasePage,
});

async function getGameInfo(): Promise<GameInfo[]> {
	const response = await fetch("/api/gameinfo");
	if (!response.ok) {
		throw new Error("Failed to fetch game info");
	}

	const data: { gameInfo?: GameInfo[] } = await response.json();
	if (!Array.isArray(data.gameInfo)) {
		throw new Error("Invalid game info response");
	}

	return data.gameInfo;
}

function ThreatDatabasePage() {
	const [gameInfo, setGameInfo] = useState<GameInfo[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let active = true;

		getGameInfo()
			.then((data) => {
				if (active) setGameInfo(data);
			})
			.catch((err: unknown) => {
				console.error("Error fetching game info:", err);
				if (active) setError("Unable to load database entries.");
			})
			.finally(() => {
				if (active) setLoading(false);
			});

		return () => {
			active = false;
		};
	}, []);

	return (
		<main className="flex-1 p-6 lg:p-8">
			{loading ? (
				<p className="font-mono text-sm text-zinc-400">Loading entries...</p>
			) : error ? (
				<p className="font-mono text-sm text-red-400">{error}</p>
			) : gameInfo.length === 0 ? (
				<p className="font-mono text-sm text-zinc-400">No entries found.</p>
			) : (
				<div className="flex flex-col gap-3 font-mono">
					{gameInfo.map((info, index) => (
						<div
							key={info._id ?? `${info.name}-${index}`}
							className="flex items-center gap-4 rounded-sm border border-zinc-800 bg-zinc-950 p-3"
						>
							{info.image && (
								<img
									src={info.image}
									alt={info.name}
									className="h-16 w-16 shrink-0 rounded-sm border border-zinc-700 bg-zinc-900 object-cover"
								/>
							)}

							<div className="min-w-0 flex-1">
								<div className="mb-1 flex items-center gap-2">
									<span className="text-sm font-bold text-zinc-400">
										[{info.category || "GAME"}]
									</span>
									<h3 className="m-0 truncate text-base font-semibold text-emerald-400">
										{info.name}
									</h3>
								</div>
								<p className="m-0 line-clamp-2 text-sm text-zinc-400">
									{info.description}
								</p>
							</div>
						</div>
					))}
				</div>
			)}
		</main>
	);
}
