// ============================================================
// ATLAS — SPATIAL KNOWLEDGE GRAPH DATA ENGINE
// Structured 3D spatial nodes, relationships, and "Why?" engineering decision metadata
// ============================================================

export interface GraphNode3D {
  id: string;
  label: string;
  category: "project" | "tech" | "company" | "blog" | "discipline" | "skill" | "award";
  layer: "engineering" | "ai" | "creative" | "ventures" | "leadership";
  position: [number, number, number]; // [x, y, z] coordinates in 3D universe
  color: string;
  description: string;
  impact?: string;
  connections: string[]; // Connected Node IDs
  
  // "Why?" Engineering Decision Panel Metadata
  whyDecision?: {
    problem: string;
    architectureChoice: string;
    tradeoffs: string;
    lessonsLearned: string;
  };

  // System Architecture Breakdown for Projects
  architectureComponents?: {
    layer: string;
    tech: string;
    description: string;
  }[];
}

export const SPATIAL_GRAPH_NODES: GraphNode3D[] = [
  // ── DISCIPLINES (Core Hub Clusters) ──
  {
    id: "disc-eng",
    label: "Software Engineering",
    category: "discipline",
    layer: "engineering",
    position: [-12, 4, 0],
    color: "#6366f1",
    description: "Full-stack systems architecture, Next.js 16, component systems, and scalable web apps.",
    connections: ["proj-zealcraft", "tech-next", "tech-ts", "tech-postgres", "proj-saas"],
  },
  {
    id: "disc-ai",
    label: "AI Architecture",
    category: "discipline",
    layer: "ai",
    position: [12, 6, -5],
    color: "#8b5cf6",
    description: "LLM integrations, RAG pipelines, voice speech recognition, and vector database retrieval.",
    connections: ["proj-voice", "tech-python", "tech-whisper", "tech-openai", "tech-pgvector"],
  },
  {
    id: "disc-creative",
    label: "Creative & Design",
    category: "discipline",
    layer: "creative",
    position: [-10, -8, 8],
    color: "#f59e0b",
    description: "Brand identity systems, motion graphics, video editing, and high-contrast glassmorphic UI.",
    connections: ["proj-[#6366f1]", "proj-techies", "tech-tailwind", "tech-framer"],
  },
  {
    id: "disc-ventures",
    label: "Venture Builder",
    category: "discipline",
    layer: "ventures",
    position: [10, -6, 5],
    color: "#10b981",
    description: "Co-founding SaaS platforms, digital publishing, media distribution, and product strategy.",
    connections: ["comp-yvee", "comp-[#6366f1]", "proj-saas"],
  },

  // ── PROJECTS ──
  {
    id: "proj-voice",
    label: "Multilingual Voice AI Assistant",
    category: "project",
    layer: "ai",
    position: [16, 2, -8],
    color: "#8b5cf6",
    impact: "50,000+ daily queries",
    description: "Real-time multilingual voice AI supporting 8 African languages, built with Whisper, GPT-4, and custom TTS models.",
    connections: ["disc-ai", "tech-python", "tech-whisper", "tech-openai", "award-hackathon"],
    whyDecision: {
      problem: "Traditional speech recognition tools struggled with low-resource African accents and code-switching in voice interfaces.",
      architectureChoice: "Chose OpenAI Whisper for zero-shot ASR fine-tuned with custom phonetic dictionaries and FastAPI streaming WebSockets.",
      tradeoffs: "Accepted slightly higher latency (~350ms) to ensure >94% transcript accuracy across regional accents.",
      lessonsLearned: "Streaming audio chunks in 200ms windows drastically reduced perceived latency for voice interactions.",
    },
    architectureComponents: [
      { layer: "Client Interface", tech: "React & Web Audio API", description: "Captures microphone PCM stream and visualizes audio spectrum" },
      { layer: "API Gateway", tech: "FastAPI & WebSockets", description: "Low-latency bi-directional audio chunk streaming" },
      { layer: "ASR Model", tech: "OpenAI Whisper", description: "Converts speech audio into tokenized multilingual text" },
      { layer: "LLM Orchestrator", tech: "GPT-4 & LangChain", description: "Processes prompt context and formats conversational response" },
      { layer: "TTS Synthesizer", tech: "Custom Coqui TTS", description: "Synthesizes natural audio response in regional dialect" },
    ],
  },
  {
    id: "proj-zealcraft",
    label: "Zealcraft Platform",
    category: "project",
    layer: "engineering",
    position: [-16, 6, -2],
    color: "#6366f1",
    impact: "Flagship Showcase Platform",
    description: "High-performance full-stack web platform with dynamic media streaming, Vercel Blob proxy, and real-time state sync.",
    connections: ["disc-eng", "tech-next", "tech-ts", "tech-vercel", "tech-zustand"],
    whyDecision: {
      problem: "Serving heavy video and artwork files created bandwidth spikes and slow initial page loads on mobile networks.",
      architectureChoice: "Built a custom Next.js Edge Proxy Route streaming Vercel Blob storage with HTTP range headers.",
      tradeoffs: "Sacrificed static HTML generation for media endpoints in exchange for 100% dynamic asset security and instant byte streaming.",
      lessonsLearned: "Implementing client-side image blurring placeholders reduced perceived loading wait time to zero.",
    },
    architectureComponents: [
      { layer: "Frontend UI", tech: "Next.js 16 App Router", description: "Server Components & Framer Motion layout animations" },
      { layer: "Edge Proxy", tech: "Next.js Middleware Proxy", description: "Streams raw media bytes directly from storage" },
      { layer: "Storage Engine", tech: "Vercel Blob Storage", description: "Global CDN asset persistence" },
      { layer: "State Engine", tech: "Zustand & LocalStorage", description: "Client intent & theme persistence" },
    ],
  },
  {
    id: "proj-saas",
    label: "Enterprise Analytics Platform",
    category: "project",
    layer: "engineering",
    position: [-6, 10, 4],
    color: "#06b6d4",
    impact: "200+ active enterprise businesses",
    description: "Multi-tenant SaaS analytics dashboard providing real-time data pipelines and predictive reporting.",
    connections: ["disc-eng", "tech-next", "tech-postgres", "tech-docker", "disc-ventures"],
    whyDecision: {
      problem: "Aggregating millions of daily event rows caused slow dashboard load times (>4s) for high-volume enterprise tenants.",
      architectureChoice: "Implemented PostgreSQL materialized view aggregation refreshed via background worker queues.",
      tradeoffs: "Accepted a 5-minute data update window in exchange for sub-100ms dashboard query responses.",
      lessonsLearned: "Database indexing on tenant_id + timestamp reduced SQL scan times by 85%.",
    },
  },

  // ── TECHNOLOGIES ──
  {
    id: "tech-next",
    label: "Next.js 16",
    category: "tech",
    layer: "engineering",
    position: [-8, 2, -4],
    color: "#ffffff",
    description: "React framework for Server Components, Turbopack bundling, App Router, and Edge proxy middleware.",
    connections: ["disc-eng", "proj-zealcraft", "proj-saas"],
  },
  {
    id: "tech-ts",
    label: "TypeScript",
    category: "tech",
    layer: "engineering",
    position: [-14, 0, 3],
    color: "#3178c6",
    description: "Strict static typing, generic utility types, and clean component interface contracts.",
    connections: ["disc-eng", "tech-next"],
  },
  {
    id: "tech-python",
    label: "Python & FastAPI",
    category: "tech",
    layer: "ai",
    position: [8, 4, -8],
    color: "#3776ab",
    description: "High-performance asynchronous backend services for AI model inference and audio pipelines.",
    connections: ["disc-ai", "proj-voice"],
  },
  {
    id: "tech-whisper",
    label: "OpenAI Whisper",
    category: "tech",
    layer: "ai",
    position: [14, 8, -10],
    color: "#00a67e",
    description: "State-of-the-art automatic speech recognition for multilingual audio transcription.",
    connections: ["proj-voice", "disc-ai"],
  },
  {
    id: "tech-pgvector",
    label: "pgvector & RAG",
    category: "tech",
    layer: "ai",
    position: [18, -2, -6],
    color: "#ec4899",
    description: "Vector embedding storage in PostgreSQL for semantic document search and contextual knowledge retrieval.",
    connections: ["disc-ai", "tech-postgres"],
  },
  {
    id: "tech-postgres",
    label: "PostgreSQL",
    category: "tech",
    layer: "engineering",
    position: [-2, 8, 2],
    color: "#336791",
    description: "Relational database engine with ACID transactions, JSONB, and vector extensions.",
    connections: ["proj-saas", "tech-pgvector"],
  },
  {
    id: "tech-tailwind",
    label: "Tailwind CSS & Glass",
    category: "tech",
    layer: "creative",
    position: [-14, -6, 6],
    color: "#06b6d4",
    description: "Utility-first CSS framework combined with custom glassmorphic tokens and dark mode contrast systems.",
    connections: ["disc-creative"],
  },
  {
    id: "tech-framer",
    label: "Framer Motion",
    category: "tech",
    layer: "creative",
    position: [-6, -10, 8],
    color: "#f43f5e",
    description: "Production-ready animation engine for layout transitions, micro-interactions, and spatial UI.",
    connections: ["disc-creative", "proj-zealcraft"],
  },

  // ── COMPANIES & VENTURES ──
  {
    id: "comp-yvee",
    label: "YveeReads Media",
    category: "company",
    layer: "ventures",
    position: [6, -8, 8],
    color: "#f59e0b",
    description: "Co-founded digital publishing and reader engagement platform celebrating African literature.",
    connections: ["disc-ventures", "disc-creative"],
  },
  {
    id: "comp-[#6366f1]",
    label: "The Startup Lens",
    category: "company",
    layer: "ventures",
    position: [14, -4, 4],
    color: "#6366f1",
    description: "Media and technology advisory firm spotlighting early-stage African startup innovations.",
    connections: ["disc-ventures"],
  },

  // ── AWARDS & MILESTONES ──
  {
    id: "award-hackathon",
    label: "Pan-African AI Hackathon Winner",
    category: "award",
    layer: "ai",
    position: [10, 10, -3],
    color: "#f59e0b",
    description: "Won 1st Place in Pan-African AI Hackathon for multilingual voice speech recognition prototype.",
    connections: ["proj-voice", "disc-ai"],
  },
];

