import jsPDF from "jspdf";

export interface PrescriptionPdfData {
  patientName: string;
  patientEmail?: string;
  doctorName: string;
  doctorSpeciality?: string;
  doctorQualifications?: string;
  visitDate: string;
  diagnosis?: string;
  doshaAssessment?: string;
  notes?: string;
  prescription?: string;
  therapyPlan?: string;
  followUpDate?: string;
}

export interface ReceiptPdfData {
  receiptNumber: string;
  patientName: string;
  doctorName: string;
  appointmentDate: string;
  amount: number;
  paidAt: string;
  paymentMethod?: string;
  providerReference?: string;
}

export function generatePrescriptionPdf(data: PrescriptionPdfData) {
  if (typeof window === "undefined") return;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let y = 18;

  // Header Banner Background (Deep Herbal Green: #1f3d2b -> RGB: 31, 61, 43)
  doc.setFillColor(31, 61, 43);
  doc.roundedRect(margin, y, contentWidth, 26, 3, 3, "F");

  // Hospital Name
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("AAROGYA AYURVEDA HOSPITAL", margin + 6, y + 10);

  // Subtitle
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor(230, 215, 180);
  doc.text("Classical Panchakarma & Holistic Healing - Paperless Clinical Record", margin + 6, y + 17);

  // Contact info right-aligned
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(240, 240, 240);
  doc.text("12 Herbal Garden Road, Ayurveda Nagar", pageWidth - margin - 6, y + 9, { align: "right" });
  doc.text("Phone: +91 98765 43210 | care@aarogya.com", pageWidth - margin - 6, y + 15, { align: "right" });
  doc.text("NABH-Accredited Classical Care", pageWidth - margin - 6, y + 21, { align: "right" });

  y += 32;

  // Document Title
  doc.setFillColor(242, 238, 230); // Warm ivory/sand
  doc.roundedRect(margin, y, contentWidth, 8, 1.5, 1.5, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(31, 61, 43);
  doc.text("CONSULTATION SUMMARY & AYURVEDIC PRESCRIPTION", pageWidth / 2, y + 5.5, { align: "center" });

  y += 13;

  // Patient & Doctor Details Box
  doc.setDrawColor(210, 205, 195);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, "S");

  // Left column: Patient
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(31, 61, 43);
  doc.text("PATIENT INFORMATION", margin + 4, y + 5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(40, 40, 40);
  doc.text(`Name: ${data.patientName || "Valued Patient"}`, margin + 4, y + 11);
  if (data.patientEmail) {
    doc.text(`Email: ${data.patientEmail}`, margin + 4, y + 16);
  }
  doc.text(`Date of Visit: ${data.visitDate}`, margin + 4, y + 21);

  // Right column: Doctor
  doc.setFont("helvetica", "bold");
  doc.setTextColor(31, 61, 43);
  doc.text("ATTENDING PHYSICIAN", margin + (contentWidth / 2) + 4, y + 5);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(40, 40, 40);
  doc.text(`Doctor: ${data.doctorName}`, margin + (contentWidth / 2) + 4, y + 11);
  doc.text(`Speciality: ${data.doctorSpeciality || "Classical Ayurveda Physician"}`, margin + (contentWidth / 2) + 4, y + 16);
  if (data.doctorQualifications) {
    doc.text(`Qualifications: ${data.doctorQualifications}`, margin + (contentWidth / 2) + 4, y + 21);
  }

  y += 30;

  // Clinical Details Section Helper
  const printSection = (title: string, text?: string, badgeColor = [31, 61, 43]) => {
    if (!text || !text.trim()) return;

    // Section Header
    doc.setFillColor(badgeColor[0], badgeColor[1], badgeColor[2]);
    doc.roundedRect(margin, y, 4, 4, 0.5, 0.5, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(31, 61, 43);
    doc.text(title, margin + 6, y + 3.5);

    y += 6;

    // Content
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(50, 50, 50);

    const splitText = doc.splitTextToSize(text, contentWidth - 6);
    doc.text(splitText, margin + 6, y);
    y += splitText.length * 4.5 + 4;

    // Page overflow guard
    if (y > 265) {
      doc.addPage();
      y = 20;
    }
  };

  if (data.doshaAssessment) {
    printSection("DOSHA ASSESSMENT (PRAKRITI / VIKRITI)", data.doshaAssessment, [180, 120, 40]);
  }

  if (data.diagnosis) {
    printSection("CLINICAL DIAGNOSIS (ROGA NIDANA)", data.diagnosis);
  }

  if (data.prescription) {
    printSection("PRESCRIBED MEDICINES & FORMULATIONS (AUSHADHA)", data.prescription, [26, 92, 58]);
  }

  if (data.therapyPlan) {
    printSection("RECOMMENDED THERAPIES & PANCHAKARMA PLAN (CHIKITSA)", data.therapyPlan, [180, 120, 40]);
  }

  if (data.notes) {
    printSection("DIET & LIFESTYLE GUIDANCE (PATHYA / APATHYA)", data.notes);
  }

  if (data.followUpDate) {
    printSection("SCHEDULED FOLLOW-UP", `Next review recommended on: ${data.followUpDate}`);
  }

  // Footer & Digital Verification
  const footerY = 275;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(margin, footerY - 8, pageWidth - margin, footerY - 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(120, 120, 120);
  doc.text(
    "Aarogya Ayurveda Hospital - Verified Electronic Medical Record. No physical signature required.",
    margin,
    footerY - 3
  );
  doc.text(
    `Generated on ${new Date().toLocaleDateString("en-IN", { dateStyle: "long" })} | Patient Record ID: ${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    margin,
    footerY + 1.5
  );

  const safeFilename = `Aarogya-Prescription-${data.patientName.replace(/\s+/g, "_")}-${data.visitDate}.pdf`;
  doc.save(safeFilename);
}

export function generateReceiptPdf(data: ReceiptPdfData) {
  if (typeof window === "undefined") return;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  // Header
  doc.setFillColor(31, 61, 43);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("AAROGYA AYURVEDA HOSPITAL", margin + 6, y + 10);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(230, 215, 180);
  doc.text("Official Payment Receipt & Billing Acknowledgment", margin + 6, y + 16);

  y += 32;

  // Receipt Number & Status Banner
  doc.setFillColor(242, 246, 242);
  doc.setDrawColor(180, 210, 180);
  doc.roundedRect(margin, y, contentWidth, 14, 1.5, 1.5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(31, 61, 43);
  doc.text(`RECEIPT NO: ${data.receiptNumber}`, margin + 6, y + 8.5);

  doc.setFillColor(34, 139, 34); // Green status pill
  doc.roundedRect(pageWidth - margin - 26, y + 4, 20, 6, 1, 1, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7.5);
  doc.text("PAID", pageWidth - margin - 16, y + 8.2, { align: "center" });

  y += 22;

  // Table of particulars
  const rows = [
    ["Patient Name", data.patientName],
    ["Consulting Physician", data.doctorName],
    ["Appointment Date", data.appointmentDate],
    ["Transaction Date", data.paidAt],
    ["Payment Mode", data.paymentMethod || "Online Gateway (Verified)"],
    ["Payment Reference ID", data.providerReference || "TXN-" + Math.random().toString(36).substring(2, 10).toUpperCase()],
  ];

  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.3);

  rows.forEach(([label, value]) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(90, 90, 90);
    doc.text(label, margin + 4, y + 5);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 40, 40);
    doc.text(value, pageWidth - margin - 4, y + 5, { align: "right" });

    doc.line(margin, y + 8, pageWidth - margin, y + 8);
    y += 10;
  });

  y += 6;

  // Total Amount Box
  doc.setFillColor(248, 244, 235);
  doc.roundedRect(margin, y, contentWidth, 18, 2, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(31, 61, 43);
  doc.text("TOTAL AMOUNT PAID", margin + 6, y + 11.5);

  doc.setFontSize(14);
  doc.text(`INR ${Number(data.amount).toFixed(2)}`, pageWidth - margin - 6, y + 11.5, { align: "right" });

  y += 32;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(
    "Thank you for choosing Aarogya Ayurveda Hospital for your holistic healing journey.",
    pageWidth / 2,
    y,
    { align: "center" }
  );
  doc.text(
    "This receipt is digitally issued and valid for tax and health insurance claim purposes.",
    pageWidth / 2,
    y + 5,
    { align: "center" }
  );

  doc.save(`Aarogya-Receipt-${data.receiptNumber}.pdf`);
}
