import { renderers, type EmojiRenderer } from "../emoji/renderers.ts";

interface Props {
  selected: EmojiRenderer;
  onSelect: (renderer: EmojiRenderer) => void;
}

export function RendererToggle({ selected, onSelect }: Props) {
  return (
    <div className="flex rounded-lg bg-zinc-800/60 p-1">
      {renderers.map((r) => (
        <button
          key={r.id}
          type="button"
          onClick={() => onSelect(r)}
          className={`flex-1 rounded-md px-4 py-1.5 text-sm font-medium transition ${
            r === selected
              ? "bg-zinc-100 text-zinc-900"
              : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
