"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services, type Service } from "@/lib/site-data";
import { useOrder } from "@/lib/order-context";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  const { openOrder } = useOrder();
  const [recentlyViewedSlugs, setRecentlyViewedSlugs] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("recently_viewed_services") || "[]") as string[];
      if (stored.length > 0) setRecentlyViewedSlugs(stored);
    } catch {}
  }, []);

  const trackServiceView = (slug: string) => {
    try {
      const stored = JSON.parse(localStorage.getItem("recently_viewed_services") || "[]") as string[];
      const updated = [slug, ...stored.filter((s) => s !== slug)].slice(0, 4);
      localStorage.setItem("recently_viewed_services", JSON.stringify(updated));
      setRecentlyViewedSlugs(updated);
    } catch {}
  };

  const recentlyViewedServices = recentlyViewedSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is Service => !!s);

  return (
    <section id="services" className="scroll-mt-24 bg-dots bg-secondary/40 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Our Services
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Offering Professional Support for All Kinds of Assignments &amp; Thesis
          </h2>
          <p className="mt-3 text-muted-foreground">
            From a single essay to a full PhD dissertation — our experts deliver customised,
            well-researched, plagiarism-free work across every academic discipline.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.slug}
              id={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
            >
              <div className="absolute inset-x-0 top-0 h-1 scale-x-0 bg-gradient-to-r from-primary to-accent transition-transform duration-300 group-hover:scale-x-100" />

              <div className="flex items-start justify-between">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary transition-all group-hover:from-primary group-hover:to-primary group-hover:text-primary-foreground">
                  <service.icon className="h-7 w-7" />
                </div>
                <div className="flex h-14 items-center">
                  <span className="font-mono text-3xl font-bold text-primary/10 transition-colors group-hover:text-primary/20">
                    0{i + 1}
                  </span>
                </div>
              </div>

              <h3 className="mt-4 text-lg font-semibold text-foreground">{service.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-4">{service.description}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {service.highlights.map((h) => (
                  <span
                    key={h}
                    className="inline-flex items-center gap-1 rounded-full bg-primary/5 px-2.5 py-1 text-[11px] font-medium text-primary"
                  >
                    <CheckCircle2 className="h-3 w-3" />
                    {h}
                  </span>
                ))}
              </div>

              <div className="mt-5 border-t border-border pt-4">
                <button
                  onClick={() => {
                    trackServiceView(service.slug);
                    openOrder({ documentType: service.title });
                  }}
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-primary/20 bg-primary/5 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  Hire an Expert
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: services.length * 0.05 }}
            className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground shadow-lg"
          >
            <div className="absolute inset-0 bg-academic-grid opacity-30" />
            <div className="relative">
              <h3 className="text-xl font-bold">Don&apos;t see your subject?</h3>
              <p className="mt-2 text-sm text-primary-foreground/80">
                We cover 50+ document types across every academic discipline. Tell us your
                requirements and get a custom quote in minutes.
              </p>
            </div>
            <Button
              variant="secondary"
              className="relative mt-6 w-fit gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => openOrder()}
            >
              Request Custom Quote
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        {/* Recently viewed services */}
        {recentlyViewedServices.length > 0 && (
          <div className="mt-12">
            <div className="mb-4 flex items-center gap-2">
              <Eye className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Recently Viewed Services</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {recentlyViewedServices.map((service) => (
                <button
                  key={service.slug}
                  onClick={() => {
                    trackServiceView(service.slug);
                    openOrder({ documentType: service.title });
                  }}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-card p-3 text-left transition-all hover:border-primary/30 hover:shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <service.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="line-clamp-1 text-xs font-semibold text-foreground transition-colors group-hover:text-primary">
                      {service.title}
                    </h4>
                    <div className="mt-0.5 flex flex-wrap gap-1">
                      {service.highlights.slice(0, 2).map((h) => (
                        <span key={h} className="rounded bg-primary/5 px-1.5 py-0.5 text-[9px] font-medium text-primary">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
