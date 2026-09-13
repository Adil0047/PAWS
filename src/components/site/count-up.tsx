"use client";

import { useEffect, useRef, useState } from "react";

function parseValue(raw: string): { target: number; prefix: string; hasComma: boolean } {
  const prefix = "";
  const hasComma = raw.includes(",");
  const numeric = parseFloat(raw.replace(/,/g, ""));
  return { target: isNaN(numeric) ? 0 : numeric, prefix, hasComma };
}

function formatNumber(n: number, hasComma: boolean): string {
  if (hasComma) {
    return Math.round(n).toLocaleString("en-US");
  }
  // preserve decimals if any
  return Number.isInteger(n) ? String(Math.round(n)) : n.toFixed(1);
}

export function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const { target, hasComma } = parseValue(value);
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(target * eased);
            if (progress < 1) requestAnimationFrame(tick);
            else setDisplay(target);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{formatNumber(display, hasComma)}</span>;
}
