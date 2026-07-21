"use client";

import { useState } from "react";
import { 
  Briefcase, 
  BookOpen, 
  Save, 
  CheckCircle2, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Sparkles,
  FileText,
  Clock
} from "lucide-react";
import Link from "next/link";
import { ATLAS_STORIES, StoryPath } from "@/lib/graphData";

export default function ExperienceAdminPage() {
  const [reviewTime, setReviewTime] = useState("2 Mins");
  const [candidateBriefText, setCandidateBriefText] = useState(
    `DE CANDIDATE BRIEF — DENNIS OPOKU ASIEDU\n• Primary Role: Software Engineer & Full-Stack Architect\n• Core Expertise: Next.js, TypeScript, AI System Integration, Distributed Systems\n• Key Achievements: Built end-to-end AI platform processing 50k+ requests, designed micro-frontend architecture for enterprise SaaS.\n• Availability: Open to High-Impact Full-Time & Contract Engineering Roles\n• Location: Ghana, West Africa · Worldwide Remote`
  );
  const [stories, setStories] = useState<StoryPath[]>(ATLAS_STORIES);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveExperience = async () => {
    setIsSaving(true);
    setSavedSuccess(false);
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          RECRUITER_CONFIG: { reviewTime, candidateBriefText },
          ATLAS_STORIES: stories,
        }),
      });
      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (e) {
      console.error("Save experience error", e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
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
              <Briefcase className="text-indigo-400" size={28} />
              Recruiter & Story Mode Manager
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Configure recruiter candidate evaluation briefs, review duration, and guided 3D story tours without code changes.
            </p>
          </div>

          <button
            onClick={handleSaveExperience}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer disabled:opacity-50"
          >
            {savedSuccess ? <CheckCircle2 size={16} /> : <Save size={16} />}
            <span>{isSaving ? "Saving..." : savedSuccess ? "Experience Saved!" : "Publish Experience Updates"}</span>
          </button>
        </div>

        <div className="space-y-8">
          {/* Section 1: Recruiter Mode Configuration */}
          <div className="glass p-6 rounded-2xl border border-indigo-500/30 bg-slate-900/60">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10 text-indigo-400 font-bold font-mono">
              <Briefcase size={18} />
              <span>Recruiter Mode & Candidate Brief Configuration</span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-slate-400 font-bold block mb-1">
                  Estimated Recruiter Review Time:
                </label>
                <input
                  type="text"
                  value={reviewTime}
                  onChange={(e) => setReviewTime(e.target.value)}
                  className="w-full max-w-xs px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-400 font-bold block mb-1">
                  Executive Candidate Brief Template (One-Click Recruiter Copy):
                </label>
                <textarea
                  value={candidateBriefText}
                  onChange={(e) => setCandidateBriefText(e.target.value)}
                  rows={6}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed font-mono resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Guided Story Mode Editor */}
          <div className="glass p-6 rounded-2xl border border-purple-500/30 bg-slate-900/60">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10 text-purple-400 font-bold font-mono">
              <div className="flex items-center gap-2">
                <BookOpen size={18} />
                <span>Guided Story Mode Paths ({stories.length})</span>
              </div>
            </div>

            <div className="space-y-4">
              {stories.map((story, storyIdx) => (
                <div key={story.id} className="p-5 rounded-2xl bg-slate-950 border border-white/10 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-300 text-sm">{story.title}</span>
                    <span className="text-[10px] text-slate-400">{story.steps.length} Camera Steps</span>
                  </div>
                  <p className="text-slate-300 text-xs font-sans">{story.description}</p>

                  <div className="p-3 rounded-xl bg-slate-900/90 border border-white/5 space-y-2">
                    <span className="text-slate-400 font-bold block">Story Narrative Steps:</span>
                    {story.steps.map((step, stepIdx) => (
                      <div key={stepIdx} className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-300 font-bold text-[9px] flex items-center justify-center shrink-0 mt-0.5">
                          {stepIdx + 1}
                        </span>
                        <div>
                          <span className="font-bold text-white block">{step.caption}</span>
                          <span className="text-slate-400 text-[11px] font-sans">{step.narrative}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
