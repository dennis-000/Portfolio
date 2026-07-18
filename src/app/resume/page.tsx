"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Download, Eye, Settings2, Sparkles, Check, ArrowLeft,
  Mail, Phone, MapPin, Globe, Briefcase, Code2, GraduationCap 
} from "lucide-react";

// Inline SVG components for Github and Linkedin since lucide-react v1 does not export brand icons
const GithubIcon = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

import { PERSONAL, COMPANIES, FEATURED_PROJECTS, TECH_STACK } from "@/lib/data";
import { usePortfolioStore } from "@/store/portfolio";
import { cn } from "@/lib/utils";

// Custom accent options for the resume layout
const ACCENTS = [
  { name: "Cyan (Default)", color: "#06b6d4", rgb: "6, 182, 212" },
  { name: "Indigo", color: "#6366f1", rgb: "99, 102, 241" },
  { name: "Violet", color: "#8b5cf6", rgb: "139, 92, 246" },
  { name: "Emerald", color: "#10b981", rgb: "16, 185, 129" },
  { name: "Rose", color: "#f43f5e", rgb: "244, 63, 94" },
  { name: "Amber", color: "#f59e0b", rgb: "245, 158, 11" },
];

export default function ResumePage() {
  const globalAccent = usePortfolioStore((s) => s.accentColor);
  const [selectedAccent, setSelectedAccent] = useState(ACCENTS[0]);
  
  // Customization Toggles
  const [showVentures, setShowVentures] = useState(true);
  const [showProjects, setShowProjects] = useState(true);
  const [showMilestones, setShowMilestones] = useState(true);
  const [useCompactLayout, setUseCompactLayout] = useState(true);
  const [useMinimalText, setUseMinimalText] = useState(true);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen pt-52 sm:pt-56 lg:pt-64 pb-20">
      <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 md:px-16 lg:px-16 xl:px-20">
        
        {/* Header (Screen-only) */}
        <div className="mb-12 flex items-end justify-between flex-wrap gap-6 print:hidden">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors mb-4 group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to digital HQ
            </Link>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-3">
              Resume Workspace
            </h1>
            <p className="text-lg text-[var(--text-muted)] max-w-xl">
              Customize, preview, and export Dennis&apos; professional resume directly to a print-ready vector PDF.
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-white text-base font-bold transition-all duration-200 hover:opacity-95 hover:scale-[1.02] shadow-lg cursor-pointer"
            style={{
              backgroundColor: selectedAccent.color,
              boxShadow: `0 6px 20px rgba(${selectedAccent.rgb}, 0.35)`,
            }}
          >
            <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
            Download PDF Resume
          </button>
        </div>

        {/* ── Main Workspace Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* 🖥️ LEFT: Customization Panel (Screen-only) */}
          <div className="lg:col-span-4 space-y-6 print:hidden">
            <div className="p-6 rounded-2xl glass border border-[var(--border)] space-y-6">
              
              <div className="flex items-center gap-2 pb-3 border-b border-[var(--border)]">
                <Settings2 size={16} className="text-[var(--text-muted)]" />
                <h2 className="text-sm font-bold text-[var(--text)] uppercase tracking-wider">Customize Sheet</h2>
              </div>

              {/* Accent Color Picker */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Accent Theme</label>
                <div className="grid grid-cols-3 gap-2">
                  {ACCENTS.map((accent) => (
                    <button
                      key={accent.name}
                      onClick={() => setSelectedAccent(accent)}
                      className={cn(
                        "flex items-center justify-center p-2 rounded-xl text-[10px] font-bold border transition-all cursor-pointer",
                        selectedAccent.name === accent.name
                          ? "border-[var(--accent)] bg-white/5 text-[var(--text)]"
                          : "border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]"
                      )}
                      style={{ "--accent": accent.color } as React.CSSProperties}
                    >
                      <span className="w-2.5 h-2.5 rounded-full mr-1.5 shrink-0" style={{ backgroundColor: accent.color }} />
                      {accent.name.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Layout Density */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Layout Settings</label>
                <div className="flex flex-col gap-2.5">
                  <label className="flex items-center justify-between text-sm text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer">
                    <span>Compact layout (One Page)</span>
                    <input 
                      type="checkbox" 
                      checked={useCompactLayout} 
                      onChange={(e) => setUseCompactLayout(e.target.checked)}
                      className="rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
                    />
                  </label>
                  <label className="flex items-center justify-between text-sm text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer">
                    <span>Snappy short descriptions</span>
                    <input 
                      type="checkbox" 
                      checked={useMinimalText} 
                      onChange={(e) => setUseMinimalText(e.target.checked)}
                      className="rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
                    />
                  </label>
                </div>
              </div>

              {/* Sections Toggle */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Included Content</label>
                <div className="flex flex-col gap-2.5">
                  <label className="flex items-center justify-between text-sm text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer">
                    <span>Include Ventures ({COMPANIES.length})</span>
                    <input 
                      type="checkbox" 
                      checked={showVentures} 
                      onChange={(e) => setShowVentures(e.target.checked)}
                      className="rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
                    />
                  </label>
                  <label className="flex items-center justify-between text-sm text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer">
                    <span>Include Selected Projects</span>
                    <input 
                      type="checkbox" 
                      checked={showProjects} 
                      onChange={(e) => setShowProjects(e.target.checked)}
                      className="rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
                    />
                  </label>
                </div>
              </div>

            </div>
          </div>

          {/* 📄 RIGHT: High-Fidelity Resume Document Sheet */}
          <div className="lg:col-span-8 w-full flex justify-center">
            
            {/* Real printable page wrapper */}
            <div 
              id="resume-document"
              className={cn(
                "w-[794px] min-h-[1123px] bg-white text-[#111111] p-10 sm:p-12 shadow-2xl relative border border-gray-200 transition-all duration-300 font-sans print:border-none print:shadow-none print:p-0 print:m-0",
                useCompactLayout ? "text-[12px] leading-[1.4]" : "text-[13px] leading-[1.5]"
              )}
              style={{ 
                color: "#1a1a1a",
                fontFamily: "var(--font-geist-sans), Arial, sans-serif"
              }}
            >
              
              {/* Dynamic Accent Color top line */}
              <div className="absolute top-0 left-0 right-0 h-1.5" style={{ backgroundColor: selectedAccent.color }} />

              {/* ── Document Header ── */}
              <header className="mb-6 pb-5 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 font-display mb-1.5">
                    {PERSONAL.name}
                  </h2>
                  <p className="text-sm font-semibold tracking-wide uppercase" style={{ color: selectedAccent.color }}>
                    Multidisciplinary Builder & Tech Founder
                  </p>
                </div>
                
                {/* Contact list */}
                <div className="flex flex-col text-[11px] text-gray-600 gap-1 md:items-end">
                  <span className="flex items-center gap-1.5">
                    <Mail size={11} className="text-gray-400 shrink-0" />
                    <span>{PERSONAL.email}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={11} className="text-gray-400 shrink-0" />
                    <span>{PERSONAL.location}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Globe size={11} className="text-gray-400 shrink-0" />
                    <span>dennisopoku.com</span>
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="flex items-center gap-1">
                      <LinkedinIcon size={10} className="text-gray-400" />
                      <span>linkedin.com/in/dennisopoku</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <GithubIcon size={10} className="text-gray-400" />
                      <span>github.com/dennisopoku</span>
                    </span>
                  </div>
                </div>
              </header>

              {/* ── Career Summary ── */}
              <section className="mb-6">
                <p className="text-gray-700 leading-relaxed italic">
                  &ldquo;Dennis is a builder working at the frontier of technology, design, and business. 
                  As a software engineer and startup founder, he architects scalable software systems, 
                  trains AI models, directs creative visual campaigns, and builds real venture ecosystems.&rdquo;
                </p>
              </section>

              {/* ── Venture & Leadership Experience ── */}
              {showVentures && (
                <section className="mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
                    <Briefcase size={12} style={{ color: selectedAccent.color }} />
                    Venture & Startup Leadership
                  </h3>
                  
                  <div className="space-y-4">
                    {COMPANIES.map((company) => (
                      <div key={company.id} className="group">
                        <div className="flex items-center justify-between font-semibold text-gray-900 mb-1">
                          <span className="text-sm font-bold">{company.name}</span>
                          <span className="text-xs text-gray-500">Est. {company.founded}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-600 italic mb-2">
                          <span className="font-semibold" style={{ color: selectedAccent.color }}>{company.role}</span>
                          <span>Ghana / Remote</span>
                        </div>
                        
                        <p className="text-gray-700 mb-1.5 leading-relaxed">
                          {useMinimalText ? company.tagline : company.description}
                        </p>
                        <div className="text-[11px] font-semibold text-gray-800">
                          Key Venture Output: <span className="text-gray-700 font-normal">{company.achievements[0]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ── Tech Projects ── */}
              {showProjects && (
                <section className="mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
                    <Code2 size={12} style={{ color: selectedAccent.color }} />
                    Selected Engineering & AI Projects
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {FEATURED_PROJECTS.slice(0, 4).map((project) => (
                      <div key={project.id} className="p-3 border border-gray-100 rounded-xl bg-gray-50/50">
                        <div className="flex items-center justify-between font-bold text-gray-900 mb-1 text-xs">
                          <span>{project.title}</span>
                          <span className="text-[10px] text-gray-400 capitalize">{project.category}</span>
                        </div>
                        <p className="text-gray-600 text-[11px] mb-2 leading-relaxed">
                          {project.description}
                        </p>
                        <div className="text-[10px] text-gray-500 font-semibold mb-1">
                          Stack: <span className="font-normal text-gray-600">{project.tech.slice(0, 4).join(", ")}</span>
                        </div>
                        <div className="text-[10px] text-gray-700 font-bold flex items-center gap-1">
                          <span>Result:</span>
                          <span className="font-medium text-gray-600">{project.impact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ── Technical Skills ── */}
              <section className="mb-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
                  <Sparkles size={12} style={{ color: selectedAccent.color }} />
                  Technical Competency & Stack
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
                  {Object.entries(TECH_STACK).map(([category, items]) => (
                    <div key={category} className="p-2.5 rounded-xl border border-gray-100">
                      <span className="font-bold text-gray-900 block mb-1.5 text-[11px] uppercase tracking-wide">
                        {category}
                      </span>
                      <div className="flex flex-wrap gap-1 text-[10px]">
                        {items.map((item) => (
                          <span 
                            key={item} 
                            className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-medium"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Education & Background ── */}
              <section>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-2">
                  <GraduationCap size={12} style={{ color: selectedAccent.color }} />
                  Education & Philosophy
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-700">
                  <div>
                    <span className="font-bold text-gray-900">B.S. in Computer Science / Business Administration Studies</span>
                    <span className="block text-gray-500">Focus on Product Design, Software Architecture, and Local Market Venturing</span>
                  </div>
                  <span className="text-gray-400 text-right shrink-0">Ghana, West Africa</span>
                </div>
              </section>

            </div>

          </div>

        </div>

      </div>

      {/* ── Embedded Print Stylesheet ── */}
      <style jsx global>{`
        @media print {
          /* Hide all screen-only UI */
          body {
            background-color: #ffffff !important;
            color: #111111 !important;
          }
          header, footer, nav, button, .print\\:hidden, #nprogress {
            display: none !important;
          }
          main {
            margin: 0 !important;
            padding: 0 !important;
          }
          .min-h-screen {
            min-height: auto !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          /* Style the sheet exactly to fill page */
          #resume-document {
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            min-height: auto !important;
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }
          /* Page break controls */
          h3, header {
            page-break-after: avoid;
          }
          section {
            page-break-inside: avoid;
          }
        }
      `}</style>

    </div>
  );
}
