import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-8xl font-display font-bold text-gradient mb-4">404</p>
        <h1 className="text-2xl font-bold text-[var(--text)] mb-3">Page not found</h1>
        <p className="text-[var(--text-muted)] mb-8">
          This page doesn&apos;t exist — but the work that does is worth seeing.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-[var(--border)] text-sm text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--accent)]/40 transition-all"
        >
          <ArrowLeft size={14} />
          Back home
        </Link>
      </div>
    </div>
  );
}
