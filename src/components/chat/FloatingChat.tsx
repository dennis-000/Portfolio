"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Sparkles, RefreshCw, AlertCircle, HelpCircle } from "lucide-react";
import { usePortfolioStore } from "@/store/portfolio";
import { cn } from "@/lib/utils";

const STARTER_PROMPTS = [
  "What is Dennis' tech stack?",
  "Tell me about Techies Zone.",
  "Is Dennis open to remote roles?",
  "What projects did he build?",
];

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const accentColor = usePortfolioStore((s) => s.accentColor);
  const accentRgb = usePortfolioStore((s) => s.accentRgb);
  
  const { 
    messages, 
    sendMessage, 
    status, 
    error, 
    regenerate, 
    setMessages, 
    clearError 
  } = useChat();

  const isLoading = status === "submitted" || status === "streaming";

  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // Helper to extract text content from UIMessage parts (compatible with v4/v5)
  const getMessageText = (message: any): string => {
    if (typeof message.content === "string" && message.content) {
      return message.content;
    }
    if (Array.isArray(message.parts)) {
      return message.parts
        .filter((part: any) => part.type === "text")
        .map((part: any) => part.text)
        .join("");
    }
    return "";
  };

  // Clean chat state
  const handleReset = () => {
    setMessages([]);
  };

  const handlePromptClick = (prompt: string) => {
    sendMessage({ text: prompt });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  const handleReload = () => {
    clearError();
    regenerate();
  };


  return (
    <>
      {/* ── Collapsed Bubble Button ── */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl cursor-pointer relative"
          style={{
            backgroundColor: accentColor,
            boxShadow: `0 8px 32px rgba(${accentRgb}, 0.45)`,
          }}
          aria-label={isOpen ? "Close chatbot" : "Chat with AI twin"}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <MessageSquare size={22} />
                {/* Active indicator dot */}
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-[var(--bg)] rounded-full animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] sm:w-[410px] h-[550px] rounded-3xl border border-[var(--border)] glass-strong shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Panel Header */}
            <div className="p-4 border-b border-[var(--border)] flex items-center justify-between bg-black/20 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div 
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white relative shadow"
                  style={{ backgroundColor: accentColor }}
                >
                  <Sparkles size={16} />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border border-[var(--border)] rounded-full" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--text)] leading-none flex items-center gap-1.5">
                    Dennis&apos; Twin
                  </h3>
                  <span className="text-[10px] text-[var(--text-muted)] font-medium">Assistant AI · Online</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <button
                    onClick={handleReset}
                    className="p-2 rounded-lg hover:bg-white/5 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                    title="Reset chat"
                  >
                    <RefreshCw size={14} />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/5 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat Body (Messages) */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
            >
              {messages.length === 0 ? (
                <div className="h-full flex flex-col justify-center text-center p-6 space-y-6">
                  <div className="w-14 h-14 rounded-2xl glass border border-[var(--border)] flex items-center justify-center mx-auto text-[var(--text-muted)]">
                    <Sparkles size={28} style={{ color: accentColor }} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[var(--text)] mb-2">Chat with Dennis&apos; Digital Twin</h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-[260px] mx-auto">
                      Ask Dennis&apos; AI assistant about his companies, engineering projects, creative designs, or how to contact him.
                    </p>
                  </div>
                  
                  {/* Starter pills */}
                  <div className="space-y-2.5">
                    <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center justify-center gap-1.5">
                      <HelpCircle size={12} /> Starter questions
                    </span>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {STARTER_PROMPTS.map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => handlePromptClick(prompt)}
                          className="px-3.5 py-2 text-xs rounded-xl glass border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--accent)]/55 transition-all text-left font-medium cursor-pointer"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                messages.map((m) => (
                  <div
                    key={m.id}
                    className={cn(
                      "flex flex-col max-w-[82%] rounded-2xl p-3.5 text-sm leading-relaxed transition-all duration-300",
                      m.role === "user"
                        ? "bg-white/5 border border-white/5 text-[var(--text)] ml-auto rounded-tr-sm"
                        : "glass border border-[var(--border)] text-[var(--text)] mr-auto rounded-tl-sm"
                    )}
                  >
                    <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                      {m.role === "user" ? "You" : "Dennis' Twin"}
                    </span>
                    <p className="whitespace-pre-wrap">{getMessageText(m)}</p>
                  </div>
                ))
              )}

              {/* Typing state */}
              {isLoading && (
                <div className="glass border border-[var(--border)] rounded-2xl rounded-tl-sm p-3.5 text-sm max-w-[82%] mr-auto flex flex-col gap-2 animate-pulse">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Dennis&apos; Twin</span>
                  <div className="flex items-center gap-1.5 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              {/* Error state */}
              {error && (
                <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 flex flex-col gap-3">
                  <div className="flex items-start gap-2.5 text-xs">
                    <AlertCircle size={15} className="shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block mb-0.5">Connection Error</span>
                      {error.message || "Failed to fetch response from Dennis' digital assistant."}
                    </div>
                  </div>
                  <button
                    onClick={() => handleReload()}
                    className="self-end px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-300 transition-all cursor-pointer"
                  >
                    Retry
                  </button>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Chat Footer (Input) */}
            <form
              onSubmit={handleSubmit}
              className="p-3 border-t border-[var(--border)] bg-black/10 flex gap-2 items-center"
            >
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask anything..."
                className="flex-1 bg-white/5 border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/30 transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white transition-all duration-200 hover:scale-[1.03] disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none cursor-pointer"
                style={{ backgroundColor: accentColor }}
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
