import { MailDetailRoute } from "@/components/gmail/mail-detail-route";

interface MailPageProps {
  params: Promise<{ id: string }>;
}

export default async function MailPage({ params }: MailPageProps) {
  const { id } = await params;

  return <MailDetailRoute id={id} />;
}