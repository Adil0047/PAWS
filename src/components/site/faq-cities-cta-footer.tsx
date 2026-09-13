"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MapPin, ArrowRight, Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { faqs, cities, contactInfo, footerLinks } from "@/lib/site-data";
import { useOrder } from "@/lib/order-context";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function FaqCitiesCtaFooter() {
  const { openOrder } = useOrder();
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [newsletter, setNewsletter] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });
      if (!res.ok) throw new Error("Failed");
      toast({
        title: "Message sent!",
        description: "Our team will get back to you within 24 hours.",
      });
      setContactForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletter) return;
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletter }),
      });
      if (!res.ok) throw new Error("Failed");
      toast({
        title: "Subscribed!",
        description: "You'll receive academic tips and exclusive offers.",
      });
      setNewsletter("");
    } catch {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
                <HelpCircle className="h-3.5 w-3.5" />
                FAQ
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-muted-foreground">
                Got more questions? We&apos;ve answered the most common ones below. Still unsure?
                Our 24/7 support team is just a message away.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button className="gap-2" onClick={() => openOrder()}>
                  Place an Order
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" asChild>
                  <a href="#contact">Contact Support</a>
                </Button>
              </div>

              {/* Cities served */}
              <div className="mt-10">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Serving Students Across Pakistan
                </h3>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {cities.map((city) => (
                    <a
                      key={city.slug}
                      id={`city-${city.slug}`}
                      href="#contact"
                      className="group flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm transition-colors hover:border-primary/40 hover:bg-secondary"
                    >
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      <span className="font-medium text-foreground">{city.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
              >
                <Accordion type="single" collapsible className="space-y-3">
                  {faqs.map((faq, i) => (
                    <AccordionItem
                      key={i}
                      value={`item-${i}`}
                      className="overflow-hidden rounded-xl border border-border bg-card px-4 shadow-sm"
                    >
                      <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline md:text-base">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section id="order" className="scroll-mt-24 bg-gradient-to-r from-primary via-primary to-primary/80 py-14 text-primary-foreground">
        <div className="absolute inset-0 bg-academic-grid opacity-30" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">
              Top Thesis Help Provider for Students Across Pakistan
            </h2>
            <p className="mt-2 text-primary-foreground/80">
              Reach out to us to ensure academic success without any hassle. Place your order now
              and join 20,000+ satisfied students.
            </p>
          </div>
          <Button
            size="lg"
            className="shrink-0 gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={() => openOrder()}
          >
            Place Your Order Now!
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-24 bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
                <Mail className="h-3.5 w-3.5" />
                Get In Touch
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Have a Question? We&apos;re Here to Help
              </h2>
              <p className="mt-3 text-muted-foreground">
                Whether you need a custom quote, have a question about your order, or want to
                discuss your requirements — our team is available 24/7.
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href={`tel:${contactInfo.phoneRaw}`}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Call Us
                    </div>
                    <div className="text-sm font-semibold text-foreground">{contactInfo.phone}</div>
                  </div>
                </a>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent-foreground">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Email Us
                    </div>
                    <div className="text-sm font-semibold text-foreground">{contactInfo.email}</div>
                  </div>
                </a>
              </div>
            </div>

            <form
              onSubmit={handleContact}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
            >
              <h3 className="text-lg font-semibold text-foreground">Send Us a Message</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill out the form and we&apos;ll respond within 24 hours.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs font-semibold">Full Name *</Label>
                  <Input
                    id="name"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-semibold">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs font-semibold">Phone</Label>
                  <Input
                    id="phone"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="+92 3xx xxxxxxx"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="subject" className="text-xs font-semibold">Subject *</Label>
                  <Input
                    id="subject"
                    required
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    placeholder="How can we help?"
                  />
                </div>
              </div>
              <div className="mt-4 space-y-1.5">
                <Label htmlFor="message" className="text-xs font-semibold">Message *</Label>
                <Textarea
                  id="message"
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Tell us about your requirements..."
                />
              </div>
              <Button type="submit" className="mt-5 w-full gap-2" disabled={submitting}>
                {submitting ? "Sending..." : "Send Message"}
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/60">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand + newsletter */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-md">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="leading-tight">
                  <div className="text-base font-bold text-foreground">
                    Thesis Writing<span className="text-primary"> PK</span>
                  </div>
                  <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    Academic Excellence Since 2009
                  </div>
                </div>
              </div>
              <p className="mt-4 max-w-sm text-sm text-muted-foreground">
                Thesis Writing Service PK is renowned for providing quality, grade-winning theses
                for Pakistani students. We deliver on time and follow all university guidelines.
              </p>
              <form onSubmit={handleNewsletter} className="mt-5 flex gap-2">
                <Input
                  type="email"
                  required
                  value={newsletter}
                  onChange={(e) => setNewsletter(e.target.value)}
                  placeholder="Your email for academic tips"
                  className="bg-background"
                />
                <Button type="submit" size="sm" className="shrink-0 gap-1.5">
                  <Send className="h-3.5 w-3.5" />
                  Subscribe
                </Button>
              </form>
              <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <a href={`tel:${contactInfo.phoneRaw}`} className="flex items-center gap-1.5 hover:text-primary">
                  <Phone className="h-3.5 w-3.5" /> {contactInfo.phone}
                </a>
                <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-1.5 hover:text-primary">
                  <Mail className="h-3.5 w-3.5" /> {contactInfo.email}
                </a>
              </div>
            </div>

            {/* Useful links */}
            <div>
              <h3 className="text-sm font-semibold text-foreground">Useful Links</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {footerLinks.useful.slice(0, 6).map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-muted-foreground transition-colors hover:text-primary">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-sm font-semibold text-foreground">Our Services</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {footerLinks.services.slice(0, 6).map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-muted-foreground transition-colors hover:text-primary">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cities */}
            <div>
              <h3 className="text-sm font-semibold text-foreground">Cities We Serve</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {footerLinks.cities.slice(0, 7).map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-muted-foreground transition-colors hover:text-primary">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
            <p>© {new Date().getFullYear()} Thesis Writing Service PK. All rights reserved.</p>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="hover:text-primary">Privacy Policy</a>
              <a href="#" className="hover:text-primary">Terms &amp; Conditions</a>
              <a href="#" className="hover:text-primary">Refund Policy</a>
              <a href="#" className="hover:text-primary">Revision Policy</a>
              <a
                href="#admin"
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new KeyboardEvent("keydown", { key: "A", ctrlKey: true, shiftKey: true }));
                }}
                className="text-muted-foreground/40 transition-colors hover:text-primary"
                title="Admin Dashboard (Ctrl+Shift+A)"
              >
                Admin
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
