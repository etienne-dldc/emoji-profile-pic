import { useEffect, useRef, useState } from "react";
import type { Background } from "../emoji/backgrounds.ts";
import type { EmojiRenderer } from "../emoji/renderers.ts";
import { EMOJI_BASE_SCALE, type EmojiTransform } from "../emoji/transform.ts";
import type { ShapeId } from "./ImagePanel.tsx";

export function traceShape(
  ctx: CanvasRenderingContext2D,
  size: number,
  shape: ShapeId,
  radius: number,
): void {
  ctx.beginPath();
  if (shape === "square") {
    ctx.rect(0, 0, size, size);
  } else if (shape === "rounded") {
    ctx.roundRect(0, 0, size, size, size * radius);
  } else if (shape === "circle") {
    ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
  } else if (shape === "squircle") {
    const r = size / 2;
    const n = 4;
    for (let t = 0; t <= 2 * Math.PI; t += 0.01) {
      const px = r + Math.pow(Math.abs(Math.cos(t)), 2 / n) * r * Math.sign(Math.cos(t));
      const py = r + Math.pow(Math.abs(Math.sin(t)), 2 / n) * r * Math.sign(Math.sin(t));
      if (t === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
  }
  ctx.closePath();
}

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  emoji: string;
  renderer: EmojiRenderer;
  background: Background;
  transform: EmojiTransform;
  gradientAngle: number;
  exportSize: number;
  shape: ShapeId;
  shapeRadius: number;
  cropEmoji: boolean;
  backgroundScale: number;
}

export function Preview({
  canvasRef,
  emoji,
  renderer,
  background,
  transform,
  gradientAngle,
  exportSize,
  shape,
  shapeRadius,
  cropEmoji,
  backgroundScale,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        await renderer.load();
        if (cancelled) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const size = exportSize;
        ctx.clearRect(0, 0, size, size);

        ctx.save();
        ctx.translate(size / 2, size / 2);
        ctx.scale(backgroundScale, backgroundScale);
        ctx.translate(-size / 2, -size / 2);
        traceShape(ctx, size, shape, shapeRadius);
        ctx.clip();
        await background.paint(ctx, size, gradientAngle);        ctx.restore();

        ctx.save();
        if (cropEmoji && shape !== "square") {
          ctx.translate(size / 2, size / 2);
          ctx.scale(backgroundScale, backgroundScale);
          ctx.translate(-size / 2, -size / 2);
          traceShape(ctx, size, shape, shapeRadius);
          ctx.clip();
        }
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.save();
        ctx.translate(
          size / 2 + transform.x * size,
          size / 2 + transform.y * size,
        );
        ctx.rotate((transform.rotation * Math.PI) / 180);
        ctx.scale(transform.scale * EMOJI_BASE_SCALE, transform.scale * EMOJI_BASE_SCALE);
        ctx.translate(-size / 2, -size / 2);
        await renderer.draw(ctx, emoji, size);
        ctx.restore();
        ctx.restore();
        if (!cancelled) setLoading(false);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Render failed");
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [
    canvasRef,
    emoji,
    renderer,
    background,
    transform,
    gradientAngle,
    exportSize,
    shape,
    shapeRadius,
    cropEmoji,
    backgroundScale,
  ]);

  return (
    <div className="relative w-full max-w-sm">
      <canvas
        ref={canvasRef}
        width={exportSize}
        height={exportSize}
        className="h-auto w-full"
      />
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-900/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-700 border-t-zinc-100" />
            <span className="text-sm text-zinc-400">Loading emoji font…</span>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-900/80 p-4">
          <p className="text-center text-sm text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
}
