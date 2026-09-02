import { useEffect, useRef, useState, type CSSProperties } from "react";
import { EmojiPicker as Frimousse } from "frimousse";

interface Props {
  selected: string;
  onSelect: (emoji: string) => void;
  fontFamily: string;
}

const TARGET_CELL = 40;

function useAutoColumns(
  ref: React.RefObject<HTMLDivElement | null>,
  targetCell: number,
): number {
  const [columns, setColumns] = useState(8);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      setColumns(Math.max(1, Math.floor(el.clientWidth / targetCell)));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, targetCell]);
  return columns;
}

export function EmojiPicker({ selected, onSelect, fontFamily }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const columns = useAutoColumns(rootRef, TARGET_CELL);

  return (
    <Frimousse.Root
      ref={rootRef}
      columns={columns}
      onEmojiSelect={(emoji) => onSelect(emoji.emoji)}
      className="isolate flex h-64 w-full flex-col"
      style={{ "--frimousse-emoji-font": fontFamily } as CSSProperties}
    >
      <Frimousse.Search
        placeholder="Search emoji…"
        className="z-10 mb-2 w-full appearance-none rounded-lg bg-zinc-800 px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
      />
      <Frimousse.Viewport className="relative flex-1 outline-hidden">
        <Frimousse.Loading className="absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-700 border-t-zinc-100" />
        </Frimousse.Loading>
        <Frimousse.Empty className="absolute inset-0 flex items-center justify-center text-sm text-zinc-500">
          {({ search }) => <>No emoji found for “{search}”</>}
        </Frimousse.Empty>
        <Frimousse.List
          className="select-none pb-1.5"
          components={{
            CategoryHeader: ({ category, ...props }) => (
              <div
                className="bg-zinc-900 px-3 pt-3 pb-1.5 text-xs font-medium text-zinc-500"
                {...props}
              >
                {category.label}
              </div>
            ),
            Row: ({ children, ...props }) => (
              <div
                className="scroll-my-1.5"
                {...props}
                style={{
                  ...props.style,
                  display: "grid",
                  gridTemplateColumns: "repeat(var(--frimousse-list-columns), minmax(0, 1fr))",
                  gap: "4px",
                }}
              >
                {children}
              </div>
            ),
            Emoji: ({ emoji, ...props }) => (
              <button
                className={`flex h-9 w-full items-center justify-center rounded-md text-lg transition data-[active]:bg-zinc-800 ${
                  emoji.emoji === selected ? "bg-zinc-100" : ""
                }`}
                {...props}
              >
                {emoji.emoji}
              </button>
            ),
          }}
        />
      </Frimousse.Viewport>
    </Frimousse.Root>
  );
}
