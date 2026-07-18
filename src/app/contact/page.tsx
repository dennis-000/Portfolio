"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, Briefcase, Wrench, TrendingUp, BrainCircuit, Mic, Newspaper } from "lucide-react";
import { usePortfolioStore } from "@/store/portfolio";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Briefcase, Wrench, TrendingUp, BrainCircuit, Mic, Newspaper,
};

const CONTACT_MODES = [
  {
    id: "hire",
    label: "Hire me",
    icon: "Briefcase",
    description: "Full-time, contract, or freelance engagement",
    fields: ["Company", "Role", "Timeline", "Budget range"],
    color: "#6366f1",
  },
  {
    id: "build",
    label: "Let's build",
    icon: "Wrench",
    description: "Collaboration on a project or product",
    fields: ["Project idea", "Your role", "Timeline", "Stage"],
    color: "#10b981",
  },
  {
    id: "invest",
    label: "Investment",
    icon: "TrendingUp",
    description: "Investment in one of my ventures",
    fields: ["Venture interest", "Investment range", "Your firm"],
    color: "#f59e0b",
  },
  {
    id: "consult",
    label: "Consulting",
    icon: "BrainCircuit",
    description: "Technical or strategic consulting",
    fields: ["Topic", "Duration", "Budget"],
    color: "#8b5cf6",
  },
  {
    id: "speak",
    label: "Speaking",
    icon: "Mic",
    description: "Conference, podcast, or panel invitation",
    fields: ["Event name", "Date", "Topic", "Audience size"],
    color: "#f43f5e",
  },
  {
    id: "media",
    label: "Media / Press",
    icon: "Newspaper",
    description: "Interview, feature, or press inquiry",
    fields: ["Publication", "Angle / Topic", "Deadline"],
    color: "#06b6d4",
  },
];

export default function ContactPage() {
  const [selectedMode, setSelectedMode] = useState(CONTACT_MODES[0]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const accentColor = usePortfolioStore((s) => s.accentColor);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: `${selectedMode.color}22`, border: `2px solid ${selectedMode.color}` }}
          >
            <Check size={24} style={{ color: selectedMode.color }} />
          </motion.div>
          <h2 className="text-2xl font-display font-bold text-gradient mb-3">Message sent!</h2>
          <p className="text-[var(--text-muted)]">
            Thanks for reaching out. I&apos;ll get back to you within 48 hours.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-44 sm:pt-48 lg:pt-56 pb-20">
      <div className="w-full max-w-screen-2xl mx-auto px-8 sm:px-12 md:px-16 lg:px-16 xl:px-20">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-4">
            Contact
          </p>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-4">
            Let&apos;s talk
          </h1>
          <p className="text-lg text-[var(--text-muted)]">
            What brings you here? Choose what fits best.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Mode selector */}
          <div className="lg:col-span-2">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-4">
              I&apos;m here to…
            </h2>
            <div className="space-y-2">
              {CONTACT_MODES.map((mode) => {
                const Icon = ICON_MAP[mode.icon] ?? Briefcase;
                const isSelected = selectedMode.id === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => {
                      setSelectedMode(mode);
                      setFormData({});
                    }}
                    className="w-full flex items-center gap-4 px-4 py-4 rounded-xl border transition-all duration-200 text-left"
                    style={{
                      borderColor: isSelected ? mode.color : "var(--border)",
                      backgroundColor: isSelected ? `${mode.color}12` : "transparent",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${mode.color}${isSelected ? "25" : "15"}`,
                        border: `1px solid ${mode.color}${isSelected ? "50" : "30"}`,
                      }}
                    >
                      <Icon size={16} style={{ color: mode.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-sm font-semibold text-[var(--text)]">
                        {mode.label}
                      </span>
                      <span className="block text-xs text-[var(--text-muted)] truncate">
                        {mode.description}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.form
                key={selectedMode.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Name + Email always required */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5" htmlFor="contact-name">
                      Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full px-3 py-2.5 rounded-lg glass border border-[var(--border)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent)] transition-colors"
                      style={{ "--accent": selectedMode.color } as React.CSSProperties}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5" htmlFor="contact-email">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full px-3 py-2.5 rounded-lg glass border border-[var(--border)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent)] transition-colors"
                      style={{ "--accent": selectedMode.color } as React.CSSProperties}
                    />
                  </div>
                </div>

                {/* Dynamic fields per mode */}
                {selectedMode.fields.map((field) => (
                  <div key={field}>
                    <label
                      className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5"
                      htmlFor={`contact-${field}`}
                    >
                      {field}
                    </label>
                    <input
                      id={`contact-${field}`}
                      type="text"
                      placeholder={`Enter ${field.toLowerCase()}`}
                      value={formData[field] ?? ""}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, [field]: e.target.value }))
                      }
                      className="w-full px-3 py-2.5 rounded-lg glass border border-[var(--border)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent)] transition-colors"
                      style={{ "--accent": selectedMode.color } as React.CSSProperties}
                    />
                  </div>
                ))}

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5" htmlFor="contact-message">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me more…"
                    className="w-full px-3 py-2.5 rounded-lg glass border border-[var(--border)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent)] transition-colors resize-none"
                    style={{ "--accent": selectedMode.color } as React.CSSProperties}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:scale-[1.01]"
                  style={{
                    backgroundColor: selectedMode.color,
                    boxShadow: `0 0 30px ${selectedMode.color}30`,
                  }}
                >
                  <Send size={15} />
                  Send message
                </button>
              </motion.form>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
