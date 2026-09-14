// PAWS — Pak Academic and Writing Service
// Official site data based on the supplied rate card and terms documents.
// This is the single source of truth for all PAWS services, pricing, and content.

// ============ BRAND ============
export const brand = {
  shortName: "PAWS",
  fullName: "Pak Academic and Writing Service",
  tagline: "Manuscript Authoring • Biostatistics (SPSS, R, Python) • Publication Compliance",
  description:
    "Empowering FCPS/MD medical trainees, MPhil/PhD scholars, and university faculty across Pakistan with publication-grade manuscript writing, advanced statistical modeling, and non-repository plagiarism reduction complying with ICMJE, CARE, and PRISMA guidelines.",
  standards: "HEC • CPSP • PubMed • Scopus",
};

// ============ CONTACT ============
export const contactInfo = {
  whatsapp: "+92 333 3841005",
  whatsappRaw: "+923333841005",
  email: "yrp9291@gmail.com",
  payments: "Bank Transfer / Raast / JazzCash / EasyPaisa",
  businessHours: "24/7",
};

// ============ SERVICE CATEGORIES ============
export type ServiceCategory =
  | "Research & Medical Manuscript Writing"
  | "Plagiarism, Formatting & Editorial Compliance"
  | "Statistical Analysis & Data Science Services"
  | "Web Development";

export const categoryDescriptions: Record<ServiceCategory, string> = {
  "Research & Medical Manuscript Writing":
    "Full IMRaD manuscript drafting, research proposals, medical case reports, and systematic reviews with publication-grade quality.",
  "Plagiarism, Formatting & Editorial Compliance":
    "Non-repository Turnitin checks, scientific paraphrasing, and journal-compliant formatting with verified citations.",
  "Statistical Analysis & Data Science Services":
    "From basic SPSS descriptives to advanced R biostatistics and Python ML pipelines — reproducible scripts and APA tables included.",
  "Web Development":
    "Custom MERN stack web development for researchers, laboratories, and academic portfolios.",
};

// ============ SERVICE TYPE ============
export type PricingBasis = "range" | "per-file" | "per-word" | "custom";

export type Service = {
  slug: string;
  title: string;
  category: ServiceCategory;
  shortDescription: string;
  scope: string[];
  priceLabel: string;
  priceMin?: number;
  priceMax?: number;
  pricingBasis: PricingBasis;
  pricingNote?: string;
  turnaround: string;
  deliverables: string[];
  guidelines?: string[];
  tools?: string[];
  icon: string;
};

