import type { Metadata } from "next";
import Link from "next/link";
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
  Clock,
  ArrowRight,
  MessageSquare,
  Mail,
  Wallet,
  CheckCircle2,
  FileCheck2,
  RefreshCw,
  Info,
  Sparkles,
  Star,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  services,
  categoryDescriptions,
  whyChoosePaws,
  brand,
  contactInfo,
  type Service,
  type ServiceCategory,
} from "@/lib/site-data";
import { BudgetCalculator } from "@/components/site/budget-calculator";

export const metadata: Metadata = {
  title: `Pricing | ${brand.shortName} — Official Rate Card`,
  description: `Official ${brand.shortName} rate card in PKR for all 12 services across research & medical manuscript writing, plagiarism & editorial compliance, statistical analysis (SPSS, R, Python), and web development.`,
  keywords: [
    "PAWS pricing",
    "Pak Academic Writing Service rate card",
    "research article write-up price Pakistan",
    "Turnitin check PKR",
    "SPSS analysis cost",
    "R programming biostatistics Pakistan",
    "MERN stack web development quote",
  ],
  openGraph: {
    title: `Pricing | ${brand.shortName} — Official Rate Card`,
    description: `Official ${brand.shortName} rate card in PKR for all 12 services across research & medical manuscript writing, plagiarism & editorial compliance, statistical analysis, and web development.`,
    type: "website",
  },
  alternates: { canonical: "/pricing" },
};

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

const categoryOrder: ServiceCategory[] = [
  "Research & Medical Manuscript Writing",
  "Plagiarism, Formatting & Editorial Compliance",
  "Statistical Analysis & Data Science Services",
  "Web Development",
];

const categoryBadgeStyle: Record<ServiceCategory, string> = {
  "Research & Medical Manuscript Writing":
    "border-primary/20 bg-primary/5 text-primary",
  "Plagiarism, Formatting & Editorial Compliance":
    "border-accent/30 bg-accent/10 text-accent",
  "Statistical Analysis & Data Science Services":
    "border-teal-500/30 bg-teal-500/10 text-teal-700 dark:text-teal-300",
  "Web Development":
    "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300",
};

// Popular / recommended services — highlighted in the rate card
const popularServices = new Set<string>([
  "research-article-write-up",
  "medical-case-report",
  "plagiarism-check-turnitin",
  "basic-spss-analysis",
  "r-programming-biostatistics",
]);

