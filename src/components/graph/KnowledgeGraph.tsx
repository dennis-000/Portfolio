"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Code, Palette, Rocket, Layers, Sparkles, X, ArrowRight } from "lucide-react";
import Link from "next/link";

interface GraphNode {
  id: string;
  label: string;
  category: "discipline" | "skill" | "project" | "tech";
  x: number; // Percentage
  y: number; // Percentage
  color: string;
  description: string;
  connections: string[];
}

const GRAPH_NODES: GraphNode[] = [
  // Disciplines
  {
    id: "eng",
    label: "Engineering",
    category: "discipline",
    x: 25,
    y: 30,
    color: "#6366f1",
    description: "Full-stack software architecture, Next.js 16, component systems, and scalable web apps.",
    connections: ["ai-sys", "ts", "next", "zealcraft", "yvee"],
  },
  {
    id: "ai",
    label: "AI Architecture",
    category: "discipline",
    x: 75,
    y: 30,
    color: "#8b5cf6",
    description: "LLM integration, RAG pipelines, prompt engineering, and automated knowledge systems.",
    connections: ["ai-sys", "vector", "resend", "lens"],
  },
  {
    id: "creative",
    label: "Creative & Design",
    category: "discipline",
    x: 25,
    y: 75,
    color: "#f59e0b",
    description: "Brand identity systems, motion graphics, video editing, and high-contrast UI craftsmanship.",
    connections: ["ui-craft", "techies", "brand"],
  },
  {
    id: "ventures",
    label: "Venture Builder",
    category: "discipline",
    x: 75,
    y: 75,
    color: "#10b981",
    description: "Entrepreneurship, SaaS co-founding, digital media distribution, and product strategy.",
    connections: ["yvee", "techies", "saas-arch"],
  },

  // Skills & Tech
  {
    id: "ts",
    label: "TypeScript",
    category: "tech",
    x: 15,
    y: 18,
    color: "#3178c6",
    description: "Strict static typing, generic utility types, and clean component interfaces.",
    connections: ["eng", "next"],
  },
  {
    id: "next",
    label: "Next.js 16 + Turbo",
    category: "tech",
    x: 40,
    y: 20,
    color: "#ffffff",
    description: "Server Components, Turbopack, App Router, static generation, and edge proxy middleware.",
    connections: ["eng", "ts", "zealcraft"],
  },
  {
    id: "ai-sys",
    label: "AI Integration",
    category: "skill",
    x: 50,
    y: 40,
    color: "#a855f7",
    description: "Combining LLMs with web apps for dynamic assistant concierges and code synthesis.",
    connections: ["eng", "ai", "lens"],
  },
  {
    id: "vector",
    label: "pgvector & RAG",
    category: "tech",
    x: 85,
    y: 18,
    color: "#ec4899",
    description: "Semantic search vector embeddings and contextual knowledge retrieval.",
    connections: ["ai"],
  },
  {
    id: "ui-craft",
    label: "Glassmorphic UI",
    category: "skill",
    x: 15,
    y: 65,
    color: "#f43f5e",
    description: "Custom CSS glassmorphism, Framer Motion animations, and dark mode contrast tokens.",
    connections: ["creative", "eng"],
  },
  {
    id: "saas-arch",
    label: "SaaS Architecture",
    category: "skill",
    x: 85,
    y: 65,
    color: "#14b8a6",
    description: "Multi-tenant platforms, subscription engine integrations, and automated newsletters.",
    connections: ["ventures", "eng"],
  },

  // Projects
  {
    id: "zealcraft",
    label: "Zealcraft Platform",
    category: "project",
    x: 35,
    y: 50,
    color: "#6366f1",
    description: "Flagship engineering showcase platform with dynamic media streaming and live analytics.",
    connections: ["eng", "next"],
  },
  {
    id: "lens",
    label: "Startup Lens AI",
    category: "project",
    x: 65,
    y: 50,
    color: "#8b5cf6",
    description: "AI-driven startup evaluation suite with real-time insight generation.",
    connections: ["ai", "ai-sys"],
  },
  {
    id: "yvee",
    label: "YveeReads Media",
    category: "project",
    x: 45,
    y: 80,
    color: "#10b981",
    description: "Co-founded digital publishing brand and content platform.",
    connections: ["ventures", "creative"],
  },
  {
    id: "techies",
    label: "Techies Zone Hub",
    category: "project",
    x: 55,
    y: 65,
    color: "#f59e0b",
    description: "Developer community hub and tech news ecosystem.",
    connections: ["ventures", "creative"],
  },
];

