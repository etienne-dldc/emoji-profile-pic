import { useCallback, useRef } from "react";

interface CenterSliderProps {
  value: number;
  min: number;
  max: number;
  step: number;
  center?: number;
  onChange: (value: number) => void;
  "aria-label"?: string;
}

function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

export function CenterSlider({
  value,
  min,
  max,
  step,
  center = 0,
  onChange,
  "aria-label": ariaLabel,
}: CenterSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const pct = ((value - min) / (max - min)) * 100;
  const centerPct = ((center - min) / (max - min)) * 100;
  const fillLeft = Math.min(centerPct, pct);
  const fillWidth = Math.abs(pct - centerPct);

  const valueFromClientX = useCallback(
    (clientX: number) => {
      const el = trackRef.current;
      if (!el) return value;
      const rect = el.getBoundingClientRect();
      const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
      const raw = min + ratio * (max - min);
      return clamp(Math.round(raw / step) * step, min, max);
    },
    [min, max, step, value],
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    trackRef.current?.setPointerCapture(e.pointerId);
    onChange(valueFromClientX(e.clientX));
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    onChange(valueFromClientX(e.clientX));
  };

  const endDrag = () => {
    draggingRef.current = false;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const dir =
      e.key === "ArrowRight" || e.key === "ArrowUp"
        ? 1
        : e.key === "ArrowLeft" || e.key === "ArrowDown"
          ? -1
          : 0;
    if (dir === 0) return;
    e.preventDefault();
    onChange(clamp(value + dir * step, min, max));
  };

  return (
    <div
      ref={trackRef}
      role="slider"
      aria-label={ariaLabel}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={String(value)}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={handleKeyDown}
      className="relative flex h-6 cursor-pointer touch-none select-none items-center outline-none"
    >
      <div className="relative h-1.5 w-full rounded-full bg-zinc-700">
        <div
          className="absolute top-0 h-full rounded-full bg-zinc-100"
          style={{ left: `${fillLeft}%`, width: `${fillWidth}%` }}
        />
        <div
          aria-hidden
          className="absolute top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-zinc-400/70"
          style={{ left: `${centerPct}%` }}
        />
        <div
          aria-hidden
          className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-100 shadow ring-2 ring-zinc-950"
          style={{ left: `${pct}%` }}
        />
      </div>
    </div>
  );
}
