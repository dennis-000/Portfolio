"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { FEATURED_PROJECTS } from "@/lib/data";
import { cn } from "@/lib/utils";

function ProjectCard({ project, index }: { project: (typeof FEATURED_PROJECTS)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative rounded-2xl border border-[var(--border)] overflow-hidden transition-all duration-500 hover:border-[var(--accent)]/40"
      style={
        {
          "--accent": project.accent,
          "--accent-rgb": project.accent
            .replace("#", "")
            .match(/.{2}/g)!
            .map((h) => parseInt(h, 16))
            .join(", "),
        } as React.CSSProperties
      }
    >
      {/* Gradient background */}
      <div
        className={cn("absolute inset-0 bg-gradient-to-br opacity-60 transition-opacity duration-500 group-hover:opacity-100", project.gradient)}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Glow on hover */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${project.accent}15 0%, transparent 70%)`,
        }}
      />

      <div className="relative p-6 sm:p-8 flex flex-col h-full min-h-[280px]">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <span
            className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest"
            style={{
              backgroundColor: `${project.accent}22`,
              color: project.accent,
            }}
          >
            {project.category}
          </span>
          <span className="text-xs text-[var(--text-muted)]">{project.year}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-[var(--text)] mb-3 font-display leading-tight">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mt-4 mb-5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[10px] rounded-md font-medium"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                color: "var(--text-muted)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
          <span className="text-xs font-semibold" style={{ color: project.accent }}>
            {project.impact}
          </span>
          <Link
            href={project.href}
            className="group/link flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            aria-label={`View ${project.title} case study`}
          >
            Case study
            <ArrowRight
              size={12}
              className="group-hover/link:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function FeaturedProjects() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-3"
          >
            Selected work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-display font-bold text-gradient"
          >
            Things I&apos;ve built
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href="/projects"
            className="group flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            View all projects
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
        {FEATURED_PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
