"use client";

import Link from "next/link";

import { MailDetailView } from "@/components/gmail/mail-detail-view";
import { MobileScreen } from "@/components/gmail/mobile-screen";
import { useMailsStore } from "@/hooks/use-mails-store";

interface MailDetailRouteProps {
  id: string;
}

export function MailDetailRoute({ id }: MailDetailRouteProps) {
  const { mails, ready } = useMailsStore();
  const mail = mails.find((item) => item.id === id);

  if (!ready) {
    return (
      <MobileScreen>
        <main className="flex flex-1 items-center justify-center px-6 text-gmail-secondary">
          Loading mail...
        </main>
      </MobileScreen>
    );
  }

  if (!mail) {
    return (
      <MobileScreen>
        <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <h1 className="text-3xl font-medium text-gmail-text">Mail not found</h1>
          <p className="mt-3 text-base text-gmail-secondary">
            The message could not be loaded from your local mailbox.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full border border-gmail-chip-border px-5 py-2 text-gmail-text"
          >
            Back to inbox
          </Link>
        </main>
      </MobileScreen>
    );
  }

  return <MailDetailView mail={mail} />;
}