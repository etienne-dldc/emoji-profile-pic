import { useEffect, useRef, useState, type ReactNode } from "react";
import { renderers } from "./emoji/renderers.ts";
import { BACKGROUNDS, GRADIENT_BACKGROUNDS, MAGIC_GRADIENT_ID, MAGIC_ID, MAGIC_SECONDARY_ID, SOLID_COLORS, magicBackground, magicGradientBackground, secondaryMagicBackground, solidBackground } from "./emoji/backgrounds.ts";
import { EMOJIS } from "./emoji/emoji-list.ts";
import { DEFAULT_TRANSFORM, type EmojiTransform } from "./emoji/transform.ts";
import { Preview } from "./components/Preview.tsx";
import { Toolbar, type ToolId } from "./components/Toolbar.tsx";
import { EmojiPicker } from "./components/EmojiPicker.tsx";
import { RendererToggle } from "./components/RendererToggle.tsx";
import { BackgroundPicker } from "./components/BackgroundPicker.tsx";
import { TransformPanel } from "./components/TransformPanel.tsx";
import { ImagePanel, type ShapeId } from "./components/ImagePanel.tsx";
import { RandomizePanel } from "./components/RandomizePanel.tsx";
import { ExportPanel } from "./components/ExportPanel.tsx";

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/80 px-4 py-4 backdrop-blur">
      <h2 className="mb-3 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function App() {
  const [emoji, setEmoji] = useState(
    () => EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
  );
  const [renderer, setRenderer] = useState(renderers[0]);
  const [background, setBackground] = useState(() =>
    Math.random() < 0.5
      ? GRADIENT_BACKGROUNDS[Math.floor(Math.random() * GRADIENT_BACKGROUNDS.length)]
      : SOLID_COLORS[Math.floor(Math.random() * SOLID_COLORS.length)],
  );
  const [transform, setTransform] = useState<EmojiTransform>(DEFAULT_TRANSFORM);
  const [gradientAngle, setGradientAngle] = useState(0);
  const [backgroundScale, setBackgroundScale] = useState(1);
  const [exportSize, setExportSize] = useState(1024);
  const [shape, setShape] = useState<ShapeId>("squircle");
  const [shapeRadius, setShapeRadius] = useState(0.2);
  const [cropEmoji, setCropEmoji] = useState(true);
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);
  const [animate, setAnimate] = useState(true);
  const [animating, setAnimating] = useState(false);
  const [copied, setCopied] = useState(false);
  const copiedTimeoutRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const effectiveBackground =
    background.id === MAGIC_ID
      ? magicBackground(emoji, renderer)
      : background.id === MAGIC_SECONDARY_ID
        ? secondaryMagicBackground(emoji, renderer)
        : background.id === MAGIC_GRADIENT_ID
          ? magicGradientBackground(emoji, renderer)
          : background;

  const stopAnimation = () => {
    if (animationRef.current !== null) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
    setAnimating(false);
  };

  useEffect(() => {
    if (activeTool !== "randomize") stopAnimation();
  }, [activeTool]);

  useEffect(() => () => {
    if (animationRef.current !== null) clearTimeout(animationRef.current);
  }, []);

  useEffect(() => {
    runRoulette({ emoji: randomEmoji });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const randomEmoji = () =>
    setEmoji(EMOJIS[Math.floor(Math.random() * EMOJIS.length)]);
  const randomGradient = () =>
    setBackground(
      GRADIENT_BACKGROUNDS[Math.floor(Math.random() * GRADIENT_BACKGROUNDS.length)],
    );
  const randomBackgroundColor = () =>
    setBackground(SOLID_COLORS[Math.floor(Math.random() * SOLID_COLORS.length)]);

  function hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, "0");
    return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
  }

  function runRoulette(
    picks: { emoji?: (p?: number) => void; background?: (p?: number) => void },
  ) {
    if (!animate) {
      picks.emoji?.();
      picks.background?.();
      return;
    }
    stopAnimation();
    setAnimating(true);
    const start = Date.now();
    const DURATION = 2000;
    const MIN_INTERVAL = 40;
    const MAX_INTERVAL = 300;
    const tick = () => {
      const p = Math.min(1, (Date.now() - start) / DURATION);
      picks.emoji?.(p);
      picks.background?.(p);
      if (p >= 1) {
        setAnimating(false);
        animationRef.current = null;
        return;
      }
      const interval = MIN_INTERVAL + (MAX_INTERVAL - MIN_INTERVAL) * p * p;
      animationRef.current = setTimeout(tick, interval);
    };
    animationRef.current = setTimeout(tick, MIN_INTERVAL);
  }

  const handleEmoji = () => runRoulette({ emoji: randomEmoji });
  const handleGradient = () => runRoulette({ background: randomGradient });
  const smoothColorPick = () => {
    const saturation = 65 + Math.random() * 30;
    const lightness = 45 + Math.random() * 15;
    const startHue = Math.random() * 360;
    const rotation = 360 + Math.random() * 1080;
    return (p?: number) => {
      if (p === undefined) {
        randomBackgroundColor();
        return;
      }
      setBackground(
        solidBackground(hslToHex((startHue + p * rotation) % 360, saturation, lightness)),
      );
    };
  };
  const handleBackgroundColor = () => runRoulette({ background: smoothColorPick() });
  const handleAll = () =>
    runRoulette(
      background.id.startsWith("gradient")
        ? { emoji: randomEmoji, background: randomGradient }
        : { emoji: randomEmoji, background: smoothColorPick() },
    );
  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `profile-${emoji.codePointAt(0)?.toString(16)}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }

  async function copyImage() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/png"),
    );
    if (!blob) return;
    try {
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      setCopied(true);
      if (copiedTimeoutRef.current !== null) clearTimeout(copiedTimeoutRef.current);
      copiedTimeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-zinc-950 p-6 text-zinc-100">
      <div className="flex w-full max-w-sm flex-col items-stretch gap-3">
        <Preview
          canvasRef={canvasRef}
          emoji={emoji}
          renderer={renderer}
          background={effectiveBackground}
          transform={transform}
          gradientAngle={gradientAngle}
          exportSize={exportSize}
          shape={shape}
          shapeRadius={shapeRadius}
          cropEmoji={cropEmoji}
          backgroundScale={backgroundScale}
        />

        <div className="flex justify-center">
          <Toolbar
            activeTool={activeTool}
            onSelect={(tool) => setActiveTool((current) => (current === tool ? null : tool))}
          />
        </div>

        <div>
          {activeTool === "emoji" && (
            <Panel title="Emoji">
              <div className="mb-4">
                <RendererToggle selected={renderer} onSelect={setRenderer} />
              </div>
              <EmojiPicker
                selected={emoji}
                onSelect={setEmoji}
                fontFamily={renderer.fontFamily}
              />
            </Panel>
          )}
          {activeTool === "background" && (
            <Panel title="Background">
              <BackgroundPicker
                selected={background}
                onSelect={setBackground}
                emoji={emoji}
                renderer={renderer}
              />
            </Panel>
          )}
          {activeTool === "transform" && (
            <Panel title="Transform">
              <TransformPanel
                value={transform}
                onChange={setTransform}
                showGradient={background.id.startsWith("gradient") || background.id === MAGIC_GRADIENT_ID}
                gradientAngle={gradientAngle}
                onGradientAngleChange={setGradientAngle}
                backgroundScale={backgroundScale}
                onBackgroundScaleChange={setBackgroundScale}
                showCrop={shape !== "square"}
                cropEmoji={cropEmoji}
                onCropEmojiChange={setCropEmoji}
              />
            </Panel>
          )}
          {activeTool === "image" && (
            <Panel title="Image">
              <ImagePanel
                exportSize={exportSize}
                onSizeChange={setExportSize}
                shape={shape}
                onShapeChange={setShape}
                shapeRadius={shapeRadius}
                onShapeRadiusChange={setShapeRadius}
              />
            </Panel>
          )}
          {activeTool === "randomize" && (
            <Panel title="Randomize">
              <RandomizePanel
                animate={animate}
                onAnimateChange={setAnimate}
                disabled={animating}
                onEmoji={handleEmoji}
                onGradient={handleGradient}
                onBackgroundColor={handleBackgroundColor}
                onAll={handleAll}
              />
            </Panel>
          )}
          {activeTool === "export" && (
            <Panel title="Export">
              <ExportPanel
                onDownload={download}
                onCopy={copyImage}
                copied={copied}
              />
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
}