// ============ 12 OFFICIAL SERVICES ============
export const services: Service[] = [
  // Category 1 — Research & Medical Manuscript Writing
  {
    slug: "research-article-write-up",
    title: "Research Article Write-Up",
    category: "Research & Medical Manuscript Writing",
    shortDescription:
      "Full IMRaD manuscript drafting with recent indexed citations and verified DOIs.",
    scope: [
      "Introduction",
      "Methodology",
      "Results Narrative",
      "Discussion & Conclusion",
      "3,000–4,000 words",
      "Recent indexed citations",
      "Verified DOIs",
    ],
    priceLabel: "PKR 25,000 – 50,000",
    priceMin: 25000,
    priceMax: 50000,
    pricingBasis: "range",
    pricingNote: "Final quote depends on scope, word count, and journal requirements.",
    turnaround: "7–14 days",
    deliverables: [
      "Complete IMRaD manuscript",
      "Reference list with verified DOIs",
      "Formatted per target journal guidelines",
    ],
    guidelines: ["IMRaD", "ICMJE"],
    icon: "FileText",
  },
  {
    slug: "synopsis-research-proposal",
    title: "Synopsis / Research Proposal",
    category: "Research & Medical Manuscript Writing",
    shortDescription:
      "HEC/CPSP approved format with clear problem statement, methodology, and literature review.",
    scope: [
      "HEC/CPSP approved format",
      "Clear problem statement",
      "Operational definitions",
      "Hypothesis",
      "Detailed methodology",
      "Literature review",
      "1,500–2,500 words",
    ],
    priceLabel: "PKR 12,000 – 25,000",
    priceMin: 12000,
    priceMax: 25000,
    pricingBasis: "range",
    pricingNote: "Final quote depends on scope and institutional requirements.",
    turnaround: "4–7 days",
    deliverables: [
      "Complete synopsis/proposal document",
      "Reference list",
      "Methodology framework",
    ],
    guidelines: ["HEC", "CPSP"],
    icon: "FileSearch",
  },
  {
    slug: "medical-case-report",
    title: "Medical Case Report",
    category: "Research & Medical Manuscript Writing",
    shortDescription:
      "Clinical case presentation with diagnostic timeline and CARE checklist compliance.",
    scope: [
      "Clinical case presentation",
      "Diagnostic timeline",
      "Discussion against global literature",
      "Complete adherence to CARE checklist guidelines",
      "1,200–1,800 words",
    ],
    priceLabel: "PKR 10,000 – 20,000",
    priceMin: 10000,
    priceMax: 20000,
    pricingBasis: "range",
    pricingNote: "Final quote depends on case complexity and target journal.",
    turnaround: "3–5 days",
    deliverables: [
      "Complete case report manuscript",
      "CARE checklist compliance",
      "Reference list",
    ],
    guidelines: ["CARE"],
    icon: "Stethoscope",
  },
  {
    slug: "systematic-review-meta-analysis",
    title: "Systematic Review / Meta-Analysis",
    category: "Research & Medical Manuscript Writing",
    shortDescription:
      "PRISMA-compliant systematic review with comprehensive database search and forest-plot synthesis.",
    scope: [
      "PRISMA guideline compliance",
      "Comprehensive database search strategy",
      "PubMed / Scopus / Cochrane",
      "Systematic data-extraction tables",
      "Forest-plot synthesis",
    ],
    priceLabel: "PKR 45,000 – 90,000",
    priceMin: 45000,
    priceMax: 90000,
    pricingBasis: "range",
    pricingNote: "Final quote depends on number of studies, databases, and complexity.",
    turnaround: "14–21 days",
    deliverables: [
      "Complete systematic review manuscript",
      "PRISMA flow diagram",
      "Data extraction tables",
      "Forest plots",
    ],
    guidelines: ["PRISMA"],
    icon: "BookOpenCheck",
  },

  // Category 2 — Plagiarism, Formatting & Editorial Compliance
  {
    slug: "plagiarism-check-turnitin",
    title: "Plagiarism Check (Turnitin)",
    category: "Plagiarism, Formatting & Editorial Compliance",
    shortDescription:
      "Official instructor-account PDF report with similarity index & AI score. 100% Non-Repository.",
    scope: [
      "Official instructor-account PDF report",
      "Similarity index",
      "AI score",
      "100% Non-Repository (file never saved or indexed)",
    ],
    priceLabel: "PKR 300 – 1,000 / file",
    priceMin: 300,
    priceMax: 1000,
    pricingBasis: "per-file",
    pricingNote: "Price per file depends on document length.",
    turnaround: "15–60 mins",
    deliverables: [
      "Official Turnitin PDF report",
      "Similarity index percentage",
      "AI-generated content score",
    ],
    icon: "ShieldCheck",
  },
  {
    slug: "plagiarism-reduction-rewriting",
    title: "Plagiarism Reduction & Rewriting",
    category: "Plagiarism, Formatting & Editorial Compliance",
    shortDescription:
      "Manual scientific paraphrasing reducing similarity from >30% to <15% without distorting core findings.",
    scope: [
      "Manual scientific paraphrasing",
      "Reduces similarity from >30% to <15%",
      "No distortion of core findings",
      "Maintains academic meaning",
    ],
    priceLabel: "PKR 1.5 – 3.0 / word (or PKR 5,000 – 12,000 / paper)",
    priceMin: 5000,
    priceMax: 12000,
    pricingBasis: "per-word",
    pricingNote: "Per-word rate or per-paper rate available. Final quote depends on word count and similarity level.",
    turnaround: "2–4 days",
    deliverables: [
      "Rewritten manuscript with reduced similarity",
      "Updated Turnitin report showing improvement",
      "Preserved academic meaning and findings",
    ],
    icon: "PenLine",
  },
  {
    slug: "journal-formatting-referencing",
    title: "Journal Formatting & Referencing",
    category: "Plagiarism, Formatting & Editorial Compliance",
    shortDescription:
      "Aligning margins, headings, word counts, and EndNote/Mendeley citations per journal requirements.",
    scope: [
      "Margins, headings, word counts alignment",
      "EndNote/Mendeley citations",
      "Vancouver",
      "APA 7th",
      "Harvard",
      "IEEE",
    ],
    priceLabel: "PKR 2,500 – 6,000",
    priceMin: 2500,
    priceMax: 6000,
    pricingBasis: "range",
    pricingNote: "Final quote depends on document length and formatting complexity.",
    turnaround: "1–2 days",
    deliverables: [
      "Journal-compliant formatted document",
      "Properly styled reference list",
      "Citation management file (if applicable)",
    ],
    icon: "AlignLeft",
  },

  // Category 3 — Statistical Analysis & Data Science Services
  {
    slug: "basic-spss-analysis",
    title: "Basic SPSS Analysis",
    category: "Statistical Analysis & Data Science Services",
    shortDescription:
      "Descriptives, Chi-Square, t-tests, ANOVA with APA-formatted summary tables and basic interpretation.",
    scope: [
      "Descriptives",
      "Chi-Square test",
      "Independent/Paired t-tests",
      "One-way ANOVA",
      "APA-formatted summary tables",
      "Basic interpretation",
    ],
    priceLabel: "PKR 8,000 – 15,000",
    priceMin: 8000,
    priceMax: 15000,
    pricingBasis: "range",
    pricingNote: "Final quote depends on dataset size and number of variables.",
    turnaround: "2–4 days",
    deliverables: [
      "SPSS output with APA-formatted tables",
      "Clean SPSS syntax script",
      "Basic statistical interpretation",
    ],
    tools: ["SPSS"],
    icon: "Calculator",
  },
  {
    slug: "advanced-spss-smartpls-amos",
    title: "Advanced SPSS / SmartPLS / AMOS",
    category: "Statistical Analysis & Data Science Services",
    shortDescription:
      "Logistic regression, factor analysis, SEM, reliability analysis with detailed interpretation.",
    scope: [
      "Binary/Multinomial Logistic Regression",
      "Multiple Linear Regression",
      "Factor Analysis",
      "SEM (Structural Equation Modeling)",
      "Reliability analysis",
      "Detailed interpretation",
    ],
    priceLabel: "PKR 15,000 – 30,000",
    priceMin: 15000,
    priceMax: 30000,
    pricingBasis: "range",
    pricingNote: "Final quote depends on model complexity and number of analyses.",
    turnaround: "3–6 days",
    deliverables: [
      "Complete analysis output",
      "SPSS/SmartPLS/AMOS syntax/project files",
      "Detailed statistical interpretation",
      "APA-formatted tables",
    ],
    tools: ["SPSS", "SmartPLS", "AMOS"],
    icon: "BarChart3",
  },
  {
    slug: "r-programming-biostatistics",
    title: "R Programming & Biostatistics",
    category: "Statistical Analysis & Data Science Services",
    shortDescription:
      "Survival analysis, Kaplan-Meier, Cox Proportional Hazards with high-res ggplot2 visualizations.",
    scope: [
      "Survival analysis",
      "Kaplan-Meier curves",
      "Cox Proportional Hazards model",
      "High-resolution ggplot2 visualizations",
      "Reproducible .Rmd script",
    ],
    priceLabel: "PKR 25,000 – 45,000",
    priceMin: 25000,
    priceMax: 45000,
    pricingBasis: "range",
    pricingNote: "Final quote depends on analysis complexity and data volume.",
    turnaround: "4–7 days",
    deliverables: [
      "Complete R analysis with .Rmd script",
      "High-resolution ggplot2 figures (300+ DPI)",
      "Statistical interpretation",
      "Reproducible code pipeline",
    ],
    tools: ["R", "ggplot2", "survival"],
    icon: "LineChart",
  },
  {
    slug: "python-data-analytics-ml",
    title: "Python Data Analytics & ML",
    category: "Statistical Analysis & Data Science Services",
    shortDescription:
      "Data cleaning, exploratory analytics, predictive ML models with 300+ DPI plots and pipeline script.",
    scope: [
      "Data cleaning and recoding using Pandas",
      "Exploratory analytics",
      "Predictive ML models",
      "Train/test split",
      "300+ DPI plots",
      "Pipeline script",
    ],
    priceLabel: "PKR 30,000 – 60,000",
    priceMin: 30000,
    priceMax: 60000,
    pricingBasis: "range",
    pricingNote: "Final quote depends on data volume, model complexity, and project scope.",
    turnaround: "5–8 days",
    deliverables: [
      "Jupyter notebook with complete pipeline",
      "Trained ML model with evaluation metrics",
      "300+ DPI publication-ready plots",
      "Clean, documented Python code",
    ],
    tools: ["Python", "Pandas", "scikit-learn"],
    icon: "Cpu",
  },

  // Category 4 — Web Development
  {
    slug: "mern-stack-web-development",
    title: "MERN Stack Web Development",
    category: "Web Development",
    shortDescription:
      "Custom MERN stack web development for researchers, laboratories, and academic portfolios.",
    scope: [
      "MongoDB, Express.js, React, Node.js",
      "Custom web applications",
      "Researcher portfolios",
      "Laboratory management systems",
      "Academic tool development",
    ],
    priceLabel: "Custom Quote",
    pricingBasis: "custom",
    pricingNote: "Contact PAWS for a custom quote tailored to your project requirements.",
    turnaround: "Project-dependent",
    deliverables: [
      "Full-stack web application",
      "Source code with documentation",
      "Deployment guidance",
    ],
    tools: ["MongoDB", "Express", "React", "Node.js"],
    icon: "Code",
  },
];

