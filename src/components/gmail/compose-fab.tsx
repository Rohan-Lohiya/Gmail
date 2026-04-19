import { Pencil } from "lucide-react";

export function ComposeFab() {
  return (
    <button
      type="button"
      aria-label="Compose"
      className="absolute bottom-24 right-4 z-20 inline-flex h-14 items-center gap-3 rounded-2xl bg-[#c2e7ff] px-5 text-[1rem] font-medium text-[#001d35] shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
    >
      <Pencil className="h-5 w-5" />
      Compose
    </button>
  );
}