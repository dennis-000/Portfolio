"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, GraduationCap, Trophy, Zap, Mic, Telescope, ChevronDown, ChevronUp } from "lucide-react";
import { TIMELINE_EVENTS } from "@/lib/data";
import { cn } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TYPE_ICONS: Record<string, React.ComponentType<any>> = {
  company: Building2,
  education: GraduationCap,
  award: Trophy,
  milestone: Zap,
  speaking: Mic,
  future: Telescope,
};

const TYPE_LABELS: Record<string, string> = {
  company: "Company",
  education: "Education",
  award: "Award",
  milestone: "Milestone",
  speaking: "Speaking",
  future: "Future",
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function TimelineSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="py-28 sm:py-36 overflow-hidden">
      <div className="w-full max-w-screen-2xl mx-auto px-8 sm:px-12 md:px-16 lg:px-16 xl:px-20">
        {/* Header */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-5">
            The journey
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-gradient mb-5">
            How I got here
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
            Nine years of building, learning, winning, and starting over — a timeline of defining moments.
          </p>
        </div>

        {/* Timeline grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="relative"
        >
          {/* Vertical spine */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px sm:-translate-x-px bg-gradient-to-b from-transparent via-[var(--border)] to-transparent pointer-events-none" />

          <div className="space-y-6 sm:space-y-0">
            {TIMELINE_EVENTS.map((event, i) => {
              const isLeft = i % 2 === 0;
              const key = event.year + event.title;
              const isExpanded = expanded === key;
              const Icon = TYPE_ICONS[event.type] ?? Zap;
              const typeLabel = TYPE_LABELS[event.type] ?? event.type;

              return (
                <motion.div
                  key={key}
                  variants={itemVariants}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className={cn(
                    "relative flex items-start sm:items-center gap-4 sm:gap-0",
                    "pl-16 sm:pl-0",
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse",
                    "sm:mb-12"
                  )}
                >
                  {/* Card */}
                  <div className={cn(
                    "w-full sm:w-5/12",
                    isLeft ? "sm:pr-12" : "sm:pl-12"
                  )}>
                    <button
                      className="group w-full text-left"
                      onClick={() => setExpanded(isExpanded ? null : key)}
                      aria-expanded={isExpanded}
                    >
                      <div
                        className={cn(
                          "p-5 sm:p-6 rounded-2xl border transition-all duration-300 glass",
                          "hover:border-[var(--accent)]/50",
                          isExpanded
                            ? "border-[var(--accent)]/60"
                            : "border-[var(--border)]"
                        )}
                        style={{ "--accent": event.accent } as React.CSSProperties}
                      >
                        {/* Year + type */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2.5">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                              style={{ backgroundColor: `${event.accent}20`, border: `1px solid ${event.accent}35` }}
                            >
                              <Icon size={15} style={{ color: event.accent }} />
                            </div>
                            <span
                              className="text-sm font-bold tracking-wide"
                              style={{ color: event.accent }}
                            >
                              {event.year}
                            </span>
                            <span className="text-[11px] text-[var(--text-muted)] px-2 py-0.5 rounded-full glass border border-[var(--border)]">
                              {typeLabel}
                            </span>
                          </div>

                          <div style={{ color: event.accent }}>
                            {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                          </div>
                        </div>

                        <h3 className="text-base font-semibold text-[var(--text)] leading-snug group-hover:text-[var(--accent)] transition-colors mb-2">
                          {event.title}
                        </h3>

                        <motion.div
                          initial={false}
                          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                          transition={{ duration: 0.28, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-[var(--text-muted)] leading-relaxed pt-3 border-t border-[var(--border)]">
                            {event.description}
                          </p>
                        </motion.div>

                        {!isExpanded && (
                          <p className="text-xs text-[var(--text-muted)] opacity-50 mt-1">
                            Click to expand →
                          </p>
                        )}
                      </div>
                    </button>
                  </div>

                  {/* Center dot */}
                  <div
                    className={cn(
                      "absolute flex items-center justify-center z-10",
                      "left-3.5 sm:left-auto",
                      "sm:left-1/2 sm:-translate-x-1/2",
                      "top-6 sm:top-auto"
                    )}
                  >
                    <div
                      className="w-5 h-5 rounded-full border-[3px] border-[var(--bg)] shadow-lg"
                      style={{
                        backgroundColor: event.accent,
                        boxShadow: `0 0 0 3px ${event.accent}30, 0 4px 12px ${event.accent}40`,
                      }}
                    />
                  </div>

                  {/* Spacer */}
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
