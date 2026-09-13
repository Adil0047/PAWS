"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Gift } from "lucide-react";

/**
 * Detects ?ref=CODE in the URL, tracks the click via API,
 * stores the referral code in localStorage for later use in orders,
 * and shows a welcome toast.
 */
export function ReferralTracker() {
  const { toast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get("ref");

    if (!refCode) return;

    // Track the click (best-effort, don't block)
    fetch("/api/referrals/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: refCode.toUpperCase() }),
    }).catch(() => {});

    // Store in localStorage so the order form can apply the discount
    try {
      localStorage.setItem("referral_code", refCode.toUpperCase());
    } catch {}

    // Show a welcome toast
    toast({
      title: "Welcome via referral! 🎉",
      description: `You've been referred by a friend. Use code ${refCode.toUpperCase()} for a special discount on your order.`,
    });

    // Clean the URL (remove ?ref= param so it doesn't re-trigger on refresh)
    const url = new URL(window.location.href);
    url.searchParams.delete("ref");
    window.history.replaceState({}, document.title, url.toString());
  }, [toast]);

  return null;
}
