import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Mail,
  MessageSquare,
  Clock,
  ArrowRight,
  Lock,
  UserCheck,
  CreditCard,
  FileLock2,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { brand, contactInfo } from "@/lib/site-data";

export const metadata: Metadata = {
  title: `Privacy Policy | ${brand.shortName} — ${brand.fullName}`,
  description: `How ${brand.shortName} collects, uses, and protects your personal information, institutional data, and billing details. WhatsApp ${contactInfo.whatsapp}. Available ${contactInfo.businessHours}.`,
  keywords: [
    `${brand.shortName} privacy policy`,
    "academic writing privacy Pakistan",
    "manuscript confidentiality",
    "non-repository Turnitin privacy",
    "research data protection",
    "FCPS MD privacy",
    "client confidentiality",
  ],
  openGraph: {
    title: `Privacy Policy | ${brand.shortName}`,
    description: `How ${brand.shortName} protects the privacy, confidentiality, and intellectual property of our clients.`,
    type: "article",
  },
  alternates: { canonical: "/privacy-policy" },
};

const infoTypes: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: UserCheck,
    title: "Contact Details",
    description:
      "Name, email address, WhatsApp/phone number, and any communication preferences you provide when requesting a quote, placing an order, or messaging our team.",
  },
  {
    icon: FileLock2,
    title: "Institutional Information",
    description:
      "University, college, or training-body affiliation (e.g. CPSP, HEC-recognised institution), research topic, dataset, draft manuscripts, supervisor notes, journal targets, citation style, and any reference materials you share for the engagement.",
  },
  {
    icon: CreditCard,
    title: "Billing Information",
    description:
      "Payment method category (Bank Transfer, Raast, JazzCash, EasyPaisa), transaction references, and invoice details. PAWS does not request or store full card numbers, CVVs, or banking passwords.",
  },
];

const dataUsePoints = [
  "Preparing quotations and responding to your enquiry on WhatsApp or email.",
  "Drafting, analysing, formatting, and reviewing the deliverables you commission.",
  "Generating non-repository Turnitin similarity reports where requested.",
  "Communicating about revisions, feedback, and delivery timelines.",
  "Maintaining internal records required for order tracking and quality assurance.",
  "Complying with applicable legal or regulatory obligations within Pakistan.",
];

const protectionPoints = [
  "Access is restricted to the PAWS team members directly handling your engagement.",
  "Manuscripts, datasets, and draft files are stored only for the duration of the engagement and a limited archival window afterwards.",
  "Non-repository Turnitin checks are run through an official instructor account so your file is never indexed in the Turnitin database.",
  "We do not sell, rent, trade, or share your personal or institutional data with third parties for marketing purposes.",
  "Payment information is handled through the official Pakistani payment channels listed on our Pricing page; PAWS never asks for card PINs or one-time passwords.",
];

