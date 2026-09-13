"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Phone,
  Mail,
  Send,
  Loader2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Clock,
  Wallet,
  ShieldCheck,
  FileText,
  ListChecks,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { services, contactInfo, brand } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  phone: string;
  serviceSlug: string;
  deadline: string;
  message: string;
};

const emptyForm: FormState = {
  name: "",
  email: "",
  phone: "",
  serviceSlug: "",
  deadline: "",
  message: "",
};

export function OrderPageClient() {
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ id: string } | null>(null);

  const selectedService = useMemo(
    () => services.find((s) => s.slug === form.serviceSlug) || null,
    [form.serviceSlug]
  );

  const isMernCustom =
    selectedService?.pricingBasis === "custom" ||
    selectedService?.slug === "mern-stack-web-development";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) {
      toast({
        title: "Select a service",
        description: "Please choose a service before submitting your request.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        documentType: selectedService.title,
        deadline: form.deadline.trim() || "To be confirmed",
        message: form.message.trim(),
        // Quote request — pages and academicLevel are placeholders required by
        // the shared /api/orders schema. Final price is determined manually.
        pages: 1,
        academicLevel: "quote-request",
        price: 0,
      };
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to submit request");
      }
      const data = await res.json();
      setSuccess({ id: data.id as string });
      toast({
        title: "Quote request submitted!",
        description: `${brand.shortName} will contact you within 24 hours.`,
      });
    } catch (err) {
      toast({
        title: "Submission failed",
        description:
          err instanceof Error ? err.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setSuccess(null);
  };

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-[#0a1f3d] via-[#0e2a52] to-[#0c3b5a] text-white">
        <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden="true">
          <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-teal-400/20 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:py-20">
          <Badge
            variant="outline"
            className="mb-4 border-white/20 bg-white/5 text-teal-100"
          >
            Request a Quote · {brand.shortName}
          </Badge>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Get a Custom Quote
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-blue-100/85 sm:text-base">
            Select one of the 12 official {brand.shortName} services, share your
            topic and dataset, and we&apos;ll respond within 24 hours with an
            itemized price and timeline. Final quotes are determined manually
            based on scope — no automated price calculations.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button asChild className="gap-2 bg-teal-400 text-[#0a1f3d] hover:bg-teal-300 hover:text-[#0a1f3d]">
              <a
                href={`https://wa.me/${contactInfo.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="h-4 w-4" />
                WhatsApp: {contactInfo.whatsapp}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="gap-2 border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/pricing">View Official Rate Card</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===================== QUOTE FORM ===================== */}
      <section className="bg-background">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:py-16">
          {success ? (
            <Card className="overflow-hidden border-primary/10 shadow-lg">
              <div className="bg-gradient-to-br from-primary to-[oklch(0.45_0.1_200)] p-8 text-primary-foreground">
                <div className="flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                </div>
                <h2 className="mt-4 text-center text-2xl font-bold tracking-tight">
                  Quote Request Received
                </h2>
                <p className="mx-auto mt-2 max-w-md text-center text-sm text-primary-foreground/80">
                  Thank you. {brand.shortName} will review your request and reply
                  within 24 hours via WhatsApp or email with an itemized quote
                  and timeline.
                </p>
              </div>
              <CardContent className="p-6 sm:p-8">
                <div className="space-y-4">
                  <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-secondary/30 p-4 text-center">
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Your Order ID
                    </span>
                    <span className="font-mono text-lg font-bold text-foreground">
                      {success.id}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Save this ID to track your request later.
                    </span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button asChild variant="outline" className="gap-2">
                      <Link href="/track-order">
                        <ArrowRight className="h-4 w-4" />
                        Track This Order
                      </Link>
                    </Button>
                    <Button
                      onClick={resetForm}
                      variant="secondary"
                      className="gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Submit Another Request
                    </Button>
                  </div>

                  <div className="flex flex-col gap-2 rounded-xl border border-primary/10 bg-primary/5 p-4 text-sm">
                    <span className="font-semibold text-foreground">
                      Need an urgent reply?
                    </span>
                    <span className="text-muted-foreground">
                      WhatsApp{" "}
                      <a
                        href={`https://wa.me/${contactInfo.whatsappRaw}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-primary hover:underline"
                      >
                        {contactInfo.whatsapp}
                      </a>{" "}
                      or email{" "}
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="font-semibold text-primary hover:underline"
                      >
                        {contactInfo.email}
                      </a>
                      .
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="overflow-hidden border-primary/10 shadow-lg">
              {/* Service selector header */}
              <CardHeader className="border-b border-border bg-secondary/30">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[oklch(0.45_0.1_200)] text-primary-foreground shadow-md">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      Step 1 · Choose a Service
                    </CardTitle>
                    <CardDescription className="text-sm">
                      All 12 official {brand.shortName} services — select one to
                      see its official rate and turnaround.
                    </CardDescription>
                  </div>
                </div>

                <div className="mt-5 space-y-1.5">
                  <Label
                    htmlFor="service-select"
                    className="text-xs font-semibold"
                  >
                    Service *
                  </Label>
                  <Select
                    value={form.serviceSlug}
                    onValueChange={(value) =>
                      setForm({ ...form, serviceSlug: value })
                    }
                  >
                    <SelectTrigger
                      id="service-select"
                      className="w-full"
                      aria-label="Select a service"
                    >
                      <SelectValue placeholder="Select a service to view pricing..." />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem
                          key={service.slug}
                          value={service.slug}
                          className="py-2"
                        >
                          <span className="flex flex-col items-start">
                            <span className="font-medium">
                              {service.title}
                            </span>
                            <span className="text-[11px] text-muted-foreground">
                              {service.category} · {service.priceLabel}
                            </span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Selected service pricing reference */}
                {selectedService && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-primary/15 bg-card">
                    <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="secondary" className="text-[10px]">
                            {selectedService.category}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="gap-1 text-[10px]"
                          >
                            <Clock className="h-3 w-3" />
                            {selectedService.turnaround}
                          </Badge>
                        </div>
                        <h3 className="mt-2 text-base font-bold text-foreground">
                          {selectedService.title}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {selectedService.shortDescription}
                        </p>
                      </div>
                      <div className="shrink-0 rounded-lg bg-primary/5 px-4 py-3 text-right">
                        <div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                          {isMernCustom ? "Pricing" : "Official Rate"}
                        </div>
                        <div
                          className={cn(
                            "mt-1 text-lg font-bold text-primary",
                            isMernCustom && "text-accent"
                          )}
                        >
                          {selectedService.priceLabel}
                        </div>
                      </div>
                    </div>
                    {selectedService.pricingNote && (
                      <div className="border-t border-border bg-secondary/30 px-4 py-2.5">
                        <p className="text-[11px] leading-relaxed text-muted-foreground">
                          <span className="font-semibold text-foreground">
                            Note:
                          </span>{" "}
                          {selectedService.pricingNote}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardHeader>

              {/* Contact + project form */}
              <CardContent className="p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                    <ListChecks className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-foreground">
                      Step 2 · Your Contact &amp; Project Details
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Fields marked * are required.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="o-name" className="text-xs font-semibold">
                        Your Name *
                      </Label>
                      <Input
                        id="o-name"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder="e.g. Ahmed Raza"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="o-email" className="text-xs font-semibold">
                        Email *
                      </Label>
                      <Input
                        id="o-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="o-phone" className="text-xs font-semibold">
                        Phone / WhatsApp *
                      </Label>
                      <Input
                        id="o-phone"
                        required
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        placeholder="03xx-xxxxxxx"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="o-deadline"
                        className="text-xs font-semibold"
                      >
                        Deadline
                      </Label>
                      <Input
                        id="o-deadline"
                        value={form.deadline}
                        onChange={(e) =>
                          setForm({ ...form, deadline: e.target.value })
                        }
                        placeholder="e.g. 7 days, 2 weeks, by 30 Nov"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="o-message"
                      className="text-xs font-semibold"
                    >
                      Requirements / Message *
                    </Label>
                    <Textarea
                      id="o-message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder="Share your research topic, objectives, target journal (if any), dataset details, word count expectations, and any specific requirements..."
                      className="resize-none"
                    />
                    <p className="text-[11px] text-muted-foreground">
                      {form.message.length} characters · Minimum 20 characters recommended
                    </p>
                  </div>

                  <Separator />

                  {/* Pricing notice */}
                  <div className="flex items-start gap-3 rounded-xl border border-primary/10 bg-primary/5 p-3">
                    <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        Final quote is determined manually.
                      </span>{" "}
                      {isMernCustom
                        ? "MERN Stack Web Development is priced per project — contact PAWS for a custom quote tailored to your requirements."
                        : `The reference rate shown above (${selectedService?.priceLabel ?? "—"}) is the official rate card range. Your final quote depends on scope, word count, and journal requirements.`}
                    </p>
                  </div>

                  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[11px] text-muted-foreground">
                      Payments via{" "}
                      <span className="font-semibold text-foreground">
                        {contactInfo.payments}
                      </span>{" "}
                      · {contactInfo.businessHours} availability
                    </p>
                    <Button
                      type="submit"
                      className="gap-2 sm:w-auto"
                      disabled={
                        submitting ||
                        !form.serviceSlug ||
                        !form.name ||
                        !form.email ||
                        !form.phone ||
                        form.message.length < 5
                      }
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Submit Quote Request
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Payment & contact aside */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Card className="border-primary/10 bg-secondary/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent ring-1 ring-accent/15">
                    <Wallet className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-sm">Payment Methods</CardTitle>
                </div>
                <CardContent className="px-0 pt-3">
                  <div className="flex flex-wrap gap-1.5">
                    {contactInfo.payments
                      .split(" / ")
                      .map((method) => (
                        <Badge key={method} variant="secondary" className="text-[11px]">
                          {method.trim()}
                        </Badge>
                      ))}
                  </div>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    50% advance to confirm; balance on final delivery.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>

            <Card className="border-primary/10 bg-secondary/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                    <Phone className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-sm">WhatsApp</CardTitle>
                </div>
                <CardContent className="px-0 pt-3">
                  <a
                    href={`https://wa.me/${contactInfo.whatsappRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    {contactInfo.whatsapp}
                  </a>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Fastest channel for quick quotes &amp; file sharing.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>

            <Card className="border-primary/10 bg-secondary/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                    <Mail className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-sm">Email</CardTitle>
                </div>
                <CardContent className="px-0 pt-3">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="break-all text-sm font-semibold text-primary hover:underline"
                  >
                    {contactInfo.email}
                  </a>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    For long briefs &amp; formal correspondence.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1f3d] via-[#0e2a52] to-[#0c3b5a] text-white">
        <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden="true">
          <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl" />
          <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:py-20">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Prefer to Talk First?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-blue-100/85 sm:text-base">
            WhatsApp {brand.shortName} directly to discuss your project scope,
            timeline, and pricing before submitting a formal request.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="gap-2 bg-teal-400 text-[#0a1f3d] hover:bg-teal-300 hover:text-[#0a1f3d]">
              <a
                href={`https://wa.me/${contactInfo.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/services">Browse All Services</Link>
            </Button>
          </div>
          <p className="mt-6 text-xs text-blue-100/60">
            WhatsApp: {contactInfo.whatsapp} · Email: {contactInfo.email} ·{" "}
            {contactInfo.businessHours} availability
          </p>
        </div>
      </section>
    </>
  );
}
