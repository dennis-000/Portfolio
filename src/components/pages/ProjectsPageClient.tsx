"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Image as ImageIcon } from "lucide-react";
import { FEATURED_PROJECTS } from "@/lib/data";

const CATEGORIES = ["All", "engineering", "ai", "design", "creative", "ventures"];

const CATEGORY_LABELS: Record<string, string> = {
  All: "All Works",
  engineering: "Software Engineering",
  ai: "Artificial Intelligence",
  design: "Graphic Design",
  creative: "Creative Media",
  ventures: "Entrepreneurship",
};

export default function ProjectsPageClient() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Sync with URL query param on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get("category");
      if (catParam) {
        const matched = CATEGORIES.find(c => c.toLowerCase() === catParam.toLowerCase());
        if (matched) setActiveCategory(matched);
      }
    }
  }, []);

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (category !== "All") {
        url.searchParams.set("category", category.toLowerCase());
      } else {
        url.searchParams.delete("category");
      }
      window.history.pushState({}, "", url.pathname + url.search);
    }
  };

  const filteredProjects = activeCategory === "All"
    ? FEATURED_PROJECTS
    : FEATURED_PROJECTS.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="min-h-screen pt-28 sm:pt-32 lg:pt-36 pb-20">
      <div className="w-full max-w-screen-2xl mx-auto px-8 sm:px-12 md:px-16 lg:px-16 xl:px-20">
        
        {/* Header */}
        <div className="mb-12 text-center flex flex-col items-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-4">
            Project Library
          </p>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-4 text-center">
            Things I&apos;ve built
          </h1>
          <p className="text-[var(--text-muted)] text-base max-w-xl mx-auto text-center leading-relaxed">
            Deep-dive case studies covering the challenge, process, architecture, and business impact of each project.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto border-b border-white/5 pb-6">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-md shadow-indigo-500/5"
                    : "text-[var(--text-muted)] hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {CATEGORY_LABELS[cat] || cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              href={project.href}
              className="group rounded-2xl border border-[var(--border)] glass hover:border-[var(--accent)]/40 overflow-hidden transition-all duration-500 flex flex-col relative"
              style={{ "--accent": project.accent } as React.CSSProperties}
            >
              {/* Cover Image Header */}
              <div className="w-full h-48 sm:h-56 relative overflow-hidden bg-black/20 border-b border-white/5">
                {project.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.cover}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 50% 40%, ${project.accent}, transparent 70%)` }}
                  />
                )}
                <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
                
                {/* Category Badge overlay */}
                <div className="absolute bottom-4 left-4 z-10">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded backdrop-blur-sm shadow-sm"
                    style={{ 
                      backgroundColor: `${project.accent}22`, 
                      color: project.accent,
                      border: `1px solid ${project.accent}33`
                    }}
                  >
                    {CATEGORY_LABELS[project.category] || project.category}
                  </span>
                </div>

                {/* Metadata stats right overlay */}
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  <span className="text-[10px] font-mono font-bold bg-black/45 border border-white/10 px-2 py-0.5 rounded text-[var(--text-muted)]">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white mb-2 font-display group-hover:text-[var(--accent)] transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-xs text-[var(--text-muted)] mb-6 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <div className="flex flex-wrap gap-1">
                    {project.tech.slice(0, 3).map((t) => (
                      <span 
                        key={t} 
                        className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[var(--text-muted)]"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-gray-500">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                  <span 
                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform" 
                    style={{ color: project.accent }}
                  >
                    <span>Read Case</span>
                    <ArrowRight size={12} />
                  </span>
                </div>
              </div>

            </Link>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 border border-dashed border-white/5 rounded-2xl bg-white/[0.01]">
            <p className="text-xs text-[var(--text-muted)]">No case studies found in this category.</p>
          </div>
        )}

      </div>
    </div>
  );
}
