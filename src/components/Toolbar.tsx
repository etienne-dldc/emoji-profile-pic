import type { ReactNode } from "react";
import { Dices, Download, Image, Move, Palette, Smile } from "lucide-react";
import { Tooltip } from "@base-ui/react/tooltip";

export type ToolId = "emoji" | "background" | "transform" | "image" | "randomize" | "export";

interface Tool {
  id: ToolId;
  label: string;
  icon: ReactNode;
}

const TOOLS: Tool[] = [
  { id: "emoji", label: "Emoji", icon: <Smile /> },
  { id: "background", label: "Background", icon: <Palette /> },
  { id: "transform", label: "Transform", icon: <Move /> },
  { id: "image", label: "Image", icon: <Image /> },
  { id: "randomize", label: "Randomize", icon: <Dices /> },
  { id: "export", label: "Export", icon: <Download /> },
];

interface IconButtonProps {
  label: string;
  children: ReactNode;
  active?: boolean;
  onClick: () => void;
}

function IconButton({ label, children, active, onClick }: IconButtonProps) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        aria-label={label}
        onClick={onClick}
        className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
          active
            ? "bg-zinc-100 text-zinc-900"
            : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
        }`}
      >
        {children}
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner side="top" sideOffset={8} align="center">
          <Tooltip.Popup className="rounded-md bg-zinc-700 px-2 py-1 text-xs font-medium text-zinc-100 shadow-lg">
            <Tooltip.Arrow className="fill-zinc-700">
              <svg width="8" height="8" viewBox="0 0 8 8">
                <path d="M0 8 4 4l4 4z" fill="#3f3f46" />
              </svg>
            </Tooltip.Arrow>
            {label}
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

interface ToolbarProps {
  activeTool: ToolId | null;
  onSelect: (tool: ToolId) => void;
}

export function Toolbar({ activeTool, onSelect }: ToolbarProps) {
  return (
    <Tooltip.Provider>
      <div className="flex items-center gap-1 rounded-2xl border border-zinc-800 bg-zinc-900 p-1.5">
        {TOOLS.map((tool) => (
          <IconButton
            key={tool.id}
            label={tool.label}
            active={activeTool === tool.id}
            onClick={() => onSelect(tool.id)}
          >
            {tool.icon}
          </IconButton>
        ))}
      </div>
    </Tooltip.Provider>
  );
}
