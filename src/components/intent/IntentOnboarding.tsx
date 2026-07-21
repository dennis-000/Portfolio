"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioStore, VisitorIntent } from "@/store/portfolio";
import { Briefcase, Cpu, Palette, Rocket, Compass, X, Sparkles } from "lucide-react";

const INTENT_OPTIONS: {
  id: NonNullable<VisitorIntent>;
  title: string;
  description: string;
  icon: typeof Briefcase;
  accent: string;
  tag: string;
}[] = [
  {
    id: "hiring-engineer",
    title: "Hiring a Software Engineer",
    description: "Evaluates skills, production impact, candidate brief & resume.",
    icon: Briefcase,
    accent: "from-indigo-500 to-blue-600",
    tag: "Recruiter Mode",
  },
  {
    id: "ai-expertise",
    title: "Looking for AI Expertise",
    description: "Explores LLM architectures, RAG pipelines, and ML systems.",
    icon: Cpu,
    accent: "from-purple-500 to-indigo-600",
    tag: "AI Architecture",
  },
  {
    id: "creative-media",
    title: "Creative & Media Work",
    description: "Discovers brand identities, video production, and UI craftsmanship.",
    icon: Palette,
    accent: "from-amber-500 to-orange-600",
    tag: "Design & Film",
  },
  {
    id: "startup-ventures",
    title: "Exploring Startup Ventures",
    description: "Reviews co-founded platforms, SaaS projects, and investments.",
    icon: Rocket,
    accent: "from-emerald-500 to-teal-600",
    tag: "Entrepreneurship",
  },
  {
    id: "general",
    title: "General Portfolio Exploration",
    description: "Browses full engineering work, articles, and interactive features.",
    icon: Compass,
    accent: "from-cyan-500 to-blue-500",
    tag: "Full Tour",
  },
];

export default function IntentOnboarding() {
  const { intentModalOpen, setIntentModalOpen, visitorIntent, setVisitorIntent } = usePortfolioStore();

  if (!intentModalOpen) return null;

  const handleSelect = (intent: VisitorIntent) => {
    setVisitorIntent(intent);
    setIntentModalOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1005] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIntentModalOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="relative w-full max-w-2xl glass-strong border border-white/10 rounded-3xl p-6 sm:p-8 bg-slate-950/90 shadow-2xl z-10 overflow-hidden"
        >
          {/* Subtle Glow Ring */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={() => setIntentModalOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Sparkles size={20} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              ATLAS V2 Persona Engine
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            What brings you here today?
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            Select your primary goal so ATLAS V2 can tailor project rankings, engineering insights, and resume views to your intent.
          </p>

          {/* Intent Grid */}
          <div className="grid grid-cols-1 gap-3 mb-6">
            {INTENT_OPTIONS.map((option) => {
              const Icon = option.icon;
              const isSelected = visitorIntent === option.id;

              return (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.01, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(option.id)}
                  className={`group relative flex items-center justify-between p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white/10 border-indigo-500/50 shadow-lg shadow-indigo-500/10"
                      : "bg-white/[0.03] border-white/10 hover:bg-white/[0.07] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${option.accent} text-white shadow-md`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors">
                          {option.title}
                        </span>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                          {option.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 leading-normal">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Footer action */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <span className="text-xs text-slate-400">
              You can change or reset this persona anytime from <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/10">⌘K</kbd>.
            </span>
            <button
              onClick={() => handleSelect("general")}
              className="text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Skip & Explore Freely →
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
