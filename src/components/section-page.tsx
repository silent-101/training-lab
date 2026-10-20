export function SectionPage({
	title,
	description,
}: {
	title: string;
	description: string;
}) {
	return (
		<main className="flex-1 p-6 lg:p-8">
			<h1 className="text-2xl font-semibold text-white">{title}</h1>
			<p className="mt-2 text-sm text-zinc-400">{description}</p>
			<div className="mt-6 rounded-lg border border-zinc-800 bg-[#1f2024] p-6 text-sm text-zinc-400 col-end-3">
				<div></div>
			</div>
		</main>
	);
}
