import type { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return { title: post.title, description: post.excerpt };
}

const BLOG_CONTENT: Record<string, string[]> = {
  "building-rag-systems-at-scale": [
    "Building a retrieval-augmented generation (RAG) system in a weekend prototype is straightforward. Getting it to serve 50,000+ queries per day with 96% accuracy, sub-200ms latency, and zero downtime is a completely different engineering challenge.",
    "Over the past year, I've architected and deployed two production RAG systems — one for legal document querying and one for a customer support platform. Here's what I learned about making RAG work at scale.",
    "## The Core Architecture Problem\n\nThe naive RAG approach (embed → store → retrieve → synthesize) works beautifully in demos. In production, you'll immediately run into: retrieval latency at scale, embedding model rate limits, context window management, hallucination rates, and cost explosion.",
    "## What Actually Works\n\nHybrid retrieval combining dense embeddings with BM25 sparse retrieval dramatically improved accuracy. Chunking strategy matters enormously — overlapping chunks of 512 tokens with 20% overlap worked best for legal documents. Re-ranking with a cross-encoder before passing to the LLM reduced hallucinations by 40%.",
    "## Production Monitoring\n\nThe system you can't observe is the system you can't improve. We instrumented every query with: retrieval latency, number of retrieved chunks, LLM latency, token usage, user feedback signal. This data drove every optimization.",
  ],
  "design-systems-for-startups": [
    "Most design system articles are written by teams at large companies with dedicated platform teams, months of runway, and zero pressure to ship features. This isn't that article.",
    "I've built and maintained design systems at four different startups, each at different stages. Here's the practical framework that works when you have limited time but still need to move fast without breaking things.",
    "## Start Primitive\n\nDon't start with a component library. Start with design tokens: colors, typography, spacing, and shadows. These are the DNA of your system. Get them right and components almost design themselves.",
    "## The 80/20 Component Set\n\nYou need: Button, Input, Select, Checkbox/Radio, Modal, Toast, Card, Badge, Avatar, and Spinner. That's it. Resist building anything else until you have proven usage.",
    "## Version Control Your Tokens\n\nDesign tokens in a JSON file committed to git is the single highest-leverage practice I've implemented. It enables semantic versioning, changelogs, and automated documentation. It's 2 hours of setup that pays for itself every single sprint.",
  ],
  "african-tech-ecosystem": [
    "I've been building tech products in Ghana for five years. Before that, I studied the African tech ecosystem from the outside. The view from inside is dramatically different from what most international coverage suggests.",
    "Here's the honest picture: Africa is not a monolith. Ghana and Nigeria have thriving ecosystems. Kenya has Nairobi's Silicon Savannah. But many other markets are still in early development with real infrastructure challenges.",
    "## Context Is Your Competitive Edge\n\nThe startups winning in African markets aren't the ones with the most sophisticated technology. They're the ones that understand the context deeply: payment methods, connectivity constraints, trust dynamics, and local business culture.",
    "## Infrastructure Constraints as Design Inputs\n\nWhen your target user has a 2G connection and a sub-$50 smartphone, you don't build a Next.js app with 500KB of JavaScript. You build for the constraint. This constraint forces clarity of thinking that produces better products.",
    "## The Opportunity Is Real\n\nWith 1.4 billion people, a median age of 19, and rapidly growing smartphone penetration, Africa represents one of the most significant technology opportunities in the world. The builders who understand the context will capture it.",
  ],
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const content = BLOG_CONTENT[slug] ?? ["Content coming soon."];

  return (
    <div className="min-h-screen pt-28 sm:pt-32 lg:pt-36 pb-20">
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 h-0.5 z-50 transition-all"
        style={{ width: "40%", backgroundColor: "var(--accent)" }}
        aria-hidden="true"
      />

      <div className="w-full max-w-3xl mx-auto px-8 sm:px-12 md:px-16 lg:px-16 xl:px-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors mb-10 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          All Posts
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
              <Clock size={11} />
              {post.readTime}
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-gradient mb-5 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-[var(--text-muted)] leading-relaxed">{post.excerpt}</p>
        </header>

        {/* Content */}
        <article className="prose-portfolio space-y-6">
          {content.map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2 key={i} className="text-xl font-bold text-[var(--text)] mt-8 mb-3 font-display">
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            return (
              <p key={i} className="text-base text-[var(--text-muted)] leading-[1.8]">
                {paragraph}
              </p>
            );
          })}
        </article>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-[var(--border)]">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs glass border border-[var(--border)] text-[var(--text-muted)]">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
