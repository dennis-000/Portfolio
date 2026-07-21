"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ATLAS_STORIES, StoryPath, SPATIAL_GRAPH_NODES, GraphNode3D } from "@/lib/graphData";
import { Play, SkipForward, X, Sparkles, BookOpen } from "lucide-react";

interface StoryModeControllerProps {
  onSelectNode: (node: GraphNode3D) => void;
}

export default function StoryModeController({ onSelectNode }: StoryModeControllerProps) {
  const [activeStory, setActiveStory] = useState<StoryPath | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const startStory = (story: StoryPath) => {
    setActiveStory(story);
    setCurrentStepIndex(0);
    const targetNode = SPATIAL_GRAPH_NODES.find((n) => n.id === story.steps[0].nodeId);
    if (targetNode) onSelectNode(targetNode);
  };

  const nextStep = () => {
    if (!activeStory) return;
    const nextIdx = (currentStepIndex + 1) % activeStory.steps.length;
    setCurrentStepIndex(nextIdx);
    const targetNode = SPATIAL_GRAPH_NODES.find((n) => n.id === activeStory.steps[nextIdx].nodeId);
    if (targetNode) onSelectNode(targetNode);
  };

  const exitStory = () => {
    setActiveStory(null);
    setCurrentStepIndex(0);
  };

  return (
    <>
      {/* Story Selector Pills */}
      {!activeStory && (
        <div className="flex flex-wrap items-center gap-2">
          {ATLAS_STORIES.map((story) => (
            <button
              key={story.id}
              onClick={() => startStory(story)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 text-xs font-bold transition-all cursor-pointer shadow-md"
            >
              <Play size={12} />
              <span>Story: {story.title}</span>
            </button>
          ))}
        </div>
      )}

      {/* Active Story Narration Banner */}
      {activeStory && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[1005] w-[90vw] max-w-2xl glass-strong border border-purple-500/50 bg-slate-950/95 rounded-2xl p-4 shadow-2xl font-sans text-xs text-slate-200"
        >
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-purple-500/30 text-purple-300 font-mono font-bold text-[10px]">
                STORY MODE ({currentStepIndex + 1}/{activeStory.steps.length})
              </span>
              <h4 className="font-bold text-white text-xs">{activeStory.title}</h4>
            </div>

            <button
              onClick={exitStory}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>

          <div className="space-y-1 mb-3">
            <h5 className="font-bold text-indigo-300 text-xs">
              {activeStory.steps[currentStepIndex].caption}
            </h5>
            <p className="text-slate-300 text-xs leading-relaxed">
              {activeStory.steps[currentStepIndex].narrative}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <span className="text-[10px] text-slate-400 font-mono">Camera tracking active node</span>
            <button
              onClick={nextStep}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
            >
              <span>Next Step</span>
              <SkipForward size={13} />
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
