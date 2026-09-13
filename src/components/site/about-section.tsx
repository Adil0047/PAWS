"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Award, Users, BookOpen, Clock, Headphones, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { benefits } from "@/lib/site-data";
import { useOrder } from "@/lib/order-context";
import { CountUp } from "@/components/site/count-up";

export function AboutSection() {
  const { openOrder } = useOrder();

  return (
    <section id="about" className="scroll-mt-24 bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* About intro */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
              <Award className="h-3.5 w-3.5" />
              About Thesis Writing Service PK
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Delivering Exceptional Thesis Writing Help Online to Pakistani Students
            </h2>
            <p className="mt-4 text-muted-foreground">
              Thesis Writing Service Pakistan has garnered a reputation for delivering exceptional
              content for all levels of academic tasks. Handle your most challenging task, and our
              talented writers will provide the best-customised solutions, ensuring high-quality
              standards for each written piece.
            </p>
            <p className="mt-3 text-muted-foreground">
              We have employed the finest writers who are well aware of the academic landscape and
              have a robust record of delivering exceptional content. By being a reliable helping
              hand, we&apos;ve won the trust of thousands of students throughout Pakistan.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { icon: Users, value: "20,000", suffix: "+", label: "Happy Students" },
                { icon: BookOpen, value: "100", suffix: "K+", label: "Papers Delivered" },
                { icon: Award, value: "99", suffix: "%", label: "Success Rate" },
              ].map((s) => (
                <div key={s.label} className="group rounded-xl border border-border bg-card p-4 text-center transition-all hover:border-primary/30 hover:shadow-md">
                  <s.icon className="mx-auto h-5 w-5 text-primary transition-transform group-hover:scale-110" />
                  <div className="mt-2 text-xl font-bold text-foreground">
                    <CountUp value={s.value} />
                    <span className="text-primary">{s.suffix}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button className="gap-2" onClick={() => openOrder()}>
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" asChild>
                <a href="#services">Explore Services</a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 blur-2xl" />
            <div className="relative grid gap-4 sm:grid-cols-2">
              {[
                { title: "Expert Writers", desc: "Highly qualified professionals with Master's & PhD degrees.", color: "from-emerald-500 to-teal-600", icon: Users },
                { title: "Plagiarism-Free", desc: "Every paper is original and checked with premium tools.", color: "from-amber-500 to-orange-600", icon: CheckCircle2 },
                { title: "On-Time Delivery", desc: "We never let you miss a deadline, no matter the urgency.", color: "from-rose-500 to-pink-600", icon: Clock },
                { title: "24/7 Support", desc: "Round-the-clock assistance whenever you need it.", color: "from-violet-500 to-purple-600", icon: Headphones },
              ].map((card, i) => (
                <div
                  key={card.title}
                  className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${
                    i % 2 === 1 ? "sm:translate-y-6" : ""
                  }`}
                >
                  <div className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r transition-transform duration-300 group-hover:scale-x-100 ${card.color}`} />
                  <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} text-white shadow-sm`}>
                    <card.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{card.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{card.desc}</p>
                  <Sparkles className="absolute right-3 top-3 h-3.5 w-3.5 text-muted-foreground/30 transition-colors group-hover:text-accent" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Benefits grid */}
        <div className="mt-20">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Why Choose Us
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Get Maximum Benefits with Pakistan&apos;s Leading Thesis Writing Services
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />
                <div className="relative">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
