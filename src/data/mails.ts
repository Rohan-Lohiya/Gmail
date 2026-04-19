import type { MailItem } from "@/types/mail";

export const FIRST_MAIL_ID = "triksha-internship-certificate";

export function buildFirstMailSubject(sender: string): string {
  return `${sender} Internship Certificate`;
}

export function buildFirstMailPreview(sender: string): string {
  return `Thank you for your valuable contributions during your internship at ${sender}. Please find your internship certificate attached.`;
}

export function buildFirstMailBody(recipientName: string, sender: string): string[] {
  return [
    `Dear ${recipientName},`,
    "",
    `Thank you for your valuable contributions during your internship at ${sender}.`,
    "Please find your internship certificate attached.",
    "",
    "Wishing you the best in your future endeavors.",
    "",
    "Best regards,",
    "Yashwanth Vemuri",
    `Founder - ${sender}`,
  ];
}

export function parseMailDateValue(date: string): number {
  const slashFormat = date.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (slashFormat) {
    const day = Number.parseInt(slashFormat[1], 10);
    const month = Number.parseInt(slashFormat[2], 10) - 1;
    const parsedYear = Number.parseInt(slashFormat[3], 10);
    const year = parsedYear < 100 ? 2000 + parsedYear : parsedYear;
    return Date.UTC(year, month, day);
  }

  const monthFormat = date.match(/^(\d{1,2})\s+([A-Za-z]{3,})$/);
  if (monthFormat) {
    const day = Number.parseInt(monthFormat[1], 10);
    const parsed = Date.parse(`${monthFormat[2]} ${day}, ${new Date().getFullYear()}`);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }

  const fallback = Date.parse(date);
  return Number.isNaN(fallback) ? 0 : fallback;
}

export function sortMailsByDate(mails: MailItem[]): MailItem[] {
  return mails
    .map((mail, index) => ({
      mail,
      index,
      sortValue: parseMailDateValue(mail.date),
    }))
    .sort((a, b) => {
      if (a.sortValue === b.sortValue) {
        return a.index - b.index;
      }

      return b.sortValue - a.sortValue;
    })
    .map((entry) => entry.mail);
}

