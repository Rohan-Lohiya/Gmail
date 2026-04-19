import { Mail, Video } from "lucide-react";

interface MobileBottomNavProps {
  active: "mail" | "meet";
}

export function MobileBottomNav({ active }: MobileBottomNavProps) {
  return (
    <footer className="mt-auto border-t border-white/5 bg-[#2b2c2f] px-4 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 sm:px-6 sm:pt-3">
      <div className="flex items-center justify-between">
        <button type="button" className="relative flex flex-col items-center gap-2 text-gmail-text">
          <span
            className={`relative inline-flex h-12 w-18 items-center justify-center rounded-full sm:h-14 sm:w-20 ${
              active === "mail" ? "bg-[#44474c]" : "bg-transparent"
            }`}
          >
            <Mail className="h-6 w-6 sm:h-7 sm:w-7" />
            <span className="absolute -right-1 -top-1 rounded-full bg-[#f28b82] px-2 py-0.5 text-xs font-bold text-[#3a1111]">
              99+
            </span>
          </span>
          <span className="text-[0.8rem] font-medium text-gmail-text">Mail</span>
        </button>

        <button type="button" className="flex flex-col items-center gap-2 text-gmail-text">
          <span
            className={`inline-flex h-12 w-18 items-center justify-center rounded-full sm:h-14 sm:w-20 ${
              active === "meet" ? "bg-[#44474c]" : "bg-transparent"
            }`}
          >
            <Video className="h-6 w-6 sm:h-7 sm:w-7" />
          </span>
          <span className="text-[0.8rem] font-medium text-gmail-text">Meet</span>
        </button>
      </div>
    </footer>
  );
}