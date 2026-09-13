"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Star, Sparkles, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroStats, trustBadges, contactInfo } from "@/lib/site-data";
import { useOrder } from "@/lib/order-context";
import { CountUp } from "@/components/site/count-up";
import { LiveCounter } from "@/components/site/live-counter";

export function HeroSection() {
  const { openOrder } = useOrder();

  return (
    <section id="home" className="relative overflow-hidden hero-mesh text-white">
      <div className="absolute inset-0 bg-academic-grid opacity-40" />
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur"
            >
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Pakistan&apos;s #1 Thesis Writing Service · 15+ Years of Excellence
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-5 text-4xl font-bold leading-[1.15] tracking-tight text-balance md:text-5xl lg:text-6xl"
            >
              Reliable Thesis Writing Services in Pakistan{" "}
              <span className="whitespace-nowrap bg-gradient-to-r from-accent to-amber-200 bg-clip-text text-transparent">
                You Can Trust
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mt-5 max-w-xl text-base text-white/85 md:text-lg"
            >
              Thesis Writing Service PK is the leading academic writing provider with over
              15 years of experience delivering excellence. We cover all educational aspects
              to ensure your success — 100% human-written, plagiarism-free work.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <Button
                size="lg"
                className="gap-2 bg-accent text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent/90"
                onClick={() => openOrder()}
              >
                Order Now
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                asChild
              >
                <a href="#calculator">
                  Calculate Price
                </a>
              </Button>
              <a
                href={`tel:${contactInfo.phoneRaw}`}
                className="ml-1 flex items-center gap-2 text-sm font-medium text-white/90 transition-colors hover:text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20 transition-all hover:bg-white/25">
                  <Phone className="h-4 w-4" />
                </span>
                {contactInfo.phone}
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {["100% Human-Written", "Plagiarism-Free", "On-Time Delivery", "Free Revisions"].map(
                (badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur transition-colors hover:bg-white/20"
                  >
                    <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                    {badge}
                  </span>
                )
              )}
            </motion.div>
          </div>

          {/* Right: stats card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-accent/30 to-primary/20 blur-2xl" />
              {/* Floating student image badge — positioned to the left, outside the card */}
              <div className="absolute -left-6 -top-6 z-20 hidden h-24 w-24 overflow-hidden rounded-2xl border-4 border-white/40 shadow-2xl sm:block animate-float lg:-left-10">
                <img
                  src="/images/hero-student.png"
                  alt="Student working on thesis"
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-400 ring-2 ring-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
              </div>
              {/* Floating "100% Human" pill — positioned above-right, clear of the card edge */}
              <div className="absolute -right-3 -top-4 z-20 hidden rounded-full bg-accent px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-accent-foreground shadow-xl ring-2 ring-white/40 sm:block">
                100% Human
              </div>
              <div className="relative rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl md:p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5">
                      {["from-emerald-400 to-teal-500", "from-amber-400 to-orange-500", "from-rose-400 to-pink-500", "from-violet-400 to-purple-500"].map(
                        (g, i) => (
                          <div
                            key={i}
                            className={`h-7 w-7 rounded-full border-2 border-white/80 bg-gradient-to-br ${g}`}
                          />
                        )
                      )}
                    </div>
                    <span className="text-xs font-medium text-white/80">20,000+ Students</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-accent/20 px-2.5 py-1 text-xs font-semibold text-accent">
                    <Star className="h-3.5 w-3.5 fill-accent" />
                    4.9/5
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  {heroStats.map((stat, i) => (
                    <div
                      key={stat.label}
                      className={`rounded-2xl border border-white/15 bg-white/5 p-4 ${
                        i === 0 ? "col-span-2" : ""
                      }`}
                    >
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-2xl font-bold text-white md:text-3xl">
                          <CountUp value={stat.value} />
                        </span>
                        {stat.suffix && (
                          <span className="text-lg font-bold text-accent">{stat.suffix}</span>
                        )}
                      </div>
                      <div className="mt-0.5 text-xs font-medium text-white/70">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl bg-accent/15 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-accent">
                      <Sparkles className="h-4 w-4" />
                      No ChatGPT or AI Text Generators
                    </div>
                    {/* Live order counter */}
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                      </span>
                      <span className="text-[10px] font-medium text-white/80">
                        <LiveCounter /> orders live
                      </span>
                    </div>
                  </div>
                  <p className="mt-1.5 text-xs text-white/75">
                    Every piece is crafted by expert writers to meet your exact needs and unique
                    writing style. 100% plagiarism-free, guaranteed.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust marquee */}
        <div className="relative mt-10 overflow-hidden border-y border-white/10 py-3.5">
          <div className="flex w-max animate-marquee gap-8">
            {[...trustBadges, ...trustBadges].map((badge, i) => (
              <span
                key={i}
                className="flex items-center gap-2 text-sm font-medium text-white/70"
              >
                <ShieldCheck className="h-4 w-4 text-accent" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
