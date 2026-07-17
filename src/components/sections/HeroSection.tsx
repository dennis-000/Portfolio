"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { PERSONAL, DISCIPLINES, STATS } from "@/lib/data";
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

const DISCIPLINE_PILLS = [
  { label: "Engineer", color: "#6366f1" },
  { label: "AI Builder", color: "#8b5cf6" },
  { label: "Creator", color: "#f59e0b" },
  { label: "Entrepreneur", color: "#10b981" },
  { label: "Designer", color: "#f43f5e" },
];

function RotatingPill() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % DISCIPLINE_PILLS.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const pill = DISCIPLINE_PILLS[index];
  return (
    <motion.span
      key={index}
      initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="inline-block px-3 py-1 rounded-full text-sm font-semibold"
      style={{ backgroundColor: `${pill.color}22`, color: pill.color }}
    >
      {pill.label}
    </motion.span>
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
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20" aria-hidden="true" />

      {/* Ambient glow blobs — far corners, don't overlap center */}
      <div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: accentColor }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ backgroundColor: "#8b5cf6" }}
        aria-hidden="true"
      />

      {/* Main layout: text left, 3D right */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-7rem)]">

            {/* LEFT: Text content */}
            <div className="flex flex-col justify-center">
              {/* Available badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.15 }}
                className="inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full glass border border-[var(--border)] text-xs text-[var(--text-muted)] mb-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for work · Ghana, West Africa
              </motion.div>

              {/* Rotating discipline pill */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-4 h-8 flex items-center"
              >
                <RotatingPill />
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold tracking-tight leading-[1.0] mb-6"
              >
                <span className="block text-gradient">Dennis</span>
                <span className="block" style={{ color: accentColor }}>
                  Opoku
                </span>
                <span className="block text-gradient">Asiedu</span>
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg sm:text-xl text-[var(--text-muted)] max-w-md leading-relaxed mb-10"
              >
                I build{" "}
                <span className="text-[var(--text)] font-medium">products</span>,{" "}
                <span className="text-[var(--text)] font-medium">brands</span>{" "}
                and{" "}
                <span className="text-[var(--text)] font-medium">experiences</span>{" "}
                at the intersection of technology, creativity, and entrepreneurship.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap gap-3 mb-12"
              >
                <Link
                  href="#journey"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:scale-105"
                  style={{
                    backgroundColor: accentColor,
                    boxShadow: `0 0 28px rgba(var(--accent-rgb), 0.35)`,
                  }}
                >
                  Explore my work
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold glass border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--accent)]/50 transition-all duration-200"
                >
                  Get in touch
                </Link>
              </motion.div>

              {/* Stats strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex items-center gap-6 sm:gap-10 flex-wrap"
              >
                {STATS.map((s, i) => (
                  <div key={s.label} className="flex flex-col">
                    <span
                      className="text-2xl sm:text-3xl font-bold font-display"
                      style={{ color: accentColor }}
                    >
                      {s.value}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] mt-0.5">{s.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT: 3D scene / visual */}
            <div className="relative hidden lg:flex items-center justify-center min-h-[500px]">
              {/* Faint ring decoration behind 3D */}
              <div
                className="absolute w-80 h-80 rounded-full border opacity-10 animate-spin-slow"
                style={{ borderColor: accentColor }}
              />
              <div
                className="absolute w-52 h-52 rounded-full border opacity-20"
                style={{ borderColor: accentColor }}
              />

              {webglAvailable === true && <FloatingWorkspace />}
              {webglAvailable === false && <FloatingWorkspaceFallback />}
            </div>

            {/* Mobile: fallback small visual */}
            <div className="lg:hidden relative flex items-center justify-center h-48">
              <FloatingWorkspaceFallback />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)]"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={13} />
        </motion.div>
      </motion.div>
    </section>
  );
}
