interface SizeOption {
  label: string;
  size: number;
}

export type ShapeId = "square" | "rounded" | "squircle" | "circle";

interface ShapeOption {
  id: ShapeId;
  label: string;
}

const SIZES: SizeOption[] = [
  { label: "S", size: 512 },
  { label: "M", size: 1024 },
  { label: "L", size: 2048 },
  { label: "XL", size: 4096 },
];

const SHAPES: ShapeOption[] = [
  { id: "square", label: "Square" },
  { id: "rounded", label: "Rounded" },
  { id: "squircle", label: "Squircle" },
  { id: "circle", label: "Circle" },
];

interface Props {
  exportSize: number;
  onSizeChange: (size: number) => void;
  shape: ShapeId;
  onShapeChange: (shape: ShapeId) => void;
  shapeRadius: number;
  onShapeRadiusChange: (radius: number) => void;
}

function segmented(active: boolean): string {
  return `flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition ${
    active
      ? "bg-zinc-100 text-zinc-900"
      : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
  }`;
}

export function ImagePanel({
  exportSize,
  onSizeChange,
  shape,
  onShapeChange,
  shapeRadius,
  onShapeRadiusChange,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-500 uppercase">
            Size
          </span>
          <span className="font-mono text-xs text-zinc-500">
            {exportSize}×{exportSize}px
          </span>
        </div>
        <div className="flex rounded-lg bg-zinc-800/60 p-1">
          {SIZES.map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => onSizeChange(s.size)}
              className={segmented(s.size === exportSize)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="mb-2 block text-xs font-semibold text-zinc-500 uppercase">
          Shape
        </span>
        <div className="flex rounded-lg bg-zinc-800/60 p-1">
          {SHAPES.map((sh) => (
            <button
              key={sh.id}
              type="button"
              onClick={() => onShapeChange(sh.id)}
              className={segmented(sh.id === shape)}
            >
              {sh.label}
            </button>
          ))}
        </div>
        {shape === "rounded" && (
          <div className="mt-3">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-zinc-500">Radius</span>
              <code className="font-mono text-zinc-500">
                {Math.round(shapeRadius * 100)}%
              </code>
            </div>
            <input
              type="range"
              min={0.05}
              max={0.45}
              step={0.01}
              value={shapeRadius}
              onChange={(e) => onShapeRadiusChange(parseFloat(e.target.value))}
              className="w-full accent-zinc-100"
            />
          </div>
        )}
      </div>
    </div>
  );
}
