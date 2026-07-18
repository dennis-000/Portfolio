"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Code2, BrainCircuit, Clapperboard, Rocket, Palette } from "lucide-react";
import { JOURNEYS } from "@/lib/data";
import { usePortfolioStore } from "@/store/portfolio";
import { cn } from "@/lib/utils";

// Map icon string names → actual Lucide components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Code2,
  BrainCircuit,
  Clapperboard,
  Rocket,
  Palette,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
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
  const Icon = ICON_MAP[journey.icon] ?? Code2;

  return (
    <motion.button
      variants={cardVariants}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      className={cn(
        "group relative text-left w-full p-7 sm:p-8 rounded-2xl border transition-all duration-300 overflow-hidden",
        isActive
          ? "border-[var(--accent)]"
          : "border-[var(--border)] glass hover:border-[var(--accent)]/60"
      )}
      style={{ "--accent": journey.accent } as React.CSSProperties}
      aria-label={`Explore as ${journey.label}`}
      aria-pressed={isActive}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${journey.accent}22 0%, transparent 70%)`,
        }}
      />

      {/* Active bg */}
      {isActive && (
        <motion.div
          layoutId="journey-active-bg"
          className="absolute inset-0 rounded-2xl"
          style={{ backgroundColor: `${journey.accent}14` }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}

      <div className="relative z-10 flex flex-col gap-6">
        {/* Icon badge */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{
            backgroundColor: `${journey.accent}18`,
            border: `1px solid ${journey.accent}40`,
          }}
        >
          <Icon size={24} style={{ color: journey.accent }} />
        </div>

        <div>
          <h3 className="text-lg font-bold text-[var(--text)] mb-2.5 leading-tight">
            {journey.label}
          </h3>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            {journey.description}
          </p>
        </div>

        <span
          className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-200"
          style={{ color: journey.accent }}
        >
          Explore
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
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
    <section id="journey" className="py-28 sm:py-36 overflow-hidden">
      <div className="w-full max-w-screen-2xl mx-auto px-8 sm:px-12 md:px-16 lg:px-16 xl:px-20">
        {/* Section header */}
        <div className="max-w-2xl mb-16 sm:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-5"
          >
            Choose your path
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-gradient mb-6"
          >
            What brings you here?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[var(--text-muted)] text-lg leading-relaxed"
          >
            Tailor your journey through this digital headquarters. Each path surfaces
            the most relevant work, case studies, and context for you.
          </motion.p>
        </div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8"
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
