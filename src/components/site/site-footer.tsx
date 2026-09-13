"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Clock } from "lucide-react";
import { brand, contactInfo, footerLinks } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <Image
                src="/paws-logo.png"
                alt={`${brand.shortName} logo`}
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
              />
              <div className="leading-tight">
                <div className="text-base font-bold text-foreground">{brand.shortName}</div>
                <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {brand.fullName}
                </div>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              {brand.description}
            </p>
            <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
              <a href={`https://wa.me/${contactInfo.whatsappRaw}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary">
                <Phone className="h-3.5 w-3.5" /> WhatsApp: {contactInfo.whatsapp}
              </a>
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 hover:text-primary">
                <Mail className="h-3.5 w-3.5" /> {contactInfo.email}
              </a>
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" /> {contactInfo.businessHours} availability
              </div>
              <div className="mt-2 text-xs">
                <span className="font-medium text-foreground/70">Payment:</span> {contactInfo.payments}
              </div>
            </div>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Services</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {footerLinks.services.slice(0, 6).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="font-medium text-primary hover:underline">
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {brand.fullName}. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms &amp; Conditions</Link>
            <span>{brand.standards}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
