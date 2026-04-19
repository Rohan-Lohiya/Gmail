import Link from "next/link";
import type { ReactNode } from "react";
import {
  Archive,
  ArrowLeft,
  ChevronDown,
  Forward,
  MailOpen,
  MoreVertical,
  Reply,
  Smile,
  Star,
  Trash2,
} from "lucide-react";

import { AttachmentPill } from "@/components/gmail/attachment-pill";
import { MailAvatar } from "@/components/gmail/mail-avatar";
import { MobileScreen } from "@/components/gmail/mobile-screen";
import { PdfAttachmentPreview } from "@/components/gmail/pdf-attachment-preview";
import type { MailItem } from "@/types/mail";

interface MailDetailViewProps {
  mail: MailItem;
}

function IconButton({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gmail-text sm:h-10 sm:w-10"
    >
      {children}
    </button>
  );
}

export function MailDetailView({ mail }: MailDetailViewProps) {
  const pdfAttachment = mail.attachments.find((attachment) => attachment.type === "pdf");
  const nonPdfAttachments = mail.attachments.filter((attachment) => attachment.type !== "pdf");

  return (
    <MobileScreen>
      <header className="px-3 pt-3 sm:px-4 sm:pt-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            aria-label="Back to inbox"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gmail-text"
          >
            <ArrowLeft className="h-7 w-7" strokeWidth={2.2} />
          </Link>
          <div className="flex items-center gap-1">
            <IconButton label="Archive">
              <Archive className="h-7 w-7" />
            </IconButton>
            <IconButton label="Delete">
              <Trash2 className="h-7 w-7" />
            </IconButton>
            <IconButton label="Mark unread">
              <MailOpen className="h-7 w-7" />
            </IconButton>
            <IconButton label="More options">
              <MoreVertical className="h-7 w-7" />
            </IconButton>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-3 pb-4 pt-4 sm:px-4 sm:pt-6">
        <div className="flex items-start justify-between gap-3">
          <h1 className="break-words text-[clamp(2rem,7vw,2.35rem)] font-medium leading-tight text-gmail-text">
            {mail.subject}
          </h1>
          <button type="button" aria-label="Star" className="pt-1 text-[#9aa0a6]">
            <Star className="h-8 w-8 sm:h-10 sm:w-10" />
          </button>
        </div>

        <div className="mt-2 inline-flex rounded-xl bg-[#e8eaed] px-3 py-1 text-[0.95rem] font-medium text-[#1f1f1f]">
          {mail.labels[0]}
        </div>

        <article className="mt-4 rounded-3xl bg-gmail-card px-3 py-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] sm:mt-5 sm:px-4 sm:py-5">
          <div className="flex items-start gap-3">
            <MailAvatar avatar={mail.avatar} size="detail" />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[clamp(1.35rem,5vw,1.65rem)] font-medium text-gmail-text">
                    {mail.sender}
                    <span className="ml-2 text-[clamp(0.95rem,3.5vw,1.1rem)] font-normal text-gmail-secondary">
                      {mail.date}
                    </span>
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-[clamp(0.95rem,3.5vw,1.1rem)] text-gmail-secondary"
                  >
                    <span>{mail.toLine}</span>
                    <ChevronDown className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex items-center gap-1 text-gmail-secondary">
                  <IconButton label="React with emoji">
                    <Smile className="h-7 w-7" />
                  </IconButton>
                  <IconButton label="Reply">
                    <Reply className="h-7 w-7" />
                  </IconButton>
                  <IconButton label="Message options">
                    <MoreVertical className="h-7 w-7" />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-4 text-[clamp(1.15rem,4.4vw,1.35rem)] leading-snug text-gmail-text sm:space-y-5">
            {mail.body.map((line, index) => {
              if (!line) {
                return <div key={`break-${index}`} className="h-4" />;
              }

              return <p key={`${line}-${index}`}>{line}</p>;
            })}
          </div>

          {pdfAttachment ? <PdfAttachmentPreview attachment={pdfAttachment} /> : null}

          {nonPdfAttachments.length ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {nonPdfAttachments.map((attachment) => (
                <AttachmentPill key={attachment.id} attachment={attachment} asLink />
              ))}
            </div>
          ) : null}
        </article>
      </main>

      <footer className="px-3 pb-[calc(env(safe-area-inset-bottom)+0.9rem)] pt-3 sm:px-4 sm:pt-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-[#d7d9de] text-[clamp(1rem,4vw,1.35rem)] font-medium text-[#232529] sm:h-16"
          >
            <Reply className="h-5 w-5 sm:h-6 sm:w-6" />
            Reply
          </button>
          <button
            type="button"
            className="inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-[#d7d9de] text-[clamp(1rem,4vw,1.35rem)] font-medium text-[#232529] sm:h-16"
          >
            <Forward className="h-5 w-5 sm:h-6 sm:w-6" />
            Forward
          </button>
          <button
            type="button"
            aria-label="Emoji reactions"
            className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#d7d9de] text-[#232529] sm:h-16 sm:w-16"
          >
            <Smile className="h-6 w-6 sm:h-7 sm:w-7" />
          </button>
        </div>
      </footer>
    </MobileScreen>
  );
}