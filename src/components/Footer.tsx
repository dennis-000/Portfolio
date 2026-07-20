"use client";

import Link from "next/link";
import Image from "next/image";
import { GitBranch, Globe2, AtSign, Mail } from "lucide-react";
import { PERSONAL, NAV_ITEMS } from "@/lib/data";
import { usePortfolioStore } from "@/store/portfolio";
import { usePathname } from "next/navigation";

export function Footer() {
  const accentColor = usePortfolioStore((s) => s.accentColor);
  const year = new Date().getFullYear();
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname === "/login") {
    return null;
  }

  return (
    <footer className="border-t border-[var(--border)] mt-24">
      <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 md:px-16 lg:px-16 xl:px-20 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="group relative inline-flex items-center mb-4 transition-all duration-300 hover:scale-[1.05]">
              <img
                src="/logo-transparent.png"
                alt="Dennis Opoku Logo"
                className="h-12 sm:h-14 w-auto object-contain block dark:hidden filter drop-shadow-md"
              />
              <img
                src="/logo-white.png"
                alt="Dennis Opoku Logo"
                className="h-12 sm:h-14 w-auto object-contain hidden dark:block filter drop-shadow-[0_0_18px_rgba(255,255,255,0.35)] group-hover:drop-shadow-[0_0_26px_rgba(99,102,241,0.6)]"
              />
            </Link>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-xs">
              {PERSONAL.tagline}
            </p>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-4">
              Navigate
            </h3>
            <ul className="space-y-2">
              {NAV_ITEMS.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-4">
              Connect
            </h3>
            <div className="flex gap-3 mb-4">
              {[
                { href: PERSONAL.github, Icon: GitBranch, label: "GitHub" },
                { href: PERSONAL.linkedin, Icon: Globe2, label: "LinkedIn" },
                { href: PERSONAL.twitter, Icon: AtSign, label: "Twitter" },
                { href: `mailto:${PERSONAL.email}`, Icon: Mail, label: "Email" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-8 h-8 rounded-lg glass border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--accent)]/40 transition-all"
                  style={{ "--accent": accentColor } as React.CSSProperties}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
            <p className="text-xs text-[var(--text-muted)]">{PERSONAL.email}</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-[var(--border)] gap-3">
          <p className="text-xs text-[var(--text-muted)]">
            © {year} Dennis Opoku Asiedu. Built with Next.js & ♥
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            {PERSONAL.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
