import { ChevronDown, MoreVertical, SlidersHorizontal } from "lucide-react";

interface InboxToolbarProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

const INBOX_MENU_OPTIONS = [
  "Select all",
  "Mark all as read",
  "Move to",
  "Change labels",
  "Settings",
  "Help & feedback",
];

export function InboxToolbar({ isMenuOpen, onToggleMenu }: InboxToolbarProps) {
  return (
    <section className="relative z-30 px-4 pb-2">
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="Inbox category"
          className="inline-flex items-center gap-1 text-[1.85rem] font-medium text-gmail-text"
        >
          Primary
          <ChevronDown className="h-5 w-5" />
        </button>

        <div className="relative flex items-center gap-1">
          <button
            type="button"
            aria-label="Filter messages"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gmail-text"
          >
            <SlidersHorizontal className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="More inbox options"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gmail-text"
            onClick={onToggleMenu}
          >
            <MoreVertical className="h-5 w-5" />
          </button>

          {isMenuOpen ? (
            <div className="absolute right-0 top-11 w-52 overflow-hidden rounded-2xl border border-white/10 bg-[#2b2c2f] py-2 text-gmail-text shadow-[0_16px_30px_rgba(0,0,0,0.45)]">
              {INBOX_MENU_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  className="block w-full px-4 py-2 text-left text-[0.95rem] hover:bg-white/[0.06]"
                >
                  {option}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}