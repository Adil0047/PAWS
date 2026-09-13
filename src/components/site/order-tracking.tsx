"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  PackageCheck,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  FileText,
  Calendar,
  User,
  AlertCircle,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { OrderHistory } from "@/components/site/order-history";

type TrackedOrder = {
  id: string;
  name: string;
  documentType: string;
  academicLevel: string;
  pages: number;
  deadline: string;
  price: number;
  status: string;
  preferredWriter: string | null;
  createdAt: string;
};

const statusConfig: Record<string, { label: string; icon: typeof Clock; color: string; step: number }> = {
  pending: { label: "Pending", icon: Clock, color: "bg-amber-500", step: 1 },
  "in-progress": { label: "In Progress", icon: Loader2, color: "bg-primary", step: 2 },
  completed: { label: "Completed", icon: CheckCircle2, color: "bg-green-500", step: 3 },
  cancelled: { label: "Cancelled", icon: XCircle, color: "bg-red-500", step: 0 },
};

export function OrderTracking() {
  const [orderId, setOrderId] = useState("");
  const [trackTab, setTrackTab] = useState<"id" | "history">("id");
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    setLoading(true);
    setError("");
    setOrder(null);
    setSearched(true);
    try {
      const res = await fetch(`/api/orders/${orderId.trim()}`);
      if (!res.ok) {
        if (res.status === 404) {
          setError("Order not found. Please check your Order ID and try again.");
        } else {
          setError("Unable to track order right now. Please try again later.");
        }
        return;
      }
      const data = await res.json();
      setOrder(data.order);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("en-PK", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <section id="track-order" className="scroll-mt-24 bg-dots bg-background py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
            <PackageCheck className="h-3.5 w-3.5" />
            Track Your Order
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Check Your Order Status
          </h2>
          <p className="mt-3 text-muted-foreground">
            Track a single order by ID or view your complete order history by email.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="mb-4 flex justify-center gap-2">
          <button
            onClick={() => setTrackTab("id")}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              trackTab === "id"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "border border-border bg-card text-foreground/70 hover:bg-secondary"
            }`}
          >
            <Search className="h-4 w-4" />
            Track by ID
          </button>
          <button
            onClick={() => setTrackTab("history")}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              trackTab === "history"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "border border-border bg-card text-foreground/70 hover:bg-secondary"
            }`}
          >
            <History className="h-4 w-4" />
            Order History
          </button>
        </div>

        {trackTab === "history" ? (
          <OrderHistory />
        ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl"
        >
          {/* Search form */}
          <div className="border-b border-border bg-secondary/30 p-6">
            <form onSubmit={handleTrack} className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter your Order ID (e.g. cmttiszmw...)"
                  className="pl-9 font-mono text-sm"
                  required
                />
              </div>
              <Button type="submit" className="gap-2" disabled={loading || !orderId.trim()}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Tracking...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Track Order
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Results */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center py-8"
                >
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                  <p className="mt-3 text-sm text-muted-foreground">Looking up your order...</p>
                </motion.div>
              )}

              {error && !loading && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center py-8 text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                    <AlertCircle className="h-7 w-7" />
                  </div>
                  <p className="mt-3 max-w-sm text-sm text-foreground">{error}</p>
                </motion.div>
              )}

              {order && !loading && !error && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  {/* Status header */}
                  <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/30 p-4">
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Order Status
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        {(() => {
                          const cfg = statusConfig[order.status] || statusConfig.pending;
                          const Icon = cfg.icon;
                          return (
                            <>
                              <span className={`flex h-7 w-7 items-center justify-center rounded-full ${cfg.color} text-white`}>
                                <Icon className={`h-4 w-4 ${order.status === "in-progress" ? "animate-spin" : ""}`} />
                              </span>
                              <span className="text-lg font-bold capitalize text-foreground">{cfg.label}</span>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                    <Badge variant="secondary" className="font-mono text-xs">
                      #{order.id.slice(-8)}
                    </Badge>
                  </div>

                  {/* Progress steps */}
                  {order.status !== "cancelled" && (
                    <div className="flex items-center justify-between">
                      {[
                        { step: 1, label: "Placed", icon: CheckCircle2 },
                        { step: 2, label: "In Progress", icon: Clock },
                        { step: 3, label: "Completed", icon: PackageCheck },
                      ].map(({ step, label, icon: Icon }) => {
                        const currentStep = statusConfig[order.status]?.step || 0;
                        const isComplete = currentStep >= step;
                        const isCurrent = currentStep === step;
                        return (
                          <div key={step} className="flex flex-1 flex-col items-center">
                            <div className="flex w-full items-center">
                              {step > 1 && (
                                <div className={`h-1 flex-1 ${currentStep >= step ? "bg-primary" : "bg-border"}`} />
                              )}
                              <div
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                                  isComplete
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : isCurrent
                                    ? "border-primary bg-primary/10 text-primary animate-pulse"
                                    : "border-border bg-background text-muted-foreground"
                                }`}
                              >
                                <Icon className="h-5 w-5" />
                              </div>
                              {step < 3 && (
                                <div className={`h-1 flex-1 ${currentStep > step ? "bg-primary" : "bg-border"}`} />
                              )}
                            </div>
                            <span
                              className={`mt-2 text-xs font-medium ${
                                isComplete || isCurrent ? "text-primary" : "text-muted-foreground"
                              }`}
                            >
                              {label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Order details */}
                  <div className="grid grid-cols-2 gap-3 rounded-xl border border-border bg-card p-4 text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Document Type</div>
                        <div className="font-medium text-foreground">{order.documentType}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Academic Level</div>
                        <div className="font-medium capitalize text-foreground">{order.academicLevel}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <PackageCheck className="h-4 w-4 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Pages</div>
                        <div className="font-medium text-foreground">{order.pages} pages</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Deadline</div>
                        <div className="font-medium text-foreground">{order.deadline}</div>
                      </div>
                    </div>
                    {order.preferredWriter && (
                      <div className="col-span-2 flex items-center gap-2 border-t border-border pt-3">
                        <User className="h-4 w-4 text-primary" />
                        <div>
                          <div className="text-xs text-muted-foreground">Preferred Writer</div>
                          <div className="font-medium text-foreground">{order.preferredWriter}</div>
                        </div>
                      </div>
                    )}
                    <div className="col-span-2 flex items-center gap-2 border-t border-border pt-3">
                      <Calendar className="h-4 w-4 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Order Placed</div>
                        <div className="font-medium text-foreground">{formatDate(order.createdAt)}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-primary/5 p-3 text-sm">
                    <span className="text-muted-foreground">Estimated Price</span>
                    <span className="text-lg font-bold text-primary">
                      PKR {order.price.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-center text-xs text-muted-foreground">
                    Questions about your order? Contact us at{" "}
                    <a href="tel:+923365162383" className="font-semibold text-primary">
                      +92 336 5162383
                    </a>
                  </p>
                </motion.div>
              )}

              {!searched && !loading && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center py-8 text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <PackageCheck className="h-7 w-7" />
                  </div>
                  <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                    Enter your Order ID above to track your order status. You can find it in your confirmation email.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        )}
      </div>
    </section>
  );
}
