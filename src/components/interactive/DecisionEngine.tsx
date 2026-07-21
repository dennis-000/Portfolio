"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, ArrowRight, Briefcase, Zap, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface DecisionPreset {
  id: string;
  role: string;
  matchScore: number;
  summary: string;
  recommendedProjects: { title: string; href: string; tag: string }[];
  keyCapabilities: string[];
  recommendedResume: string;
}

const DECISION_PRESETS: DecisionPreset[] = [
  {
    id: "engineer",
    role: "Full-Stack Software Engineer",
    matchScore: 96,
    summary: "Dennis is a high-impact engineer who designs scalable web architectures, clean REST/GraphQL APIs, and production Next.js apps.",
    recommendedProjects: [
      { title: "Zealcraft Platform", href: "/projects/saas-dashboard", tag: "Full-Stack SaaS" },
      { title: "Multilingual Voice AI", href: "/projects/ai-voice-assistant", tag: "Python & FastAPI" },
      { title: "Vercel Blob Media Proxy", href: "/engineering", tag: "Edge Proxy Architecture" },
    ],
    keyCapabilities: ["Next.js 16 & Turbopack", "TypeScript & React 19", "PostgreSQL & Vector DBs", "Edge API Middleware"],
    recommendedResume: "Software Engineer PDF",
  },
  {
    id: "ai",
    role: "AI Systems Architect",
    matchScore: 94,
    summary: "Specializes in LLM integrations, RAG semantic search pipelines, voice assistant engines, and autonomous AI agents.",
    recommendedProjects: [
      { title: "Multilingual Voice AI", href: "/projects/ai-voice-assistant", tag: "Whisper & GPT-4" },
      { title: "Startup Lens AI", href: "/ai", tag: "Automated Evaluation" },
      { title: "ATLAS V2 Persona Engine", href: "/ai", tag: "Dynamic RAG System" },
    ],
    keyCapabilities: ["OpenAI & Anthropic APIs", "pgvector Embedding Search", "Python & FastAPI Backends", "Custom Prompt Engineering"],
    recommendedResume: "AI Architect PDF",
  },
  {
    id: "creative",
    role: "Creative Technologist / UI Designer",
    matchScore: 92,
    summary: "Combines front-end engineering with motion design, brand identity systems, video production, and high-contrast UI craftsmanship.",
    recommendedProjects: [
      { title: "Techies Zone Hub", href: "/creative", tag: "Brand & UI System" },
      { title: "YveeReads Media", href: "/ventures", tag: "Digital Publishing" },
      { title: "ATLAS V2 Spatial Glass UI", href: "/design", tag: "Glassmorphism & Motion" },
    ],
    keyCapabilities: ["Tailwind CSS & Glassmorphism", "Framer Motion Animations", "Brand Identity Systems", "Digital Film & Video Editing"],
    recommendedResume: "Creative Technologist PDF",
  },
  {
    id: "founder",
    role: "Startup Founder / Product Lead",
    matchScore: 90,
    summary: "Co-founded ventures, built SaaS platforms from zero-to-one, managed growth distribution, and led multidisciplinary teams.",
    recommendedProjects: [
      { title: "YveeReads Co-Foundation", href: "/ventures", tag: "Pan-African Media" },
      { title: "The Startup Lens", href: "/ventures", tag: "Consulting & Media" },
      { title: "Zealcraft Platform", href: "/projects", tag: "SaaS Product Lead" },
    ],
    keyCapabilities: ["Zero-to-One Product Launch", "Technical Team Leadership", "Public Speaking & Keynotes", "SaaS Revenue Strategy"],
    recommendedResume: "Founder / Entrepreneur PDF",
  },
];

export default function DecisionEngine() {
  const [selectedPreset, setSelectedPreset] = useState<DecisionPreset>(DECISION_PRESETS[0]);

  return (
    <div className="glass p-6 sm:p-8 rounded-3xl border border-[var(--border)] bg-[var(--bg-secondary)]/40 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border)]">
        <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
          <Zap size={20} />
        </div>
        <div>
          <h3 className="font-extrabold text-xl text-[var(--text)]">Recruiter Decision Engine</h3>
          <p className="text-xs text-[var(--text-muted)]">Select your target hiring role to compute Dennis's candidate match score & top case studies</p>
        </div>
      </div>

      {/* Preset Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {DECISION_PRESETS.map((preset) => {
          const isActive = selectedPreset.id === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => setSelectedPreset(preset)}
              className={`p-3 rounded-2xl border text-left transition-all text-xs font-bold cursor-pointer ${
                isActive
                  ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/20"
                  : "bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.08] hover:text-white"
              }`}
            >
              <div className="text-[10px] opacity-75 uppercase tracking-wider mb-1 font-mono">
                {preset.matchScore}% Match
              </div>
              <div>{preset.role}</div>
            </button>
          );
        })}
      </div>

      {/* Computed Match Details Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedPreset.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="p-6 rounded-2xl bg-slate-950/80 border border-white/10 shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={15} /> Verified Match
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  {selectedPreset.matchScore}% Candidate Match
                </span>
              </div>
              <h4 className="text-lg font-black text-white">{selectedPreset.role}</h4>
            </div>

            <Link
              href="/resume"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all cursor-pointer shrink-0"
            >
              Get {selectedPreset.recommendedResume} <ArrowRight size={14} />
            </Link>
          </div>

          <p className="text-xs text-slate-300 mb-5 leading-relaxed">
            {selectedPreset.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-xs font-bold text-slate-400 block mb-2">Recommended Case Studies:</span>
              <div className="space-y-2">
                {selectedPreset.recommendedProjects.map((p) => (
                  <Link
                    key={p.title}
                    href={p.href}
                    className="group flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/10 transition-all text-xs text-white"
                  >
                    <span className="font-bold group-hover:text-indigo-400 transition-colors">{p.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
                      {p.tag}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 block mb-2">Verified Skill Match:</span>
              <div className="space-y-1.5">
                {selectedPreset.keyCapabilities.map((cap) => (
                  <div key={cap} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
