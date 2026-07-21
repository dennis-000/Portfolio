"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Layers, 
  Plus, 
  Trash2, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  Sparkles, 
  Search,
  Link as LinkIcon,
  Unlink
} from "lucide-react";
import Link from "next/link";
import { SPATIAL_GRAPH_NODES, GraphNode3D } from "@/lib/graphData";

export default function GraphBuilderAdminPage() {
  const [nodes, setNodes] = useState<GraphNode3D[]>(SPATIAL_GRAPH_NODES);
  const [selectedNode, setSelectedNode] = useState<GraphNode3D>(SPATIAL_GRAPH_NODES[0]);
  const [targetConnectId, setTargetConnectId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddConnection = () => {
    if (!targetConnectId || targetConnectId === selectedNode.id) return;
    if (selectedNode.connections.includes(targetConnectId)) return;

    const updatedNodes = nodes.map((n) => {
      if (n.id === selectedNode.id) {
        return { ...n, connections: [...n.connections, targetConnectId] };
      }
      if (n.id === targetConnectId) {
        return { ...n, connections: [...n.connections, selectedNode.id] };
      }
      return n;
    });

    setNodes(updatedNodes);
    setSelectedNode(updatedNodes.find((n) => n.id === selectedNode.id) || selectedNode);
    setTargetConnectId("");
  };

  const handleRemoveConnection = (targetId: string) => {
    const updatedNodes = nodes.map((n) => {
      if (n.id === selectedNode.id) {
        return { ...n, connections: n.connections.filter((id) => id !== targetId) };
      }
      if (n.id === targetId) {
        return { ...n, connections: n.connections.filter((id) => id !== selectedNode.id) };
      }
      return n;
    });

    setNodes(updatedNodes);
    setSelectedNode(updatedNodes.find((n) => n.id === selectedNode.id) || selectedNode);
  };

  const handleSaveGraph = async () => {
    setIsSaving(true);
    setSavedSuccess(false);
    try {
      // Sync graph updates to admin save API
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ GRAPH_NODES: nodes }),
      });
      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (e) {
      console.error("Save graph error", e);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredNodes = nodes.filter(
    (n) =>
      n.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white mb-2 transition-colors"
            >
              <ArrowLeft size={14} /> Back to Control Center
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Layers className="text-indigo-400" size={28} />
              Visual Knowledge Graph Builder
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Manage relationship links between Projects, Technologies, Companies, Blogs, and Skills. Syncs live to 2D & 3D Spatial Explorer.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveGraph}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              {savedSuccess ? <CheckCircle2 size={16} /> : <Save size={16} />}
              <span>{isSaving ? "Saving Graph..." : savedSuccess ? "Graph Saved!" : "Publish Graph Updates"}</span>
            </button>
          </div>
        </div>

        {/* 2-Column Main Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Node Selector List */}
          <div className="glass p-5 rounded-2xl border border-white/10 bg-slate-900/60">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-white font-mono">Knowledge Nodes ({nodes.length})</h3>
            </div>

            <div className="relative mb-4">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search nodes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {filteredNodes.map((node) => {
                const isSelected = selectedNode.id === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "bg-indigo-600/20 border-indigo-500 text-white"
                        : "bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: node.color }}
                      />
                      <span className="font-bold truncate">{node.label}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300 uppercase">
                      {node.category}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column (2 Cols): Active Node Link Manager */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Node Header Info */}
            <div className="glass p-6 rounded-2xl border border-indigo-500/30 bg-slate-900/80">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full"
                    style={{ backgroundColor: selectedNode.color }}
                  />
                  <h2 className="text-xl font-extrabold text-white">{selectedNode.label}</h2>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-white/10 text-indigo-300 uppercase font-bold">
                    {selectedNode.category}
                  </span>
                </div>

                <span className="text-xs font-mono text-slate-400">ID: {selectedNode.id}</span>
              </div>

              <p className="text-xs text-slate-300 mb-4 leading-relaxed">{selectedNode.description}</p>

              {/* Add New Connection Select Bar */}
              <div className="p-4 rounded-xl bg-slate-950 border border-white/10 flex flex-col sm:flex-row items-center gap-3">
                <div className="flex-1 w-full">
                  <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">
                    Connect New Relationship Node:
                  </label>
                  <select
                    value={targetConnectId}
                    onChange={(e) => setTargetConnectId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="">Select target node to link...</option>
                    {nodes
                      .filter((n) => n.id !== selectedNode.id && !selectedNode.connections.includes(n.id))
                      .map((n) => (
                        <option key={n.id} value={n.id}>
                          [{n.category.toUpperCase()}] {n.label} ({n.id})
                        </option>
                      ))}
                  </select>
                </div>

                <button
                  onClick={handleAddConnection}
                  disabled={!targetConnectId}
                  className="w-full sm:w-auto px-4 py-2 mt-4 sm:mt-0 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-md cursor-pointer disabled:opacity-40 flex items-center justify-center gap-1.5 shrink-0"
                >
                  <LinkIcon size={14} />
                  <span>Link Nodes</span>
                </button>
              </div>
            </div>

            {/* Active Connections Grid */}
            <div className="glass p-6 rounded-2xl border border-white/10 bg-slate-900/60">
              <h3 className="text-sm font-bold text-white mb-4 font-mono flex items-center gap-2">
                <LinkIcon size={16} className="text-indigo-400" />
                Active Connections ({selectedNode.connections.length})
              </h3>

              {selectedNode.connections.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  No active relationships linked. Select a target node above to create a relationship connection!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedNode.connections.map((targetId) => {
                    const connNode = nodes.find((n) => n.id === targetId);
                    return (
                      <div
                        key={targetId}
                        className="p-3.5 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: connNode?.color || "#6366f1" }}
                          />
                          <div>
                            <span className="font-bold text-white block truncate">
                              {connNode ? connNode.label : targetId}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {connNode?.category || "Node"}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleRemoveConnection(targetId)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          title="Unlink Relationship"
                        >
                          <Unlink size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
