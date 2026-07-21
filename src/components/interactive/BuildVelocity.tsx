"use client";

import { motion } from "framer-motion";
import { TrendingUp, Layers, Rocket, Sparkles } from "lucide-react";

interface VelocityData {
  year: string;
  outputCount: number;
  label: string;
  barWidth: string; // Tailwind percentage
  color: string;
}

const VELOCITY_TIMELINE: VelocityData[] = [
  { year: "2022", outputCount: 3, label: "Core JS/React Foundations & Design Work", barWidth: "w-[25%]", color: "from-cyan-500 to-blue-600" },
  { year: "2023", outputCount: 7, label: "Pan-African AI Hackathon Victory & Startups", barWidth: "w-[45%]", color: "from-amber-500 to-orange-600" },
  { year: "2024", outputCount: 11, label: "Enterprise AI & Multi-Tenant SaaS Products", barWidth: "w-[65%]", color: "from-purple-500 to-indigo-600" },
  { year: "2025", outputCount: 15, label: "Keynote Speaker & Media Platform Scale", barWidth: "w-[85%]", color: "from-emerald-500 to-teal-600" },
  { year: "2026", outputCount: 20, label: "ATLAS V2 Career Operating System", barWidth: "w-[100%]", color: "from-indigo-500 to-purple-600" },
];

export default function BuildVelocity() {
  return (
    <div className="glass p-6 sm:p-8 rounded-3xl border border-[var(--border)] bg-[var(--bg-secondary)]/40 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <TrendingUp size={20} />
          </div>
          <div>
            <h3 className="font-extrabold text-xl text-[var(--text)]">Shipping Velocity & Production Output</h3>
            <p className="text-xs text-[var(--text-muted)]">Accelerating software engineering releases year over year</p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          +560% Growth
        </span>
      </div>

      <div className="space-y-4">
        {VELOCITY_TIMELINE.map((v, idx) => (
          <div key={v.year} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[var(--text)]">{v.year}</span>
              <span className="text-[var(--text-muted)]">{v.label}</span>
              <span className="font-bold text-emerald-400">{v.outputCount} Releases</span>
            </div>

            <div className="w-full h-3 rounded-full bg-slate-900 border border-white/10 overflow-hidden p-0.5">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className={`h-full rounded-full bg-gradient-to-r ${v.color} ${v.barWidth}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
