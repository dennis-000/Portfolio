"use client";

import { motion } from "framer-motion";
import { Code, Server, Database, Globe, GitBranch, Cpu } from "lucide-react";
import { TECH_STACK, FEATURED_PROJECTS } from "@/lib/data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ARCHITECTURE_NODES: { id: string; label: string; sublabel: string; x: number; y: number; icon: React.ComponentType<any>; color: string }[] = [
  { id: "client", label: "Client", sublabel: "Next.js / React", x: 10, y: 20, icon: Globe, color: "#6366f1" },
  { id: "api", label: "API Layer", sublabel: "REST / GraphQL / tRPC", x: 50, y: 20, icon: Server, color: "#8b5cf6" },
  { id: "services", label: "Services", sublabel: "Node / FastAPI / Go", x: 50, y: 55, icon: Cpu, color: "#06b6d4" },
  { id: "db", label: "Database", sublabel: "PostgreSQL / Redis", x: 85, y: 55, icon: Database, color: "#10b981" },
  { id: "ci", label: "CI/CD", sublabel: "GitHub Actions / Vercel", x: 10, y: 75, icon: GitBranch, color: "#f59e0b" },
];

function ArchitectureDiagram() {
  return (
    <div className="relative w-full h-52 sm:h-64 glass rounded-2xl border border-[var(--border)] overflow-hidden p-4">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      {/* SVG connections */}
      <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="3" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" fill="rgba(99,102,241,0.4)" />
          </marker>
        </defs>
        {/* Client → API */}
        <motion.line
          x1="18%" y1="30%" x2="44%" y2="30%"
          stroke="rgba(99,102,241,0.35)" strokeWidth="1.5" markerEnd="url(#arrowhead)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        {/* API → Services */}
        <motion.line
          x1="50%" y1="35%" x2="50%" y2="50%"
          stroke="rgba(139,92,246,0.35)" strokeWidth="1.5" markerEnd="url(#arrowhead)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
        {/* Services → DB */}
        <motion.line
          x1="62%" y1="62%" x2="79%" y2="62%"
          stroke="rgba(16,185,129,0.35)" strokeWidth="1.5" markerEnd="url(#arrowhead)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        />
      </svg>

      {ARCHITECTURE_NODES.map((node, i) => {
        const Icon = node.icon;
        return (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15, type: "spring", stiffness: 300 }}
            className="absolute flex flex-col items-center"
            style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center mb-1.5 border"
              style={{
                backgroundColor: `${node.color}22`,
                borderColor: `${node.color}44`,
              }}
            >
              <Icon size={14} style={{ color: node.color }} />
            </div>
            <span className="text-[9px] font-semibold text-[var(--text)] text-center leading-none">{node.label}</span>
            <span className="text-[8px] text-[var(--text-muted)] text-center mt-0.5 hidden sm:block">{node.sublabel}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

function TechGroup({ label, items, color }: { label: string; items: string[]; color: string }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color }}>
        {label}
      </h4>
      <div className="flex flex-wrap gap-2">
        {items.map((tech) => (
          <motion.span
            key={tech}
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1.5 text-xs rounded-lg glass border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--accent)]/30 transition-all cursor-default"
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export function EngineeringPage() {
  const engProjects = FEATURED_PROJECTS.filter((p) => p.category === "engineering");

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xs font-semibold uppercase tracking-widest text-[#6366f1] mb-4"
          >
            Software Engineering
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-gradient mb-6"
          >
            I build systems
            <br />
            <span style={{ color: "#6366f1" }}>that scale.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-[var(--text-muted)] max-w-2xl leading-relaxed"
          >
            From zero to production: I architect full-stack systems, design APIs, 
            optimize databases, and ship software that real users depend on daily.
          </motion.p>
        </div>

        {/* Architecture diagram */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-[var(--text)] mb-6 font-display">System Architecture</h2>
          <ArchitectureDiagram />
        </div>

        {/* Tech stack grid */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-[var(--text)] mb-8 font-display">Tech Stack</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <TechGroup label="Languages" items={TECH_STACK.languages} color="#6366f1" />
            <TechGroup label="Frontend" items={TECH_STACK.frontend} color="#8b5cf6" />
            <TechGroup label="Backend" items={TECH_STACK.backend} color="#06b6d4" />
            <TechGroup label="Databases" items={TECH_STACK.databases} color="#10b981" />
            <TechGroup label="Cloud & DevOps" items={TECH_STACK.cloud} color="#f59e0b" />
            <TechGroup label="AI / ML Tools" items={TECH_STACK.ai} color="#f43f5e" />
          </div>
        </div>

        {/* Terminal code window */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-[var(--text)] mb-6 font-display">Code Preview</h2>
          <div className="glass-strong rounded-2xl border border-[var(--border)] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-white/[0.02]">
              <div className="w-3 h-3 rounded-full bg-red-400/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
              <div className="w-3 h-3 rounded-full bg-green-400/60" />
              <span className="ml-2 text-xs text-[var(--text-muted)]">rag-pipeline.py</span>
            </div>
            <pre className="p-5 text-xs sm:text-sm font-code overflow-x-auto">
              <code className="text-[var(--text-muted)]">
                <span style={{ color: "#6366f1" }}>from</span>
                {" langchain.vectorstores "}
                <span style={{ color: "#6366f1" }}>import</span>
                {" Pinecone\n"}
                <span style={{ color: "#6366f1" }}>from</span>
                {" langchain.embeddings.openai "}
                <span style={{ color: "#6366f1" }}>import</span>
                {" OpenAIEmbeddings\n\n"}
                <span style={{ color: "#8b5cf6" }}>class</span>
                {" "}
                <span style={{ color: "#f59e0b" }}>LegalRAGPipeline</span>
                {":\n"}
                {"    "}
                <span style={{ color: "#8b5cf6" }}>def</span>
                {" "}
                <span style={{ color: "#06b6d4" }}>__init__</span>
                {"(self, index_name: str):\n"}
                {"        self.embeddings = OpenAIEmbeddings(model="}
                <span style={{ color: "#10b981" }}>&quot;text-embedding-3-large&quot;</span>
                {")\n"}
                {"        self.vectorstore = Pinecone.from_existing_index(\n"}
                {"            index_name, self.embeddings\n"}
                {"        )\n\n"}
                {"    "}
                <span style={{ color: "#8b5cf6" }}>async def</span>
                {" "}
                <span style={{ color: "#06b6d4" }}>query</span>
                {"(self, question: str, k: int = "}
                <span style={{ color: "#f59e0b" }}>5</span>
                {") -> str:\n"}
                {"        docs = "}
                <span style={{ color: "#8b5cf6" }}>await</span>
                {" self.vectorstore.asimilarity_search(question, k=k)\n"}
                {"        "}
                <span style={{ color: "#6366f1" }}>return</span>
                {" self._synthesize(question, docs)"}
              </code>
            </pre>
          </div>
        </div>

        {/* Featured engineering projects */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-[var(--text)] font-display">Engineering Projects</h2>
            <Link
              href="/projects?filter=engineering"
              className="group flex items-center gap-1.5 text-sm text-[#6366f1] hover:opacity-80 transition-opacity"
            >
              All projects
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {engProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-xl glass border border-[var(--border)] hover:border-[#6366f1]/40 transition-all duration-300"
              >
                <h3 className="font-semibold text-[var(--text)] mb-2">{project.title}</h3>
                <p className="text-sm text-[var(--text-muted)] mb-4">{project.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#6366f1]">{project.impact}</span>
                  <Link href={project.href} className="text-xs text-[var(--text-muted)] hover:text-[#6366f1] transition-colors flex items-center gap-1">
                    Case study <ArrowRight size={11} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
