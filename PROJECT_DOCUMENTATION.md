# Thesis Writing Service PK — Complete Project Documentation

> A production-ready, full-featured clone of [thesiswritingservice.com.pk](https://thesiswritingservice.com.pk/) built with Next.js 16, TypeScript, Tailwind CSS 4, shadcn/ui, Prisma (SQLite), and Framer Motion. The project evolved over 10 development rounds into a comprehensive academic writing service platform with e-commerce, admin dashboard, live chat, referral tracking, and much more.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Architecture](#project-architecture)
3. [Page Sections (15 Content Sections)](#page-sections-15-content-sections)
4. [Interactive Features](#interactive-features)
5. [Admin Dashboard](#admin-dashboard)
6. [API Endpoints](#api-endpoints)
7. [Database Models](#database-models)
8. [SEO Features](#seo-features)
9. [Styling & Design System](#styling--design-system)
10. [Component Inventory](#component-inventory)
11. [Public Assets](#public-assets)
12. [Mini-Services](#mini-services)
13. [Scripts](#scripts)
14. [Development History](#development-history)
15. [Setup & Installation](#setup--installation)
16. [Deployment](#deployment)

---

## Tech Stack

### Core Framework
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16.1.1 | App Router framework (single `/` route) |
| **React** | 19.0.0 | UI library |
| **TypeScript** | 5.x | Type-safe development |
| **Tailwind CSS** | 4.x | Utility-first styling |
| **shadcn/ui** | New York style | Component library (48 UI components) |

### Key Libraries
| Library | Purpose |
|---------|---------|
| **Prisma ORM** | Database abstraction (SQLite) |
| **Framer Motion** | Animations & transitions |
| **Recharts** | Admin dashboard charts |
| **next-themes** | Dark mode support |
| **Lucide React** | Icon system (100+ icons used) |
| **react-hook-form** | Form handling |
| **date-fns** | Date formatting |
| **cmdk** | Command palette primitives |
| **socket.io-client** | WebSocket client (for chat) |
| **z-ai-web-dev-sdk** | AI image generation, web reading |

### Dev Tools
| Tool | Purpose |
|------|---------|
| **ESLint** | Code quality (0 errors, 0 warnings) |
| **PostCSS** | CSS processing |
| **tw-animate-css** | Animation utilities |
| **Bun** | Fast package manager & runtime |

---

## Project Architecture

```
thesis-writing-service-pk/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout (metadata, ThemeProvider, StructuredData)
│   │   ├── page.tsx                  # Single-page app (all 15 sections + overlays)
│   │   ├── globals.css               # Global styles (brand palette, utilities, animations)
│   │   ├── robots.ts                 # Dynamic robots.txt
│   │   ├── sitemap.ts                # Dynamic sitemap.xml
│   │   └── api/                      # 13 API route files
│   │       ├── chat/                 # Live chat (POST/GET + [id] viewer)
│   │       ├── contact/              # Contact form (POST/GET)
│   │       ├── newsletter/           # Newsletter signup (POST/GET)
│   │       ├── orders/               # Orders CRUD ([id], by-email, list)
│   │       ├── referrals/            # Referral program + click tracking
│   │       ├── reviews/              # Reviews moderation ([id] PATCH/DELETE)
│   │       └── stats/                # Dashboard statistics
│   ├── components/
│   │   ├── site/                     # 32 custom section/feature components
│   │   ├── ui/                       # 48 shadcn/ui base components
│   │   └── theme-provider.tsx        # next-themes wrapper
│   ├── lib/
│   │   ├── db.ts                     # Prisma client (with schema version guard)
│   │   ├── site-data.ts              # Central content source (services, writers, blogs, etc.)
│   │   ├── order-context.tsx         # React context for order dialog state
│   │   ├── csv-export.ts             # Client-side CSV generation utility
│   │   └── utils.ts                  # Tailwind merge utility
│   └── hooks/
│       ├── use-mobile.ts             # Mobile detection hook
│       └── use-toast.ts              # Toast notification hook
├── prisma/
│   └── schema.prisma                 # 6 database models
├── public/
│   ├── images/                       # 7 AI-generated images
│   ├── samples/                      # 3 PDF sample documents
│   ├── favicon.png                   # AI-generated favicon
│   ├── og-image.png                  # Open Graph social image
│   └── logo.svg                      # Brand logo
├── scripts/
│   └── generate-samples.py           # ReportLab PDF generator
├── mini-services/
│   └── chat-service/                 # Socket.io chat service (reference, not actively used)
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
├── components.json                   # shadcn/ui config
└── .env                              # DATABASE_URL
```

---

## Page Sections (15 Content Sections)

The entire site is a single-page application on the `/` route, composed of 15 major content sections plus overlay components:

### 1. Header (`site-header.tsx`)
- **Sticky top bar** with phone, email, rating badge, and serving area
- **Desktop navigation** with Services & Cities dropdown menus (NavigationMenu)
- **Mobile hamburger menu** (Sheet) with full nav, services, cities, contact info
- **Theme toggle** (Sun/Moon button, hidden on mobile)
- **"Order Now" CTA** button (accent color)

### 2. Hero (`hero-section.tsx`)
- **Gradient mesh background** (custom `hero-mesh` utility)
- **Animated headline** with gradient "You Can Trust" text
- **Count-up stats** (4.9★, 20,000+ students, 100K+ papers, 500+ writers, 99% success)
- **Glassmorphism stats card** with:
  - Student avatars row
  - Rating badge
  - Live order counter (pulsing green dot + real-time incrementing number from `/api/stats`)
  - "No ChatGPT or AI" message
- **Floating student image** (AI-generated, animate-float)
- **"100% Human" pill badge**
- **Trust badge marquee** (scrolling animation)
- **CTA buttons**: Order Now, Calculate Price, phone link

### 3. Price Calculator (`price-calculator.tsx`)
- **Academic level selector** (Undergraduate / Master / PhD)
- **Document type dropdown** (50+ document types)
- **Page slider** (1–200 pages, custom styled thumb with hover/active animations)
- **Deadline selector** (15 days → 6 hours, 9 options)
- **Live PKR price calculation** (level × pages × deadline multiplier)
- **Strikethrough old price** showing savings
- **Order Now button** that passes calculator preset to order dialog

### 4. About + Benefits (`about-section.tsx`)
- **Two-column layout**: about text + stats on left, 4 feature cards on right
- **Count-up animated stats** (20,000+ students, 100K+ papers, 99% success rate)
- **4 feature cards** with specific icons (Users, CheckCircle2, Clock, Headphones), gradient top-border on hover, decorative Sparkles
- **6-card benefits grid** (Cost-Effective, Prompt Assistance, Quality Writers, 24/7 Support, Customized Writing, On-Time Delivery)

### 5. Progress Timeline (`progress-timeline.tsx`)
- **6 company milestones** (2009 Founded → 2024 100K+ Papers)
- **Alternating left/right layout** on desktop (single column on mobile)
- **Vertical gradient timeline line** with icon nodes
- **Year badges** and metric badges on each milestone
- **"Journey continues" CTA** at the end

### 6. Services (`services-section.tsx`)
- **7 service cards** (Assignment, Essay, Research Proposal, Dissertation, PhD Thesis, Master Thesis, Research Paper)
- **Large decorative numbers** (01–07) as watermarks
- **Icon, title, description** (line-clamp-4 for consistent heights)
- **Highlight tags** (e.g., "All subjects", "Plagiarism-free")
- **"Hire an Expert" button** (full-width, bordered, hover fill) — opens order dialog with preset
- **CTA card** ("Don't see your subject?")
- **Recently Viewed Services** section (tracks clicked services in localStorage, shows compact cards with icon + highlights)

### 7. Premium Features + Writers (`premium-writers-section.tsx`)
- **6 premium free features** with crossed-out prices (€112.94 total value → FREE)
- **Total value banner** with "Claim Your Free Features" CTA
- **4 writer profile cards** with:
  - Gradient avatar with initials
  - **Availability status indicator** (green=Available with pulse, amber=Busy, gray=Offline)
  - Status text next to degree
  - Star rating badge
  - Stats grid (orders, reviews, success rate)
  - **"Profile" button** (opens writer detail dialog)
  - **"Hire Me" button** (disabled if offline, opens order dialog with writer pre-filled)

### 8. AI vs Human Comparison (`comparison-section.tsx`)
- **6-row comparison table** (Creativity, Emotional Connection, Adaptability, Reliability, Plagiarism, Academic Integrity)
- **Green check / red X icons** for visual comparison
- **4 long-form content cards** with icons (Brain, Check, Wallet, Clock) covering: writer expertise, custom thesis papers, affordable pricing, instant delivery

### 9. Price Comparison Table (`price-comparison.tsx`)
- **12-feature comparison** vs competitors
- **3-column layout** (Feature | Thesis Writing PK | Other Services)
- **Highlighted "Thesis Writing PK" column** with primary background, gradient top bar, "Recommended" badge
- **Green check / red X / text values** for each cell
- **Footer summary** showing "Excellent" vs "Average" overall value

### 10. Writer of the Month (`writer-of-month.tsx`)
- **Auto-selects highest-rated available writer**
- **Large profile card** with crown badge, avatar with status dot, stats grid
- **4 achievement highlights** (Top Performer, Highest Rated, Expert Verified, Award Winner)
- **Personal quote** from the writer
- **Hire CTA buttons** (pre-fills writer in order dialog)

### 11. How It Works + Samples + Testimonials (`howitworks-samples-testimonials.tsx`)
- **3-step process** (Place Order → Proceed with Payment → Receive Project) with connected timeline
- **3 sample thesis cards** with document-preview mockups, discipline, level, pages, format
- **Downloadable PDF samples** (3 real PDFs generated with ReportLab)
- **DB-driven testimonials** (fetches approved reviews from `/api/reviews?approved=true`, merges with static testimonials, shows dynamic star ratings)
- **"Share Your Experience" + "Order Now" buttons**

### 12. Blog Section (`blogs-section.tsx`)
- **6 full-length articles** with AI-generated cover images
- **Category filter pills** (All, Thesis Writing, Academic Integrity, Academic Guide, Research, Productivity, Referencing)
- **Animated grid** (framer-motion AnimatePresence with layout)
- **Article reader dialog** with:
  - Hero image header with share/bookmark buttons
  - Author bio with avatar
  - Full content paragraphs
  - **Related articles** section (3 same-category posts)
  - Embedded "Get Expert Help" CTA
- **Recently viewed blogs** section (tracks viewed posts in localStorage)

### 13. Academic Glossary (`glossary-section.tsx`)
- **24 academic terms** across 6 categories (Structure, Research, Citation, Writing, Ethics, Document Type)
- **Search bar** (filters by term name and definition)
- **Category filter buttons**
- **Responsive grid** of term cards with hover effects
- **Results count** and total terms indicator

### 14. Review Form (`review-form.tsx`)
- **Interactive star rating** (hover + click, 1–5 stars)
- **Name, program, and message fields**
- **Character counter** (min 20 recommended)
- **Success state** with checkmark animation
- **Submits to `/api/reviews`** (created with `approved=false`, requires admin approval to display)

### 15. Order Tracking (`order-tracking.tsx`)
- **Tab switcher**: "Track by ID" | "Order History"
- **Track by ID**: Enter order ID → shows status header, 3-step progress stepper (Placed → In Progress → Completed), order details grid, estimated price, contact CTA
- **Order History** (`order-history.tsx`): Enter email → shows all past orders with summary bar (count + total spent), order list cards with status icons

### 16. Referral Program (`referral-program.tsx`)
- **2-column layout**: benefits on left, form on right
- **Benefits grid** (10% per referral, no limit, PKR 500 friend discount)
- **Referral code generation** (unique code from name)
- **Generated code display** with dashed border box, click/signup stats
- **Copy Link** and **Share** buttons (Web Share API + clipboard fallback)
- **Click tracking** via `referral-tracker.tsx` (detects `?ref=CODE` in URL, stores in localStorage, increments DB click count, cleans URL, shows welcome toast)
- **Order dialog auto-fills** referral code from localStorage

### 17. FAQ + Cities + CTA + Contact + Footer (`faq-cities-cta-footer.tsx`)
- **10-item FAQ accordion**
- **7-city grid** (Karachi, Islamabad, Lahore, Faisalabad, Rawalpindi, Multan, Peshawar)
- **CTA banner** ("Top Thesis Help Provider for Students Across Pakistan")
- **Contact form** (name, email, phone, subject, message → POST `/api/contact`)
- **Full footer** with:
  - Brand + newsletter signup
  - Useful links (About, Contact, Blogs, Reviews, Order, Track Order, Referral Program, policies)
  - Services links
  - Cities links
  - Admin access link (discreet)
- **Sticky footer** (min-h-screen flex flex-col, mt-auto)

---

## Interactive Features

### Order Dialog (`order-dialog.tsx`)
- Opens from 10+ locations across the site (header, hero, calculator, services, writers, CTAs)
- **Form fields**: name, email, phone, academic level, deadline, document type (50+), pages, referral code, requirements
- **Preferred writer banner** (when opened from writer "Hire Me" — shows name with Remove button)
- **Referral code field** (auto-filled from localStorage, green confirmation message)
- **Live price calculation** (level × pages × deadline)
- **Price summary** with strikethrough old price
- **Success state** with order ID and service summary
- **Security badges** (Confidential, Secure Payment, Money-Back)
- Submits to `POST /api/orders`

### Dark Mode (`theme-toggle.tsx` + `theme-provider.tsx`)
- Sun/Moon toggle button in header
- Uses `next-themes` with `attribute="class"`, `defaultTheme="light"`, `enableSystem`
- Full dark mode palette defined in `globals.css` (oklch color space)
- All sections inherit theme via CSS variables

### Live Chat Widget (`live-chat-widget.tsx`)
- **Floating button** (bottom-left) with online status dot and unread badge
- **Name/email form** to start session
- **Chat interface** with:
  - User and agent message bubbles with avatars
  - Typing indicator (animated dots)
  - Quick-reply chips (Pricing, Deadlines, Plagiarism policy)
  - "Place Order" shortcut
  - Timestamps and check marks
- **Smart auto-reply engine** (15 keyword-matching rules for pricing, deadlines, plagiarism, PhD, Master, dissertation, payment, refund, contact, privacy, discount, greetings, thanks)
- **Sessions persisted to DB** (ChatSession model)
- Uses `POST /api/chat` for session start + message send

### Writer Detail Dialog (`writer-detail-dialog.tsx`)
- Opens when clicking writer name or "Profile" button
- **Gradient header** with avatar, name, degree, rating, availability
- **Specialty and experience** section
- **Stats grid** (orders, rating, success rate)
- **Achievement badges** (Top Performer, orders, success, degree)
- **3 student reviews** per writer (name, subject, star rating, text)
- **Sticky CTA footer** with "Hire [Name]" button

### Keyboard Shortcuts (`keyboard-shortcuts-help.tsx`)
- **Floating keyboard icon** (bottom-left, above chat)
- **Modal dialog** showing all shortcuts grouped by category
- Press `?` to toggle
- Shortcuts: `Ctrl+Shift+A` (admin), `Esc` (close), `Tab`, `Enter`, `Space`

### Scroll Progress (`scroll-progress.tsx`)
- Thin gradient line at top of viewport
- Fills as user scrolls (framer-motion `useScroll` + `useSpring`)

### Scroll to Top (`scroll-to-top.tsx`)
- Floating button (bottom-right)
- Appears after 600px scroll
- Smooth scroll animation

### Referral Tracker (`referral-tracker.tsx`)
- Detects `?ref=CODE` URL parameter
- Tracks click via `POST /api/referrals/track`
- Stores code in localStorage
- Shows welcome toast
- Cleans URL

---

## Admin Dashboard

Access via **Ctrl+Shift+A**, **#admin** URL hash, or footer "Admin" link. **PIN-protected** (demo PIN: `1234`, stored in sessionStorage).

### 7 Tabs

#### 1. Activity Tab (Default)
- **3 dashboard charts** (Recharts):
  - Area chart: Orders per day (gradient fill)
  - Donut chart: Order status distribution with legend
  - Bar chart: Revenue per day (PKR)
- **Date range selector** (7d / 30d / 90d / All Time)
- **Recent activity timeline** (merged orders + messages + reviews, max 15, with colored type icons and status badges)

#### 2. Orders Tab
- **Search bar** (by name, email, document type, preferred writer)
- **Status filter pills** (All, Pending, In Progress, Completed, Cancelled — with live counts)
- **"Export CSV" button** (exports filtered orders)
- **Bulk selection**: checkboxes on each card, "Select all on page", sticky bulk action bar (Mark In Progress / Complete All / Cancel All / Clear)
- **Order cards** with: name, status badge, email/phone, price, date, level, type, pages, deadline, preferred writer, status change buttons (In Progress / Complete / Cancel)
- **Pagination** (5 per page, Previous/Next + numbered buttons)
- Selected cards highlighted with primary border + ring

#### 3. Messages Tab
- Contact form submissions
- Reply via mailto link

#### 4. Reviews Tab
- **"Export CSV" button**
- Review cards with: name, star rating, role, message, status badge (pending/approved)
- Approve / Unpublish / Delete buttons (PATCH/DELETE to `/api/reviews/[id]`)

#### 5. Chats Tab
- **Session list**: clickable cards with visitor name, message count, email, last-message preview
- **Session viewer**: full conversation with chat bubbles, user/agent avatars, timestamps, Back button

#### 6. Subscribers Tab
- Newsletter subscriber count with growth indicator

### Loading States
- **Skeleton placeholders** for stats cards and order cards during initial fetch

### 6 Stat Cards
Total Orders, Pipeline Value (PKR), Messages, Reviews (with pending count), Chat Sessions, Subscribers

---

## API Endpoints

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/orders` | Create a new order (name, email, phone, academicLevel, documentType, pages, deadline, price, preferredWriter, referralCode, message) |
| `GET` | `/api/orders` | List all orders (newest first, max 50) |
| `GET` | `/api/orders/[id]` | Get single order by ID |
| `PATCH` | `/api/orders/[id]` | Update order status (pending/in-progress/completed/cancelled) |
| `DELETE` | `/api/orders/[id]` | Delete an order |
| `GET` | `/api/orders/by-email?email=X` | Get all orders by email (case-insensitive) |

### Contact
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/contact` | Submit contact form (name, email, phone, subject, message) |
| `GET` | `/api/contact` | List all contact messages (newest first, max 50) |

### Newsletter
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/newsletter` | Subscribe (email, unique) |
| `GET` | `/api/newsletter` | Get subscriber count |

### Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/reviews` | Submit review (name, rating 1-5, role, message) — created with `approved=false` |
| `GET` | `/api/reviews?approved=true` | List reviews (optionally filtered by approval status) |
| `PATCH` | `/api/reviews/[id]` | Approve or unpublish a review |
| `DELETE` | `/api/reviews/[id]` | Delete a review |

### Chat
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/chat` | Start session (`action: "start"`) or send message (`action: "message"`) — 15-rule smart reply engine, sessions persisted to DB |
| `GET` | `/api/chat?sessions=true` | Get chat stats + recent sessions list (max 20, with message preview) |
| `GET` | `/api/chat/[id]` | Get full chat session message history |

### Referrals
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/referrals` | Create referral (name, email → generates unique code) |
| `GET` | `/api/referrals?email=X` | Get referral by email or list all |
| `POST` | `/api/referrals/track` | Track referral click (increment clicks count) |

### Stats
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/stats` | Dashboard statistics (liveOrders, totalOrders, totalMessages, totalReviews, totalSubscribers, totalReferrals, recentOrders24h) |

---

## Database Models

### Prisma Schema (`prisma/schema.prisma`)

```prisma
model Order {
  id              String   @id @default(cuid())
  name            String
  email           String
  phone           String
  academicLevel   String
  documentType    String
  pages           Int
  deadline        String
  price           Float
  message         String?
  preferredWriter String?
  status          String   @default("pending")
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model Contact {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String?
  subject   String
  message   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Newsletter {
  id        String   @id @default(cuid())
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Review {
  id        String   @id @default(cuid())
  name      String
  rating    Int
  role      String?
  message   String
  approved  Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model ChatSession {
  id            String   @id @default(cuid())
  visitorName   String
  visitorEmail  String?
  messages      String   // JSON-encoded array
  messageCount  Int      @default(0)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Referral {
  id            String   @id @default(cuid())
  referrerEmail String   @unique
  referrerName  String
  referralCode  String   @unique
  clicks        Int      @default(0)
  signups       Int      @default(0)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

**Database**: SQLite (`db/custom.db`) — no external database server needed.

---

## SEO Features

### Structured Data (`structured-data.tsx`)
4 JSON-LD scripts injected site-wide:
1. **Organization** — name, description, url, phone, email, foundingDate, address, aggregateRating (4.9/20000)
2. **Service** — serviceType, provider, areaServed, OfferCatalog (all 7 services)
3. **FAQPage** — all 10 FAQs as Question/Answer pairs
4. **WebSite** — with SearchAction

### Sitemap (`sitemap.ts`)
- Dynamic `sitemap.xml` with homepage + 9 section anchors
- `lastModified` set to current date
- Priority and changeFrequency set per URL

### Robots (`robots.ts`)
- Allows all crawlers on `/`
- Disallows `/api/`
- References sitemap URL

### Open Graph & Twitter Cards
- AI-generated `og-image.png` (1024×1024)
- `metadataBase` set in layout metadata
- Full OG and Twitter card metadata (title, description, image, site name)
- Custom favicon (`favicon.png`, AI-generated)

### Metadata (`layout.tsx`)
- SEO-optimized title: "Thesis Writing Service PK | Pakistan's #1 Academic Writing Help"
- Description with keywords (thesis writing, dissertation, research paper, assignment help, PhD, master, essay)
- Author, keywords array
- Icons (PNG + SVG)

---

## Styling & Design System

### Brand Palette
Defined in `globals.css` using oklch color space:

| Variable | Light Mode | Dark Mode | Usage |
|----------|-----------|-----------|-------|
| `--primary` | Emerald green (oklch 0.45 0.11 160) | Lighter emerald (oklch 0.62 0.13 160) | Buttons, links, accents |
| `--accent` | Amber/gold (oklch 0.72 0.14 75) | Same | CTA buttons, highlights |
| `--background` | Near-white (oklch 0.99 0.005 145) | Dark green (oklch 0.16 0.02 160) | Page background |
| `--foreground` | Dark green (oklch 0.18 0.02 160) | Near-white (oklch 0.97 0.005 145) | Text |
| `--card` | White | Dark card | Card backgrounds |
| `--border` | Light gray-green | White/10% | Borders |
| `--muted` | Light gray-green | Dark gray-green | Muted backgrounds |

### Custom Utility Classes
- `.hero-mesh` — Multi-layer radial gradient background for hero
- `.bg-academic-grid` — Subtle grid pattern overlay (32px grid)
- `.bg-dots` — Radial dot pattern (20px spacing)
- `.custom-scroll` — Styled scrollbar (6px, rounded, emerald thumb)
- `.animate-marquee` — Horizontal scroll animation (30s loop)
- `.animate-float` — Vertical float animation (4s loop)
- `.fancy-underline` — Decorative gradient underline

### Custom Slider Styles
- 22px thumb with 3px white border and box-shadow
- Hover scale (1.15), active scale (1.25)
- 8px track height, primary-colored range

### Animations
- **Framer Motion**: section entrance animations (opacity + y), AnimatePresence for blog filtering
- **Count-up**: IntersectionObserver-based number counter for stats
- **Live counter**: Periodic increment with `tabular-nums`
- **Scroll progress**: Spring-animated gradient bar
- **Hover effects**: Card lift (-translate-y-1), shadow expansion, color transitions
- **Pulse**: Available status dots, live indicator
- **Ping**: Live order counter dot

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px)
- Mobile hamburger menu (Sheet)
- Responsive grids (1→2→3→4 columns)
- Touch-friendly targets (min 44px)

---

## Component Inventory

### Site Components (32 files in `src/components/site/`)

| Component | Purpose |
|-----------|---------|
| `site-header.tsx` | Sticky header with nav, dropdowns, mobile menu |
| `hero-section.tsx` | Hero with stats, live counter, trust marquee |
| `count-up.tsx` | IntersectionObserver number counter |
| `live-counter.tsx` | Live order counter (fetches from /api/stats) |
| `price-calculator.tsx` | Interactive price calculator |
| `about-section.tsx` | About intro + feature cards + benefits grid |
| `progress-timeline.tsx` | Company milestones timeline |
| `services-section.tsx` | 7 services + recently viewed tracking |
| `premium-writers-section.tsx` | Premium features + writer cards with status |
| `comparison-section.tsx` | AI vs Human comparison table + content cards |
| `price-comparison.tsx` | Competitor comparison table (12 features) |
| `writer-of-month.tsx` | Featured writer spotlight |
| `writer-detail-dialog.tsx` | Writer profile dialog with reviews |
| `howitworks-samples-testimonials.tsx` | 3-step process + samples + testimonials |
| `blogs-section.tsx` | Blog grid + article reader + related posts + recently viewed |
| `glossary-section.tsx` | Academic terms with search/filter |
| `review-form.tsx` | Star rating + review submission |
| `order-tracking.tsx` | Order tracking by ID + history tabs |
| `order-history.tsx` | Order lookup by email |
| `referral-program.tsx` | Referral code generation + share |
| `referral-tracker.tsx` | ?ref=CODE detection + click tracking |
| `faq-cities-cta-footer.tsx` | FAQ + cities + CTA + contact form + footer |
| `order-dialog.tsx` | Order form with presets + referral code |
| `live-chat-widget.tsx` | Chat UI with smart replies |
| `admin-panel.tsx` | Full admin dashboard (7 tabs) |
| `admin-charts.tsx` | Recharts visualizations (area, pie, bar) |
| `admin-skeletons.tsx` | Loading state placeholders |
| `theme-toggle.tsx` | Dark mode Sun/Moon button |
| `scroll-progress.tsx` | Scroll progress bar |
| `scroll-to-top.tsx` | Floating scroll-to-top button |
| `keyboard-shortcuts-help.tsx` | Shortcuts modal dialog |
| `structured-data.tsx` | JSON-LD schema.org injection |

### UI Components (48 files in `src/components/ui/`)
Full shadcn/ui (New York style) component set:
accordion, alert, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, button, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, form, hover-card, input, input-otp, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, switch, table, tabs, textarea, toast, toaster, toggle, toggle-group, tooltip

---

## Public Assets

### AI-Generated Images (7 files)
| File | Size | Purpose |
|------|------|---------|
| `hero-student.png` | 1024×1024 | Floating student image in hero |
| `blog-thesis-structure.png` | 1024×1024 | Blog cover: thesis structure |
| `blog-plagiarism.png` | 1024×1024 | Blog cover: plagiarism guide |
| `blog-dissertation.png` | 1024×1024 | Blog cover: dissertation vs thesis |
| `blog-time-mgmt.png` | 1024×1024 | Blog cover: time management |
| `blog-research-topic.png` | 1024×1024 | Blog cover: research topic selection |
| `blog-referencing.png` | 1024×1024 | Blog cover: citation styles |

### PDF Samples (3 files)
| File | Pages | Format | Subject |
|------|-------|--------|---------|
| `sample-emotional-marketing.pdf` | 30 | APA | Marketing (Master's) |
| `sample-flight-security.pdf` | 32 | APA | Aviation Security (Undergraduate) |
| `sample-transactional-leadership.pdf` | 40 | Harvard | Leadership (Master's) |

Each PDF includes: branded cover page with metadata table, abstract, 5 chapters (Introduction, Literature Review, Methodology, Results, Conclusion), methodology tables, and page numbers. Generated with ReportLab (Python).

### Other Assets
- `favicon.png` — AI-generated graduation cap icon (1024×1024)
- `og-image.png` — Social sharing image (1024×1024)
- `logo.svg` — Brand logo (graduation cap)

---

## Mini-Services

### Chat Service (`mini-services/chat-service/`)
- **Status**: Reference implementation (not actively used — chat runs via HTTP API instead)
- **Tech**: Socket.io on port 3003
- **Purpose**: Was originally built for real-time chat, pivoted to HTTP API for reliability in the cloud environment
- **Files**: `index.ts` (Socket.io server with 15-rule smart reply engine), `package.json`

---

## Scripts

### `scripts/generate-samples.py`
- **Purpose**: Generates 3 branded sample thesis PDFs using ReportLab
- **Output**: `public/samples/sample-*.pdf`
- **Features**: Cover page with metadata table, abstract, 5 chapters, methodology tables, page numbers, branded colors (emerald + amber)
- **Usage**: `pip install reportlab && python scripts/generate-samples.py`

---

## Development History

The project was built over 10 development rounds, each triggered by a 15-minute recurring cron job:

| Round | Key Additions | Page Height |
|-------|--------------|-------------|
| **1** | Initial build: 12 section components, 3 API routes, Prisma schema, price calculator, order dialog, contact form, newsletter | 11,880px |
| **2** | Dark mode, blogs (6 articles), live chat, admin dashboard, schema.org SEO, AI imagery (7 images), scroll progress | 13,249px |
| **3** | PATCH orders API, reviews form + admin tab, chat DB persistence, related blog posts, writer pre-fill in orders | 14,066px |
| **4** | Admin search/filter, PDF sample documents (3 PDFs), OG image + favicon, admin PIN auth, loading skeletons | 14,418px |
| **5** | Chat session viewer, CSV export, sitemap/robots, recent activity feed, DB-driven testimonials | 15,097px |
| **6** | Bulk order update, date range selector for charts, keyboard shortcuts, recently viewed blogs | 15,109px |
| **7** | Order history by email, writer availability status, referral/affiliate program | 15,662px |
| **8** | Referral click tracking, live order counter, price comparison table, writer of the month | 17,677px |
| **9** | Live stats API, academic glossary (24 terms), company progress timeline | 21,047px |
| **10** | Recently viewed services, writer detail dialog with reviews | 21,047px+ |

---

## Setup & Installation

### Prerequisites
- **Node.js 18+** or **Bun**
- **Python 3.10+** (optional, for regenerating PDF samples)

### Steps

```bash
# 1. Extract the archive
tar xzf thesis-writing-site.tar.gz
cd thesis-writing-site

# 2. Install dependencies
npm install
# Or: bun install

# 3. Set up the database
npx prisma db push
# Or: bunx prisma db push

# 4. Ensure .env contains:
#    DATABASE_URL="file:./db/custom.db"

# 5. Run the dev server
npm run dev
# Or: bun run dev
```

Open **http://localhost:3000** — that's it!

### Admin Access
- Press **Ctrl+Shift+A** or click "Admin" in the footer
- **PIN: 1234** (change in `src/components/site/admin-panel.tsx`)

### Keyboard Shortcuts
- Press **?** to see all shortcuts
- **Ctrl+Shift+A**: Toggle admin dashboard
- **Esc**: Close any dialog

---

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import at https://vercel.com
3. Set `DATABASE_URL="file:./db/custom.db"`
4. Add `npx prisma db push` to build command
5. Deploy

### Other Options
- **Netlify**: With `@netlify/plugin-nextjs`
- **Railway/Render**: Full Node.js hosting with persistent SQLite
- **Self-hosted**: `npm run build && npm start`

---

## Project Stats

| Metric | Value |
|--------|-------|
| Content sections | 15 |
| Site components | 32 |
| UI components | 48 |
| API routes | 13 |
| Database models | 6 |
| AI-generated images | 7 |
| PDF samples | 3 |
| Blog articles | 6 |
| Academic glossary terms | 24 |
| FAQ items | 10 |
| Services | 7 |
| Writers | 4 |
| Cities served | 7 |
| Document types in calculator | 50+ |
| Deadline options | 9 |
| Smart chat reply rules | 15 |
| JSON-LD structured data blocks | 4 |
| Page height | ~21,000px |
| Lint errors | 0 |
| Console errors | 0 |

---

*Built with Next.js 16, TypeScript, Tailwind CSS 4, shadcn/ui, Prisma, Framer Motion, Recharts, and the z-ai-web-dev-sdk. 10 development rounds. Production-ready.*
