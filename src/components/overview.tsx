const footage = [
  { id: "VID-0001", resonance: 24, phase: 81, memory: 67, energy: 72, stress: 88, threat: "Phase Distortion" },
  { id: "VID-0002", resonance: 76, phase: 35, memory: 28, energy: 44, stress: 62, threat: "Memory Echo" },
  { id: "VID-0003", resonance: 24, phase: 81, memory: 67, energy: 72, stress: 88, threat: "Phase Distortion" },
  { id: "VID-0004", resonance: 76, phase: 35, memory: 28, energy: 44, stress: 62, threat: "Memory Echo" },
  { id: "VID-0005", resonance: 24, phase: 81, memory: 67, energy: 72, stress: 88, threat: "Phase Distortion" },
  { id: "VID-0006", resonance: 76, phase: 35, memory: 28, energy: 44, stress: 62, threat: "Memory Echo" },
  { id: "VID-0007", resonance: 24, phase: 81, memory: 67, energy: 72, stress: 88, threat: "Phase Distortion" },
  { id: "VID-0008", resonance: 76, phase: 35, memory: 28, energy: 44, stress: 62, threat: "Memory Echo" },
];

const stats = [
  ["TRAINING SAMPLES", "1,200", "Recorded Footage"],
  ["THREAT CLASSES", "04", "Anomaly classes"],
  ["MODEL STATUS", "Untrained", "NOT TRAINED"],
  ["TEST PERFORMANCE", "—", "Awaiting evaluation"],
];

const features = [
  ["DATASET BUILDER", "▤", "Create synthetic encounters across four classes. Inspect the signals before you train.", "OPEN DATASET WORKSPACE", "dataset"],
  ["THREAT CLASSIFIER", "♧", "Select gameplay features and configure an interpretable threat-detection model.", "OPEN TRAINING WORKSPACE", "training"],
  ["COUNTERMEASURE ENGINE", "⊕", "Explore anomaly behaviour and test fictional countermeasures in the arena.", "OPEN DIAGNOSTICS", "diagnostics"],
];

function Panel({ children, className = "" }: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={`min-w-0 rounded-xl border border-[#373740] bg-[#121212] ${className}`}>{children}</section>;
}

export default function Overview() {
  const navigate = (action: string) => console.log("Navigate to:", action);

  return (
    <main className="mx-auto w-full min-w-0 max-w-[1800px] flex-1 px-4 py-4 text-[#f4f2f2] sm:px-7 lg:px-8">
      <header className="mb-3 flex items-center">
        <div aria-label="Baymax diagnostics logo" className="flex h-10 w-[72px] items-center justify-center border-[6px] border-[#d71920] bg-[#f2f0f0]">
          <div className="h-3 w-[38px] border-x-[6px] border-b-[6px] border-[#171717]" />
        </div>
      </header>

      <h1 className="mb-3 text-2xl font-extrabold sm:text-[30px]">Overview</h1>

      <Panel className="mb-3 grid grid-cols-2 gap-3 p-3 sm:grid-cols-4 sm:gap-5 sm:p-4">
        {stats.map(([label, value, detail]) => (
          <div key={label} className="min-w-0">
            <p className="text-[9px] font-extrabold text-[#9999ab]">{label}</p>
            <h2 className="mt-1 text-xl font-extrabold tracking-tight sm:text-2xl">{value}</h2>
            <p className="mt-1 text-[10px] font-bold text-[#9292a3]">{detail}</p>
          </div>
        ))}
      </Panel>

      <section className="mb-3 overflow-hidden rounded-[22px] border border-[#373740] bg-[#202020]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse text-left font-mono text-[11px]">
            <thead className="bg-[#202027] text-[#9999aa]">
              <tr>
                {["Footage ID", "Resonance Stability", "Phase Alignment", "Memory Coherence", "Energy Coupling", "Environmental Stress", "Threat Label"].map(h => (
                  <th key={h} className="whitespace-nowrap px-3 py-2.5 font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {footage.map(row => (
                <tr key={row.id} className="border-b border-[#373740] transition hover:bg-[#292929]">
                  {[row.id, row.resonance, row.phase, row.memory, row.energy, row.stress].map((v, i) => (
                    <td key={i} className="px-3 py-2">{v}</td>
                  ))}
                  <td className="whitespace-nowrap px-3 py-2 text-[#ff304d]">{row.threat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 p-3 sm:p-4">
          {[
            ["INITIALISE TRAINING", "training", "border-red-500 bg-[#a90015] hover:bg-red-700"],
            ["ENTER SIMULATION", "simulation", "border-[#373740] hover:border-red-500"],
          ].map(([label, action, style]) => (
            <button key={action} onClick={() => navigate(action)} className={`flex items-center gap-3 rounded-[10px] border px-4 py-2.5 text-[10px] font-extrabold ${style}`}>
              {label} <span>↗</span>
            </button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {features.map(([title, icon, description, button, action]) => (
          <Panel key={action} className="p-3 sm:p-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-extrabold">{title}</h2>
              <span className="text-xl text-[#ff304d]">{icon}</span>
            </div>
            <p className="mt-3 min-h-[42px] text-[13px] font-bold leading-[18px] text-[#9999ab]">{description}</p>
            <button onClick={() => navigate(action)} className="mt-3 w-full rounded-[10px] border border-[#373740] px-3 py-2.5 text-[10px] font-extrabold transition hover:border-red-500 hover:bg-[#1c1c1c]">
              {button}
            </button>
          </Panel>
        ))}
      </div>
    </main>
  );
}
