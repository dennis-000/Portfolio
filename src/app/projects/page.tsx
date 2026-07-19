import type { Metadata } from "next";
import ProjectsPageClient from "@/components/pages/ProjectsPageClient";

export const metadata: Metadata = {
  title: "Projects",
  description: "Dennis Opoku Asiedu's full project library — case studies across software engineering, AI, design, creative media, and entrepreneurship.",
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
