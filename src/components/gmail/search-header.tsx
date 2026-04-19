import { ArrowLeft, X } from "lucide-react";

interface SearchHeaderProps {
  query: string;
}

export function SearchHeader({ query }: SearchHeaderProps) {
  return (
    <header className="px-4 pt-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Back"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gmail-text"
        >
          <ArrowLeft className="h-7 w-7" strokeWidth={2.2} />
        </button>
        <div className="flex h-16 flex-1 items-center rounded-[34px] bg-gmail-pill px-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
          <span className="truncate text-[1.95rem] font-medium tracking-[0.01em] text-gmail-text">
            {query}
          </span>
        </div>
        <button
          type="button"
          aria-label="Close"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gmail-text"
        >
          <X className="h-8 w-8" strokeWidth={2.2} />
        </button>
      </div>
    </header>
  );
}