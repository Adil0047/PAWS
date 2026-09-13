"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  History,
  Search,
  PackageCheck,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  Mail,
  AlertCircle,
  Calendar,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type Order = {
  id: string;
  documentType: string;
  academicLevel: string;
  pages: number;
  deadline: string;
  price: number;
  status: string;
  preferredWriter: string | null;
  createdAt: string;
};

const statusConfig: Record<string, { label: string; icon: typeof Clock; color: string }> = {
  pending: { label: "Pending", icon: Clock, color: "bg-amber-500" },
  "in-progress": { label: "In Progress", icon: Loader2, color: "bg-primary" },
  completed: { label: "Completed", icon: CheckCircle2, color: "bg-green-500" },
  cancelled: { label: "Cancelled", icon: XCircle, color: "bg-red-500" },
};

export function OrderHistory() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
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
      const res = await fetch(`/api/orders/by-email?email=${encodeURIComponent(email.trim())}`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch {
      setError("Unable to fetch orders right now. Please try again later.");
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

  const totalSpent = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.price, 0);

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      {/* Header */}
      <div className="border-b border-border bg-secondary/30 p-5">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <History className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">Order History</h3>
            <p className="text-xs text-muted-foreground">View all your past orders by email</p>
          </div>
        </div>
        <form onSubmit={handleSearch} className="flex flex-col gap-2 sm:flex-row">
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
          <Button type="submit" className="gap-2" disabled={loading || !email.trim()}>
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

      {/* Results */}
      <div className="p-5">
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-8"
            >
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="mt-3 text-sm text-muted-foreground">Looking up your orders...</p>
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
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertCircle className="h-6 w-6" />
              </div>
              <p className="mt-3 text-sm text-foreground">{error}</p>
            </motion.div>
          )}

          {searched && !loading && !error && orders.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-8 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                <PackageCheck className="h-6 w-6" />
              </div>
              <p className="mt-3 text-sm font-medium text-foreground">No orders found</p>
              <p className="mt-1 text-xs text-muted-foreground">
                We couldn&apos;t find any orders for this email. Check the email address or place a new order.
              </p>
            </motion.div>
          )}

          {orders.length > 0 && !loading && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {/* Summary */}
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-primary/5 p-3">
                <div>
                  <span className="text-xs text-muted-foreground">Found</span>
                  <span className="ml-1 text-sm font-bold text-foreground">{orders.length} orders</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Total spent:</span>
                  <span className="ml-1 text-sm font-bold text-primary">PKR {totalSpent.toLocaleString()}</span>
                </div>
              </div>

              {/* Order list */}
              <div className="space-y-2">
                {orders.map((order) => {
                  const cfg = statusConfig[order.status] || statusConfig.pending;
                  const Icon = cfg.icon;
                  return (
                    <div
                      key={order.id}
                      className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-all hover:border-primary/30 hover:shadow-sm"
                    >
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${cfg.color} text-white`}>
                        <Icon className={`h-4 w-4 ${order.status === "in-progress" ? "animate-spin" : ""}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-sm font-semibold text-foreground">{order.documentType}</span>
                          <Badge variant="secondary" className="shrink-0 text-[10px]">{cfg.label}</Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            {order.pages}p · {order.academicLevel}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(order.createdAt)}
                          </span>
                          {order.preferredWriter && (
                            <span className="text-primary">Writer: {order.preferredWriter}</span>
                          )}
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="text-sm font-bold text-primary">PKR {order.price.toLocaleString()}</div>
                        <div className="font-mono text-[10px] text-muted-foreground">#{order.id.slice(-8)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {!searched && !loading && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-6 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <History className="h-6 w-6" />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Enter your email above to view your complete order history.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
