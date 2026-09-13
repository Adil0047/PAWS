import { brand, services, faqs, contactInfo } from "@/lib/site-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://paws-research.com";

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
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/services?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
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

export function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
