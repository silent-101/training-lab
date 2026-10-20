import { useState } from "react";

const skills = [
	"Resonance Stability",
	"Phase Alignment",
	"Memory Coherence",
	"Neural Synchronisation",
	"Energy Coupling",
	"Environmental Stress",
];
const footage = [
	{ id: "VID-0001", resonance: 24, alignment: 81 },
	{ id: "VID-0002", resonance: 76, alignment: 35 },
	{ id: "VID-0003", resonance: 24, alignment: 81 },
	{ id: "VID-0004", resonance: 76, alignment: 35 },
];
const models = ["Decision Tree", "Random Forest", "Rule-Based Baseline"];
const panel = "min-w-0 rounded-xl border border-[#373740] bg-[#121212]";
const label = "font-mono text-[9px] tracking-wide text-[#888899]";
const field =
	"mt-2 w-full border border-[#373740] bg-[#101014] px-2 py-2 text-xs outline-none focus:border-red-600";
const button =
	"border border-[#393942] px-2 py-2 text-[9px] hover:border-red-500";

function Panel({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return <section className={`${panel} ${className}`}>{children}</section>;
}

function Label({ children }: { children: React.ReactNode }) {
	return <div className={label}>{children}</div>;
}

export default function TrainingLab() {
	const [activePage] = useState("Training Lab");
	const [model, setModel] = useState("Random Forest");
	const [trees, setTrees] = useState(8);
	const [estimators, setEstimators] = useState(100);
	const [selected, setSelected] = useState("VID-0001");
	const [training, setTraining] = useState(false);
	const [logId, setLogId] = useState(1);
	const [logs, setLogs] = useState([
		{ id: 0, message: "Training system initialised." },
	]);

	const log = (message: string) => {
		const id = logId;
		setLogId(id + 1);
		setLogs((old) => [...old.slice(-3), { id, message }]);
	};

	const trainModel = () => {
		setTraining(true);
		log(
			`${new Date().toLocaleTimeString("en-GB")}  ${model} training initiated.`,
		);
	};

	return (
		<main className="mx-auto min-h-screen max-w-[1800px] px-4 py-7 text-[#f4f2f2] sm:px-7 lg:px-8">
			<header className="mb-4 flex items-center">
				<div
					role="img"
					aria-label="Baymax diagnostics logo"
					className="flex h-12 w-[84px] items-center justify-center border-[7px] border-[#d71920] bg-[#f2f0f0]"
				>
					<div className="h-3 w-[38px] border-x-[6px] border-b-[6px] border-[#171717]" />
				</div>
			</header>

			<h1 className="mb-4 text-3xl font-extrabold sm:text-[34px]">
				{activePage}
			</h1>
			<p className="my-2 text-sm font-bold text-[#9696a8]">
				Teach the system to recognise dimensional anomalies.
			</p>

			<Panel className="mb-4 grid grid-cols-1 items-center gap-6 p-5 sm:grid-cols-[1fr_2fr_auto]">
				<div>
					<h2 className="text-lg font-bold">REVERIE-SYNTHETIC-01</h2>
					<p className="mt-2 font-mono text-[9px] text-red-600">
						200 SAMPLES / 4 THREAT CLASSES
					</p>
				</div>
				<div>
					<div className="mb-2 flex justify-between gap-3">
						{["TRAIN 70% / 100", "VAL 15% / 100", "TEST 15% / 100"].map((x) => (
							<Label key={x}>{x}</Label>
						))}
					</div>
					<div className="flex h-[5px] overflow-hidden">
						<div className="w-[70%] bg-[#c90018]" />
						<div className="w-[15%] bg-[#8b6bff]" />
						<div className="w-[15%] bg-[#a00b20]" />
					</div>
					<p className="mt-3 font-mono text-[9px] text-[#858595]">
						STRATIFIED / SEED 42
					</p>
				</div>
				<button
					type="button"
					onClick={() => log("Dataset REVERIE-SYNTHETIC-01 selected.")}
					className="rounded-lg border border-[#393942] px-4 py-3 font-mono text-[10px] hover:border-red-500"
				>
					VIEW DATASET
				</button>
			</Panel>

			<div className="grid grid-cols-1 gap-4 xl:grid-cols-[0.85fr_1.15fr_1.25fr]">
				<Panel className="p-4">
					<div className="flex justify-between">
						<h2 className="text-sm font-extrabold">SKILLS ACQUIRED</h2>
						<Label>06 / 06</Label>
					</div>
					<div className="mt-4 space-y-3">
						{skills.map((skill) => (
							<label
								key={skill}
								className="flex items-center gap-2 text-xs text-[#969696]"
							>
								<input
									type="checkbox"
									defaultChecked
									className="h-[13px] w-[13px] accent-[#ff304d]"
								/>
								{skill}
							</label>
						))}
					</div>
				</Panel>

				<Panel className="flex min-h-[450px] flex-col overflow-hidden">
					<div className="flex justify-between px-4 py-5">
						<Label>
							<span className="text-red-700">RECORDED SUBJECT FEED</span>
						</Label>
						<Label>07:24:09</Label>
					</div>
					<div className="relative flex flex-1 items-center justify-center bg-[#111]">
						<div className="absolute inset-x-12 inset-y-8 flex items-center justify-center">
							<div className="relative h-full w-full max-h-[300px] max-w-[290px]">
								{[
									"left-0 top-0 border-l border-t",
									"right-0 top-0 border-r border-t",
									"bottom-0 left-0 border-b border-l",
									"bottom-0 right-0 border-b border-r",
								].map((pos) => (
									<div
										key={pos}
										className={`absolute h-9 w-9 ${pos} border-red-600`}
									/>
								))}
							</div>
						</div>
					</div>
					<div className="border-t border-[#373740] bg-[#101014] p-4">
						<h3 className="text-xs font-extrabold">TARGET: PHASE STALKER</h3>
						<p className="mt-2 text-[9px] text-[#707080]">
							CLASSIFICATION: DIMENSIONAL ANOMALY
						</p>
						<p className="mt-2 font-mono text-[9px] text-red-700">
							THREAT LEVEL: ELEVATED
						</p>
					</div>
				</Panel>

				<Panel className="overflow-hidden p-4">
					<div className="flex justify-between">
						<h2 className="text-sm font-extrabold">TRAINING CONFIGURATION</h2>
						<Label>RF-01</Label>
					</div>
					<div className="mt-4 flex flex-wrap gap-1.5">
						{models.map((name) => (
							<button
								type="button"
								key={name}
								onClick={() => setModel(name)}
								className={`${button} ${model === name ? "border-red-500 bg-[#b90016] text-white" : "text-[#9292a2]"}`}
							>
								{name}
							</button>
						))}
					</div>

					<div className="mt-5 grid grid-cols-2 gap-3">
						{[
							{ title: "MAXIMUM TREES", value: trees, set: setTrees, max: 100 },
							{
								title: "ESTIMATORS / RF ONLY",
								value: estimators,
								set: setEstimators,
								max: 1000,
							},
						].map((item, i) => (
							<label key={item.title}>
								<Label>{item.title}</Label>
								<input
									type="number"
									min="1"
									max={item.max}
									value={item.value}
									disabled={i === 1 && model !== "Random Forest"}
									onChange={(e) => item.set(Number(e.target.value))}
									className={`${field} disabled:opacity-40`}
								/>
							</label>
						))}
					</div>

					<div className="mt-4 flex justify-between border border-[#373740] px-2 py-2 font-mono text-[9px] text-[#9292a2]">
						<span>TRAIN / VAL / TEST</span>
						<span className="text-white">70% / 15% / 15%</span>
					</div>

					<div className="mt-4 overflow-x-auto">
						<table className="w-full min-w-[310px] border-collapse text-left font-mono text-[10px]">
							<thead className="bg-[#202027] text-[#9696a8]">
								<tr>
									{["Footage ID", "Resonance Stability", "Phase Alignment"].map(
										(x) => (
											<th key={x} className="px-2 py-4 font-normal">
												{x}
											</th>
										),
									)}
								</tr>
							</thead>
							<tbody>
								{footage.map((row) => (
									<tr
										key={row.id}
										onClick={() => setSelected(row.id)}
										className={`cursor-pointer border-b border-[#373740] ${selected === row.id ? "bg-[#a00012] text-white" : "bg-[#202020] hover:bg-[#303030]"}`}
									>
										{[
											{ key: "id", value: row.id },
											{ key: "resonance", value: row.resonance },
											{ key: "alignment", value: row.alignment },
										].map((cell) => (
											<td key={`${row.id}-${cell.key}`} className="px-2 py-3">
												{cell.value}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<button
						type="button"
						onClick={trainModel}
						disabled={training}
						className="mt-5 w-full rounded-[10px] border border-red-500 bg-[#a90015] py-3 font-mono text-[10px] font-bold hover:bg-red-700 disabled:opacity-60"
					>
						{training ? "TRAINING INITIATED" : "TRAIN BAYMAX"}
					</button>
				</Panel>
			</div>

			<Panel className="mt-4 p-4">
				<h2 className="mb-3 text-xs font-bold">SYSTEM LOG</h2>
				<div className="space-y-2 font-mono text-[10px] text-[#aaaabb]">
					{logs.map((entry) => (
						<p key={entry.id}>{entry.message}</p>
					))}
				</div>
			</Panel>
		</main>
	);
}
