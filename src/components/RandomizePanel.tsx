import { Circle, Dices, Palette, Smile } from "lucide-react";

interface Props {
  animate: boolean;
  onAnimateChange: (value: boolean) => void;
  disabled: boolean;
  onEmoji: () => void;
  onGradient: () => void;
  onBackgroundColor: () => void;
  onAll: () => void;
}

const buttonClass =
  "flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:bg-zinc-700 hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-zinc-800";

export function RandomizePanel({
  animate,
  onAnimateChange,
  disabled,
  onEmoji,
  onGradient,
  onBackgroundColor,
  onAll,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => onAnimateChange(!animate)}
        disabled={disabled}
        className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
          animate
            ? "border-zinc-100/25 bg-zinc-800/60 text-zinc-200"
            : "border-zinc-800 bg-zinc-900 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
        }`}
      >
        <span
          className={`flex h-4 w-4 items-center justify-center rounded border text-[10px] font-bold leading-none transition ${
            animate
              ? "border-zinc-100 bg-zinc-100 text-zinc-900"
              : "border-zinc-600 bg-transparent text-transparent"
          }`}
        >
          ✓
        </span>
        Animate
      </button>
      <button type="button" onClick={onAll} disabled={disabled} className={buttonClass}>
        <Dices className="h-4 w-4" />
        Randomize everything
        <Dices className="h-4 w-4" />
      </button>
      <button type="button" onClick={onEmoji} disabled={disabled} className={buttonClass}>
        <Smile className="h-4 w-4" />
        Random emoji
        <Smile className="h-4 w-4" />
      </button>
      <button type="button" onClick={onGradient} disabled={disabled} className={buttonClass}>
        <Palette className="h-4 w-4" />
        Random gradient
        <Palette className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={onBackgroundColor}
        disabled={disabled}
        className={buttonClass}
      >
        <Circle className="h-4 w-4" />
        Random background
        <Circle className="h-4 w-4" />
      </button>
    </div>
  );
}
