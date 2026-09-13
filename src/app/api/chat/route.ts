import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdminAuthed } from "@/lib/auth";

interface ChatMessage {
  id: string;
  sender: "user" | "agent";
  content: string;
  timestamp: number;
}

interface Session {
  id: string;
  name: string;
  email: string;
  messages: ChatMessage[];
  lastActivity: number;
}

// In-memory cache for fast access during active conversations
const sessions = new Map<string, Session>();

const generateId = () => Math.random().toString(36).slice(2, 11);

// Clean up in-memory sessions older than 1 hour
function cleanupOldSessions() {
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
  for (const [id, session] of sessions.entries()) {
    if (session.lastActivity < oneHourAgo) {
      sessions.delete(id);
    }
  }
}

// PAWS chatbot reply rules.
// All responses use ONLY official PAWS rate-card information sourced from
// `@/lib/site-data` (services, contactInfo). Prices are NEVER invented — when
// a service has a custom-quote basis (e.g. MERN), the bot says so and routes
// the visitor to WhatsApp/email. Rule order matters: the first rule whose
// `keywords` array has any substring match wins, so more specific service
// rules MUST come before the generic pricing/overview rules.
const replyRules: { keywords: string[]; reply: string }[] = [
  // --- Greetings (matched first so "hi"/"hello" never fall through) ---
  {
    keywords: ["hi", "hello", "hey", "salam", "assalam", "aoa", "good morning", "good evening", "good afternoon"],
    reply:
      "Welcome to PAWS! How can I help you with your research or academic needs?",
  },
  {
    keywords: ["thanks", "thank", "shukriya", "great", "awesome", "perfect", "good to know"],
    reply:
      "You're very welcome! To proceed, WhatsApp us at +92 333 3841005 or email yrp9291@gmail.com — we're available 24/7 and typically respond within minutes.",
  },

  // --- Service-specific pricing (most specific first) ---
  {
    keywords: ["research article", "article write", "imrad", "journal article", "manuscript writing"],
    reply:
      "Research Article Write-Up is PKR 25,000–50,000 for a 3,000–4,000 word IMRaD manuscript with verified DOIs and journal-formatted references (turnaround 7–14 days). Final quote depends on scope, word count, and target journal — share your topic for an itemized quote.",
  },
  {
    keywords: ["synopsis", "research proposal", "proposal"],
    reply:
      "Synopsis / Research Proposal is PKR 12,000–25,000 in HEC/CPSP-approved format with clear problem statement, methodology, and literature review (1,500–2,500 words; turnaround 4–7 days). Final quote depends on scope and institutional requirements.",
  },
  {
    keywords: ["case report", "medical case", "clinical case", "care checklist"],
    reply:
      "Medical Case Report is PKR 10,000–20,000 with CARE checklist compliance, diagnostic timeline, and discussion against global literature (1,200–1,800 words; turnaround 3–5 days). Final quote depends on case complexity and target journal.",
  },
  {
    keywords: ["systematic review", "meta-analysis", "meta analysis", "prisma", "forest plot"],
    reply:
      "Systematic Review / Meta-Analysis is PKR 45,000–90,000 with PRISMA compliance, comprehensive database search (PubMed/Scopus/Cochrane), data-extraction tables, and forest-plot synthesis (turnaround 14–21 days). Final quote depends on number of studies and databases.",
  },
  {
    keywords: ["turnitin", "similarity index", "ai score", "similarity report"],
    reply:
      "Turnitin Check is PKR 300–1,000 per file with an official instructor-account PDF report showing the similarity index and AI score. 100% non-repository — your file is never saved or indexed. Turnaround is 15–60 minutes.",
  },
  {
    keywords: ["plagiarism", "paraphrase", "rewrite", "reduce similarity", "similarity reduction"],
    reply:
      "Plagiarism Reduction & Rewriting is PKR 1.5–3.0 per word OR PKR 5,000–12,000 per paper. We use manual scientific paraphrasing to reduce similarity from >30% to <15% without distorting core findings (turnaround 2–4 days). Per-word or per-paper rate available — share your word count for an exact quote.",
  },
  {
    keywords: ["formatting", "journal format", "reference style", "vancouver", "apa", "harvard", "ieee", "endnote", "mendeley", "referencing"],
    reply:
      "Journal Formatting & Referencing is PKR 2,500–6,000. We align margins, headings, word counts, and citations (Vancouver, APA 7th, Harvard, IEEE) using EndNote/Mendeley per your target journal (turnaround 1–2 days). Final quote depends on document length and formatting complexity.",
  },
  {
    keywords: ["spss", "smartpls", "amos", "chi-square", "t-test", "anova", "descriptives", "sem"],
    reply:
      "Basic SPSS Analysis is PKR 8,000–15,000 (descriptives, Chi-Square, t-tests, ANOVA with APA tables; turnaround 2–4 days). Advanced SPSS/SmartPLS/AMOS is PKR 15,000–30,000 (regression, mediation/moderation, SEM). Final quote depends on dataset size and number of variables.",
  },
  {
    keywords: ["r programming", "r stats", "r studio", "rstudio", "ggplot", "tidyverse", "biostatistic"],
    reply:
      "R Programming analysis is PKR 25,000–45,000 — reproducible scripts, publication-ready ggplot visualizations, and APA-formatted summary tables. Final quote depends on dataset complexity and analysis scope.",
  },
  {
    keywords: ["python", "machine learning", "ml pipeline", "deep learning", "pandas", "scikit", "tensorflow", "pytorch", "jupyter"],
    reply:
      "Python ML pipelines are PKR 30,000–60,000 — data preprocessing, feature engineering, model training, evaluation, and reproducible Jupyter notebooks. Final quote depends on dataset size and model complexity.",
  },
  {
    keywords: ["mern", "web development", "website", "react", "node", "mongodb", "express", "full stack", "fullstack", "web app", "webapp", "laboratory portal"],
    reply:
      "MERN Stack web development is on a Custom Quote basis — pricing depends entirely on project scope, features, and timeline. Please WhatsApp us at +92 333 3841005 or email yrp9291@gmail.com with your requirements for a tailored quote.",
  },
  {
    keywords: ["thesis", "dissertation", "thesis chapter", "dissertation chapter"],
    reply:
      "For full-length thesis or dissertation chapters, please request a custom quote — pricing depends on chapter scope, word count, and discipline. Our Research Article Write-Up service (PKR 25,000–50,000 for 3,000–4,000 words) covers individual manuscript chapters. Contact us on WhatsApp at +92 333 3841005 with your requirements.",
  },
  {
    keywords: ["assignment", "essay", "coursework", "homework"],
    reply:
      "We don't offer standalone assignment, essay, or coursework writing. PAWS focuses on research-grade deliverables — manuscripts, proposals, case reports, systematic reviews, statistical analysis, and editorial compliance. If your assignment involves research data or statistical analysis, request a custom quote via WhatsApp at +92 333 3841005.",
  },

  // --- Generic services overview (after service-specific rules) ---
  {
    keywords: ["service", "services", "offer", "what do you do", "what can you do", "help with", "what do you provide", "what do you offer"],
    reply:
      "We offer research article writing, research proposals, medical case reports, systematic reviews, Turnitin checks, plagiarism reduction, journal formatting, SPSS/R/Python analysis, and MERN stack web development. Which service would you like to know more about?",
  },

  // --- Generic pricing (after service-specific rules so service names win) ---
  {
    keywords: ["price", "cost", "charge", "fee", "how much", "pkr", "pricing", "quote", "rates", "rate card", "package"],
    reply:
      "Our pricing is service-specific: Research Article PKR 25,000–50,000 · Synopsis/Proposal PKR 12,000–25,000 · Medical Case Report PKR 10,000–20,000 · Systematic Review PKR 45,000–90,000 · Turnitin Check PKR 300–1,000/file · Plagiarism Reduction PKR 1.5–3.0/word (or PKR 5,000–12,000/paper) · Journal Formatting PKR 2,500–6,000 · Basic SPSS PKR 8,000–15,000 · Advanced SPSS/SmartPLS/AMOS PKR 15,000–30,000 · R Programming PKR 25,000–45,000 · Python ML PKR 30,000–60,000 · MERN Custom Quote. Final quotes depend on scope — share your brief for an exact figure.",
  },

  // --- Turnaround / deadlines ---
  {
    keywords: ["deadline", "turnaround", "delivery time", "how long", "how fast", "when", "urgent"],
    reply:
      "Turnaround is service-specific: Turnitin Check 15–60 mins · Journal Formatting 1–2 days · Medical Case Report 3–5 days · Synopsis/Proposal 4–7 days · Basic SPSS 2–4 days · Research Article 7–14 days · Systematic Review 14–21 days. Share your deadline and we'll confirm feasibility.",
  },

  // --- Process / onboarding ---
  {
    keywords: ["process", "how it works", "workflow", "steps", "onboard", "start", "begin", "order process", "how do i order", "place order"],
    reply:
      "Our 4-step onboarding: (1) Share Brief — send your topic, objectives, dataset, and deadline; (2) Custom Quote — we send an itemized quote; (3) Draft & Review — work begins after 50% advance, with review checkpoints; (4) Final Delivery — final files plus 2 complimentary revision rounds within 14 days.",
  },

  // --- Payment ---
  {
    keywords: ["payment", "pay", "advance", "deposit", "bank transfer", "raast", "jazzcash", "easypaisa", "payment method"],
    reply:
      "We accept Bank Transfer, Raast, JazzCash, and EasyPaisa. A 50% advance payment confirms your slot and starts the work; the remaining 50% is due on final delivery. We do not store card details.",
  },

  // --- Revisions ---
  {
    keywords: ["revision", "revisions", "edit", "changes", "modify", "modify the draft"],
    reply:
      "Every order includes 2 complimentary revision rounds within 14 days of delivery. Additional revisions or scope changes beyond the original brief may incur a small fee — share what needs adjusting and we'll confirm.",
  },

  // --- Refunds / cancellation ---
  {
    keywords: ["refund", "money back", "cancel", "cancellation"],
    reply:
      "Once a service has been approved and delivered it is non-refundable. The 50% advance covers resource allocation and is non-refundable once work has started. If we fail to meet agreed requirements, we'll rework the deliverable under the revision policy — please contact us to discuss.",
  },

  // --- Confidentiality / Turnitin non-repository / privacy ---
  {
    keywords: ["non-repository", "repository", "stored", "indexed", "confidential", "privacy", "private", "anonymous", "safe", "secure", "data protection"],
    reply:
      "100% non-repository Turnitin checks — your file is never saved to the Turnitin repository or indexed, so future submissions won't match against it. All client work, data, and communications are kept strictly confidential.",
  },

  // --- Academic level / who we serve ---
  {
    keywords: ["phd", "doctoral", "doctorate", "fcps", "md ", "mphil", "master", "msc", "masters", "ms ", "student", "university", "faculty", "trainee", "scholar"],
    reply:
      "We support FCPS/MD medical trainees, MPhil/PhD scholars, and university faculty across Pakistan with publication-grade manuscripts, advanced statistical modeling, and editorial compliance aligned to HEC, CPSP, PubMed, and Scopus standards.",
  },

  // --- Guidelines / standards ---
  {
    keywords: ["icmje", "care ", "prisma", "hec", "cpsp", "guideline", "guidelines", "standard", "standards"],
    reply:
      "We comply with ICMJE (medical manuscripts), CARE (case reports), PRISMA (systematic reviews), and HEC/CPSP (Pakistani institutional standards). Citations follow Vancouver, APA 7th, Harvard, or IEEE per your target journal.",
  },

  // --- Contact ---
  {
    keywords: ["contact", "phone", "email", "call", "reach", "whatsapp", "number", "get in touch", "talk to"],
    reply:
      "You can reach us 24/7 on WhatsApp at +92 333 3841005 or by email at yrp9291@gmail.com. We typically respond within minutes during business hours.",
  },

  // --- Discount / packages ---
  {
    keywords: ["discount", "offer", "deal", "promo", "coupon", "concession"],
    reply:
      "We don't run generic discounts — every quote is itemized based on your actual scope. For bulk orders (e.g. multiple manuscripts or a full thesis chapter set), contact us on WhatsApp at +92 333 3841005 for a tailored package quote.",
  },
];

