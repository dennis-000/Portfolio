"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { COMPANIES } from "@/lib/data";

function CompanyCard({
  company,
  index,
}: {
  company: (typeof COMPANIES)[0];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative p-6 rounded-2xl border border-[var(--border)] glass hover:border-[var(--accent)]/40 transition-all duration-500 overflow-hidden"
      style={{ "--accent": company.accent } as React.CSSProperties}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse 80% 40% at 50% -10%, ${company.accent}12 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          {/* Color indicator + name */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold text-white shrink-0"
              style={{ backgroundColor: company.accent }}
            >
              {company.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-[var(--text)] text-base leading-tight">{company.name}</h3>
              <p className="text-xs text-[var(--text-muted)]">{company.role}</p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${company.accent}22`, color: company.accent }}
            >
              {company.status === "active" ? "Active" : "Alumni"}
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">Est. {company.founded}</span>
          </div>
        </div>

        {/* Tagline */}
        <p
          className="text-sm font-medium mb-2 italic"
          style={{ color: company.accent }}
        >
          &ldquo;{company.tagline}&rdquo;
        </p>

        {/* Description */}
        <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
          {company.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {company.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-md border border-[var(--border)] text-[var(--text-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Achievements */}
        <div className="space-y-1 mb-5 border-t border-[var(--border)] pt-4">
          {company.achievements.map((a) => (
            <div key={a} className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: company.accent }} />
              {a}
            </div>
          ))}
        </div>

        {/* Footer */}
        <Link
          href={`/ventures#${company.id}`}
          className="group/cta flex items-center gap-1.5 text-xs font-medium transition-colors"
          style={{ color: company.accent }}
          aria-label={`Learn more about ${company.name}`}
        >
          Learn more
          <ArrowRight
            size={11}
            className="group-hover/cta:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </motion.article>
  );
}

export function CompaniesSection() {
  return (
    <section className="py-28 sm:py-36 overflow-hidden">
      <div className="w-full max-w-screen-2xl mx-auto px-8 sm:px-12 md:px-16 lg:px-16 xl:px-20">
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-3"
        >
          Ventures
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl font-display font-bold text-gradient mb-4"
        >
          Companies I&apos;ve built
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[var(--text-muted)] max-w-xl mx-auto"
        >
          Not just code. I build companies, products, and ecosystems that solve real problems for African markets and beyond.
        </motion.p>
      </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
        {COMPANIES.map((company, i) => (
          <CompanyCard key={company.id} company={company} index={i} />
        ))}
        </div>
      </div>
    </section>
  );
}