// ============ WHY CHOOSE PAWS (official rate card points) ============
export const whyChoosePaws = [
  {
    title: "100% Non-Repository Turnitin",
    description:
      "Your file is never saved or indexed in the Turnitin repository. Your intellectual property and data remain strictly confidential.",
  },
  {
    title: "Reproducible Scripts & Data",
    description:
      "We deliver clean SPSS syntax, RMarkdown files, or Python Jupyter notebooks alongside structured APA tables for complete transparency.",
  },
  {
    title: "Dedicated Revision Guarantee",
    description:
      "Includes 2 complimentary revision rounds within 14 days of delivery to address supervisor suggestions or reviewer comments.",
  },
];

// ============ 4-STEP ONBOARDING ============
export const onboardingSteps = [
  {
    step: "01",
    title: "Share Brief & Data",
    description:
      "Send your research topic, objectives, raw dataset / Excel file, and target journal guidelines.",
  },
  {
    step: "02",
    title: "Custom Quote",
    description:
      "Receive an itemized price quote and agreed timeline. Confirm with 50% advance payment.",
  },
  {
    step: "03",
    title: "Draft & Review",
    description:
      "Receive watermarked output, APA tables, and a non-repository Turnitin report for preliminary review.",
  },
  {
    step: "04",
    title: "Final Delivery",
    description:
      "Clear the final balance to receive editable Word/Excel documents, code scripts, and high-resolution figures.",
  },
];

