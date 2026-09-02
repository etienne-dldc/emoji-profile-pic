import { AppEditor } from "../App.tsx";

export function Showcase() {
  return (
    <div className="grid min-h-screen grid-cols-6 content-center items-start justify-center gap-6 bg-zinc-950 p-6 text-zinc-100">
      {Array.from({ length: 6 }).map((_, i) => (
        <AppEditor key={i} fullScreen={false} />
      ))}
    </div>
  );
}
