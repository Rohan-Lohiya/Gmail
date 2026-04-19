import Link from "next/link";
import { Menu, Sparkles } from "lucide-react";

interface HomeAppBarProps {
  onOpenDrawer: () => void;
  profileImageUrl?: string;
}

export function HomeAppBar({ onOpenDrawer, profileImageUrl }: HomeAppBarProps) {
  return (
    <header className="px-3 pb-3 pt-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Open navigation drawer"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gmail-text"
          onClick={onOpenDrawer}
        >
          <Menu className="h-6 w-6" />
        </button>

        <Link
          href="/search"
          className="inline-flex h-14 flex-1 items-center justify-between rounded-full bg-gmail-pill pl-6 pr-4 text-left shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
          aria-label="Search in emails"
        >
          <span className="text-[1.08rem] text-gmail-secondary">Search in emails</span>
          <Sparkles className="h-5 w-5 text-gmail-secondary" />
        </Link>

        <Link
          href="/account"
          aria-label="Google account"
          className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#7fa6cb] text-sm font-medium text-[#0d2741]"
        >
          {profileImageUrl ? (
            <span
              className="block h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url("${profileImageUrl}")` }}
              aria-label="Profile picture"
            />
          ) : (
            "R"
          )}
        </Link>
      </div>
    </header>
  );
}