import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { StructuredData } from "@/components/site/structured-data";
import { brand } from "@/lib/site-data";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://paws-research.com";

// Next.js 16: themeColor & colorScheme live in the viewport export,
// not in metadata (deprecated since Next.js 14).
export const viewport: Viewport = {
  themeColor: "#0a1f3d",
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${brand.shortName} — ${brand.fullName}`,
    template: `%s | ${brand.shortName}`,
  },
  description: brand.description,
  keywords: [
    "PAWS",
    "Pak Academic and Writing Service",
    "research article writing",
    "medical manuscript",
    "SPSS analysis",
    "R programming",
    "Python data analytics",
    "Turnitin plagiarism check",
    "systematic review",
    "research proposal",
    "Pakistan academic services",
    "FCPS",
    "MPhil",
    "PhD",
  ],
  authors: [{ name: brand.fullName }],
  creator: brand.fullName,
  publisher: brand.fullName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: `${brand.shortName} — ${brand.fullName}`,
    description: brand.description,
    siteName: brand.shortName,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 512,
        height: 512,
        alt: `${brand.shortName} — ${brand.fullName}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.shortName} — ${brand.fullName}`,
    description: brand.description,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased bg-background text-foreground`}
      >
        <StructuredData />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
