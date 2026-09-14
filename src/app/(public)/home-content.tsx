"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FileText,
  FileSearch,
  Stethoscope,
  BookOpenCheck,
  ShieldCheck,
  PenLine,
  AlignLeft,
  Calculator,
  BarChart3,
  LineChart,
  Cpu,
  Code,
  MessageSquare,
  ArrowRight,
  Clock,
  CheckCircle2,
  FileCheck2,
  RefreshCw,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  brand,
  contactInfo,
  services,
  whyChoosePaws,
  onboardingSteps,
} from "@/lib/site-data";

const iconMap: Record<string, LucideIcon> = {
  FileText,
  FileSearch,
  Stethoscope,
  BookOpenCheck,
  ShieldCheck,
  PenLine,
  AlignLeft,
  Calculator,
  BarChart3,
  LineChart,
  Cpu,
  Code,
};

const whyChooseIcons: LucideIcon[] = [FileCheck2, RefreshCw, ShieldCheck];

// Trust indicators for the homepage marquee
const trustIndicators = [
  "ICMJE Compliant",
  "PRISMA Guidelines",
  "CARE Checklist",
  "Non-Repository Turnitin",
  "HEC / CPSP Standards",
  "PubMed & Scopus Ready",
  "APA Tables",
  "Reproducible Scripts",
  "24/7 Support",
];

// Featured services — a balanced selection across all four categories.
const featuredSlugs = [
  "research-article-write-up",
  "medical-case-report",
  "plagiarism-check-turnitin",
  "basic-spss-analysis",
  "r-programming-biostatistics",
  "mern-stack-web-development",
];