// ============ FAQ (based on official information only) ============
export const faqs = [
  {
    question: "What services does PAWS offer?",
    answer:
      "PAWS offers research and medical manuscript writing, plagiarism checking and reduction, journal formatting, statistical analysis (SPSS, R, Python), and MERN stack web development. See our Services page for the full catalogue.",
  },
  {
    question: "How much does a Research Article Write-Up cost?",
    answer:
      "The official rate for a Research Article Write-Up is PKR 25,000 – 50,000, depending on scope, word count, and journal requirements. Request a quote for a final price.",
  },
  {
    question: "What is the turnaround for Python Data Analytics & ML?",
    answer:
      "The official turnaround for Python Data Analytics & ML is 5–8 days, depending on data volume and model complexity.",
  },
  {
    question: "Do you offer Turnitin plagiarism checks?",
    answer:
      "Yes. PAWS offers 100% non-repository Turnitin checks with an official instructor-account PDF report including similarity index and AI score. The rate is PKR 300 – 1,000 per file.",
  },
  {
    question: "What is the plagiarism reduction rate?",
    answer:
      "Plagiarism reduction & rewriting is priced at PKR 1.5 – 3.0 per word, or PKR 5,000 – 12,000 per paper. The service reduces similarity from >30% to <15% without distorting core findings.",
  },
  {
    question: "How do I request a quote?",
    answer:
      "You can request a quote by visiting our Order page, contacting us on WhatsApp at +92 333 3841005, or emailing yrp9291@gmail.com. Share your research topic, objectives, and dataset to receive an itemized quote.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "PAWS accepts Bank Transfer, Raast, JazzCash, and EasyPaisa. A 50% advance payment is required to confirm your project.",
  },
  {
    question: "Do you offer MERN stack web development?",
    answer:
      "Yes, PAWS offers custom MERN stack web development for researchers, laboratories, and academic portfolios. Contact us for a custom quote as pricing is project-dependent.",
  },
  {
    question: "How many revision rounds are included?",
    answer:
      "PAWS includes 2 complimentary revision rounds within 14 days of delivery to address supervisor suggestions or reviewer comments.",
  },
  {
    question: "Are my files kept confidential?",
    answer:
      "Yes. PAWS maintains strict non-disclosure standards. Datasets, research findings, draft manuscripts, and client identities are kept completely confidential and are never shared, sold, or repurposed.",
  },
];

