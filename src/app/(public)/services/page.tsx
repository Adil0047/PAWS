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
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  brand,
  services,
  categoryDescriptions,
  type ServiceCategory,
} from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Our Services",
  description: `${brand.shortName} service catalogue — research & medical manuscript writing, plagiarism & editorial compliance, statistical analysis (SPSS, R, Python), and MERN stack web development.`,
  alternates: { canonical: "/services" },
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

export default function ServicesIndexPage() {
  return (
    <>
      {/* ===================== PAGE HEADER ===================== */}
      <section className="shine-sweep-auto relative overflow-hidden border-b border-border paws-hero-mesh text-white">
        {/* Decorative floating shapes */}
        <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true">
          <div className="absolute -left-20 top-0 h-64 w-64 animate-float rounded-full bg-teal-400/20 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-72 w-72 animate-float-medium rounded-full bg-cyan-300/10 blur-3xl" />
          <div
            className="absolute right-[20%] top-[26%] h-12 w-12 animate-float-slow rounded-xl border border-teal-300/30 bg-teal-300/5"
            style={{ transform: "rotate(15deg)" }}
          />
          <div className="absolute left-[14%] bottom-[22%] h-8 w-8 animate-spin-slow rounded-full border-2 border-dashed border-cyan-300/30" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:py-20">
          <Badge
            variant="outline"
            className="mb-4 border-white/20 bg-white/5 text-teal-100"
          >
            <Sparkles className="mr-1 h-3 w-3" />
            {brand.shortName} Service Catalogue
          </Badge>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="bg-gradient-to-r from-white via-teal-100 to-teal-200 bg-clip-text text-transparent">
              Our Services
            </span>
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-blue-100/85 sm:text-base">
            {brand.tagline}
          </p>
          <p className="mt-3 max-w-3xl text-sm text-blue-100/70">
            {brand.description}
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
              <Link href="/#how-it-works">How It Works</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===================== CATEGORY SECTIONS ===================== */}
      <div className="bg-dots bg-background">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
          {categoryOrder.map((category, idx) => {
            const categoryServices = services.filter((s) => s.category === category);
            if (categoryServices.length === 0) return null;

            return (
              <section
                key={category}
                aria-labelledby={`category-${idx}`}
                className={idx === 0 ? "" : "mt-16 sm:mt-20"}
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
                    <h2
                      id={`category-${idx}`}
                      className="text-balance text-2xl font-bold tracking-tight sm:text-3xl"
                    >
                      {category}
                    </h2>
                    <p className="mt-2 max-w-3xl text-sm text-muted-foreground sm:text-base">
                      {categoryDescriptions[category]}
                    </p>
                  </div>
                  <div className="shrink-0 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {categoryServices.length}{" "}
                    {categoryServices.length === 1 ? "service" : "services"}
                  </div>
                </div>

                {/* Gradient divider line */}
                <div className="gradient-divider mt-6" aria-hidden="true" />

                {/* Service cards */}
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryServices.map((service) => {
                    const Icon = iconMap[service.icon] ?? FileText;
                    return (
                      <Card
                        key={service.slug}
                        className="card-hover-glow group gradient-top-border flex flex-col"
                      >
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
                              Pricing
                            </div>
                            <div className="text-sm font-bold text-primary">
                              {service.priceLabel}
                            </div>
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
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* ===================== CTA STRIP ===================== */}
      <section className="relative overflow-hidden border-t border-border bg-gradient-to-br from-[#0a1f3d] via-[#0e2a52] to-[#0c3b5a] text-white">
        <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true">
          <div className="absolute -right-16 top-0 h-56 w-56 animate-float rounded-full bg-teal-400/20 blur-3xl" />
          <div className="absolute -left-16 bottom-0 h-56 w-56 animate-float-medium rounded-full bg-cyan-300/10 blur-3xl" />
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-10 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
              Not sure which service fits your research?
            </h2>
            <p className="mt-1 text-sm text-blue-100/85">
              Share your topic and dataset — we&apos;ll recommend the right scope and provide an itemized quote.
            </p>
          </div>
          <Button asChild size="lg" className="gap-2 bg-teal-400 text-[#0a1f3d] hover:bg-teal-300 hover:text-[#0a1f3d]">
            <Link href="/order">
              <MessageSquare className="h-4 w-4" />
              Request a Quote
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
