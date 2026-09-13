"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Award,
  Clock,
  CheckCircle2,
  GraduationCap,
  ArrowRight,
  X,
  FileText,
  Users,
  TrendingUp,
  Quote,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { writers, type Writer } from "@/lib/site-data";
import { useOrder } from "@/lib/order-context";
import { cn } from "@/lib/utils";

type WriterReview = {
  student: string;
  rating: number;
  text: string;
  subject: string;
};

// Simulated reviews per writer (in production, these would come from the DB)
const writerReviews: Record<string, WriterReview[]> = {
  "Asad Ali": [
    { student: "Bilal K.", rating: 5, subject: "MBA Thesis", text: "Asad delivered my MBA thesis ahead of schedule with exceptional quality. His research methodology chapter was particularly impressive." },
    { student: "Fatima A.", rating: 5, subject: "Research Paper", text: "Very professional and responsive. The paper was well-structured and plagiarism-free. Highly recommended!" },
    { student: "Usman R.", rating: 4, subject: "Assignment", text: "Good work overall. Minor revisions needed but delivered on time with proper formatting." },
  ],
  "Junaid Mir": [
    { student: "Ayesha S.", rating: 5, subject: "PhD Dissertation", text: "Dr. Junaid's expertise in research methodology was invaluable. My dissertation defense went smoothly thanks to his guidance." },
    { student: "Hassan M.", rating: 5, subject: "Research Proposal", text: "Outstanding proposal that got approved on the first submission. His PhD-level insights made all the difference." },
    { student: "Zainab F.", rating: 5, subject: "Literature Review", text: "Comprehensive and well-synthesized literature review. Exceeded my expectations in every way." },
  ],
  "Kinza Aziz": [
    { student: "Mariam J.", rating: 5, subject: "Master's Thesis", text: "Kinza's attention to detail is remarkable. She caught formatting issues I would have missed and the content was top-notch." },
    { student: "Ali H.", rating: 5, subject: "Research Paper", text: "Fast turnaround without compromising quality. The paper was accepted for publication with minimal revisions." },
    { student: "Sana Q.", rating: 4, subject: "Coursework", text: "Solid work with good research. Would definitely hire again for future projects." },
  ],
  "Aizal Khan": [
    { student: "Hamza T.", rating: 5, subject: "PhD Thesis", text: "Dr. Aizal's deep understanding of research methodology was evident throughout. Exceptional quality and originality." },
    { student: "Nosheen B.", rating: 5, subject: "Dissertation", text: "Brilliant work! The analysis chapter was particularly strong. My supervisor was very impressed." },
    { student: "Kamran A.", rating: 4, subject: "Thesis", text: "High-quality thesis with thorough research. Minor delays but worth the wait for the quality." },
  ],
};

const statusConfig: Record<string, { label: string; color: string }> = {
  available: { label: "Available Now", color: "text-green-600" },
  busy: { label: "Currently Busy", color: "text-amber-600" },
  offline: { label: "Offline", color: "text-muted-foreground" },
};

