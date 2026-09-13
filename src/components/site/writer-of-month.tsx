"use client";

import { motion } from "framer-motion";
import { Crown, Star, Award, TrendingUp, Quote, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/lib/order-context";
import { writers } from "@/lib/site-data";

export function WriterOfMonth() {
  const { openOrder } = useOrder();
  // Pick the writer with the highest rating + success rate as "writer of the month"
  const writer = [...writers]
    .filter((w) => w.status !== "offline")
    .sort((a, b) => b.rating + b.successRate / 100 - (a.rating + a.successRate / 100))[0];

  if (!writer) return null;

  return (
    <section className="bg-gradient-to-br from-primary to-primary/80 py-16 text-primary-foreground md:py-24">
      <div className="absolute inset-0 bg-academic-grid opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="grid items-center gap-10 lg:grid-cols-12"
        >
          {/* Left: Writer spotlight */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm">
              {/* Crown badge */}
              <div className="absolute -top-6 left-1/2 z-20 -translate-x-1/2">
                <div className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-accent-foreground shadow-lg">
                  <Crown className="h-3.5 w-3.5" />
                  Writer of the Month
                </div>
              </div>

              {/* Writer card */}
              <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-8 text-center backdrop-blur-xl">
                {/* Avatar */}
                <div className="relative mx-auto h-28 w-28">
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${writer.accent} shadow-2xl`} />
                  <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white">
                    {writer.initials}
                  </div>
                  {/* Status dot */}
                  <div className="absolute bottom-1 right-1 h-6 w-6 rounded-full border-4 border-primary bg-green-400" />
                  {/* Star badge */}
                  <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg">
                    <Star className="h-5 w-5 fill-accent-foreground" />
                  </div>
                </div>

                <h3 className="mt-5 text-xl font-bold">{writer.name}</h3>
                <div className="mt-1 text-sm text-primary-foreground/80">{writer.degree}</div>
                <div className="mt-1 text-xs text-primary-foreground/60">{writer.specialty}</div>

                {/* Stats grid */}
                <div className="mt-6 grid grid-cols-3 gap-2">
                  <div className="rounded-xl border border-white/15 bg-white/5 p-3">
                    <div className="flex items-center justify-center gap-1 text-lg font-bold">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      {writer.rating}
                    </div>
                    <div className="text-[10px] text-primary-foreground/70">Rating</div>
                  </div>
                  <div className="rounded-xl border border-white/15 bg-white/5 p-3">
                    <div className="text-lg font-bold">
                      {(writer.orders / 1000).toFixed(1)}K
                    </div>
                    <div className="text-[10px] text-primary-foreground/70">Orders</div>
                  </div>
                  <div className="rounded-xl border border-white/15 bg-white/5 p-3">
                    <div className="text-lg font-bold">{writer.successRate}%</div>
                    <div className="text-[10px] text-primary-foreground/70">Success</div>
                  </div>
                </div>

                {/* Availability */}
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                  Available Now
                </div>
              </div>
            </div>
          </div>

          {/* Right: Achievement details */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur">
              <Award className="h-3.5 w-3.5 text-accent" />
              Featured Writer
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Meet {writer.name}, Our Star Writer
            </h2>
            <p className="mt-3 max-w-xl text-primary-foreground/80">
              With over {writer.orders.toLocaleString()} completed orders and a {writer.successRate}%
              success rate, {writer.name} is one of Pakistan&apos;s most trusted academic writers.
              Specializing in {writer.specialty.toLowerCase()}, {writer.name} brings {writer.experience} of
              expertise to every project, ensuring exceptional quality and on-time delivery.
            </p>

            {/* Achievement highlights */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { icon: TrendingUp, label: "Top Performer", desc: `${writer.orders.toLocaleString()}+ orders delivered` },
                { icon: Star, label: "Highest Rated", desc: `${writer.rating}/5 average rating` },
                { icon: Award, label: "Expert Verified", desc: `${writer.degree} qualification` },
                { icon: Crown, label: "Award Winner", desc: "Writer of the Month — Sept 2026" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{item.label}</div>
                    <div className="text-xs text-primary-foreground/70">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="mt-6 rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur">
              <Quote className="h-6 w-6 text-accent/60" />
              <p className="mt-2 text-sm italic text-primary-foreground/90">
                &ldquo;Every thesis I work on is a chance to help a student succeed. I treat each project
                as if it were my own — researching deeply, writing carefully, and never compromising on quality.
                That&apos;s what has earned me the trust of thousands of students across Pakistan.&rdquo;
              </p>
              <div className="mt-3 text-xs font-semibold text-accent">
                — {writer.name}, {writer.degree}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={() => openOrder({ preferredWriter: writer.name })}
              >
                Hire {writer.name.split(" ")[0]}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                asChild
              >
                <a href="#testimonials">View Reviews</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
