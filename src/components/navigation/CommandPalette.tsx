"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, Zap, Code, Brain, Camera, Palette, Rocket, Users, FileText, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePortfolioStore } from "@/store/portfolio";
import { FEATURED_PROJECTS, BLOG_POSTS, NAV_ITEMS, DISCIPLINES } from "@/lib/data";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  engineering: Code,
  ai: Brain,
  creative: Camera,
  design: Palette,
  ventures: Rocket,
  leadership: Users,
};

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  href: string;
  category: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: React.ComponentType<any>;
  accent?: string;
}

function buildCommandItems(): CommandItem[] {
  const items: CommandItem[] = [
    // Navigation
    ...NAV_ITEMS.map((n) => ({
      id: `nav-${n.href}`,
      label: n.label,
      href: n.href,
      category: "Pages",
      icon: Zap,
      accent: n.accent,
    })),
    // Disciplines
    ...DISCIPLINES.map((d) => ({
      id: `discipline-${d.id}`,
      label: d.label,
      description: d.description,
      href: d.href,
      category: "Explore",
      icon: ICON_MAP[d.id] ?? Zap,
      accent: d.accent,
    })),
    // Projects
    ...FEATURED_PROJECTS.map((p) => ({
      id: `project-${p.id}`,
      label: p.title,
      description: p.description.slice(0, 80) + "…",
      href: p.href,
      category: "Projects",
      icon: Code,
      accent: p.accent,
    })),
    // Blog
    ...BLOG_POSTS.map((b) => ({
      id: `blog-${b.slug}`,
      label: b.title,
      description: b.excerpt.slice(0, 80) + "…",
      href: `/blog/${b.slug}`,
      category: "Blog",
      icon: FileText,
    })),
    // Contact
    {
      id: "contact",
      label: "Get in touch",
      description: "Start a conversation with Dennis",
      href: "/contact",
      category: "Actions",
      icon: Mail,
    },
  ];
  return items;
}

const ALL_ITEMS = buildCommandItems();

export function CommandPalette() {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { commandPaletteOpen, setCommandPaletteOpen } = usePortfolioStore();

  const filtered = query.trim()
    ? ALL_ITEMS.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_ITEMS.slice(0, 8);

  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const flatFiltered = Object.values(grouped).flat();

  const close = useCallback(() => {
    setCommandPaletteOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, [setCommandPaletteOpen]);

  const navigate = useCallback(
    (href: string) => {
      router.push(href);
      close();
    },
    [router, close]
  );

  useEffect(() => {
    if (commandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [commandPaletteOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!commandPaletteOpen) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, flatFiltered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && flatFiltered[selectedIndex]) {
        navigate(flatFiltered[selectedIndex].href);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [commandPaletteOpen, flatFiltered, selectedIndex, close, navigate]);

  let globalIndex = 0;

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
            onClick={close}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            className="fixed left-1/2 top-24 z-[101] w-full max-w-xl -translate-x-1/2"
          >
            <div className="glass-strong rounded-2xl border border-[var(--border)] overflow-hidden shadow-2xl">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border)]">
                <Search size={16} className="text-[var(--text-muted)] shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search projects, skills, pages…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
                <kbd className="hidden sm:block text-[10px] px-1.5 py-0.5 rounded border border-[var(--border)] text-[var(--text-muted)]">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto py-2">
                {flatFiltered.length === 0 ? (
                  <p className="px-4 py-8 text-center text-sm text-[var(--text-muted)]">
                    No results for &quot;{query}&quot;
                  </p>
                ) : (
                  Object.entries(grouped).map(([category, items]) => (
                    <div key={category} className="mb-1">
                      <p className="px-4 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">
                        {category}
                      </p>
                      {items.map((item) => {
                        const Icon = item.icon ?? Zap;
                        const isSelected = globalIndex++ === selectedIndex;
                        return (
                          <button
                            key={item.id}
                            onClick={() => navigate(item.href)}
                            className={cn(
                              "w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all duration-150",
                              isSelected
                                ? "bg-white/5 text-[var(--text)]"
                                : "text-[var(--text-muted)] hover:bg-white/5 hover:text-[var(--text)]"
                            )}
                          >
                            <span
                              className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                              style={{
                                backgroundColor: item.accent
                                  ? `${item.accent}22`
                                  : "rgba(255,255,255,0.05)",
                              }}
                            >
                              <Icon
                                size={13}
                                style={{ color: item.accent ?? "var(--text-muted)" }}
                              />
                            </span>
                            <span className="flex-1 min-w-0">
                              <span className="block text-sm font-medium truncate">
                                {item.label}
                              </span>
                              {item.description && (
                                <span className="block text-xs text-[var(--text-muted)] truncate">
                                  {item.description}
                                </span>
                              )}
                            </span>
                            {isSelected && (
                              <ArrowRight size={12} className="shrink-0 text-[var(--text-muted)]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center gap-4 px-4 py-2.5 border-t border-[var(--border)] text-[10px] text-[var(--text-muted)]">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded border border-[var(--border)]">↑↓</kbd> navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded border border-[var(--border)]">↵</kbd> open
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded border border-[var(--border)]">ESC</kbd> close
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
