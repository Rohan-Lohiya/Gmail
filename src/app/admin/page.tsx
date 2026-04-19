"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

import { MobileScreen } from "@/components/gmail/mobile-screen";
import { FIRST_MAIL_ID } from "@/data/mails";
import { useMailsStore } from "@/hooks/use-mails-store";
import type { MailItem } from "@/types/mail";

interface FormState {
  recipientName: string;
  sender: string;
  date: string;
  avatarUrl: string;
  pdfName: string;
  pdfUrl: string;
}

function buildFormState(mail: MailItem): FormState {
  const pdfAttachment = mail.attachments.find((attachment) => attachment.type === "pdf");

  return {
    recipientName: mail.recipientName ?? "",
    sender: mail.sender,
    date: mail.date,
    avatarUrl: mail.avatar.imageUrl ?? "",
    pdfName: pdfAttachment?.name ?? "",
    pdfUrl: pdfAttachment?.url ?? "",
  };
}

function AdminFirstMailForm({
  firstMail,
  onSave,
}: {
  firstMail: MailItem;
  onSave: (state: FormState) => void;
}) {
  const [formState, setFormState] = useState<FormState>(() => buildFormState(firstMail));
  const [statusText, setStatusText] = useState("");

  function onFieldChange(field: keyof FormState, value: string) {
    setFormState((previousState) => ({
      ...previousState,
      [field]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave(formState);
    setStatusText("Saved. Inbox now uses the updated first mail from localStorage.");
  }

  function handlePdfUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const fileUrl = typeof reader.result === "string" ? reader.result : "";
      setFormState((previousState) => ({
        ...previousState,
        pdfName: file.name,
        pdfUrl: fileUrl,
      }));
      setStatusText("PDF loaded. Click Save to persist it.");
    };
    reader.readAsDataURL(file);
  }

  function handleAvatarUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const fileUrl = typeof reader.result === "string" ? reader.result : "";
      setFormState((previousState) => ({
        ...previousState,
        avatarUrl: fileUrl,
      }));
      setStatusText("Profile picture loaded. Click Save to persist it.");
    };
    reader.readAsDataURL(file);
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <label className="block">
        <span className="mb-1 block text-sm text-gmail-secondary">Recipient Name</span>
        <input
          value={formState.recipientName}
          onChange={(event) => onFieldChange("recipientName", event.target.value)}
          className="w-full rounded-xl border border-gmail-chip-border bg-[#141820] px-3 py-2 text-gmail-text outline-none"
          placeholder="Rohan"
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm text-gmail-secondary">From</span>
        <input
          value={formState.sender}
          onChange={(event) => onFieldChange("sender", event.target.value)}
          className="w-full rounded-xl border border-gmail-chip-border bg-[#141820] px-3 py-2 text-gmail-text outline-none"
          placeholder="Triksha"
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm text-gmail-secondary">Date</span>
        <input
          value={formState.date}
          onChange={(event) => onFieldChange("date", event.target.value)}
          className="w-full rounded-xl border border-gmail-chip-border bg-[#141820] px-3 py-2 text-gmail-text outline-none"
          placeholder="9/8/2025"
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm text-gmail-secondary">Profile Picture URL or Data URL</span>
        <textarea
          value={formState.avatarUrl}
          onChange={(event) => onFieldChange("avatarUrl", event.target.value)}
          rows={3}
          className="w-full rounded-xl border border-gmail-chip-border bg-[#141820] px-3 py-2 text-gmail-text outline-none"
          placeholder="https://... or data:image/..."
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm text-gmail-secondary">Upload Profile Picture</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarUpload}
          className="w-full rounded-xl border border-gmail-chip-border bg-[#141820] px-3 py-2 text-gmail-secondary file:mr-3 file:rounded-full file:border-0 file:bg-[#c2e7ff] file:px-4 file:py-2 file:text-sm file:font-medium file:text-[#001d35]"
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm text-gmail-secondary">PDF Name</span>
        <input
          value={formState.pdfName}
          onChange={(event) => onFieldChange("pdfName", event.target.value)}
          className="w-full rounded-xl border border-gmail-chip-border bg-[#141820] px-3 py-2 text-gmail-text outline-none"
          placeholder="Internship certificate.pdf"
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm text-gmail-secondary">PDF URL or Data URL</span>
        <textarea
          value={formState.pdfUrl}
          onChange={(event) => onFieldChange("pdfUrl", event.target.value)}
          rows={3}
          className="w-full rounded-xl border border-gmail-chip-border bg-[#141820] px-3 py-2 text-gmail-text outline-none"
          placeholder="/attachments/rohan-lohiya-internship-certificate.pdf"
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm text-gmail-secondary">Upload PDF</span>
        <input
          type="file"
          accept="application/pdf"
          onChange={handlePdfUpload}
          className="w-full rounded-xl border border-gmail-chip-border bg-[#141820] px-3 py-2 text-gmail-secondary file:mr-3 file:rounded-full file:border-0 file:bg-[#c2e7ff] file:px-4 file:py-2 file:text-sm file:font-medium file:text-[#001d35]"
        />
      </label>

      <button
        type="submit"
        className="inline-flex h-11 items-center justify-center rounded-full bg-[#c2e7ff] px-6 text-[0.98rem] font-medium text-[#001d35]"
      >
        Save First Mail
      </button>

      {statusText ? <p className="text-sm text-[#9be39b]">{statusText}</p> : null}
    </form>
  );
}

export default function AdminPage() {
  const { firstMail, ready, updateFirstMail } = useMailsStore();

  return (
    <MobileScreen>
      <main className="scrollbar-none flex-1 overflow-y-auto px-4 pb-6 pt-5">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-[1.5rem] font-medium text-gmail-text">Admin - First Mail</h1>
          <Link
            href="/"
            className="rounded-full border border-gmail-chip-border px-4 py-1.5 text-[0.95rem] text-gmail-text"
          >
            Back
          </Link>
        </div>

        <p className="mb-5 text-[0.98rem] text-gmail-secondary">
          Customize only the first mail ({FIRST_MAIL_ID}). All mails are persisted in localStorage and
          displayed sorted by date.
        </p>

        {!ready || !firstMail ? (
          <p className="text-gmail-secondary">Loading mailbox...</p>
        ) : (
          <AdminFirstMailForm
            key={`${firstMail.id}:${firstMail.sender}:${firstMail.date}`}
            firstMail={firstMail}
            onSave={(state) => {
              updateFirstMail({
                recipientName: state.recipientName,
                sender: state.sender,
                date: state.date,
                avatarUrl: state.avatarUrl,
                pdfName: state.pdfName,
                pdfUrl: state.pdfUrl,
              });
            }}
          />
        )}
      </main>
    </MobileScreen>
  );
}