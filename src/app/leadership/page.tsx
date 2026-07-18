import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Dennis Opoku Asiedu's leadership work — hackathons, talks, mentoring, awards, and community building.",
};

const ACHIEVEMENTS = [
  { category: "Speaking", items: ["Tech Summit Africa 2025 — Keynote: AI-Powered Entrepreneurship", "Ghana Developer Conference 2024 — Panel: Building for African Markets", "Startup Pitch Night 2023 — Host & Panelist"] },
  { category: "Hackathons & Competitions", items: ["Pan-African AI Hackathon 2023 — 1st Place", "Ghana Code Challenge 2022 — Top 5 Finalist", "West Africa Startup Competition 2023 — People's Choice"] },
  { category: "Mentoring & Community", items: ["Mentor at Google for Startups Africa Accelerator", "Lead Mentor — Accra Developer Community", "Facilitator — African Women in Tech Bootcamp"] },
  { category: "Certifications & Awards", items: ["AWS Certified Solutions Architect", "Google Professional Data Engineer", "Best Young Innovator — Ghana Tech Awards 2024"] },
];

export default function LeadershipPage() {
  return (
    <div className="min-h-screen pt-28 sm:pt-32 lg:pt-36 pb-20">
      <div className="w-full max-w-screen-2xl mx-auto px-8 sm:px-12 md:px-16 lg:px-16 xl:px-20">
        <div className="mb-16 text-center flex flex-col items-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#06b6d4" }}>
            Leadership
          </p>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-6 text-center">
            Beyond the keyboard.
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl leading-relaxed mx-auto text-center">
            I invest in the ecosystem that made me. Speaking, mentoring, competing, and building community — one builder at a time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
          {ACHIEVEMENTS.map((group, i) => {
            const colors = ["#6366f1", "#8b5cf6", "#06b6d4", "#f59e0b"];
            const color = colors[i % colors.length];
            return (
              <div
                key={group.category}
                className="p-6 rounded-2xl glass border border-[var(--border)] hover:border-[var(--accent)]/30 transition-all duration-300 text-center flex flex-col items-center"
                style={{ "--accent": color } as React.CSSProperties}
              >
                <h2
                  className="text-xs font-bold uppercase tracking-widest mb-5 text-center"
                  style={{ color }}
                >
                  {group.category}
                </h2>
                <ul className="space-y-3 flex flex-col items-center">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-[var(--text-muted)] text-center">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: color }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-5">
          {[
            { value: "5,000+", label: "People reached as speaker" },
            { value: "3", label: "Hackathon wins" },
            { value: "50+", label: "Developers mentored" },
            { value: "15+", label: "Events hosted/attended" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-5 rounded-xl glass border border-[var(--border)] text-center"
            >
              <span className="block text-2xl font-bold font-display text-gradient-accent mb-1">{stat.value}</span>
              <span className="text-xs text-[var(--text-muted)] leading-snug">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
