import { create } from "zustand";
import { persist } from "zustand/middleware";

export type JourneyId = "engineering" | "ai" | "creative" | "ventures" | "design" | null;
export type Theme = "dark" | "light" | "system";

interface PortfolioStore {
  // Journey / persona
  activeJourney: JourneyId;
  setJourney: (journey: JourneyId) => void;

  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;

  // Command palette
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;

  // Navigation
  navOpen: boolean;
  setNavOpen: (open: boolean) => void;

  // Current accent color (driven by journey)
  accentColor: string;
  accentRgb: string;
  setAccent: (color: string, rgb: string) => void;
}

const JOURNEY_ACCENTS: Record<string, { color: string; rgb: string }> = {
  engineering: { color: "#6366f1", rgb: "99, 102, 241" },
  ai: { color: "#8b5cf6", rgb: "139, 92, 246" },
  creative: { color: "#f59e0b", rgb: "245, 158, 11" },
  design: { color: "#f43f5e", rgb: "244, 63, 94" },
  ventures: { color: "#10b981", rgb: "16, 185, 129" },
  default: { color: "#06b6d4", rgb: "6, 182, 212" },
};

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set) => ({
      activeJourney: null,
      setJourney: (journey) => {
        const accent = journey
          ? (JOURNEY_ACCENTS[journey] ?? JOURNEY_ACCENTS.default)
          : JOURNEY_ACCENTS.default;
        set({
          activeJourney: journey,
          accentColor: accent.color,
          accentRgb: accent.rgb,
        });
        // Update CSS custom properties
        if (typeof document !== "undefined") {
          document.documentElement.style.setProperty("--accent", accent.color);
          document.documentElement.style.setProperty("--accent-rgb", accent.rgb);
        }
      },

      theme: "dark",
      setTheme: (theme) => set({ theme }),

      commandPaletteOpen: false,
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),

      navOpen: false,
      setNavOpen: (open) => set({ navOpen: open }),

      accentColor: "#06b6d4",
      accentRgb: "6, 182, 212",
      setAccent: (color, rgb) => set({ accentColor: color, accentRgb: rgb }),
    }),
    {
      name: "dennis-portfolio-store",
      partialize: (state) => ({
        activeJourney: state.activeJourney,
        theme: state.theme,
        accentColor: state.accentColor,
        accentRgb: state.accentRgb,
      }),
    }
  )
);
