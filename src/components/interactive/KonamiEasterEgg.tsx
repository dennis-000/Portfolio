"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Award, X, Sparkles } from "lucide-react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function KonamiEasterEgg() {
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expectedKey = KONAMI_CODE[inputSequence.length];
      const targetKey = expectedKey.length === 1 ? expectedKey.toLowerCase() : expectedKey;

      if (key === targetKey) {
        const nextSeq = [...inputSequence, key];
        if (nextSeq.length === KONAMI_CODE.length) {
          setUnlocked(true);
          setInputSequence([]);
        } else {
          setInputSequence(nextSeq);
        }
      } else {
        setInputSequence([]);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputSequence]);

  if (!unlocked) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1020] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setUnlocked(false)}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          className="relative w-full max-w-lg glass-strong border border-emerald-500/50 bg-slate-950/95 rounded-3xl p-6 sm:p-8 shadow-2xl text-center z-10 font-mono"
        >
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
            <Award size={36} className="animate-bounce" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            KONAMI CODE UNLOCKED!
          </span>

          <h3 className="text-2xl font-black text-white mb-2">
            Master Engineer Easter Egg
          </h3>

          <p className="text-xs text-slate-300 mb-6 leading-relaxed">
            Congratulations recruiter! You discovered Dennis's hidden developer Easter egg. You have demonstrated exceptional curiosity and attention to detail.
          </p>

          <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 text-xs text-emerald-300 font-bold mb-6">
            🏆 EASTER EGG ACHIEVEMENT: 100% Recruiter Curiosity Badge
          </div>

          <button
            onClick={() => setUnlocked(false)}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
          >
            Close Easter Egg <X size={14} className="inline ml-1" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
