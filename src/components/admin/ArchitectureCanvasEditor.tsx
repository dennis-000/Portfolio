"use client";

import { useState } from "react";
import { Layers, Plus, Trash2, ArrowDown, MoveDown } from "lucide-react";

export interface ComponentPipelineStep {
  layer: string;
  tech: string;
  description: string;
}

interface ArchitectureCanvasEditorProps {
  components: ComponentPipelineStep[];
  onChange: (updated: ComponentPipelineStep[]) => void;
}

export default function ArchitectureCanvasEditor({
  components,
  onChange,
}: ArchitectureCanvasEditorProps) {
  const [newLayer, setNewLayer] = useState("");
  const [newTech, setNewTech] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const handleAddComponent = () => {
    if (!newLayer || !newTech) return;
    const updated = [...components, { layer: newLayer, tech: newTech, description: newDesc }];
    onChange(updated);
    setNewLayer("");
    setNewTech("");
    setNewDesc("");
  };

  const handleRemoveComponent = (idx: number) => {
    const updated = components.filter((_, i) => i !== idx);
    onChange(updated);
  };

  return (
    <div className="p-5 rounded-2xl glass border border-indigo-500/30 bg-slate-950/80 font-sans text-xs">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10 text-indigo-400 font-mono font-bold">
        <div className="flex items-center gap-2">
          <Layers size={16} />
          <span>System Architecture Flow Components</span>
        </div>
        <span className="text-[10px] text-slate-400">({components.length} Pipeline Layers)</span>
      </div>

      {/* Existing Component Pipeline List */}
      <div className="space-y-3 mb-6">
        {components.map((comp, idx) => (
          <div key={idx} className="relative">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-mono font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white text-xs">{comp.layer}</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[10px] font-bold">
                      {comp.tech}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-normal">{comp.description}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRemoveComponent(idx)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>

            {idx < components.length - 1 && (
              <div className="flex justify-center my-1">
                <MoveDown size={14} className="text-indigo-400 opacity-60" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add New Component Form */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 space-y-3">
        <span className="font-bold text-white text-xs block mb-1">Add Architecture Pipeline Step:</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Layer (e.g. Client Interface, API Gateway)"
            value={newLayer}
            onChange={(e) => setNewLayer(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder="Technology (e.g. Next.js 16, FastAPI, PostgreSQL)"
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <textarea
          placeholder="Technical description of what this architecture component executes..."
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 h-16 resize-none"
        />
        <button
          type="button"
          onClick={handleAddComponent}
          disabled={!newLayer || !newTech}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-md cursor-pointer disabled:opacity-40 flex items-center justify-center gap-1.5 w-full"
        >
          <Plus size={14} />
          <span>Add Step to Architecture Pipeline</span>
        </button>
      </div>
    </div>
  );
}
