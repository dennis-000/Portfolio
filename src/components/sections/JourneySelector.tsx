"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { JOURNEYS } from "@/lib/data";
import { usePortfolioStore } from "@/store/portfolio";
import { cn } from "@/lib/utils";
import { useState } from "react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

function JourneyCard({
  journey,
  onSelect,
}: {
  journey: (typeof JOURNEYS)[0];
  onSelect: () => void;
}) {
  const activeJourney = usePortfolioStore((s) => s.activeJourney);
  const isActive = activeJourney === journey.id;

  return (
    <motion.button
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      className={cn(
        "group relative text-left w-full p-5 sm:p-6 rounded-2xl border transition-all duration-250 overflow-hidden",
        isActive
          ? "border-[var(--accent)]"
          : "border-[var(--border)] glass hover:border-[var(--accent)]/60"
      )}
      style={{ "--accent": journey.accent } as React.CSSProperties}
      aria-label={`Explore as ${journey.label}`}
      aria-pressed={isActive}
    >
      {/* Radial glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${journey.accent}20 0%, transparent 70%)`,
        }}
      />
      {/* Active background tint */}
      {isActive && (
        <motion.div
          layoutId="journey-active-bg"
          className="absolute inset-0 rounded-2xl"
          style={{ backgroundColor: `${journey.accent}12` }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}

      <div className="relative z-10">
        <motion.span
          className="block text-3xl mb-4"
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ type: "spring", stiffness: 350, damping: 18 }}
        >
          {journey.emoji}
        </motion.span>

        <h3 className="text-sm font-bold text-[var(--text)] mb-2 leading-tight">
          {journey.label}
        </h3>

        <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-5">
          {journey.description}
        </p>

        <span
          className="inline-flex items-center gap-1 text-xs font-semibold transition-colors group-hover:gap-2 duration-200"
          style={{ color: journey.accent }}
        >
          Explore
          <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.button>
  );
}

export function JourneySelector() {
  const router = useRouter();
  const { setJourney } = usePortfolioStore();

  const handleSelect = (journey: (typeof JOURNEYS)[0]) => {
    setJourney(journey.id as Parameters<typeof setJourney>[0]);
    router.push(`/${journey.id}`);
  };

  return (
    <section id="journey" className="py-20 sm:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-4"
          >
            Choose your path
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gradient mb-4"
          >
            What brings you here?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed"
          >
            Tailor your journey through this digital headquarters. Each path surfaces the most relevant work, case studies, and context for you.
          </motion.p>
        </div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5"
        >
          {JOURNEYS.map((journey) => (
            <JourneyCard
              key={journey.id}
              journey={journey}
              onSelect={() => handleSelect(journey)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
