import type { Metadata } from "next";
import { brand, contactInfo } from "@/lib/site-data";
import { ContactPageClient } from "./contact-page";

export const metadata: Metadata = {
  title: `Contact | ${brand.shortName} — Pak Academic and Writing Service`,
  description: `Contact ${brand.shortName} on WhatsApp at ${contactInfo.whatsapp} or email ${contactInfo.email}. Payments via ${contactInfo.payments}. ${contactInfo.businessHours} availability for FCPS, MD, MPhil, PhD, and faculty researchers across Pakistan.`,
  keywords: [
    "Contact PAWS",
    "Pak Academic Writing Service WhatsApp",
    "research writing Pakistan contact",
    "manuscript writing help Pakistan",
    "SPSS analysis contact",
    "Turnitin check Pakistan",
    "FCPS research support",
  ],
  openGraph: {
    title: `Contact | ${brand.shortName} — Pak Academic and Writing Service`,
    description: `WhatsApp ${contactInfo.whatsapp} · Email ${contactInfo.email} · ${contactInfo.businessHours} availability. Payments via ${contactInfo.payments}.`,
    type: "website",
  },
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
