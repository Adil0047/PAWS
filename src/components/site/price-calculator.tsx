"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Clock,
  FileStack,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  academicLevels,
  deadlines,
  documentTypes,
} from "@/lib/site-data";
import { useOrder } from "@/lib/order-context";

export function PriceCalculator() {
  const [level, setLevel] = useState(academicLevels[0].value);
  const [docType, setDocType] = useState(documentTypes[0]);
  const [pages, setPages] = useState(5);
  const [deadline, setDeadline] = useState(deadlines[0].value);
  const { openOrder } = useOrder();

  const levelData = academicLevels.find((l) => l.value === level)!;
  const deadlineData = deadlines.find((d) => d.value === deadline)!;

  const price = useMemo(() => {
    const basePerPage = levelData.perPage; // PKR
    const sub = basePerPage * pages;
    return Math.round(sub * deadlineData.multiplier);
  }, [levelData, deadlineData, pages]);

  const words = pages * 250;
  const oldPrice = Math.round(price * 1.25);

  const handleOrder = () => {
    openOrder({
      academicLevel: level,
      documentType: docType,
      pages,
      deadline,
      price,
    });
  };

  return (
    <section id="calculator" className="relative scroll-mt-24 bg-secondary/50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
            <Calculator className="h-3.5 w-3.5" />
            Instant Price Calculator
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Calculate Your Price
          </h2>
          <p className="mt-3 text-muted-foreground">
            Get a transparent, instant quote in seconds. No hidden charges, no surprises —
            just fair, student-friendly pricing.
          </p>
        </div>

        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
          <div className="grid lg:grid-cols-5">
            {/* Form side */}
            <div className="space-y-6 p-6 md:p-8 lg:col-span-3">
              {/* Academic level */}
              <div>
                <Label className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  Academic Level
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {academicLevels.map((l) => (
                    <button
                      key={l.value}
                      type="button"
                      onClick={() => setLevel(l.value)}
                      className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                        level === l.value
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border bg-background hover:border-primary/40 hover:bg-secondary"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Document type */}
              <div>
                <Label className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
                  <FileStack className="h-4 w-4 text-primary" />
                  Document Type
                </Label>
                <Select value={docType} onValueChange={setDocType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent className="max-h-72">
                    {documentTypes.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Pages */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <Label className="flex items-center gap-1.5 text-sm font-semibold">
                    <FileStack className="h-4 w-4 text-primary" />
                    Number of Pages
                  </Label>
                  <span className="rounded-lg bg-primary/10 px-2.5 py-0.5 text-sm font-bold text-primary">
                    {pages} {pages === 1 ? "page" : "pages"}
                  </span>
                </div>
                <Slider
                  value={[pages]}
                  onValueChange={(v) => setPages(v[0])}
                  min={1}
                  max={200}
                  step={1}
                  className="py-2"
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>1 page</span>
                  <span className="font-medium text-foreground/70">≈ {words.toLocaleString()} words</span>
                  <span>200 pages</span>
                </div>
              </div>

              {/* Deadline */}
              <div>
                <Label className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
                  <Clock className="h-4 w-4 text-primary" />
                  Deadline
                </Label>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-3">
                  {deadlines.map((d) => (
                    <button
                      key={d.value}
                      type="button"
                      onClick={() => setDeadline(d.value)}
                      className={`rounded-xl border px-2.5 py-2 text-xs font-medium transition-all ${
                        deadline === d.value
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border bg-background hover:border-primary/40 hover:bg-secondary"
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result side */}
            <div className="relative flex flex-col justify-between bg-gradient-to-br from-primary to-primary/85 p-6 text-primary-foreground md:p-8 lg:col-span-2">
              <div className="absolute inset-0 bg-academic-grid opacity-30" />
              <div className="relative">
                <div className="flex items-center gap-2 text-sm font-medium text-primary-foreground/80">
                  <Sparkles className="h-4 w-4 text-accent" />
                  Your Estimated Price
                </div>
                <motion.div
                  key={price}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold md:text-5xl">
                      {price.toLocaleString()}
                    </span>
                    <span className="text-lg font-semibold text-accent">PKR</span>
                  </div>
                  <div className="mt-1 text-sm text-primary-foreground/70 line-through">
                    {oldPrice.toLocaleString()} PKR
                  </div>
                </motion.div>

                <div className="mt-5 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    {levelData.label} · {docType}
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    {pages} pages · ~{words.toLocaleString()} words
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    Delivery in {deadlineData.label}
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-white/10 p-3 text-xs text-primary-foreground/85">
                  <span className="font-semibold text-accent">Save 25%</span> — includes all premium
                  features free (worth €112.94).
                </div>
              </div>

              <div className="relative mt-6">
                <Button
                  size="lg"
                  className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={handleOrder}
                >
                  Order Now!
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <p className="mt-2 text-center text-[11px] text-primary-foreground/70">
                  Secure payment · 100% confidential · Money-back guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
