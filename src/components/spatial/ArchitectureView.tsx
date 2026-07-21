"use client";

import { motion } from "framer-motion";
import { Server, Cpu, Database, Layers, ArrowRight } from "lucide-react";

interface ArchitectureViewProps {
  projectTitle: string;
  components: {
    layer: string;
    tech: string;
    description: string;
  }[];
}

export default function ArchitectureView({ projectTitle, components }: ArchitectureViewProps) {
  if (!components || components.length === 0) return null;

  return (
    <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 font-mono text-xs mb-5">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10 text-indigo-400 font-bold">
        <Layers size={16} />
        <span>System Architecture Pipeline: {projectTitle}</span>
      </div>

      <div className="space-y-3">
        {components.map((comp, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-[10px] shrink-0">
              {idx + 1}
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <span className="font-bold text-white text-xs">{comp.layer}</span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold text-[10px]">
                  {comp.tech}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                {comp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
