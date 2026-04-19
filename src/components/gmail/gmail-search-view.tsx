"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { ArrowLeft, Clock3, X } from "lucide-react";

import { MailListItem } from "@/components/gmail/mail-list-item";
import { MobileScreen } from "@/components/gmail/mobile-screen";
import { useMailsStore } from "@/hooks/use-mails-store";
import { searchMails } from "@/lib/mail-search";

const RECENT_SEARCHES_KEY = "gmail-clone-recent-searches-v1";
const SEARCH_TOKENS = [
  "from:",
  "to:",
  "subject:",
  "has:attachment",
  "filename:",
  "before:",
  "after:",
];

function getInitialRecentSearches(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(RECENT_SEARCHES_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as string[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.slice(0, 6);
  } catch {
    return [];
  }
}

interface GmailSearchViewProps {
  initialQuery?: string;
}

export function GmailSearchView({ initialQuery = "" }: GmailSearchViewProps) {
  const router = useRouter();
  const { mails } = useMailsStore();

  const [query, setQuery] = useState(initialQuery);
  const [recentSearches, setRecentSearches] = useState<string[]>(getInitialRecentSearches);

  const trimmedQuery = query.trim();
  const results = useMemo(() => searchMails(mails, trimmedQuery), [mails, trimmedQuery]);

  function persistRecentSearches(values: string[]) {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(values));
  }

  function addRecentSearch(term: string) {
    const normalized = term.trim();
    if (!normalized) {
      return;
    }

    const updated = [normalized, ...recentSearches.filter((entry) => entry !== normalized)].slice(0, 6);
    setRecentSearches(updated);
    persistRecentSearches(updated);
  }

  function setQueryAndUrl(nextQuery: string) {
    setQuery(nextQuery);
    const nextTrimmed = nextQuery.trim();
    if (nextTrimmed) {
      router.replace(`/search?q=${encodeURIComponent(nextTrimmed)}`);
      return;
    }

    router.replace("/search");
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!trimmedQuery) {
      return;
    }

    addRecentSearch(trimmedQuery);
    setQueryAndUrl(trimmedQuery);
  }

  function applyToken(token: string) {
    const nextValue = `${query}${query.endsWith(" ") || !query ? "" : " "}${token}`;
    setQueryAndUrl(nextValue);
  }

  return (
    <MobileScreen>
      <header className="px-4 pb-2 pt-4">
        <form
          onSubmit={onSubmit}
          className="flex h-14 items-center rounded-full bg-gmail-pill pl-2 pr-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
        >
          <Link
            href="/"
            aria-label="Back to inbox"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gmail-text"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>

          <input
            autoFocus
            value={query}
            onChange={(event) => setQueryAndUrl(event.target.value)}
            placeholder="Search in emails"
            className="h-full flex-1 bg-transparent px-2 text-[1.08rem] text-gmail-text outline-none placeholder:text-gmail-secondary"
          />

          {query ? (
            <button
              type="button"
              aria-label="Clear search"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gmail-secondary"
              onClick={() => setQueryAndUrl("")}
            >
              <X className="h-5 w-5" />
            </button>
          ) : null}
        </form>
      </header>

      <main className="scrollbar-none flex-1 overflow-y-auto pb-4">
        {trimmedQuery ? (
          <>
            <div className="mb-1 flex items-center justify-between px-4 text-[0.95rem] text-gmail-secondary">
              <span>{results.length} results</span>
              <span>Most relevant</span>
            </div>

            {results.length ? (
              results.map((mail) => <MailListItem key={mail.id} mail={mail} />)
            ) : (
              <div className="px-4 py-12 text-center text-gmail-secondary">
                No messages matched &quot;{trimmedQuery}&quot;.
              </div>
            )}
          </>
        ) : (
          <>
            <section className="px-4 py-2">
              <h2 className="mb-2 text-[0.9rem] uppercase tracking-[0.08em] text-gmail-secondary">
                Search options
              </h2>
              <div className="scrollbar-none flex gap-2 overflow-x-auto pb-2">
                {SEARCH_TOKENS.map((token) => (
                  <button
                    key={token}
                    type="button"
                    onClick={() => applyToken(token)}
                    className="rounded-full border border-gmail-chip-border bg-[#141820] px-3 py-1.5 text-[0.88rem] text-gmail-text"
                  >
                    {token}
                  </button>
                ))}
              </div>
            </section>

            <section className="px-4 pb-4 pt-2">
              <h2 className="mb-2 text-[0.9rem] uppercase tracking-[0.08em] text-gmail-secondary">
                Recent searches
              </h2>

              {recentSearches.length ? (
                <div className="space-y-1">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQueryAndUrl(term)}
                      className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left hover:bg-white/[0.04]"
                    >
                      <Clock3 className="h-4 w-4 text-gmail-secondary" />
                      <span className="text-[0.98rem] text-gmail-text">{term}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-[0.95rem] text-gmail-secondary">
                  Search by sender, subject, text, or operators like from: and has:attachment.
                </p>
              )}
            </section>
          </>
        )}
      </main>
    </MobileScreen>
  );
}