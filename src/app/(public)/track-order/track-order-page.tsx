"use client";

import { useState } from "react";
import Link from "next/link";
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
  Mail,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { brand, contactInfo } from "@/lib/site-data";
import { cn } from "@/lib/utils";

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

const statusConfig: Record<
  string,
  { label: string; icon: typeof Clock; color: string; step: number }
> = {
  pending: { label: "Pending", icon: Clock, color: "bg-amber-500", step: 1 },
  "in-progress": {
    label: "In Progress",
    icon: Loader2,
    color: "bg-primary",
    step: 2,
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    color: "bg-green-500",
    step: 3,
  },
  cancelled: { label: "Cancelled", icon: XCircle, color: "bg-red-500", step: 0 },
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("en-PK", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status] || statusConfig.pending;
  const Icon = cfg.icon;
  return (
    <Badge variant="secondary" className="gap-1.5">
      <Icon
        className={cn(
          "h-3 w-3",
          status === "in-progress" && "animate-spin"
        )}
      />
      {cfg.label}
    </Badge>
  );
}

function ProgressSteps({ status }: { status: string }) {
  const currentStep = statusConfig[status]?.step || 0;
  const steps = [
    { step: 1, label: "Placed", icon: CheckCircle2 },
    { step: 2, label: "In Progress", icon: Clock },
    { step: 3, label: "Completed", icon: PackageCheck },
  ];
  return (
    <div className="flex items-center justify-between">
      {steps.map(({ step, label, icon: Icon }, idx) => {
        const isComplete = currentStep >= step;
        const isCurrent = currentStep === step;
        return (
          <div
            key={step}
            className="flex flex-1 flex-col items-center"
          >
            <div className="flex w-full items-center">
              {idx > 0 && (
                <div
                  className={cn(
                    "h-1 flex-1",
                    currentStep >= step ? "bg-primary" : "bg-border"
                  )}
                />
              )}
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                  isComplete
                    ? "border-primary bg-primary text-primary-foreground"
                    : isCurrent
                      ? "border-primary bg-primary/10 text-primary animate-pulse"
                      : "border-border bg-background text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={cn(
                    "h-1 flex-1",
                    currentStep > step ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "mt-2 text-xs font-medium",
                isComplete || isCurrent
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function OrderDetailsCard({ order }: { order: TrackedOrder }) {
  const cfg = statusConfig[order.status] || statusConfig.pending;
  const StatusIcon = cfg.icon;
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/30 p-4">
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Order Status
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full text-white",
                cfg.color
              )}
            >
              <StatusIcon
                className={cn(
                  "h-4 w-4",
                  order.status === "in-progress" && "animate-spin"
                )}
              />
            </span>
            <span className="text-lg font-bold capitalize text-foreground">
              {cfg.label}
            </span>
          </div>
        </div>
        <Badge variant="secondary" className="font-mono text-xs">
          #{order.id.slice(-8)}
        </Badge>
      </div>

      {order.status !== "cancelled" && <ProgressSteps status={order.status} />}

      <div className="grid grid-cols-2 gap-3 rounded-xl border border-border bg-card p-4 text-sm">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          <div>
            <div className="text-xs text-muted-foreground">Service</div>
            <div className="font-medium text-foreground">
              {order.documentType}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-primary" />
          <div>
            <div className="text-xs text-muted-foreground">Name</div>
            <div className="font-medium text-foreground">{order.name}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          <div>
            <div className="text-xs text-muted-foreground">Deadline</div>
            <div className="font-medium text-foreground">
              {order.deadline}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          <div>
            <div className="text-xs text-muted-foreground">Order Placed</div>
            <div className="font-medium text-foreground">
              {formatDate(order.createdAt)}
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Questions about your order? WhatsApp{" "}
        <a
          href={`https://wa.me/${contactInfo.whatsappRaw}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary hover:underline"
        >
          {contactInfo.whatsapp}
        </a>
      </p>
    </div>
  );
}

function TrackByIdTab() {
  const [orderId, setOrderId] = useState("");
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
          setError(
            "Order not found. Please check your Order ID and try again."
          );
        } else {
          setError(
            "Unable to track order right now. Please try again later."
          );
        }
        return;
      }
      const data = await res.json();
      setOrder(data.order);
    } catch {
      setError(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden border-primary/10 shadow-lg">
      <div className="border-b border-border bg-secondary/30 p-6">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Search className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Track by Order ID
            </h3>
            <p className="text-xs text-muted-foreground">
              Enter the Order ID from your confirmation.
            </p>
          </div>
        </div>
        <form onSubmit={handleTrack} className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter your Order ID (e.g. cm...)"
              className="pl-9 font-mono text-sm"
              required
            />
          </div>
          <Button
            type="submit"
            className="gap-2"
            disabled={loading || !orderId.trim()}
          >
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

      <CardContent className="p-6">
        {loading && (
          <div className="flex flex-col items-center py-8">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="mt-3 text-sm text-muted-foreground">
              Looking up your order...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertCircle className="h-7 w-7" />
            </div>
            <p className="mt-3 max-w-sm text-sm text-foreground">{error}</p>
          </div>
        )}

        {!loading && !error && order && <OrderDetailsCard order={order} />}

        {!loading && !error && !order && !searched && (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <PackageCheck className="h-7 w-7" />
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Enter your Order ID above to track your order status. You can find
              it in your confirmation message.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function OrderHistoryTab() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<TrackedOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError("");
    setOrders([]);
    setSearched(true);
    try {
      const res = await fetch(
        `/api/orders/by-email?email=${encodeURIComponent(email.trim())}`
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to fetch orders");
      }
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to fetch orders right now. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden border-primary/10 shadow-lg">
      <div className="border-b border-border bg-secondary/30 p-6">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <History className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Order History
            </h3>
            <p className="text-xs text-muted-foreground">
              View all past orders by email address.
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter the email you used to place orders"
              className="pl-9"
              required
            />
          </div>
          <Button
            type="submit"
            className="gap-2"
            disabled={loading || !email.trim()}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Find Orders
              </>
            )}
          </Button>
        </form>
      </div>

      <CardContent className="p-6">
        {loading && (
          <div className="flex flex-col items-center py-8">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="mt-3 text-sm text-muted-foreground">
              Looking up your orders...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertCircle className="h-7 w-7" />
            </div>
            <p className="mt-3 max-w-sm text-sm text-foreground">{error}</p>
          </div>
        )}

        {!loading && !error && searched && orders.length === 0 && (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-muted-foreground">
              <PackageCheck className="h-7 w-7" />
            </div>
            <p className="mt-3 text-sm font-medium text-foreground">
              No orders found
            </p>
            <p className="mt-1 max-w-sm text-xs text-muted-foreground">
              We couldn&apos;t find any orders for this email. Check the address
              or place a new order.
            </p>
            <Button asChild variant="outline" size="sm" className="mt-4 gap-1.5">
              <Link href="/order">
                Place a new order
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-primary/5 p-3">
              <span className="text-xs text-muted-foreground">Found</span>
              <span className="ml-1 text-sm font-bold text-foreground">
                {orders.length} order{orders.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="max-h-96 space-y-2 overflow-y-auto pr-1">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-start gap-3 rounded-lg border border-border bg-card p-3 transition-all hover:border-primary/30 hover:shadow-sm"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="truncate text-sm font-semibold text-foreground">
                        {order.documentType}
                      </span>
                      <StatusBadge status={order.status} />
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(order.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {order.deadline}
                      </span>
                    </div>
                    <div className="mt-1 font-mono text-[10px] text-muted-foreground">
                      ID: {order.id}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && !error && !searched && (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <History className="h-7 w-7" />
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Enter your email above to view your complete order history.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function TrackOrderPageClient() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-[#0a1f3d] via-[#0e2a52] to-[#0c3b5a] text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          aria-hidden="true"
        >
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
            Track Order · {brand.shortName}
          </Badge>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Track Your Order
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-blue-100/85 sm:text-base">
            Look up a single order by ID, or view your complete order history by
            email. Your Order ID was provided when you submitted your quote
            request — find it in your confirmation message.
          </p>
        </div>
      </section>

      {/* ===================== TRACKING TABS ===================== */}
      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:py-16">
          <Tabs defaultValue="id" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-2">
              <TabsTrigger value="id" className="gap-1.5">
                <Search className="h-4 w-4" />
                Track by ID
              </TabsTrigger>
              <TabsTrigger value="history" className="gap-1.5">
                <History className="h-4 w-4" />
                Order History
              </TabsTrigger>
            </TabsList>
            <TabsContent value="id">
              <TrackByIdTab />
            </TabsContent>
            <TabsContent value="history">
              <OrderHistoryTab />
            </TabsContent>
          </Tabs>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Card className="border-primary/10 bg-secondary/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                    <PackageCheck className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-sm">3-Step Process</CardTitle>
                </div>
                <CardContent className="px-0 pt-3">
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    Placed → In Progress → Completed. Track each stage in real
                    time.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>

            <Card className="border-primary/10 bg-secondary/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-sm">Need Help?</CardTitle>
                </div>
                <CardContent className="px-0 pt-3">
                  <a
                    href={`https://wa.me/${contactInfo.whatsappRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    WhatsApp {contactInfo.whatsapp}
                  </a>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    For status questions or order changes.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>

            <Card className="border-primary/10 bg-secondary/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent ring-1 ring-accent/15">
                    <Clock className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-sm">Availability</CardTitle>
                </div>
                <CardContent className="px-0 pt-3">
                  <Badge variant="secondary" className="text-[11px]">
                    {contactInfo.businessHours}
                  </Badge>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    Updates typically appear within 24 hours of any status
                    change.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1f3d] via-[#0e2a52] to-[#0c3b5a] text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          aria-hidden="true"
        >
          <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl" />
          <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:py-20">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Don&apos;t Have an Order Yet?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-blue-100/85 sm:text-base">
            Submit a quote request for any of the 12 official {brand.shortName}{" "}
            services and receive an Order ID within minutes.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="gap-2 bg-teal-400 text-[#0a1f3d] hover:bg-teal-300 hover:text-[#0a1f3d]"
            >
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
              <Link href="/services">Browse Services</Link>
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
