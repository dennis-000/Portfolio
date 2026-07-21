"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Layers, Zap } from "lucide-react";

export default function XRayOverlay() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Don't trigger if user is typing in an input/textarea
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }
      if (e.key === "x" || e.key === "X") {
        setActive((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Global CSS injection when X-Ray mode is active */}
      {active && (
        <style jsx global>{`
          div[class*="glass"], section, nav, header, footer, main, article, button, a {
            outline: 1.5px dashed rgba(6, 182, 212, 0.6) !important;
            outline-offset: 2px !important;
          }
          h1, h2, h3, h4, p, span {
            outline: 1px dotted rgba(168, 85, 247, 0.4) !important;
          }
        `}</style>
      )}

      {/* Floating HUD Indicator */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-6 z-[1008] glass-strong border border-cyan-500/50 bg-slate-950/90 rounded-2xl px-4 py-3 shadow-2xl flex items-center gap-3 text-xs font-mono text-cyan-300"
          >
            <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 animate-pulse">
              <Eye size={16} />
            </div>
            <div>
              <span className="font-bold text-white block">X-RAY INSPECTOR ACTIVE</span>
              <span className="text-[10px] text-slate-400">Press 'X' key to toggle off</span>
            </div>
            <button
              onClick={() => setActive(false)}
              className="ml-2 p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
            >
              <EyeOff size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
