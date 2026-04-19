import Link from "next/link";

import { MobileScreen } from "@/components/gmail/mobile-screen";

export default function NotFound() {
  return (
    <MobileScreen>
      <main className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <h1 className="text-5xl font-medium text-gmail-text">Mail not found</h1>
        <p className="mt-3 text-xl text-gmail-secondary">
          The selected message does not exist in this demo inbox.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full border border-gmail-chip-border px-6 py-3 text-lg text-gmail-text"
        >
          Go back to inbox
        </Link>
      </main>
    </MobileScreen>
  );
}