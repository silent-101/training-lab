import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/form")({
	component: RouteComponent,
});

async function getGameInfo() {
	const response = await fetch("/api/gameinfo");
	if (!response.ok) {
		throw new Error("Failed to fetch game info");
	}
	const data = await response.json();
	return data.gameInfo;
}
type GameInfo = {
	name: string;
	category: string;
	description: string;
	image: string;
};
function RouteComponent() {
	const [gameInfo, setGameInfo] = useState<GameInfo[]>([]);
	useEffect(() => {
		getGameInfo()
			.then((data) => setGameInfo(data))
			.catch((error) => console.error("Error fetching game info:", error));
	}, []);
	return (
		<div>
			<form method="post" action="/api/gameinfo" encType="multipart/form-data">
				<label>
					Name:
					<input type="text" name="name" />
				</label>
				<br />
				<label>
					Category:
					<input type="text" name="category" />
				</label>
				<br />
				<label>
					Description:
					<textarea name="description"></textarea>
				</label>
				<br />
				<label>
					Image:
					<input type="file" name="image" />
				</label>
				<br />
				<button type="submit">Submit</button>
			</form>

			<div>
				{/* Header */}
				<h2 className="font-mono text-xl font-bold border-b border-zinc-800 pb-2 mb-4 text-emerald-400">
					&gt; SYSTEM LOGS
				</h2>

				{/* Feed Container */}
				<div id="test-api-response" className="flex flex-col gap-3 font-mono">
					{gameInfo.map((info) => (
						<div
							key={info.name}
							className="flex gap-4 p-3 border border-zinc-800 bg-zinc-950 items-center rounded-sm"
						>
							{/* Thumbnail Preview */}
							{info.image && (
								<img
									src={info.image}
									alt={info.name}
									className="w-16 h-16 object-cover border border-zinc-700 bg-zinc-900 rounded-sm shrink-0"
								/>
							)}

							{/* Text Details */}
							<div className="flex-1 min-w-0">
								<div className="flex gap-2 items-center mb-1">
									<span className="font-bold text-zinc-400 text-sm">
										[{info.category || "GAME"}]
									</span>
									<h3 className="m-0 text-base font-semibold text-emerald-400 truncate">
										{info.name}
									</h3>
								</div>
								<p className="m-0 text-sm text-zinc-400 line-clamp-2">
									{info.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