// ============ NAVIGATION ============
export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Blog", href: "/blog" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

// ============ FOOTER LINKS ============
export const footerLinks = {
  company: [
    { label: "About", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Contact", href: "/contact" },
    { label: "Reviews", href: "/reviews" },
    { label: "Blog", href: "/blog" },
  ],
  services: services.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Track Order", href: "/track-order" },
    { label: "Request Quote", href: "/order" },
  ],
};

// ============ BLOG POSTS (preserved but cleaned of unsupported claims) ============
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  accent: string;
  image: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "imrad-structure-guide",
    title: "Understanding the IMRaD Structure for Research Manuscripts",
    excerpt:
      "A clear guide to the Introduction, Methods, Results, and Discussion format used in academic and medical publishing.",
    category: "Manuscript Writing",
    readTime: "6 min read",
    date: "Sep 2026",
    author: "PAWS Editorial Team",
    accent: "from-blue-500 to-teal-600",
    image: "/images/blog-thesis-structure.png",
    content: [
      "The IMRaD structure — Introduction, Methods, Results, and Discussion — is the standard format for scientific and medical manuscripts. Understanding how to organize each section is essential for publication success.",
      "The Introduction establishes the context, states the research problem, and presents your hypothesis or research question. It should move from broad context to specific objectives, ending with a clear statement of what the study aims to achieve.",
      "The Methods section must provide enough detail for another researcher to replicate the study. Include study design, population, data collection procedures, statistical analysis plan, and ethical considerations. Transparency here is critical for peer review.",
      "Results should present findings objectively, using tables and figures to organize data. Avoid interpreting results in this section — save that for the Discussion. Use APA-formatted tables for clarity and consistency.",
      "The Discussion interprets findings in the context of existing literature, acknowledges limitations, and suggests future research directions. This is where you demonstrate the significance of your work and its contribution to the field.",
    ],
  },
  {
    slug: "turnitin-non-repository-guide",
    title: "Why Non-Repository Turnitin Matters for Your Research",
    excerpt:
      "Understanding the difference between repository and non-repository plagiarism checks and why it matters for your publication.",
    category: "Plagiarism",
    readTime: "4 min read",
    date: "Sep 2026",
    author: "PAWS Editorial Team",
    accent: "from-teal-500 to-cyan-600",
    image: "/images/blog-plagiarism.png",
    content: [
      "When you submit a document to Turnitin through a standard student account, the file is saved in the Turnitin repository. This means future submissions of the same document will show 100% similarity — a problem for publication.",
      "A non-repository Turnitin check uses an official instructor account that generates the similarity report without saving your file. This protects your intellectual property and ensures your manuscript won't be flagged in future checks.",
      "PAWS offers 100% non-repository Turnitin checks with an official instructor-account PDF report. Your file is never saved or indexed, and your data remains strictly confidential.",
      "The report includes both the similarity index (percentage of matched text) and an AI-generated content score, giving you a comprehensive view of your document's originality before submission.",
    ],
  },
  {
    slug: "spss-vs-r-vs-python",
    title: "SPSS vs R vs Python: Choosing the Right Tool for Your Analysis",
    excerpt:
      "A practical comparison of the three most popular statistical analysis tools for researchers.",
    category: "Data Analysis",
    readTime: "7 min read",
    date: "Sep 2026",
    author: "PAWS Editorial Team",
    accent: "from-indigo-500 to-blue-600",
    image: "/images/blog-time-mgmt.png",
    content: [
      "Choosing between SPSS, R, and Python depends on your research needs, statistical complexity, and programming experience.",
      "SPSS is ideal for basic statistical analysis — descriptives, t-tests, ANOVA, chi-square. Its point-and-click interface makes it accessible for researchers without programming experience. PAWS offers basic SPSS analysis starting from PKR 8,000.",
      "R excels at advanced biostatistics, particularly survival analysis, Kaplan-Meier curves, and Cox Proportional Hazards models. The ggplot2 library produces publication-ready visualizations. PAWS offers R programming services from PKR 25,000.",
      "Python is the go-to choice for data analytics and machine learning. With Pandas for data cleaning and scikit-learn for predictive modeling, Python handles complex data pipelines efficiently. PAWS offers Python data analytics from PKR 30,000.",
      "For SEM and structural equation modeling, SmartPLS and AMOS are specialized tools that complement SPSS. PAWS offers advanced analysis with these tools from PKR 15,000.",
    ],
  },
  {
    slug: "prisma-guidelines-explained",
    title: "PRISMA Guidelines for Systematic Reviews: A Quick Overview",
    excerpt:
      "What PRISMA is, why it matters, and how to ensure your systematic review meets the standard.",
    category: "Research",
    readTime: "5 min read",
    date: "Sep 2026",
    author: "PAWS Editorial Team",
    accent: "from-violet-500 to-purple-600",
    image: "/images/blog-research-topic.png",
    content: [
      "PRISMA (Preferred Reporting Items for Systematic Reviews and Meta-Analyses) is a set of evidence-based guidelines for reporting systematic reviews and meta-analyses.",
      "The PRISMA flow diagram is a key deliverable that shows the number of records identified, screened, eligible, and included in the review. It provides transparency in the study selection process.",
      "A comprehensive systematic review requires searching multiple databases (PubMed, Scopus, Cochrane), systematic data extraction, and often forest-plot synthesis for meta-analysis.",
      "PAWS offers PRISMA-compliant systematic review and meta-analysis services from PKR 45,000, with turnaround times of 14–21 days depending on complexity.",
    ],
  },
  {
    slug: "care-checklist-case-reports",
    title: "The CARE Checklist for Medical Case Reports",
    excerpt:
      "Understanding the CARE guidelines and how they ensure quality in clinical case reporting.",
    category: "Manuscript Writing",
    readTime: "4 min read",
    date: "Sep 2026",
    author: "PAWS Editorial Team",
    accent: "from-rose-500 to-pink-600",
    image: "/images/blog-dissertation.png",
    content: [
      "The CARE (CAse REport) guidelines provide a framework for writing and evaluating medical case reports. They ensure completeness, transparency, and usefulness in clinical case reporting.",
      "A well-structured case report includes: patient demographics, clinical presentation, diagnostic timeline, therapeutic interventions, follow-up, and discussion against global literature.",
      "PAWS offers medical case report writing with complete adherence to CARE checklist guidelines, typically 1,200–1,800 words, with a turnaround of 3–5 days.",
    ],
  },
  {
    slug: "citation-styles-guide",
    title: "Vancouver, APA 7th, Harvard, IEEE: Choosing the Right Citation Style",
    excerpt:
      "A quick reference to the most common citation styles used in academic and medical publishing.",
    category: "Editorial Compliance",
    readTime: "5 min read",
    date: "Sep 2026",
    author: "PAWS Editorial Team",
    accent: "from-amber-500 to-orange-600",
    image: "/images/blog-referencing.png",
    content: [
      "Different journals and academic institutions require different citation styles. Using the correct style is essential for publication acceptance.",
      "Vancouver style is commonly used in medical and biomedical journals. It uses numbered citations in text (e.g., [1]) with a numbered reference list.",
      "APA 7th edition is widely used in social sciences, education, and psychology. It uses author-date in-text citations (e.g., Khan, 2024).",
      "Harvard style is similar to APA with subtle formatting differences. It's commonly used in UK and Australian institutions.",
      "IEEE style is used in engineering and computer science. It uses numbered citations in square brackets (e.g., [1]).",
      "PAWS offers journal formatting and referencing services for all major citation styles, with turnaround times of 1–2 days.",
    ],
  },
];

