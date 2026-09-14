import type { Metadata } from "next";
import { brand, contactInfo } from "@/lib/site-data";
import { TrackOrderPageClient } from "./track-order-page";

export const metadata: Metadata = {
  title: `Track Order | ${brand.shortName} — Pak Academic and Writing Service`,
  description: `Track your ${brand.shortName} order by Order ID or view your complete order history by email. Questions? WhatsApp ${contactInfo.whatsapp}.`,
  keywords: [
    "PAWS track order",
    "Pak Academic Writing Service order status",
    "research order tracking Pakistan",
    "manuscript order lookup",
    "SPSS analysis order status",
  ],
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: `Track Order | ${brand.shortName}`,
    description: `Track your ${brand.shortName} order by Order ID or view your complete order history by email.`,
    type: "website",
  },
  alternates: { canonical: "/track-order" },
};

export default function TrackOrderPage() {
  return <TrackOrderPageClient />;
}