export default function PricingPage() {
  return (
    <>
      {/* ===================== PAGE HEADER ===================== */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-[#0a1f3d] via-[#0e2a52] to-[#0c3b5a] text-white">
      </section>

      {/* ===================== BUDGET CALCULATOR ===================== */}
      <section className="relative overflow-hidden bg-secondary/30">
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <Badge variant="secondary" className="mb-3">
                <Sparkles className="mr-1 h-3 w-3" />
                Budget Estimator
              </Badge>
              <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
                Estimate Your Project Budget
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                Select a service to instantly see the official PAWS rate, pricing
                basis, and turnaround time. All prices are in PKR and come directly
                from the official rate card — no hidden charges.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Info className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Range-based pricing</p>
                    <p className="text-xs text-muted-foreground">
                      Final quote depends on scope, word count, and complexity.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Calculator className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Transparent rates</p>
                    <p className="text-xs text-muted-foreground">
                      No per-page multipliers or hidden fees. You see the official rate.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Glow border wrap around the budget calculator */}
            <div className="glow-border-wrap">
              <BudgetCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== WHY CHOOSE PAWS ===================== */}
      <section className="bg-background">
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
                  className="relative overflow-hidden border-primary/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
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

      {/* ===================== PRICING TABLES BY CATEGORY ===================== */}
      <section className="bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
          {categoryOrder.map((category, idx) => {
            const categoryServices = services.filter(
              (s) => s.category === category,
            );
            if (categoryServices.length === 0) return null;

            return (
              <div
                key={category}
                className={idx === 0 ? "" : "mt-14 sm:mt-20"}
              >
                {/* Category header */}
                <div className="flex flex-col gap-3 border-l-4 border-primary pl-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <Badge
                      variant="outline"
                      className={`mb-2 ${categoryBadgeStyle[category]}`}
                    >
                      Category {String(idx + 1).padStart(2, "0")}
                    </Badge>
                    <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
                      {category}
                    </h2>
                    <p className="mt-2 max-w-3xl text-sm text-muted-foreground sm:text-base">
                      {categoryDescriptions[category]}
                    </p>
                  </div>
                  <div className="shrink-0 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {categoryServices.length}{" "}
                    {categoryServices.length === 1 ? "service" : "services"} · PKR
                  </div>
                </div>

                {/* Gradient divider between header and table */}
                <div className="gradient-divider mt-6" aria-hidden="true" />

                {/* Desktop: readable table */}
                <Card className="mt-8 hidden overflow-hidden md:block">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/40 hover:bg-muted/40">
                        <TableHead className="w-[26%] pl-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Service
                        </TableHead>
                        <TableHead className="w-[40%] text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Scope
                        </TableHead>
                        <TableHead className="w-[14%] text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Turnaround
                        </TableHead>
                        <TableHead className="w-[14%] text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Price (PKR)
                        </TableHead>
                        <TableHead className="w-[6%] text-right pr-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categoryServices.map((service) => (
                        <PricingTableRow key={service.slug} service={service} />
                      ))}
                    </TableBody>
                  </Table>
                </Card>

                {/* Mobile: stacked cards */}
                <div className="mt-6 grid gap-4 md:hidden">
                  {categoryServices.map((service) => {
                    const Icon = iconMap[service.icon] ?? FileText;
                    const isPopular = popularServices.has(service.slug);
                    return (
                      <Card
                        key={service.slug}
                        className="card-hover-glow group gradient-top-border flex flex-col border-primary/10"
                      >
                        {isPopular ? (
                          <div className="absolute right-3 top-3 z-10">
                            <Badge className="badge-pulse gap-1 bg-gradient-to-r from-primary to-accent text-[10px] font-bold uppercase tracking-wider text-white">
                              <Star className="h-3 w-3 fill-current" />
                              Popular
                            </Badge>
                          </div>
                        ) : null}
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="gradient-icon-hover flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                              <Icon className="h-5 w-5" />
                            </div>
                            <Badge variant="outline" className="gap-1 text-[11px] font-medium">
                              <Clock className="h-3 w-3" />
                              {service.turnaround}
                            </Badge>
                          </div>
                          <CardTitle className="mt-3 text-base leading-snug">
                            {service.title}
                          </CardTitle>
                          <CardDescription className="text-xs leading-relaxed">
                            {service.shortDescription}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="rounded-lg border border-border bg-secondary/40 px-3 py-2">
                            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                              Scope
                            </div>
                            <ul className="mt-2 space-y-1">
                              {service.scope.map((item) => (
                                <li
                                  key={item}
                                  className="flex items-start gap-2 text-xs text-foreground/90"
                                >
                                  <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <Separator className="my-3" />
                          <div className="flex items-end justify-between gap-2">
                            <div>
                              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                Price (PKR)
                              </div>
                              <div className="text-sm font-bold text-primary">
                                {service.priceLabel}
                              </div>
                            </div>
                            <Button asChild size="sm" className="gap-1">
                              <Link href="/order">
                                Request
                                <ArrowRight className="h-3.5 w-3.5" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================== PAYMENT METHODS + CONTACT ===================== */}
      <section className="bg-dots bg-background">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
          <div className="grid gap-6 md:grid-cols-2">
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
                      A 50% advance confirms your project; the balance is due on final delivery.
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
                <p className="mt-4 text-xs text-muted-foreground">
                  All prices are quoted in Pakistani Rupees (PKR). Custom quotes
                  available for projects with non-standard scope.
                </p>
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
                    <CardTitle className="text-lg">Talk to {brand.shortName}</CardTitle>
                    <CardDescription className="text-sm">
                      Share your topic, objectives, and dataset to receive an itemized quote.
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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1f3d] via-[#0e2a52] to-[#0c3b5a] text-white">
        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:py-20">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Get an Itemized Quote?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-blue-100/85 sm:text-base">
            Send your research topic, objectives, raw dataset, and target journal
            guidelines. {brand.shortName} will respond with a clear price quote and
            agreed timeline — confirm with a 50% advance to begin.
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

function PricingTableRow({ service }: { service: Service }) {
  const Icon = iconMap[service.icon] ?? FileText;
  const isPopular = popularServices.has(service.slug);
  return (
    <TableRow className="row-hover align-top">
      <TableCell className="pl-4 py-4">
        <div className="flex items-start gap-3">
          <div className="gradient-icon-hover flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
            <Icon className="h-4.5 w-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">
                {service.title}
              </span>
              {isPopular ? (
                <Badge className="gap-1 bg-gradient-to-r from-primary to-accent px-1.5 py-0 text-[10px] font-bold uppercase tracking-wider text-white">
                  <Star className="h-2.5 w-2.5 fill-current" />
                  Popular
                </Badge>
              ) : null}
            </div>
            <Link
              href={`/services/${service.slug}`}
              className="text-[11px] text-primary underline-offset-2 hover:underline"
            >
              View details →
            </Link>
          </div>
        </div>
      </TableCell>
      <TableCell className="py-4 pr-4">
        <ul className="flex flex-wrap gap-x-3 gap-y-1">
          {service.scope.map((item) => (
            <li
              key={item}
              className="flex items-center gap-1.5 text-xs text-foreground/85"
            >
              <CheckCircle2 className="h-3 w-3 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </TableCell>
      <TableCell className="py-4 pr-4">
        <Badge variant="outline" className="gap-1 whitespace-nowrap text-xs font-medium">
          <Clock className="h-3 w-3" />
          {service.turnaround}
        </Badge>
      </TableCell>
      <TableCell className="py-4 pr-4">
        <div className="text-sm font-bold text-primary whitespace-nowrap">
          {service.priceLabel}
        </div>
        {service.pricingNote ? (
          <div className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
            {service.pricingNote}
          </div>
        ) : null}
      </TableCell>
      <TableCell className="py-4 pr-4 text-right">
        <Button asChild size="sm" variant="outline" className="gap-1">
          <Link href="/order">
            Quote
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );
}
