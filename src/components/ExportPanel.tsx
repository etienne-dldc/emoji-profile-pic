import { Check, Copy, Download } from "lucide-react";

interface Props {
  onDownload: () => void;
  onCopy: () => void;
  copied: boolean;
}

const buttonClass =
  "flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:bg-zinc-700 hover:text-zinc-100";

export function ExportPanel({ onDownload, onCopy, copied }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <button type="button" onClick={onDownload} className={buttonClass}>
        <Download className="h-4 w-4" />
        Download PNG
        <Download className="h-4 w-4" />
      </button>
      <button type="button" onClick={onCopy} className={buttonClass}>
        <Copy className="h-4 w-4" />
        {copied ? "Copied!" : "Copy to clipboard"}
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}
