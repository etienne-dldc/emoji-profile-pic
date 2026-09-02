import { useState } from "react";
import type { EmojiTransform } from "../emoji/transform.ts";
import { CenterSlider } from "./CenterSlider.tsx";

interface Props {
  value: EmojiTransform;
  onChange: (transform: EmojiTransform) => void;
  showGradient: boolean;
  gradientAngle: number;
  onGradientAngleChange: (angle: number) => void;
  backgroundScale: number;
  onBackgroundScaleChange: (scale: number) => void;
  showCrop: boolean;
  cropEmoji: boolean;
  onCropEmojiChange: (value: boolean) => void;
}

interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  center?: number;
  toSlider: (value: number) => number;
  fromSlider: (x: number) => number;
  format: (value: number) => string;
  onChange: (value: number) => void;
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  center,
  toSlider,
  fromSlider,
  format,
  onChange,
}: SliderRowProps) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-zinc-400">{label}</span>
        <code className="font-mono text-zinc-500">{format(value)}</code>
      </div>
      <CenterSlider
        aria-label={label}
        value={toSlider(value)}
        min={min}
        max={max}
        step={step}
        center={center}
        onChange={(x) => onChange(fromSlider(x))}
      />
    </div>
  );
}

// Magnification mapping: x=0 -> 1 (neutral), x>0 -> 1+x, x<0 -> 1/(1+|x|).
const xToScale = (x: number): number => (x >= 0 ? 1 + x : 1 / (1 - x));
const scaleToX = (scale: number): number => (scale >= 1 ? scale - 1 : 1 - 1 / scale);
const identity = (v: number): number => v;

export function TransformPanel({
  value,
  onChange,
  showGradient,
  gradientAngle,
  onGradientAngleChange,
  backgroundScale,
  onBackgroundScaleChange,
  showCrop,
  cropEmoji,
  onCropEmojiChange,
}: Props) {
  const [category, setCategory] = useState<"emoji" | "background">("emoji");
  const set = (patch: Partial<EmojiTransform>) => onChange({ ...value, ...patch });

  const segmented = (active: boolean) =>
    `flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition ${
      active
        ? "bg-zinc-100 text-zinc-900"
        : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
    }`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex rounded-lg bg-zinc-800/60 p-1">
        <button
          type="button"
          onClick={() => setCategory("emoji")}
          className={segmented(category === "emoji")}
        >
          Emoji
        </button>
        <button
          type="button"
          onClick={() => setCategory("background")}
          className={segmented(category === "background")}
        >
          Background
        </button>
      </div>

      {category === "emoji" ? (
        <>
          <SliderRow
            label="Scale"
            value={value.scale}
            min={-2}
            max={2}
            step={0.01}
            center={0}
            toSlider={scaleToX}
            fromSlider={xToScale}
            format={(v) => `×${v.toFixed(2)}`}
            onChange={(scale) => set({ scale })}
          />
          <SliderRow
            label="Position X"
            value={value.x}
            min={-0.5}
            max={0.5}
            step={0.01}
            center={0}
            toSlider={identity}
            fromSlider={identity}
            format={(v) => `${Math.round(v * 100)}%`}
            onChange={(x) => set({ x })}
          />
          <SliderRow
            label="Position Y"
            value={value.y}
            min={-0.5}
            max={0.5}
            step={0.01}
            center={0}
            toSlider={identity}
            fromSlider={identity}
            format={(v) => `${Math.round(v * 100)}%`}
            onChange={(y) => set({ y })}
          />
          <SliderRow
            label="Rotation"
            value={value.rotation}
            min={-180}
            max={180}
            step={1}
            center={0}
            toSlider={identity}
            fromSlider={identity}
            format={(v) => `${Math.round(v)}°`}
            onChange={(rotation) => set({ rotation })}
          />
        </>
      ) : (
        <>
          <div>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-zinc-400">Background scale</span>
              <code className="font-mono text-zinc-500">
                {Math.round(backgroundScale * 100)}%
              </code>
            </div>
            <input
              type="range"
              min={0.3}
              max={1}
              step={0.01}
              value={backgroundScale}
              onChange={(e) => onBackgroundScaleChange(parseFloat(e.target.value))}
              className="w-full accent-zinc-100"
            />
          </div>
          {showGradient && (
            <SliderRow
              label="Gradient angle"
              value={gradientAngle}
              min={-180}
              max={180}
              step={1}
              center={0}
              toSlider={identity}
              fromSlider={identity}
              format={(v) => `${Math.round(v)}°`}
              onChange={onGradientAngleChange}
            />
          )}
          {showCrop && (
            <button
              type="button"
              onClick={() => onCropEmojiChange(!cropEmoji)}
              className={`flex items-center justify-start gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                cropEmoji
                  ? "border-zinc-100/25 bg-zinc-800/60 text-zinc-200"
                  : "border-zinc-800 bg-zinc-900 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
              }`}
            >
              <span
                className={`flex h-4 w-4 items-center justify-center rounded border text-[10px] font-bold leading-none transition ${
                  cropEmoji
                    ? "border-zinc-100 bg-zinc-100 text-zinc-900"
                    : "border-zinc-600 bg-transparent text-transparent"
                }`}
              >
                ✓
              </span>
              Clip emoji
            </button>
          )}
        </>
      )}
    </div>
  );
}
