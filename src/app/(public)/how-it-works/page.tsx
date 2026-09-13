import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  FileCheck2,
  RefreshCw,
  MessageSquare,
  Mail,
  Wallet,
  ArrowRight,
  ArrowLeftRight,
  Clock,
  ClipboardList,
  Receipt,
  FileEdit,
  PackageCheck,
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
  onboardingSteps,
  whyChoosePaws,
} from "@/lib/site-data";

export const metadata: Metadata = {
  title: `How It Works | ${brand.shortName} — 4-Step Onboarding Process`,
  description: `From first brief to final delivery — the official ${brand.shortName} 4-step onboarding process: Share Brief & Data, Custom Quote, Draft & Review, and Final Delivery. Transparent pricing, reproducible scripts, and 2 revision rounds.`,
  keywords: [
    "How PAWS works",
    "research writing process Pakistan",
    "manuscript onboarding",
    "PAWS 4-step process",
    "research article quote Pakistan",
    "Turnitin workflow",
    "SPSS analysis timeline",
  ],
  openGraph: {
    title: `How It Works | ${brand.shortName} — 4-Step Onboarding Process`,
    description: `From first brief to final delivery — the official ${brand.shortName} 4-step onboarding process: Share Brief & Data, Custom Quote, Draft & Review, and Final Delivery.`,
    type: "website",
  },
  alternates: { canonical: "/how-it-works" },
};

const whyChooseIcons: LucideIcon[] = [FileCheck2, RefreshCw, ShieldCheck];

const stepIcons: LucideIcon[] = [ClipboardList, Receipt, FileEdit, PackageCheck];

