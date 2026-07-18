"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FEATURED_PROJECTS } from "@/lib/data";
import { cn } from "@/lib/utils";

function ProjectCard({ project, index }: { project: (typeof FEATURED_PROJECTS)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  const accentRgb = project.accent
    .replace("#", "")
    .match(/.{2}/g)!
    .map((h) => parseInt(h, 16))
    .join(", ");

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative rounded-2xl border border-[var(--border)] overflow-hidden transition-all duration-500 hover:border-[var(--accent)]/50 hover:-translate-y-1 hover:shadow-2xl"
      style={{
        "--accent": project.accent,
        "--accent-rgb": accentRgb,
      } as React.CSSProperties}
    >
      {/* Gradient background */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-50 transition-opacity duration-500 group-hover:opacity-80",
          project.gradient
        )}
      />

      {/* Grid texture */}
      <div className="absolute inset-0 grid-pattern opacity-15" />

      {/* Hover glow */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${project.accent}18 0%, transparent 70%)`,
        }}
      />

      <div className="relative p-6 sm:p-8 flex flex-col min-h-[320px]">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <span
            className="px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest"
            style={{
              backgroundColor: `${project.accent}22`,
              color: project.accent,
            }}
          >
            {project.category}
          </span>
          <span className="text-sm text-[var(--text-muted)]">{project.year}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-[var(--text)] mb-3 font-display leading-tight">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-[15px] text-[var(--text-muted)] leading-relaxed flex-1 mb-5">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-xs rounded-lg font-medium"
              style={{
                backgroundColor: "rgba(255,255,255,0.07)",
                color: "var(--text-muted)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 border-t border-[var(--border)]">
          <span className="text-sm font-semibold" style={{ color: project.accent }}>
            {project.impact}
          </span>
          <Link
            href={project.href}
            className="group/link flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            aria-label={`View ${project.title} case study`}
          >
            Case study
            <ArrowRight
              size={14}
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
    <section className="py-28 sm:py-36 overflow-hidden">
      <div className="w-full max-w-screen-2xl mx-auto px-8 sm:px-12 md:px-16 lg:px-16 xl:px-20">
        {/* Section header */}
        <div className="flex items-end justify-between mb-14 gap-4 flex-wrap">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-4"
            >
              Selected work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl font-display font-bold text-gradient"
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
              className="group flex items-center gap-2 text-base text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            >
              View all projects
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
          {FEATURED_PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
