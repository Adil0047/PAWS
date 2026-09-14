import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  FileCheck2,
  RefreshCw,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  Stethoscope,
  GraduationCap,
  Microscope,
  Users,
  BookOpen,
  Calculator,
  PenLine,
  Code,
  ArrowLeftRight,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  brand,
  contactInfo,
  whyChoosePaws,
  onboardingSteps,
  categoryDescriptions,
  type ServiceCategory,
} from "@/lib/site-data";

export const metadata: Metadata = {
  title: `About | ${brand.shortName} — ${brand.fullName}`,
  description: `${brand.description} ${brand.shortName} serves FCPS/MD medical trainees, MPhil/PhD scholars, university faculty, researchers and clinicians across Pakistan — compliant with ICMJE, CARE, PRISMA and HEC/CPSP/PubMed/Scopus standards.`,
  keywords: [
    "About PAWS",
    "Pak Academic and Writing Service",
    "manuscript writing Pakistan",
    "statistical analysis FCPS",
    "plagiarism reduction",
    "ICMJE compliance",
    "PRISMA guidelines",
    "CARE checklist",
    "HEC CPSP PubMed Scopus",
  ],
  openGraph: {
    title: `About | ${brand.shortName} — ${brand.fullName}`,
    description: brand.description,
    type: "website",
  },
  alternates: { canonical: "/about" },
};

const whyChooseIcons: LucideIcon[] = [FileCheck2, RefreshCw, ShieldCheck];

const serviceAreaIcons: LucideIcon[] = [BookOpen, PenLine, Calculator, Code];

const serviceAreaCategories: ServiceCategory[] = [
  "Research & Medical Manuscript Writing",
  "Plagiarism, Formatting & Editorial Compliance",
  "Statistical Analysis & Data Science Services",
  "Web Development",
];

const audienceCards: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Stethoscope,
    title: "FCPS / MD Medical Trainees",
    description:
      "Medical postgraduate trainees preparing case reports, synopses, and research articles for CPSP and journal submission.",
  },
  {
    icon: GraduationCap,
    title: "MPhil / PhD Scholars",
    description:
      "Graduate researchers needing statistical modeling, reproducible scripts, and publication-ready manuscripts.",
  },
  {
    icon: Microscope,
    title: "University Faculty",
    description:
      "Faculty members producing peer-reviewed work aligned with HEC, PubMed, and Scopus-indexed journal standards.",
  },
  {
    icon: Users,
    title: "Researchers & Clinicians",
    description:
      "Independent researchers and clinicians across Pakistan seeking editorial compliance and rigorous analysis support.",
  },
];

const complianceItems = [
  {
    label: "ICMJE",
    description:
      "International Committee of Medical Journal Editors recommendations for manuscript structure, authorship, and conflicts of interest.",
  },
  {
    label: "CARE",
    description:
      "CAse REport guidelines ensuring complete, transparent medical case report writing.",
  },
  {
    label: "PRISMA",
    description:
      "Preferred Reporting Items for Systematic Reviews and Meta-Analyses — used for every systematic review we deliver.",
  },
];

const standardsBadges = brand.standards.split(" • ");

