"use client";

import { useEffect, useRef, useCallback } from "react";
import { CORE_SERVICES } from "@/lib/constants";

// Icon map: maps the icon string from constants to an SVG path
const ICON_PATHS: Record<string, string> = {
  Globe:           "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z",
  Smartphone:      "M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM12 18h.01",
  LayoutDashboard: "M3 9h8V3H3v6zM13 9h8V3h-8v6zM3 21h8v-6H3v6zM13 15h8v6h-8v-6z",
  Bot:             "M12 8V4H8M4 8h16M4 12a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v6H4v-6zM9 15h.01M15 15h.01",
  MessageCircle:   "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  Zap:             "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  BarChart2:       "M18 20V10M12 20V4M6 20v-6",
  BookOpen:        "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2V3zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7V3z",
  FileText:        "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  Database:        "M12 2C6.48 2 2 4.24 2 7v10c0 2.76 4.48 5 10 5s10-2.24 10-5V7c0-2.76-4.48-5-10-5zM2 12c0 2.76 4.48 5 10 5s10-2.24 10-5M2 7c0 2.76 4.48 5 10 5s10-2.24 10-5",
  CreditCard:      "M1 4h22v16H1V4zM1 10h22",
  Wrench:          "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
};

/**
 * ServiceRing — 3D rotating ring of the 12 core services.
 * Real content on home: server-rendered list items, aria-label on stage.
 * Uses requestAnimationFrame only while visible. Pauses when tab is hidden.
 */