const noSharePoints = [
  "Publishing your name, institution, or research topic on our website, social media, or marketing collateral.",
  "Sharing your manuscript, dataset, or draft with any party outside the assigned PAWS team.",
  "Submitting your document to the Turnitin repository or any other public similarity database.",
  "Using your data to train external AI services or third-party machine-learning models.",
];

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-[#0a1f3d] via-[#0e2a52] to-[#0c3b5a] text-white">
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:py-20">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-xs text-blue-100/70"
          >
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-teal-200">Privacy Policy</span>
          </nav>

          <Badge
            variant="outline"
            className="mb-4 border-white/20 bg-white/5 text-teal-100"
          >
            <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
            Privacy Policy
          </Badge>
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-3xl text-sm font-medium text-teal-100/90 sm:text-base">
            At PAWS (Pak Academic Writing Services), accessible from our website,
            protecting the privacy, confidentiality, and intellectual property of
            our clients is our highest priority.
          </p>
          <p className="mt-4 max-w-3xl text-xs text-blue-100/70 sm:text-sm">
            This policy explains what information {brand.shortName} collects, how
            it is used, and the safeguards in place to protect your research,
            identity, and payments.
          </p>
        </div>
      </section>

      {/* ===================== BODY ===================== */}
      <section className="bg-background">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:py-16">
          <div className="prose-paws space-y-12">
            {/* Intro */}
            <div>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                This Privacy Policy applies to all visitors and clients of{" "}
                {brand.shortName} ({brand.fullName}). By requesting a quote,
                placing an order, or contacting us through WhatsApp or email, you
                consent to the practices described below. We operate{" "}
                <span className="font-semibold text-foreground">
                  {contactInfo.businessHours}
                </span>{" "}
                and review data-handling practices continuously to keep your
                information secure.
              </p>
            </div>

            {/* Section 1: Information We Collect */}
            <article className="scroll-mt-24">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                  <Lock className="h-5 w-5" />
                </span>
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                  1. Information We Collect
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {brand.shortName} collects only the personal information
                reasonably necessary to deliver and support the services you
                request. We group this information into three categories:
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {infoTypes.map((info) => {
                  const Icon = info.icon;
                  return (
                    <Card
                      key={info.title}
                      className="h-full border-primary/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                          <Icon className="h-5 w-5" />
                        </div>
                        <CardTitle className="mt-3 text-base">
                          {info.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                          {info.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Card className="mt-6 border-dashed">
                <CardContent className="pt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    How we use your information
                  </h3>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {dataUsePoints.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm text-foreground"
                      >
                        <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </article>

            {/* Section 2: Data Protection & Security */}
            <article className="scroll-mt-24">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                  2. Data Protection &amp; Security
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {brand.shortName} applies organisational and technical safeguards
                to keep your personal information and research deliverables
                confidential. These safeguards include:
              </p>
              <ul className="mt-5 space-y-3">
                {protectionPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 rounded-lg border border-border bg-card p-3.5"
                  >
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent">
                      ✓
                    </span>
                    <span className="text-sm leading-relaxed text-foreground">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </article>

            {/* Section 3: What We Never Do */}
            <article className="scroll-mt-24">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                  <Lock className="h-5 w-5" />
                </span>
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                  3. What {brand.shortName} Never Does With Your Data
              </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                To reinforce our commitment to confidentiality, the following
                actions are expressly prohibited and will never be performed with
                your information:
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {noSharePoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 rounded-lg border border-destructive/15 bg-destructive/[0.03] p-3.5"
                  >
                    <span className="mt-0.5 text-xs font-bold text-destructive">
                      ✕
                    </span>
                    <span className="text-sm leading-relaxed text-foreground">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </article>

            {/* Section 4: Data Retention */}
            <article className="scroll-mt-24">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                  <Clock className="h-5 w-5" />
                </span>
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                  4. Data Retention
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                We retain your contact details, project communications, and
                deliverables only for as long as needed to complete the engagement,
                process revisions within the 14-day revision window, and maintain
                internal records for quality assurance. After this period, you may
                request deletion of your files and personal information by
                contacting us through the channels below.
              </p>
            </article>

            {/* Section 5: Your Rights */}
            <article className="scroll-mt-24">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                  <UserCheck className="h-5 w-5" />
                </span>
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                  5. Your Rights
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                As a {brand.shortName} client you may, at any time:
              </p>
              <ul className="mt-4 space-y-2.5">
                {[
                  "Request access to or a copy of the personal information we hold about you.",
                  "Ask us to correct inaccurate contact or institutional details.",
                  "Request deletion of your files, datasets, and drafts after the engagement concludes.",
                  "Withdraw consent for future communications at any time.",
                  "Ask questions about how your information is handled.",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-foreground">
                    <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* Section 6: Updates */}
            <article className="scroll-mt-24">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                  <FileLock2 className="h-5 w-5" />
                </span>
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                  6. Updates to This Policy
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {brand.shortName} may update this Privacy Policy from time to time
                to reflect changes in our practices or applicable regulations.
                Updated versions will be published on this page with a revised
                effective date. Continued use of our services after any change
                constitutes acceptance of the revised policy.
              </p>
            </article>

            <Separator />

            {/* Section 7: Contact */}
            <article className="scroll-mt-24" id="contact">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                  <MessageSquare className="h-5 w-5" />
                </span>
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                  7. Contact {brand.shortName}
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                For any privacy questions, data requests, or confidentiality
                concerns, reach {brand.shortName} using the official contact
                details below. Our team is available{" "}
                <span className="font-semibold text-foreground">
                  {contactInfo.businessHours}
                </span>{" "}
                to assist you.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <Card className="border-primary/10">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-accent" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        WhatsApp
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <a
                      href={`https://wa.me/${contactInfo.whatsappRaw}`}
                      className="text-sm font-semibold text-foreground hover:text-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contactInfo.whatsapp}
                    </a>
                  </CardContent>
                </Card>
                <Card className="border-primary/10">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-accent" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Email
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-sm font-semibold text-foreground hover:text-primary break-all"
                    >
                      {contactInfo.email}
                    </a>
                  </CardContent>
                </Card>
                <Card className="border-primary/10">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-accent" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Business Hours
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <span className="text-sm font-semibold text-foreground">
                      {contactInfo.businessHours}
                    </span>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-gradient-to-br from-[#0a1f3d] via-[#0e2a52] to-[#0c3b5a] p-6 text-center text-white sm:flex-row sm:text-left">
                <div>
                  <h3 className="text-lg font-bold">
                    Ready to discuss your project?
                  </h3>
                  <p className="mt-1 text-xs text-blue-100/80 sm:text-sm">
                    Share your research topic on WhatsApp or request a
                    confidential quote through our Order page.
                  </p>
                </div>
                <Button
                  asChild
                  className="gap-2 bg-teal-400 text-[#0a1f3d] hover:bg-teal-300 hover:text-[#0a1f3d]"
                >
                  <Link href="/order">
                    <MessageSquare className="h-4 w-4" />
                    Request a Quote
                  </Link>
                </Button>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
