import type { Metadata } from "next";
import { brand, contactInfo } from "@/lib/site-data";
import { ReviewsPageClient } from "./reviews-page";

export const metadata: Metadata = {
  title: `Reviews | ${brand.shortName} — Pak Academic and Writing Service`,
  description: `Read verified reviews from ${brand.shortName} clients across Pakistan, or submit your own review. All reviews are moderated for authenticity before publishing. WhatsApp ${contactInfo.whatsapp}.`,
  keywords: [
    "PAWS reviews",
    "Pak Academic Writing Service reviews",
    "research writing Pakistan testimonials",
    "manuscript writing feedback",
    "SPSS analysis review",
    "FCPS synopsis service review",
  ],
  openGraph: {
    title: `Reviews | ${brand.shortName}`,
    description: `Read verified reviews from ${brand.shortName} clients, or submit your own review.`,
    type: "website",
  },
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return <ReviewsPageClient />;
}
