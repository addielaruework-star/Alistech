"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  const fullTitle = highlight
    ? title.replace(highlight, `__HIGHLIGHT__`)
    : title;

  const parts = highlight ? fullTitle.split("__HIGHLIGHT__") : [title];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-semibold tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          {eyebrow}
        </span>
      )}

      <h2 className="font-sora font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight text-balance">
        {parts[0]}
        {highlight && (
          <span className="gradient-text">{highlight}</span>
        )}
        {parts[1]}
      </h2>

      {subtitle && (
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
