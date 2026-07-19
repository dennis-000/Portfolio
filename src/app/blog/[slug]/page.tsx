import type { Metadata } from "next";
import { BLOG_POSTS, PERSONAL } from "@/lib/data";
import { notFound } from "next/navigation";
import BlogPostPageClient from "@/components/pages/BlogPostPageClient";

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
    "Building a retrieval-augmented generation (RAG) system in a weekend prototype is straightforward. Getting it to serve **50,000+ queries per day** with **96% accuracy**, sub-200ms latency, and zero downtime is a completely different engineering challenge.",
    "Over the past year, I've architected and deployed two production RAG systems — one for legal document querying and one for a customer support platform. Here's what I learned about making RAG work at scale.",
    "## The Core Architecture Problem",
    "The naive RAG approach (`embed` ➔ `store` ➔ `retrieve` ➔ `synthesize`) works beautifully in demos. In production, you'll immediately run into: retrieval latency at scale, embedding model rate limits, context window management, hallucination rates, and cost explosion.",
    "## What Actually Works",
    "- **Hybrid Retrieval**: Combining dense vector embeddings with BM25 sparse keyword search dramatically improved accuracy across query variations.",
    "- **Surgical Chunking**: Overlapping chunks of 512 tokens with 20% overlap worked best for retaining context in legal documents.",
    "- **Cross-Encoder Re-ranking**: Running retrieved chunks through a Cohere-style cross-encoder before passing to the LLM context window reduced hallucinations by **40%** and cut token costs.",
    "## Production Monitoring",
    "The system you can't observe is the system you can't improve. We instrumented every search query transaction with real-time metrics:",
    "- Retrieval Latency (in milliseconds)",
    "- Total Number of Retrieved Context Chunks",
    "- LLM Token Generation Latency & Costs",
    "- User Explicit Thumbs Up/Down feedback signal",
    "This telemetry dataset drove all of our weekly prompt adjustments and database re-indexing strategies."
  ],
  "design-systems-for-startups": [
    "Most design system articles are written by teams at large companies with dedicated platform departments, months of runway, and zero pressure to ship immediate features. This isn't that article.",
    "I've built and maintained design systems at four different startups, each at different stages. Here's the practical framework that works when you have limited time but still need to move fast without breaking things.",
    "## Start Primitive",
    "Don't start with a component library. Start with **design tokens**: colors, typography, spacing, and shadows. These are the DNA of your system. Get them right and components almost design themselves.",
    "## The 80/20 Component Set",
    "You need: `Button`, `Input`, `Select`, `Checkbox/Radio`, `Modal`, `Toast`, `Card`, `Badge`, `Avatar`, and `Spinner`. That's it. Resist building anything else until you have proven usage.",
    "## Version Control Your Tokens",
    "Design tokens in a JSON file committed to git is the single highest-leverage practice I've implemented. It enables semantic versioning, changelogs, and automated documentation. It's 2 hours of setup that pays for itself every single sprint."
  ],
  "african-tech-ecosystem": [
    "I've been building tech products in Ghana for five years. Before that, I studied the African tech ecosystem from the outside. The view from inside is dramatically different from what most international coverage suggests.",
    "Here's the honest picture: Africa is not a monolith. Ghana and Nigeria have thriving ecosystems. Kenya has Nairobi's Silicon Savannah. But many other markets are still in early development with real infrastructure challenges.",
    "## Context Is Your Competitive Edge",
    "The startups winning in African markets aren't the ones with the most sophisticated technology. They're the ones that understand the context deeply: payment methods, connectivity constraints, trust dynamics, and local business culture.",
    "## Infrastructure Constraints as Design Inputs",
    "When your target user has a 2G connection and a sub-$50 smartphone, you don't build a Next.js app with 500KB of JavaScript. You build for the constraint. This constraint forces clarity of thinking that produces better products.",
    "## The Opportunity Is Real",
    "With 1.4 billion people, a median age of 19, and rapidly growing smartphone penetration, Africa represents one of the most significant technology opportunities in the world. The builders who understand the context will capture it."
  ]
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const content = post.content ?? BLOG_CONTENT[slug] ?? ["Content coming soon."];

  return (
    <BlogPostPageClient 
      post={post} 
      content={content} 
      personal={PERSONAL} 
    />
  );
}
