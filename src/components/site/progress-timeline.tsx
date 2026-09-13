"use client";

import { motion } from "framer-motion";
import { Rocket, Award, Users, TrendingUp, Globe, CheckCircle2 } from "lucide-react";

type Milestone = {
  year: string;
  title: string;
  description: string;
  icon: typeof Rocket;
  metric?: string;
};

const milestones: Milestone[] = [
  {
    year: "2009",
    title: "Founded in Karachi",
    description: "Thesis Writing Service PK was established with a mission to help Pakistani students achieve academic excellence through professional writing support.",
    icon: Rocket,
    metric: "Started with 5 writers",
  },
  {
    year: "2012",
    title: "Expanded to 10+ Cities",
    description: "Expanded operations beyond Karachi to serve students in Islamabad, Lahore, Faisalabad, and other major cities across Pakistan.",
    icon: Globe,
    metric: "10+ cities served",
  },
  {
    year: "2015",
    title: "100+ Expert Writers",
    description: "Reached a milestone of 100+ verified expert writers with Master's and PhD qualifications across all academic disciplines.",
    icon: Users,
    metric: "100+ writers onboard",
  },
  {
    year: "2018",
    title: "50,000+ Papers Delivered",
    description: "Crossed the 50,000 mark in delivered papers, maintaining a 98%+ success rate and establishing ourselves as Pakistan's leading thesis service.",
    icon: TrendingUp,
    metric: "50K+ papers delivered",
  },
  {
    year: "2021",
    title: "Launched 24/7 Live Support",
    description: "Introduced round-the-clock customer support with live chat, ensuring students can get help anytime, anywhere — even on tight deadlines.",
    icon: Award,
    metric: "24/7 availability",
  },
  {
    year: "2024",
    title: "100K+ Papers & Counting",
    description: "Surpassed 100,000 delivered papers with a 99% success rate, serving over 20,000 satisfied students across Pakistan and beyond.",
    icon: CheckCircle2,
    metric: "100K+ papers milestone",
  },
];

export function ProgressTimeline() {
  return (
    <section className="bg-secondary/40 py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
            <TrendingUp className="h-3.5 w-3.5" />
            Our Journey
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            15+ Years of Academic Excellence
          </h2>
          <p className="mt-3 text-muted-foreground">
            From a small team in Karachi to Pakistan&apos;s #1 thesis writing service — here&apos;s our story.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute bottom-0 left-5 top-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20 md:left-1/2 md:-translate-x-1/2" />

          {milestones.map((milestone, i) => {
            const Icon = milestone.icon;
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative mb-8 flex gap-4 md:gap-0 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Icon node */}
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg ring-4 ring-background md:absolute md:left-1/2 md:-translate-x-1/2">
                  <Icon className="h-5 w-5" />
                </div>

                {/* Content card */}
                <div className={`flex-1 md:w-[calc(50%-2.5rem)] ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md">
                    <div className={`flex items-center gap-2 ${isLeft ? "md:justify-end" : ""}`}>
                      <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-bold text-accent-foreground">
                        {milestone.year}
                      </span>
                      {milestone.metric && (
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium text-primary">
                          {milestone.metric}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 text-base font-bold text-foreground">{milestone.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>

                {/* Spacer for the other side on desktop */}
                <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
              </motion.div>
            );
          })}
        </div>

        {/* Future milestone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mt-8 flex justify-center"
        >
          <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent to-amber-600 text-accent-foreground shadow-lg ring-4 ring-background">
            <Rocket className="h-6 w-6" />
          </div>
        </motion.div>
        <p className="mt-3 text-center text-sm font-semibold text-foreground">
          The journey continues...
        </p>
        <p className="text-center text-xs text-muted-foreground">
          Join 20,000+ students who&apos;ve achieved academic success with us.
        </p>
      </div>
    </section>
  );
}
