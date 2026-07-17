import type { Metadata } from "next";
import { EngineeringPage } from "@/components/pages/EngineeringPage";

export const metadata: Metadata = {
  title: "Software Engineering",
  description:
    "Explore Dennis Opoku Asiedu's software engineering work — full-stack systems, APIs, architecture diagrams, GitHub stats, and featured code projects.",
};

export default function Engineering() {
  return <EngineeringPage />;
}
