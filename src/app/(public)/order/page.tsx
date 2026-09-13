import type { Metadata } from "next";
import { brand, contactInfo } from "@/lib/site-data";
import { OrderPageClient } from "./order-page";

export const metadata: Metadata = {
  title: `Request a Quote | ${brand.shortName} — Pak Academic and Writing Service`,
  description: `Submit a quote request to ${brand.shortName}. Choose from 12 official services across research & medical manuscript writing, plagiarism & editorial compliance, statistical analysis (SPSS, R, Python), and MERN stack web development. WhatsApp ${contactInfo.whatsapp}.`,
  keywords: [
    "PAWS quote request",
    "research article quote Pakistan",
    "manuscript writing quote",
    "SPSS analysis order",
    "Turnitin check order",
    "MERN stack quote Pakistan",
    "FCPS synopsis writing",
  ],
  openGraph: {
    title: `Request a Quote | ${brand.shortName}`,
    description: `Submit a quote request for any of the 12 official ${brand.shortName} services. WhatsApp ${contactInfo.whatsapp}.`,
    type: "website",
  },
  alternates: { canonical: "/order" },
};

export default function OrderPage() {
  return <OrderPageClient />;
}
