import { useState } from "react";

const actions = ["ANALYSE", "PHASE ANCHOR", "DEFEND", "SYNCHRONIZE"] as const;

type Action = (typeof actions)[number];

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="mt-5">
      <div className="mb-2 flex justify-between font-mono text-[10px] text-zinc-300">
        <span>{label}</span>
        <span>{value} / 100</span>
      </div>
      <div className="h-[6px] bg-[#34343a]">
        <div className="h-full bg-white" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function LiveDiagnostics() {
  const [selectedAction, setSelectedAction] = useState<Action>("ANALYSE");
  const [progress, setProgress] = useState(4);
  const [logs, setLogs] = useState<string[]>([
    "[01:00]  TARGET SCANNED.",
    "[01:01]  PHASE INSTABILITY DETECTED.",
    "[01:02]  Awaiting countermeasure selection.",
  ]);

  function chooseAction(action: Action) {
    const messages: Record<Action, string> = {
      ANALYSE: "Dimensional scan initiated.",
      "PHASE ANCHOR": "Phase anchor deployed.",
      DEFEND: "Defensive shield activated.",
      SYNCHRONIZE: "Baymax synchronizing with target.",
    };

    const time = new Date().toLocaleTimeString("en-GB", { hour12: false });
    setSelectedAction(action);
    setLogs((current) => [
      ...current.slice(-2),
      `[${time}]  ${messages[action]}`,
    ]);
  }

  return (
    <main className="mx-auto min-h-screen max-w-[1800px] px-4 py-7 text-[#f4f2f2] sm:px-7 lg:px-8">
      <header className="mb-4 flex items-center">
        <div
          className="flex h-12 w-[84px] items-center justify-center border-[7px] border-[#d71920] bg-[#f2f0f0]"
          aria-label="Baymax diagnostics logo"
        >
          <div className="h-3 w-[38px] border-x-[6px] border-b-[6px] border-[#171717]" />
        </div>

        <div className="ml-auto hidden items-center gap-2 font-mono text-[10px] tracking-widest text-zinc-500 sm:flex">
          <span className="h-2 w-2 rounded-full bg-red-600" />
          SYSTEM ONLINE
        </div>
      </header>

      <h1 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-[34px]">
        Live Diagnostics
      </h1>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_294px]">
        <section className="min-w-0">
          <div className="relative h-[280px] overflow-hidden rounded-[22px] bg-black sm:h-[390px] lg:h-[420px]">
            <div className="absolute inset-x-6 bottom-[10px] flex items-center gap-3">
              <span className="h-[9px] w-[9px] rounded-full bg-[#d20a0a]" />
              <input
                aria-label="Video progress"
                className="h-1 w-full cursor-pointer accent-red-600"
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(event) => setProgress(Number(event.target.value))}
              />
              <span className="whitespace-nowrap font-mono text-[8px] text-zinc-500">
                00:04 / 12:00
              </span>
            </div>
          </div>

          <div className="-mt-px flex min-h-[52px] items-center justify-between rounded-b-[22px] bg-[#121212] px-5 sm:px-6">
            <span className="text-sm font-light tracking-wide text-zinc-400">
              Phase Stalker Encounter
            </span>

            <div className="flex items-center gap-7 sm:gap-9">
              <button
                aria-label="Rewind"
                onClick={() => setProgress((value) => Math.max(0, value - 8))}
                className="text-2xl font-bold text-white hover:text-red-500"
              >
                ◀◀
              </button>
              <button
                aria-label="Play"
                className="text-2xl font-bold text-white hover:text-red-500"
              >
                ▶Ⅱ
              </button>
              <button
                aria-label="Forward"
                onClick={() => setProgress((value) => Math.min(100, value + 8))}
                className="text-2xl font-bold text-white hover:text-red-500"
              >
                ▶▶
              </button>
            </div>

            <span className="w-[110px]" />
          </div>

          <div className="mt-3 rounded-[22px] bg-[#121212] p-[18px]">
            <h2 className="mb-3 text-base font-bold">What should Baymax do?</h2>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {actions.map((action) => (
                <button
                  key={action}
                  onClick={() => chooseAction(action)}
                  className={`min-h-10 rounded-[11px] border px-2 text-[10px] font-extrabold tracking-wide ${
                    selectedAction === action
                      ? "border-red-600 bg-[#d20a0a] text-white"
                      : "border-[#252525] bg-[#141414] text-zinc-100 hover:border-zinc-500"
                  }`}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </section>

        <aside className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1">
          <section className="min-h-[174px] rounded-[22px] border-l-[3px] border-zinc-300 bg-[#121212] px-4 py-4">
            <h2 className="text-sm font-extrabold">Biometrics</h2>
            <Metric label="HIRO HEALTH" value={86} />
            <Metric label="BAYMAX SYSTEM INTEGRITY" value={94} />
          </section>

          <section className="min-h-[220px] rounded-[22px] border-l-[3px] border-zinc-300 bg-[#121212] px-4 py-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-extrabold">Analysis</h2>
              <span className="font-mono text-[9px] text-zinc-500">
                ENEMY: Phase Stalker
              </span>
            </div>
            <Metric label="ENEMY INTEGRITY" value={100} />
            <Metric label="RESONANCE STABILITY" value={24} />
            <Metric label="PHASE ALIGNMENT" value={81} />
          </section>

          <section className="min-h-[156px] rounded-[22px] border-l-[3px] border-[#d20a0a] bg-[#121212] px-4 py-4">
            <p className="mb-2 text-[9px] font-extrabold">CURRENT OBJECTIVE</p>
            <h2 className="mb-2 text-sm font-extrabold">
              Stabilise the dimensional anomaly.
            </h2>
            <p className="font-mono text-[10px] leading-relaxed text-zinc-400">
              All health and signal values are fictional simulation values.
            </p>
          </section>
        </aside>

        <section className="rounded-[22px] bg-[#121212] px-4 py-4 sm:col-span-2 sm:grid sm:grid-cols-[190px_1fr] sm:gap-5 sm:px-[18px]">
          <h2 className="mb-3 text-xs font-bold sm:mb-0">LOG</h2>
          <div className="space-y-2 font-mono text-[10px] leading-relaxed text-zinc-300">
            {logs.map((line, index) => (
              <p key={`${line}-${index}`}>{line}</p>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}