export default function HowItWorksPage() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="shine-sweep-auto relative overflow-hidden border-b border-border paws-hero-mesh text-white">
        {/* Decorative floating shapes */}
        <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true">
          <div className="absolute -left-20 top-0 h-64 w-64 animate-float rounded-full bg-teal-400/20 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-72 w-72 animate-float-medium rounded-full bg-cyan-300/10 blur-3xl" />
          <div
            className="absolute right-[20%] top-[22%] h-12 w-12 animate-float-slow rounded-xl border border-teal-300/30 bg-teal-300/5"
            style={{ transform: "rotate(15deg)" }}
          />
          <div className="absolute left-[14%] bottom-[22%] h-8 w-8 animate-spin-slow rounded-full border-2 border-dashed border-cyan-300/30" />
          <div
            className="absolute right-[40%] top-[14%] h-6 w-6 animate-float rounded-md bg-gradient-to-br from-teal-300/40 to-cyan-300/20"
            style={{ transform: "rotate(45deg)" }}
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:py-20">
          <Badge
            variant="outline"
            className="mb-4 border-white/20 bg-white/5 text-teal-100"
          >
            <Sparkles className="mr-1 h-3 w-3" />
            {brand.shortName} · Onboarding Process
          </Badge>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="bg-gradient-to-r from-white via-teal-100 to-teal-200 bg-clip-text text-transparent">
              How It Works
            </span>
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-blue-100/85 sm:text-base">
            From first brief to final delivery — a transparent 4-step process. Share
            your research topic, objectives, and dataset; receive an itemized quote;
            review a watermarked draft; then collect your editable final deliverables.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="gap-2 bg-teal-400 text-[#0a1f3d] hover:bg-teal-300 hover:text-[#0a1f3d]">
              <Link href="/order">
                <MessageSquare className="h-4 w-4" />
                Request a Quote
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="gap-2 border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===================== 4-STEP ONBOARDING ===================== */}
      <section className="relative overflow-hidden bg-dots bg-background">
        {/* Decorative gradient blob */}
        <div
          className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-teal-500/5 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-3">
              <Sparkles className="mr-1 h-3 w-3" />
              4-Step Onboarding
            </Badge>
            <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
              From Brief to Final Delivery
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              A predictable, transparent workflow that keeps you informed at every stage.
            </p>
          </div>
          <div className="gradient-divider mx-auto mt-8 max-w-xs" aria-hidden="true" />

          {/* Desktop: numbered cards in a horizontal grid with connector */}
          <div className="relative mt-12 hidden md:block">
            <div className="gradient-divider absolute left-0 right-0 top-7" aria-hidden="true" />
            <div className="grid grid-cols-4 gap-6">
              {onboardingSteps.map((step, idx) => {
                const Icon = stepIcons[idx] ?? ClipboardList;
                return (
                  <div key={step.step} className="group relative">
                    <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary bg-background text-primary shadow-md transition-all duration-300 group-hover:scale-110 group-hover:border-accent group-hover:text-accent group-hover:shadow-[0_0_24px_-4px_oklch(0.55_0.1_180/0.55)]">
                      <span className="text-sm font-bold">{step.step}</span>
                    </div>
                    <Card className="card-hover-glow mt-6 h-full border-primary/10">
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <div className="gradient-icon-hover flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                            <Icon className="h-4.5 w-4.5" />
                          </div>
                          <CardTitle className="text-base">{step.title}</CardTitle>
                        </div>
                        <CardDescription className="mt-3 text-xs leading-relaxed sm:text-sm">
                          {step.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile: vertical timeline */}
          <ol className="relative mt-10 space-y-6 md:hidden">
            <div
              className="absolute left-6 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary/20 via-accent/40 to-primary/20"
              aria-hidden="true"
            />
            {onboardingSteps.map((step, idx) => {
              const Icon = stepIcons[idx] ?? ClipboardList;
              return (
                <li key={step.step} className="relative flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-bold text-primary">
                    {step.step}
                  </div>
                  <Card className="card-hover-glow flex-1 border-primary/10">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                          <Icon className="h-4 w-4" />
                        </div>
                        <CardTitle className="text-base">{step.title}</CardTitle>
                      </div>
                      <CardDescription className="mt-2 text-xs leading-relaxed">
                        {step.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </li>
              );
            })}
          </ol>
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
              Built-in Trust Points at Every Step
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              The {brand.shortName} process is anchored to three commitments drawn from
              the official rate card and terms.
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

      {/* ===================== PAYMENT METHODS + CONTACT ===================== */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-3">
              Payments &amp; Contact
            </Badge>
            <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
              Confirm Your Project in Minutes
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              A 50% advance confirms your project; the balance is due on final delivery.
              Reach {brand.shortName} on WhatsApp or email to begin Step 01.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {/* Payment methods */}
            <Card className="card-hover-glow border-primary/10">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                    <Wallet className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Payment Methods</CardTitle>
                    <CardDescription className="text-sm">
                      Accepted payment options in Pakistan.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {contactInfo.payments
                    .split("/")
                    .map((m) => m.trim())
                    .filter(Boolean)
                    .map((method) => (
                      <Badge
                        key={method}
                        variant="outline"
                        className="border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary"
                      >
                        {method}
                      </Badge>
                    ))}
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  <span>
                    50% advance to confirm · balance on final delivery ·{" "}
                    {contactInfo.businessHours} availability
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="card-hover-glow border-primary/10">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/15">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Get in Touch</CardTitle>
                    <CardDescription className="text-sm">
                      Start Step 01 — Share your brief &amp; data.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <a
                  href={`https://wa.me/${contactInfo.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-border bg-secondary/40 px-4 py-3 transition hover:bg-secondary"
                >
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      WhatsApp
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      {contactInfo.whatsapp}
                    </div>
                  </div>
                </a>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-3 rounded-lg border border-border bg-secondary/40 px-4 py-3 transition hover:bg-secondary"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Email
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      {contactInfo.email}
                    </div>
                  </div>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="relative overflow-hidden animated-mesh text-white">
        <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true">
          <div className="absolute -right-20 top-0 h-72 w-72 animate-float rounded-full bg-teal-400/20 blur-3xl" />
          <div className="absolute -left-20 bottom-0 h-72 w-72 animate-float-medium rounded-full bg-cyan-300/10 blur-3xl" />
          <div
            className="absolute right-[25%] top-[24%] h-12 w-12 animate-float-slow rounded-xl border border-teal-300/30 bg-teal-300/5"
            style={{ transform: "rotate(15deg)" }}
          />
          <div className="absolute left-[18%] bottom-[22%] h-8 w-8 animate-spin-slow rounded-full border-2 border-dashed border-cyan-300/30" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:py-20">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Start Step 01 Today
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-blue-100/85 sm:text-base">
            Send your research topic, objectives, raw dataset, and target journal
            guidelines. {brand.shortName} will respond with an itemized quote and
            agreed timeline — confirm with a 50% advance to begin.
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
              <Link href="/pricing">
                <ArrowLeftRight className="h-4 w-4" />
                See Pricing
              </Link>
            </Button>
          </div>
          <p className="mt-6 text-xs text-blue-100/60">
            WhatsApp: {contactInfo.whatsapp} · Email: {contactInfo.email} · Payments: {contactInfo.payments}
          </p>
        </div>
      </section>
    </>
  );
}
