import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  Hue,
  Saturation,
  hexToHsva,
  hsvaToHex,
  type HsvaColor,
} from "@uiw/react-color";
import { Popover } from "@base-ui/react/popover";
import { Sparkles, Palette, Rainbow, Check } from "lucide-react";
import {
  GRADIENT_BACKGROUNDS,
  MAGIC_GRADIENT_ID,
  MAGIC_ID,
  MAGIC_SECONDARY_ID,
  NONE_ID,
  isMagicBackground,
  magicBackground,
  magicGradientBackground,
  noneBackground,
  secondaryMagicBackground,
  solidBackground,
  type Background,
} from "../emoji/backgrounds.ts";
import type { EmojiRenderer } from "../emoji/renderers.ts";

interface Props {
  selected: Background;
  onSelect: (background: Background) => void;
  emoji: string;
  renderer: EmojiRenderer;
}

type Mode = "solid" | "gradient" | "magic";

const THROTTLE_MS = 50;
const SOLID_PRESETS = [
  "#ea580c", "#78350f", "#92400e", "#f97316", "#f59e0b", "#eab308", "#facc15", "#84cc16",
  "#0ea5e9", "#06b6d4", "#0d9488", "#14b8a6", "#10b981", "#14532d", "#166534", "#22c55e",
  "#1f2937", "#475569", "#64748b", "#3b82f6", "#2563eb", "#1e40af", "#6366f1", "#312e81",
  "#ec4899", "#701a75", "#c026d3", "#d946ef", "#a855f7", "#4c1d95", "#7c3aed", "#8b5cf6",
  "#db2777", "#831843", "#881337", "#e11d48", "#f43f5e", "#fb7185", "#0b0b0f", "#111827",
  "#57534e", "#78716c", "#f1f5f9", "#f8fafc", "#ffffff",
];

const DEFAULT_HSVA: HsvaColor = { h: 215, s: 80, v: 90, a: 1 };

interface PresetItem {
  id: string;
  style?: CSSProperties;
  content?: ReactNode;
  label: string;
  selected: boolean;
  onSelect: () => void;
}

function PresetGrid({ items, selectedIndex }: { items: PresetItem[]; selectedIndex: number }) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    refs.current[selectedIndex]?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  return (
    <div className="grid max-h-56 grid-cols-8 gap-2 overflow-y-auto px-2 py-2">
      {items.map((item, i) => (
        <button
          key={item.id}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="button"
          title={item.label}
          aria-label={item.label}
          onClick={item.onSelect}
          className={`flex h-9 w-9 items-center justify-center rounded-full border transition hover:scale-110 ${
            item.selected
              ? "border-zinc-100 ring-2 ring-zinc-100 ring-offset-2 ring-offset-zinc-900"
              : "border-black/30"
          }`}
          style={item.style}
        >
          {item.content}
        </button>
      ))}
    </div>
  );
}

