"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowDown, ArrowRight, Code2, BrainCircuit, Clapperboard, Rocket, Palette } from "lucide-react";
import { PERSONAL, STATS } from "@/lib/data";
import { usePortfolioStore } from "@/store/portfolio";
import dynamic from "next/dynamic";

const FloatingWorkspace = dynamic(
  () => import("@/components/3d/FloatingWorkspace").then((m) => m.FloatingWorkspace),
  { ssr: false, loading: () => null }
);
const FloatingWorkspaceFallback = dynamic(
  () => import("@/components/3d/FloatingWorkspace").then((m) => m.FloatingWorkspaceFallback),
  { ssr: false }
);

const PILLS = [
  { label: "Software Engineer", Icon: Code2, color: "#6366f1" },
  { label: "AI Builder", Icon: BrainCircuit, color: "#8b5cf6" },
  { label: "Creative Director", Icon: Clapperboard, color: "#f59e0b" },
  { label: "Startup Founder", Icon: Rocket, color: "#10b981" },
  { label: "Brand Designer", Icon: Palette, color: "#f43f5e" },
];

function RotatingPill() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % PILLS.length), 2500);
    return () => clearInterval(t);
  }, []);

  const pill = PILLS[index];
  const Icon = pill.Icon;

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
        transition={{ duration: 0.35 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-semibold"
        style={{ backgroundColor: `${pill.color}20`, color: pill.color, border: `1px solid ${pill.color}35` }}
      >
        <Icon size={13} />
        {pill.label}
      </motion.span>
    </AnimatePresence>
  );
}

export function HeroSection() {
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);
  const accentColor = usePortfolioStore((s) => s.accentColor);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setWebglAvailable(!!gl);
    } catch {
      setWebglAvailable(false);
    }
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col pt-20 pb-20 md:pt-24 md:pb-24 lg:pt-28 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-25" aria-hidden="true" />

      {/* 3D Canvas covering the whole hero section background on desktop */}
      {webglAvailable === true && (
        <div className="absolute inset-0 z-0 hidden lg:block">
          <FloatingWorkspace />
        </div>
      )}

      {/* Corner glows — far from content */}
      <div
        className="absolute -top-64 -left-64 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 pointer-events-none z-0"
        style={{ backgroundColor: accentColor }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-64 -right-64 w-[500px] h-[500px] rounded-full blur-3xl opacity-10 pointer-events-none z-0"
        style={{ backgroundColor: "#8b5cf6" }}
        aria-hidden="true"
      />

      {/* Main content — generous margins aligned with navbar */}
      <div className="w-full max-w-screen-2xl mx-auto px-8 sm:px-12 md:px-16 lg:px-16 xl:px-20 relative z-10 mt-6 lg:mt-10 mb-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">



          {/* LEFT: Text */}
          <div className="flex flex-col justify-center relative z-10 text-center lg:text-left">

            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex self-center lg:self-start items-center gap-2.5 px-4.5 py-2.5 rounded-full glass border border-[var(--border)] text-sm text-[var(--text-muted)] mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Based in Ghana, West Africa · Worldwide Remote
            </motion.div>

            {/* Rotating discipline pill */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-6 h-9 flex items-center justify-center lg:justify-start"
            >
              <RotatingPill />
            </motion.div>

            {/* Name — big, bold, and creative 2-line layout */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold tracking-tight leading-[1.0] mb-6 text-center lg:text-left"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)" }}
            >
              <span className="block text-gradient">Dennis Opoku</span>
              <span className="flex items-center justify-center lg:justify-start gap-4 mt-2">
                <span style={{ color: accentColor }}>Asiedu</span>
                <span className="hidden sm:inline-block h-[2px] w-12 rounded-full" style={{ backgroundColor: `${accentColor}40` }} />
                <span className="hidden sm:inline-flex text-xs font-semibold px-3 py-1 rounded-full border tracking-wider uppercase" style={{ borderColor: `${accentColor}30`, color: accentColor, backgroundColor: `${accentColor}08` }}>
                  Builder
                </span>
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg text-[var(--text-muted)] max-w-lg leading-relaxed mb-10 text-center lg:text-left mx-auto lg:mx-0"
            >
              I build{" "}
              <span className="text-[var(--text)] font-semibold">products</span>,{" "}
              <span className="text-[var(--text)] font-semibold">brands</span>{" "}
              and{" "}
              <span className="text-[var(--text)] font-semibold">experiences</span>{" "}
              at the intersection of technology, creativity, and entrepreneurship.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex flex-wrap justify-center lg:justify-start gap-5 mb-16"
            >
              <Link
                href="#journey"
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-white text-base font-bold transition-all duration-200 hover:opacity-90 hover:scale-105"
                style={{
                  backgroundColor: accentColor,
                  boxShadow: `0 6px 28px rgba(var(--accent-rgb), 0.38)`,
                }}
              >
                Explore my work
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold glass border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--accent)]/60 transition-all duration-200"
              >
                Get in touch
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex items-center justify-center lg:justify-start gap-10 sm:gap-14 flex-wrap"
            >
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col items-center lg:items-start">
                  <span
                    className="text-4xl sm:text-5xl font-bold font-display leading-none"
                    style={{ color: accentColor }}
                  >
                    {s.value}
                  </span>
                  <span className="text-sm text-[var(--text-muted)] mt-2.5">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Empty column with decorative rings to overlay 3D elements */}
          <div className="relative hidden lg:flex items-center justify-center min-h-[520px] pointer-events-none" aria-hidden="true">
            <div
              className="absolute w-96 h-96 rounded-full border opacity-[0.08] animate-spin-slow"
              style={{ borderColor: accentColor }}
            />
            <div
              className="absolute w-64 h-64 rounded-full border opacity-15"
              style={{ borderColor: accentColor }}
            />
            <div
              className="absolute w-32 h-32 rounded-full opacity-20"
              style={{
                background: `radial-gradient(circle, ${accentColor}50 0%, transparent 70%)`,
              }}
            />

            {/* If webgl is disabled, show fallback in this column */}
            {webglAvailable === false && (
              <div className="absolute inset-0 pointer-events-auto">
                <FloatingWorkspaceFallback />
              </div>
            )}
          </div>

          {/* Mobile: fallback */}
          <div className="lg:hidden relative h-52 mt-8">
            <FloatingWorkspaceFallback />
          </div>
        </div>
      </div>



      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)] z-10"
        aria-hidden="true"
      >
        <span className="text-[11px] uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
