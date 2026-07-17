"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePortfolioStore } from "@/store/portfolio";
import { NAV_ITEMS, PERSONAL } from "@/lib/data";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const PRIMARY_LINKS = NAV_ITEMS.slice(0, 6);  // Engineering → Projects
const SECONDARY_LINKS = NAV_ITEMS.slice(6);    // Blog, Contact

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { setCommandPaletteOpen, accentColor, accentRgb } = usePortfolioStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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

  // Prevent body scroll when mobile open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "glass-strong shadow-lg shadow-black/10 py-3 border-b border-[var(--border)]/60"
            : "py-5"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

          {/* ─── Logo ─── */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 shrink-0"
            aria-label="Dennis Opoku Asiedu — Home"
          >
            <motion.span
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-sm"
              style={{ backgroundColor: accentColor }}
            >
              D
            </motion.span>
            <span className="hidden sm:block text-sm font-semibold text-[var(--text)] tracking-tight">
              {PERSONAL.shortName}
            </span>
          </Link>

          {/* ─── Desktop Nav ─── */}
          <ul className="hidden lg:flex items-center gap-0.5" role="navigation" aria-label="Main navigation">
            {PRIMARY_LINKS.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg transition-all duration-200",
                      isActive
                        ? "text-[var(--text)] font-medium"
                        : "text-[var(--text-muted)] hover:text-[var(--text)]"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg"
                        style={{ backgroundColor: `rgba(${accentRgb}, 0.12)` }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <span
                        className="relative z-10 w-1 h-1 rounded-full"
                        style={{ backgroundColor: accentColor }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ─── Right actions ─── */}
          <div className="flex items-center gap-2">
            {/* Search / command */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg glass border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--accent)]/40 transition-all duration-200"
              aria-label="Open command palette"
            >
              <Command size={11} />
              <span className="hidden md:block">Search</span>
              <kbd className="hidden md:block ml-0.5 text-[9px] opacity-50 font-mono">⌘K</kbd>
            </button>

            {/* Theme toggle */}
            <ThemeToggle className="hidden sm:inline-flex" />

            {/* CTA button */}
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center px-4 py-1.5 text-sm font-semibold rounded-lg text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.03]"
              style={{ backgroundColor: accentColor }}
            >
              Let&apos;s talk
            </Link>

            {/* Mobile hamburger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg glass border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] transition-all"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={17} /> : <Menu size={17} />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* ─── Mobile Drawer ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 flex flex-col glass-strong border-l border-[var(--border)]"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between p-5 border-b border-[var(--border)]/60">
                <span className="text-sm font-semibold text-[var(--text)]">Menu</span>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-white/5 text-[var(--text-muted)] hover:text-[var(--text)] transition-all"
                    aria-label="Close menu"
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto py-4 px-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] px-3 mb-2">
                  Explore
                </p>
                <ul className="space-y-0.5 mb-6">
                  {NAV_ITEMS.map((item, i) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.25 }}
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-200",
                            isActive
                              ? "text-[var(--text)] font-medium"
                              : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-white/5"
                          )}
                          style={isActive ? { backgroundColor: `${item.accent}14` } : {}}
                        >
                          <span>{item.label}</span>
                          {isActive && (
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: item.accent }}
                            />
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Drawer CTA */}
              <div className="p-4 border-t border-[var(--border)]/60">
                <Link
                  href="/contact"
                  className="flex items-center justify-center px-4 py-3 text-sm font-semibold rounded-xl text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: accentColor }}
                >
                  Let&apos;s talk
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
