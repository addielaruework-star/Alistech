"use client";

import { useState, useEffect, useRef } from "react";

/**
 * NearViewport — defers rendering of below-the-fold or data-heavy
 * components until they are near the viewport (IntersectionObserver).
 * Preserves height during lazy loading to avoid layout shifts.
 */
export default function NearViewport({
  children,
  minHeight = "480px",
}: {
  children: React.ReactNode;
  minHeight?: string;
}) {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldRender) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "250px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldRender]);

  if (!shouldRender) {
    return (
      <div
        ref={containerRef}
        style={{ minHeight }}
        className="w-full flex items-center justify-center"
        aria-hidden="true"
      />
    );
  }

  return <>{children}</>;
}
