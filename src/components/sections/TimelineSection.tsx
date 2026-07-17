"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TIMELINE_EVENTS } from "@/lib/data";
import { cn } from "@/lib/utils";

const TYPE_META: Record<string, { icon: string; label: string }> = {
  company: { icon: "🏢", label: "Company" },
  education: { icon: "🎓", label: "Education" },
  award: { icon: "🏆", label: "Award" },
  milestone: { icon: "⚡", label: "Milestone" },
  speaking: { icon: "🎤", label: "Speaking" },
  future: { icon: "🔭", label: "Next" },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function TimelineSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="py-20 sm:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-3">
            The journey
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gradient mb-4">
            How I got here
          </h2>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">
            Nine years of building, learning, winning, and starting over — a timeline of defining moments.
          </p>
        </div>

        {/* Timeline: single column on mobile, staggered on desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative"
        >
          {/* Vertical line — always visible */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px sm:-translate-x-1/2 bg-gradient-to-b from-transparent via-[var(--border)] to-transparent" />

          <div className="space-y-6 sm:space-y-0">
            {TIMELINE_EVENTS.map((event, i) => {
              const isLeft = i % 2 === 0;
              const key = event.year + event.title;
              const isExpanded = expanded === key;
              const meta = TYPE_META[event.type] ?? { icon: "✦", label: event.type };

              return (
                <motion.div
                  key={key}
                  variants={itemVariants}
                  className={cn(
                    "relative flex items-start sm:items-center gap-4 sm:gap-0",
                    "pl-16 sm:pl-0",          // mobile indent for left line
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse",
                    "sm:mb-10"
                  )}
                >
                  {/* Card */}
                  <div className={cn("w-full sm:w-5/12", isLeft ? "sm:pr-10" : "sm:pl-10")}>
                    <button
                      className="group w-full text-left"
                      onClick={() => setExpanded(isExpanded ? null : key)}
                      aria-expanded={isExpanded}
                    >
                      <div
                        className={cn(
                          "p-4 sm:p-5 rounded-2xl border transition-all duration-250",
                          "glass hover:border-[var(--accent)]/40",
                          isExpanded
                            ? "border-[var(--accent)]/50"
                            : "border-[var(--border)]"
                        )}
                        style={{ "--accent": event.accent } as React.CSSProperties}
                      >
                        {/* Year + type */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-base">{meta.icon}</span>
                          <span
                            className="text-xs font-bold tracking-wide"
                            style={{ color: event.accent }}
                          >
                            {event.year}
                          </span>
                          <span className="text-[10px] text-[var(--text-muted)] px-1.5 py-0.5 rounded bg-white/5">
                            {meta.label}
                          </span>
                        </div>

                        <h3 className="text-sm sm:text-base font-semibold text-[var(--text)] leading-snug group-hover:text-[var(--accent)] transition-colors">
                          {event.title}
                        </h3>

                        {/* Expand/collapse detail */}
                        <motion.div
                          initial={false}
                          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs text-[var(--text-muted)] leading-relaxed mt-3 pt-3 border-t border-[var(--border)]">
                            {event.description}
                          </p>
                        </motion.div>

                        {!isExpanded && (
                          <p className="text-[10px] text-[var(--text-muted)] mt-2 opacity-60">
                            Tap to read more →
                          </p>
                        )}
                      </div>
                    </button>
                  </div>

                  {/* Center dot */}
                  <div
                    className={cn(
                      "absolute flex items-center justify-center",
                      // Mobile: pinned to left rail
                      "left-4 sm:left-auto",
                      // Desktop: centered
                      "sm:left-1/2 sm:-translate-x-1/2",
                      "top-5 sm:top-auto"
                    )}
                  >
                    <div
                      className="w-4 h-4 rounded-full border-2 border-[var(--bg)] shadow-lg ring-2"
                      style={{
                        backgroundColor: event.accent,
                        boxShadow: `0 0 0 3px ${event.accent}30`,
                      }}
                    />
                  </div>

                  {/* Spacer for opposite side on desktop */}
                  <div className="hidden sm:block sm:w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
