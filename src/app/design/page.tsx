import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Graphic Design",
  description: "Dennis Opoku Asiedu's graphic design work — brand identities, UI/UX, typography, and visual systems.",
};

const DESIGN_WORK = [
  { title: "Techies Zone Brand Identity", type: "Branding", color: "#10b981", tags: ["Logo", "Typography", "Color System"] },
  { title: "YveeReads UI/UX Design", type: "Product Design", color: "#f59e0b", tags: ["Figma", "User Research", "Prototyping"] },
  { title: "Startup Lens Brand System", type: "Brand System", color: "#6366f1", tags: ["Identity", "Guidelines", "Motion"] },
  { title: "Fintech App UI Redesign", type: "UI Design", color: "#8b5cf6", tags: ["Mobile", "Dark Mode", "Accessibility"] },
  { title: "Conference Poster Series", type: "Print Design", color: "#f43f5e", tags: ["Typography", "Illustration", "Print"] },
  { title: "Zealcraft Visual Language", type: "Visual System", color: "#06b6d4", tags: ["Icons", "Patterns", "Animations"] },
];

export default function DesignPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#f43f5e" }}>
            Graphic Design
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-gradient mb-6">
            Design that
            <br />
            <span style={{ color: "#f43f5e" }}>earns trust.</span>
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl leading-relaxed">
            Brand identities, UI systems, and visual languages — built from first principles and refined through real-world feedback.
          </p>
        </div>

        {/* Design work masonry */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {DESIGN_WORK.map((work, i) => (
            <div
              key={work.title}
              className="break-inside-avoid group rounded-2xl border border-[var(--border)] glass hover:border-[var(--accent)]/40 overflow-hidden transition-all duration-500 cursor-pointer"
              style={{ "--accent": work.color } as React.CSSProperties}
            >
              {/* Color preview area */}
              <div
                className="w-full relative overflow-hidden"
                style={{ height: i % 3 === 0 ? "160px" : i % 3 === 1 ? "200px" : "140px" }}
              >
                <div
                  className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 30% 40%, ${work.color}, transparent 70%)` }}
                />
                <div className="absolute inset-0 grid-pattern opacity-30" />
                <div className="absolute bottom-3 left-3">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded"
                    style={{ backgroundColor: `${work.color}22`, color: work.color }}
                  >
                    {work.type}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-[var(--text)] text-sm mb-3 group-hover:text-[var(--accent)] transition-colors">
                  {work.title}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {work.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-md"
                      style={{ backgroundColor: `${work.color}15`, color: work.color }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
