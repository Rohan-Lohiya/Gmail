"use client";

import { useMemo, useSyncExternalStore } from "react";

import {
  buildFirstMailBody,
  buildFirstMailPreview,
  buildFirstMailSubject,
  defaultMails,
  FIRST_MAIL_ID,
  sortMailsByDate,
} from "@/data/mails";
import type { MailAttachment, MailItem } from "@/types/mail";

const STORAGE_KEY = "gmail-clone-mails-v1";
type Listener = () => void;
const listeners = new Set<Listener>();

export interface FirstMailCustomization {
  recipientName: string;
  sender: string;
  date: string;
  avatarUrl?: string;
  pdfName?: string;
  pdfUrl?: string;
}

const defaultSortedMails = sortMailsByDate(defaultMails);
let cachedRaw: string | null | undefined;
let cachedSnapshot: MailItem[] = defaultSortedMails;

function mergeWithDefaultMails(storedMails: MailItem[]): MailItem[] {
  const storedById = new Map(storedMails.map((mail) => [mail.id, mail]));
  const merged = [...storedMails];

  for (const defaultMail of defaultSortedMails) {
    if (!storedById.has(defaultMail.id)) {
      merged.push(defaultMail);
    }
  }

  return sortMailsByDate(merged);
}

function readMailsFromStorage(): MailItem[] {
  if (typeof window === "undefined") {
    return defaultSortedMails;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (raw === cachedRaw) {
    return cachedSnapshot;
  }

  if (!raw) {
    cachedRaw = raw;
    cachedSnapshot = defaultSortedMails;
    return defaultSortedMails;
  }

  try {
    const parsed = JSON.parse(raw) as MailItem[];
    if (!Array.isArray(parsed)) {
      cachedRaw = raw;
      cachedSnapshot = defaultSortedMails;
      return defaultSortedMails;
    }

    const merged = mergeWithDefaultMails(parsed);
    cachedRaw = raw;
    cachedSnapshot = merged;
    return merged;
  } catch {
    cachedRaw = raw;
    cachedSnapshot = defaultSortedMails;
    return defaultSortedMails;
  }
}

function subscribeToMails(listener: Listener): () => void {
  listeners.add(listener);

  if (typeof window === "undefined") {
    return () => {
      listeners.delete(listener);
    };
  }

  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      listener();
    }
  };

  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function notifyMailsChanged() {
  for (const listener of listeners) {
    listener();
  }
}

function writeMailsToStorage(mails: MailItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  const sorted = sortMailsByDate(mails);
  const serialized = JSON.stringify(sorted);

  cachedRaw = serialized;
  cachedSnapshot = sorted;

  window.localStorage.setItem(STORAGE_KEY, serialized);
  notifyMailsChanged();
}

function findPdfAttachment(attachments: MailAttachment[]): MailAttachment | undefined {
  return attachments.find((attachment) => attachment.type === "pdf");
}

export function useMailsStore() {
  const mails = useSyncExternalStore(
    subscribeToMails,
    readMailsFromStorage,
    () => defaultSortedMails,
  );

  const firstMail = useMemo(
    () => mails.find((mail) => mail.id === FIRST_MAIL_ID),
    [mails],
  );

  function updateFirstMail(customization: FirstMailCustomization) {
    const previousMails = readMailsFromStorage();

    const updated = previousMails.map((mail) => {
      if (mail.id !== FIRST_MAIL_ID) {
        return mail;
      }

      const sender = customization.sender.trim() || mail.sender;
      const recipientName = customization.recipientName.trim() || mail.recipientName || "Rohan";
      const date = customization.date.trim() || mail.date;
      const avatarUrl = customization.avatarUrl?.trim();

      const currentPdf = findPdfAttachment(mail.attachments);
      const pdfAttachment: MailAttachment = {
        id: currentPdf?.id ?? "internship-certificate-pdf",
        type: "pdf",
        name:
          customization.pdfName?.trim() ||
          currentPdf?.name ||
          `${recipientName} internship certificate.pdf`,
        url:
          customization.pdfUrl?.trim() ||
          currentPdf?.url ||
          "/attachments/rohan-lohiya-internship-certificate.pdf",
      };

      return {
        ...mail,
        sender,
        recipientName,
        date,
        subject: buildFirstMailSubject(sender),
        preview: buildFirstMailPreview(sender),
        body: buildFirstMailBody(recipientName, sender),
        avatar: {
          ...mail.avatar,
          imageUrl: avatarUrl || undefined,
        },
        attachments: [pdfAttachment],
      };
    });

    writeMailsToStorage(updated);
  }

  function resetMails() {
    writeMailsToStorage(defaultSortedMails);
  }

  return {
    mails,
    firstMail,
    ready: true,
    updateFirstMail,
    resetMails,
  };
}