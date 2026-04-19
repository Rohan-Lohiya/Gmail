import {
  AlertCircle,
  Archive,
  Calendar,
  CircleHelp,
  Clock3,
  FileText,
  Inbox,
  Mail,
  Plus,
  Send,
  Settings,
  Star,
  Tag,
  Trash2,
  Users,
  X,
} from "lucide-react";
import type { ReactNode } from "react";

interface GmailNavigationDrawerProps {
  open: boolean;
  onClose: () => void;
}

interface DrawerItem {
  label: string;
  icon: ReactNode;
  count?: string;
  active?: boolean;
}

interface DrawerSection {
  title?: string;
  items: DrawerItem[];
}

const DRAWER_SECTIONS: DrawerSection[] = [
  {
    items: [
      { label: "All inboxes", icon: <Inbox className="h-5 w-5" /> },
      { label: "Primary", icon: <Mail className="h-5 w-5" />, active: true },
      { label: "Promotions", icon: <Tag className="h-5 w-5" /> },
      { label: "Social", icon: <Users className="h-5 w-5" /> },
    ],
  },
  {
    title: "All labels",
    items: [
      { label: "Starred", icon: <Star className="h-5 w-5" /> },
      { label: "Snoozed", icon: <Clock3 className="h-5 w-5" /> },
      { label: "Important", icon: <AlertCircle className="h-5 w-5" /> },
      { label: "Sent", icon: <Send className="h-5 w-5" /> },
      { label: "Scheduled", icon: <Clock3 className="h-5 w-5" /> },
      { label: "Outbox", icon: <Send className="h-5 w-5" /> },
      { label: "Drafts", icon: <FileText className="h-5 w-5" />, count: "12" },
      { label: "All mail", icon: <Archive className="h-5 w-5" /> },
      { label: "Spam", icon: <AlertCircle className="h-5 w-5" /> },
      { label: "Bin", icon: <Trash2 className="h-5 w-5" /> },
    ],
  },
  {
    title: "Google apps",
    items: [
      { label: "Calendar", icon: <Calendar className="h-5 w-5" /> },
      { label: "Contacts", icon: <Users className="h-5 w-5" /> },
    ],
  },
  {
    title: "More",
    items: [
      { label: "Manage labels", icon: <Tag className="h-5 w-5" /> },
      { label: "Create new", icon: <Plus className="h-5 w-5" /> },
      { label: "Settings", icon: <Settings className="h-5 w-5" /> },
      { label: "Help & feedback", icon: <CircleHelp className="h-5 w-5" /> },
    ],
  },
];

export function GmailNavigationDrawer({ open, onClose }: GmailNavigationDrawerProps) {
  return (
    <div className={`absolute inset-0 z-40 ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
      <button
        type="button"
        aria-label="Close navigation drawer"
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      <aside
        className={`absolute left-0 top-0 h-full w-[84%] max-w-[340px] bg-[#202124] pb-4 pt-2 shadow-[10px_0_24px_rgba(0,0,0,0.45)] transition-transform ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 py-3">
          <h2 className="text-[1.55rem] font-medium text-[#ea4335]">Gmail</h2>
          <button
            type="button"
            aria-label="Close"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gmail-text"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="scrollbar-none h-[calc(100%-58px)] overflow-y-auto">
          {DRAWER_SECTIONS.map((section, sectionIndex) => (
            <div key={`${section.title ?? "section"}-${sectionIndex}`} className="pb-2">
              {section.title ? (
                <h3 className="px-5 pb-1 pt-3 text-[0.78rem] uppercase tracking-[0.08em] text-gmail-secondary">
                  {section.title}
                </h3>
              ) : null}

              {section.items.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={`flex w-full items-center gap-4 rounded-r-full py-2 pl-5 pr-4 text-left ${
                    item.active ? "bg-[#3c4043] text-gmail-text" : "text-gmail-text hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center text-gmail-secondary">
                    {item.icon}
                  </span>
                  <span className="flex-1 text-[1rem] font-medium">{item.label}</span>
                  {item.count ? <span className="text-sm text-gmail-secondary">{item.count}</span> : null}
                </button>
              ))}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}