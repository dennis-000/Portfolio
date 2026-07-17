"use client";

import { SmoothScroll } from "@/components/SmoothScroll";
import { ThemeApplicator } from "@/components/ThemeApplicator";

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <ThemeApplicator />
      <div className="gradient-mesh" aria-hidden="true" />
      {children}
    </SmoothScroll>
  );
}
