"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Briefcase, 
  FileText, 
  Rocket, 
  TrendingUp, 
  Users, 
  ArrowUpRight, 
  Download, 
  Plus, 
  Settings, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  Search,
  Layers,
  Bot,
  Zap,
  Palette,
  Mail,
  Globe,
  Cpu,
  Terminal,
  Activity
} from "lucide-react";

export default function AdminPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/data")
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          setError(json.error);
        } else {
          setData(json);
        }
      })
      .catch(() => setError("Failed to fetch dashboard data"))
      .finally(() => setIsLoading(false));
  }, []);

  const handleExportJson = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `atlas-portfolio-backup-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
        <span className="text-xs text-[var(--text-muted)] mt-4 font-mono">Initializing ATLAS Control Center V2...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans p-2">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[var(--border)]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2 font-mono">
            <Activity size={14} className="animate-pulse" />
            ATLAS Control Center V2 Active
          </div>
          <h1 className="text-3xl font-extrabold text-[var(--text)] tracking-tight font-display">
            Operational Control Center
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1 max-w-xl">
            Single source of truth for portfolio content, 3D Spatial Knowledge Graph, AI Knowledge Base, and automated operations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportJson}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-[var(--text)] transition-all cursor-pointer shadow-md"
          >
            <Download size={14} />
            <span>Export JSON Backup</span>
          </button>
        </div>
      </div>

      {/* System Telemetry Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]/40">
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-2 font-mono">
            <span>System Status</span>
            <ShieldCheck size={16} className="text-emerald-400" />
          </div>
          <div className="text-lg font-bold text-emerald-400 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            100% Operational
          </div>
          <p className="text-[11px] text-[var(--text-muted)] mt-1">Vercel Edge Engine</p>
        </div>

        <div className="glass p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]/40">
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-2 font-mono">
            <span>Featured Projects</span>
            <Briefcase size={16} className="text-indigo-400" />
          </div>
          <div className="text-lg font-bold text-[var(--text)] font-mono">
            {data?.FEATURED_PROJECTS?.length || 0} Case Studies
          </div>
          <p className="text-[11px] text-[var(--text-muted)] mt-1">Explorable Workspaces</p>
        </div>

        <div className="glass p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]/40">
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-2 font-mono">
            <span>Knowledge Graph</span>
            <Layers size={16} className="text-purple-400" />
          </div>
          <div className="text-lg font-bold text-[var(--text)] font-mono">
            3D Spatial Universe
          </div>
          <p className="text-[11px] text-[var(--text-muted)] mt-1">Linked Nodes</p>
        </div>

        <div className="glass p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]/40">
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-2 font-mono">
            <span>Subscribers</span>
            <Users size={16} className="text-amber-400" />
          </div>
          <div className="text-lg font-bold text-amber-400 font-mono">
            {data?.SUBSCRIBERS?.length || 0} Contacts
          </div>
          <p className="text-[11px] text-[var(--text-muted)] mt-1">Resend Broadcaster</p>
        </div>
      </div>

      {/* Operational Module Control Grid */}
      <div>
        <h2 className="text-lg font-bold text-[var(--text)] mb-4 font-mono">Control Center Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Module 1: Graph Builder */}
          <Link
            href="/admin/graph-builder"
            className="group p-5 rounded-2xl glass border border-purple-500/30 bg-purple-500/[0.03] hover:bg-purple-500/10 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 w-fit mb-3">
                <Layers size={20} />
              </div>
              <h3 className="font-bold text-base text-[var(--text)] group-hover:text-purple-400 transition-colors font-display">
                Visual Knowledge Graph Builder
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                Connect node relationships across Projects, Tech, Companies, Blogs, and Skills for the 3D Spatial Explorer.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-400 mt-4">
              Open Graph Builder <ArrowUpRight size={14} />
            </span>
          </Link>

          {/* Module 2: Projects Workspace */}
          <Link
            href="/admin/projects"
            className="group p-5 rounded-2xl glass border border-indigo-500/30 bg-indigo-500/[0.03] hover:bg-indigo-500/10 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 w-fit mb-3">
                <Briefcase size={20} />
              </div>
              <h3 className="font-bold text-base text-[var(--text)] group-hover:text-indigo-400 transition-colors font-display">
                Projects & Architecture Workspace
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                Edit case studies, visual system architecture flows, and "Why?" engineering decision trade-offs.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-400 mt-4">
              Open Projects Workspace <ArrowUpRight size={14} />
            </span>
          </Link>

          {/* Module 3: Recruiter & Story Mode */}
          <Link
            href="/admin/experience"
            className="group p-5 rounded-2xl glass border border-amber-500/30 bg-amber-500/[0.03] hover:bg-amber-500/10 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 w-fit mb-3">
                <Briefcase size={20} />
              </div>
              <h3 className="font-bold text-base text-[var(--text)] group-hover:text-amber-400 transition-colors font-display">
                Recruiter & Story Mode Manager
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                Edit recruiter candidate evaluation briefs, review duration, and guided 3D story paths.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 mt-4">
              Open Experience Manager <ArrowUpRight size={14} />
            </span>
          </Link>

          {/* Module 4: AI Assistant Knowledge Base */}
          <Link
            href="/admin/ai-knowledge"
            className="group p-5 rounded-2xl glass border border-emerald-500/30 bg-emerald-500/[0.03] hover:bg-emerald-500/10 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 w-fit mb-3">
                <Bot size={20} />
              </div>
              <h3 className="font-bold text-base text-[var(--text)] group-hover:text-emerald-400 transition-colors font-display">
                AI Knowledge Base Manager
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                Configure AI System Personas, prompt templates, architecture FAQs, and reference context.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 mt-4">
              Open AI Knowledge Base <ArrowUpRight size={14} />
            </span>
          </Link>

          {/* Module 5: Operations & Automation */}
          <Link
            href="/admin/operations"
            className="group p-5 rounded-2xl glass border border-rose-500/30 bg-rose-500/[0.03] hover:bg-rose-500/10 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 w-fit mb-3">
                <Zap size={20} />
              </div>
              <h3 className="font-bold text-base text-[var(--text)] group-hover:text-rose-400 transition-colors font-display">
                Automation & Operations Console
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                Trigger full route cache revalidation, rebuild semantic search index, and export JSON backups.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-400 mt-4">
              Open Operations Console <ArrowUpRight size={14} />
            </span>
          </Link>

          {/* Module 6: Platform Settings */}
          <Link
            href="/admin/settings"
            className="group p-5 rounded-2xl glass border border-slate-500/30 bg-slate-500/[0.03] hover:bg-slate-500/10 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="p-2.5 rounded-xl bg-slate-500/20 text-slate-300 w-fit mb-3">
                <Settings size={20} />
              </div>
              <h3 className="font-bold text-base text-[var(--text)] group-hover:text-slate-300 transition-colors font-display">
                Global Platform Settings
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                Configure personal profile parameters, contact details, social links, and security credentials.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-300 mt-4">
              Open Platform Settings <ArrowUpRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