export default function HomeContent() {
  const featured = featuredSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is (typeof services)[number] => Boolean(s));

  // Duplicate the trust list so the marquee loops seamlessly
  const marqueeItems = [...trustIndicators, ...trustIndicators];

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1f3d] via-[#0e2a52] to-[#0c3b5a] text-white">
        {/* Clean gradient overlay — no grid, no floating shapes */}

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Left: Brand + copy + CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur">
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
              </div>

              <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                Professional Academic
                <span className="block bg-gradient-to-r from-teal-300 via-cyan-200 to-teal-300 bg-clip-text text-transparent">
                  Writing Services
                </span>
              </h1>

              <p className="mt-4 text-lg font-semibold text-teal-200">
                Your Success, Our Priority
              </p>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-blue-100/80 sm:text-base lg:mx-0">
                Get high-quality, original, and well-researched academic papers. We help students
                and researchers achieve their goals with professional, confidential writing services.
              </p>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <Button asChild size="lg" className="gap-2 bg-teal-400 text-[#0a1f3d] hover:bg-teal-300 hover:text-[#0a1f3d]">
                  <Link href="/order">
                    <MessageSquare className="h-4 w-4" />
                    Request a Quote
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="gap-2 border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/services">
                    View Services
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Contact strip */}
              <div className="mt-8 flex flex-col items-center gap-3 text-sm text-blue-100/80 sm:flex-row sm:justify-center lg:justify-start">
                <a
                  href={`https://wa.me/${contactInfo.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-medium text-white transition hover:bg-white/10"
                >
                  <MessageSquare className="h-4 w-4 text-teal-300" />
                  WhatsApp: {contactInfo.whatsapp}
                </a>
                <span className="inline-flex items-center gap-2 text-blue-100/70">
                  <Clock className="h-4 w-4 text-teal-300" />
                  {contactInfo.businessHours} availability
                </span>
              </div>
            </motion.div>

            {/* Right: Compliance standards card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mx-auto w-full max-w-md lg:mx-0"
            ><div
                className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-gradient-to-br from-teal-400/20 via-cyan-300/10 to-transparent blur-2xl"
                aria-hidden="true"
              />
              <div className="glass-card rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-400/20 ring-1 ring-teal-300/30">
                    <ShieldCheck className="h-6 w-6 text-teal-300" />
                  </div>
                  <div>
                    <div className="text-base font-semibold">Publication Compliance</div>
                    <div className="text-xs text-blue-100/70">Built into every deliverable</div>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    "ICMJE-compliant manuscript structure",
                    "PRISMA flow diagrams for reviews",
                    "CARE checklist for case reports",
                    "Non-repository Turnitin reports",
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                      <span className="text-sm text-blue-50/90">{point}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-blue-100/60">
                    Aligned Standards
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {brand.standards.split(" • ").map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-teal-100"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================== TRUST BADGES MARQUEE ===================== */}
      <section
        aria-label="Compliance and standards"
        className="border-y border-white/10 bg-[#0a1f3d] py-4 text-white"
      >
        <div className="marquee">
          <div className="marquee__track" aria-hidden={false}>
            {marqueeItems.map((item, idx) => (
              <span
                key={`${item}-${idx}`}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-teal-300/20 bg-white/5 px-4 py-1.5 text-xs font-medium text-teal-50"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-teal-300" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SHORT INTRODUCTION ===================== */}
      <section className="relative overflow-hidden border-b border-border bg-dots bg-background"><div className="relative mx-auto max-w-7xl px-4 py-14 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <Badge variant="secondary" className="mb-3">
                <Sparkles className="mr-1 h-3 w-3" />
                About PAWS
              </Badge>
              <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
                Built for FCPS/MD trainees, MPhil/PhD scholars, and university faculty
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {brand.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="default" className="gap-2">
                  <Link href="/services">
                    Explore All Services
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="gap-2">
                  <Link href="/order">Request a Quote</Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Manuscript Writing", value: "IMRaD • CARE • PRISMA" },
                { label: "Statistical Tools", value: "SPSS • R • Python" },
                { label: "Turnitin Policy", value: "100% Non-Repository" },
                { label: "Revisions", value: "2 rounds within 14 days" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="card-hover-glow rounded-xl border border-border bg-card p-4 shadow-sm"
                >
                  <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-foreground">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FEATURED SERVICES ===================== */}
      <section className="bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-3">
              <Sparkles className="mr-1 h-3 w-3" />
              Featured Services
            </Badge>
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Official PAWS Service Catalogue
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              A focused selection across our four categories — from manuscript drafting to advanced
              statistical modeling and web development.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((service, idx) => {
              const Icon = iconMap[service.icon] ?? FileText;
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="h-full"
                >
                  <Card className="card-hover-glow group gradient-top-border flex h-full flex-col overflow-hidden">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="gradient-icon-hover flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                          <Icon className="h-6 w-6" />
                        </div>
                        <Badge variant="outline" className="gap-1 text-xs font-medium">
                          <Clock className="h-3 w-3" />
                          {service.turnaround}
                        </Badge>
                      </div>
                      <CardTitle className="mt-4 text-lg">{service.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {service.shortDescription}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="rounded-lg border border-border bg-secondary/40 px-3 py-2">
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Starting at
                        </div>
                        <div className="text-sm font-bold text-primary">{service.priceLabel}</div>
                      </div>
                    </CardContent>
                    <CardFooter className="gap-2">
                      <Button asChild variant="outline" size="sm" className="flex-1">
                        <Link href={`/services/${service.slug}`}>Learn More</Link>
                      </Button>
                      <Button asChild size="sm" className="flex-1 gap-1">
                        <Link href="/order">
                          Request Quote
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/services">
                View All 12 Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===================== WHY CHOOSE PAWS ===================== */}
      <section className="relative overflow-hidden bg-dots bg-background">
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-3">
              <Sparkles className="mr-1 h-3 w-3" />
              Why Choose PAWS
            </Badge>
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Trust, Transparency &amp; Reproducibility
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Three commitments drawn directly from the official PAWS rate card and terms.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {whyChoosePaws.map((item, idx) => {
              const Icon = whyChooseIcons[idx] ?? ShieldCheck;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="h-full"
                >
                  <Card className="glass-hover group relative overflow-hidden border-primary/10 bg-card/80">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                    <CardHeader>
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.45_0.1_200)] text-primary-foreground shadow-md">
                        <Icon className="h-7 w-7" />
                      </div>
                      <CardTitle className="mt-4 text-lg">{item.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== 4-STEP ONBOARDING TIMELINE ===================== */}
      <section className="bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-3">
              <Sparkles className="mr-1 h-3 w-3" />
              How It Works
            </Badge>
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              A 4-Step Onboarding Process
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              From first brief to final delivery — clear, predictable, and transparent.
            </p>
          </div>

          {/* Desktop: horizontal timeline */}
          <div className="relative mt-14 hidden md:block">
            {/* Animated gradient connecting line */}
            <div
              className="gradient-divider absolute left-0 right-0 top-7"
              aria-hidden="true"
            />
            <div className="grid grid-cols-4 gap-6">
              {onboardingSteps.map((step, idx) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="group relative text-center"
                >
                  <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary bg-background text-primary shadow-md transition-all duration-300 group-hover:scale-110 group-hover:border-accent group-hover:text-accent group-hover:shadow-[0_0_24px_-4px_oklch(0.55_0.1_180/0.55)]">
                    <span className="text-sm font-bold">{step.step}</span>
                  </div>
                  <h3 className="mt-5 text-base font-semibold">{step.title}</h3>
                  <p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical timeline */}
          <ol className="relative mt-10 space-y-6 md:hidden">
            {/* Vertical gradient line */}
            <div
              className="absolute left-6 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary/20 via-accent/40 to-primary/20"
              aria-hidden="true"
            />
            {onboardingSteps.map((step) => (
              <li key={step.step} className="relative flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-bold text-primary">
                  {step.step}
                </div>
                <div className="pt-1.5">
                  <h3 className="text-base font-semibold">{step.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1f3d] via-[#0e2a52] to-[#0c3b5a] text-white">
        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:py-20">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Publish or Analyze Your Research?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-blue-100/85 sm:text-base">
            Share your research topic, objectives, and dataset to receive an itemized quote and
            agreed timeline. Confirm with a 50% advance and let PAWS handle the rest.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="gap-2 bg-teal-400 text-[#0a1f3d] hover:bg-teal-300 hover:text-[#0a1f3d]">
              <Link href="/order">
                <MessageSquare className="h-4 w-4" />
                Request a Quote
              </Link>
            </Button>
            <a
              href={`https://wa.me/${contactInfo.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              <MessageSquare className="h-4 w-4 text-teal-300" />
              WhatsApp: {contactInfo.whatsapp}
            </a>
          </div>

          <p className="mt-6 text-xs text-blue-100/60">
            Payments: {contactInfo.payments} · {contactInfo.businessHours} availability
          </p>
        </div>
      </section>
    </>
  );
}