export default function KnowledgeGraph() {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(GRAPH_NODES[0]);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredNodes = activeFilter === "all"
    ? GRAPH_NODES
    : GRAPH_NODES.filter((n) => n.category === activeFilter);

  const isConnected = (nodeId: string) => {
    if (!selectedNode) return false;
    if (selectedNode.id === nodeId) return true;
    return selectedNode.connections.includes(nodeId) || GRAPH_NODES.find((n) => n.id === nodeId)?.connections.includes(selectedNode.id);
  };

  return (
    <div className="glass p-6 sm:p-8 rounded-3xl border border-[var(--border)] bg-[var(--bg-secondary)]/40 relative overflow-hidden">
      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Layers size={18} />
          </div>
          <div>
            <h3 className="font-bold text-lg text-[var(--text)]">Interactive Knowledge Graph</h3>
            <p className="text-xs text-[var(--text-muted)]">Click nodes to discover cross-disciplinary connections</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-[var(--border)] text-xs font-semibold">
          {["all", "discipline", "tech", "project", "skill"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all cursor-pointer ${
                activeFilter === filter
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Graph Visual Canvas Container */}
      <div className="relative w-full h-[400px] sm:h-[480px] rounded-2xl bg-slate-950/80 border border-white/10 overflow-hidden flex items-center justify-center">
        
        {/* SVG Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {GRAPH_NODES.map((node) =>
            node.connections.map((targetId) => {
              const targetNode = GRAPH_NODES.find((n) => n.id === targetId);
              if (!targetNode) return null;

              const activeConnection = selectedNode && (
                (selectedNode.id === node.id && selectedNode.connections.includes(targetId)) ||
                (selectedNode.id === targetId && targetNode.connections.includes(node.id))
              );

              return (
                <line
                  key={`${node.id}-${targetId}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${targetNode.x}%`}
                  y2={`${targetNode.y}%`}
                  stroke={activeConnection ? node.color : "rgba(255, 255, 255, 0.08)"}
                  strokeWidth={activeConnection ? 2.5 : 1}
                  strokeDasharray={activeConnection ? "none" : "4 4"}
                  className="transition-all duration-500"
                />
              );
            })
          )}
        </svg>

        {/* Graph Nodes */}
        {filteredNodes.map((node) => {
          const isSelected = selectedNode?.id === node.id;
          const connected = isConnected(node.id);

          return (
            <motion.button
              key={node.id}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedNode(node)}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center gap-2 shadow-xl ${
                isSelected
                  ? "bg-white text-slate-950 border-white ring-4 ring-indigo-500/50 scale-110 z-20"
                  : connected
                  ? "bg-slate-900 text-white border-indigo-400 z-10"
                  : "bg-slate-900/80 text-slate-400 border-white/10 opacity-70 hover:opacity-100 hover:text-white"
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: node.color }}
              />
              <span className="text-xs font-bold whitespace-nowrap">
                {node.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Selected Node Detail Drawer */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="mt-6 p-5 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: selectedNode.color }}
                />
                <h4 className="font-extrabold text-base text-white">{selectedNode.label}</h4>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-slate-300">
                  {selectedNode.category}
                </span>
              </div>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                {selectedNode.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/projects"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Explore Projects <ArrowRight size={13} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
