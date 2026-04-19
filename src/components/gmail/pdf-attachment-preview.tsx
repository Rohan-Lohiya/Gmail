import { Download, ExternalLink } from "lucide-react";

import type { MailAttachment } from "@/types/mail";

interface PdfAttachmentPreviewProps {
  attachment: MailAttachment;
}

export function PdfAttachmentPreview({ attachment }: PdfAttachmentPreviewProps) {
  const previewUrl = `${attachment.url}#toolbar=0&navpanes=0&scrollbar=0&page=1&view=FitH`;
  const fallbackName = attachment.name
    .replace(/\.pdf$/i, "")
    .replace(/internship certificate/i, "")
    .trim()
    .toUpperCase();

  return (
    <section className="mt-6 overflow-hidden rounded-[24px] border border-white/10 bg-[#111419]">
      <a
        href={attachment.url}
        target="_blank"
        rel="noreferrer"
        className="block"
        aria-label={`Open ${attachment.name}`}
      >
        <div className="pointer-events-none overflow-hidden bg-[#eef2f7]">
          <object data={previewUrl} type="application/pdf" className="h-52 w-full">
            <div className="flex h-52 w-full flex-col items-center justify-center bg-[#e8edf3] px-6 text-center">
              <p className="text-xs font-semibold tracking-[0.25em] text-[#3c7d93]">TRIKSHA</p>
              <p className="mt-2 text-2xl font-bold tracking-[0.16em] text-[#3b7e95]">CERTIFICATE</p>
              <p className="text-xs tracking-[0.2em] text-[#2a2f3c]">OF INTERNSHIP</p>
              <p className="mt-6 text-lg text-[#2f3440]">{fallbackName || "CERTIFICATE"}</p>
            </div>
          </object>
        </div>
      </a>

      <div className="border-t border-white/10 px-3 py-3">
        <div className="flex items-center gap-2 rounded-full border border-gmail-chip-border bg-[#141820] px-3 py-2 text-gmail-text">
          <span className="inline-flex h-7 min-w-8 items-center justify-center rounded bg-[#ef4b3f] px-1.5 text-xs font-bold uppercase tracking-wide text-[#180907]">
            PDF
          </span>

          <a
            href={attachment.url}
            target="_blank"
            rel="noreferrer"
            className="min-w-0 flex-1 truncate text-[1.02rem] text-gmail-text"
          >
            {attachment.name}
          </a>

          <a
            href={attachment.url}
            download
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gmail-secondary hover:bg-white/10"
            aria-label={`Download ${attachment.name}`}
          >
            <Download className="h-4 w-4" />
          </a>

          <a
            href={attachment.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gmail-secondary hover:bg-white/10"
            aria-label={`Open ${attachment.name} in new tab`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}