function getSmartReply(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  for (const rule of replyRules) {
    if (rule.keywords.some((k) => lower.includes(k))) {
      return rule.reply;
    }
  }
  // Fallback — never invents a price; routes the visitor to a custom quote.
  return "Thanks for your message! I can help with research article writing, proposals, medical case reports, systematic reviews, Turnitin checks, plagiarism reduction, journal formatting, SPSS/R/Python analysis, and MERN web development. For exact pricing or to start an order, please WhatsApp us at +92 333 3841005 or email yrp9291@gmail.com — we'll send a custom quote.";
}

function getWelcomeMessage(name: string): ChatMessage {
  const displayName = name && name !== "Guest" ? `, ${name}` : "";
  return {
    id: generateId(),
    sender: "agent",
    content: `Welcome to PAWS${displayName}! 👋 I'm here to help with any questions about our research and academic services — pricing, turnaround, process, or anything else. What can I assist you with today?`,
    timestamp: Date.now(),
  };
}

export async function POST(req: NextRequest) {
  try {
    cleanupOldSessions();
    const body = await req.json();
    const { action, sessionId, name, email, content } = body;

    // Start a new session
    if (action === "start") {
      const id = sessionId || generateId();
      const welcomeMsg = getWelcomeMessage(name || "Guest");
      const session: Session = {
        id,
        name: name || "Guest",
        email: email || "",
        messages: [welcomeMsg],
        lastActivity: Date.now(),
      };
      sessions.set(id, session);
      // Persist to DB (best-effort; model may be unavailable if Prisma client is stale)
      try {
        const chatModel = (db as unknown as { chatSession?: { create: (args: unknown) => Promise<unknown> } }).chatSession;
        if (chatModel) {
          await chatModel.create({
            data: {
              id,
              visitorName: session.name,
              visitorEmail: session.email || null,
              messages: JSON.stringify(session.messages),
              messageCount: session.messages.length,
            },
          });
        }
      } catch {
        // Ignore DB errors — in-memory session still works
      }
      return NextResponse.json({
        sessionId: id,
        messages: session.messages,
      });
    }

    // Send a message and get an agent reply
    if (action === "message") {
      let session = sessions.get(sessionId);
      // If not in memory, try to restore from DB
      if (!session) {
        try {
          const chatModel = (db as unknown as { chatSession?: { findUnique: (args: unknown) => Promise<unknown> } }).chatSession;
          if (chatModel) {
            const dbSession = (await chatModel.findUnique({ where: { id: sessionId } })) as {
              id: string;
              visitorName: string;
              visitorEmail: string | null;
              messages: string;
              updatedAt: Date;
            } | null;
            if (dbSession) {
              session = {
                id: dbSession.id,
                name: dbSession.visitorName,
                email: dbSession.visitorEmail || "",
                messages: JSON.parse(dbSession.messages),
                lastActivity: dbSession.updatedAt.getTime(),
              };
              sessions.set(sessionId, session);
            }
          }
        } catch {
          // Ignore DB errors
        }
      }
      if (!session) {
        return NextResponse.json(
          { error: "Session not found. Please restart the chat." },
          { status: 404 }
        );
      }

      const userMessage: ChatMessage = {
        id: generateId(),
        sender: "user",
        content,
        timestamp: Date.now(),
      };
      session.messages.push(userMessage);
      session.lastActivity = Date.now();

      const agentMessage: ChatMessage = {
        id: generateId(),
        sender: "agent",
        content: getSmartReply(content),
        timestamp: Date.now(),
      };
      session.messages.push(agentMessage);

      // Persist updated messages to DB (best-effort)
      try {
        const chatModel = (db as unknown as { chatSession?: { update: (args: unknown) => Promise<unknown> } }).chatSession;
        if (chatModel) {
          await chatModel.update({
            where: { id: sessionId },
            data: {
              messages: JSON.stringify(session.messages),
              messageCount: session.messages.length,
            },
          });
        }
      } catch {
        // Ignore DB errors
      }

      return NextResponse.json({
        userMessage,
        agentMessage,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Chat request failed" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  cleanupOldSessions();
  try {
    const { searchParams } = new URL(req.url);
    const includeSessions = searchParams.get("sessions") === "true";

    const chatModel = (db as unknown as {
      chatSession?: {
        count: () => Promise<number>;
        findMany: (args: unknown) => Promise<unknown[]>;
      };
    }).chatSession;

    const dbCount = chatModel ? await chatModel.count() : 0;

    let recentSessions: unknown[] = [];
    if (includeSessions && chatModel && isAdminAuthed(req.headers.get("cookie"))) {
      const raw = await chatModel.findMany({
        orderBy: { updatedAt: "desc" },
        take: 20,
      });
      recentSessions = (raw as Array<{
        id: string;
        visitorName: string;
        visitorEmail: string | null;
        messageCount: number;
        messages: string;
        createdAt: Date;
        updatedAt: Date;
      }>).map((s) => ({
        id: s.id,
        visitorName: s.visitorName,
        visitorEmail: s.visitorEmail,
        messageCount: s.messageCount,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
        preview: (() => {
          try {
            const msgs = JSON.parse(s.messages) as Array<{ sender: string; content: string }>;
            const last = msgs[msgs.length - 1];
            return last ? last.content.slice(0, 120) : "";
          } catch {
            return "";
          }
        })(),
      }));
    }

    return NextResponse.json({
      activeSessions: sessions.size,
      totalSessions: dbCount,
      status: "online",
      recentSessions,
    });
  } catch {
    return NextResponse.json({
      activeSessions: sessions.size,
      totalSessions: 0,
      status: "online",
      recentSessions: [],
    });
  }
}
