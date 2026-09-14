"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Clock, MessageSquare, Rss } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { blogCategories, contactInfo, brand } from "@/lib/site-data";

type PostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  accent: string;
  image: string;
};

export function BlogIndexClient({ posts }: { posts: PostSummary[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-[#0a1f3d] via-[#0e2a52] to-[#0c3b5a] text-white">
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:py-20">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-xs text-blue-100/85"
          >
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-teal-200">Blog</span>
          </nav>

          <Badge
            variant="outline"
            className="mb-4 border-white/20 bg-white/5 text-teal-100"
          >
            <Rss className="mr-1.5 h-3.5 w-3.5" />
            {brand.shortName} Editorial
          </Badge>
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Research, Writing &amp; Publication Insights
          </h1>
          <p className="mt-4 max-w-3xl text-sm font-medium text-teal-100/90 sm:text-base">
            Practical guides on IMRaD structure, non-repository Turnitin checks,
            statistical analysis tools, PRISMA systematic reviews, CARE case
            reports, and citation styles — written by the {brand.shortName}{" "}
            editorial team.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-blue-100/85">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
              <span className="text-teal-300">●</span>
              {posts.length} articles
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
              <span className="text-teal-300">●</span>
              {blogCategories.length - 1} categories
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
              <span className="text-teal-300">●</span>
              Available {contactInfo.businessHours}
            </span>
          </div>
        </div>
      </section>

      {/* ===================== FILTER + GRID ===================== */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
          {/* Category filter pills */}
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Filter:
            </span>
            {blogCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-secondary/30 p-12 text-center">
              <p className="text-sm text-muted-foreground">
                No articles found in this category yet. Check back soon.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 gap-1"
                onClick={() => setActiveCategory("All")}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                View all articles
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => (
                <article
                  key={post.slug}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative block aspect-[16/9] overflow-hidden bg-secondary"
                    aria-label={`Read: ${post.title}`}
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${post.accent} opacity-25 mix-blend-multiply`}
                      aria-hidden="true"
                    />
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                    <Badge className="absolute left-3 top-3 gap-1 border border-white/20 bg-white/15 text-white backdrop-blur-md">
                      {post.category}
                    </Badge>
                  </Link>

                  <CardContent className="flex flex-1 flex-col p-5">
                    <h2 className="text-base font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-lg">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>

                    <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {post.author}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{post.date}</span>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border">
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="-ml-2 gap-1 text-primary hover:text-primary"
                      >
                        <Link href={`/blog/${post.slug}`}>
                          Read article
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1f3d] via-[#0e2a52] to-[#0c3b5a] text-white">
        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:py-20">
          <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Need hands-on help with your manuscript?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-blue-100/85 sm:text-base">
            The {brand.shortName} editorial team provides publication-grade
            manuscript writing, statistical analysis, and editorial compliance —
            aligned with ICMJE, CARE, PRISMA, and HEC/CPSP standards.
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
              <Link href="/services">Browse Services</Link>
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
