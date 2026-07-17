import type { Metadata } from "next";
import { FEATURED_PROJECTS } from "@/lib/data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects",
  description: "Dennis Opoku Asiedu's full project library — case studies across software engineering, AI, design, creative media, and entrepreneurship.",
};

const CATEGORIES = ["All", "engineering", "ai", "design", "creative", "ventures"];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-4">
            Project Library
          </p>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-4">
            Things I&apos;ve built
          </h1>
          <p className="text-[var(--text-muted)] text-lg max-w-xl">
            Deep-dive case studies covering the challenge, process, architecture, and impact of each project.
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <span
              key={cat}
              className="px-3 py-1.5 rounded-full text-xs font-medium glass border border-[var(--border)] text-[var(--text-muted)] cursor-pointer hover:text-[var(--text)] hover:border-[var(--accent)]/40 transition-all capitalize"
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURED_PROJECTS.map((project) => (
            <Link
              key={project.id}
              href={project.href}
              className="group p-6 rounded-2xl border border-[var(--border)] glass hover:border-[var(--accent)]/40 transition-all duration-300 overflow-hidden relative"
              style={{ "--accent": project.accent } as React.CSSProperties}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse 80% 40% at 50% 0%, ${project.accent}10 0%, transparent 70%)` }}
              />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <span
                    className="px-2 py-0.5 text-[10px] font-semibold uppercase rounded-full"
                    style={{ backgroundColor: `${project.accent}22`, color: project.accent }}
                  >
                    {project.category}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">{project.year}</span>
                </div>
                <h2 className="text-lg font-bold text-[var(--text)] mb-2 font-display group-hover:text-[var(--accent)] transition-colors">
                  {project.title}
                </h2>
                <p className="text-sm text-[var(--text-muted)] mb-5 leading-relaxed">{project.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-[var(--text-muted)]">{t}</span>
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-xs font-medium" style={{ color: project.accent }}>
                    View <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
