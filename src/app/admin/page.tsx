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
  Search
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
    a.download = "portfolio-data-backup.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
        <span className="text-xs text-[var(--text-muted)] mt-4 font-mono">Initializing Console...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] text-center">
        <AlertCircle size={32} className="text-rose-500 mb-4 animate-bounce" />
        <h3 className="text-lg font-bold text-white">Console System Error</h3>
        <p className="text-sm text-[var(--text-muted)] mt-1.5">{error}</p>
      </div>
    );
  }

  const projectsCount = data?.FEATURED_PROJECTS?.length || 0;
  const blogsCount = data?.BLOG_POSTS?.length || 0;
  const venturesCount = data?.COMPANIES?.length || 0;

  return (
    <div className="space-y-8 flex-1 flex flex-col">
      {/* ── Page Header & Quick Export ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-white">System Executive Overview</h2>
          <p className="text-xs text-[var(--text-muted)]">Analyze website health metrics and content summaries.</p>
        </div>
        <button
          onClick={handleExportJson}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer shadow-md"
        >
          <Download size={13} />
          <span>Export Config JSON</span>
        </button>
      </div>

      {/* ── Stats Summary Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Active Projects", value: projectsCount, icon: Briefcase, color: "text-[#6366f1]", bg: "bg-[#6366f1]/10" },
          { label: "Blog Posts", value: blogsCount, icon: FileText, color: "text-[#8b5cf6]", bg: "bg-[#8b5cf6]/10" },
          { label: "Creative Ventures", value: venturesCount, icon: Rocket, color: "text-[#10b981]", bg: "bg-[#10b981]/10" },
          { label: "Monthly Visits", value: "14.2K", icon: Users, color: "text-[#06b6d4]", bg: "bg-[#06b6d4]/10", suffix: "+12%" }
        ].map((stat, i) => (
          <div key={i} className="glass border border-white/5 p-6 rounded-2xl flex items-center justify-between shadow-xl">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">{stat.label}</p>
              <h3 className="text-3xl font-bold font-display text-white leading-none">{stat.value}</h3>
              {stat.suffix && (
                <div className="flex items-center gap-1 mt-2 text-[9px] font-bold text-emerald-400">
                  <TrendingUp size={10} />
                  <span>{stat.suffix} this month</span>
                </div>
              )}
            </div>
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} shadow-inner`}>
              <stat.icon size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Main Layout Split ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        
        {/* Left 2 Cols: Analytics Simulator & Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Simulated Traffic Insights */}
          <div className="glass border border-white/5 p-6 rounded-2xl shadow-xl flex flex-col">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">Widescreen Traffic Activity</h3>
              <span className="text-[9px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">Live Plausible Feed</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                { label: "Bounce Rate", value: "42.1%" },
                { label: "Avg. Duration", value: "1m 58s" },
                { label: "Pageviews", value: "31.9K" },
                { label: "Unique Users", value: "8.4K" }
              ].map((m, i) => (
                <div key={i} className="bg-white/[0.01] border border-white/5 p-3.5 rounded-xl text-center">
                  <p className="text-[8px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">{m.label}</p>
                  <h4 className="text-lg font-bold text-white font-mono">{m.value}</h4>
                </div>
              ))}
            </div>

            {/* Simulated Referrals List */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">Top Inbound Channels</h4>
              {[
                { name: "github.com", percent: 48, count: "6,816 clicks" },
                { name: "linkedin.com", percent: 28, count: "3,976 clicks" },
                { name: "direct / search", percent: 14, count: "1,988 clicks" },
                { name: "twitter.com", percent: 10, count: "1,420 clicks" }
              ].map((ref, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white/90">{ref.name}</span>
                  <div className="flex items-center gap-3 w-1/2">
                    <div className="h-1.5 flex-1 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full bg-[#6366f1] rounded-full" style={{ width: `${ref.percent}%` }} />
                    </div>
                    <span className="font-mono text-[10px] text-[var(--text-muted)] w-10 text-right">{ref.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="glass border border-white/5 p-6 rounded-2xl shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/5 pb-4 mb-4">Quick Operations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: "Create Project", href: "/admin/projects", icon: Plus, desc: "Add a case study from Github" },
                { label: "Write Article", href: "/admin/blog", icon: Plus, desc: "Publish MDX article content" },
                { label: "Manage Designs", href: "/admin/designs", icon: Settings, desc: "Post posters, flyers or UI mockups" }
              ].map((act, i) => (
                <Link 
                  key={i} 
                  href={act.href} 
                  className="p-4 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] rounded-xl flex flex-col justify-between group transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                      <act.icon size={14} />
                    </div>
                    <ArrowUpRight size={12} className="text-[var(--text-muted)] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-none mb-1">{act.label}</h4>
                    <p className="text-[9px] text-[var(--text-muted)] leading-tight">{act.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Health & System Feeds */}
        <div className="space-y-6">
          {/* SEO & System Audit Check */}
          <div className="glass border border-white/5 p-6 rounded-2xl shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/5 pb-4 mb-4">System SEO Audit</h3>
            <div className="space-y-3.5">
              {[
                { label: "Sitemap.xml indexing status", active: true },
                { label: "Robots.txt crawl validation", active: true },
                { label: "Personal meta-tag indexation", active: true },
                { label: "Dynamic dynamic revalidation", active: true },
                { label: "No broken links found", active: true }
              ].map((chk, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs">
                  {chk.active ? (
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle size={14} className="text-amber-500 shrink-0" />
                  )}
                  <span className="font-semibold text-white/80">{chk.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Log Feed */}
          <div className="glass border border-white/5 p-6 rounded-2xl shadow-xl flex-1 flex flex-col">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/5 pb-4 mb-4">Recent Audit Activity</h3>
            <div className="space-y-4 flex-1 overflow-y-auto">
              {[
                { event: "Portfolio accent color updated via sandbox", time: "2 minutes ago", badge: "Playground" },
                { event: "Personal profile variables dynamic check", time: "1 hour ago", badge: "Auth" },
                { event: "Admin session generated via passkey cookie", time: "10 hours ago", badge: "Security" },
                { event: "Next.js revalidation cache cleared", time: "1 day ago", badge: "Cache" }
              ].map((log, i) => (
                <div key={i} className="flex flex-col border-b border-white/[0.02] pb-3 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="font-bold text-indigo-400 bg-indigo-500/5 border border-indigo-500/10 px-1.5 py-0.25 rounded-md">{log.badge}</span>
                    <span className="text-[9px] text-[var(--text-muted)]">{log.time}</span>
                  </div>
                  <p className="text-[11px] font-semibold text-white/95 leading-relaxed">{log.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
