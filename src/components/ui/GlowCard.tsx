"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  delay?: number;
  hover?: boolean;
}

export default function GlowCard({
  children,
  className,
  glowColor = "rgba(37,99,235,0.15)",
  delay = 0,
  hover = true,
}: GlowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      style={
        hover
          ? {
              "--glow-color": glowColor,
            } as React.CSSProperties
          : undefined
      }
      className={cn(
        "glass-card rounded-2xl p-6 relative overflow-hidden group",
        hover && "cursor-default hover:border-blue-500/30 transition-all duration-300",
        className
      )}
    >
      {/* Subtle inner glow on hover */}
      {hover && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${glowColor} 0%, transparent 70%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
