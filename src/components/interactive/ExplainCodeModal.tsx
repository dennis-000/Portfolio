"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Cpu, HelpCircle, X, Check, Terminal, ShieldAlert } from "lucide-react";

interface ExplainCodeModalProps {
  projectTitle: string;
  isOpen: boolean;
  onClose: () => void;
  architectureSummary?: string;
  tradeoffs?: string;
  complexity?: string;
  interviewQuestions?: string[];
}

export default function ExplainCodeModal({
  projectTitle,
  isOpen,
  onClose,
  architectureSummary = "Edge Proxy ➔ Next.js Server Component SSR ➔ Vercel Blob Stream ➔ Client Cache",
  tradeoffs = "Selected Next.js App Router for automatic server-side rendering & route static generation over traditional SPA for instant LCP score.",
  complexity = "Time Complexity: O(1) Edge CDN cache hit | Space Complexity: O(M) for active audio/video stream buffer",
  interviewQuestions = [
    "How did you solve CORS and MIME type streaming for binary video assets?",
    "Why did you use Zustand with partialize persistence over React Context?",
    "How does the Vercel Blob API handle chunked binary uploads in production?",
  ],
}: ExplainCodeModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1010] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl glass-strong border border-indigo-500/40 bg-slate-950/95 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 font-mono text-xs"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400">
                <Code2 size={20} />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">Explain My Code: {projectTitle}</h3>
                <p className="text-[11px] text-slate-400 font-sans">Technical architecture breakdown & interview insights</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-4">
            {/* System Architecture */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10">
              <span className="text-indigo-400 font-bold block mb-1">Architecture Pipeline:</span>
              <p className="text-slate-200 text-xs leading-relaxed">{architectureSummary}</p>
            </div>

            {/* Engineering Trade-offs */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
              <span className="text-amber-400 font-bold block mb-1">Engineering Trade-offs & Decisions:</span>
              <p className="text-slate-300 text-xs leading-relaxed">{tradeoffs}</p>
            </div>

            {/* Time & Space Complexity */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-emerald-400 font-bold block mb-1">Performance Benchmarks:</span>
              <p className="text-slate-300 text-xs leading-relaxed">{complexity}</p>
            </div>

            {/* Technical Interview Questions */}
            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
              <span className="text-purple-400 font-bold block mb-2 flex items-center gap-1.5">
                <HelpCircle size={14} /> Suggested Interview Questions for Dennis:
              </span>
              <ul className="space-y-1.5 text-slate-300 text-xs list-disc list-inside">
                {interviewQuestions.map((q, idx) => (
                  <li key={idx} className="leading-normal">{q}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
