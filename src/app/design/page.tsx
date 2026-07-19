import type { Metadata } from "next";
import DesignPageClient from "@/components/pages/DesignPageClient";

export const metadata: Metadata = {
  title: "Graphic Design",
  description: "Dennis Opoku Asiedu's graphic design work — brand identities, UI/UX, typography, and visual systems.",
};

export default function DesignPage() {
  return <DesignPageClient />;
}
