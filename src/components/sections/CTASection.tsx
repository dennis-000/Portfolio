"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { usePortfolioStore } from "@/store/portfolio";

export function CTASection() {
  const accentColor = usePortfolioStore((s) => s.accentColor);

  return (
    <section className="py-32 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mx-auto text-center relative"
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 blur-3xl opacity-20 rounded-full"
          style={{ backgroundColor: accentColor }}
          aria-hidden="true"
        />

        <div className="relative z-10 p-8 sm:p-12 rounded-3xl glass border border-[var(--border)]">
          <span className="inline-block text-3xl mb-6">👋</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gradient mb-5">
            Let&apos;s build something remarkable
          </h2>
          <p className="text-lg text-[var(--text-muted)] mb-8 max-w-xl mx-auto leading-relaxed">
            Whether you&apos;re looking to hire, collaborate, invest, or just have a conversation — I&apos;m all ears.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:scale-105"
              style={{
                backgroundColor: accentColor,
                boxShadow: `0 0 40px rgba(var(--accent-rgb), 0.35)`,
              }}
            >
              <Mail size={16} />
              Start a conversation
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/projects"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium glass border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--accent)] transition-all duration-200"
            >
              See my work first
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
