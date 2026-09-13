"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Star,
  Send,
  MessageSquarePlus,
  CheckCircle2,
  Loader2,
  Quote,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
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
import { cn } from "@/lib/utils";

type Review = {
  id: string;
  name: string;
  rating: number;
  role: string | null;
  message: string;
  approved: boolean;
  createdAt: string;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-PK", {
    month: "short",
    year: "numeric",
  });

function StarRow({
  value,
  size = "h-4 w-4",
}: {
  value: number;
  size?: string;
}) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={cn(
            size,
            s <= value
              ? "fill-accent text-accent"
              : "fill-muted text-muted-foreground/30"
          )}
        />
      ))}
    </div>
  );
}

export function ReviewsPageClient() {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [reviewsError, setReviewsError] = useState("");

  const [form, setForm] = useState({
    name: "",
    role: "",
    rating: 5,
    message: "",
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const loadReviews = useCallback(async () => {
    setLoadingReviews(true);
    setReviewsError("");
    try {
      const res = await fetch("/api/reviews?approved=true", {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to load reviews");
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch {
      setReviewsError("Unable to load reviews right now. Please try again later.");
    } finally {
      setLoadingReviews(false);
    }
  }, []);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          role: form.role.trim() || null,
          rating: form.rating,
          message: form.message.trim(),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to submit review");
      }
      setSuccess(true);
      toast({
        title: "Review submitted!",
        description:
          "Thank you! Your review will appear once approved by our team.",
      });
      setForm({ name: "", role: "", rating: 5, message: "" });
      setTimeout(() => setSuccess(false), 6000);
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

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-[#0a1f3d] via-[#0e2a52] to-[#0c3b5a] text-white">
        <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden="true">
          <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-teal-400/20 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:py-20">
          <Badge
            variant="outline"
            className="mb-4 border-white/20 bg-white/5 text-teal-100"
          >
            Reviews · {brand.shortName}
          </Badge>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Client Reviews
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-blue-100/85 sm:text-base">
            Read verified feedback from {brand.shortName} clients across
            Pakistan — FCPS trainees, MPhil/PhD scholars, and university
            faculty. All reviews are moderated before publishing to ensure
            authenticity.
          </p>
          {reviews.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2">
                <StarRow value={Math.round(avgRating)} size="h-5 w-5" />
                <span className="text-lg font-bold text-white">
                  {avgRating.toFixed(1)}
                </span>
                <span className="text-xs text-blue-100/70">
                  from {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===================== REVIEWS LIST ===================== */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Badge variant="secondary" className="mb-3">
                Verified Client Feedback
              </Badge>
              <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
                What Clients Say About {brand.shortName}
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
                Only approved reviews appear below. Submit your own review using
                the form on the right.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
            {/* Reviews list */}
            <div>
              {loadingReviews && (
                <div className="flex flex-col items-center py-12">
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                  <p className="mt-3 text-sm text-muted-foreground">
                    Loading reviews...
                  </p>
                </div>
              )}

              {!loadingReviews && reviewsError && (
                <div className="flex flex-col items-center py-12 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                    <AlertCircle className="h-7 w-7" />
                  </div>
                  <p className="mt-3 max-w-sm text-sm text-foreground">
                    {reviewsError}
                  </p>
                </div>
              )}

              {!loadingReviews && !reviewsError && reviews.length === 0 && (
                <Card className="border-dashed border-primary/15 bg-secondary/30">
                  <CardContent className="flex flex-col items-center py-16 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <MessageSquare className="h-8 w-8" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-foreground">
                      No Reviews Yet
                    </h3>
                    <p className="mt-2 max-w-md text-sm text-muted-foreground">
                      {brand.shortName} recently launched its reviews board.
                      Be the first to share your experience — submit your review
                      using the form on the right. All reviews are moderated for
                      authenticity.
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="mt-5 gap-1.5"
                    >
                      <a href="#review-form">
                        <MessageSquarePlus className="h-3.5 w-3.5" />
                        Submit the First Review
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )}

              {!loadingReviews && !reviewsError && reviews.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {reviews.map((review) => (
                    <Card
                      key={review.id}
                      className="relative flex flex-col border-primary/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <Quote className="absolute right-4 top-4 h-8 w-8 text-primary/10" />
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <CardTitle className="text-base">
                              {review.name}
                            </CardTitle>
                            {review.role && (
                              <CardDescription className="text-xs">
                                {review.role}
                              </CardDescription>
                            )}
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <StarRow value={review.rating} />
                          <span className="text-xs font-medium text-foreground">
                            {review.rating}.0
                          </span>
                          <span className="text-xs text-muted-foreground">
                            · {formatDate(review.createdAt)}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="mt-auto">
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          &ldquo;{review.message}&rdquo;
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Review submission form */}
            <Card
              id="review-form"
              className="sticky top-20 scroll-mt-20 overflow-hidden border-primary/10 shadow-lg"
            >
              <div className="bg-gradient-to-br from-primary to-[oklch(0.45_0.1_200)] p-6 text-primary-foreground">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
                  <MessageSquarePlus className="h-3.5 w-3.5 text-accent" />
                  Share Your Experience
                </div>
                <h2 className="mt-3 text-2xl font-bold tracking-tight">
                  Submit a Review
                </h2>
                <p className="mt-2 text-sm text-primary-foreground/80">
                  Were you happy with our service? Share your experience and
                  help other researchers make an informed decision.
                </p>
              </div>

              <CardContent className="p-6">
                {success ? (
                  <div className="flex flex-col items-center py-6 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-foreground">
                      Thank You!
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                      Your review has been submitted. Our team will review it
                      and publish it within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="r-name"
                          className="text-xs font-semibold"
                        >
                          Your Name *
                        </Label>
                        <Input
                          id="r-name"
                          required
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          placeholder="e.g. Ahmed Raza"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="r-role"
                          className="text-xs font-semibold"
                        >
                          Program / Role
                        </Label>
                        <Input
                          id="r-role"
                          value={form.role}
                          onChange={(e) =>
                            setForm({ ...form, role: e.target.value })
                          }
                          placeholder="e.g. FCPS Trainee"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold">
                        Your Rating *
                      </Label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() =>
                              setForm({ ...form, rating: star })
                            }
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
                      <Label
                        htmlFor="r-message"
                        className="text-xs font-semibold"
                      >
                        Your Review *
                      </Label>
                      <Textarea
                        id="r-message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        placeholder="Tell us about your experience with our service..."
                        className="resize-none"
                      />
                      <p className="text-[11px] text-muted-foreground">
                        {form.message.length}/500 characters · Minimum 20
                        characters recommended
                      </p>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-3 rounded-lg border border-primary/10 bg-primary/5 p-3">
                      <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
                      <p className="text-[11px] leading-relaxed text-muted-foreground">
                        Reviews are moderated for authenticity. Your personal
                        details are never shared.
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
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1f3d] via-[#0e2a52] to-[#0c3b5a] text-white">
        <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden="true">
          <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl" />
          <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:py-20">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Work with {brand.shortName}?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-blue-100/85 sm:text-base">
            Submit a quote request for any of the 12 official services and
            experience the {brand.shortName} workflow yourself.
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
              <Link href="/services">
                Browse Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <p className="mt-6 text-xs text-blue-100/60">
            WhatsApp: {contactInfo.whatsapp} · Email: {contactInfo.email} ·{" "}
            {contactInfo.businessHours} availability
          </p>
        </div>
      </section>
    </>
  );
}
