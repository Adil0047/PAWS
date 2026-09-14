import { brand, services, faqs, contactInfo } from "@/lib/site-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://paws-research.com";

// ============ Shared organization reference (used by multiple schemas) ============
export const organizationRef = {
  "@type": "Organization",
  name: brand.fullName,
  alternateName: brand.shortName,
  url: SITE_URL,
  email: contactInfo.email,
  telephone: contactInfo.whatsapp,
};

// ============ Global schemas (rendered once in root layout) ============
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand.fullName,
  alternateName: brand.shortName,
  description: brand.description,
  url: SITE_URL,
  email: contactInfo.email,
  telephone: contactInfo.whatsapp,
  areaServed: {
    "@type": "Country",
    name: "Pakistan",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: brand.shortName,
  url: SITE_URL,
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "PAWS Academic & Research Services",
  serviceType: "Academic Writing, Statistical Analysis, Editorial Compliance",
  provider: {
    "@type": "Organization",
    name: brand.fullName,
    url: SITE_URL,
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "PAWS Services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.shortDescription,
      },
    })),
  },
  areaServed: {
    "@type": "Country",
    name: "Pakistan",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

// ============ Generic JSON-LD renderer ============
// Renders a single schema.org JSON-LD <script> tag. Use this for page-specific
// schemas (BlogPosting, individual Service, BreadcrumbList) instead of
// duplicating boilerplate across page files.
export function JsonLd({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ============ BlogPosting schema (page-specific, for /blog/[slug]) ============
// Uses only the real blog data already present in site-data.ts.
// `datePublished` uses post.date (e.g. "Sep 2026"); we do NOT fabricate a
// precise ISO date if the source data only has a month/year string.
export function buildBlogPostingSchema({
  slug,
  title,
  excerpt,
  date,
  author,
  image,
}: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
}) {
  const url = `${SITE_URL}/blog/${slug}`;
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    datePublished: date,
    author: {
      "@type": "Organization",
      name: author,
      url: SITE_URL,
    },
    publisher: {
      ...organizationRef,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/paws-logo.png`,
      },
    },
  };

  // Only include image if a real article image path exists.
  if (image) {
    schema.image = {
      "@type": "ImageObject",
      url: image.startsWith("http") ? image : `${SITE_URL}${image}`,
      width: 1200,
      height: 675,
    };
  }

  return schema;
}

// ============ Individual Service schema (page-specific, for /services/[slug]) ============
// Uses real service data. Offers reflect the official rate card — a price range
// is represented as min/max with priceCurrency PKR; "Custom Quote" services use
// a qualitative description instead of an invented price.
export function buildServiceSchema({
  slug,
  title,
  shortDescription,
  priceLabel,
  priceMin,
  priceMax,
  pricingBasis,
}: {
  slug: string;
  title: string;
  shortDescription: string;
  priceLabel: string;
  priceMin?: number;
  priceMax?: number;
  pricingBasis: "range" | "per-file" | "per-word" | "custom";
}) {
  const url = `${SITE_URL}/services/${slug}`;

  // Build the offers block based on the real pricing basis.
  let offers: Record<string, unknown>;
  if (pricingBasis === "custom") {
    // No exact price available — do not invent one.
    offers = {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "PKR",
        description: priceLabel,
      },
    };
  } else if (
    typeof priceMin === "number" &&
    typeof priceMax === "number"
  ) {
    // Real numeric range from the official rate card.
    offers = {
      "@type": "AggregateOffer",
      priceCurrency: "PKR",
      lowPrice: priceMin,
      highPrice: priceMax,
      offerCount: 1,
      description: priceLabel,
    };
  } else {
    // Fallback: qualitative only (no fabricated numbers).
    offers = {
      "@type": "Offer",
      priceCurrency: "PKR",
      description: priceLabel,
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description: shortDescription,
    url,
    provider: organizationRef,
    areaServed: {
      "@type": "Country",
      name: "Pakistan",
    },
    offers,
  };
}

// ============ BreadcrumbList schema ============
// `items` is an ordered list of { name, url } pairs from Home → current page.
// URLs should be absolute (resolved against SITE_URL here).
export function buildBreadcrumbListSchema(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

// ============ Global structured data (rendered in root layout) ============
// Renders Organization + WebSite + Service catalog + FAQPage schemas.
export function StructuredData() {
  return (
    <>
      <JsonLd schema={organizationSchema} />
      <JsonLd schema={websiteSchema} />
      <JsonLd schema={serviceSchema} />
      <JsonLd schema={faqSchema} />
    </>
  );
}
