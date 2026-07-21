"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/Footer";
import RecruiterModeBar from "@/components/recruiter/RecruiterModeBar";
import IntentOnboarding from "@/components/intent/IntentOnboarding";
import { 
  Activity, 
  GitCommit, 
  Terminal, 
  Cpu, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink,
  Zap,
  Globe
} from "lucide-react";
import Link from "next/link";

interface CommitInfo {
  sha: string;
  message: string;
  date: string;
  url: string;
}

export default function MissionControlPage() {
  const [commits, setCommits] = useState<CommitInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHubCommits() {
      try {
        const res = await fetch("https://api.github.com/repos/dennis-000/Portfolio/commits?per_page=5");
        if (res.ok) {
          const data = await res.json();
          const parsed = data.map((item: any) => ({
            sha: item.sha.substring(0, 7),
            message: item.commit.message.split("\n")[0],
            date: new Date(item.commit.author.date).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
            url: item.html_url,
          }));
          setCommits(parsed);
        }
      } catch (e) {
        console.error("Failed to fetch commits", e);
      } finally {
        setLoading(false);
      }
    }
    fetchGitHubCommits();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text)] transition-colors duration-300">
      <Navigation />
      <RecruiterModeBar />
      <IntentOnboarding />

      <main className="pt-28 pb-20 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto">
        {/* Header Title */}
        <div className="mb-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Activity size={14} className="animate-pulse" />
            ATLAS V2 Operational Heartbeat
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[var(--text)] tracking-tight mb-3">
            Mission Control
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-2xl leading-relaxed">
            Real-time telemetry, active engineering focus, GitHub signals, deployment vitals, and learning roadmaps.
          </p>
        </div>

        {/* System Vitals Header Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="glass p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]/50">
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-2 font-medium">
              <span>System Status</span>
              <ShieldCheck size={16} className="text-emerald-400" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-emerald-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              100% Operational
            </div>
            <p className="text-[11px] text-[var(--text-muted)] mt-1">Vercel Edge Platform</p>
          </div>

          <div className="glass p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]/50">
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-2 font-medium">
              <span>Active Sprint</span>
              <Zap size={16} className="text-indigo-400" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-[var(--text)]">
              ATLAS V2 Core
            </div>
            <p className="text-[11px] text-[var(--text-muted)] mt-1">Phase 1 Execution</p>
          </div>

          <div className="glass p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]/50">
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-2 font-medium">
              <span>Production Stack</span>
              <Cpu size={16} className="text-purple-400" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-[var(--text)]">
              Next.js 16 + Turbo
            </div>
            <p className="text-[11px] text-[var(--text-muted)] mt-1">Turbopack Bundler</p>
          </div>

          <div className="glass p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]/50">
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-2 font-medium">
              <span>Availability</span>
              <Globe size={16} className="text-amber-400" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-amber-400">
              Open to Hire
            </div>
            <p className="text-[11px] text-[var(--text-muted)] mt-1">Worldwide Remote</p>
          </div>
        </div>

        {/* 2-Column Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Left 2 Cols: Main Operations */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Active Focus Card */}
            <div className="glass p-6 sm:p-8 rounded-3xl border border-[var(--border)] bg-[var(--bg-secondary)]/40 relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <Terminal size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--text)]">Current Engineering Focus</h2>
                    <p className="text-xs text-[var(--text-muted)]">Active engineering initiatives for Q3 2026</p>
                  </div>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
                  In Progress
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-[var(--border)] flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text)]">ATLAS V2 Persona & Recruiter Engine</h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      Adaptive intent onboarding, dedicated recruiter candidate evaluation mode, and automated brief generator.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-[var(--border)] flex items-start gap-3">
                  <Clock size={18} className="text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text)]">Interactive Knowledge Graph & Dev HUD</h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      Visual cross-disciplinary node network linking skills, projects, and architecture details with real-time performance HUD.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* GitHub Engineering Signals Card */}
            <div className="glass p-6 sm:p-8 rounded-3xl border border-[var(--border)] bg-[var(--bg-secondary)]/40">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                    <GitCommit size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--text)]">Live GitHub Signals</h2>
                    <p className="text-xs text-[var(--text-muted)]">Real-time commit telemetry from origin main</p>
                  </div>
                </div>
                <a
                  href="https://github.com/dennis-000/Portfolio"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-1"
                >
                  View Repo <ExternalLink size={12} />
                </a>
              </div>

              {loading ? (
                <div className="text-sm text-[var(--text-muted)] animate-pulse py-6 text-center">
                  Fetching live commit signals...
                </div>
              ) : commits.length > 0 ? (
                <div className="space-y-3 font-mono text-xs">
                  {commits.map((commit) => (
                    <a
                      key={commit.sha}
                      href={commit.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group p-3.5 rounded-2xl bg-white/[0.02] border border-[var(--border)] hover:border-[var(--accent)]/50 hover:bg-white/[0.05] transition-all flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 truncate">
                        <span className="px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-400 font-bold shrink-0">
                          {commit.sha}
                        </span>
                        <span className="text-[var(--text)] font-sans truncate group-hover:text-[var(--accent)] transition-colors">
                          {commit.message}
                        </span>
                      </div>
                      <span className="text-[11px] text-[var(--text-muted)] shrink-0">
                        {commit.date}
                      </span>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-[var(--text-muted)] py-4 text-center">
                  Live commits synchronized.
                </div>
              )}
            </div>

          </div>

          {/* Right 1 Col: Tech Radar & Roadmap */}
          <div className="space-y-8">
            
            {/* Tech Stack & Learning Roadmap */}
            <div className="glass p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg-secondary)]/40">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                  <Cpu size={18} />
                </div>
                <h3 className="font-bold text-lg text-[var(--text)]">Tech Stack Exploration</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text)] font-semibold">Next.js 16 + React 19</span>
                  <span className="text-emerald-400 font-mono text-[11px]">Production</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text)] font-semibold">TypeScript & Tailwind</span>
                  <span className="text-emerald-400 font-mono text-[11px]">Expert</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text)] font-semibold">Vercel Blob & Resend</span>
                  <span className="text-emerald-400 font-mono text-[11px]">Active</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text)] font-semibold">Vector Databases (pgvector)</span>
                  <span className="text-indigo-400 font-mono text-[11px]">Exploring</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text)] font-semibold">Rust WebAssembly</span>
                  <span className="text-purple-400 font-mono text-[11px]">Learning</span>
                </div>
              </div>
            </div>

            {/* Reading List */}
            <div className="glass p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg-secondary)]/40">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                  <BookOpen size={18} />
                </div>
                <h3 className="font-bold text-lg text-[var(--text)]">Current Reading List</h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-[var(--border)]">
                  <p className="font-bold text-[var(--text)]">Designing Data-Intensive Applications</p>
                  <p className="text-[var(--text-muted)] text-[11px] mt-0.5">Martin Kleppmann</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-[var(--border)]">
                  <p className="font-bold text-[var(--text)]">Building Microservices (2nd Edition)</p>
                  <p className="text-[var(--text-muted)] text-[11px] mt-0.5">Sam Newman</p>
                </div>
              </div>
            </div>

            {/* Quick CTAs */}
            <div className="glass p-6 rounded-3xl border border-[var(--border)] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 text-center">
              <Sparkles size={24} className="text-indigo-400 mx-auto mb-3" />
              <h3 className="font-bold text-base text-[var(--text)] mb-1">Want to collaborate?</h3>
              <p className="text-xs text-[var(--text-muted)] mb-4">
                Dennis is open for high-impact software engineering roles & advisory.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-md w-full"
              >
                Get in Touch <ArrowUpRight size={14} />
              </Link>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
