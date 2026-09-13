"use client";

import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { TrendingUp, BarChart3, PieChart as PieIcon, Calendar } from "lucide-react";

type Order = {
  id: string;
  price: number;
  status: string;
  academicLevel: string;
  createdAt: string;
};

type DateRange = "7d" | "30d" | "90d" | "all";

const rangeConfig: Record<DateRange, { label: string; days: number | null }> = {
  "7d": { label: "7 Days", days: 7 },
  "30d": { label: "30 Days", days: 30 },
  "90d": { label: "90 Days", days: 90 },
  all: { label: "All Time", days: null },
};

export function AdminCharts({ orders }: { orders: Order[] }) {
  const [dateRange, setDateRange] = useState<DateRange>("7d");

  // Filter orders by date range
  const filteredByRange = useMemo(() => {
    const config = rangeConfig[dateRange];
    if (!config.days) return orders;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - config.days);
    cutoff.setHours(0, 0, 0, 0);
    return orders.filter((o) => new Date(o.createdAt) >= cutoff);
  }, [orders, dateRange]);

  // Orders per day based on selected range
  const ordersPerDay = useMemo(() => {
    const config = rangeConfig[dateRange];
    const numDays = config.days || 30;
    const days: { date: string; label: string; orders: number; revenue: number }[] = [];
    const now = new Date();
    for (let i = numDays - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);
      const next = new Date(d);
      next.setDate(d.getDate() + 1);
      const dayOrders = filteredByRange.filter((o) => {
        const od = new Date(o.createdAt);
        return od >= d && od < next;
      });
      const labelFormat = numDays <= 7 ? { weekday: "short" as const } : { month: "short" as const, day: "numeric" as const };
      days.push({
        date: d.toISOString(),
        label: d.toLocaleDateString("en-US", labelFormat),
        orders: dayOrders.length,
        revenue: dayOrders.reduce((s, o) => s + (o.price || 0), 0),
      });
    }
    return days;
  }, [filteredByRange, dateRange]);

  // Status distribution (filtered by range)
  const statusData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredByRange.forEach((o) => {
      counts[o.status] = (counts[o.status] || 0) + 1;
    });
    const colors: Record<string, string> = {
      pending: "oklch(0.72 0.14 75)",
      "in-progress": "oklch(0.6 0.1 200)",
      completed: "oklch(0.55 0.13 160)",
      cancelled: "oklch(0.65 0.18 30)",
    };
    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
      fill: colors[name] || "oklch(0.7 0.02 145)",
    }));
  }, [filteredByRange]);

  // Academic level distribution (filtered by range)
  const levelData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredByRange.forEach((o) => {
      counts[o.academicLevel] = (counts[o.academicLevel] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [filteredByRange]);

  if (filteredByRange.length === 0 && orders.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center shadow-sm">
        <BarChart3 className="mx-auto h-10 w-10 text-muted-foreground/40" />
        <p className="mt-3 text-sm text-muted-foreground">
          Charts will appear once you have order data.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Date range selector */}
      <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-2 shadow-sm">
        <Calendar className="ml-1 h-4 w-4 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">Range:</span>
        <div className="flex gap-1">
          {(Object.keys(rangeConfig) as DateRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                dateRange === range
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-foreground/70 hover:bg-secondary/80"
              }`}
            >
              {rangeConfig[range].label}
            </button>
          ))}
        </div>
        <span className="ml-auto text-xs text-muted-foreground">
          {filteredByRange.length} orders in range
        </span>
      </div>

    <div className="grid gap-4 lg:grid-cols-2">
      {/* Orders & Revenue trend */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold text-foreground">Orders & Revenue</h4>
          </div>
          <span className="text-xs text-muted-foreground">{rangeConfig[dateRange].label}</span>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={ordersPerDay} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.55 0.13 160)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="oklch(0.55 0.13 160)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.72 0.14 75)" stopOpacity={0.6} />
                <stop offset="95%" stopColor="oklch(0.72 0.14 75)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 145)" />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: "oklch(0.5 0.02 160)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "oklch(0.5 0.02 160)" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "oklch(1 0 0)",
                border: "1px solid oklch(0.9 0.01 145)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="oklch(0.45 0.11 160)"
              strokeWidth={2}
              fill="url(#colorOrders)"
              name="Orders"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Status distribution */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PieIcon className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold text-foreground">Order Status</h4>
          </div>
          <span className="text-xs text-muted-foreground">{orders.length} total</span>
        </div>
        {statusData.length > 0 ? (
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {statusData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "oklch(1 0 0)",
                  border: "1px solid oklch(0.9 0.01 145)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[180px] items-center justify-center text-sm text-muted-foreground">
            No data
          </div>
        )}
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {statusData.map((s) => (
            <span key={s.name} className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.fill }} />
              {s.name} ({s.value})
            </span>
          ))}
        </div>
      </div>

      {/* Revenue per day bar chart */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm lg:col-span-2">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold text-foreground">Revenue per Day (PKR)</h4>
          </div>
          <span className="text-xs text-muted-foreground">
            Total: PKR {ordersPerDay.reduce((s, d) => s + d.revenue, 0).toLocaleString()}
          </span>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={ordersPerDay} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 145)" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: "oklch(0.5 0.02 160)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "oklch(0.5 0.02 160)" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "oklch(1 0 0)",
                border: "1px solid oklch(0.9 0.01 145)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value: number) => [`PKR ${value.toLocaleString()}`, "Revenue"]}
            />
            <Bar dataKey="revenue" fill="oklch(0.72 0.14 75)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    </div>
  );
}
