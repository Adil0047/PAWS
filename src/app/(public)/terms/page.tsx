import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  ScrollText,
  GraduationCap,
  Upload,
  Wallet,
  RefreshCw,
  Copyright,
  Ban,
  AlertTriangle,
  Lock,
  RefreshCcwDot,
  Mail,
  MessageSquare,
  Clock,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { brand, contactInfo } from "@/lib/site-data";

export const metadata: Metadata = {
  title: `Terms & Conditions | ${brand.shortName} — ${brand.fullName}`,
  description: `The terms governing engagement with ${brand.shortName}: scope of services, academic integrity, pricing, revisions (2 free rounds within 14 days), IP transfer, refunds, and limitations of liability.`,
  keywords: [
    `${brand.shortName} terms and conditions`,
    "academic writing terms Pakistan",
    "manuscript revision policy",
    "50% advance payment",
    "non-refundable academic service",
    "research consultation agreement",
    "CPSP FCPS writing terms",
  ],
  openGraph: {
    title: `Terms & Conditions | ${brand.shortName}`,
    description: `The terms governing engagement with ${brand.shortName}: scope, integrity, pricing, revisions, IP, refunds, and liability.`,
    type: "article",
  },
  alternates: { canonical: "/terms" },
};

type Section = {
  icon: LucideIcon;
  number: string;
  title: string;
  intro?: string;
  points?: string[];
  body?: string[];
};

