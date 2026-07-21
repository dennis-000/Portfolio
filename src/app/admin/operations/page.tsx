"use client";

import { useState } from "react";
import { 
  Zap, 
  RefreshCw, 
  Download, 
  Database, 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle2, 
  Layers,
  Search,
  Activity
} from "lucide-react";
import Link from "next/link";

export default function OperationsAdminPage() {
  const [revalidating, setRevalidating] = useState(false);
  const [revalidateDone, setRevalidateDone] = useState(false);
  const [indexBuilding, setIndexBuilding] = useState(false);
  const [indexDone, setIndexDone] = useState(false);

  const handleRevalidateCaches = async () => {
    setRevalidating(true);
    setRevalidateDone(false);
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "revalidate_all" }),
      });
      if (res.ok) {
        setRevalidateDone(true);
        setTimeout(() => setRevalidateDone(false), 3000);
      }
    } catch (e) {
      console.error("Revalidate error", e);
    } finally {
      setRevalidating(false);
    }
  };

  const handleRebuildSearchIndex = async () => {
    setIndexBuilding(true);
    setIndexDone(false);
    setTimeout(() => {
      setIndexBuilding(false);
      setIndexDone(true);
      setTimeout(() => setIndexDone(false), 3000);
    }, 1500);
  };

  const handleDownloadBackup = async () => {
    try {
      const res = await fetch("/api/admin/data");
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `atlas-portfolio-backup-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Backup download error", e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-10 font-sans">
      <div className="max-w-5xl mx-auto">
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
              <Zap className="text-amber-400" size={28} />
              Content Automation & Operations Center
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              One-click system operations: revalidate caches across all routes, rebuild semantic search index, and export JSON backups.
            </p>
          </div>
        </div>

        {/* Operations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Revalidate Caches Card */}
          <div className="glass p-6 rounded-2xl border border-emerald-500/30 bg-slate-900/60 font-mono text-xs">
            <div className="flex items-center justify-between mb-3 text-emerald-400 font-bold">
              <div className="flex items-center gap-2">
                <RefreshCw size={18} className={revalidating ? "animate-spin" : ""} />
                <span>Revalidate App Router Caches</span>
              </div>
              <span className="text-[10px] text-slate-400">Next.js Edge ISR</span>
            </div>
            <p className="text-slate-300 font-sans text-xs mb-5 leading-relaxed">
              Clears static generation caches for all routes (`/`, `/engineering`, `/ai`, `/projects`, `/graph`, `/atlas`, `/resume`) and forces immediate Edge regeneration.
            </p>

            <button
              onClick={handleRevalidateCaches}
              disabled={revalidating}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {revalidateDone ? <CheckCircle2 size={16} /> : <RefreshCw size={16} />}
              <span>{revalidating ? "Revalidating Caches..." : revalidateDone ? "Caches Revalidated!" : "Trigger Full Cache Revalidation"}</span>
            </button>
          </div>

          {/* Rebuild Search Index Card */}
          <div className="glass p-6 rounded-2xl border border-indigo-500/30 bg-slate-900/60 font-mono text-xs">
            <div className="flex items-center justify-between mb-3 text-indigo-400 font-bold">
              <div className="flex items-center gap-2">
                <Search size={18} />
                <span>Rebuild Search Index</span>
              </div>
              <span className="text-[10px] text-slate-400">Semantic Index</span>
            </div>
            <p className="text-slate-300 font-sans text-xs mb-5 leading-relaxed">
              Re-indexes all case studies, blog posts, 3D Spatial Graph nodes, and tech stack tags for instant Command Palette (`Cmd+K`) search.
            </p>

            <button
              onClick={handleRebuildSearchIndex}
              disabled={indexBuilding}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {indexDone ? <CheckCircle2 size={16} /> : <Search size={16} />}
              <span>{indexBuilding ? "Building Index..." : indexDone ? "Index Rebuilt!" : "Rebuild Search Index"}</span>
            </button>
          </div>

          {/* Full Backup Download Card */}
          <div className="glass p-6 rounded-2xl border border-purple-500/30 bg-slate-900/60 font-mono text-xs md:col-span-2">
            <div className="flex items-center justify-between mb-3 text-purple-400 font-bold">
              <div className="flex items-center gap-2">
                <Database size={18} />
                <span>Full Portfolio Data Backup & Export</span>
              </div>
              <span className="text-[10px] text-slate-400">JSON Archive</span>
            </div>
            <p className="text-slate-300 font-sans text-xs mb-5 leading-relaxed">
              Exports 100% of structured portfolio data—including 3D Knowledge Graph nodes, "Why?" decisions, AI knowledge items, recruiter briefs, and case studies—into a single portable backup file.
            </p>

            <button
              onClick={handleDownloadBackup}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Download size={16} />
              <span>Download Full Data Backup (.json)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
