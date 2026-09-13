"use client";

import { AdminPanel } from "@/components/site/admin-panel";
import { brand } from "@/lib/site-data";

// Dedicated /admin route — renders the existing AdminPanel inline (no Dialog).
// The AdminPanel component owns its own PIN gate (PIN: 1234) and persists the
// authed flag in sessionStorage so a refresh during a session stays unlocked.
export default function AdminPage() {
  return (
    <div className="space-y-6">
      <header className="mx-auto w-full max-w-5xl space-y-2 text-center text-white">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-teal-200 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-300" />
          Restricted Area
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {brand.shortName}{" "}
          <span className="text-teal-300">Admin Console</span>
        </h1>
        <p className="mx-auto max-w-xl text-sm text-white/70">
          Internal management dashboard for orders, messages, reviews, chats,
          and newsletter subscribers. Authorized personnel only.
        </p>
      </header>
      <AdminPanel inline />
      <footer className="mx-auto w-full max-w-5xl pt-2 text-center text-xs text-white/50">
        &copy; {new Date().getFullYear()} {brand.fullName}. All activity is logged.
      </footer>
    </div>
  );
}
