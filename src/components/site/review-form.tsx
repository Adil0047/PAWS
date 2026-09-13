"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, MessageSquarePlus, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function ReviewForm() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", role: "", rating: 5, message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSuccess(true);
      toast({
        title: "Review submitted!",
        description: "Thank you! Your review will appear once approved by our team.",
      });
      setForm({ name: "", role: "", rating: 5, message: "" });
      setTimeout(() => setSuccess(false), 5000);
    } catch {
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="review-form" className="scroll-mt-24 bg-dots bg-background py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl"
        >
          {/* Header */}
          <div className="relative bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground md:p-8">
            <div className="absolute inset-0 bg-academic-grid opacity-30" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur">
                <MessageSquarePlus className="h-3.5 w-3.5 text-accent" />
                Share Your Experience
              </div>
              <h2 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
                Submit a Review
              </h2>
              <p className="mt-2 max-w-lg text-sm text-primary-foreground/80">
                Were you happy with our service? Share your experience and help other
                students make an informed decision. All reviews are moderated before publishing.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 md:p-8">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-8 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-foreground">Thank You!</h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Your review has been submitted successfully. Our team will review it
                  and publish it within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="r-name" className="text-xs font-semibold">
                      Your Name *
                    </Label>
                    <Input
                      id="r-name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Ahmed Raza"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="r-role" className="text-xs font-semibold">
                      Your Program (optional)
                    </Label>
                    <Input
                      id="r-role"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      placeholder="e.g. MS Computer Science"
                    />
                  </div>
                </div>

                {/* Star rating */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Your Rating *</Label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setForm({ ...form, rating: star })}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-110"
                        aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                      >
                        <Star
                          className={cn(
                            "h-8 w-8 transition-colors",
                            star <= (hoverRating || form.rating)
                              ? "fill-accent text-accent"
                              : "fill-muted text-muted-foreground/30"
                          )}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm font-semibold text-foreground">
                      {form.rating}.0
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="r-message" className="text-xs font-semibold">
                    Your Review *
                  </Label>
                  <Textarea
                    id="r-message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your experience with our service..."
                    className="resize-none"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    {form.message.length}/500 characters · Minimum 20 characters recommended
                  </p>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2"
                  disabled={submitting || form.message.length < 10}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Review
                    </>
                  )}
                </Button>
                <p className="text-center text-[11px] text-muted-foreground">
                  Your email and personal details are never shared. Reviews are moderated
                  to ensure authenticity.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
