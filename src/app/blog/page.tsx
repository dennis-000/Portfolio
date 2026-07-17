import type { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/data";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Dennis Opoku Asiedu writes about AI engineering, software architecture, design systems, and building startups in Africa.",
};

export default function BlogPage() {
  const featured = BLOG_POSTS.filter((p) => p.featured);
  const rest = BLOG_POSTS.filter((p) => !p.featured);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-4">
            Insights
          </p>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-4">
            Writing that matters
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-xl">
            Deep dives on AI engineering, product building, design systems, and the African tech ecosystem.
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {["AI", "Engineering", "Design", "Entrepreneurship", "Product"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs glass border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--accent)]/40 cursor-pointer transition-all"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Featured posts */}
        <div className="space-y-5 mb-5">
          {BLOG_POSTS.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block p-6 rounded-2xl glass border border-[var(--border)] hover:border-[var(--accent)]/40 transition-all duration-300"
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--accent)]">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                  <Clock size={10} />
                  {post.readTime}
                </span>
                <span className="text-xs text-[var(--text-muted)]">
                  {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
              <h2 className="text-lg font-bold text-[var(--text)] mb-2 font-display group-hover:text-[var(--accent)] transition-colors leading-snug">
                {post.title}
              </h2>
              <p className="text-sm text-[var(--text-muted)] mb-4 leading-relaxed">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-[var(--text-muted)]">
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
