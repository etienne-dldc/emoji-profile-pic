export interface EmojiRenderer {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly fontFamily: string;
  load(): Promise<void>;
  draw(ctx: CanvasRenderingContext2D, emoji: string, size: number): Promise<void>;
}

const SYSTEM_FONT = [
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Noto Color Emoji"',
  "sans-serif",
].join(", ");

function drawEmoji(
  ctx: CanvasRenderingContext2D,
  emoji: string,
  size: number,
  fontFamily: string,
) {
  ctx.font = `${size}px ${fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emoji, size / 2, size / 2 + size * 0.04);
}

export const systemRenderer: EmojiRenderer = {
  id: "system",
  label: "System",
  description: "Uses the operating system emoji font (Apple emoji on macOS/iOS).",
  fontFamily: SYSTEM_FONT,
  async load() {},
  async draw(ctx, emoji, size) {
    drawEmoji(ctx, emoji, size, SYSTEM_FONT);
  },
};

const NOTO_FONT_URL = "/NotoColorEmoji-Regular.ttf";
let notoLoadPromise: Promise<void> | null = null;

function loadNoto(): Promise<void> {
  if (!notoLoadPromise) {
    notoLoadPromise = (async () => {
      const font = new FontFace("Noto Color Emoji", `url(${NOTO_FONT_URL})`);
      const loaded = await font.load();
      document.fonts.add(loaded);
      await document.fonts.ready;
    })().catch((err) => {
      notoLoadPromise = null;
      throw err;
    });
  }
  return notoLoadPromise;
}

export const notoRenderer: EmojiRenderer = {
  id: "noto",
  label: "Noto",
  description: "Self-hosted Google Noto Color Emoji font (bundled locally).",
  fontFamily: '"Noto Color Emoji"',
  load: loadNoto,
  async draw(ctx, emoji, size) {
    drawEmoji(ctx, emoji, size, '"Noto Color Emoji"');
  },
};

export const renderers: EmojiRenderer[] = [notoRenderer, systemRenderer];
