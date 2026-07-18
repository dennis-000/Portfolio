"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePortfolioStore } from "@/store/portfolio";
import { NAV_ITEMS, PERSONAL } from "@/lib/data";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { setCommandPaletteOpen, accentColor, accentRgb } = usePortfolioStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setCommandPaletteOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const PRIMARY_NAV = NAV_ITEMS.slice(0, 7);

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[999] border-b border-[var(--border)] glass-strong shadow-lg shadow-black/10 transition-all duration-300"
      >
        <nav className="w-full max-w-screen-2xl mx-auto px-6 sm:px-8 md:px-12 lg:px-12 xl:px-12 2xl:px-14 flex items-center justify-between gap-4 2xl:gap-6" style={{ height: "90px" }}>

          {/* ── Logo ── */}
          <Link
            href="/"
            className="group flex items-center gap-3 shrink-0"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-white text-lg transition-transform duration-300 group-hover:scale-105"
              style={{
                backgroundColor: accentColor,
                boxShadow: `0 4px 18px rgba(var(--accent-rgb), 0.35)`,
              }}
            >
              D
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-[var(--text)] tracking-wide leading-none">
                Dennis Opoku
              </span>
              <span className="text-xs text-[var(--text-muted)] mt-1 font-medium">
                Builder
              </span>
            </div>
          </Link>

          {/* ── Desktop Links ── */}
          <ul
            className="hidden xl:flex items-center gap-1.5 2xl:gap-2.5"
            role="navigation"
            aria-label="Main navigation"
          >
            {PRIMARY_NAV.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative flex items-center gap-2 px-3 2xl:px-3.5 py-2.5 text-sm 2xl:text-[15px] rounded-xl transition-all duration-200 font-bold whitespace-nowrap",
                      isActive
                        ? "text-[var(--text)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-white/5"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-xl"
                        style={{ backgroundColor: `rgba(${accentRgb}, 0.15)` }}
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="relative z-10 w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: accentColor }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 2xl:gap-4">
            {/* Search command bar */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="2xl:hidden p-2.5 rounded-xl glass border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] transition-all cursor-pointer"
              aria-label="Open search"
            >
              <Search size={18} />
            </button>

            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden 2xl:flex items-center justify-between gap-3 w-40 2xl:w-44 px-4 py-2.5 text-sm rounded-xl glass border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--accent)]/50 transition-all duration-205 cursor-pointer"
              aria-label="Open command palette"
            >
              <div className="flex items-center gap-2">
                <Search size={16} />
                <span>Search...</span>
              </div>
              <kbd className="text-[10px] opacity-60 font-mono px-1.5 py-0.5 rounded bg-white/10 border border-white/5">⌘K</kbd>
            </button>

            {/* Theme toggle */}
            <ThemeToggle className="scale-110" />

            {/* CTA */}
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center px-4.5 2xl:px-5 py-2.5 2xl:py-3 text-sm 2xl:text-[15px] font-bold rounded-xl text-white transition-all duration-200 hover:opacity-95 hover:scale-[1.03] shadow-md whitespace-nowrap"
              style={{ backgroundColor: accentColor, boxShadow: `0 4px 18px ${accentColor}40` }}
            >
              Let&apos;s talk
            </Link>

            {/* Mobile hamburger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden p-2.5 rounded-xl glass border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] transition-all"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/75 backdrop-blur-md"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-80 flex flex-col glass-strong border-l border-[var(--border)]"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]/60">
                <div>
                  <p className="text-base font-bold text-[var(--text)]">Dennis Opoku</p>
                  <p className="text-xs text-[var(--text-muted)]">Builder · Creator · Founder</p>
                </div>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-xl hover:bg-white/8 text-[var(--text-muted)] hover:text-[var(--text)] transition-all"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-5 py-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] px-4 mb-4">
                  Navigate
                </p>
                <ul className="space-y-2.5">
                  {NAV_ITEMS.map((item, i) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.22 }}
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center justify-between px-5 py-5 rounded-xl text-lg transition-all duration-200 font-bold",
                            isActive
                              ? "text-[var(--text)]"
                              : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-white/5"
                          )}
                          style={isActive ? { backgroundColor: `${item.accent}20` } : {}}
                        >
                          <span>{item.label}</span>
                          {isActive && (
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: item.accent }}
                            />
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Drawer footer */}
              <div className="px-6 py-6 border-t border-[var(--border)]/60">
                <Link
                  href="/contact"
                  className="flex items-center justify-center px-6 py-4.5 text-base font-bold rounded-xl text-white transition-all hover:opacity-90 shadow-lg"
                  style={{ backgroundColor: accentColor }}
                >
                  Let&apos;s talk →
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
