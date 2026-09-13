"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { navItems, services, brand, contactInfo } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className={cn(
        "border-b backdrop-blur transition-all duration-300",
        scrolled ? "border-border bg-background/95 shadow-sm" : "border-transparent bg-background/80"
      )}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/paws-logo.png"
              alt={`${brand.shortName} logo`}
              width={64}
              height={64}
              className="h-16 w-16 object-contain"
              priority
            />
            <div className="leading-tight">
              <div className="text-base font-bold tracking-tight text-foreground">
                {brand.shortName}
              </div>
              <div className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                {brand.fullName}
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="gap-2 hidden sm:flex">
              <Link href="/order">
                <MessageSquare className="h-4 w-4" />
                Request a Quote
              </Link>
            </Button>

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] overflow-y-auto p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex items-center justify-between border-b p-4">
                  <div className="flex items-center gap-2">
                    <Image src="/paws-logo.png" alt="PAWS" width={52} height={52} className="h-13 w-13" />
                    <span className="font-bold">{brand.shortName}</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="flex flex-col gap-1 p-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive(item.href)
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/80 hover:bg-secondary"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="mt-3 border-t pt-3">
                    <div className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Services
                    </div>
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-secondary"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                </nav>
                <div className="border-t p-4">
                  <Button asChild className="w-full gap-2" onClick={() => setMobileOpen(false)}>
                    <Link href="/order">Request a Quote</Link>
                  </Button>
                  <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                    <a href={`https://wa.me/${contactInfo.whatsappRaw}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary">
                      WhatsApp: {contactInfo.whatsapp}
                    </a>
                    <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 hover:text-primary">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