export default function AboutPage() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-[#0a1f3d] via-[#0e2a52] to-[#0c3b5a] text-white">
      </section>

      {/* ===================== WHAT PAWS DOES ===================== */}
      <section className="bg-dots bg-background">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-3">
              <Sparkles className="mr-1 h-3 w-3" />
              What PAWS Does
            </Badge>
            <h1 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
              Four Service Categories, One Academic Standard
            </h1>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              {brand.shortName} delivers manuscript writing, statistical analysis,
              plagiarism reduction, and web development under one publication-focused
              workflow.
            </p>
          </div>
          <div className="gradient-divider mx-auto mt-8 max-w-xs" aria-hidden="true" />

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {serviceAreaCategories.map((category, idx) => {
              const Icon = serviceAreaIcons[idx] ?? BookOpen;
              return (
                <Card
                  key={category}
                  className="card-hover-glow group gradient-top-border flex flex-col border-primary/10"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="gradient-icon-hover flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-base leading-snug sm:text-lg">
                        {category}
                      </CardTitle>
                    </div>
                    <CardDescription className="mt-3 text-sm leading-relaxed">
                      {categoryDescriptions[category]}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto pt-0">
                    <Button asChild variant="outline" size="sm" className="gap-1">
                      <Link href="/services">
                        Explore services
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== WHO PAWS SERVES ===================== */}
      <section className="bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-3">
              Who PAWS Serves
            </Badge>
            <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
              Built for Pakistan&apos;s Academic &amp; Clinical Community
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              {brand.shortName} supports researchers and clinicians across Pakistan —
              from CPSP trainees to university faculty.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {audienceCards.map((audience) => {
              const Icon = audience.icon;
              return (
                <Card
                  key={audience.title}
                  className="card-hover-glow group gradient-top-border flex flex-col border-primary/10"
                >
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[oklch(0.45_0.1_200)] text-primary-foreground shadow-md">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="mt-4 text-base leading-snug">
                      {audience.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {audience.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== COMPLIANCE & STANDARDS ===================== */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
            <div>
              <Badge variant="secondary" className="mb-3">
                Compliance &amp; Standards
              </Badge>
              <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
                Aligned with International Reporting Guidelines
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                Every manuscript, case report, and systematic review that {brand.shortName}{" "}
                delivers is structured to meet recognised international reporting
                guidelines and Pakistan&apos;s national academic standards.
              </p>

              <div className="mt-8 space-y-4">
                {complianceItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-sm"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        {item.label}
                      </div>
                      <div className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {item.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-primary/10">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/15">
                    <FileCheck2 className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">National &amp; Indexing Standards</CardTitle>
                    <CardDescription className="text-sm">
                      Deliverables are aligned with Pakistan&apos;s research bodies and
                      the world&apos;s leading bibliographic databases.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {standardsBadges.map((s) => (
                    <div
                      key={s}
                      className="flex items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2.5"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold text-foreground">{s}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  {brand.standards.replace(/ • /g, ", ")} — every deliverable is
                  formatted to satisfy these bodies&apos; submission requirements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ===================== WHY CHOOSE PAWS ===================== */}
      <section className="bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-3">
              Why Choose PAWS
            </Badge>
            <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
              Trust, Transparency &amp; Reproducibility
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Three commitments drawn directly from the official {brand.shortName}{" "}
              rate card and terms.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {whyChoosePaws.map((item, idx) => {
              const Icon = whyChooseIcons[idx] ?? ShieldCheck;
              return (
                <Card
                  key={item.title}
                  className="glass-hover group relative overflow-hidden border-primary/10 bg-card/80"
                >
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
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== 4-STEP ONBOARDING PREVIEW ===================== */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Badge variant="secondary" className="mb-3">
                <Sparkles className="mr-1 h-3 w-3" />
                Onboarding Preview
              </Badge>
              <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
                A 4-Step Process — From Brief to Final Delivery
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
                A predictable, transparent workflow: share your brief, receive a custom
                quote, review a watermarked draft, then receive your final editable
                deliverables.
              </p>
            </div>
            <Button asChild variant="outline" className="gap-2 self-start sm:self-auto">
              <Link href="/how-it-works">
                View full process
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="gradient-divider mt-6" aria-hidden="true" />

          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {onboardingSteps.map((step) => (
              <li key={step.step}>
                <Card className="card-hover-glow group gradient-top-border h-full border-primary/10">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-bold text-primary transition-colors group-hover:border-accent group-hover:text-accent">
                        {step.step}
                      </div>
                      <CardTitle className="text-base">{step.title}</CardTitle>
                    </div>
                    <CardDescription className="mt-3 text-xs leading-relaxed sm:text-sm">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1f3d] via-[#0e2a52] to-[#0c3b5a] text-white">
        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:py-20">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Work with {brand.shortName}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-blue-100/85 sm:text-base">
            Whether you are drafting your first case report or finalizing a
            systematic review, {brand.shortName} is ready to help. Share your topic,
            objectives, and dataset to receive an itemized quote.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
              <Link href="/how-it-works">
                <ArrowLeftRight className="h-4 w-4" />
                See How It Works
              </Link>
            </Button>
          </div>
          <p className="mt-6 text-xs text-blue-100/80">
            WhatsApp: {contactInfo.whatsapp} · Email: {contactInfo.email} · {contactInfo.businessHours} availability
          </p>
        </div>
      </section>
    </>
  );
}
