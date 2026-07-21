"use client";

import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/Footer";
import RecruiterModeBar from "@/components/recruiter/RecruiterModeBar";
import IntentOnboarding from "@/components/intent/IntentOnboarding";
import KnowledgeGraph from "@/components/graph/KnowledgeGraph";
import { Sparkles, Layers } from "lucide-react";

export default function GraphPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text)] transition-colors duration-300">
      <Navigation />
      <RecruiterModeBar />
      <IntentOnboarding />

      <main className="pt-28 pb-20 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="mb-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Layers size={14} />
            Cross-Disciplinary Discovery
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[var(--text)] tracking-tight mb-3">
            Knowledge Graph
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-2xl leading-relaxed">
            Explore how software engineering, AI architecture, creative direction, and startup ventures connect into a single unified system.
          </p>
        </div>

        <KnowledgeGraph />
      </main>

      <Footer />
    </div>
  );
}
