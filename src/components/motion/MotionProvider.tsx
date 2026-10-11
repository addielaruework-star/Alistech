"use client";
import { useEffect } from "react";

/**
 * MotionProvider
 * ─────────────
 * 1. Adds `js-rv` to <html> so CSS reveal start-state is only active when JS runs.
 * 2. IntersectionObserver: adds `in-view` to every `.rv` element once it crosses
 *    the viewport at threshold 0.15, then unobserves it.
 * 3. Pointer-delegation for `.tilt` cards:  rotateY/rotateX on pointermove,
 *    reset on pointerleave.  Only active when the device supports hover and
 *    the user has not requested reduced motion.
 *
 * No dependencies beyond React. Zero external libs.
 */

export default function MotionProvider() {
  /* ── 1. Scroll reveal ── */
  useEffect(() => {
    const html = document.documentElement;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return; // show everything immediately

    // Mark html so CSS can apply the hidden start-state
    html.classList.add("js-rv");

    const supportsIO = typeof IntersectionObserver !== "undefined";
    if (!supportsIO) {
      // Fallback: show everything
      html.classList.remove("js-rv");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    // Defer observer setup to avoid mutating DOM before React finishes hydration
    let mo: MutationObserver | null = null;
    const observe = () => {
      document.querySelectorAll(".rv:not(.in-view)").forEach((el) => io.observe(el));
    };

    const rafId = requestAnimationFrame(() => {
      observe();
      mo = new MutationObserver(observe);
      mo.observe(document.body, { childList: true, subtree: true });
    });

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      if (mo) mo.disconnect();
      html.classList.remove("js-rv");
    };
  }, []);

  /* ── 2. Mouse tilt ── */
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasHover = window.matchMedia("(hover: hover)").matches;

    if (prefersReduced || !hasHover) return;

    function onPointerMove(e: PointerEvent) {
      const target = (e.target as HTMLElement).closest<HTMLElement>(".tilt");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      target.style.transition = "transform 0.2s";
      target.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
    }

    function onPointerOut(e: PointerEvent) {
      const target = (e.target as HTMLElement).closest<HTMLElement>(".tilt");
      if (!target) return;
      const related = e.relatedTarget as HTMLElement | null;
      if (related && target.contains(related)) return;
      target.style.transition = "transform 0.6s";
      target.style.transform = "";
    }

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerout", onPointerOut);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerout", onPointerOut);
    };
  }, []);

  return null;
}