export const defaultMails: MailItem[] = [
  {
    id: FIRST_MAIL_ID,
    sender: "Triksha",
    recipientName: "Rohan",
    avatar: {
      variant: "default",
      bgColor: "#9aa0a6",
      textColor: "#f1f3f4",
    },
    subject: buildFirstMailSubject("Triksha"),
    preview: buildFirstMailPreview("Triksha"),
    body: buildFirstMailBody("Rohan", "Triksha"),
    date: "9/8/2025",
    labels: ["Inbox"],
    toLine: "to me",
    attachments: [
      {
        id: "internship-certificate-pdf",
        name: "Rohan Lohiya internship certificate.pdf",
        type: "pdf",
        url: "/attachments/rohan-lohiya-internship-certificate.pdf",
      },
    ],
  },
  {
    id: "triksha-offer-letter",
    sender: "Triksha",
    avatar: {
      variant: "default",
      bgColor: "#9aa0a6",
      textColor: "#f1f3f4",
    },
    subject: "Triksha Offer Letter - Full Stack Developer Intern",
    preview: "We are pleased to offer you the role of Full Stack Developer Intern.",
    body: [
      "Dear Rohan Lohiya,",
      "",
      "We are pleased to offer you the role of Full Stack Developer Intern at Triksha.",
      "Please review the attached letter for complete terms.",
      "",
      "Regards,",
      "People Operations",
      "Triksha",
    ],
    date: "6/6/2025",
    labels: ["Inbox"],
    toLine: "to me",
    attachments: [
      {
        id: "offer-letter-pdf",
        name: "Rohan Lohiya offer letter.pdf",
        type: "pdf",
        url: "/attachments/rohan-lohiya-offer-letter.pdf",
      },
    ],
  },
  {
    id: "google-cloud-product-update",
    sender: "Google Cloud",
    avatar: {
      variant: "letter",
      value: "G",
      bgColor: "#8a63d2",
      textColor: "#1d1137",
    },
    subject: "[Produc...] Automatic enablement update",
    preview: "We're enabling a new OTL feature for your organization.",
    body: [
      "Hello,",
      "",
      "This is a product update notification for your Google Cloud account.",
      "No action is required from your side.",
    ],
    date: "5 Feb",
    labels: ["Inbox"],
    toLine: "to me",
    attachments: [
      {
        id: "google-doc",
        name: "55f3f3a7-f9af-11...",
        type: "doc",
        url: "#",
      },
    ],
    isStarred: true,
  },
  {
    id: "otp-sign-up",
    sender: "noreply",
    senderCount: 2,
    avatar: {
      variant: "letter",
      value: "N",
      bgColor: "#99cf5a",
      textColor: "#213314",
    },
    subject: "OTP for Triksha Sign-Up",
    preview: "Your OTP is: 517155. It will expire in 5 minutes.",
    body: [
      "Your OTP is 517155.",
      "",
      "Do not share this code with anyone.",
    ],
    date: "17/7/2025",
    labels: ["Inbox"],
    toLine: "to me",
    attachments: [],
  },
  {
    id: "github-security",
    sender: "GitHub",
    avatar: {
      variant: "letter",
      value: "G",
      bgColor: "#e35d8d",
      textColor: "#3a1325",
    },
    subject: "Your account security update",
    preview: "A new sign in was detected from a trusted device.",
    body: [
      "Security alert",
      "",
      "A sign in to your GitHub account was detected.",
      "If this was you, no further action is needed.",
    ],
    date: "7/6/2025",
    labels: ["Inbox"],
    toLine: "to me",
    attachments: [],
  },
  {
    id: "axis-bank-alert-inr-10",
    sender: "Axis Bank Alerts",
    avatar: {
      variant: "letter",
      value: "A",
      bgColor: "#b8aaa3",
      textColor: "#2d2220",
    },
    subject: "INR 10.00 was debited from your A/C ending 2049",
    preview:
      "BANNER IMAGE 19-04-2026 Dear Utkarsh, available balance is INR 5,420.31.",
    body: [
      "Dear Utkarsh,",
      "",
      "INR 10.00 was debited from your Axis Bank account ending 2049 on 19-04-2026.",
      "Available balance: INR 5,420.31.",
      "",
      "If not done by you, call us immediately on 1800-209-5577.",
      "",
      "Regards,",
      "Axis Bank Alerts",
    ],
    date: "19 Apr",
    labels: ["Inbox"],
    toLine: "to me",
    attachments: [],
  },
  {
    id: "linkedin-job-alert-utkarsh",
    sender: "LinkedIn Job Alerts",
    avatar: {
      variant: "letter",
      value: "L",
      bgColor: "#0a66c2",
      textColor: "#d7ecff",
    },
    subject: "Software Engineer roles matched for Utkarsh",
    preview:
      "BrothersTech Software Engineer and 23 more roles match your profile today.",
    body: [
      "Hi Utkarsh,",
      "",
      "New opportunities are waiting for you:",
      "Software Engineer at BrothersTech",
      "Backend Developer at PixelForge",
      "SDE Intern at CloudMinds",
      "",
      "Apply early to improve your chances.",
      "",
      "Team LinkedIn Jobs",
    ],
    date: "19 Apr",
    labels: ["Inbox"],
    toLine: "to me",
    attachments: [],
  },
  {
    id: "foundit-jobs-digest",
    sender: "Aarya from foundit",
    avatar: {
      variant: "letter",
      value: "A",
      bgColor: "#f0c423",
      textColor: "#2d250a",
    },
    subject: "5 jobs that you have not applied yet, Utkarsh",
    preview: "5 new jobs from Azoca Technologies, NeuralCore and more.",
    body: [
      "Hello Utkarsh,",
      "",
      "Here are 5 fresh openings we picked for you today:",
      "Full Stack Developer - Azoca Technologies",
      "React Developer - Braid Labs",
      "SDE 1 - NeuralCore",
      "",
      "Finish applications before 11:59 PM for priority review.",
      "",
      "foundit Career Assistant",
    ],
    date: "19 Apr",
    labels: ["Inbox"],
    toLine: "to me",
    attachments: [],
  },
  {
    id: "naukri-campus-quiz",
    sender: "Naukri Campus",
    avatar: {
      variant: "letter",
      value: "N",
      bgColor: "#2559df",
      textColor: "#d5e4ff",
    },
    subject: "Utkarsh, today's Myntra quiz is live now",
    preview: "Attempt in next 5 mins and climb ranks in this week's leaderboard.",
    body: [
      "Hi Utkarsh,",
      "",
      "Your Myntra aptitude quiz is now live.",
      "Duration: 20 minutes",
      "Questions: 25",
      "",
      "Complete it before 8 PM to stay in the top percentile.",
      "",
      "Naukri Campus Team",
    ],
    date: "18 Apr",
    labels: ["Inbox"],
    toLine: "to me",
    attachments: [],
  },
  {
    id: "axis-bank-alert-inr-25",
    sender: "Axis Bank Alerts",
    avatar: {
      variant: "letter",
      value: "A",
      bgColor: "#b8aaa3",
      textColor: "#2d2220",
    },
    subject: "INR 25.00 was debited from your A/C ending 2049",
    preview:
      "BANNER IMAGE 18-04-2026 Dear Utkarsh, available balance is INR 5,455.31.",
    body: [
      "Dear Utkarsh,",
      "",
      "INR 25.00 was debited from your Axis Bank account ending 2049 on 18-04-2026.",
      "Available balance: INR 5,455.31.",
      "",
      "If this transaction is not yours, please report immediately.",
      "",
      "Axis Bank Alerts",
    ],
    date: "18 Apr",
    labels: ["Inbox"],
    toLine: "to me",
    attachments: [],
  },
  {
    id: "axis-bank-alert-inr-60",
    sender: "Axis Bank Alerts",
    avatar: {
      variant: "letter",
      value: "A",
      bgColor: "#b8aaa3",
      textColor: "#2d2220",
    },
    subject: "INR 60.00 was debited from your A/C ending 2049",
    preview:
      "BANNER IMAGE 18-04-2026 Dear Utkarsh, available balance is INR 5,480.31.",
    body: [
      "Dear Utkarsh,",
      "",
      "INR 60.00 was debited from your Axis Bank account ending 2049 on 18-04-2026.",
      "Available balance: INR 5,480.31.",
      "",
      "Thanks for banking with Axis Bank.",
      "",
      "Axis Bank Alerts",
    ],
    date: "18 Apr",
    labels: ["Inbox"],
    toLine: "to me",
    attachments: [],
  },
  {
    id: "internshala-neo-recruit",
    sender: "Internshala",
    avatar: {
      variant: "letter",
      value: "I",
      bgColor: "#4b9cd3",
      textColor: "#dff3ff",
    },
    subject: "NeoRecruit is promoting your profile, Utkarsh",
    preview:
      "Utkarsh, check out jobs matching your resume and apply in one click.",
    body: [
      "Hello Utkarsh,",
      "",
      "Your profile performance improved this week.",
      "NeoRecruit can now auto-recommend internships based on your projects.",
      "",
      "Top matches include Full Stack Intern and Frontend Developer roles.",
      "",
      "Internshala Team",
    ],
    date: "17 Apr",
    labels: ["Inbox"],
    toLine: "to me",
    attachments: [],
  },
  {
    id: "google-account-security",
    sender: "Google",
    avatar: {
      variant: "letter",
      value: "G",
      bgColor: "#8a63d2",
      textColor: "#1d1137",
    },
    subject: "Critical security alert on your Google Account",
    preview: "Dear Utkarsh, a new sign-in from Chrome on Windows was detected.",
    body: [
      "Dear Utkarsh,",
      "",
      "We detected a new sign-in to your Google Account from a new device.",
      "Device: Chrome on Windows",
      "Time: 16 Apr, 11:08 PM",
      "",
      "If this was you, no action is needed. Otherwise secure your account now.",
      "",
      "Google Accounts Team",
    ],
    date: "16 Apr",
    labels: ["Inbox"],
    toLine: "to me",
    attachments: [],
  },
];