// Predefined Story Exploration Sequences
export interface StoryPath {
  id: string;
  title: string;
  description: string;
  steps: {
    nodeId: string;
    caption: string;
    narrative: string;
  }[];
}

export const ATLAS_STORIES: StoryPath[] = [
  {
    id: "ai-engineer",
    title: "How I Became an AI Systems Engineer",
    description: "From core software engineering to building multilingual voice AI pipelines and RAG vector search.",
    steps: [
      {
        nodeId: "disc-eng",
        caption: "Phase 1: Software Engineering Foundations",
        narrative: "Started by building high-scale Next.js web applications, mastering TypeScript, and learning distributed database systems.",
      },
      {
        nodeId: "award-hackathon",
        caption: "Phase 2: Hackathon Breakaway",
        narrative: "Won 1st Place at the Pan-African AI Hackathon by prototype testing voice speech interfaces for local African dialects.",
      },
      {
        nodeId: "proj-voice",
        caption: "Phase 3: Multilingual Voice AI Deployment",
        narrative: "Shipped production multilingual voice AI supporting 8 African languages, serving over 50,000 daily queries.",
      },
      {
        nodeId: "tech-pgvector",
        caption: "Phase 4: Frontier Vector RAG Systems",
        narrative: "Expanded into RAG architectures, leveraging pgvector and LLMs for semantic knowledge synthesis.",
      },
    ],
  },
  {
    id: "entrepreneurship",
    title: "Journey into Entrepreneurship & SaaS",
    description: "Co-founding platforms, scaling user bases, and building products from zero-to-one.",
    steps: [
      {
        nodeId: "disc-ventures",
        caption: "Phase 1: Product & Venture Strategy",
        narrative: "Recognized the need to combine engineering execution with product intuition and business operations.",
      },
      {
        nodeId: "comp-yvee",
        caption: "Phase 2: Co-Founding YveeReads",
        narrative: "Co-founded YveeReads to build modern digital publishing tools for African authors and readers.",
      },
      {
        nodeId: "proj-saas",
        caption: "Phase 3: Enterprise SaaS Analytics",
        narrative: "Engineered multi-tenant SaaS analytics platforms deployed across 200+ enterprise business organizations.",
      },
    ],
  },
];
