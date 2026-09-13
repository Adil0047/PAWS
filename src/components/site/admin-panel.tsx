"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Mail,
  Users,
  Activity,
  RefreshCw,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  DollarSign,
  MailOpen,
  Star,
  ThumbsUp,
  Trash2,
  MessageSquare,
  MessageCircle,
  Search,
  Lock,
  User2,
  Download,
  Loader2,
} from "lucide-react";
import { AdminSkeletonStats, AdminSkeletonCards } from "@/components/site/admin-skeletons";
import { AdminCharts } from "@/components/site/admin-charts";
import { exportToCSV } from "@/lib/csv-export";
import { brand } from "@/lib/site-data";

type Order = {
  id: string;
  name: string;
  email: string;
  phone: string;
  academicLevel: string;
  documentType: string;
  pages: number;
  deadline: string;
  price: number;
  status: string;
  preferredWriter?: string | null;
  createdAt: string;
};

type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
};

type Review = {
  id: string;
  name: string;
  rating: number;
  role: string | null;
  message: string;
  approved: boolean;
  createdAt: string;
};

type ChatSession = {
  id: string;
  visitorName: string;
  visitorEmail: string | null;
  messageCount: number;
  createdAt: string;
  updatedAt: string;
  preview?: string;
};

type Stats = {
  orders: number;
  contacts: number;
  subscribers: number;
  reviews: number;
  pendingReviews: number;
  totalChats: number;
  totalRevenue: number;
  pendingOrders: number;
};

