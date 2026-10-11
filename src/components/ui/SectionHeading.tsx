"use client";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  theme?: "light" | "dark";
}

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
  className,
  theme = "light",
}: SectionHeadingProps) {
  const fullTitle = highlight
    ? title.replace(highlight, `__HIGHLIGHT__`)
    : title;

  const parts = highlight ? fullTitle.split("__HIGHLIGHT__") : [title];

  return (
    <div
      suppressHydrationWarning
      className={cn(
        "rv flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border",
            theme === "dark"
              ? "border-white/10 bg-white/5 text-[#e2e8f0]"
              : "border-[#dde4ec] bg-white text-[#3f6212] shadow-sm"
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16]" />
          {eyebrow}
        </span>
      )}

      <h2
        className={cn(
          "font-sora font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-balance",
          theme === "dark" ? "text-[#f8fafc]" : "text-[#0f172a]"
        )}
      >
        {parts[0]}
        {highlight && (
          <span className="gradient-text">{highlight}</span>
        )}
        {parts[1]}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "text-lg md:text-xl max-w-2xl leading-relaxed",
            theme === "dark" ? "text-[#b2bdcc]" : "text-[#475569]"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
