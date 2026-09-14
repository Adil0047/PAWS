import type { Metadata } from "next";
import { brand } from "@/lib/site-data";

// Admin routes are intentionally kept OUT of the (public) route group so they
// do NOT inherit the SiteHeader / SiteFooter. This is a minimal full-bleed
// wrapper styled to match the PAWS navy/teal visual identity.
export const metadata: Metadata = {
  title: `Admin Dashboard | ${brand.shortName}`,
  description: "Restricted internal management console for PAWS staff.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#0a1f3d]"><div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60"
      />
      <main className="relative flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
