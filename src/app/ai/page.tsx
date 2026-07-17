import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artificial Intelligence",
  description: "Dennis Opoku Asiedu's AI work — LLMs, RAG pipelines, voice AI, computer vision, and machine learning systems.",
};

export default function AIPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#8b5cf6" }}>
            Artificial Intelligence
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-gradient mb-6">
            Building intelligence
            <br />
            <span style={{ color: "#8b5cf6" }}>from scratch.</span>
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl leading-relaxed">
            I design and deploy AI systems that understand language, process documents, 
            recognize voices, and learn from data — at production scale.
          </p>
        </div>

        {/* AI Pipeline Visual */}
        <div className="mb-16 p-6 rounded-2xl glass border border-[var(--border)]">
          <h2 className="text-lg font-bold text-[var(--text)] mb-6 font-display">RAG Pipeline Architecture</h2>
          <div className="flex flex-wrap items-center gap-2 sm:gap-0">
            {[
              { label: "Raw Documents", color: "#8b5cf6", emoji: "📄" },
              { label: "→", color: "var(--text-muted)", emoji: "" },
              { label: "Chunking", color: "#8b5cf6", emoji: "✂️" },
              { label: "→", color: "var(--text-muted)", emoji: "" },
              { label: "Embeddings", color: "#6366f1", emoji: "🧮" },
              { label: "→", color: "var(--text-muted)", emoji: "" },
              { label: "Vector Store", color: "#06b6d4", emoji: "🗄️" },
              { label: "→", color: "var(--text-muted)", emoji: "" },
              { label: "Retrieval", color: "#10b981", emoji: "🔍" },
              { label: "→", color: "var(--text-muted)", emoji: "" },
              { label: "LLM Synthesis", color: "#f59e0b", emoji: "🧠" },
              { label: "→", color: "var(--text-muted)", emoji: "" },
              { label: "Answer", color: "#f43f5e", emoji: "💬" },
            ].map((step, i) =>
              step.label === "→" ? (
                <span key={i} className="text-[var(--text-muted)] px-1 hidden sm:block">→</span>
              ) : (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border"
                  style={{
                    backgroundColor: `${step.color}18`,
                    borderColor: `${step.color}33`,
                    color: step.color,
                  }}
                >
                  <span>{step.emoji}</span>
                  <span className="hidden sm:block">{step.label}</span>
                </div>
              )
            )}
          </div>
        </div>

        {/* AI domains grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {[
            {
              title: "Large Language Models",
              description: "Fine-tuning, prompt engineering, and deploying GPT-4, Claude, and open-source LLMs for production use cases.",
              icon: "🤖",
              color: "#8b5cf6",
              tags: ["GPT-4", "Claude", "LangChain", "Fine-tuning"],
            },
            {
              title: "Retrieval-Augmented Generation",
              description: "Custom RAG systems enabling natural language querying of enterprise documents with high accuracy.",
              icon: "📚",
              color: "#6366f1",
              tags: ["Pinecone", "Chroma", "LangChain", "OpenAI"],
            },
            {
              title: "Voice AI & Speech",
              description: "Multilingual voice assistants supporting African languages using Whisper, custom TTS, and streaming pipelines.",
              icon: "🎙️",
              color: "#06b6d4",
              tags: ["Whisper", "ElevenLabs", "FastAPI", "WebRTC"],
            },
            {
              title: "Computer Vision",
              description: "Image classification, object detection, and document digitization for African language scripts.",
              icon: "👁️",
              color: "#10b981",
              tags: ["YOLOv8", "TensorFlow", "OpenCV", "Hugging Face"],
            },
            {
              title: "ML Pipelines",
              description: "End-to-end ML workflows from data ingestion and training to deployment and monitoring.",
              icon: "⚙️",
              color: "#f59e0b",
              tags: ["PyTorch", "MLflow", "Airflow", "Docker"],
            },
            {
              title: "AI Agents",
              description: "Autonomous AI agents with tool use, memory, and multi-step reasoning for complex workflows.",
              icon: "🕵️",
              color: "#f43f5e",
              tags: ["LangGraph", "AutoGen", "OpenAI Functions", "Pydantic"],
            },
          ].map((domain, i) => (
            <div
              key={domain.title}
              className="p-5 rounded-2xl glass border border-[var(--border)] hover:border-[var(--accent)]/30 transition-all duration-300 group"
              style={{ "--accent": domain.color } as React.CSSProperties}
            >
              <span className="text-3xl mb-4 block">{domain.icon}</span>
              <h3 className="font-bold text-[var(--text)] mb-2 text-sm">{domain.title}</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">{domain.description}</p>
              <div className="flex flex-wrap gap-1">
                {domain.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-md"
                    style={{ backgroundColor: `${domain.color}18`, color: domain.color }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
