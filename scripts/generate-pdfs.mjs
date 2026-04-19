import fs from "node:fs";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const outputDir = path.join(process.cwd(), "public", "attachments");
fs.mkdirSync(outputDir, { recursive: true });

async function createPdf({ fileName, title, subtitle, lines }) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595, 842]);
  const { height } = page.getSize();
  const titleFont = await pdf.embedFont(StandardFonts.HelveticaBold);
  const bodyFont = await pdf.embedFont(StandardFonts.Helvetica);

  page.drawRectangle({
    x: 0,
    y: 772,
    width: 595,
    height: 70,
    color: rgb(0.9, 0.96, 0.99),
  });

  page.drawText(title, {
    x: 42,
    y: height - 54,
    size: 22,
    font: titleFont,
    color: rgb(0.13, 0.36, 0.51),
  });

  if (subtitle) {
    page.drawText(subtitle, {
      x: 42,
      y: height - 78,
      size: 11,
      font: bodyFont,
      color: rgb(0.35, 0.35, 0.35),
    });
  }

  let y = height - 128;
  for (const line of lines) {
    page.drawText(line, {
      x: 52,
      y,
      size: 12,
      font: bodyFont,
      color: rgb(0.1, 0.1, 0.1),
      maxWidth: 490,
      lineHeight: 18,
    });
    y -= 30;
  }

  page.drawText("Generated for UI demo of Gmail clone", {
    x: 42,
    y: 28,
    size: 10,
    font: bodyFont,
    color: rgb(0.45, 0.45, 0.45),
  });

  const bytes = await pdf.save();
  fs.writeFileSync(path.join(outputDir, fileName), bytes);
}

await createPdf({
  fileName: "rohan-lohiya-internship-certificate.pdf",
  title: "Triksha Internship Certificate",
  subtitle: "Issued to Rohan Lohiya",
  lines: [
    "Dear Rohan,",
    "",
    "Thank you for your valuable contributions during your internship at Triksha.",
    "Please find your internship certificate attached.",
    "",
    "Wishing you the best in your future endeavors.",
    "",
    "Best regards,",
    "Yashwanth Vemuri",
    "Founder - Triksha",
  ],
});

await createPdf({
  fileName: "rohan-lohiya-offer-letter.pdf",
  title: "Offer Letter - Full Stack Developer Intern",
  subtitle: "Triksha Technologies",
  lines: [
    "Dear Rohan Lohiya,",
    "",
    "We are pleased to offer you the role of Full Stack Developer Intern at Triksha.",
    "Your internship term is from 7 June 2025 to 30 July 2025.",
    "",
    "We look forward to your contributions to our platform.",
    "",
    "Regards,",
    "People Operations",
    "Triksha",
  ],
});

console.log("PDF attachments generated in public/attachments");
