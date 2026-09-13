"use client";

import { motion } from "framer-motion";
import { Brain, Bot, Check, X, ArrowRight, Clock, Wallet, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/lib/order-context";

const comparisonRows = [
  { feature: "Creativity & Originality", human: "Unlimited", ai: "Limited" },
  { feature: "Emotional Connection", human: "Original", ai: "Automated" },
  { feature: "Adaptability", human: "Tailored to Client Needs", ai: "Algorithm-Based" },
  { feature: "Reliability", human: "Specialized Editing & Checking", ai: "Inaccurate" },
  { feature: "Plagiarism-Free", human: "Guaranteed", ai: "Often Flagged" },
  { feature: "Academic Integrity", human: "Maintained", ai: "Risky" },
];

export function ComparisonSection() {
  const { openOrder } = useOrder();

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Left: comparison table */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
              <Bot className="h-3.5 w-3.5" />
              Human vs AI
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              AI-Generated Content vs Human-Written Content
            </h2>
            <p className="mt-3 text-muted-foreground">
              The following chart shows the benefits of human-written content over AI-generated
              content. We never rely on AI tools — every piece is crafted by expert writers.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="mt-8 overflow-hidden rounded-2xl border border-border shadow-sm"
            >
              <div className="grid grid-cols-3 bg-secondary">
                <div className="p-4 text-sm font-semibold text-muted-foreground">Features</div>
                <div className="flex items-center gap-2 border-l border-border p-4 text-sm font-bold text-primary">
                  <Brain className="h-4 w-4" />
                  Human-Written
                </div>
                <div className="flex items-center gap-2 border-l border-border p-4 text-sm font-bold text-muted-foreground">
                  <Bot className="h-4 w-4" />
                  AI-Generated
                </div>
              </div>
              {comparisonRows.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-card" : "bg-secondary/40"}`}
                >
                  <div className="p-4 text-sm font-medium text-foreground">{row.feature}</div>
                  <div className="flex items-center gap-2 border-l border-border p-4 text-sm text-foreground">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {row.human}
                  </div>
                  <div className="flex items-center gap-2 border-l border-border p-4 text-sm text-muted-foreground">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                      <X className="h-3.5 w-3.5" />
                    </span>
                    {row.ai}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: long-form content cards */}
          <div className="space-y-6">
            {[
              {
                icon: Brain,
                title: "Get Help from the Best Thesis Writers in Pakistan",
                body: "Thesis Writing Services Pakistan is one of the leading companies dedicated to serving students to help them achieve excellence. We employ the best talent in Pakistan — each writer is handpicked for their expertise and commitment. With diverse backgrounds and specialised knowledge, our writers are equipped to tackle any academic challenge.",
              },
              {
                icon: Check,
                title: "Best Custom Thesis Papers that Reflect Your Vision",
                body: "Writing a thesis can be exhausting as it demands expertise and exceptional writing skills. By choosing our services, you won't get trapped in the complexities of your assignment and late delivery. Our expert writers make assignment handling a collaborative process, working closely with you to better understand the requirements.",
              },
              {
                icon: Wallet,
                title: "Thesis Writing Solutions for All Financial Status",
                body: "Every student deserves a smooth academic journey. We've been working toward making academic help accessible with cost-effective services that can be managed even on a tight budget. We are among the top companies in Pakistan providing cheap assignment help so students don't suffer from poor grades.",
              },
              {
                icon: Clock,
                title: "Instant Thesis Writing Help with Timely Delivery",
                body: "With looming deadlines and expectations of timely submission, our speedy writers have an outstanding record of delivering work with the fastest turnaround. They've handled last-minute assignments and can manage any urgent task with prompt assistance. Don't let deadlines hold you back — let us help you succeed!",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex gap-4">
                  <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary transition-all group-hover:from-primary group-hover:to-primary group-hover:text-primary-foreground">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
                  </div>
                </div>
                {i === 3 && (
                  <Button
                    className="mt-4 gap-2"
                    onClick={() => openOrder()}
                  >
                    Order Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
