import type { EmojiRenderer } from "./renderers.ts";

interface Rgb {
  r: number;
  g: number;
  b: number;
}

function rgbToHsl({ r, g, b }: Rgb) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return { h: 0, s: 0, l };
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
  else if (max === g) h = ((b - r) / d + 2) * 60;
  else h = ((r - g) / d + 4) * 60;
  return { h, s, l };
}

function hslToHex(h: number, s: number, l: number): string {
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, "0");
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

function luminance({ r, g, b }: Rgb) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function rgbToHex({ r, g, b }: Rgb): string {
  const toHex = (x: number) => Math.round(x).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

async function renderEmojiPixels(
  emoji: string,
  renderer: EmojiRenderer,
  size = 64,
): Promise<Uint8ClampedArray | null> {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  await renderer.load();
  await renderer.draw(ctx, emoji, size);

  return ctx.getImageData(0, 0, size, size).data;
}

/**
 * Renders the emoji to an offscreen canvas, computes its average color, and
 * returns a contrasting background hex derived from the complementary hue with
 * a lightness chosen to maximise contrast against the emoji.
 */
export async function contrastingColorForEmoji(
  emoji: string,
  renderer: EmojiRenderer,
): Promise<string> {
  const data = await renderEmojiPixels(emoji, renderer);
  if (!data) return "#f43f5e";

  let r = 0;
  let g = 0;
  let b = 0;
  let count = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] > 128) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      count++;
    }
  }
  if (count === 0) return "#f43f5e";

  const avg: Rgb = { r: r / count, g: g / count, b: b / count };
  const { h, s } = rgbToHsl(avg);

  let hue = (h + 180) % 360;
  if (s < 0.12) hue = 210;

  const light = luminance(avg) < 128;
  const lightness = light ? 0.86 : 0.3;

  return hslToHex(hue, 0.72, lightness);
}

interface Bucket {
  r: number;
  g: number;
  b: number;
  count: number;
}

/**
 * Renders the emoji and returns the hex of a prominent secondary color — the
 * most frequent quantized color that is sufficiently distinct from the primary
 * color (if one exists), otherwise the second most frequent color.
 */
export async function secondaryColorForEmoji(
  emoji: string,
  renderer: EmojiRenderer,
): Promise<string> {
  const data = await renderEmojiPixels(emoji, renderer);
  if (!data) return "#f43f5e";

  const buckets = new Map<number, Bucket>();
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] <= 128) continue;
    const key = ((data[i] >> 4) << 8) | ((data[i + 1] >> 4) << 4) | (data[i + 2] >> 4);
    const existing = buckets.get(key);
    if (existing) {
      existing.r += data[i];
      existing.g += data[i + 1];
      existing.b += data[i + 2];
      existing.count++;
    } else {
      buckets.set(key, { r: data[i], g: data[i + 1], b: data[i + 2], count: 1 });
    }
  }

  const colors = [...buckets.values()].sort((a, b) => b.count - a.count);
  if (colors.length === 0) return "#f43f5e";

  const average = (b: Bucket): Rgb => ({
    r: b.r / b.count,
    g: b.g / b.count,
    b: b.b / b.count,
  });

  const primary = average(colors[0]);
  const primaryHsl = rgbToHsl(primary);

  let chosen = colors.length > 1 ? colors[1] : colors[0];
  for (let i = 1; i < colors.length; i++) {
    const c = average(colors[i]);
    const { h } = rgbToHsl(c);
    const hueDiff = Math.min(Math.abs(h - primaryHsl.h), 360 - Math.abs(h - primaryHsl.h));
    const dist = Math.hypot(c.r - primary.r, c.g - primary.g, c.b - primary.b);
    if (hueDiff > 30 && dist > 80) {
      chosen = colors[i];
      break;
    }
  }

  return rgbToHex(average(chosen));
}

function hslToRgb(h: number, s: number, l: number): Rgb {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 };
}

function distinctFrom(primary: Rgb, colors: Rgb[]): Rgb | null {
  const primaryHsl = rgbToHsl(primary);
  for (const c of colors) {
    const { h } = rgbToHsl(c);
    const hueDiff = Math.min(Math.abs(h - primaryHsl.h), 360 - Math.abs(h - primaryHsl.h));
    const dist = Math.hypot(c.r - primary.r, c.g - primary.g, c.b - primary.b);
    if (hueDiff > 30 && dist > 80) return c;
  }
  return null;
}

/**
 * Returns two distinct hex colors sampled from the emoji's palette (the primary
 * and a secondary color far enough from it) suitable for building a gradient.
 * Falls back to adjusting the primary's lightness when no distinct second color
 * exists.
 */
export async function gradientColorsForEmoji(
  emoji: string,
  renderer: EmojiRenderer,
): Promise<[string, string]> {
  const data = await renderEmojiPixels(emoji, renderer);
  if (!data) return ["#f43f5e", "#fbbf24"];

  const buckets = new Map<number, Bucket>();
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] <= 128) continue;
    const key = ((data[i] >> 4) << 8) | ((data[i + 1] >> 4) << 4) | (data[i + 2] >> 4);
    const existing = buckets.get(key);
    if (existing) {
      existing.r += data[i];
      existing.g += data[i + 1];
      existing.b += data[i + 2];
      existing.count++;
    } else {
      buckets.set(key, { r: data[i], g: data[i + 1], b: data[i + 2], count: 1 });
    }
  }

  const colors = [...buckets.values()]
    .sort((a, b) => b.count - a.count)
    .map((b) => ({ r: b.r / b.count, g: b.g / b.count, b: b.b / b.count }));
  if (colors.length === 0) return ["#f43f5e", "#fbbf24"];

  const primary = colors[0];
  const secondary = distinctFrom(primary, colors.slice(1));
  let secondRgb: Rgb;
  if (secondary) {
    secondRgb = secondary;
  } else {
    const { h, s, l } = rgbToHsl(primary);
    secondRgb = hslToRgb(h, s, Math.min(1, l + 0.4));
  }

  return [rgbToHex(primary), rgbToHex(secondRgb)];
}

