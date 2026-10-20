import { useState } from "react";

const actions = ["ANALYSE", "PHASE ANCHOR", "DEFEND", "SYNCHRONIZE"];

const readings: { title: string; note?: string; stats: [string, number][] }[] = [
  { title: "Biometrics", stats: [["HIRO HEALTH", 86], ["BAYMAX SYSTEM INTEGRITY", 94]] },
  {
    title: "Analysis",
    note: "ENEMY: Phase Stalker",
    stats: [["ENEMY INTEGRITY", 100], ["RESONANCE STABILITY", 24], ["PHASE ALIGNMENT", 81]],
  },
];

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="mt-5">
      <div className="mb-2 flex justify-between font-mono text-[10px] text-zinc-300">
        <span>{label}</span><span>{value} / 100</span>
      </div>
      <div className="h-1.5 bg-[#34343a]">
        <div className="h-full bg-white" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function LiveDiagnostics() {
  const [choice, setChoice] = useState(null);
  const [message, setMessage] = useState("");

  const chooseAction = (action: string) => {
    setChoice(action);
    setMessage(`${action.toLowerCase()} selected.`);
  };

  return (
    <main className="min-h-screen w-full px-6 py-7 text-[#f4f2f2] lg:px-10">
      <header className="mb-4 flex items-center">
        <div className="flex h-12 w-[84px] items-center justify-center border-[7px] border-red-600 bg-zinc-100">
          <div className="h-3 w-[38px] border-x-[6px] border-b-[6px] border-black" />
        </div>
        <span className="ml-auto font-mono text-[10px] text-zinc-500">● SYSTEM ONLINE</span>
      </header>

      <h1 className="mb-4 text-3xl font-extrabold sm:text-[34px]">Live Diagnostics</h1>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_294px]">
        <section>
          <div className="h-[280px] overflow-hidden rounded-[22px] bg-black sm:h-[390px] lg:h-[420px]">
      <iframe
  src="https://www.youtube.com/embed/8cPM8DaOSFk?autoplay=1&mute=1&loop=1&playlist=8cPM8DaOSFk&controls=0&playsinline=1"
  title="Phase Stalker video"
  className="h-full w-full"
  allow="autoplay; encrypted-media; picture-in-picture"
  allowFullScreen
/>
</div>

          <div className="mt-3 rounded-[22px] bg-[#121212] p-[18px]">
            <h2 className="mb-3 font-bold">What should Baymax do?</h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {actions.map((action) => (
                <button
                  key={action}
                  onClick={() => chooseAction(action)}
                  className={`min-h-10 rounded-xl border text-[10px] font-bold ${
                    choice === action
                      ? "border-red-600 bg-red-600"
                      : "border-[#252525] bg-[#141414] hover:border-zinc-500"
                  }`}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </section>

        <aside className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          {readings.map((card) => (
            <section key={card.title} className="rounded-[22px] border-l-[3px] border-zinc-300 bg-[#121212] p-4">
              <div className="flex justify-between gap-2">
                <h2 className="text-sm font-bold">{card.title}</h2>
                <span className="font-mono text-[9px] text-zinc-500">{card.note}</span>
              </div>
              {card.stats.map(([label, value]) => (
                <Metric key={label} label={label} value={value} />
              ))}
            </section>
          ))}

          <section className="rounded-[22px] border-l-[3px] border-red-600 bg-[#121212] p-4">
            <p className="mb-2 text-[9px] font-bold">CURRENT OBJECTIVE</p>
            <h2 className="mb-2 text-sm font-bold">Stabilise the dimensional anomaly.</h2>
            <p className="font-mono text-[10px] text-zinc-400">
              Make sure Baymax is in sync with the Phase Stalker to prevent it from escaping into the real world.
            </p>
          </section>
        </aside>

        <section className="rounded-[22px] bg-[#121212] p-4 sm:col-span-2 sm:grid sm:grid-cols-[190px_1fr]">
          <h2 className="mb-3 text-xs font-bold sm:mb-0">LOG</h2>
          <p className="font-mono text-[10px] text-zinc-300">[01:02] &nbsp; {message}</p>
        </section>
      </div>
    </main>
  );
}
