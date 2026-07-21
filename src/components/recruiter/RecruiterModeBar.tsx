"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioStore } from "@/store/portfolio";
import { Briefcase, Zap, Download, X, Copy, Check, FileText } from "lucide-react";
import Link from "next/link";

export default function RecruiterModeBar() {
  const { recruiterMode, toggleRecruiterMode } = usePortfolioStore();
  const [briefOpen, setBriefOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!recruiterMode) return null;

  const candidateSummary = `DE CANDIDATE BRIEF — DENNIS OPOKU ASIEDU
• Primary Role: Software Engineer & Full-Stack Architect
• Core Expertise: Next.js, TypeScript, AI System Integration, Distributed Systems, WebAssembly
• Key Achievements: Built end-to-end AI platform processing 10k+ requests, designed micro-frontend architecture for enterprise SaaS, founded digital media engine.
• Availability: Open to High-Impact Full-Time & Contract Engineering Roles
• Location: Ghana, West Africa · Worldwide Remote
• Contact: odennisasiedu@gmail.com | Portfolio: dennis-portfolio-ruddy.vercel.app`;

  const handleCopy = () => {
    navigator.clipboard.writeText(candidateSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Top Floating Recruiter Header Bar */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="fixed top-24 left-1/2 -translate-x-1/2 z-[990] w-[92vw] max-w-4xl glass-strong border border-indigo-500/40 bg-slate-950/90 rounded-2xl px-4 py-2.5 shadow-2xl flex items-center justify-between gap-3 text-xs"
      >
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold tracking-wide border border-indigo-500/30">
            <Briefcase size={14} />
            RECRUITER MODE ACTIVE
          </span>
          <span className="hidden md:flex items-center gap-1 text-slate-300 font-medium">
            <Zap size={13} className="text-amber-400" />
            Est. Review Time: <strong className="text-white">2 Mins</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setBriefOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md cursor-pointer"
          >
            <FileText size={13} />
            <span className="hidden sm:inline">Candidate Brief</span>
            <span className="sm:hidden">Brief</span>
          </button>

          <Link
            href="/resume"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-semibold transition-all cursor-pointer"
          >
            <Download size={13} />
            <span className="hidden sm:inline">Get Resume</span>
          </Link>

          <button
            onClick={() => toggleRecruiterMode(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            aria-label="Exit Recruiter Mode"
            title="Exit Recruiter Mode"
          >
            <X size={16} />
          </button>
        </div>
      </motion.div>

      {/* Candidate Brief Modal */}
      <AnimatePresence>
        {briefOpen && (
          <div className="fixed inset-0 z-[1010] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBriefOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl glass-strong border border-indigo-500/40 rounded-3xl p-6 bg-slate-950/95 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">Candidate Evaluation Brief</h3>
                    <p className="text-xs text-slate-400">Concise executive summary for hiring committees</p>
                  </div>
                </div>
                <button
                  onClick={() => setBriefOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-4 mb-5 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                {candidateSummary}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Ready to paste into Slack / Email notes</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied Brief!" : "Copy Summary Brief"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
