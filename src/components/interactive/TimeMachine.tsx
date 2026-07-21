"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Rocket, Code2, Award, Sparkles, ArrowRight } from "lucide-react";

interface YearData {
  year: string;
  headline: string;
  focus: string;
  tech: string[];
  outputCount: string;
  highlight: string;
  color: string;
}

const CAREER_YEARS: YearData[] = [
  {
    year: "2022",
    headline: "Foundations & Web Craftsmanship",
    focus: "Mastered core JavaScript, React, Node.js & CSS design systems.",
    tech: ["JavaScript", "React", "CSS3", "HTML5", "Git"],
    outputCount: "███ 3 Projects Shipped",
    highlight: "Built first full-stack web applications and client branding identity systems.",
    color: "#06b6d4",
  },
  {
    year: "2023",
    headline: "Pan-African AI Hackathon Victory & Startups",
    focus: "Co-founded YveeReads & won Pan-African AI Hackathon.",
    tech: ["Python", "FastAPI", "React", "Tailwind", "PostgreSQL"],
    outputCount: "███████ 7 Major Releases",
    highlight: "Engineered multilingual voice AI assistant supporting 8 African languages.",
    color: "#f59e0b",
  },
  {
    year: "2024",
    headline: "Enterprise AI & Scalable SaaS Products",
    focus: "Deployed RAG pipelines and enterprise analytics serving 50k+ users.",
    tech: ["Next.js", "TypeScript", "OpenAI API", "Redis", "Docker"],
    outputCount: "███████████ 11 Production Apps",
    highlight: "Shipped multi-tenant SaaS dashboards and autonomous AI agents.",
    color: "#8b5cf6",
  },
  {
    year: "2025",
    headline: "Public Keynote Speaker & Media Founder",
    focus: "Keynote at Tech Summit Africa & expanded digital publishing ventures.",
    tech: ["Next.js 15", "Vector DBs", "Vercel Blob", "Resend SMTP"],
    outputCount: "███████████████ 15 Systems Live",
    highlight: "Spoke to 5,000+ engineers on AI-powered entrepreneurship.",
    color: "#10b981",
  },
  {
    year: "2026",
    headline: "ATLAS V2 — Frontier Career Operating System",
    focus: "Pioneering WebAssembly benchmarks, spatial HUDs & AI concierges.",
    tech: ["Next.js 16", "Turbopack", "Rust WASM", "Spatial RAG"],
    outputCount: "███████████████████ Peak Output",
    highlight: "Engineered ATLAS V2 Career Operating System platform.",
    color: "#6366f1",
  },
];

export default function TimeMachine() {
  const [activeYearIndex, setActiveYearIndex] = useState<number>(4); // Default 2026
  const current = CAREER_YEARS[activeYearIndex];

  return (
    <div className="glass p-6 sm:p-8 rounded-3xl border border-[var(--border)] bg-[var(--bg-secondary)]/40 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Clock size={20} />
          </div>
          <div>
            <h3 className="font-extrabold text-xl text-[var(--text)]">Career Time Machine</h3>
            <p className="text-xs text-[var(--text-muted)]">Drag the slider to explore Dennis's growth & output acceleration (2022 ➔ 2026)</p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-white/10 text-white border border-white/10">
          Viewing Year: <strong style={{ color: current.color }}>{current.year}</strong>
        </span>
      </div>

      {/* Slider Controls Bar */}
      <div className="mb-8 px-2">
        <div className="flex justify-between text-xs font-bold font-mono text-[var(--text-muted)] mb-3">
          {CAREER_YEARS.map((y, idx) => (
            <button
              key={y.year}
              onClick={() => setActiveYearIndex(idx)}
              className={`transition-all cursor-pointer ${
                idx === activeYearIndex ? "text-white scale-125 font-black" : "hover:text-slate-300"
              }`}
            >
              {y.year}
            </button>
          ))}
        </div>

        <input
          type="range"
          min={0}
          max={CAREER_YEARS.length - 1}
          value={activeYearIndex}
          onChange={(e) => setActiveYearIndex(Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
      </div>

      {/* Year Content Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.year}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="p-6 rounded-2xl bg-slate-950/80 border border-white/10 shadow-2xl relative overflow-hidden"
        >
          <div
            className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: current.color }}
          />

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full text-white" style={{ backgroundColor: current.color }}>
              {current.year} Milestone
            </span>
            <span className="text-xs font-mono text-slate-400">{current.outputCount}</span>
          </div>

          <h4 className="text-xl sm:text-2xl font-black text-white mb-2">
            {current.headline}
          </h4>
          <p className="text-sm text-slate-300 mb-6 leading-relaxed">
            {current.focus}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div>
              <span className="text-xs font-bold text-slate-400 block mb-2">Core Technologies:</span>
              <div className="flex flex-wrap gap-1.5">
                {current.tech.map((t) => (
                  <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/10 text-white font-semibold">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 block mb-2">Key Highlight:</span>
              <p className="text-xs text-indigo-300 font-medium leading-normal bg-indigo-500/10 p-3 rounded-xl border border-indigo-500/20">
                ✨ {current.highlight}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
