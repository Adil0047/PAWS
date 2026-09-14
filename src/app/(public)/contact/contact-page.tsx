"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Mail,
  Phone,
  Wallet,
  Clock,
  Send,
  Loader2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
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
import { useToast } from "@/hooks/use-toast";
import { brand, contactInfo } from "@/lib/site-data";

const paymentMethods = contactInfo.payments.split(" / ");

export function ContactPageClient() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to send message");
      }
      toast({
        title: "Message sent!",
        description: "PAWS will get back to you within 24 hours.",
      });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
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

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-[#0a1f3d] via-[#0e2a52] to-[#0c3b5a] text-white">
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:py-20">
          <Badge
            variant="outline"
            className="mb-4 border-white/20 bg-white/5 text-teal-100"
          >
            Contact {brand.shortName}
          </Badge>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Get in Touch with {brand.shortName}
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-blue-100/85 sm:text-base">
            Reach {brand.shortName} on WhatsApp, email, or by submitting the
            form below. We serve FCPS, MD, MPhil, PhD scholars, and faculty
            across Pakistan — {contactInfo.businessHours} availability,
            confidential handling, and a response within 24 hours.
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
              <a href={`mailto:${contactInfo.email}`}>
                <Mail className="h-4 w-4" />
                {contactInfo.email}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ===================== CONTACT GRID ===================== */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            {/* Left: Contact info cards */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-3">
                  Direct Channels
                </Badge>
                <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
                  Talk to {brand.shortName}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                  Use the channels below for fastest response. Quote requests
                  and Turnitin checks are typically answered within an hour
                  during business hours.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="group border-primary/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Phone className="h-6 w-6" />
                    </div>
                    <CardTitle className="mt-4 text-base">WhatsApp</CardTitle>
                    <CardDescription className="text-sm">
                      Official contact number for inquiries, quotes, and
                      document sharing.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a
                      href={`https://wa.me/${contactInfo.whatsappRaw}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                    >
                      {contactInfo.whatsapp}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </CardContent>
                </Card>

                <Card className="group border-primary/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Mail className="h-6 w-6" />
                    </div>
                    <CardTitle className="mt-4 text-base">Email</CardTitle>
                    <CardDescription className="text-sm">
                      For long briefs, multiple attachments, or formal
                      correspondence.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="inline-flex items-center gap-1.5 break-all text-sm font-semibold text-primary hover:underline"
                    >
                      {contactInfo.email}
                      <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                    </a>
                  </CardContent>
                </Card>

                <Card className="group border-primary/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/15">
                      <Wallet className="h-6 w-6" />
                    </div>
                    <CardTitle className="mt-4 text-base">Payments</CardTitle>
                    <CardDescription className="text-sm">
                      Secure local payment options for advance and final
                      balances.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1.5">
                      {paymentMethods.map((method) => (
                        <Badge key={method} variant="secondary" className="text-[11px]">
                          {method.trim()}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="group border-primary/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/15">
                      <Clock className="h-6 w-6" />
                    </div>
                    <CardTitle className="mt-4 text-base">Availability</CardTitle>
                    <CardDescription className="text-sm">
                      {brand.shortName} operates around the clock to serve
                      researchers across all time zones.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="text-[11px]">
                      {contactInfo.businessHours} availability
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-primary/10 bg-secondary/30">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">
                        Confidential &amp; Non-Disclosure
                      </CardTitle>
                      <CardDescription className="mt-1 text-xs leading-relaxed">
                        Datasets, research findings, draft manuscripts, and
                        client identities are kept strictly confidential.
                        {brand.shortName} maintains a 100% non-repository
                        Turnitin workflow — your files are never indexed.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>

            {/* Right: Contact form */}
            <Card className="border-primary/10 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[oklch(0.45_0.1_200)] text-primary-foreground shadow-md">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Send a Message</CardTitle>
                    <CardDescription className="text-sm">
                      Fields marked * are required. We typically reply within 24
                      hours.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="c-name" className="text-xs font-semibold">
                        Your Name *
                      </Label>
                      <Input
                        id="c-name"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder="e.g. Ahmed Raza"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="c-email" className="text-xs font-semibold">
                        Email *
                      </Label>
                      <Input
                        id="c-email"
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
                      <Label htmlFor="c-phone" className="text-xs font-semibold">
                        Phone / WhatsApp
                      </Label>
                      <Input
                        id="c-phone"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        placeholder="03xx-xxxxxxx"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="c-subject"
                        className="text-xs font-semibold"
                      >
                        Subject *
                      </Label>
                      <Input
                        id="c-subject"
                        required
                        value={form.subject}
                        onChange={(e) =>
                          setForm({ ...form, subject: e.target.value })
                        }
                        placeholder="e.g. Quote for Research Article Write-Up"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="c-message"
                      className="text-xs font-semibold"
                    >
                      Message *
                    </Label>
                    <Textarea
                      id="c-message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder="Share your research topic, objectives, target journal, deadline, and any specific requirements..."
                      className="resize-none"
                    />
                    <p className="text-[11px] text-muted-foreground">
                      {form.message.length} characters · Minimum 20 characters recommended
                    </p>
                  </div>

                  <Separator />

                  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[11px] text-muted-foreground">
                      By submitting you agree to {brand.shortName}&apos;s
                      non-disclosure handling.
                    </p>
                    <Button
                      type="submit"
                      className="gap-2 sm:w-auto"
                      disabled={
                        submitting ||
                        form.message.length < 10 ||
                        !form.name ||
                        !form.email ||
                        !form.subject
                      }
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>

                <div className="mt-5 flex items-start gap-3 rounded-xl border border-primary/10 bg-primary/5 p-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Prefer to talk first? WhatsApp{" "}
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
                    </a>{" "}
                    — we typically reply within an hour.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1f3d] via-[#0e2a52] to-[#0c3b5a] text-white">
        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:py-20">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Start Your Project?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-blue-100/85 sm:text-base">
            Submit a quote request with your topic, objectives, and dataset —
            {brand.shortName} will respond with an itemized price and timeline.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="gap-2 bg-teal-400 text-[#0a1f3d] hover:bg-teal-300 hover:text-[#0a1f3d]">
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
          <p className="mt-6 text-xs text-blue-100/60">
            WhatsApp: {contactInfo.whatsapp} · Email: {contactInfo.email} ·{" "}
            {contactInfo.payments} · {contactInfo.businessHours} availability
          </p>
        </div>
      </section>
    </>
  );
}
