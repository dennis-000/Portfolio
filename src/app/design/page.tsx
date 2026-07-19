import type { Metadata } from "next";
import { DESIGN_WORK } from "@/lib/data";

export const metadata: Metadata = {
  title: "Graphic Design",
  description: "Dennis Opoku Asiedu's graphic design work — brand identities, UI/UX, typography, and visual systems.",
};

export default function DesignPage() {
  return (
    <div className="min-h-screen pt-28 sm:pt-32 lg:pt-36 pb-20">
      <div className="w-full max-w-screen-2xl mx-auto px-8 sm:px-12 md:px-16 lg:px-16 xl:px-20">
        <div className="mb-16 text-center flex flex-col items-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#f43f5e" }}>
            Graphic Design
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-gradient mb-6 text-center">
            Design that
            <br />
            <span style={{ color: "#f43f5e" }}>earns trust.</span>
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl leading-relaxed mx-auto text-center">
            Brand identities, UI systems, and visual languages — built from first principles and refined through real-world feedback.
          </p>
        </div>

        {/* Design work masonry */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {DESIGN_WORK.map((work, i) => (
            <div
              key={work.title}
              className="break-inside-avoid group rounded-2xl border border-[var(--border)] glass hover:border-[var(--accent)]/40 overflow-hidden transition-all duration-500 cursor-pointer"
              style={{ "--accent": work.color } as React.CSSProperties}
            >
              {/* Color/Image preview area */}
              <div
                className="w-full relative overflow-hidden bg-black/20"
                style={{ height: i % 3 === 0 ? "180px" : i % 3 === 1 ? "240px" : "160px" }}
              >
                {work.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 30% 40%, ${work.color}, transparent 70%)` }}
                  />
                )}
                <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
                <div className="absolute bottom-3 left-3 z-10">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded backdrop-blur-sm shadow-sm"
                    style={{ 
                      backgroundColor: `${work.color}33`, 
                      color: work.color,
                      border: `1px solid ${work.color}44`
                    }}
                  >
                    {work.type}
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6">
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
