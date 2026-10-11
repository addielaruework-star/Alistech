"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    const handleScroll = () => setScrolled(window.scrollY > 20);
    // Set initial scroll state
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/*
       * Use a plain <header> (no motion) so SSR and client render identically.
       * The slide-in animation is done via CSS @keyframes nav-slide-in applied
       * once. Scrolled state is toggled after mount so no hydration mismatch.
       */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-[padding,background-color,border-color,box-shadow] duration-300 animate-nav-in",
          scrolled
            ? "py-3 bg-white/95 backdrop-blur-xl border-b border-[#dde4ec] shadow-[0_6px_24px_-10px_rgba(15,23,42,0.12)]"
            : "py-4 bg-white/95 backdrop-blur-md border-b border-[#dde4ec]/60"
        )}
      >
        <div className="section-container flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#bef264] to-[#84cc16] flex items-center justify-center shadow-[0_0_16px_rgba(132,204,22,0.4)] group-hover:shadow-[0_0_24px_rgba(132,204,22,0.65)] transition-all duration-300">
              <Zap className="w-4 h-4 text-[#1a2e05]" fill="#1a2e05" />
            </div>
            <span className="font-sora font-bold text-xl text-[#0f172a]">
              Alis<span className="gradient-text font-extrabold">Tech</span>
            </span>
          </Link>

          {/* Desktop Nav — always in DOM, CSS hides below lg */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
                    isActive
                      ? "text-[#0f172a] bg-[#eef2f6]"
                      : "text-[#475569] hover:text-[#0f172a] hover:bg-[#eef2f6]/80"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA — always in DOM, CSS hides below lg */}
          <div className="hidden lg:flex items-center shrink-0">
            <Button variant="secondary" size="sm" href="/contact">
              Start a Project →
            </Button>
          </div>

          {/* Mobile hamburger — always in DOM, CSS hides above lg */}
          <button
            className="lg:hidden text-[#0f172a] p-2 rounded-lg hover:bg-[#eef2f6] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-40 pt-20 bg-white/98 backdrop-blur-xl lg:hidden"
          >
            <nav className="section-container flex flex-col gap-2 pt-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "block px-5 py-4 rounded-xl text-lg font-medium border transition-all",
                      pathname === link.href
                        ? "text-[#0f172a] border-[#84cc16]/40 bg-[#ecfccb]"
                        : "text-[#475569] border-transparent hover:border-[#dde4ec] hover:bg-[#eef2f6]"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col gap-3 mt-4"
              >
                <Button variant="secondary" size="lg" href="/contact" className="w-full">
                  Start a Project →
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
