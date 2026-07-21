"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/Footer";
import RecruiterModeBar from "@/components/recruiter/RecruiterModeBar";
import IntentOnboarding from "@/components/intent/IntentOnboarding";
import AtlasSpatialCanvas from "@/components/spatial/AtlasSpatialCanvas";
import NodeDetailDrawer from "@/components/spatial/NodeDetailDrawer";
import StoryModeController from "@/components/spatial/StoryModeController";
import KnowledgeGraph from "@/components/graph/KnowledgeGraph";
import { GraphNode3D, SPATIAL_GRAPH_NODES } from "@/lib/graphData";
import { Layers, Search, Sparkles, Globe, Monitor, HelpCircle } from "lucide-react";

export default function AtlasPage() {
  const [activeLayer, setActiveLayer] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedNode, setSelectedNode] = useState<GraphNode3D | null>(SPATIAL_GRAPH_NODES[0]);
  const [hoveredNode, setHoveredNode] = useState<GraphNode3D | null>(null);
  const [fallback2D, setFallback2D] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text)] transition-colors duration-300">
      <Navigation />
      <RecruiterModeBar />
      <IntentOnboarding />

      <main className="pt-24 pb-12 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Globe size={14} className="animate-spin" />
              ATLAS Spatial Knowledge Explorer V2
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[var(--text)] tracking-tight">
              Spatial Knowledge Universe
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl mt-1">
              Explore Dennis's career, engineering decisions, AI models, and startups in an interactive 3D space.
            </p>
          </div>

          <button
            onClick={() => setFallback2D((prev) => !prev)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass border border-[var(--border)] text-xs font-bold text-[var(--text)] hover:bg-white/10 transition-all cursor-pointer shadow-md"
          >
            <Monitor size={14} />
            <span>{fallback2D ? "Switch to 3D Universe" : "Switch to 2D Fallback"}</span>
          </button>
        </div>

        {/* Top Control Bar: Layers, Search, Story Mode */}
        <div className="mb-6 p-4 rounded-2xl glass border border-[var(--border)] bg-[var(--bg-secondary)]/50 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Layer Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
            <span className="text-[var(--text-muted)] text-[11px] font-mono mr-2 uppercase tracking-wider">
              Layer:
            </span>
            {["all", "engineering", "ai", "creative", "ventures"].map((layer) => (
              <button
                key={layer}
                onClick={() => setActiveLayer(layer)}
                className={`px-3 py-1.5 rounded-xl capitalize transition-all cursor-pointer ${
                  activeLayer === layer
                    ? "bg-indigo-600 text-white shadow-md font-extrabold"
                    : "bg-white/[0.04] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)]"
                }`}
              >
                {layer}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search nodes (e.g. Speech, Next)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-white/[0.04] border border-[var(--border)] text-xs text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Guided Story Mode Controller */}
          <StoryModeController onSelectNode={(node) => setSelectedNode(node)} />
        </div>

        {/* Main Explorer View: 3D Universe or 2D Fallback */}
        <div className="relative w-full h-[550px] sm:h-[620px] rounded-3xl border border-[var(--border)] overflow-hidden shadow-2xl bg-slate-950">
          {!fallback2D ? (
            <AtlasSpatialCanvas
              activeLayer={activeLayer}
              searchQuery={searchQuery}
              selectedNode={selectedNode}
              hoveredNode={hoveredNode}
              onSelectNode={(node) => setSelectedNode(node)}
              onHoverNode={(node) => setHoveredNode(node)}
            />
          ) : (
            <div className="p-6 h-full overflow-y-auto bg-[var(--bg-primary)]">
              <KnowledgeGraph />
            </div>
          )}
        </div>

        {/* Selected Node Contextual Detail Drawer */}
        <NodeDetailDrawer
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
        />
      </main>

      <Footer />
    </div>
  );
}
