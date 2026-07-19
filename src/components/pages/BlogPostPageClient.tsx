"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Share2, Check, User } from "lucide-react";

const GithubIcon = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface BlogPostPageClientProps {
  post: {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    tags: string[];
    readTime: string;
    date: string;
    featured: boolean;
  };
  content: string[];
  personal: {
    name: string;
    tagline: string;
    location: string;
    available: boolean;
    github: string;
    linkedin: string;
  };
}

// Simple regex parser for inline markdown styling (**bold** and `code`)
const parseMarkdownLine = (text: string) => {
  const parts = [];
  let currentIdx = 0;
  const regex = /(\*\*.*?\*\*|`.*?`)/g;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    if (match.index > currentIdx) {
      parts.push(text.substring(currentIdx, match.index));
    }
    
    const matchedText = match[0];
    if (matchedText.startsWith("**") && matchedText.endsWith("**")) {
      parts.push(
        <strong key={match.index} className="font-semibold text-white">
          {matchedText.slice(2, -2)}
        </strong>
      );
    } else if (matchedText.startsWith("`") && matchedText.endsWith("`")) {
      parts.push(
        <code key={match.index} className="px-1.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 font-mono text-xs text-rose-400">
          {matchedText.slice(1, -1)}
        </code>
      );
    }
    
    currentIdx = regex.lastIndex;
  }
  
  if (currentIdx < text.length) {
    parts.push(text.substring(currentIdx));
  }
  
  return parts.length > 0 ? parts : text;
};

export default function BlogPostPageClient({ post, content, personal }: BlogPostPageClientProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // Monitor scroll height to update reading progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShareClick = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div className="min-h-screen pt-28 sm:pt-32 lg:pt-36 pb-20 relative">
      
      {/* Reading Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-0.5 z-[9999] bg-rose-500 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <div className="w-full max-w-3xl mx-auto px-8 sm:px-12 md:px-16 lg:px-16 xl:px-20">
        
        {/* Navigation Toolbar */}
        <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] hover:text-white transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform text-rose-500" />
            <span>All Articles</span>
          </Link>

          <button
            onClick={handleShareClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-[var(--text-muted)] hover:text-white hover:border-rose-500/20 transition-all cursor-pointer relative"
          >
            {copied ? <Check size={12} className="text-emerald-400" /> : <Share2 size={12} />}
            <span>{copied ? "Link Copied!" : "Share"}</span>
          </button>
        </div>

        {/* Article Header */}
        <header className="mb-10 space-y-6">
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            <span className="text-rose-500 font-extrabold">{post.category}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
            <span className="flex items-center gap-1">
              <Clock size={12} className="text-[var(--text-muted)]" />
              <span>{post.readTime}</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
            <span className="flex items-center gap-1">
              <Calendar size={12} className="text-[var(--text-muted)]" />
              <span>{formattedDate}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gradient leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-[var(--text-muted)] leading-relaxed font-medium border-l-2 border-white/10 pl-4 py-1 italic">
            {post.excerpt}
          </p>
        </header>

        {/* Article Body */}
        <article className="space-y-6 text-sm sm:text-base text-[var(--text-muted)] leading-[1.8]">
          {content.map((paragraph, i) => {
            // Heading 2 rendering
            if (paragraph.startsWith("## ")) {
              return (
                <h2 key={i} className="text-xl sm:text-2xl font-bold text-white mt-10 mb-4 font-display border-b border-white/5 pb-2">
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            
            // Blockquote rendering
            if (paragraph.startsWith("> ")) {
              return (
                <blockquote key={i} className="border-l-2 border-rose-500 bg-white/[0.01] p-5 rounded-r-2xl my-6 text-sm sm:text-base italic text-rose-100/90 leading-relaxed font-serif">
                  {parseMarkdownLine(paragraph.replace("> ", ""))}
                </blockquote>
              );
            }

            // Bullet list rendering
            if (paragraph.startsWith("- ")) {
              return (
                <ul key={i} className="list-disc list-inside pl-4 ml-2 my-2 space-y-1.5 text-white/95">
                  <li>{parseMarkdownLine(paragraph.replace("- ", ""))}</li>
                </ul>
              );
            }

            // Standard Paragraph
            return (
              <p key={i} className="text-white/85 antialiased font-normal">
                {parseMarkdownLine(paragraph)}
              </p>
            );
          })}
        </article>

        {/* Tags */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1 rounded-lg text-xs bg-white/[0.02] border border-white/5 text-[var(--text-muted)]"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Premium Author Signature Card */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl border border-white/5 glass-strong flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center font-bold text-white shadow-lg shadow-rose-500/10">
              <User size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">{personal.name}</h4>
              <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{personal.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 self-stretch sm:self-auto border-t sm:border-t-0 border-white/5 pt-4 sm:pt-0 justify-between sm:justify-start">
            <div className="flex gap-2.5">
              <Link 
                href={personal.github} 
                target="_blank" 
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[var(--text-muted)] hover:text-white transition-all"
                title="GitHub Profile"
              >
                <GithubIcon size={14} />
              </Link>
              <Link 
                href={personal.linkedin} 
                target="_blank" 
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[var(--text-muted)] hover:text-white transition-all"
                title="LinkedIn Profile"
              >
                <LinkedinIcon size={14} />
              </Link>
            </div>

            {personal.available && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available</span>
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
