import type { Metadata } from "next";
import { COMPANIES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Ventures & Entrepreneurship",
  description: "Dennis Opoku Asiedu's companies — The Startup Lens, Techies Zone Solutions, YveeReads, and Zealcraft Innovation.",
};

export default function VenturesPage() {
  return (
    <div className="min-h-screen pt-52 sm:pt-56 lg:pt-64 pb-20">
      <div className="w-full max-w-screen-2xl mx-auto px-8 sm:px-12 md:px-16 lg:px-16 xl:px-20">
        <div className="mb-16 text-center flex flex-col items-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#10b981" }}>
            Entrepreneurship
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-gradient mb-6 text-center">
            Not just code.
            <br />
            <span style={{ color: "#10b981" }}>Companies.</span>
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl leading-relaxed mx-auto text-center">
            I don&apos;t just build products — I build the companies and ecosystems around them.
            Here&apos;s a look inside my venture portfolio.
          </p>
        </div>

        <div className="space-y-12">
          {COMPANIES.map((company, i) => (
            <div
              key={company.id}
              id={company.id}
              className="grid grid-cols-1 lg:grid-cols-5 gap-8 p-8 sm:p-10 rounded-3xl border border-[var(--border)] glass hover:border-[var(--accent)]/30 transition-all duration-500 group"
              style={{ "--accent": company.accent } as React.CSSProperties}
            >
              {/* Company identity */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold text-white"
                    style={{ backgroundColor: company.accent }}
                  >
                    {company.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--text)] font-display">{company.name}</h2>
                    <p className="text-sm text-[var(--text-muted)]">{company.role} · Est. {company.founded}</p>
                  </div>
                </div>
                <p className="text-sm italic mb-4" style={{ color: company.accent }}>
                  &ldquo;{company.tagline}&rdquo;
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {company.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2.5 py-1 rounded-full border border-[var(--border)] text-[var(--text-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="lg:col-span-3">
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                  {company.description}
                </p>

                <div className="mb-6">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-3">
                    Mission
                  </h3>
                  <p className="text-sm text-[var(--text)]">{company.mission}</p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-3">
                    Key Achievements
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {company.achievements.map((achievement) => (
                      <div
                        key={achievement}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium"
                        style={{
                          backgroundColor: `${company.accent}18`,
                          color: company.accent,
                        }}
                      >
                        <span className="w-1 h-1 rounded-full" style={{ backgroundColor: company.accent }} />
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
