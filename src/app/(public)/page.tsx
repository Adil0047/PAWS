import type { Metadata } from "next";
import { brand } from "@/lib/site-data";
import HomeContent from "./home-content";

export const metadata: Metadata = {
  title: `${brand.shortName} — ${brand.fullName}`,
  description: brand.description,
};

export default function HomePage() {
  return <HomeContent />;
}
