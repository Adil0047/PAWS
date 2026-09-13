"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gift,
  Copy,
  Check,
  Users,
  TrendingUp,
  Share2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type Referral = {
  id: string;
  referrerName: string;
  referrerEmail: string;
  referralCode: string;
  clicks: number;
  signups: number;
  createdAt: string;
};

export function ReferralProgram() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [referral, setReferral] = useState<Referral | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/referrals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setReferral(data.referral);
      toast({
        title: data.existed ? "Welcome back!" : "Referral code generated!",
        description: data.existed
          ? "We found your existing referral code."
          : "Share it with friends to earn rewards.",
      });
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyLink = async () => {
    if (!referral) return;
    const link = `${window.location.origin}/?ref=${referral.referralCode}`;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast({ title: "Link copied!", description: "Share it with your friends." });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Copy failed", description: "Please copy manually.", variant: "destructive" });
    }
  };

  const shareLink = async () => {
    if (!referral) return;
    const link = `${window.location.origin}/?ref=${referral.referralCode}`;
    const text = `Get professional thesis writing help from Thesis Writing Service PK! Use my referral code ${referral.referralCode} for a special discount: ${link}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Thesis Writing Service PK", text, url: link });
      } else {
        await navigator.clipboard.writeText(text);
        toast({ title: "Share text copied!", description: "Paste it anywhere." });
      }
    } catch {
      // user dismissed
    }
  };

  return (
    <section id="referral" className="scroll-mt-24 bg-gradient-to-br from-primary to-primary/80 py-16 text-primary-foreground md:py-20">
      <div className="absolute inset-0 bg-academic-grid opacity-30" />
      <div className="relative mx-auto max-w-4xl px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left: intro */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur">
              <Gift className="h-3.5 w-3.5 text-accent" />
              Referral Program
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Refer Friends & Earn Rewards
            </h2>
            <p className="mt-3 text-primary-foreground/80">
              Share Thesis Writing Service PK with your classmates and friends.
              When they place an order using your referral code, you both get
              special discounts on future orders.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-white/15 bg-white/10 p-3 text-center backdrop-blur">
                <Users className="mx-auto h-5 w-5 text-accent" />
                <div className="mt-2 text-xl font-bold">10%</div>
                <div className="text-[10px] text-primary-foreground/70">Per referral</div>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/10 p-3 text-center backdrop-blur">
                <TrendingUp className="mx-auto h-5 w-5 text-accent" />
                <div className="mt-2 text-xl font-bold">∞</div>
                <div className="text-[10px] text-primary-foreground/70">No limit</div>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/10 p-3 text-center backdrop-blur">
                <Gift className="mx-auto h-5 w-5 text-accent" />
                <div className="mt-2 text-xl font-bold">PKR 500</div>
                <div className="text-[10px] text-primary-foreground/70">Friend discount</div>
              </div>
            </div>
          </div>

          {/* Right: form or referral code */}
          <div>
            <AnimatePresence mode="wait">
              {!referral ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl"
                >
                  <h3 className="text-lg font-bold">Get Your Referral Code</h3>
                  <p className="mt-1 text-sm text-primary-foreground/70">
                    Enter your details to generate a unique referral link.
                  </p>
                  <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="ref-name" className="text-xs font-semibold text-primary-foreground/90">
                        Your Name
                      </Label>
                      <Input
                        id="ref-name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ahmed Raza"
                        className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="ref-email" className="text-xs font-semibold text-primary-foreground/90">
                        Your Email
                      </Label>
                      <Input
                        id="ref-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Gift className="h-4 w-4" />
                          Get My Code
                        </>
                      )}
                    </Button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="code"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl"
                >
                  <h3 className="flex items-center gap-2 text-lg font-bold">
                    <Check className="h-5 w-5 text-green-400" />
                    Your Referral Code
                  </h3>
                  <div className="mt-4 rounded-xl border-2 border-dashed border-accent/50 bg-accent/10 p-4 text-center">
                    <div className="text-xs font-medium uppercase tracking-wide text-primary-foreground/70">
                      Referral Code
                    </div>
                    <div className="mt-1 font-mono text-3xl font-bold text-accent">
                      {referral.referralCode}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-white/15 bg-white/5 p-3 text-center">
                      <div className="text-2xl font-bold">{referral.clicks}</div>
                      <div className="text-[10px] text-primary-foreground/70">Link Clicks</div>
                    </div>
                    <div className="rounded-lg border border-white/15 bg-white/5 p-3 text-center">
                      <div className="text-2xl font-bold">{referral.signups}</div>
                      <div className="text-[10px] text-primary-foreground/70">Signups</div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button
                      onClick={copyLink}
                      className="flex-1 gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied!" : "Copy Link"}
                    </Button>
                    <Button
                      onClick={shareLink}
                      variant="outline"
                      className="gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                    >
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                  </div>
                  <p className="mt-3 text-center text-[11px] text-primary-foreground/60">
                    Earn 10% discount for each friend who places an order with your code.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