function MagicButton({
  selected,
  icon,
  label,
  onClick,
}: {
  selected: boolean;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
        selected
          ? "border-zinc-100 bg-zinc-800 text-zinc-100"
          : "border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800"
      }`}
    >
      {icon}
      <span className="flex-1 text-left">{label}</span>
      {selected && <Check className="h-4 w-4 text-zinc-100" />}
    </button>
  );
}

export function BackgroundPicker({ selected, onSelect, emoji, renderer }: Props) {
  const [mode, setMode] = useState<Mode>(() =>
    isMagicBackground(selected.id)
      ? "magic"
      : selected.id.startsWith("gradient")
        ? "gradient"
        : "solid",
  );
  const [solidHex, setSolidHex] = useState(() =>
    selected.id.startsWith("solid")
      ? `#${selected.id.split("-")[1]}`
      : hsvaToHex(DEFAULT_HSVA),
  );
  const [hsva, setHsva] = useState<HsvaColor>(() =>
    selected.id.startsWith("solid")
      ? hexToHsva(`#${selected.id.split("-")[1]}`)
      : DEFAULT_HSVA,
  );
  const [gradientIndex, setGradientIndex] = useState(0);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [hexInput, setHexInput] = useState(solidHex);

  const lastCommitRef = useRef(0);
  const trailingRef = useRef<number | null>(null);
  const latestHexRef = useRef(solidHex);
  const solidHexRef = useRef(solidHex);

  useEffect(() => {
    setHexInput(solidHex);
  }, [solidHex]);

  useEffect(() => {
    if (isMagicBackground(selected.id)) {
      setMode("magic");
    } else if (selected.id.startsWith("solid")) {
      const hex = `#${selected.id.split("-")[1]}`;
      solidHexRef.current = hex;
      setMode("solid");
      setSolidHex(hex);
      setHsva(hexToHsva(hex));
    } else if (selected.id.startsWith("gradient")) {
      setMode("gradient");
      const idx = GRADIENT_BACKGROUNDS.findIndex((g) => g.id === selected.id);
      if (idx >= 0) setGradientIndex(idx);
    }
  }, [selected]);

  useEffect(() => () => {
    if (trailingRef.current !== null) clearTimeout(trailingRef.current);
  }, []);

  function commitSolid(next: HsvaColor) {
    const hex = hsvaToHex(next);
    latestHexRef.current = hex;
    solidHexRef.current = hex;
    setSolidHex(hex);
    setHsva(next);
    const now = Date.now();
    if (now - lastCommitRef.current >= THROTTLE_MS) {
      lastCommitRef.current = now;
      onSelect(solidBackground(hex));
    } else {
      if (trailingRef.current !== null) clearTimeout(trailingRef.current);
      trailingRef.current = setTimeout(() => {
        lastCommitRef.current = Date.now();
        onSelect(solidBackground(latestHexRef.current));
      }, THROTTLE_MS);
    }
  }

  function commitPreset(hex: string) {
    const next = hexToHsva(hex);
    commitSolid(next);
  }

  function commitHexInput() {
    const normalized = hexInput.replace(/^#/, "");
    if (/^[0-9a-fA-F]{6}$/.test(normalized)) {
      commitPreset(`#${normalized}`);
    } else {
      setHexInput(solidHex);
    }
  }

  function switchMode(m: Mode) {
    setMode(m);
    if (m === "solid") {
      onSelect(solidBackground(solidHexRef.current));
    } else if (m === "gradient") {
      onSelect(GRADIENT_BACKGROUNDS[gradientIndex]);
    } else {
      onSelect(magicBackground(emoji, renderer));
    }
  }

  const segmented = (active: boolean) =>
    `flex-1 rounded-md px-4 py-1.5 text-sm font-medium transition ${
      active
        ? "bg-zinc-100 text-zinc-900"
        : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
    }`;

  const solidIndex = SOLID_PRESETS.findIndex(
    (hex) => hex.toLowerCase() === solidHex.toLowerCase(),
  );
  const noneItem: PresetItem = {
    id: NONE_ID,
    label: "No background",
    selected: selected.id === NONE_ID,
    onSelect: () => onSelect(noneBackground),
    style: {
      background:
        "repeating-conic-gradient(#3f3f46 0% 25%, #27272a 0% 50%) 0 0/8px 8px",
    },
  };
  const colorItems: PresetItem[] = SOLID_PRESETS.map((hex) => ({
    id: hex,
    style: { background: hex },
    label: hex,
    selected: hex.toLowerCase() === solidHex.toLowerCase(),
    onSelect: () => commitPreset(hex),
  }));
  const solidItems = [noneItem, ...colorItems];
  const solidSelectedIndex = selected.id === NONE_ID
    ? 0
    : solidIndex >= 0
      ? solidIndex + 1
      : -1;
  const gradientItems: PresetItem[] = GRADIENT_BACKGROUNDS.map((bg, i) => ({
    id: bg.id,
    style: { background: bg.cssBackground },
    label: bg.label,
    selected: i === gradientIndex,
    onSelect: () => {
      setGradientIndex(i);
      onSelect(bg);
    },
  }));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex rounded-lg bg-zinc-800/60 p-1">
        <button type="button" className={segmented(mode === "solid")} onClick={() => switchMode("solid")}>
          Solid
        </button>
        <button type="button" className={segmented(mode === "gradient")} onClick={() => switchMode("gradient")}>
          Gradient
        </button>
        <button type="button" className={segmented(mode === "magic")} onClick={() => switchMode("magic")}>
          Auto
        </button>
      </div>

      {mode === "solid" ? (
        <>
          <div className="flex items-center gap-3">
            <Popover.Root open={pickerOpen} onOpenChange={setPickerOpen}>
              <Popover.Trigger
                aria-label="Pick a color"
                className="h-10 w-10 shrink-0 rounded-lg border border-black/30 shadow-inner transition hover:scale-105"
                style={{ background: solidHex }}
              />
              <Popover.Portal>
                <Popover.Positioner side="top" align="start" sideOffset={8}>
                  <Popover.Popup className="rounded-xl border border-zinc-800 bg-zinc-900 p-3 shadow-2xl outline-none">
                    <Saturation
                      hsva={hsva}
                      onChange={(next) => commitSolid(next)}
                      style={{ width: "220px", height: "160px", borderRadius: "8px" }}
                    />
                    <Hue
                      hue={hsva.h}
                      onChange={({ h }) => commitSolid({ ...hsva, h })}
                      style={{ width: "220px", height: "14px", marginTop: "12px", borderRadius: "8px" }}
                    />
                  </Popover.Popup>
                </Popover.Positioner>
              </Popover.Portal>
            </Popover.Root>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-zinc-500 uppercase">Hex</span>
              {selected.id === NONE_ID ? (
                <code className="font-mono text-sm text-zinc-200">None</code>
              ) : (
                <input
                  type="text"
                  spellCheck={false}
                  value={hexInput}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^#0-9a-fA-F]/g, "");
                    setHexInput(value);
                    if (/^#[0-9a-fA-F]{6}$/.test(value)) {
                      commitPreset(value);
                    }
                  }}
                  onBlur={commitHexInput}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitHexInput();
                  }}
                  className="w-28 rounded-md border border-zinc-800 bg-zinc-950 px-2 py-1 font-mono text-sm text-zinc-200 outline-none focus:border-zinc-600"
                />
              )}
            </div>
          </div>

          <div>
            <span className="mb-2 block text-xs font-semibold text-zinc-500 uppercase">Presets</span>
            <PresetGrid items={solidItems} selectedIndex={solidSelectedIndex} />
          </div>
        </>
      ) : mode === "gradient" ? (
        <div>
          <span className="mb-2 block text-xs font-semibold text-zinc-500 uppercase">Presets</span>
          <PresetGrid items={gradientItems} selectedIndex={gradientIndex} />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <MagicButton
            selected={selected.id === MAGIC_ID}
            icon={<Sparkles className="h-4 w-4" />}
            label="Auto contrasting color"
            onClick={() => onSelect(magicBackground(emoji, renderer))}
          />
          <MagicButton
            selected={selected.id === MAGIC_SECONDARY_ID}
            icon={<Palette className="h-4 w-4" />}
            label="Secondary color from emoji"
            onClick={() => onSelect(secondaryMagicBackground(emoji, renderer))}
          />
          <MagicButton
            selected={selected.id === MAGIC_GRADIENT_ID}
            icon={<Rainbow className="h-4 w-4" />}
            label="Gradient from emoji"
            onClick={() => onSelect(magicGradientBackground(emoji, renderer))}
          />
        </div>
      )}
    </div>
  );
}
