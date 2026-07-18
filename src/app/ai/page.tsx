import type { Metadata } from "next";
import { 
  FileText, Scissors, Binary, Database, Search, Brain, MessageSquare, 
  Bot, Library, Mic, Eye, Settings, UserSquare2 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Artificial Intelligence",
  description: "Dennis Opoku Asiedu's AI work — LLMs, RAG pipelines, voice AI, computer vision, and machine learning systems.",
};

const RAG_STEPS = [
  { label: "Raw Documents", color: "#8b5cf6", icon: "FileText" },
  { label: "→", color: "var(--text-muted)", icon: "" },
  { label: "Chunking", color: "#8b5cf6", icon: "Scissors" },
  { label: "→", color: "var(--text-muted)", icon: "" },
  { label: "Embeddings", color: "#6366f1", icon: "Binary" },
  { label: "→", color: "var(--text-muted)", icon: "" },
  { label: "Vector Store", color: "#06b6d4", icon: "Database" },
  { label: "→", color: "var(--text-muted)", icon: "" },
  { label: "Retrieval", color: "#10b981", icon: "Search" },
  { label: "→", color: "var(--text-muted)", icon: "" },
  { label: "LLM Synthesis", color: "#f59e0b", icon: "Brain" },
  { label: "→", color: "var(--text-muted)", icon: "" },
  { label: "Answer", color: "#f43f5e", icon: "MessageSquare" },
];

const AI_DOMAINS = [
  {
    title: "Large Language Models",
    description: "Fine-tuning, prompt engineering, and deploying GPT-4, Claude, and open-source LLMs for production use cases.",
    icon: "Bot",
    color: "#8b5cf6",
    tags: ["GPT-4", "Claude", "LangChain", "Fine-tuning"],
  },
  {
    title: "Retrieval-Augmented Generation",
    description: "Custom RAG systems enabling natural language querying of enterprise documents with high accuracy.",
    icon: "Library",
    color: "#6366f1",
    tags: ["Pinecone", "Chroma", "LangChain", "OpenAI"],
  },
  {
    title: "Voice AI & Speech",
    description: "Multilingual voice assistants supporting African languages using Whisper, custom TTS, and streaming pipelines.",
    icon: "Mic",
    color: "#06b6d4",
    tags: ["Whisper", "ElevenLabs", "FastAPI", "WebRTC"],
  },
  {
    title: "Computer Vision",
    description: "Image classification, object detection, and document digitization for African language scripts.",
    icon: "Eye",
    color: "#10b981",
    tags: ["YOLOv8", "TensorFlow", "OpenCV", "Hugging Face"],
  },
  {
    title: "ML Pipelines",
    description: "End-to-end ML workflows from data ingestion and training to deployment and monitoring.",
    icon: "Settings",
    color: "#f59e0b",
    tags: ["PyTorch", "MLflow", "Airflow", "Docker"],
  },
  {
    title: "AI Agents",
    description: "Autonomous AI agents with tool use, memory, and multi-step reasoning for complex workflows.",
    icon: "UserSquare2",
    color: "#f43f5e",
    tags: ["LangGraph", "AutoGen", "OpenAI Functions", "Pydantic"],
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  FileText, Scissors, Binary, Database, Search, Brain, MessageSquare,
  Bot, Library, Mic, Eye, Settings, UserSquare2,
};

export default function AIPage() {
  return (
    <div className="min-h-screen pt-44 sm:pt-48 lg:pt-56 pb-20">
      <div className="w-full max-w-screen-2xl mx-auto px-8 sm:px-12 md:px-16 lg:px-16 xl:px-20">
        {/* Header */}
        <div className="mb-16 text-center flex flex-col items-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#8b5cf6" }}>
            Artificial Intelligence
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-gradient mb-6 text-center">
            Building intelligence
            <br />
            <span style={{ color: "#8b5cf6" }}>from scratch.</span>
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl leading-relaxed mx-auto text-center">
            I design and deploy AI systems that understand language, process documents, 
            recognize voices, and learn from data — at production scale.
          </p>
        </div>

        {/* AI Pipeline Visual */}
        <div className="mb-16 p-8 rounded-2xl glass border border-[var(--border)] max-w-4xl mx-auto w-full text-center flex flex-col items-center">
          <h2 className="text-lg font-bold text-[var(--text)] mb-6 font-display text-center">RAG Pipeline Architecture</h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {RAG_STEPS.map((step, i) => {
              if (step.label === "→") {
                return (
                  <span key={i} className="text-[var(--text-muted)] px-1 hidden sm:block text-sm">→</span>
                );
              }
              const Icon = ICON_MAP[step.icon] ?? FileText;
              return (
                <div
                  key={i}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium border"
                  style={{
                    backgroundColor: `${step.color}14`,
                    borderColor: `${step.color}30`,
                    color: step.color,
                  }}
                >
                  <Icon size={15} />
                  <span>{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI domains grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
          {AI_DOMAINS.map((domain) => {
            const Icon = ICON_MAP[domain.icon] ?? Bot;
            return (
              <div
                key={domain.title}
                className="p-6 sm:p-7 rounded-2xl glass border border-[var(--border)] hover:border-[var(--accent)]/30 transition-all duration-300 group flex flex-col gap-5"
                style={{ "--accent": domain.color } as React.CSSProperties}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: `${domain.color}15`,
                    border: `1px solid ${domain.color}30`,
                  }}
                >
                  <Icon size={22} style={{ color: domain.color }} />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--text)] mb-2.5 text-base">{domain.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">{domain.description}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {domain.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-md"
                      style={{ backgroundColor: `${domain.color}14`, color: domain.color }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
