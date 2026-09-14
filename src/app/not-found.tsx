import Link from "next/link";
import Image from "next/image";
import { Home, ArrowRight, MessageSquare, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { brand, contactInfo } from "@/lib/site-data";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* ===================== HERO ===================== */}
      <section className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1f3d] via-[#0e2a52] to-[#0c3b5a] px-4 py-20 text-center text-white">
        <div className="relative mx-auto max-w-2xl">
          {/* Logo + brand */}
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur transition hover:bg-white/10"
          >
            <Image
              src="/paws-logo.png"
              alt={`${brand.shortName} logo`}
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
              priority
            />
            <span className="text-sm font-semibold tracking-wide">
              {brand.shortName} — {brand.fullName}
            </span>
          </Link>

          {/* 404 badge */}
          <Badge
            variant="outline"
            className="mb-4 border-white/20 bg-white/5 text-teal-100"
          >
            404 · Page Not Found
          </Badge>

          {/* Big 404 */}
          <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-teal-300 via-cyan-200 to-teal-300 bg-clip-text text-transparent">
              404
            </span>
          </h1>

          {/* Message */}
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-blue-100/85 sm:text-lg">
            The page you&apos;re looking for doesn&apos;t exist or may have been
            moved. Let&apos;s get you back on track.
          </p>

          {/* Primary CTA */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="gap-2 bg-teal-400 text-[#0a1f3d] hover:bg-teal-300 hover:text-[#0a1f3d]"
            >
              <Link href="/">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/services">
                Browse Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===================== QUICK LINKS ===================== */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/services"
              className="group flex flex-col items-start gap-2 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="text-sm font-semibold text-foreground">
                Services
              </div>
              <div className="text-xs leading-relaxed text-muted-foreground">
                Explore our 12 official PAWS services across manuscript writing,
                statistical analysis, and editorial compliance.
              </div>
            </Link>

            <Link
              href="/blog"
              className="group flex flex-col items-start gap-2 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="text-sm font-semibold text-foreground">
                Blog
              </div>
              <div className="text-xs leading-relaxed text-muted-foreground">
                Read practical guides on IMRaD structure, Turnitin checks,
                SPSS/R/Python, PRISMA, and citation styles.
              </div>
            </Link>

            <a
              href={`https://wa.me/${contactInfo.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-start gap-2 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div className="text-sm font-semibold text-foreground">
                Contact {brand.shortName}
              </div>
              <div className="text-xs leading-relaxed text-muted-foreground">
                WhatsApp {contactInfo.whatsapp} · {contactInfo.businessHours}{" "}
                availability for quotes and questions.
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
