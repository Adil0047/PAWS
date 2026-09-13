"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  Newspaper,
  X,
  User,
  BookOpen,
  Share2,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { blogPosts, blogCategories, type BlogPost } from "@/lib/site-data";
import { useOrder } from "@/lib/order-context";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function BlogsSection() {
  const { openOrder } = useOrder();
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("recently_viewed_blogs") || "[]") as string[];
      if (stored.length > 0) setRecentlyViewed(stored);
    } catch {}
  }, []);

  const recentlyViewedPosts = recentlyViewed
    .map((slug) => blogPosts.find((p) => p.slug === slug))
    .filter((p): p is BlogPost => !!p);

  // Compute up to 3 related posts: same category first, then fill with others
  const getRelatedPosts = (post: BlogPost): BlogPost[] => {
    const sameCategory = blogPosts.filter(
      (p) => p.slug !== post.slug && p.category === post.category
    );
    const others = blogPosts.filter(
      (p) => p.slug !== post.slug && p.category !== post.category
    );
    return [...sameCategory, ...others].slice(0, 3);
  };

  const openPost = (post: BlogPost) => {
    setSelectedPost(post);
    setRelatedPosts(getRelatedPosts(post));
    // Track recently viewed in localStorage
    try {
      const stored = JSON.parse(localStorage.getItem("recently_viewed_blogs") || "[]") as string[];
      const updated = [post.slug, ...stored.filter((s) => s !== post.slug)].slice(0, 3);
      localStorage.setItem("recently_viewed_blogs", JSON.stringify(updated));
      setRecentlyViewed(updated);
    } catch {}
  };

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return blogPosts;
    return blogPosts.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const handleShare = async (post: BlogPost) => {
    const url = `${window.location.origin}/#blogs`;
    try {
      if (navigator.share) {
        await navigator.share({ title: post.title, text: post.excerpt, url });
      } else {
        await navigator.clipboard.writeText(`${post.title} — ${url}`);
        toast({ title: "Link copied!", description: "Share it with your classmates." });
      }
    } catch {
      // user dismissed share sheet
    }
  };

  return (
    <section id="blogs" className="scroll-mt-24 bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
            <Newspaper className="h-3.5 w-3.5" />
            Academic Blog
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Insights, Tips &amp; Guides for Academic Success
          </h2>
          <p className="mt-3 text-muted-foreground">
            Expert-written articles on thesis writing, research methodology, citation styles, and
            productivity — to help you succeed at every stage of your academic journey.
          </p>
        </div>

        {/* Category filter */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {blogCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
                activeCategory === cat
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-background hover:border-primary/40 hover:bg-secondary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, i) => (
              <motion.article
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
                onClick={() => openPost(post)}
              >
                {/* Visual header */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className={cn("absolute inset-0 bg-gradient-to-t opacity-80 mix-blend-multiply", post.accent)} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4">
                    <Badge className="border-0 bg-white/25 text-white backdrop-blur hover:bg-white/40">
                      {post.category}
                    </Badge>
                  </div>
                  <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-all group-hover:bg-white/40">
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 flex items-center gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className={cn("flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-bold text-white", post.accent)}>
                      {post.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <span className="text-xs font-medium text-foreground/80">{post.author}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Recently viewed posts */}
        {recentlyViewedPosts.length > 0 && (
          <div className="mt-12">
            <div className="mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Recently Viewed</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {recentlyViewedPosts.map((post) => (
                <button
                  key={post.slug}
                  onClick={() => openPost(post)}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-card p-3 text-left transition-all hover:border-primary/30 hover:shadow-sm"
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                    <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60 mix-blend-multiply", post.accent)} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-primary">
                      {post.category}
                    </span>
                    <h4 className="line-clamp-1 text-xs font-semibold text-foreground transition-colors group-hover:text-primary">
                      {post.title}
                    </h4>
                    <span className="text-[10px] text-muted-foreground">{post.readTime}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 text-center">
          <Button variant="outline" className="gap-2" onClick={() => openOrder()}>
            Need help with your thesis?
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Article reader dialog */}
      <Dialog open={!!selectedPost} onOpenChange={(o) => !o && setSelectedPost(null)}>
        <DialogContent className="max-h-[92vh] overflow-hidden p-0 sm:max-w-[720px]">
          {selectedPost && (
            <>
              {/* Hero header */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="h-full w-full object-cover"
                />
                <div className={cn("absolute inset-0 bg-gradient-to-t opacity-75 mix-blend-multiply", selectedPost.accent)} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute right-4 top-4 flex gap-2">
                  <button
                    onClick={() => handleShare(selectedPost)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30"
                    aria-label="Share article"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => toast({ title: "Saved!", description: "Article added to your reading list." })}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30"
                    aria-label="Bookmark article"
                  >
                    <Bookmark className="h-4 w-4" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-5 right-5">
                  <Badge className="border-0 bg-white/25 text-white backdrop-blur hover:bg-white/40">
                    {selectedPost.category}
                  </Badge>
                </div>
              </div>

              <div className="max-h-[calc(92vh-11rem)] overflow-y-auto custom-scroll p-6 md:p-8">
                <DialogHeader className="p-0 text-left">
                  <DialogTitle className="text-2xl font-bold leading-tight text-foreground">
                    {selectedPost.title}
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    Article by {selectedPost.author}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-4 flex flex-wrap items-center gap-4 border-b border-border pb-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <div className={cn("flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white", selectedPost.accent)}>
                      {selectedPost.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <span>
                      <span className="font-semibold text-foreground">{selectedPost.author}</span>
                      <span className="block text-xs">{selectedPost.authorRole}</span>
                    </span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {selectedPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {selectedPost.readTime}
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  {selectedPost.content.map((para, i) => (
                    <p key={i} className="text-sm leading-relaxed text-foreground/85 md:text-[15px]">
                      {para}
                    </p>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                  <div className="flex items-start gap-3">
                    <User className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">
                        Struggling with your own thesis?
                      </h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Our expert writers can help you structure, research, and polish your thesis
                        to academic excellence. Get a free quote today.
                      </p>
                      <Button
                        size="sm"
                        className="mt-3 gap-1.5"
                        onClick={() => {
                          setSelectedPost(null);
                          openOrder();
                        }}
                      >
                        Get Expert Help
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Related articles */}
                {relatedPosts.length > 0 && (
                  <div className="mt-8">
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <BookOpen className="h-4 w-4 text-primary" />
                      Related Articles
                    </h4>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {relatedPosts.map((rp) => (
                        <button
                          key={rp.slug}
                          onClick={() => {
                            setSelectedPost(rp);
                            setRelatedPosts(getRelatedPosts(rp));
                            const scrollEl = document.querySelector(
                              "[class*=\"max-h-\\[calc\"]"
                            ) as HTMLElement | null;
                            if (scrollEl) scrollEl.scrollTop = 0;
                          }}
                          className="group flex items-start gap-3 rounded-xl border border-border bg-card p-3 text-left transition-all hover:border-primary/40 hover:shadow-sm"
                        >
                          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                            <img
                              src={rp.image}
                              alt={rp.title}
                              className="h-full w-full object-cover"
                            />
                            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60 mix-blend-multiply", rp.accent)} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-primary">
                              {rp.category}
                            </span>
                            <h5 className="line-clamp-2 text-xs font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                              {rp.title}
                            </h5>
                            <span className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                              <Clock className="h-2.5 w-2.5" />
                              {rp.readTime}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