export function AdminPanel({ inline = false }: { inline?: boolean }) {
  const [open, setOpen] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [subscribers, setSubscribers] = useState<number>(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [selectedChat, setSelectedChat] = useState<{ session: ChatSession; messages: Array<{ id: string; sender: string; content: string; timestamp: number }> } | null>(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("activity");
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [ordersPage, setOrdersPage] = useState(1);
  const ordersPerPage = 5;
  const [selectedOrderIds, setSelectedOrderIds] = useState<Set<string>>(new Set());
  const [authed, setAuthed] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [pinVerifying, setPinVerifying] = useState(false);

  // Check if already authenticated via HTTP-only cookie on mount
  useEffect(() => {
    fetch("/api/admin/verify", { method: "GET" })
      .then((res) => {
        if (res.ok) setAuthed(true);
      })
      .catch(() => {});
  }, []);

  // Open via keyboard shortcut (Ctrl+Shift+A) or URL hash.
  // Skipped in inline mode — the panel is already the page content.
  useEffect(() => {
    if (inline) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    if (window.location.hash === "#admin") setOpen(true);
    return () => window.removeEventListener("keydown", onKey);
  }, [inline]);

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim()) return;
    setPinVerifying(true);
    setPinError(false);
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pinInput.trim() }),
      });
      if (res.ok) {
        setAuthed(true);
        setPinInput("");
      } else {
        setPinError(true);
        setPinInput("");
      }
    } catch {
      setPinError(true);
      setPinInput("");
    } finally {
      setPinVerifying(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {}
    setAuthed(false);
    setOpen(false);
  };

  const viewChatSession = async (session: ChatSession) => {
    try {
      const res = await fetch(`/api/chat/${session.id}`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setSelectedChat({ session, messages: data.messages || [] });
    } catch {
      setSelectedChat(null);
    }
  };

  // Bulk order selection helpers
  const toggleOrderSelection = (id: string) => {
    setSelectedOrderIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAllOnPage = () => {
    const pageIds = paginatedOrders.map((o) => o.id);
    const allSelected = pageIds.every((id) => selectedOrderIds.has(id));
    setSelectedOrderIds((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        pageIds.forEach((id) => next.delete(id));
      } else {
        pageIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  const bulkUpdateStatus = async (status: string) => {
    const ids = Array.from(selectedOrderIds);
    if (ids.length === 0) return;
    // Optimistic update
    const prevOrders = orders;
    setOrders((prev) =>
      prev.map((o) => (selectedOrderIds.has(o.id) ? { ...o, status } : o))
    );
    try {
      await Promise.all(
        ids.map((id) =>
          fetch(`/api/orders/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
          })
        )
      );
      setSelectedOrderIds(new Set());
      // Refresh stats
      setStats((s) =>
        s
          ? {
              ...s,
              pendingOrders: prevOrders.filter(
                (o) => !selectedOrderIds.has(o.id) && o.status === "pending"
              ).length,
            }
          : s
      );
    } catch {
      setOrders(prevOrders);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersRes, contactsRes, newsRes, reviewsRes, chatRes] = await Promise.all([
        fetch("/api/orders").then((r) => r.json()),
        fetch("/api/contact").then((r) => r.json()),
        fetch("/api/newsletter").then((r) => r.json()),
        fetch("/api/reviews").then((r) => r.json()),
        fetch("/api/chat?sessions=true").then((r) => r.json()),
      ]);
      const orderList: Order[] = ordersRes.orders || [];
      const contactList: Contact[] = contactsRes.messages || [];
      const subCount: number = newsRes.subscribers || 0;
      const reviewList: Review[] = reviewsRes.reviews || [];
      const totalChats: number = chatRes.totalSessions || 0;
      const chatSessionList: ChatSession[] = chatRes.recentSessions || [];
      setOrders(orderList);
      setContacts(contactList);
      setChats(chatSessionList);
      setSubscribers(subCount);
      setReviews(reviewList);
      setStats({
        orders: orderList.length,
        contacts: contactList.length,
        subscribers: subCount,
        reviews: reviewList.length,
        pendingReviews: reviewList.filter((r) => !r.approved).length,
        totalChats,
        totalRevenue: orderList.reduce((sum, o) => sum + (o.price || 0), 0),
        pendingOrders: orderList.filter((o) => o.status === "pending").length,
      });
    } catch (e) {
      console.error("Admin fetch failed:", e);
    } finally {
      setLoading(false);
    }
  };

  const toggleReviewApproval = async (id: string, approved: boolean) => {
    const prevReviews = reviews;
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, approved } : r))
    );
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved }),
      });
      if (!res.ok) throw new Error("Failed");
      setStats((s) =>
        s
          ? {
              ...s,
              pendingReviews: prevReviews.filter(
                (r) => r.id !== id && !r.approved
              ).length,
            }
          : s
      );
    } catch {
      setReviews(prevReviews);
    }
  };

  const deleteReview = async (id: string) => {
    const prevReviews = reviews;
    setReviews((prev) => prev.filter((r) => r.id !== id));
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
    } catch {
      setReviews(prevReviews);
    }
  };

  useEffect(() => {
    // In inline mode the dashboard is always visible, so auto-fetch on mount
    // once authenticated. In dialog mode, only fetch when the dialog opens.
    if (inline) {
      if (authed && !stats) fetchData();
    } else if (open && !stats) {
      fetchData();
    }
  }, [open, stats, inline, authed]);

  const updateOrderStatus = async (id: string, status: string) => {
    // Optimistic update
    const prevOrders = orders;
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
    // Persist via PATCH endpoint
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed");
      // Update stats pending count
      setStats((s) =>
        s
          ? {
              ...s,
              pendingOrders: prevOrders.filter(
                (o) => o.id !== id && o.status === "pending"
              ).length,
            }
          : s
      );
    } catch {
      // Revert on failure
      setOrders(prevOrders);
    }
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleString("en-PK", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Filtered orders based on search + status filter
  const filteredOrders = useMemo(() => {
    let result = orders;
    if (orderStatusFilter !== "all") {
      result = result.filter((o) => o.status === orderStatusFilter);
    }
    if (orderSearch.trim()) {
      const q = orderSearch.trim().toLowerCase();
      result = result.filter(
        (o) =>
          o.name.toLowerCase().includes(q) ||
          o.email.toLowerCase().includes(q) ||
          o.documentType.toLowerCase().includes(q) ||
          (o.preferredWriter ?? "").toLowerCase().includes(q)
      );
    }
    return result;
  }, [orders, orderSearch, orderStatusFilter]);

  // Reset page when filters change
  useEffect(() => {
    setOrdersPage(1);
  }, [orderSearch, orderStatusFilter]);

  const paginatedOrders = useMemo(() => {
    const start = (ordersPage - 1) * ordersPerPage;
    return filteredOrders.slice(start, start + ordersPerPage);
  }, [filteredOrders, ordersPage, ordersPerPage]);

  const ordersTotalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const orderStatusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    orders.forEach((o) => {
      counts[o.status] = (counts[o.status] || 0) + 1;
    });
    return counts;
  }, [orders]);

  // Recent activity feed: merge orders, contacts, and reviews sorted by date
  const recentActivity = useMemo(() => {
    type Activity = {
      id: string;
      type: "order" | "contact" | "review";
      title: string;
      subtitle: string;
      detail: string;
      timestamp: string;
      status?: string;
    };
    const activities: Activity[] = [];
    orders.forEach((o) => {
      activities.push({
        id: `order-${o.id}`,
        type: "order",
        title: `New order from ${o.name}`,
        subtitle: o.documentType,
        detail: `${o.pages} pages · PKR ${o.price.toLocaleString()}`,
        timestamp: o.createdAt,
        status: o.status,
      });
    });
    contacts.forEach((c) => {
      activities.push({
        id: `contact-${c.id}`,
        type: "contact",
        title: `Message from ${c.name}`,
        subtitle: c.subject,
        detail: c.message.slice(0, 80),
        timestamp: c.createdAt,
      });
    });
    reviews.forEach((r) => {
      activities.push({
        id: `review-${r.id}`,
        type: "review",
        title: `Review by ${r.name}`,
        subtitle: `${r.rating}★ ${r.approved ? "(approved)" : "(pending)"}`,
        detail: r.message.slice(0, 80),
        timestamp: r.createdAt,
        status: r.approved ? "approved" : "pending",
      });
    });
    return activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 15);
  }, [orders, contacts, reviews]);

  const content = (
    <>
      {!authed ? (
        /* PIN lock screen */
        <div className="flex flex-col items-center justify-center p-8" style={{ minHeight: "400px" }}>
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Lock className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Admin Access</h2>
            <p className="mt-2 max-w-xs text-center text-sm text-muted-foreground">
              Enter your PIN to access the admin dashboard. This area is restricted to authorized personnel only.
            </p>
            <form onSubmit={handlePinSubmit} className="mt-6 w-full max-w-xs space-y-3">
              <input
                type="password"
                value={pinInput}
                onChange={(e) => { setPinInput(e.target.value); setPinError(false); }}
                placeholder="Enter PIN"
                autoFocus
                className={`w-full rounded-lg border bg-background px-4 py-2.5 text-center text-lg tracking-[0.5em] focus:outline-none focus:ring-2 ${
                  pinError
                    ? "border-destructive focus:ring-destructive/30"
                    : "border-border focus:border-primary focus:ring-primary/20"
                }`}
                maxLength={4}
                inputMode="numeric"
              />
              {pinError && (
                <p className="text-center text-sm font-medium text-destructive">
                  Incorrect PIN. Please try again.
                </p>
              )}
              <Button type="submit" className="w-full gap-2" disabled={pinInput.length < 1 || pinVerifying}>
                {pinVerifying ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Unlock Dashboard"
                )}
              </Button>
              <p className="text-center text-[11px] text-muted-foreground">
                Enter the admin PIN to access the dashboard.
              </p>
            </form>
          </div>
        ) : (
          <>


        {/* Admin header */}
        <div className="relative flex items-center justify-between border-b border-border bg-gradient-to-r from-primary to-primary/85 p-4 text-primary-foreground">
          <div className="absolute inset-0 bg-academic-grid opacity-30" />
          <div className="relative flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Admin Dashboard</h2>
              <p className="text-xs text-primary-foreground/80">
                {brand.shortName} · Internal Management
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="relative gap-1.5 text-primary-foreground hover:bg-white/15 hover:text-primary-foreground"
            onClick={fetchData}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="relative gap-1.5 text-primary-foreground hover:bg-white/15 hover:text-primary-foreground"
            onClick={handleLogout}
          >
            <Lock className="h-4 w-4" />
            Lock
          </Button>
        </div>

        {/* Stats cards */}
        {loading && !stats ? (
          <AdminSkeletonStats />
        ) : (
        <div className="grid grid-cols-2 gap-3 border-b border-border bg-secondary/40 p-4 md:grid-cols-3 lg:grid-cols-6">
          <StatCard
            icon={ShoppingCart}
            label="Total Orders"
            value={stats?.orders ?? 0}
            sub={`${stats?.pendingOrders ?? 0} pending`}
            color="text-primary"
          />
          <StatCard
            icon={DollarSign}
            label="Pipeline Value"
            value={`PKR ${(stats?.totalRevenue ?? 0).toLocaleString()}`}
            sub="Estimated revenue"
            color="text-accent-foreground"
          />
          <StatCard
            icon={Mail}
            label="Messages"
            value={stats?.contacts ?? 0}
            sub="Contact requests"
            color="text-rose-600"
          />
          <StatCard
            icon={Star}
            label="Reviews"
            value={stats?.reviews ?? 0}
            sub={`${stats?.pendingReviews ?? 0} pending`}
            color="text-amber-600"
          />
          <StatCard
            icon={MessageCircle}
            label="Chat Sessions"
            value={stats?.totalChats ?? 0}
            sub="Visitor conversations"
            color="text-teal-600"
          />
          <StatCard
            icon={Users}
            label="Subscribers"
            value={stats?.subscribers ?? 0}
            sub="Newsletter signups"
            color="text-violet-600"
          />
        </div>
        )}

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab} className="flex flex-1 flex-col overflow-hidden">
          <div className="border-b border-border px-4 pt-3">
            <TabsList className="bg-secondary">
              <TabsTrigger value="activity" className="gap-1.5">
                <Activity className="h-3.5 w-3.5" />
                Activity
              </TabsTrigger>
              <TabsTrigger value="orders" className="gap-1.5">
                <ShoppingCart className="h-3.5 w-3.5" />
                Orders
                <Badge variant="secondary" className="ml-1">{orders.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="contacts" className="gap-1.5">
                <Mail className="h-3.5 w-3.5" />
                Messages
                <Badge variant="secondary" className="ml-1">{contacts.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="reviews" className="gap-1.5">
                <Star className="h-3.5 w-3.5" />
                Reviews
                <Badge variant="secondary" className="ml-1">{reviews.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="chats" className="gap-1.5">
                <MessageCircle className="h-3.5 w-3.5" />
                Chats
                <Badge variant="secondary" className="ml-1">{stats?.totalChats ?? 0}</Badge>
              </TabsTrigger>
              <TabsTrigger value="subscribers" className="gap-1.5">
                <Users className="h-3.5 w-3.5" />
                Subscribers
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="custom-scroll max-h-[55vh] overflow-y-auto p-4">
            {/* Activity tab */}
            <TabsContent value="activity" className="mt-0 space-y-4">
              {/* Charts */}
              {!loading && orders.length > 0 && <AdminCharts orders={orders} />}

              {/* Activity timeline */}
              {recentActivity.length === 0 ? (
                <EmptyState icon={Activity} text="No recent activity yet. Orders, messages, and reviews will appear here in real time." />
              ) : (
                <>
                  <div className="mb-2 flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    Latest {recentActivity.length} activities across orders, messages, and reviews
                  </div>
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute bottom-4 left-[18px] top-4 w-0.5 bg-border" />
                    {recentActivity.map((item) => {
                      const icon = item.type === "order" ? ShoppingCart : item.type === "contact" ? Mail : Star;
                      const iconColor = item.type === "order" ? "bg-primary" : item.type === "contact" ? "bg-rose-500" : "bg-amber-500";
                      const Icon = icon;
                      return (
                        <div key={item.id} className="relative flex gap-3 pb-4">
                          <div className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white shadow-sm ${iconColor}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 flex-1 rounded-lg border border-border bg-card p-3 shadow-sm">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <p className="truncate text-sm font-semibold text-foreground">{item.title}</p>
                                  {item.status && (
                                    <Badge
                                      variant="secondary"
                                      className={`shrink-0 text-[9px] ${
                                        item.status === "pending"
                                          ? "bg-amber-100 text-amber-700"
                                          : item.status === "completed" || item.status === "approved"
                                          ? "bg-primary/15 text-primary"
                                          : ""
                                      }`}
                                    >
                                      {item.status}
                                    </Badge>
                                  )}
                                </div>
                                <p className="truncate text-xs font-medium text-primary">{item.subtitle}</p>
                                <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{item.detail}</p>
                              </div>
                              <span className="shrink-0 text-[10px] text-muted-foreground">
                                {formatDate(item.timestamp)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </TabsContent>

            {/* Orders tab */}
            <TabsContent value="orders" className="mt-0 space-y-3">
              {loading && orders.length === 0 ? (
                <AdminSkeletonCards count={3} />
              ) : orders.length === 0 ? (
                <EmptyState icon={ShoppingCart} text="No orders yet. Orders placed via the order form will appear here." />
              ) : (
                <>
                  {/* Search & filter bar */}
                  <div className="sticky top-0 z-10 -mx-4 mb-2 border-b border-border bg-card/95 px-4 py-3 backdrop-blur">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="text"
                          value={orderSearch}
                          onChange={(e) => setOrderSearch(e.target.value)}
                          placeholder="Search by name, email, type, writer..."
                          className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        {orderSearch && (
                          <button
                            onClick={() => setOrderSearch("")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
                            aria-label="Clear search"
                          >
                            <XCircle className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { value: "all", label: `All (${orders.length})` },
                          { value: "pending", label: `Pending (${orderStatusCounts.pending || 0})` },
                          { value: "in-progress", label: `In Progress (${orderStatusCounts["in-progress"] || 0})` },
                          { value: "completed", label: `Completed (${orderStatusCounts.completed || 0})` },
                          { value: "cancelled", label: `Cancelled (${orderStatusCounts.cancelled || 0})` },
                        ].map((f) => (
                          <button
                            key={f.value}
                            onClick={() => setOrderStatusFilter(f.value)}
                            className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all ${
                              orderStatusFilter === f.value
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-background text-foreground/80 hover:border-primary/40 hover:bg-secondary"
                            }`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      {filteredOrders.length !== orders.length && (
                        <p className="text-xs text-muted-foreground">
                          Showing {filteredOrders.length} of {orders.length} orders
                        </p>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="ml-auto gap-1 text-xs"
                        onClick={() =>
                          exportToCSV(
                            filteredOrders.map((o) => ({
                              name: o.name,
                              email: o.email,
                              phone: o.phone,
                              academicLevel: o.academicLevel,
                              documentType: o.documentType,
                              pages: o.pages,
                              deadline: o.deadline,
                              price: o.price,
                              status: o.status,
                              preferredWriter: o.preferredWriter || "",
                              createdAt: o.createdAt,
                            })),
                            `orders-${new Date().toISOString().split("T")[0]}.csv`
                          )
                        }
                      >
                        <Download className="h-3.5 w-3.5" />
                        Export CSV
                      </Button>
                    </div>
                  </div>

                  {/* Bulk action bar */}
                  {selectedOrderIds.size > 0 && (
                    <div className="sticky top-[64px] z-10 flex flex-wrap items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 p-2 shadow-sm">
                      <span className="text-xs font-semibold text-primary">
                        {selectedOrderIds.size} selected
                      </span>
                      <div className="ml-auto flex flex-wrap gap-1.5">
                        <Button size="sm" variant="outline" className="h-7 gap-1 text-xs" onClick={() => bulkUpdateStatus("in-progress")}>
                          <Clock className="h-3 w-3" /> Mark In Progress
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 gap-1 text-xs text-primary" onClick={() => bulkUpdateStatus("completed")}>
                          <CheckCircle2 className="h-3 w-3" /> Complete All
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 gap-1 text-xs text-destructive" onClick={() => bulkUpdateStatus("cancelled")}>
                          <XCircle className="h-3 w-3" /> Cancel All
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setSelectedOrderIds(new Set())}>
                          Clear
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Select all checkbox */}
                  {filteredOrders.length > 0 && (
                    <div className="flex items-center gap-2 px-1">
                      <input
                        type="checkbox"
                        checked={paginatedOrders.length > 0 && paginatedOrders.every((o) => selectedOrderIds.has(o.id))}
                        onChange={toggleSelectAllOnPage}
                        className="h-4 w-4 cursor-pointer rounded border-border accent-primary"
                        id="select-all-orders"
                      />
                      <label htmlFor="select-all-orders" className="cursor-pointer text-xs text-muted-foreground">
                        Select all on this page ({paginatedOrders.length})
                      </label>
                    </div>
                  )}

                  {filteredOrders.length === 0 ? (
                    <EmptyState icon={Search} text="No orders match your search. Try adjusting your filters." />
                  ) : (
                    <div className="space-y-3">
                    {paginatedOrders.map((order) => (
                    <div
                      key={order.id}
                      className={`rounded-xl border bg-card p-4 shadow-sm transition-all ${
                        selectedOrderIds.has(order.id) ? "border-primary/40 ring-1 ring-primary/20" : "border-border"
                      }`}
                    >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={selectedOrderIds.has(order.id)}
                          onChange={() => toggleOrderSelection(order.id)}
                          className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-border accent-primary"
                          aria-label={`Select order from ${order.name}`}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">{order.name}</h4>
                          <Badge
                            variant={order.status === "pending" ? "default" : "secondary"}
                            className={
                              order.status === "pending"
                                ? "bg-accent/15 text-accent-foreground"
                                : order.status === "completed"
                                ? "bg-primary/15 text-primary"
                                : ""
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          {order.email} · {order.phone}
                        </p>
                      </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">
                          PKR {order.price.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          {formatDate(order.createdAt)}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-3 text-xs sm:grid-cols-4">
                      <div>
                        <span className="text-muted-foreground">Level</span>
                        <p className="font-medium capitalize text-foreground">{order.academicLevel}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Type</span>
                        <p className="font-medium text-foreground">{order.documentType}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Pages</span>
                        <p className="font-medium text-foreground">{order.pages}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Deadline</span>
                        <p className="font-medium text-foreground">{order.deadline}</p>
                      </div>
                      {order.preferredWriter && (
                        <div className="col-span-2 sm:col-span-1">
                          <span className="text-muted-foreground">Writer</span>
                          <p className="font-medium text-primary">{order.preferredWriter}</p>
                        </div>
                      )}
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 gap-1 text-xs"
                        onClick={() => updateOrderStatus(order.id, "in-progress")}
                      >
                        <Clock className="h-3 w-3" /> Mark In Progress
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 gap-1 text-xs text-primary"
                        onClick={() => updateOrderStatus(order.id, "completed")}
                      >
                        <CheckCircle2 className="h-3 w-3" /> Complete
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 gap-1 text-xs text-destructive"
                        onClick={() => updateOrderStatus(order.id, "cancelled")}
                      >
                        <XCircle className="h-3 w-3" /> Cancel
                      </Button>
                    </div>
                  </div>
                    ))}

                  {/* Pagination */}
                  {ordersTotalPages > 1 && (
                    <div className="flex items-center justify-between border-t border-border pt-3">
                      <span className="text-xs text-muted-foreground">
                        Page {ordersPage} of {ordersTotalPages} ({filteredOrders.length} orders)
                      </span>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 text-xs"
                          disabled={ordersPage === 1}
                          onClick={() => setOrdersPage((p) => Math.max(1, p - 1))}
                        >
                          Previous
                        </Button>
                        {Array.from({ length: ordersTotalPages }).map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setOrdersPage(i + 1)}
                            className={`h-7 w-7 rounded-md text-xs font-medium transition-colors ${
                              ordersPage === i + 1
                                ? "bg-primary text-primary-foreground"
                                : "border border-border hover:bg-secondary"
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 text-xs"
                          disabled={ordersPage === ordersTotalPages}
                          onClick={() => setOrdersPage((p) => Math.min(ordersTotalPages, p + 1))}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                  )}
                </>
              )}
            </TabsContent>

            {/* Contacts tab */}
            <TabsContent value="contacts" className="mt-0 space-y-3">
              {contacts.length === 0 ? (
                <EmptyState icon={Mail} text="No messages yet. Contact form submissions will appear here." />
              ) : (
                contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="rounded-xl border border-border bg-card p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-foreground">{contact.name}</h4>
                          <MailOpen className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          {contact.email}
                          {contact.phone && ` · ${contact.phone}`}
                        </p>
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        {formatDate(contact.createdAt)}
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-xs font-semibold text-primary">{contact.subject}</span>
                      <p className="mt-1 text-sm text-foreground/85">{contact.message}</p>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline" className="h-7 gap-1 text-xs" asChild>
                        <a href={`mailto:${contact.email}?subject=Re: ${contact.subject}`}>
                          <Mail className="h-3 w-3" /> Reply
                        </a>
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>

            {/* Reviews tab */}
            <TabsContent value="reviews" className="mt-0 space-y-3">
              {reviews.length === 0 ? (
                <EmptyState
                  icon={Star}
                  text="No reviews yet. Reviews submitted via the review form will appear here for approval."
                />
              ) : (
                <>
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1 text-xs"
                    onClick={() =>
                      exportToCSV(
                        reviews.map((r) => ({
                          name: r.name,
                          rating: r.rating,
                          role: r.role || "",
                          message: r.message,
                          approved: r.approved ? "yes" : "no",
                          createdAt: r.createdAt,
                        })),
                        `reviews-${new Date().toISOString().split("T")[0]}.csv`
                      )
                    }
                  >
                    <Download className="h-3.5 w-3.5" />
                    Export CSV
                  </Button>
                </div>
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-xl border border-border bg-card p-4 shadow-sm"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-foreground">{review.name}</h4>
                          <Badge
                            variant={review.approved ? "default" : "secondary"}
                            className={
                              review.approved
                                ? "bg-primary/15 text-primary"
                                : "bg-amber-100 text-amber-700"
                            }
                          >
                            {review.approved ? "approved" : "pending"}
                          </Badge>
                        </div>
                        {review.role && (
                          <p className="mt-0.5 text-xs text-muted-foreground">{review.role}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star
                            key={s}
                            className={`h-3.5 w-3.5 ${
                              s < review.rating
                                ? "fill-accent text-accent"
                                : "fill-muted text-muted-foreground/30"
                            }`}
                          />
                        ))}
                        <span className="ml-1.5 text-[10px] text-muted-foreground">
                          {formatDate(review.createdAt)}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-foreground/85">{review.message}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {!review.approved ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 gap-1 text-xs text-primary"
                          onClick={() => toggleReviewApproval(review.id, true)}
                        >
                          <ThumbsUp className="h-3 w-3" /> Approve
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 gap-1 text-xs"
                          onClick={() => toggleReviewApproval(review.id, false)}
                        >
                          <XCircle className="h-3 w-3" /> Unpublish
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 gap-1 text-xs text-destructive"
                        onClick={() => deleteReview(review.id)}
                      >
                        <Trash2 className="h-3 w-3" /> Delete
                      </Button>
                    </div>
                  </div>
                ))}
                </>
              )}
            </TabsContent>

            {/* Chats tab */}
            <TabsContent value="chats" className="mt-0 space-y-3">
              {selectedChat ? (
                <div className="rounded-xl border border-border bg-card shadow-sm">
                  <div className="flex items-center justify-between border-b border-border bg-secondary/50 p-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="truncate font-semibold text-foreground">
                          {selectedChat.session.visitorName}
                        </h4>
                        <Badge variant="secondary" className="shrink-0">
                          {selectedChat.session.messageCount} msgs
                        </Badge>
                      </div>
                      {selectedChat.session.visitorEmail && (
                        <p className="truncate text-xs text-muted-foreground">
                          {selectedChat.session.visitorEmail}
                        </p>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="gap-1 text-xs"
                      onClick={() => setSelectedChat(null)}
                    >
                      <XCircle className="h-3.5 w-3.5" /> Back
                    </Button>
                  </div>
                  <div className="custom-scroll max-h-[400px] space-y-3 overflow-y-auto p-4">
                    {selectedChat.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex items-end gap-2 ${
                          msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        <div
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white ${
                            msg.sender === "agent" ? "bg-primary" : "bg-accent"
                          }`}
                        >
                          {msg.sender === "agent" ? (
                            <MessageCircle className="h-3 w-3" />
                          ) : (
                            <User2 className="h-3 w-3" />
                          )}
                        </div>
                        <div
                          className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                            msg.sender === "agent"
                              ? "rounded-bl-sm bg-secondary text-foreground"
                              : "rounded-br-sm bg-primary text-primary-foreground"
                          }`}
                        >
                          <p className="leading-relaxed">{msg.content}</p>
                          <div
                            className={`mt-1 text-[10px] ${
                              msg.sender === "user"
                                ? "text-primary-foreground/70"
                                : "text-muted-foreground"
                            }`}
                          >
                            {new Date(msg.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : chats.length === 0 ? (
                <EmptyState
                  icon={MessageCircle}
                  text="No chat sessions yet. Conversations started via the live chat widget will appear here."
                />
              ) : (
                chats.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => viewChatSession(session)}
                    className="flex w-full items-start gap-3 rounded-xl border border-border bg-card p-4 text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 text-white">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="truncate font-semibold text-foreground">
                          {session.visitorName}
                        </h4>
                        <span className="shrink-0 text-[10px] text-muted-foreground">
                          {formatDate(session.updatedAt)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-[10px]">
                          {session.messageCount} messages
                        </Badge>
                        {session.visitorEmail && (
                          <span className="truncate text-xs text-muted-foreground">
                            {session.visitorEmail}
                          </span>
                        )}
                      </div>
                      {session.preview && (
                        <p className="mt-1.5 line-clamp-1 text-xs text-muted-foreground">
                          {session.preview}
                        </p>
                      )}
                    </div>
                  </button>
                ))
              )}
            </TabsContent>

            {/* Subscribers tab */}
            <TabsContent value="subscribers" className="mt-0">
              <div className="rounded-xl border border-border bg-card p-6 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-2xl font-bold text-foreground">{subscribers}</h3>
                <p className="text-sm text-muted-foreground">Newsletter subscribers</p>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Growing weekly
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
          </>
        )}
    </>
  );

  if (inline) {
    // Inline mode: render as a full-page card (no Dialog wrapper).
    // Used by the dedicated /admin route.
    return (
      <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <h1 className="sr-only">{brand.shortName} Admin Dashboard</h1>
        {content}
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[92vh] overflow-hidden p-0 sm:max-w-5xl">
        <DialogTitle className="sr-only">Admin Dashboard</DialogTitle>
        <DialogDescription className="sr-only">
          Manage orders, contact messages, and newsletter subscribers.
        </DialogDescription>
        {content}
      </DialogContent>
    </Dialog>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub: string;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        <Icon className={`h-4 w-4 ${color}`} />
      </div>
      <div className="mt-1 text-xl font-bold text-foreground">{value}</div>
      <div className="text-[10px] text-muted-foreground">{sub}</div>
    </div>
  );
}

function EmptyState({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-muted-foreground">
        <Icon className="h-7 w-7" />
      </div>
      <p className="mt-3 max-w-xs text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
