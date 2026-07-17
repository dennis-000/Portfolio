"use client";

import { motion } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { usePortfolioStore, type Theme } from "@/store/portfolio";
import { cn } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const THEMES: { id: Theme; Icon: React.ComponentType<any>; label: string }[] = [
  { id: "light", Icon: Sun, label: "Light mode" },
  { id: "system", Icon: Monitor, label: "System preference" },
  { id: "dark", Icon: Moon, label: "Dark mode" },
];

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = usePortfolioStore();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 p-1 rounded-xl glass border border-[var(--border)]",
        className
      )}
      role="group"
      aria-label="Theme selection"
    >
      {THEMES.map(({ id, Icon, label }) => (
        <motion.button
          key={id}
          onClick={() => setTheme(id)}
          whileTap={{ scale: 0.9 }}
          className={cn(
            "relative p-1.5 rounded-lg transition-all duration-200",
            theme === id
              ? "text-[var(--text)]"
              : "text-[var(--text-muted)] hover:text-[var(--text)]"
          )}
          aria-label={label}
          aria-pressed={theme === id}
        >
          {theme === id && (
            <motion.span
              layoutId="theme-active"
              className="absolute inset-0 rounded-lg bg-white/10"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <Icon size={13} className="relative z-10" />
        </motion.button>
      ))}
    </div>
  );
}
