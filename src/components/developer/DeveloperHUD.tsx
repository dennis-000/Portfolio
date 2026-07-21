"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioStore } from "@/store/portfolio";
import { Terminal, Cpu, Activity, ShieldCheck, X, HardDrive, Layers } from "lucide-react";

export default function DeveloperHUD() {
  const { developerMode, toggleDeveloperMode } = usePortfolioStore();
  const [fps, setFps] = useState(60);

  // Global hotkey listener: Ctrl + Shift + D
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "D" || e.key === "d")) {
        e.preventDefault();
        toggleDeveloperMode();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleDeveloperMode]);

  // Simple FPS estimator
  useEffect(() => {
    if (!developerMode) return;
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const loop = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.min(60, Math.round((frameCount * 1000) / (now - lastTime))));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [developerMode]);

  if (!developerMode) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed bottom-6 right-6 z-[1010] w-[90vw] max-w-md glass-strong border border-emerald-500/40 bg-slate-950/95 rounded-3xl p-5 shadow-2xl font-mono text-xs text-slate-200 overflow-hidden"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Terminal size={16} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white tracking-wide">DEVELOPER HUD ACTIVE</h3>
              <p className="text-[10px] text-slate-400">Press Ctrl+Shift+D to dismiss</p>
            </div>
          </div>

          <button
            onClick={() => toggleDeveloperMode(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Real-Time Telemetry Metrics */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
            <span className="text-[10px] text-slate-400 block mb-0.5">FPS Vitals</span>
            <span className="font-bold text-sm text-emerald-400">{fps} FPS</span>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
            <span className="text-[10px] text-slate-400 block mb-0.5">Bundler</span>
            <span className="font-bold text-sm text-indigo-400">Turbopack</span>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
            <span className="text-[10px] text-slate-400 block mb-0.5">Hydration</span>
            <span className="font-bold text-sm text-amber-400">&lt; 0.1s</span>
          </div>
        </div>

        {/* Architecture Specs */}
        <div className="space-y-2 mb-4 bg-slate-900/90 p-3 rounded-2xl border border-white/10 text-[11px]">
          <div className="flex justify-between">
            <span className="text-slate-400">Framework:</span>
            <span className="text-white font-bold">Next.js 16.2 (React 19)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">State Management:</span>
            <span className="text-white font-bold">Zustand + Persist</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Media Streamer:</span>
            <span className="text-white font-bold">Vercel Blob Proxy Route</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Broadcast API:</span>
            <span className="text-white font-bold">Resend SMTP Engine</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Lighthouse Score:</span>
            <span className="text-emerald-400 font-bold">98/100 Target</span>
          </div>
        </div>

        {/* Flow Architecture */}
        <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-[11px] text-indigo-300 leading-normal">
          <span className="font-bold block mb-1">Architecture Pipeline:</span>
          <span className="text-slate-300">
            Browser Client ➔ Vercel Edge ➔ App Router SSR/Static ➔ Blob Store Proxy
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
