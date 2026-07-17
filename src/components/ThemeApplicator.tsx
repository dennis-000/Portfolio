"use client";

import { useEffect } from "react";
import { usePortfolioStore } from "@/store/portfolio";

/**
 * Applies the active journey's accent color to CSS custom properties
 * whenever the store's accentColor changes.
 */
export function ThemeApplicator() {
  const { accentColor, accentRgb, theme } = usePortfolioStore();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", accentColor);
    root.style.setProperty("--accent-rgb", accentRgb);
  }, [accentColor, accentRgb]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.removeAttribute("data-theme");
    } else if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      // system
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        root.removeAttribute("data-theme");
      } else {
        root.setAttribute("data-theme", "light");
      }
    }
  }, [theme]);

  return null;
}
