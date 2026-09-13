"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Keyboard, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Shortcut = {
  keys: string[];
  description: string;
  category: string;
};

const shortcuts: Shortcut[] = [
  { keys: ["Ctrl", "Shift", "A"], description: "Open/Close Admin Dashboard", category: "Admin" },
  { keys: ["Esc"], description: "Close any open dialog/modal", category: "Navigation" },
  { keys: ["Ctrl", "K"], description: "Focus the search (when in admin orders)", category: "Admin" },
  { keys: ["Tab"], description: "Navigate between interactive elements", category: "Navigation" },
  { keys: ["Enter"], description: "Submit forms / activate buttons", category: "Navigation" },
  { keys: ["Space"], description: "Toggle checkboxes / expand accordions", category: "Navigation" },
];

export function KeyboardShortcutsHelp() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "?" && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag !== "INPUT" && tag !== "TEXTAREA") {
          e.preventDefault();
          setOpen((o) => !o);
        }
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const categories = Array.from(new Set(shortcuts.map((s) => s.category)));

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground opacity-60 transition-all hover:opacity-100 hover:text-foreground"
        aria-label="Keyboard shortcuts help"
        title="Keyboard shortcuts (?)"
      >
        <Keyboard className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative flex items-center justify-between bg-gradient-to-r from-primary to-primary/85 p-4 text-primary-foreground">
                <div className="absolute inset-0 bg-academic-grid opacity-30" />
                <div className="relative flex items-center gap-2">
                  <Keyboard className="h-5 w-5" />
                  <h3 className="text-base font-bold">Keyboard Shortcuts</h3>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25"
                  aria-label="Close shortcuts"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Shortcuts list */}
              <div className="custom-scroll max-h-[60vh] space-y-4 overflow-y-auto p-5">
                {categories.map((category) => (
                  <div key={category}>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {category}
                    </h4>
                    <div className="space-y-2">
                      {shortcuts
                        .filter((s) => s.category === category)
                        .map((s, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-3 py-2"
                          >
                            <span className="text-sm text-foreground/80">{s.description}</span>
                            <div className="flex items-center gap-1">
                              {s.keys.map((key, j) => (
                                <kbd
                                  key={j}
                                  className="rounded border border-border bg-card px-1.5 py-0.5 text-[10px] font-semibold text-foreground shadow-sm"
                                >
                                  {key}
                                </kbd>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-border bg-secondary/30 p-3 text-center text-[11px] text-muted-foreground">
                Press <kbd className="rounded border border-border bg-card px-1 py-0.5 text-[10px] font-semibold">?</kbd> anytime to toggle this dialog
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
