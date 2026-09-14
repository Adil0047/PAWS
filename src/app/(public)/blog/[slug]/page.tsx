import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  User,
  MessageSquare,
  Rss,
  CheckCircle2,
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
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  blogPosts,
  brand,
  contactInfo,
  services,
  blogServiceLinks,
} from "@/lib/site-data";
import {
  JsonLd,
  buildBlogPostingSchema,
  buildBreadcrumbListSchema,
} from "@/components/site/structured-data";

// Icon map for related-service cards on blog pages.
const serviceIconMap: Record<string, LucideIcon> = {
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

// Pre-render all blog post slugs at build time.
export function generateStaticParams(): Params[] {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  return params.then((resolved) => {
    const post = blogPosts.find((p) => p.slug === resolved.slug);
    if (!post) {
      return {
        title: "Article Not Found",
      };
    }
    const url = `/blog/${post.slug}`;
    return {
      title: `${post.title} | ${brand.shortName} Blog`,
      description: post.excerpt,
      alternates: {
        canonical: url,
      },
      keywords: [
        post.category,
        brand.shortName,
        "academic writing",
        "research manuscript",
        post.title,
      ],
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: "article",
        url,
        images: [
          {
            url: post.image,
            width: 1200,
            height: 675,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
        images: [post.image],
      },
    };
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const related = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  // If there are fewer than 3 in the same category, top up with other posts.
  const relatedFilled =
    related.length >= 3
      ? related
      : [
          ...related,
          ...blogPosts
            .filter(
              (p) =>
                p.category !== post.category && p.slug !== post.slug
            )
            .slice(0, 3 - related.length),
        ];

  // Related PAWS services for this article — based on the explicit
  // blogServiceLinks mapping in site-data.ts. Only services that genuinely
  // match the article topic are shown.
  const relatedServiceSlugs = blogServiceLinks[post.slug] ?? [];
  const relatedServices = relatedServiceSlugs
    .map((sSlug) => services.find((s) => s.slug === sSlug))
    .filter((s): s is (typeof services)[number] => Boolean(s));

  // Page-specific structured data: BlogPosting + BreadcrumbList.
  const blogPostingSchema = buildBlogPostingSchema({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    author: post.author,
    image: post.image,
  });
  const breadcrumbSchema = buildBreadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  return (
    <>
      <JsonLd schema={blogPostingSchema} />
      <JsonLd schema={breadcrumbSchema} />
      {/* ===================== HEADER ===================== */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-[#0a1f3d] via-[#0e2a52] to-[#0c3b5a] text-white">
        <div className="relative mx-auto max-w-4xl px-4 py-12 sm:py-16">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-xs text-blue-100/85"
          >
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog" className="hover:text-white">
              Blog
            </Link>
            <span aria-hidden="true">/</span>
            <span className="line-clamp-1 text-teal-200">{post.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="border-white/20 bg-white/5 text-teal-100"
            >
              <Rss className="mr-1.5 h-3 w-3" />
              {brand.shortName} Editorial
            </Badge>
            <Badge
              variant="outline"
              className="border-white/20 bg-white/5 text-teal-100"
            >
              {post.category}
            </Badge>
          </div>

          <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <p className="mt-4 max-w-3xl text-sm font-medium text-teal-100/90 sm:text-base">
            {post.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-blue-100/85 sm:text-sm">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-teal-300" />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-teal-300" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-teal-300" />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* ===================== HERO IMAGE + ARTICLE ===================== */}
      <article className="bg-background">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Hero image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-secondary shadow-md">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
              priority
            />
            <div
              className={`absolute inset-0 bg-gradient-to-br ${post.accent} opacity-20 mix-blend-multiply`}
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
          </div>

          {/* Body */}
          <div className="mt-8 space-y-5">
            {post.content.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-sm leading-relaxed text-foreground sm:text-base sm:leading-[1.85]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Inline CTA */}
          <Card className="mt-10 overflow-hidden border-primary/15">
            <CardContent className="grid gap-6 p-6 sm:grid-cols-[1.6fr_1fr] sm:p-8">
              <div>
                <Badge variant="secondary" className="mb-2">
                  Get expert help
                </Badge>
                <h2 className="text-balance text-xl font-bold tracking-tight sm:text-2xl">
                  Working on a similar manuscript?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  The {brand.shortName} editorial team provides publication-grade
                  writing, statistical analysis, and editorial compliance — aligned
                  with ICMJE, CARE, PRISMA, and HEC/CPSP standards. Share your
                  topic and objectives to receive an itemized quote.
                </p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {[
                    "2 free revision rounds within 14 days",
                    "Non-repository Turnitin check",
                    "Reproducible SPSS / R / Python scripts",
                    "Confidentiality guaranteed",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs text-foreground sm:text-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col justify-center gap-3 rounded-xl bg-secondary/50 p-5">
                <Button asChild className="w-full gap-2">
                  <Link href="/order">
                    <MessageSquare className="h-4 w-4" />
                    Request a Quote
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full gap-2">
                  <Link href="/services">Browse Services</Link>
                </Button>
                <a
                  href={`https://wa.me/${contactInfo.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-center text-xs text-muted-foreground hover:text-primary"
                >
                  WhatsApp: {contactInfo.whatsapp} · {contactInfo.businessHours}
                </a>
              </div>
            </CardContent>
          </Card>

          <Separator className="my-10" />

          {/* Author footer */}
          <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.45_0.1_200)] text-primary-foreground shadow-md">
                <User className="h-6 w-6" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">
                  {post.author}
                </div>
                <div className="text-xs text-muted-foreground">
                  {brand.shortName} · {post.category} · {post.readTime}
                </div>
              </div>
            </div>
            <Button asChild variant="ghost" size="sm" className="gap-1">
              <Link href="/blog">
                <ArrowLeft className="h-3.5 w-3.5" />
                All articles
              </Link>
            </Button>
          </div>
        </div>
      </article>

      {/* ===================== RELATED PAWS SERVICES ===================== */}
      {relatedServices.length > 0 && (
        <section className="border-t border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="mb-3">
                Related PAWS Services
              </Badge>
              <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
                Get hands-on help with this topic
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                The {brand.shortName} services below directly relate to the
                concepts covered in this article.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((service) => {
                const Icon = serviceIconMap[service.icon] ?? FileText;
                return (
                  <Card
                    key={service.slug}
                    className="group flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Icon className="h-5 w-5" />
                        </div>
                        <Badge variant="outline" className="gap-1 text-xs font-medium">
                          <Clock className="h-3 w-3" />
                          {service.turnaround}
                        </Badge>
                      </div>
                      <CardTitle className="mt-3 text-base leading-snug">
                        <Link
                          href={`/services/${service.slug}`}
                          className="after:absolute after:inset-0 after:content-['']"
                        >
                          {service.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {service.shortDescription}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      <div className="rounded-lg border border-border bg-secondary/40 px-3 py-2">
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Pricing
                        </div>
                        <div className="text-sm font-bold text-primary">
                          {service.priceLabel}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===================== RELATED POSTS ===================== */}
      {relatedFilled.length > 0 && (
        <section className="border-t border-border bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
            <div className="flex items-end justify-between gap-4">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {related.length > 0 ? "Related Articles" : "More Articles"}
                </Badge>
                <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
                  {related.length > 0
                    ? `More in ${post.category}`
                    : "Keep reading"}
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
              {relatedFilled.map((rel) => (
                <article
                  key={rel.slug}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <Link
                    href={`/blog/${rel.slug}`}
                    className="relative block aspect-[16/9] overflow-hidden bg-secondary"
                    aria-label={`Read: ${rel.title}`}
                  >
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${rel.accent} opacity-25 mix-blend-multiply`}
                      aria-hidden="true"
                    />
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                    <Badge className="absolute left-3 top-3 gap-1 border border-white/20 bg-white/15 text-white backdrop-blur-md">
                      {rel.category}
                    </Badge>
                  </Link>
                  <CardContent className="flex flex-1 flex-col p-5">
                    <h3 className="text-base font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
                      <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {rel.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {rel.readTime}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{rel.date}</span>
                    </div>
                  </CardContent>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===================== FINAL CTA ===================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1f3d] via-[#0e2a52] to-[#0c3b5a] text-white">
        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:py-20">
          <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Turn this guidance into a finished manuscript
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-blue-100/85 sm:text-base">
            From IMRaD structure to PRISMA-compliant systematic reviews,
            {brand.shortName} delivers publication-ready work — request an
            itemized quote today.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="gap-2 bg-teal-400 text-[#0a1f3d] hover:bg-teal-300 hover:text-[#0a1f3d]"
            >
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
              <Link href="/contact">Contact {brand.shortName}</Link>
            </Button>
          </div>
          <p className="mt-6 text-xs text-blue-100/80">
            WhatsApp: {contactInfo.whatsapp} · Email: {contactInfo.email} ·{" "}
            {contactInfo.businessHours} availability
          </p>
        </div>
      </section>
    </>
  );
}
