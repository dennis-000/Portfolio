"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraphNode3D } from "@/lib/graphData";
import { X, HelpCircle, ArrowRight, CheckCircle2, Layers, ExternalLink, Code2 } from "lucide-react";
import ArchitectureView from "./ArchitectureView";
import Link from "next/link";

interface NodeDetailDrawerProps {
  node: GraphNode3D | null;
  onClose: () => void;
}

export default function NodeDetailDrawer({ node, onClose }: NodeDetailDrawerProps) {
  const [showWhyPanel, setShowWhyPanel] = useState(false);
  const [showArchPanel, setShowArchPanel] = useState(false);

  if (!node) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        className="fixed top-24 right-6 bottom-6 z-[1010] w-[90vw] max-w-md glass-strong border border-indigo-500/40 bg-slate-950/95 rounded-3xl p-6 shadow-2xl overflow-y-auto font-sans text-slate-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: node.color }}
            />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-slate-300">
              {node.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Node Title & Description */}
        <h3 className="text-xl font-extrabold text-white mb-2">{node.label}</h3>
        {node.impact && (
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold mb-3">
            Impact: {node.impact}
          </div>
        )}
        <p className="text-xs text-slate-300 mb-6 leading-relaxed">
          {node.description}
        </p>

        {/* Action Controls: "Why?" Decision & Architecture Viewer */}
        <div className="flex items-center gap-2 mb-6">
          {node.whyDecision && (
            <button
              onClick={() => {
                setShowWhyPanel((prev) => !prev);
                setShowArchPanel(false);
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md ${
                showWhyPanel
                  ? "bg-amber-600 text-white"
                  : "bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30"
              }`}
            >
              <HelpCircle size={14} />
              <span>Why This Architecture?</span>
            </button>
          )}

          {node.architectureComponents && (
            <button
              onClick={() => {
                setShowArchPanel((prev) => !prev);
                setShowWhyPanel(false);
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md ${
                showArchPanel
                  ? "bg-indigo-600 text-white"
                  : "bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30"
              }`}
            >
              <Layers size={14} />
              <span>System Flow</span>
            </button>
          )}
        </div>

        {/* "Why?" Engineering Decision Panel */}
        <AnimatePresence>
          {showWhyPanel && node.whyDecision && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 font-mono text-xs mb-6 space-y-3"
            >
              <div>
                <span className="text-amber-400 font-bold block mb-0.5">Problem Statement:</span>
                <p className="text-slate-300 font-sans text-xs">{node.whyDecision.problem}</p>
              </div>
              <div>
                <span className="text-amber-400 font-bold block mb-0.5">Architecture Choice:</span>
                <p className="text-slate-300 font-sans text-xs">{node.whyDecision.architectureChoice}</p>
              </div>
              <div>
                <span className="text-amber-400 font-bold block mb-0.5">Trade-offs Accepted:</span>
                <p className="text-slate-300 font-sans text-xs">{node.whyDecision.tradeoffs}</p>
              </div>
              <div>
                <span className="text-amber-400 font-bold block mb-0.5">Key Lesson Learned:</span>
                <p className="text-slate-300 font-sans text-xs">{node.whyDecision.lessonsLearned}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Architecture Components Viewer */}
        {showArchPanel && node.architectureComponents && (
          <ArchitectureView projectTitle={node.label} components={node.architectureComponents} />
        )}

        {/* Related Node Links */}
        <div className="pt-4 border-t border-white/10">
          <span className="text-xs font-bold text-slate-400 block mb-3 font-mono">
            Connected Knowledge Nodes:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {node.connections.map((targetId) => (
              <span
                key={targetId}
                className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/10 text-slate-200 border border-white/5"
              >
                {targetId}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Links */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          <Link
            href="/projects"
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:underline"
          >
            Explore Projects <ArrowRight size={13} />
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-md"
          >
            Get in Touch
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
