"use client";

import { motion } from "framer-motion";
import { Star, ArrowRight, BadgeCheck, Sparkles, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { premiumFeatures, writers } from "@/lib/site-data";
import { useOrder } from "@/lib/order-context";
import { openWriterDetail } from "@/components/site/writer-detail-dialog";

export function PremiumWritersSection() {
  const { openOrder } = useOrder();
  const totalValue = premiumFeatures.reduce((sum, f) => sum + parseFloat(f.price.replace("€", "")), 0);

  return (
    <>
      {/* Premium Features */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent-foreground">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Premium Features Included
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Premium Features Included in Every Package
            </h2>
            <p className="mt-3 text-muted-foreground">
              Buy top-notch online writing services and enjoy all these perks — absolutely free.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {premiumFeatures.map((feature, i) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{feature.name}</div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="text-muted-foreground line-through">{feature.price}</span>
                      <span className="rounded-full bg-accent/15 px-2 py-0.5 font-bold text-accent-foreground">
                        FREE
                      </span>
                    </div>
                  </div>
                </div>
                <BadgeCheck className="h-5 w-5 text-accent" />
              </motion.div>
            ))}
          </div>

          {/* Total banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground shadow-lg sm:flex-row"
          >
            <div>
              <div className="text-sm font-medium text-primary-foreground/80">Total Premium Value</div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold line-through opacity-60">€{totalValue.toFixed(2)}</span>
                <span className="rounded-full bg-accent px-3 py-1 text-lg font-bold text-accent-foreground">
                  FREE
                </span>
              </div>
            </div>
            <Button
              size="lg"
              className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => openOrder()}
            >
              Claim Your Free Features
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Writers */}
      <section className="bg-secondary/40 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
              <BadgeCheck className="h-3.5 w-3.5" />
              Meet Our Experts
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Meet Our Best Thesis Writers Online
            </h2>
            <p className="mt-3 text-muted-foreground">
              Handpicked for their expertise and commitment to excellence. Every writer holds a
              Master&apos;s or PhD degree and has a proven track record.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {writers.map((writer, i) => (
              <motion.div
                key={writer.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary to-accent opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative mx-auto h-20 w-20">
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${writer.accent}`} />
                  <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
                    {writer.initials}
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-card bg-accent text-[10px] font-bold text-accent-foreground">
                    <Star className="h-3.5 w-3.5 fill-accent-foreground" />
                  </div>
                  {/* Availability status dot */}
                  <div
                    className={`absolute -left-1 top-1 h-4 w-4 rounded-full border-2 border-card ${
                      writer.status === "available"
                        ? "bg-green-500"
                        : writer.status === "busy"
                        ? "bg-amber-500"
                        : "bg-gray-400"
                    }`}
                    title={writer.status === "available" ? "Available now" : writer.status === "busy" ? "Currently busy" : "Offline"}
                  />
                </div>

                <button
                  onClick={() => openWriterDetail(writer)}
                  className="mt-4 text-lg font-semibold text-foreground transition-colors hover:text-primary"
                >
                  {writer.name}
                </button>
                <div className="mt-0.5 flex items-center justify-center gap-1.5">
                  <span className="text-xs font-medium text-primary">{writer.degree}</span>
                  <span className="text-muted-foreground/40">·</span>
                  <span
                    className={`flex items-center gap-1 text-[10px] font-semibold ${
                      writer.status === "available"
                        ? "text-green-600"
                        : writer.status === "busy"
                        ? "text-amber-600"
                        : "text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        writer.status === "available"
                          ? "bg-green-500 animate-pulse"
                          : writer.status === "busy"
                          ? "bg-amber-500"
                          : "bg-gray-400"
                      }`}
                    />
                    {writer.status === "available" ? "Available" : writer.status === "busy" ? "Busy" : "Offline"}
                  </span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{writer.specialty}</div>

                <div className="mt-4 flex items-center justify-center gap-1 rounded-lg bg-accent/10 py-1.5 text-sm font-bold text-accent-foreground">
                  <Star className="h-4 w-4 fill-accent" />
                  {writer.rating} Rating
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4 text-center">
                  <div>
                    <div className="text-sm font-bold text-foreground">{writer.orders.toLocaleString()}</div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Orders</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{writer.reviews.toLocaleString()}</div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Reviews</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{writer.successRate}%</div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Success</div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1.5 text-xs"
                    onClick={() => openWriterDetail(writer)}
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Profile
                  </Button>
                  <Button
                    size="sm"
                    disabled={writer.status === "offline"}
                    className="flex-1 gap-1.5 text-xs disabled:opacity-50"
                    onClick={() => openOrder({ preferredWriter: writer.name })}
                  >
                    {writer.status === "offline" ? "Unavailable" : "Hire Me"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
