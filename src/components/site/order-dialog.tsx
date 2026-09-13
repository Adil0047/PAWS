"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  academicLevels,
  deadlines,
  documentTypes,
  contactInfo,
} from "@/lib/site-data";
import { useOrder } from "@/lib/order-context";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Loader2, ShieldCheck, Lock, Sparkles, ArrowRight, User, Gift } from "lucide-react";

export function OrderDialog() {
  const { isOpen, closeOrder, preset } = useOrder();
  const { toast } = useToast();

  const levelVal = preset?.academicLevel ?? academicLevels[0].value;
  const levelData = academicLevels.find((l) => l.value === levelVal)!;
  const deadlineVal = preset?.deadline ?? deadlines[2].value;
  const deadlineData = deadlines.find((d) => d.value === deadlineVal)!;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    academicLevel: levelVal,
    documentType: preset?.documentType ?? documentTypes[0],
    pages: preset?.pages ?? 5,
    deadline: deadlineVal,
    preferredWriter: preset?.preferredWriter ?? "",
    referralCode: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Sync form when preset changes / dialog opens
  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      // Load referral code from localStorage if available
      let storedRef = "";
      try {
        storedRef = localStorage.getItem("referral_code") || "";
      } catch {}
      setForm((prev) => ({
        ...prev,
        academicLevel: preset?.academicLevel ?? prev.academicLevel,
        documentType: preset?.documentType ?? prev.documentType,
        pages: preset?.pages ?? prev.pages,
        deadline: preset?.deadline ?? prev.deadline,
        preferredWriter: preset?.preferredWriter ?? prev.preferredWriter,
        referralCode: prev.referralCode || storedRef,
      }));
    }
  }, [isOpen, preset]);

  const price = Math.round(
    levelData.perPage * form.pages * deadlineData.multiplier
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setSuccess(true);
      toast({
        title: "Order placed successfully!",
        description: `Your order ID is ${data.id}. We'll contact you shortly.`,
      });
    } catch {
      toast({
        title: "Order failed",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && closeOrder()}>
      <DialogContent className="max-h-[92vh] overflow-y-auto custom-scroll sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-5 w-5 text-accent" />
            Place Your Order
          </DialogTitle>
          <DialogDescription>
            Fill out the details below and get matched with an expert writer. Quick, secure, and
            100% confidential.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-foreground">Order Received!</h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Thank you for choosing Thesis Writing Service PK. Our team will review your
              requirements and contact you at <span className="font-semibold text-foreground">{form.email}</span> within the next few hours.
            </p>
            <div className="mt-5 w-full rounded-xl border border-border bg-secondary/50 p-4 text-left text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service</span>
                <span className="font-medium text-foreground">{form.documentType}</span>
              </div>
              <div className="mt-1 flex justify-between">
                <span className="text-muted-foreground">Estimated Price</span>
                <span className="font-bold text-primary">PKR {price.toLocaleString()}</span>
              </div>
            </div>
            <Button className="mt-5 w-full" onClick={closeOrder}>
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="o-name" className="text-xs font-semibold">Full Name *</Label>
                <Input
                  id="o-name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="o-phone" className="text-xs font-semibold">Phone *</Label>
                <Input
                  id="o-phone"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+92 3xx xxxxxxx"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="o-email" className="text-xs font-semibold">Email *</Label>
              <Input
                id="o-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Academic Level</Label>
                <Select
                  value={form.academicLevel}
                  onValueChange={(v) => setForm({ ...form, academicLevel: v })}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {academicLevels.map((l) => (
                      <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Deadline</Label>
                <Select
                  value={form.deadline}
                  onValueChange={(v) => setForm({ ...form, deadline: v })}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {deadlines.map((d) => (
                      <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Document Type</Label>
              <Select
                value={form.documentType}
                onValueChange={(v) => setForm({ ...form, documentType: v })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="max-h-60">
                  {documentTypes.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="o-pages" className="text-xs font-semibold">Pages</Label>
                <span className="text-xs font-medium text-primary">{form.pages} · ~{(form.pages * 250).toLocaleString()} words</span>
              </div>
              <Input
                id="o-pages"
                type="number"
                min={1}
                max={200}
                required
                value={form.pages}
                onChange={(e) => setForm({ ...form, pages: Math.max(1, Math.min(200, Number(e.target.value) || 1)) })}
              />
            </div>

            {form.preferredWriter && (
              <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 p-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  <div>
                    <div className="text-xs font-medium text-muted-foreground">Preferred Writer</div>
                    <div className="text-sm font-semibold text-foreground">{form.preferredWriter}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, preferredWriter: "" })}
                  className="text-xs text-muted-foreground transition-colors hover:text-destructive"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Referral code field */}
            <div className="space-y-1.5">
              <Label htmlFor="o-referral" className="text-xs font-semibold">Referral Code (optional)</Label>
              <Input
                id="o-referral"
                value={form.referralCode}
                onChange={(e) => setForm({ ...form, referralCode: e.target.value.toUpperCase() })}
                placeholder="Enter referral code for a discount"
                className="font-mono uppercase"
              />
              {form.referralCode && (
                <p className="flex items-center gap-1 text-[11px] text-green-600">
                  <Gift className="h-3 w-3" />
                  Referral code applied — you'll get a special discount!
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="o-message" className="text-xs font-semibold">Requirements (optional)</Label>
              <Textarea
                id="o-message"
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Topic, formatting style, specific instructions..."
              />
            </div>

            {/* Price summary */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Estimated Total
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-primary">
                      PKR {price.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      {Math.round(price * 1.25).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <div>{levelData.label} · {form.pages}p</div>
                  <div>Delivery: {deadlineData.label}</div>
                </div>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full gap-2" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Placing Order...
                </>
              ) : (
                <>
                  Confirm Order
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-accent" /> 100% Confidential</span>
              <span className="flex items-center gap-1"><Lock className="h-3.5 w-3.5 text-accent" /> Secure Payment</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-accent" /> Money-Back</span>
            </div>
            <p className="text-center text-[11px] text-muted-foreground">
              Need help? Call <a href={`tel:${contactInfo.phoneRaw}`} className="font-semibold text-primary">{contactInfo.phone}</a>
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
