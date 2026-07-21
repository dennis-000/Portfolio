import { create } from "zustand";
import { persist } from "zustand/middleware";

export type JourneyId = "engineering" | "ai" | "creative" | "ventures" | "design" | null;
export type VisitorIntent = "hiring-engineer" | "ai-expertise" | "creative-media" | "startup-ventures" | "general" | null;
export type Theme = "dark" | "light" | "system";

interface PortfolioStore {
  // Journey / persona
  activeJourney: JourneyId;
  setJourney: (journey: JourneyId) => void;

  // Visitor Intent Engine
  visitorIntent: VisitorIntent;
  setVisitorIntent: (intent: VisitorIntent) => void;
  intentModalOpen: boolean;
  setIntentModalOpen: (open: boolean) => void;

  // Recruiter Mode
  recruiterMode: boolean;
  toggleRecruiterMode: (active?: boolean) => void;

  // Developer HUD Mode
  developerMode: boolean;
  toggleDeveloperMode: (active?: boolean) => void;

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

  // Interactive Code Playground Effects
  matrixRainActive: boolean;
  confettiTrigger: number;
  toggleMatrixRain: (active?: boolean) => void;
  triggerConfetti: () => void;
}

const JOURNEY_ACCENTS: Record<string, { color: string; rgb: string }> = {
  engineering: { color: "#6366f1", rgb: "99, 102, 241" },
  ai: { color: "#8b5cf6", rgb: "139, 92, 246" },
  creative: { color: "#f59e0b", rgb: "245, 158, 11" },
  design: { color: "#f43f5e", rgb: "244, 63, 94" },
  ventures: { color: "#10b981", rgb: "16, 185, 129" },
  default: { color: "#06b6d4", rgb: "6, 182, 212" },
};

const INTENT_MAPPING: Record<NonNullable<VisitorIntent>, { journey: JourneyId; accent: string; rgb: string }> = {
  "hiring-engineer": { journey: "engineering", accent: "#6366f1", rgb: "99, 102, 241" },
  "ai-expertise": { journey: "ai", accent: "#8b5cf6", rgb: "139, 92, 246" },
  "creative-media": { journey: "creative", accent: "#f59e0b", rgb: "245, 158, 11" },
  "startup-ventures": { journey: "ventures", accent: "#10b981", rgb: "16, 185, 129" },
  "general": { journey: null, accent: "#06b6d4", rgb: "6, 182, 212" },
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
        if (typeof document !== "undefined") {
          document.documentElement.style.setProperty("--accent", accent.color);
          document.documentElement.style.setProperty("--accent-rgb", accent.rgb);
        }
      },

      visitorIntent: null,
      setVisitorIntent: (intent) => {
        if (!intent) {
          set({ visitorIntent: null });
          return;
        }
        const mapping = INTENT_MAPPING[intent];
        const isRecruiter = intent === "hiring-engineer";
        set({
          visitorIntent: intent,
          activeJourney: mapping.journey,
          accentColor: mapping.accent,
          accentRgb: mapping.rgb,
          recruiterMode: isRecruiter,
        });
        if (typeof document !== "undefined") {
          document.documentElement.style.setProperty("--accent", mapping.accent);
          document.documentElement.style.setProperty("--accent-rgb", mapping.rgb);
        }
      },
      intentModalOpen: false,
      setIntentModalOpen: (open) => set({ intentModalOpen: open }),

      recruiterMode: false,
      toggleRecruiterMode: (active) => set((s) => ({ recruiterMode: active !== undefined ? active : !s.recruiterMode })),

      developerMode: false,
      toggleDeveloperMode: (active) => set((s) => ({ developerMode: active !== undefined ? active : !s.developerMode })),

      theme: "dark",
      setTheme: (theme) => set({ theme }),

      commandPaletteOpen: false,
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),

      navOpen: false,
      setNavOpen: (open) => set({ navOpen: open }),

      accentColor: "#06b6d4",
      accentRgb: "6, 182, 212",
      setAccent: (color, rgb) => {
        set({ accentColor: color, accentRgb: rgb });
        if (typeof document !== "undefined") {
          document.documentElement.style.setProperty("--accent", color);
          document.documentElement.style.setProperty("--accent-rgb", rgb);
        }
      },

      matrixRainActive: false,
      confettiTrigger: 0,
      toggleMatrixRain: (active) => set((s) => ({ matrixRainActive: active !== undefined ? active : !s.matrixRainActive })),
      triggerConfetti: () => set((s) => ({ confettiTrigger: s.confettiTrigger + 1 })),
    }),
    {
      name: "dennis-portfolio-store",
      partialize: (state) => ({
        activeJourney: state.activeJourney,
        visitorIntent: state.visitorIntent,
        recruiterMode: state.recruiterMode,
        developerMode: state.developerMode,
        theme: state.theme,
        accentColor: state.accentColor,
        accentRgb: state.accentRgb,
      }),
    }
  )
);