export default function ServiceRing() {
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLUListElement>(null);
  const state = useRef({
    angle: -18,
    velocity: 0,
    dragging: false,
    lastX: 0,
    lastScrollY: 0,
    visible: false,
    rafId: 0,
    prefersReduced: false,
    R: 480,
  });

  // Apply ring transform
  const applyTransform = useCallback(() => {
    const ring = ringRef.current;
    if (!ring) return;
    ring.style.transform = `translateZ(-${state.current.R}px) rotateY(${-state.current.angle}deg)`;
  }, []);

  // Compute radius and set tile transforms with exact compact height (256px desktop, 232px mobile)
  const layout = useCallback(() => {
    const stage = stageRef.current;
    const ring = ringRef.current;
    if (!stage || !ring) return;

    const cw = stage.clientWidth;
    const tileW = cw < 560 ? 176 : 236;
    const tileH = cw < 560 ? 232 : 256;
    const R = Math.round((tileW / 2) / Math.tan(Math.PI / 12) * 1.2);
    state.current.R = R;

    const tiles = ring.querySelectorAll<HTMLElement>(".sring-tile");
    tiles.forEach((tile, i) => {
      tile.style.transform = `rotateY(${i * 30}deg) translateZ(${R}px)`;
      tile.style.width = `${tileW}px`;
      tile.style.height = `${tileH}px`;
      tile.style.marginLeft = `${-tileW / 2}px`;
      tile.style.marginTop = `${-tileH / 2}px`;
    });
    applyTransform();
  }, [applyTransform]);

  // RAF loop
  const tick = useCallback(() => {
    const s = state.current;
    if (!s.visible) {
      s.rafId = 0;
      return;
    }

    if (!s.dragging && !s.prefersReduced) {
      s.angle += 0.12 + s.velocity;
    }
    s.velocity *= 0.94;

    applyTransform();
    s.rafId = requestAnimationFrame(tick);
  }, [applyTransform]);

  const startRAF = useCallback(() => {
    const s = state.current;
    if (s.rafId) return;
    s.rafId = requestAnimationFrame(tick);
  }, [tick]);

  const stopRAF = useCallback(() => {
    const s = state.current;
    if (s.rafId) {
      cancelAnimationFrame(s.rafId);
      s.rafId = 0;
    }
  }, []);

  useEffect(() => {
    const s = state.current;
    s.prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Initial layout & transform
    layout();
    applyTransform();

    // ResizeObserver to re-layout on width changes
    const ro = new ResizeObserver(layout);
    if (stageRef.current) ro.observe(stageRef.current);

    // IntersectionObserver: start/stop RAF based on visibility
    const io = new IntersectionObserver(
      ([entry]) => {
        s.visible = entry.isIntersecting;
        if (s.visible) {
          startRAF();
        } else {
          stopRAF();
        }
      },
      { threshold: 0.05 }
    );
    if (stageRef.current) io.observe(stageRef.current);

    // Page visibility: pause when tab is hidden
    const onVisibility = () => {
      if (document.hidden) stopRAF();
      else if (s.visible) startRAF();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Scroll → small spin (passive, only while visible)
    const onScroll = () => {
      if (!s.visible || s.prefersReduced) return;
      const dy = window.scrollY - s.lastScrollY;
      s.lastScrollY = window.scrollY;
      s.velocity += dy * 0.012;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Pointer drag
    const stage = stageRef.current!;

    const onPointerDown = (e: PointerEvent) => {
      s.dragging = true;
      s.lastX = e.clientX;
      s.velocity = 0;
      stage.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!s.dragging) return;
      const dx = e.clientX - s.lastX;
      s.lastX = e.clientX;
      s.angle -= dx * 0.25;
      s.velocity = -dx * 0.06;
      applyTransform();
    };
    const onPointerUp = () => { s.dragging = false; };

    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", onPointerUp);
    stage.addEventListener("pointercancel", onPointerUp);

    return () => {
      stopRAF();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", onScroll);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerUp);
    };
  }, [layout, startRAF, stopRAF, applyTransform]);

  return (
    <div
      ref={stageRef}
      aria-label="Our 12 services. Drag to turn."
      role="region"
      className="sring-stage"
      style={{
        position: "relative",
        height: "clamp(320px, 36vw, 380px)",
        perspective: "1500px",
        perspectiveOrigin: "50% 40%",
        cursor: "grab",
        touchAction: "pan-y",
        userSelect: "none",
        overflow: "hidden",
      }}
    >
      <ul
        ref={ringRef}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 0,
          height: 0,
          transformStyle: "preserve-3d",
          willChange: "transform",
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {CORE_SERVICES.map((svc, i) => {
          const pathD = ICON_PATHS[svc.icon] || "";
          const isSlate = i % 2 === 1;
          return (
            <li
              key={svc.number}
              className="sring-tile"
              tabIndex={-1}
              style={{
                position: "absolute",
                width: "clamp(176px, 20vw, 236px)",
                height: "clamp(232px, 25vw, 256px)",
                marginLeft: "calc(clamp(176px, 20vw, 236px) / -2)",
                marginTop: "calc(clamp(232px, 25vw, 256px) / -2)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
                transformStyle: "preserve-3d",
                background: "#ffffff",
                border: "1px solid #dde4ec",
                borderRadius: "22px",
                padding: "20px",
                boxShadow: "0 8px 32px -12px rgba(15,23,42,0.12), 0 2px 8px rgba(15,23,42,0.05)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                overflow: "hidden",
              }}
            >
              {/* Pale lime bottom glow */}
              <div
                style={{
                  position: "absolute",
                  inset: "auto -20% -40% -20%",
                  height: "50%",
                  background: isSlate
                    ? "radial-gradient(closest-side, rgba(77,124,15,0.14), transparent)"
                    : "radial-gradient(closest-side, rgba(132,204,22,0.18), transparent)",
                  pointerEvents: "none",
                }}
              />

              {/* Top row: Number + Icon badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: isSlate ? "#365314" : "#3f6212",
                    letterSpacing: "0.04em",
                  }}
                >
                  {svc.number}
                </span>

                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    background: isSlate
                      ? "linear-gradient(135deg, #4d7c0f 0%, #365314 100%)"
                      : "linear-gradient(135deg, #bef264 0%, #84cc16 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: isSlate
                      ? "inset 0 2px 0 rgba(255,255,255,0.45), 0 8px 18px -8px rgba(54,83,20,0.55)"
                      : "inset 0 2px 0 rgba(255,255,255,0.65), 0 8px 18px -8px rgba(132,204,22,0.55)",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isSlate ? "#ffffff" : "#1a2e05"}
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={pathD} />
                  </svg>
                </div>
              </div>

              {/* Bottom block: Title + Description */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-sora)",
                    fontSize: "clamp(14px, 1.4vw, 17px)",
                    fontWeight: 700,
                    color: "#0f172a",
                    lineHeight: 1.25,
                  }}
                >
                  {svc.title}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "clamp(11px, 1.05vw, 12.5px)",
                    color: "#475569",
                    lineHeight: 1.42,
                  }}
                >
                  {svc.description}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
