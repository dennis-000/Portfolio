"use client";

import { useState } from "react";
import { 
  Bot, 
  Brain, 
  Save, 
  CheckCircle2, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Sparkles,
  FileText,
  HelpCircle
} from "lucide-react";
import Link from "next/link";

interface AIKnowledgeItem {
  id: string;
  category: "faq" | "architecture" | "case_study" | "salary_range" | "prompt_template";
  title: string;
  content: string;
}

const DEFAULT_KNOWLEDGE_ITEMS: AIKnowledgeItem[] = [
  {
    id: "kb-1",
    category: "faq",
    title: "Primary Engineering Role Focus",
    content: "Dennis specializes in Full-Stack Software Engineering, Next.js 16 App Router architectures, TypeScript, AI system integration (OpenAI/Whisper/RAG), and scalable PostgreSQL backends.",
  },
  {
    id: "kb-2",
    category: "architecture",
    title: "Vercel Blob Media Proxy Architecture",
    content: "Designed custom Next.js Edge proxy middleware streaming Vercel Blob audio and video bytes with HTTP range headers to prevent high bandwidth egress while supporting instant chunked audio playback.",
  },
  {
    id: "kb-3",
    category: "salary_range",
    title: "Availability & Location",
    content: "Dennis is open to high-impact Senior Software Engineer & AI Architect roles (Worldwide Remote & Pan-African tech initiatives).",
  },
];

export default function AIKnowledgeAdminPage() {
  const [systemPrompt, setSystemPrompt] = useState(
    "You are Dennis's AI Career Concierge & Portfolio Assistant. Answer recruiter and technical visitor questions about Dennis's engineering background, Next.js architectures, AI voice products, co-founded ventures, and project case studies accurately, professionally, and concisely."
  );
  const [items, setItems] = useState<AIKnowledgeItem[]>(DEFAULT_KNOWLEDGE_ITEMS);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<AIKnowledgeItem["category"]>("faq");
  const [newContent, setNewContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddItem = () => {
    if (!newTitle || !newContent) return;
    setItems([
      ...items,
      { id: `kb-${Date.now()}`, category: newCategory, title: newTitle, content: newContent },
    ]);
    setNewTitle("");
    setNewContent("");
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const handleSaveKnowledge = async () => {
    setIsSaving(true);
    setSavedSuccess(false);
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          AI_SYSTEM_PROMPT: systemPrompt,
          AI_KNOWLEDGE_BASE: items,
        }),
      });
      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (e) {
      console.error("Save AI Knowledge error", e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
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
              <Bot className="text-purple-400" size={28} />
              AI Assistant Knowledge Base Manager
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Configure system prompts, FAQs, architecture notes, and reference context for Dennis's AI Assistant Concierge (`/api/chat`).
            </p>
          </div>

          <button
            onClick={handleSaveKnowledge}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer disabled:opacity-50"
          >
            {savedSuccess ? <CheckCircle2 size={16} /> : <Save size={16} />}
            <span>{isSaving ? "Saving..." : savedSuccess ? "AI Knowledge Saved!" : "Publish AI Updates"}</span>
          </button>
        </div>

        <div className="space-y-8">
          {/* System Prompt Configuration */}
          <div className="glass p-6 rounded-2xl border border-purple-500/30 bg-slate-900/60 font-mono text-xs">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10 text-purple-400 font-bold">
              <Brain size={18} />
              <span>AI System Persona & Prompt Configuration</span>
            </div>
            <textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={4}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-purple-500 leading-relaxed resize-none"
            />
          </div>

          {/* Knowledge Base Articles */}
          <div className="glass p-6 rounded-2xl border border-white/10 bg-slate-900/60 font-mono text-xs">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10 text-white font-bold">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-purple-400" />
                <span>RAG Knowledge Base Context ({items.length} Articles)</span>
              </div>
            </div>

            {/* Add New Knowledge Article */}
            <div className="p-4 rounded-xl bg-slate-950 border border-white/10 mb-6 space-y-3">
              <span className="font-bold text-white block mb-1">Add Knowledge Article / FAQ:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Title / Question (e.g. Salary Range, Next.js Architecture)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="sm:col-span-2 px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="faq">FAQ</option>
                  <option value="architecture">Architecture Note</option>
                  <option value="case_study">Case Study Context</option>
                  <option value="salary_range">Availability & Compensation</option>
                </select>
              </div>
              <textarea
                placeholder="Full factual response content for the AI concierge..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 h-20 resize-none"
              />
              <button
                type="button"
                onClick={handleAddItem}
                disabled={!newTitle || !newContent}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-md cursor-pointer disabled:opacity-40 flex items-center justify-center gap-1.5 w-full"
              >
                <Plus size={14} />
                <span>Add Knowledge Context</span>
              </button>
            </div>

            {/* List Existing Knowledge Articles */}
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="p-4 rounded-xl bg-slate-950 border border-white/10 flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white text-xs">{item.title}</span>
                      <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] uppercase font-bold">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans leading-relaxed">{item.content}</p>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
