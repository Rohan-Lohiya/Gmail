import { UserRound } from "lucide-react";

import type { MailAvatar as MailAvatarType } from "@/types/mail";

interface MailAvatarProps {
  avatar: MailAvatarType;
  size?: "list" | "detail";
}

export function MailAvatar({ avatar, size = "list" }: MailAvatarProps) {
  const sizeClass = size === "list" ? "h-12 w-12" : "h-16 w-16";
  const iconClass = size === "list" ? "h-7 w-7" : "h-8 w-8";
  const letterClass = size === "list" ? "text-2xl" : "text-3xl";

  return (
    <span
      className={`${sizeClass} inline-flex shrink-0 items-center justify-center rounded-full`}
      style={{
        backgroundColor: avatar.bgColor,
        color: avatar.textColor ?? "#ffffff",
      }}
    >
      {avatar.variant === "default" ? (
        <UserRound className={iconClass} strokeWidth={2} />
      ) : (
        <span className={`${letterClass} font-medium leading-none`}>{avatar.value}</span>
      )}
    </span>
  );
}