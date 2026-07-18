import type { Metadata } from "next";
import { Clapperboard, Video, Sparkles, BookOpen, Camera, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Creative Studio",
  description: "Dennis Opoku Asiedu's creative work — video production, brand campaigns, photography, and visual storytelling.",
};

const CREATIVE_WORK = [
  { title: "Pan-African Youth Campaign", type: "Campaign", year: "2023", impact: "2M+ reach", color: "#f59e0b", icon: "Clapperboard" },
  { title: "Startup Lens Brand Video", type: "Video Production", year: "2023", impact: "50K+ views", color: "#f43f5e", icon: "Video" },
  { title: "Techies Zone Product Reel", type: "Motion", year: "2024", impact: "Brand launch", color: "#8b5cf6", icon: "Sparkles" },
  { title: "YveeReads Launch Campaign", type: "Campaign", year: "2023", impact: "10K signups", color: "#06b6d4", icon: "BookOpen" },
  { title: "Ghana Tech Summit Coverage", type: "Photography", year: "2024", impact: "5K attendees", color: "#10b981", icon: "Camera" },
  { title: "Zealcraft Brand Documentary", type: "Documentary", year: "2022", impact: "Award nominee", color: "#6366f1", icon: "Trophy" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Clapperboard, Video, Sparkles, BookOpen, Camera, Trophy,
};

export default function CreativePage() {
  return (
    <div className="min-h-screen pt-28 sm:pt-32 lg:pt-36 pb-20">
      <div className="w-full max-w-screen-2xl mx-auto px-8 sm:px-12 md:px-16 lg:px-16 xl:px-20">
        <div className="mb-16 text-center flex flex-col items-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#f59e0b" }}>
            Creative Studio
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-gradient mb-6 text-center">
            Stories that move
            <br />
            <span style={{ color: "#f59e0b" }}>people and brands.</span>
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl leading-relaxed mx-auto text-center">
            From pan-African campaigns to product reels — I direct, produce, and deliver visual stories that connect brands with their audiences.
          </p>
        </div>

        {/* Studio grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {CREATIVE_WORK.map((work) => {
            const Icon = ICON_MAP[work.icon] ?? Camera;
            return (
              <div
                key={work.title}
                className="group relative overflow-hidden rounded-2xl border border-[var(--border)] glass hover:border-[var(--accent)]/40 transition-all duration-500 aspect-video flex items-end p-6 cursor-pointer"
                style={{ "--accent": work.color } as React.CSSProperties}
              >
                {/* Background */}
                <div
                  className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 50% 30%, ${work.color}, transparent 70%)` }}
                />
                <div className="absolute inset-0 grid-pattern opacity-20" />

                {/* Center icon badge instead of emoji */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center opacity-40 group-hover:opacity-80 transition-all group-hover:scale-110 duration-500 transform"
                    style={{ backgroundColor: `${work.color}15`, border: `1px solid ${work.color}30` }}
                  >
                    <Icon size={32} style={{ color: work.color }} />
                  </div>
                </div>

                <div className="relative z-10 w-full">
                  <span
                    className="block text-[11px] font-bold uppercase tracking-widest mb-1.5"
                    style={{ color: work.color }}
                  >
                    {work.type} · {work.year}
                  </span>
                  <h3 className="text-base font-bold text-[var(--text)] leading-tight mb-1">{work.title}</h3>
                  <span className="text-xs text-[var(--text-muted)]">{work.impact}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Services */}
        <div className="mt-24">
          <h2 className="text-2xl font-display font-bold text-[var(--text)] mb-8">Studio Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {[
              "Video Production", "Brand Campaigns", "Motion Graphics",
              "Photography", "Creative Direction", "Social Media Strategy",
            ].map((service) => (
              <div
                key={service}
                className="p-5 rounded-xl glass border border-[var(--border)] text-sm text-[var(--text-muted)] text-center hover:text-[var(--text)] hover:border-[#f59e0b]/30 transition-all font-medium"
              >
                {service}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
