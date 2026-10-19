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
		</main>
	);
}
