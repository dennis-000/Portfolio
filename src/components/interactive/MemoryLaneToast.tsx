"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function MemoryLaneToast() {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const lastVisit = localStorage.getItem("dennis_portfolio_last_visit");
    const now = Date.now();

    if (lastVisit) {
      // Show returning visitor welcome toast if last visit was > 1 minute ago
      if (now - parseInt(lastVisit) > 60000) {
        setShowToast(true);
      }
    }

    localStorage.setItem("dennis_portfolio_last_visit", now.toString());
  }, []);

  if (!showToast) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 50, y: 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, x: 50, y: 0 }}
        className="fixed bottom-6 right-6 z-[1007] w-[90vw] max-w-sm glass-strong border border-indigo-500/40 bg-slate-950/95 rounded-2xl p-4 shadow-2xl flex items-start justify-between gap-3 text-xs text-slate-200"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 shrink-0 mt-0.5">
            <Sparkles size={16} />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-white">Welcome Back!</h4>
            <p className="text-slate-300 mt-0.5 leading-normal">
              Since your last visit: ATLAS V2 Intent Engine & Recruiter Candidate Briefs released.
            </p>
            <Link
              href="/mission-control"
              onClick={() => setShowToast(false)}
              className="inline-flex items-center gap-1 font-bold text-indigo-400 hover:text-indigo-300 mt-2 text-xs"
            >
              See Mission Control Vitals <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        <button
          onClick={() => setShowToast(false)}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 shrink-0 cursor-pointer"
        >
          <X size={14} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