export const blogCategories = [
  "All",
  "Manuscript Writing",
  "Plagiarism",
  "Data Analysis",
  "Research",
  "Editorial Compliance",
];

// ============ BLOG ↔ SERVICE RELATIONSHIPS ============
// Explicit, content-driven mapping between existing blog posts and existing
// services. Used for contextual internal linking (blog → services and
// services → blog). No invented content — just declares which existing
// entities are topically related based on their real subject matter.
export const blogServiceLinks: Record<string, string[]> = {
  "imrad-structure-guide": ["research-article-write-up"],
  "turnitin-non-repository-guide": ["plagiarism-check-turnitin"],
  "spss-vs-r-vs-python": [
    "basic-spss-analysis",
    "r-programming-biostatistics",
    "python-data-analytics-ml",
    "advanced-spss-smartpls-amos",
  ],
  "prisma-guidelines-explained": ["systematic-review-meta-analysis"],
  "care-checklist-case-reports": ["medical-case-report"],
  "citation-styles-guide": ["journal-formatting-referencing"],
};

// Reverse lookup: for a given service slug, return the blog slugs that
// reference it. Built once from blogServiceLinks so the relationship is
// always bidirectional and consistent.
export const serviceBlogLinks: Record<string, string[]> = services.reduce(
  (acc, service) => {
    const linkedBlogSlugs = Object.entries(blogServiceLinks)
      .filter(([, serviceSlugs]) => serviceSlugs.includes(service.slug))
      .map(([blogSlug]) => blogSlug);
    acc[service.slug] = linkedBlogSlugs;
    return acc;
  },
  {} as Record<string, string[]>,
);

// ============ SAMPLES ============
export type Sample = {
  title: string;
  discipline: string;
  level: string;
  pages: number;
  format: string;
  file: string;
};

export const samples: Sample[] = [
  {
    title: "Emotional Marketing",
    discipline: "Marketing",
    level: "Master's",
    pages: 30,
    format: "APA",
    file: "/samples/sample-emotional-marketing.pdf",
  },
  {
    title: "Flight Security",
    discipline: "Aviation Security",
    level: "Undergraduate",
    pages: 32,
    format: "APA",
    file: "/samples/sample-flight-security.pdf",
  },
  {
    title: "Transactional Leadership",
    discipline: "Leadership",
    level: "Master's",
    pages: 40,
    format: "Harvard",
    file: "/samples/sample-transactional-leadership.pdf",
  },
];
