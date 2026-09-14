"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { services, type Service } from "@/lib/site-data";
import Link from "next/link";

export function BudgetCalculator() {
  const [selectedSlug, setSelectedSlug] = useState(services[0].slug);
  const selected = services.find((s) => s.slug === selectedSlug) || services[0];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-[#0a1f3d] via-[#0e2a52] to-[#0c3b5a] p-5 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-400/20 text-teal-300">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold">Budget Estimator</h3>
            <p className="text-xs text-blue-100/85">Official PAWS rate card pricing</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-4 p-5">
        {/* Service selector */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Select a Service
          </Label>
          <Select value={selectedSlug} onValueChange={setSelectedSlug}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a service..." />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              {services.map((s) => (
                <SelectItem key={s.slug} value={s.slug}>
                  {s.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price display */}
        <motion.div
          key={selected.slug}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl border border-border bg-secondary/40 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Official Rate
              </div>
              <div className="mt-1 text-2xl font-bold text-primary">
                {selected.priceLabel}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Turnaround
              </div>
              <div className="mt-1 text-sm font-semibold text-foreground">
                {selected.turnaround}
              </div>
            </div>
          </div>

          {selected.pricingNote && (
            <div className="mt-3 flex items-start gap-2 rounded-lg bg-primary/5 p-2.5">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              <p className="text-xs text-muted-foreground">{selected.pricingNote}</p>
            </div>
          )}

          <div className="mt-3 border-t border-border pt-3">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Pricing Basis
            </div>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {selected.pricingBasis === "range" && (
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                  Price Range
                </span>
              )}
              {selected.pricingBasis === "per-file" && (
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                  Per File
                </span>
              )}
              {selected.pricingBasis === "per-word" && (
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                  Per Word / Per Paper
                </span>
              )}
              {selected.pricingBasis === "custom" && (
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-medium text-amber-700">
                  Custom Quote
                </span>
              )}
              <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                {selected.category}
              </span>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <Button asChild className="w-full gap-2">
          <Link href="/order">
            Request a Quote for This Service
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          All prices in PKR. Final quote depends on project scope and requirements.
        </p>
      </div>
    </div>
  );
}
