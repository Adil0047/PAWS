"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ClipboardList,
  CreditCard,
  PackageCheck,
  ArrowRight,
  Download,
  Star,
  Quote,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { samples, testimonials, type Testimonial } from "@/lib/site-data";
import { useOrder } from "@/lib/order-context";

type ApprovedReview = {
  id: string;
  name: string;
  rating: number;
  role: string | null;
  message: string;
};

function reviewToTestimonial(r: ApprovedReview): Testimonial & { id: string } {
  const accents = [
    "from-emerald-500 to-teal-600",
    "from-amber-500 to-orange-600",
    "from-rose-500 to-pink-600",
    "from-violet-500 to-purple-600",
    "from-teal-500 to-cyan-600",
  ];
  const initials = r.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const accentIndex = r.name.charCodeAt(0) % accents.length;
  return {
    id: r.id,
    name: r.name,
    role: r.role || "Verified Student",
    message: r.message,
    initials,
    accent: accents[accentIndex],
  };
}

const steps = [
  {
    icon: ClipboardList,
    title: "Place Your Order",
    description:
      "Fill out the order form with complete details regarding your task. Once we receive it, you'll get a custom price quote instantly.",
  },
  {
    icon: CreditCard,
    title: "Proceed with Payment",
    description:
      "After receiving the quote, proceed with secure payment via credit/debit card or bank transfer. Your transaction is fully protected.",
  },
  {
    icon: PackageCheck,
    title: "Receive Complete Project",
    description:
      "Your task is assigned to the most competent writer. Receive professionally completed work, ready to submit right away.",
  },
];

export function HowItWorksSection() {
  const { openOrder } = useOrder();
  const [approvedReviews, setApprovedReviews] = useState<ApprovedReview[]>([]);

  useEffect(() => {
    fetch("/api/reviews?approved=true")
      .then((r) => r.json())
      .then((data) => {
        if (data.reviews) setApprovedReviews(data.reviews.slice(0, 4));
      })
      .catch(() => {});
  }, []);

  // Merge approved DB reviews (first) with static testimonials, cap at 8
  const allTestimonials = [
    ...approvedReviews.map(reviewToTestimonial),
    ...testimonials,
  ].slice(0, 8);

  return (
    <>
      {/* How It Works */}
      <section className="bg-secondary/40 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
              <ClipboardList className="h-3.5 w-3.5" />
              Simple Process
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Follow the Easy Steps to Receive Effective Assistance
            </h2>
          </div>

          <div className="relative grid gap-8 md:grid-cols-3">
            {/* connecting line */}
            <div className="absolute left-0 right-0 top-12 hidden h-0.5 bg-gradient-to-r from-primary/20 via-accent/40 to-primary/20 md:block" />

            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="relative"
              >
                <div className="relative z-10 mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-secondary bg-card shadow-md">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <span className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground shadow">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-center text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-center text-sm text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button size="lg" className="gap-2" onClick={() => openOrder()}>
              Start Now!
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Samples */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
              <FileText className="h-3.5 w-3.5" />
              Sample Work
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Check Out Our Samples
            </h2>
            <p className="mt-3 text-muted-foreground">
              Browse a selection of our recently delivered thesis samples to gauge the quality,
              depth, and formatting standards we maintain.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {samples.map((sample, i) => (
              <motion.div
                key={sample.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Simulated document preview */}
                <div className={`relative h-44 overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 p-4`}>
                  <div className="absolute inset-0 bg-academic-grid opacity-40" />
                  <div className="relative mx-auto h-full max-w-[170px] rounded-md bg-white p-3 shadow-lg">
                    <div className="h-2 w-3/4 rounded bg-foreground/20" />
                    <div className="mt-2 h-1.5 w-full rounded bg-foreground/10" />
                    <div className="mt-1 h-1.5 w-full rounded bg-foreground/10" />
                    <div className="mt-1 h-1.5 w-2/3 rounded bg-foreground/10" />
                    <div className="mt-3 h-1.5 w-full rounded bg-foreground/10" />
                    <div className="mt-1 h-1.5 w-full rounded bg-foreground/10" />
                    <div className="mt-1 h-1.5 w-1/2 rounded bg-foreground/10" />
                    <div className="mt-3 h-1.5 w-full rounded bg-foreground/10" />
                    <div className="mt-1 h-1.5 w-3/4 rounded bg-foreground/10" />
                  </div>
                  <span className="absolute right-3 top-3 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold text-accent-foreground">
                    {sample.format}
                  </span>
                </div>

                <div className="p-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {sample.discipline}
                  </div>
                  <h3 className="mt-1 text-lg font-semibold text-foreground">
                    {sample.title}
                  </h3>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{sample.level}</span>
                    <span>·</span>
                    <span>{sample.pages} Pages</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-1.5" asChild>
                      <a href={sample.file} target="_blank" rel="noopener noreferrer" download>
                        <Download className="h-3.5 w-3.5" />
                        Download Sample
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      className="gap-1.5"
                      onClick={() => openOrder()}
                    >
                      Order
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="scroll-mt-24 bg-gradient-to-br from-primary to-primary/85 py-16 md:py-24 text-primary-foreground">
        <div className="absolute inset-0 bg-academic-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur">
              <Quote className="h-3.5 w-3.5 text-accent" />
              Testimonials
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              What Our Students Say
            </h2>
            <p className="mt-3 text-primary-foreground/80">
              Don&apos;t just take our word for it — here&apos;s what students across Pakistan say
              about their experience with us.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {allTestimonials.map((t, i) => {
              const rating = "rating" in t ? (t as { rating: number }).rating : 5;
              return (
              <motion.div
                key={t.id || t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:bg-white/15 hover:shadow-xl"
              >
                <Quote className="absolute right-4 top-4 h-10 w-10 text-accent/20" />
                <div className="relative flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={`h-4 w-4 ${s < rating ? "fill-accent text-accent" : "fill-white/10 text-white/20"}`}
                    />
                  ))}
                </div>
                <p className="relative mt-4 flex-1 text-sm leading-relaxed text-primary-foreground/90 line-clamp-4">{t.message}</p>
                <div className="mt-4 flex items-center gap-3 border-t border-white/15 pt-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${t.accent} text-sm font-bold text-white`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-primary-foreground/70">{t.role}</div>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
              asChild
            >
              <a href="#review-form">
                Share Your Experience
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              onClick={() => openOrder()}
            >
              Order Now
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
