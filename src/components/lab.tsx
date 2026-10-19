import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";

export default function TrainingLab() {
  return (
    <div className="flex min-h-screen bg-[#0b0c10] text-zinc-200 antialiased [font-family:var(--font-sans,Inter,system-ui,sans-serif)]">
      <Sidebar active="training" />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar activeModel={"Model101"} />
      </div>
    </div>
  );
}