export type AttachmentType = "pdf" | "image" | "doc";

export interface MailAttachment {
  id: string;
  name: string;
  type: AttachmentType;
  url: string;
}

export interface MailAvatar {
  variant: "default" | "letter";
  value?: string;
  imageUrl?: string;
  bgColor: string;
  textColor?: string;
}

export interface MailItem {
  id: string;
  sender: string;
  recipientName?: string;
  senderCount?: number;
  avatar: MailAvatar;
  subject: string;
  preview: string;
  body: string[];
  date: string;
  labels: string[];
  toLine: string;
  attachments: MailAttachment[];
  isStarred?: boolean;
}