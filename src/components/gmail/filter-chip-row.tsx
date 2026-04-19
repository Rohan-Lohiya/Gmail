import { ChevronDown } from "lucide-react";

interface FilterChip {
  label: string;
  withCaret?: boolean;
}

interface FilterChipRowProps {
  chips: FilterChip[];
}

export function FilterChipRow({ chips }: FilterChipRowProps) {
  return (
    <div className="scrollbar-none mt-5 flex gap-3 overflow-x-auto px-4 pb-2">
      {chips.map((chip) => (
        <button
          type="button"
          key={chip.label}
          className="inline-flex h-14 items-center gap-2 rounded-2xl border border-gmail-chip-border bg-transparent px-6 text-[1.2rem] font-medium text-gmail-text"
        >
          <span>{chip.label}</span>
          {chip.withCaret ? <ChevronDown className="h-5 w-5" /> : null}
        </button>
      ))}
    </div>
  );
}