"use client";

import { motion } from "framer-motion";
import { Check, X, TrendingDown, Award, Users } from "lucide-react";
import { cn } from "@/lib/utils";

type Feature = {
  name: string;
  us: boolean | string;
  competitors: boolean | string;
};

const features: Feature[] = [
  { name: "Starting Price (per page)", us: "PKR 750", competitors: "PKR 1,200+" },
  { name: "100% Human-Written", us: true, competitors: false },
  { name: "Free Plagiarism Report", us: true, competitors: false },
  { name: "Free Revisions", us: "Unlimited", competitors: "2 rounds" },
  { name: "On-Time Delivery", us: true, competitors: true },
  { name: "24/7 Customer Support", us: true, competitors: false },
  { name: "PhD-Qualified Writers", us: true, competitors: false },
  { name: "Money-Back Guarantee", us: true, competitors: false },
  { name: "Free Title & Cover Page", us: true, competitors: false },
  { name: "Free Formatting & Referencing", us: true, competitors: "PKR 500+" },
  { name: "Confidential & Secure", us: true, competitors: true },
  { name: "Referral Discounts", us: "10% off", competitors: "None" },
];

function renderValue(value: boolean | string) {
  if (value === true) {
    return (
      <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
        <Check className="h-4 w-4 text-green-600" />
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
        <X className="h-4 w-4 text-red-500" />
      </div>
    );
  }
  return <span className="text-sm font-semibold">{value}</span>;
}

export function PriceComparison() {
  return (
    <section className="bg-dots bg-background py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
            <TrendingDown className="h-3.5 w-3.5" />
            Why Choose Us
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            How We Compare to Other Services
          </h2>
          <p className="mt-3 text-muted-foreground">
            See why thousands of students choose Thesis Writing Service PK over competitors.
            Better features, lower prices, and a genuine commitment to your success.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl"
        >
          {/* Header row */}
          <div className="grid grid-cols-3 border-b border-border bg-secondary/50">
            <div className="p-4 text-sm font-semibold text-muted-foreground">
              Feature
            </div>
            <div className="relative border-l border-border bg-primary/5 p-4 text-center">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-accent" />
              <div className="flex items-center justify-center gap-1.5">
                <Award className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold text-primary">Thesis Writing PK</span>
              </div>
              <span className="mt-0.5 block text-[10px] font-medium text-green-600">
                Recommended
              </span>
            </div>
            <div className="border-l border-border p-4 text-center">
              <div className="flex items-center justify-center gap-1.5">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold text-muted-foreground">Other Services</span>
              </div>
            </div>
          </div>

          {/* Feature rows */}
          {features.map((feature, i) => (
            <div
              key={feature.name}
              className={cn(
                "grid grid-cols-3 border-b border-border last:border-b-0",
                i % 2 === 0 ? "bg-card" : "bg-secondary/20"
              )}
            >
              <div className="p-3 text-sm font-medium text-foreground">
                {feature.name}
              </div>
              <div className="border-l border-border bg-primary/5 p-3 text-center">
                {renderValue(feature.us)}
              </div>
              <div className="border-l border-border p-3 text-center">
                {renderValue(feature.competitors)}
              </div>
            </div>
          ))}

          {/* Footer summary */}
          <div className="grid grid-cols-3 border-t-2 border-primary bg-secondary/30">
            <div className="p-4 text-sm font-semibold text-muted-foreground">
              Overall Value
            </div>
            <div className="border-l border-border bg-primary/10 p-4 text-center">
              <div className="text-lg font-bold text-primary">Excellent</div>
              <div className="text-[10px] text-muted-foreground">€112.94 in free features</div>
            </div>
            <div className="border-l border-border p-4 text-center">
              <div className="text-lg font-bold text-muted-foreground/60">Average</div>
              <div className="text-[10px] text-muted-foreground">Hidden fees apply</div>
            </div>
          </div>
        </motion.div>

        <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
          <Award className="h-3.5 w-3.5 text-primary" />
          Comparison based on publicly available data as of 2026. Prices and features may vary.
        </div>
      </div>
    </section>
  );
}
