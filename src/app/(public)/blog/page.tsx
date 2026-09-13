import type { Metadata } from "next";
import { blogPosts, brand } from "@/lib/site-data";
import { BlogIndexClient } from "./blog-index-client";

export const metadata: Metadata = {
  title: `Blog | ${brand.shortName} — Research, Writing & Publication Insights`,
  description: `Practical guides on IMRaD structure, non-repository Turnitin checks, SPSS vs R vs Python, PRISMA systematic reviews, CARE case reports, and citation styles from the ${brand.shortName} editorial team.`,
  keywords: [
    `${brand.shortName} blog`,
    "IMRaD structure guide",
    "non-repository Turnitin",
    "SPSS vs R vs Python",
    "PRISMA guidelines",
    "CARE checklist case reports",
    "Vancouver APA Harvard IEEE citation",
    "manuscript writing tips Pakistan",
    "FCPS research writing",
  ],
  openGraph: {
    title: `Blog | ${brand.shortName}`,
    description: `Practical guides on manuscript writing, plagiarism checks, statistical analysis, and editorial compliance from the ${brand.shortName} editorial team.`,
    type: "website",
  },
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  // Pass serializable copies of the posts (array of plain objects) to the client component.
  const posts = blogPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    readTime: post.readTime,
    date: post.date,
    author: post.author,
    accent: post.accent,
    image: post.image,
  }));

  return <BlogIndexClient posts={posts} />;
}
