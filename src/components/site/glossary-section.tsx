"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { BookOpen, Search, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

type Term = {
  term: string;
  definition: string;
  category: string;
};

const glossary: Term[] = [
  { term: "Abstract", definition: "A brief summary of a research paper or thesis, typically 150-300 words, placed before the introduction.", category: "Structure" },
  { term: "Annotated Bibliography", definition: "A list of sources with descriptive and evaluative notes for each, demonstrating the relevance and quality of the cited works.", category: "Research" },
  { term: "APA Style", definition: "A citation format developed by the American Psychological Association, commonly used in social sciences, education, and business.", category: "Citation" },
  { term: "Bibliography", definition: "A complete list of all sources consulted during research, whether cited in the text or not.", category: "Research" },
  { term: "Citation", definition: "A reference to a published or unpublished source, providing enough information for readers to locate it.", category: "Citation" },
  { term: "Conclusion", definition: "The final section of a thesis that summarizes findings, discusses implications, and suggests future research.", category: "Structure" },
  { term: "Dissertation", definition: "A substantial research document written for a doctoral degree, presenting original research and findings.", category: "Document Type" },
  { term: "Harvard Style", definition: "An author-date citation system widely used in UK and Australian universities, similar to APA with subtle formatting differences.", category: "Citation" },
  { term: "Hypothesis", definition: "A testable prediction about the relationship between variables, stated before data collection begins.", category: "Research" },
  { term: "Introduction", definition: "The opening chapter that introduces the research problem, context, objectives, and significance of the study.", category: "Structure" },
  { term: "Literature Review", definition: "A critical analysis of existing research on a topic, identifying gaps that the current study aims to fill.", category: "Structure" },
  { term: "Methodology", definition: "The section describing the research methods, data collection, and analysis techniques used in the study.", category: "Structure" },
  { term: "MLA Style", definition: "A citation format from the Modern Language Association, used primarily in literature, languages, and humanities.", category: "Citation" },
  { term: "Paraphrasing", definition: "Restating someone else's ideas in your own words while maintaining the original meaning, requiring a citation.", category: "Writing" },
  { term: "Peer Review", definition: "The evaluation of academic work by others in the same field to ensure quality and validity before publication.", category: "Research" },
  { term: "Plagiarism", definition: "Using someone else's words, ideas, or work without proper attribution, a serious academic offense.", category: "Ethics" },
  { term: "Primary Source", definition: "An original document or firsthand account, such as an interview, survey data, or historical artifact.", category: "Research" },
  { term: "Proposal", definition: "A document outlining the planned research, including objectives, methodology, and significance, submitted for approval.", category: "Document Type" },
  { term: "Research Question", definition: "The specific question a study seeks to answer, guiding the research design and methodology.", category: "Research" },
  { term: "Results", definition: "The chapter presenting the findings of the study objectively, using tables, charts, and statistical analysis.", category: "Structure" },
  { term: "Secondary Source", definition: "A source that interprets or analyzes primary sources, such as a review article or textbook.", category: "Research" },
  { term: "Thesis Statement", definition: "A single sentence that summarizes the main argument or claim of a paper, typically in the introduction.", category: "Writing" },
  { term: "Turnitin", definition: "A widely used plagiarism detection software that compares submitted work against a database of academic content.", category: "Ethics" },
  { term: "Variables", definition: "Elements in research that can change or vary, classified as independent (manipulated) or dependent (measured).", category: "Research" },
];

const categories = ["All", "Structure", "Research", "Citation", "Writing", "Ethics", "Document Type"];

export function GlossarySection() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTerms = useMemo(() => {
    let result = glossary;
    if (activeCategory !== "All") {
      result = result.filter((t) => t.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.term.toLowerCase().includes(q) ||
          t.definition.toLowerCase().includes(q)
      );
    }
    return result.sort((a, b) => a.term.localeCompare(b.term));
  }, [search, activeCategory]);

  return (
    <section id="glossary" className="scroll-mt-24 bg-dots bg-background py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
            <BookOpen className="h-3.5 w-3.5" />
            Academic Glossary
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Academic Terms &amp; Definitions
          </h2>
          <p className="mt-3 text-muted-foreground">
            A quick reference guide to common academic writing terminology. Search or filter by category to find definitions.
          </p>
        </div>

        {/* Search & filter */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search terms or definitions..."
              className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all",
                  activeCategory === cat
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground/70 hover:border-primary/40 hover:bg-secondary"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {filteredTerms.length} {filteredTerms.length === 1 ? "term" : "terms"} found
          </p>
          {filteredTerms.length > 0 && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <GraduationCap className="h-3.5 w-3.5" />
              {glossary.length} total terms
            </span>
          )}
        </div>

        {/* Terms grid */}
        {filteredTerms.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-muted-foreground">
              <Search className="h-7 w-7" />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              No terms found. Try a different search or category.
            </p>
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {filteredTerms.map((item, i) => (
              <motion.div
                key={item.term}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3) }}
                className="group rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-foreground">{item.term}</h3>
                  <span className="shrink-0 rounded-full bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary">
                    {item.category}
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {item.definition}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
