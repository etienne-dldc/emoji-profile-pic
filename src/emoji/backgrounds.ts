import { WEBGRADIENTS, type GradientDef } from "./gradients-data.ts";
import type { EmojiRenderer } from "./renderers.ts";
import {
  contrastingColorForEmoji,
  gradientColorsForEmoji,
  secondaryColorForEmoji,
} from "./analyze.ts";

export const MAGIC_ID = "magic";
export const MAGIC_SECONDARY_ID = "magic-secondary";
export const MAGIC_GRADIENT_ID = "magic-gradient";
export const NONE_ID = "none";

export function isMagicBackground(id: string): boolean {
  return id === MAGIC_ID || id === MAGIC_SECONDARY_ID || id === MAGIC_GRADIENT_ID;
}

export const noneBackground: Background = {
  id: NONE_ID,
  label: "No background",
  paint() {
    // Paint nothing, leaving the canvas transparent.
  },
};

export interface Background {
  readonly id: string;
  readonly label: string;
  readonly cssBackground?: string;
  paint(
    ctx: CanvasRenderingContext2D,
    size: number,
    angleOffset?: number,
  ): Promise<void> | void;
}

export function solidBackground(hex: string, label = "Custom"): Background {
  const normalized = hex.startsWith("#") ? hex : `#${hex}`;
  return {
    id: `solid-${normalized.slice(1)}`,
    label,
    cssBackground: normalized,
    paint(ctx, size) {
      ctx.fillStyle = normalized;
      ctx.fillRect(0, 0, size, size);
    },
  };
}

export const SOLID_COLORS: Background[] = [
  ["#f43f5e", "Rose"], ["#e11d48", "Rose 600"], ["#fb7185", "Rose 400"],
  ["#f97316", "Orange"], ["#ea580c", "Orange 600"], ["#f59e0b", "Amber"],
  ["#facc15", "Yellow"], ["#eab308", "Yellow 600"], ["#84cc16", "Lime"],
  ["#22c55e", "Green"], ["#10b981", "Emerald"], ["#14b8a6", "Teal"],
  ["#0d9488", "Teal 600"], ["#06b6d4", "Cyan"], ["#0ea5e9", "Sky"],
  ["#3b82f6", "Blue"], ["#2563eb", "Blue 600"], ["#6366f1", "Indigo"],
  ["#8b5cf6", "Violet"], ["#7c3aed", "Violet 600"], ["#a855f7", "Purple"],
  ["#d946ef", "Fuchsia"], ["#c026d3", "Fuchsia 600"], ["#ec4899", "Pink"],
  ["#db2777", "Pink 600"], ["#64748b", "Slate"], ["#475569", "Slate 700"],
  ["#78716c", "Stone"], ["#57534e", "Stone 600"], ["#92400e", "Brown"],
  ["#78350f", "Amber 900"], ["#166534", "Green 800"], ["#14532d", "Green 900"],
  ["#1e40af", "Blue 800"], ["#312e81", "Indigo 900"], ["#4c1d95", "Violet 900"],
  ["#701a75", "Fuchsia 900"], ["#831843", "Pink 900"], ["#881337", "Rose 900"],
  ["#111827", "Zinc"], ["#1f2937", "Zinc 800"], ["#0b0b0f", "Near Black"],
  ["#f8fafc", "Slate 50"], ["#f1f5f9", "Slate 100"], ["#ffffff", "White"],
].map(([hex, label]) => solidBackground(hex, label));

export function gradientBackground(def: GradientDef): Background {
  const stops = def.stops.map((s) => `${s.color} ${s.offset}%`).join(", ");
  return {
    id: `gradient-${def.id}`,
    label: def.label,
    cssBackground: `linear-gradient(${def.angle}deg, ${stops})`,
    paint(ctx, size, angleOffset = 0) {
      const angle = def.angle + angleOffset;
      const rad = ((angle - 90) * Math.PI) / 180;
      const cx = size / 2;
      const cy = size / 2;
      const x = Math.cos(rad);
      const y = Math.sin(rad);
      const len = Math.abs(size * x) + Math.abs(size * y);
      const grad = ctx.createLinearGradient(
        cx - (x * len) / 2,
        cy - (y * len) / 2,
        cx + (x * len) / 2,
        cy + (y * len) / 2,
      );
      for (const s of def.stops) {
        grad.addColorStop(s.offset / 100, s.color);
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
    },
  };
}

export function magicBackground(emoji: string, renderer: EmojiRenderer): Background {
  return {
    id: MAGIC_ID,
    label: "Auto color",
    async paint(ctx, size) {
      const hex = await contrastingColorForEmoji(emoji, renderer);
      ctx.fillStyle = hex;
      ctx.fillRect(0, 0, size, size);
    },
  };
}

export function secondaryMagicBackground(
  emoji: string,
  renderer: EmojiRenderer,
): Background {
  return {
    id: MAGIC_SECONDARY_ID,
    label: "Secondary color",
    async paint(ctx, size) {
      const hex = await secondaryColorForEmoji(emoji, renderer);
      ctx.fillStyle = hex;
      ctx.fillRect(0, 0, size, size);
    },
  };
}

export function magicGradientBackground(
  emoji: string,
  renderer: EmojiRenderer,
): Background {
  return {
    id: MAGIC_GRADIENT_ID,
    label: "Gradient from emoji",
    async paint(ctx, size, angleOffset = 0) {
      const [c1, c2] = await gradientColorsForEmoji(emoji, renderer);
      const rad = ((angleOffset - 90) * Math.PI) / 180;
      const cx = size / 2;
      const cy = size / 2;
      const x = Math.cos(rad);
      const y = Math.sin(rad);
      const len = Math.abs(size * x) + Math.abs(size * y);
      const grad = ctx.createLinearGradient(
        cx - (x * len) / 2,
        cy - (y * len) / 2,
        cx + (x * len) / 2,
        cy + (y * len) / 2,
      );
      grad.addColorStop(0, c1);
      grad.addColorStop(1, c2);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
    },
  };
}

export const GRADIENT_BACKGROUNDS: Background[] = WEBGRADIENTS.map(gradientBackground);

export const BACKGROUNDS: Background[] = [...SOLID_COLORS, ...GRADIENT_BACKGROUNDS];
