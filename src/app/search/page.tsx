import { GmailSearchView } from "@/components/gmail/gmail-search-view";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;

  return <GmailSearchView initialQuery={q ?? ""} />;
}