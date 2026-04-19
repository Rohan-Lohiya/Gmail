import { parseMailDateValue } from "@/data/mails";
import type { MailItem } from "@/types/mail";

interface ParsedQuery {
  freeTokens: string[];
  from?: string;
  to?: string;
  subject?: string;
  filename?: string;
  hasAttachment?: boolean;
  before?: number;
  after?: number;
}

function parseOperatorDate(value: string): number | undefined {
  const parsed = Date.parse(value.replace(/\//g, "-"));
  if (!Number.isNaN(parsed)) {
    return parsed;
  }

  const fromCustom = parseMailDateValue(value);
  return fromCustom > 0 ? fromCustom : undefined;
}

function parseSearchQuery(query: string): ParsedQuery {
  const parsed: ParsedQuery = {
    freeTokens: [],
  };

  const tokens = query
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  for (const token of tokens) {
    const [rawKey, ...rest] = token.split(":");
    if (rest.length === 0) {
      parsed.freeTokens.push(token.toLowerCase());
      continue;
    }

    const key = rawKey.toLowerCase();
    const value = rest.join(":").trim().toLowerCase();

    if (!value && key !== "has") {
      continue;
    }

    if (key === "from") {
      parsed.from = value;
      continue;
    }
    if (key === "to") {
      parsed.to = value;
      continue;
    }
    if (key === "subject") {
      parsed.subject = value;
      continue;
    }
    if (key === "filename") {
      parsed.filename = value;
      continue;
    }
    if (key === "has" && value === "attachment") {
      parsed.hasAttachment = true;
      continue;
    }
    if (key === "before") {
      parsed.before = parseOperatorDate(value);
      continue;
    }
    if (key === "after") {
      parsed.after = parseOperatorDate(value);
      continue;
    }

    parsed.freeTokens.push(token.toLowerCase());
  }

  return parsed;
}

function includesText(haystack: string, needle: string): boolean {
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

function scoreByToken(mail: MailItem, token: string): number {
  let score = 0;

  if (includesText(mail.sender, token)) {
    score += 8;
  }
  if (includesText(mail.subject, token)) {
    score += 10;
  }
  if (includesText(mail.preview, token)) {
    score += 6;
  }
  if (mail.body.some((line) => includesText(line, token))) {
    score += 4;
  }
  if (mail.attachments.some((attachment) => includesText(attachment.name, token))) {
    score += 5;
  }
  if (mail.recipientName && includesText(mail.recipientName, token)) {
    score += 3;
  }

  return score;
}

export function searchMails(mails: MailItem[], query: string): MailItem[] {
  const trimmed = query.trim();
  if (!trimmed) {
    return [];
  }

  const parsed = parseSearchQuery(trimmed);

  const scored = mails
    .map((mail) => {
      const fromText = mail.sender.toLowerCase();
      const toText = `${mail.toLine} ${mail.recipientName ?? ""}`.toLowerCase();
      const subjectText = mail.subject.toLowerCase();
      const attachmentNames = mail.attachments.map((attachment) => attachment.name.toLowerCase());
      const mailDateValue = parseMailDateValue(mail.date);

      if (parsed.from && !fromText.includes(parsed.from)) {
        return null;
      }
      if (parsed.to && !toText.includes(parsed.to)) {
        return null;
      }
      if (parsed.subject && !subjectText.includes(parsed.subject)) {
        return null;
      }
      if (parsed.filename && !attachmentNames.some((name) => name.includes(parsed.filename!))) {
        return null;
      }
      if (parsed.hasAttachment && mail.attachments.length === 0) {
        return null;
      }
      if (parsed.before && !(mailDateValue < parsed.before)) {
        return null;
      }
      if (parsed.after && !(mailDateValue > parsed.after)) {
        return null;
      }

      let score = 0;
      for (const token of parsed.freeTokens) {
        const tokenScore = scoreByToken(mail, token);
        if (tokenScore === 0) {
          return null;
        }
        score += tokenScore;
      }

      if (includesText(mail.subject, trimmed)) {
        score += 20;
      }
      if (includesText(mail.sender, trimmed)) {
        score += 15;
      }

      if (parsed.hasAttachment) {
        score += 3;
      }
      if (parsed.from || parsed.to || parsed.subject || parsed.filename) {
        score += 4;
      }

      return {
        mail,
        score,
        dateValue: mailDateValue,
      };
    })
    .filter((entry): entry is { mail: MailItem; score: number; dateValue: number } => entry !== null)
    .sort((a, b) => {
      if (a.score === b.score) {
        return b.dateValue - a.dateValue;
      }

      return b.score - a.score;
    });

  return scored.map((entry) => entry.mail);
}