const sections: Section[] = [
  {
    icon: ScrollText,
    number: "1",
    title: "Scope of Services",
    intro: `${brand.shortName} operates as a specialized scientific consultation, medical writing, and technical service platform supporting researchers, clinicians, and scholars across Pakistan.`,
    points: [
      "Services include manuscript writing, plagiarism reduction, journal formatting, statistical analysis (SPSS, R, Python, SmartPLS, AMOS), and MERN-stack web development.",
      "All deliverables are provided strictly for research support, consultation, model reference, or formatting compliance.",
      "Engagements are commissioned on a per-project basis with documented scope, timeline, and pricing agreed before work begins.",
      "PAWS does not engage in ghostwriting for examinations, fraudulent coursework, or any activity intended to deceive an evaluating institution.",
    ],
  },
  {
    icon: GraduationCap,
    number: "2",
    title: "Academic Integrity & Fair Use Policy",
    intro:
      "All PAWS deliverables are intended as study aids, model references, or formatting templates that the client adapts in accordance with their institution's academic integrity policies.",
    points: [
      "Clients are solely responsible for institutional compliance, including their university's plagiarism, authorship, and submission policies.",
      "Manuscripts, datasets, and analyses are delivered to support the client's own research and learning process.",
      "PAWS expects clients to disclose and attribute any third-party assistance as required by their institution or journal.",
      "Misrepresentation of PAWS work as the client's sole original output for graded assessment, examinations, or fraudulent submissions is outside the permitted use of deliverables.",
    ],
  },
  {
    icon: Upload,
    number: "3",
    title: "Client Obligations & Data Submission",
    intro:
      "To deliver accurate, publication-grade work, PAWS depends on the timely and complete submission of materials from the client.",
    points: [
      "Provide a clear research topic, study objectives, dataset, supervisor or journal instructions, and any required reference materials.",
      "Ensure that any dataset shared with PAWS is lawfully obtained and that the client is authorised to use it.",
      "Respond to clarifying questions within the agreed timeline; delays in client responses may extend the delivery date.",
      "Notify PAWS immediately of any change in scope, deadline, or institutional requirement.",
      "Refrain from requesting services that violate academic integrity, applicable law, or third-party rights.",
    ],
  },
  {
    icon: Wallet,
    number: "4",
    title: "Quotations, Pricing & Payment Terms",
    intro:
      "Pricing follows the official PAWS rate card published on the Pricing page. Every engagement is confirmed in writing before work begins.",
    points: [
      "A 50% advance payment is required to confirm a project and reserve a writer/analyst slot.",
      "The remaining 50% balance is due before final delivery of editable files, scripts, and high-resolution figures.",
      "Accepted payment methods: Bank Transfer, Raast, JazzCash, and EasyPaisa.",
      "Custom quotes for MERN-stack web development and other project-based work are determined after scope review.",
      "Prices are quoted in Pakistani Rupees (PKR) and are valid for the engagement specified in the quotation.",
    ],
  },
  {
    icon: RefreshCw,
    number: "5",
    title: "Delivery & Revision Policy",
    intro:
      "PAWS follows a transparent, milestone-based delivery process with a structured revision window to incorporate supervisor or reviewer feedback.",
    points: [
      "Clients receive a watermarked draft, APA-formatted tables, and a non-repository Turnitin report for preliminary review before final delivery.",
      "Final editable deliverables (Word, Excel, code scripts, high-resolution figures) are released after the balance payment is cleared.",
      "PAWS provides 2 complimentary revision rounds within 14 days of draft delivery to address supervisor suggestions or reviewer comments.",
      "Revisions requested after the 14-day window or beyond the originally agreed scope may be quoted as a new engagement.",
      "Turnaround timelines are quoted per service and begin after the advance payment and required source materials are received.",
    ],
  },
  {
    icon: Copyright,
    number: "6",
    title: "Intellectual Property & Rights Transfer",
    intro:
      "Ownership of PAWS deliverables follows a milestone-based transfer that protects both the client and the writing team during the engagement.",
    points: [
      "Draft deliverables shared during the engagement remain the property of PAWS until full payment is received.",
      "Upon full payment, the client retains 100% ownership of the final, approved deliverable.",
      "PAWS does not store, republish, or share the client's manuscript, dataset, or final deliverable with any third party.",
      "The client is responsible for ensuring that all sources, data, and references included in the deliverable comply with copyright and citation requirements.",
      "PAWS may use generic, anonymised methodologies or formatting templates in future engagements, but never the client's specific content.",
    ],
  },
  {
    icon: Ban,
    number: "7",
    title: "Cancellation & Refund Policy",
    intro:
      "Because every PAWS engagement involves dedicated expert time allocated to the client, cancellations and refunds follow a structured policy.",
    points: [
      "A project may be cancelled before work has commenced, in which case the advance payment is refunded less any administrative costs already incurred.",
      "Once a writer or analyst has begun work, the advance payment is non-refundable as it compensates committed effort and slot reservation.",
      "Completed services are non-refundable once approved and delivered to the client.",
      "If PAWS is unable to deliver the agreed scope due to internal reasons, a full refund of any payment made will be issued.",
      "Refunds, where applicable, are processed through the original payment channel within 7–10 business days.",
    ],
  },
  {
    icon: AlertTriangle,
    number: "8",
    title: "Limitation of Liability & Service Disclaimer",
    intro:
      "PAWS is committed to delivering publication-grade, methodologically rigorous work. However, academic outcomes depend on many factors outside our control.",
    points: [
      "PAWS makes no guarantees regarding grades, publication acceptances, grant approvals, or any specific academic or funding outcome.",
      "Editorial decisions, peer-review outcomes, and institutional evaluations are beyond PAWS's influence or liability.",
      "The client is responsible for reviewing and approving all deliverables before submission.",
      "PAWS's total liability for any engagement is limited to the amount actually paid by the client for that specific service.",
      "PAWS is not liable for indirect, incidental, or consequential damages arising from the use of deliverables.",
    ],
  },
  {
    icon: Lock,
    number: "9",
    title: "Confidentiality & Non-Disclosure",
    intro:
      "Protecting the privacy and intellectual property of clients is a core PAWS commitment and applies throughout and beyond each engagement.",
    points: [
      "All client information, datasets, draft manuscripts, and institutional details are kept strictly confidential.",
      "PAWS does not submit client documents to the Turnitin repository or any public similarity database.",
      "Access to client materials is restricted to the PAWS team members directly handling the engagement.",
      "Confidentiality obligations survive the completion and delivery of services.",
    ],
  },
  {
    icon: RefreshCcwDot,
    number: "10",
    title: "Modifications to Terms",
    intro:
      "PAWS reserves the right to update these Terms & Conditions to reflect operational, legal, or regulatory changes.",
    points: [
      "Updated terms will be published on this page with a revised effective date.",
      "For ongoing engagements, the terms in effect at the time of order confirmation continue to apply.",
      "Continued use of PAWS services after any update constitutes acceptance of the revised terms.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-[#0a1f3d] via-[#0e2a52] to-[#0c3b5a] text-white">
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:py-20">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-xs text-blue-100/85"
          >
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-teal-200">Terms &amp; Conditions</span>
          </nav>

          <Badge
            variant="outline"
            className="mb-4 border-white/20 bg-white/5 text-teal-100"
          >
            <ScrollText className="mr-1.5 h-3.5 w-3.5" />
            Terms &amp; Conditions
          </Badge>
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 max-w-3xl text-sm font-medium text-teal-100/90 sm:text-base">
            These terms govern every engagement between {brand.shortName} (
            {brand.fullName}) and our clients. By requesting a quote, placing an
            order, or making a payment, you agree to the terms outlined below.
          </p>
          <p className="mt-4 max-w-3xl text-xs text-blue-100/85 sm:text-sm">
            {brand.shortName} operates as a specialized scientific consultation,
            medical writing, and technical service platform. All deliverables
            are provided strictly for research support, consultation, model
            reference, or formatting compliance.
          </p>
        </div>
      </section>

      {/* ===================== QUICK JUMP ===================== */}
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold uppercase tracking-wider text-muted-foreground">
              Quick jump:
            </span>
            {sections.map((section) => (
              <a
                key={section.number}
                href={`#section-${section.number}`}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
              >
                {section.number}. {section.title}
              </a>
            ))}
            <a
              href="#section-contact"
              className="rounded-full border border-border bg-background px-3 py-1.5 text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
            >
              11. Contact Information
            </a>
          </div>
        </div>
      </section>

      {/* ===================== BODY ===================== */}
      <section className="bg-background">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:py-16">
          <div className="space-y-10">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <article
                  key={section.number}
                  id={`section-${section.number}`}
                  className="scroll-mt-24"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[oklch(0.45_0.1_200)] text-primary-foreground shadow-md">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                      <span className="text-muted-foreground/70">
                        {section.number}.
                      </span>{" "}
                      {section.title}
                    </h2>
                  </div>

                  {section.intro && (
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {section.intro}
                    </p>
                  )}

                  {section.body &&
                    section.body.map((paragraph, idx) => (
                      <p
                        key={idx}
                        className="mt-3 text-sm leading-relaxed text-foreground sm:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}

                  {section.points && (
                    <ul className="mt-5 grid gap-2.5">
                      {section.points.map((point, idx) => (
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
                  )}
                </article>
              );
            })}

            {/* Section 11: Contact Information */}
            <article id="section-contact" className="scroll-mt-24">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[oklch(0.45_0.1_200)] text-primary-foreground shadow-md">
                  <MessageSquare className="h-5 w-5" />
                </span>
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                  <span className="text-muted-foreground/70">11.</span> Contact
                  Information
                </h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                For any questions about these Terms &amp; Conditions, project
                scope, pricing, or to request a quote, contact {brand.shortName}{" "}
                using the official details below. Our team is available{" "}
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
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
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
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
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
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
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

              <Separator className="my-8" />

              {/* Acknowledgement card */}
              <Card className="overflow-hidden border-primary/15">
                <CardContent className="grid gap-6 p-6 sm:grid-cols-[1.5fr_1fr] sm:p-8">
                  <div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-bold">
                        Acknowledgement of Terms
                      </h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      By placing an order, making a payment, or accepting
                      delivery of any PAWS service, the client confirms that they
                      have read, understood, and agreed to be bound by these
                      Terms &amp; Conditions in full.
                    </p>
                    <ul className="mt-4 space-y-2">
                      {[
                        "2 free revision rounds within 14 days of draft delivery",
                        "50% advance payment required to confirm a project",
                        "100% ownership transfers to client upon full payment",
                        "Completed services are non-refundable once approved",
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-foreground"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col justify-center gap-3 rounded-xl bg-secondary/50 p-5">
                    <p className="text-xs text-muted-foreground">
                      Ready to start a project under these terms?
                    </p>
                    <Button asChild className="w-full gap-2">
                      <Link href="/order">
                        <MessageSquare className="h-4 w-4" />
                        Request a Quote
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full gap-2">
                      <Link href="/services">View Services</Link>
                    </Button>
                    <p className="mt-1 text-center text-xs text-muted-foreground">
                      Available {contactInfo.businessHours} · WhatsApp{" "}
                      {contactInfo.whatsapp}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
