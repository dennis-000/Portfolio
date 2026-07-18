import type { Metadata } from "next";
import { FEATURED_PROJECTS } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Code2, ExternalLink, TrendingUp } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return FEATURED_PROJECTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = FEATURED_PROJECTS.find((p) => p.id === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = FEATURED_PROJECTS.find((p) => p.id === slug);

  if (!project) notFound();

  const sections = [
    {
      title: "Challenge",
      content: `Building a project like ${project.title} required overcoming several technical and design constraints. The primary goal was to create a solution that is robust, performant, and user-centric, addressing real needs in its space.`,
    },
    {
      title: "Approach & Process",
      content: `I approached this with a focus on modularity and separation of concerns. The stack was chosen for optimal development velocity and performance: ${project.tech.join(", ")}. Iterative testing and research shaped the final result.`,
    },
    {
      title: "Architecture & Code",
      content: `The solution required a careful balance between performance and maintainability. I designed the architecture to be modular, observable, and easy to iterate on — principles that paid dividends as requirements evolved.`,
    },
    {
      title: "Results & Impact",
      content: `The final product delivered measurable impact: ${project.impact}. More importantly, it proved the architectural decisions were sound — the system held up under real production load without significant refactoring.`,
    },
  ];

  return (
    <div className="min-h-screen pt-28 sm:pt-32 lg:pt-36 pb-20">
      <div className="w-full max-w-4xl mx-auto px-8 sm:px-12 md:px-16 lg:px-16 xl:px-20">
        {/* Back */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors mb-10 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          All Projects
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className="px-2.5 py-1 rounded-full text-xs font-semibold uppercase"
              style={{
                backgroundColor: `${project.accent}22`,
                color: project.accent,
              }}
            >
              {project.category}
            </span>
            <span className="text-xs text-[var(--text-muted)]">{project.year}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gradient mb-5 leading-tight">
            {project.title}
          </h1>
          <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-6">{project.description}</p>

          {/* Impact badge */}
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-bold"
            style={{ backgroundColor: `${project.accent}18`, color: project.accent }}
          >
            <TrendingUp size={15} />
            <span>{project.impact}</span>
          </div>

        </div>

        {/* Tech stack */}
        <div className="p-5 rounded-2xl glass border border-[var(--border)] mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-4">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 text-sm rounded-lg font-medium"
                style={{ backgroundColor: `${project.accent}15`, color: project.accent }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Case study sections */}
        <div className="space-y-12">
          {sections.map((section, i) => (
            <div key={section.title}>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: project.accent }}
                >
                  {i + 1}
                </span>
                <h2 className="text-xl font-bold text-[var(--text)] font-display">{section.title}</h2>
              </div>
              <p className="text-[var(--text-muted)] leading-relaxed text-base pl-9">{section.content}</p>
            </div>
          ))}
        </div>

        {/* Footer actions */}
        <div className="mt-16 pt-8 border-t border-[var(--border)] flex flex-wrap items-center gap-4">
          <a
            href="#"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium glass border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--accent)]/40 transition-all"
            style={{ "--accent": project.accent } as React.CSSProperties}
          >
            <Code2 size={15} />
            View Code
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90"
            style={{ backgroundColor: project.accent }}
          >
            <ExternalLink size={14} />
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}
