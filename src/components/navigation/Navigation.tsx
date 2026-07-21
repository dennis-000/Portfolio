"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePortfolioStore } from "@/store/portfolio";
import { NAV_ITEMS, PERSONAL } from "@/lib/data";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import IntentOnboarding from "@/components/intent/IntentOnboarding";
import DeveloperHUD from "@/components/developer/DeveloperHUD";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { setCommandPaletteOpen, accentColor, accentRgb, visitorIntent, setIntentModalOpen } = usePortfolioStore();

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

  const PRIMARY_NAV = NAV_ITEMS;

  if (pathname.startsWith("/admin") || pathname === "/login") {
    return null;
  }

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[999] border-b border-[var(--border)] glass-strong shadow-lg shadow-black/10 transition-all duration-300"
      >
        <nav className="w-full max-w-screen-2xl mx-auto px-6 sm:px-8 md:px-12 lg:px-12 xl:px-12 2xl:px-14 flex items-center justify-between gap-4 2xl:gap-6" style={{ height: "90px" }}>

          {/* ── Premium Frameless Logo ── */}
          <Link
            href="/"
            className="group relative flex items-center shrink-0 py-1 transition-all duration-300 hover:scale-[1.05] active:scale-95"
          >
            {/* Background Ambient Glow Halo on Hover */}
            <div 
              className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
              style={{ background: `radial-gradient(circle, rgba(${accentRgb}, 0.4) 0%, transparent 70%)` }}
            />

            {/* Light Mode Frameless Logo */}
            <img
              src="/logo-transparent.png"
              alt="Dennis Opoku Logo"
              className="h-14 sm:h-16 md:h-18 2xl:h-20 w-auto object-contain block dark:hidden filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.18)] transition-all duration-300 group-hover:drop-shadow-[0_8px_22px_rgba(0,0,0,0.25)] group-hover:-translate-y-0.5"
            />

            {/* Dark Mode Frameless Logo */}
            <img
              src="/logo-white.png"
              alt="Dennis Opoku Logo"
              className="h-14 sm:h-16 md:h-18 2xl:h-20 w-auto object-contain hidden dark:block filter drop-shadow-[0_0_18px_rgba(255,255,255,0.35)] transition-all duration-300 group-hover:drop-shadow-[0_0_28px_rgba(99,102,241,0.7)] group-hover:-translate-y-0.5"
            />
          </Link>

          {/* ── Mobile Availability Status Pill (Fills empty middle space on mobile screens < xl) ── */}
          <Link
            href="/contact"
            className="xl:hidden flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide shadow-sm shadow-emerald-500/15 hover:bg-emerald-500/20 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="whitespace-nowrap">Available for Hire</span>
          </Link>

          {/* ── Desktop Links ── */}
          <ul
            className="hidden lg:flex items-center gap-0.5 2xl:gap-1.5 overflow-hidden"
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
                      "relative flex items-center gap-1.5 px-2 2xl:px-2.5 py-2 text-xs 2xl:text-[13px] rounded-xl transition-all duration-200 font-bold whitespace-nowrap",
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
          <div className="flex items-center gap-2 sm:gap-2.5 2xl:gap-3.5 shrink-0">
            {/* Search command bar */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden sm:flex 2xl:hidden p-2 rounded-xl glass border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] transition-all cursor-pointer"
              aria-label="Open search"
            >
              <Search size={16} />
            </button>

            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden 2xl:flex items-center justify-between gap-2.5 w-36 2xl:w-40 px-3.5 py-2 text-xs rounded-xl glass border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--accent)]/50 transition-all duration-205 cursor-pointer"
              aria-label="Open command palette"
            >
              <div className="flex items-center gap-1.5">
                <Search size={14} />
                <span>Search...</span>
              </div>
              <kbd className="text-[9px] opacity-60 font-mono px-1 py-0.5 rounded bg-white/10 border border-white/5">⌘K</kbd>
            </button>

            {/* Theme toggle */}
            <div className="hidden sm:block">
              <ThemeToggle className="scale-100" />
            </div>

            {/* CTA — Always visible on desktop & tablet screens */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center px-4 2xl:px-5 py-2 2xl:py-2.5 text-xs 2xl:text-sm font-bold rounded-xl text-white transition-all duration-200 hover:opacity-95 hover:scale-[1.03] shadow-md whitespace-nowrap shrink-0"
              style={{ backgroundColor: accentColor, boxShadow: `0 4px 18px ${accentColor}40` }}
            >
              Let&apos;s talk
            </Link>

            {/* Mobile hamburger - Always visible on mobile screens */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden w-11 h-11 flex items-center justify-center rounded-xl glass border border-[var(--border)] text-[var(--text)] hover:bg-white/10 transition-all cursor-pointer z-[1002] shrink-0"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
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
              className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-lg"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed right-0 top-0 bottom-0 z-[1001] w-[85vw] max-w-sm flex flex-col glass-strong border-l border-[var(--border)] bg-[var(--bg-primary)] shadow-2xl"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-6 border-b border-[var(--border)]/60">
                <div className="flex items-center gap-3">
                  <img
                    src="/logo-transparent.png"
                    alt="Dennis Opoku Logo"
                    className="h-10 w-auto object-contain block dark:hidden"
                  />
                  <img
                    src="/logo-white.png"
                    alt="Dennis Opoku Logo"
                    className="h-10 w-auto object-contain hidden dark:block drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2.5 rounded-xl hover:bg-white/10 text-[var(--text-muted)] hover:text-[var(--text)] transition-all cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X size={22} />
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
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center justify-between px-5 py-4.5 rounded-xl text-lg transition-all duration-200 font-bold",
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
                  onClick={() => setMobileOpen(false)}
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

      {/* ATLAS V2 Global Floating Components */}
      <IntentOnboarding />
      <DeveloperHUD />
    </>
  );
}