export function WriterDetailDialog() {
  const [selectedWriter, setSelectedWriter] = useState<Writer | null>(null);
  const { openOrder } = useOrder();

  const openWriterDetail = (writer: Writer) => {
    setSelectedWriter(writer);
  };

  const reviews = selectedWriter ? writerReviews[selectedWriter.name] || [] : [];

  return (
    <>
      {/* Invisible trigger — writers section calls openWriterDetail directly */}
      <Dialog open={!!selectedWriter} onOpenChange={(o) => !o && setSelectedWriter(null)}>
        <DialogContent className="max-h-[92vh] overflow-hidden p-0 sm:max-w-[640px]">
          <DialogTitle className="sr-only">Writer Profile</DialogTitle>
          <DialogDescription className="sr-only">
            Detailed profile for {selectedWriter?.name}
          </DialogDescription>

          {selectedWriter && (
            <div className="max-h-[92vh] overflow-y-auto custom-scroll">
              {/* Header with gradient */}
              <div className={cn("relative overflow-hidden bg-gradient-to-br p-6 text-white", selectedWriter.accent)}>
                <div className="absolute inset-0 bg-academic-grid opacity-30" />
                <button
                  onClick={() => setSelectedWriter(null)}
                  className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/30"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="relative flex items-center gap-4">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white/30 bg-white/20 text-3xl font-bold backdrop-blur">
                      {selectedWriter.initials}
                    </div>
                    <div className={cn(
                      "absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white",
                      selectedWriter.status === "available" ? "bg-green-400" : selectedWriter.status === "busy" ? "bg-amber-400" : "bg-gray-400"
                    )} />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-xl font-bold">{selectedWriter.name}</h2>
                    <div className="mt-0.5 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      <span className="text-sm">{selectedWriter.degree}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <Star className="h-4 w-4 fill-white" />
                      <span className="text-sm font-bold">{selectedWriter.rating}</span>
                      <span className="text-xs text-white/70">({selectedWriter.reviews.toLocaleString()} reviews)</span>
                    </div>
                    <div className={cn("mt-1 text-xs font-medium", statusConfig[selectedWriter.status]?.color === "text-green-600" ? "text-green-200" : statusConfig[selectedWriter.status]?.color === "text-amber-600" ? "text-amber-200" : "text-white/60")}>
                      {statusConfig[selectedWriter.status]?.label}
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="space-y-5 p-6">
                {/* Specialty */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Specialty</h3>
                  <p className="mt-1 text-sm text-foreground">{selectedWriter.specialty}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{selectedWriter.experience} of experience</p>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-border bg-card p-3 text-center">
                    <FileText className="mx-auto h-5 w-5 text-primary" />
                    <div className="mt-1 text-lg font-bold text-foreground">{selectedWriter.orders.toLocaleString()}</div>
                    <div className="text-[10px] text-muted-foreground">Orders</div>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-3 text-center">
                    <Star className="mx-auto h-5 w-5 text-amber-500" />
                    <div className="mt-1 text-lg font-bold text-foreground">{selectedWriter.rating}</div>
                    <div className="text-[10px] text-muted-foreground">Rating</div>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-3 text-center">
                    <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                    <div className="mt-1 text-lg font-bold text-foreground">{selectedWriter.successRate}%</div>
                    <div className="text-[10px] text-muted-foreground">Success</div>
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Achievements</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="gap-1 bg-primary/10 text-primary">
                      <Award className="h-3 w-3" /> Top Performer
                    </Badge>
                    <Badge className="gap-1 bg-amber-100 text-amber-700">
                      <TrendingUp className="h-3 w-3" /> {selectedWriter.orders.toLocaleString()}+ Orders
                    </Badge>
                    <Badge className="gap-1 bg-green-100 text-green-700">
                      <CheckCircle2 className="h-3 w-3" /> {selectedWriter.successRate}% Success
                    </Badge>
                    <Badge className="gap-1 bg-violet-100 text-violet-700">
                      <GraduationCap className="h-3 w-3" /> {selectedWriter.degree}
                    </Badge>
                  </div>
                </div>

                {/* Reviews */}
                {reviews.length > 0 && (
                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Student Reviews ({reviews.length})
                    </h3>
                    <div className="space-y-2">
                      {reviews.map((review, i) => (
                        <div key={i} className="rounded-lg border border-border bg-secondary/30 p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-foreground">{review.student}</span>
                              <Badge variant="secondary" className="text-[10px]">{review.subject}</Badge>
                            </div>
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, s) => (
                                <Star
                                  key={s}
                                  className={cn("h-3 w-3", s < review.rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground/30")}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{review.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="sticky bottom-0 -mx-6 -mb-6 border-t border-border bg-card p-4">
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 gap-2"
                      disabled={selectedWriter.status === "offline"}
                      onClick={() => {
                        setSelectedWriter(null);
                        openOrder({ preferredWriter: selectedWriter.name });
                      }}
                    >
                      {selectedWriter.status === "offline" ? "Unavailable" : `Hire ${selectedWriter.name.split(" ")[0]}`}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedWriter(null)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Export the openWriterDetail function via context-like pattern */}
      <WriterDetailTrigger onOpen={openWriterDetail} />
    </>
  );
}

// Hidden component that registers a global function for opening writer details
function WriterDetailTrigger({ onOpen }: { onOpen: (writer: Writer) => void }) {
  useState(() => {
    if (typeof window !== "undefined") {
      (window as unknown as { __openWriterDetail?: (w: Writer) => void }).__openWriterDetail = onOpen;
    }
    return null;
  });
  return null;
}

export function openWriterDetail(writer: Writer) {
  if (typeof window !== "undefined") {
    const fn = (window as unknown as { __openWriterDetail?: (w: Writer) => void }).__openWriterDetail;
    if (fn) fn(writer);
  }
}
