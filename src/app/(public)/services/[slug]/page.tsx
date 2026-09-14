import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  ArrowLeft,
  MessageSquare,
  CheckCircle2,
  Package,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {
  brand,
  services,
  categoryDescriptions,
  blogPosts,
  serviceBlogLinks,
} from "@/lib/site-data";
import {
  JsonLd,
  buildServiceSchema,
  buildBreadcrumbListSchema,
} from "@/components/site/structured-data";

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

type Params = { slug: string };

// Pre-render all 12 service slugs at build time.
export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  return params.then((resolved) => {
    const service = services.find((s) => s.slug === resolved.slug);
    if (!service) {
      return {
        title: "Service Not Found",
      };
    }
    return {
      title: service.title,
      description: service.shortDescription,
      alternates: {
        canonical: `/services/${service.slug}`,
      },
      openGraph: {
        title: `${service.title} | ${brand.shortName}`,
        description: service.shortDescription,
        type: "website",
      },
    };
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const Icon = iconMap[service.icon] ?? FileText;
  const related = services.filter(
    (s) => s.category === service.category && s.slug !== service.slug
  );

  // Related blog articles — based on the explicit serviceBlogLinks mapping
  // (reverse of blogServiceLinks) in site-data.ts. Only articles that
  // genuinely cover this service's topic are shown.
  const relatedBlogSlugs = serviceBlogLinks[service.slug] ?? [];
  const relatedArticles = relatedBlogSlugs
    .map((bSlug) => blogPosts.find((p) => p.slug === bSlug))
    .filter((p): p is (typeof blogPosts)[number] => Boolean(p));

  // Page-specific structured data: individual Service + BreadcrumbList.
  const serviceSchema = buildServiceSchema({
    slug: service.slug,
    title: service.title,
    shortDescription: service.shortDescription,
    priceLabel: service.priceLabel,
    priceMin: service.priceMin,
    priceMax: service.priceMax,
    pricingBasis: service.pricingBasis,
  });
  const breadcrumbSchema = buildBreadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: service.title, url: `/services/${service.slug}` },
  ]);

  return (
    <>
      <JsonLd schema={serviceSchema} />
      <JsonLd schema={breadcrumbSchema} />
      {/* ===================== HEADER ===================== */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-[#0a1f3d] via-[#0e2a52] to-[#0c3b5a] text-white">

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:py-16">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-xs text-blue-100/85"
          >
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/services" className="hover:text-white">
              Services
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-teal-200">{service.title}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-400/15 text-teal-200 ring-1 ring-teal-300/30">
                  <Icon className="h-7 w-7" />
                </div>
                <Badge
                  variant="outline"
                  className="border-white/20 bg-white/5 text-teal-100"
                >
                  {service.category}
                </Badge>
              </div>

              <h1 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {service.title}
              </h1>

              <p className="mt-4 max-w-3xl text-sm text-blue-100/85 sm:text-base">
                {service.shortDescription}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
                  <Clock className="h-4 w-4 text-teal-300" />
                  <span className="text-blue-50/90">Turnaround: {service.turnaround}</span>
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
                  <span className="text-teal-300">●</span>
                  <span className="text-blue-50/90">{service.priceLabel}</span>
                </span>
              </div>
            </div>

            {/* Quick action card */}
            <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-5 backdrop-blur-md">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-100/80">
                Pricing
              </div>
              <div className="mt-1 text-xl font-bold text-white">{service.priceLabel}</div>
              {service.pricingNote && (
                <p className="mt-2 text-xs text-blue-100/85">{service.pricingNote}</p>
              )}
              <Button
                asChild
                className="mt-4 w-full gap-2 bg-teal-400 text-[#0a1f3d] hover:bg-teal-300 hover:text-[#0a1f3d]"
              >
                <Link href="/order">
                  <MessageSquare className="h-4 w-4" />
                  Request a Quote
                </Link>
              </Button>
              <Link
                href="/services"
                className="mt-3 flex items-center justify-center gap-1 text-xs text-blue-100/85 hover:text-white"
              >
                <ArrowLeft className="h-3 w-3" />
                Back to all services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== MAIN BODY ===================== */}
      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            {/* Left column: scope + deliverables */}
            <div className="space-y-10">
              {/* Scope */}
              <section>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FileSearch className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight sm:text-2xl">Service Scope</h2>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  What&apos;s included in {service.title}.
                </p>
                <Card className="mt-5">
                  <CardContent className="pt-6">
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {service.scope.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          <span className="text-sm text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </section>

              {/* Deliverables */}
              <section>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Package className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight sm:text-2xl">Deliverables</h2>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  What you receive upon final delivery.
                </p>
                <Card className="mt-5">
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent">
                            ✓
                          </span>
                          <span className="text-sm text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </section>

              {/* Guidelines & Tools */}
              {(service.guidelines && service.guidelines.length > 0) ||
              (service.tools && service.tools.length > 0) ? (
                <section className="grid gap-5 sm:grid-cols-2">
                  {service.guidelines && service.guidelines.length > 0 && (
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <BookOpenCheck className="h-5 w-5 text-primary" />
                          <CardTitle className="text-base">Guidelines</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {service.guidelines.map((g) => (
                            <Badge key={g} variant="secondary">
                              {g}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  {service.tools && service.tools.length > 0 && (
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Wrench className="h-5 w-5 text-primary" />
                          <CardTitle className="text-base">Tools</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {service.tools.map((t) => (
                            <Badge key={t} variant="outline">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </section>
              ) : null}
            </div>

            {/* Right column: sidebar */}
            <aside className="space-y-6">
              {/* Pricing summary card */}
              <Card className="sticky top-20 border-primary/15">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">Pricing &amp; Timeline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Price
                    </div>
                    <div className="mt-1 text-lg font-bold text-primary">
                      {service.priceLabel}
                    </div>
                    {service.pricingNote && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {service.pricingNote}
                      </p>
                    )}
                  </div>
                  <Separator />
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Turnaround
                    </div>
                    <div className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Clock className="h-4 w-4 text-accent" />
                      {service.turnaround}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Category
                    </div>
                    <div className="mt-1 text-sm font-medium text-foreground">
                      {service.category}
                    </div>
                  </div>
                  <Button asChild className="mt-2 w-full gap-2">
                    <Link href="/order">
                      <MessageSquare className="h-4 w-4" />
                      Request a Quote
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Category note */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">
                    About this category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-foreground">
                    {categoryDescriptions[service.category]}
                  </p>
                </CardContent>
              </Card>
            </aside>
          </div>

          {/* ===================== RELATED SERVICES ===================== */}
          {related.length > 0 && (
            <section className="mt-16 sm:mt-20">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    Related Services
                  </Badge>
                  <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
                    More in {service.category}
                  </h2>
                </div>
                <Button asChild variant="ghost" size="sm" className="gap-1">
                  <Link href="/services">
                    View All
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((rel) => {
                  const RelIcon = iconMap[rel.icon] ?? FileText;
                  return (
                    <Card
                      key={rel.slug}
                      className="group flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                            <RelIcon className="h-5 w-5" />
                          </div>
                          <Badge variant="outline" className="gap-1 text-xs">
                            <Clock className="h-3 w-3" />
                            {rel.turnaround}
                          </Badge>
                        </div>
                        <CardTitle className="mt-3 text-base">{rel.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          {rel.shortDescription}
                        </p>
                        <div className="mt-3 text-sm font-semibold text-primary">
                          {rel.priceLabel}
                        </div>
                      </CardContent>
                      <CardContent className="pt-0">
                        <Button asChild variant="outline" size="sm" className="w-full gap-1">
                          <Link href={`/services/${rel.slug}`}>
                            View {rel.title} Service
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          )}

          {/* ===================== RELATED ARTICLES ===================== */}
          {relatedArticles.length > 0 && (
            <section className="mt-16 sm:mt-20">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    Related Articles
                  </Badge>
                  <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
                    Read more about {service.title.toLowerCase()}
                  </h2>
                </div>
                <Button asChild variant="ghost" size="sm" className="gap-1">
                  <Link href="/blog">
                    View All
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((article) => (
                  <article
                    key={article.slug}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <Link
                      href={`/blog/${article.slug}`}
                      className="relative block aspect-[16/9] overflow-hidden bg-secondary"
                      aria-label={`Read: ${article.title}`}
                    >
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${article.accent} opacity-25 mix-blend-multiply`}
                        aria-hidden="true"
                      />
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                      <Badge className="absolute left-3 top-3 gap-1 border border-white/20 bg-white/15 text-white backdrop-blur-md">
                        {article.category}
                      </Badge>
                    </Link>
                    <CardContent className="flex flex-1 flex-col p-5">
                      <h3 className="text-base font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
                        <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {article.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {article.readTime}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{article.date}</span>
                      </div>
                    </CardContent>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* ===================== BOTTOM CTA ===================== */}
          <section className="mt-16 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a1f3d] via-[#0e2a52] to-[#0c3b5a] p-8 text-white sm:mt-20 sm:p-10">
            <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
              <div>
                <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
                  Ready to start {service.title.toLowerCase()}?
                </h2>
                <p className="mt-2 max-w-xl text-sm text-blue-100/80">
                  Share your research topic and dataset — receive an itemized quote and agreed
                  timeline within hours.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:shrink-0">
                <Button asChild size="lg" className="gap-2 bg-teal-400 text-[#0a1f3d] hover:bg-teal-300 hover:text-[#0a1f3d]">
                  <Link href="/order">
                    <MessageSquare className="h-4 w-4" />
                    Request a Quote
                  </Link>
                </Button>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-1 text-xs text-blue-100/85 hover:text-white"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Browse all services
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
