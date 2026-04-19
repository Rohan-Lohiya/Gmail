import Link from "next/link";
import { Star } from "lucide-react";

import { AttachmentPill } from "@/components/gmail/attachment-pill";
import { MailAvatar } from "@/components/gmail/mail-avatar";
import type { MailItem } from "@/types/mail";

interface MailListItemProps {
  mail: MailItem;
}

export function MailListItem({ mail }: MailListItemProps) {
  const primaryAttachment = mail.attachments[0];

  return (
    <Link href={`/mail/${mail.id}`} className="block outline-none">
      <article className="border-b border-white/5 px-4 py-3 transition-colors hover:bg-white/[0.02]">
        <div className="flex items-start gap-3">
          <MailAvatar avatar={mail.avatar} />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="truncate text-[1.24rem] font-medium leading-tight text-gmail-text">
                  {mail.sender}
                  {mail.senderCount ? (
                    <span className="ml-2 text-[1rem] text-gmail-secondary">
                      {mail.senderCount}
                    </span>
                  ) : null}
                </h3>
              </div>
              <span className="shrink-0 pt-1 text-[0.98rem] text-gmail-secondary">{mail.date}</span>
            </div>

            <p className="mt-0.5 truncate text-[1.18rem] font-medium leading-tight text-gmail-text">
              {mail.subject}
            </p>

            <div className="mt-0.5 flex items-center gap-2">
              <p className="min-w-0 flex-1 truncate text-[1.03rem] leading-tight text-gmail-secondary">
                {mail.preview}
              </p>
              <Star
                className={`h-7 w-7 ${mail.isStarred ? "fill-[#e8eaed] text-[#e8eaed]" : "text-[#9aa0a6]"}`}
              />
            </div>

            {primaryAttachment ? (
              <div className="mt-2">
                <AttachmentPill attachment={primaryAttachment} compact />
              </div>
            ) : null}
          </div>
        </div>
      </article>
    </Link>
  );
}