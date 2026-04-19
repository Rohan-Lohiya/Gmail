import { FileText, ImageIcon } from "lucide-react";

import type { MailAttachment } from "@/types/mail";

interface AttachmentPillProps {
  attachment: MailAttachment;
  compact?: boolean;
  asLink?: boolean;
}

function AttachmentTypeIcon({ attachment }: { attachment: MailAttachment }) {
  if (attachment.type === "pdf") {
    return (
      <span className="inline-flex h-7 min-w-8 items-center justify-center rounded bg-[#ef4b3f] px-1.5 text-xs font-bold uppercase tracking-wide text-[#180907]">
        PDF
      </span>
    );
  }

  if (attachment.type === "image") {
    return (
      <span className="inline-flex h-7 w-8 items-center justify-center rounded bg-[#ef4b3f] text-[#1d0907]">
        <ImageIcon className="h-4 w-4" strokeWidth={2.5} />
      </span>
    );
  }

  return (
    <span className="inline-flex h-7 w-8 items-center justify-center rounded bg-[#3f79d9] text-[#081328]">
      <FileText className="h-4 w-4" strokeWidth={2.5} />
    </span>
  );
}

export function AttachmentPill({ attachment, compact, asLink }: AttachmentPillProps) {
  const commonClassName =
    "inline-flex max-w-full items-center gap-3 rounded-full border border-gmail-chip-border bg-[#111419] px-3 py-2 text-gmail-secondary";
  const content = (
    <>
      <AttachmentTypeIcon attachment={attachment} />
      <span className={`${compact ? "max-w-[190px]" : "max-w-[250px]"} truncate text-[1.15rem]`}>
        {attachment.name}
      </span>
    </>
  );

  if (!asLink) {
    return <span className={commonClassName}>{content}</span>;
  }

  const opensDocument = attachment.url.startsWith("/");

  return (
    <a
      href={attachment.url}
      className={`${commonClassName} hover:border-[#81858b]`}
      target={opensDocument ? "_blank" : undefined}
      rel={opensDocument ? "noreferrer" : undefined}
    >
      {content}
    </a>
  );
}