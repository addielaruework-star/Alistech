"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap";

  const variants = {
    primary:
      "bg-gradient-to-r from-[#bef264] to-[#84cc16] text-[#1a2e05] shadow-[0_12px_28px_-12px_rgba(132,204,22,0.7)] hover:shadow-[0_16px_32px_-12px_rgba(132,204,22,0.85)]",
    secondary:
      "bg-[#0f172a] hover:bg-[#1e293b] text-white border border-transparent",
    ghost:
      "bg-white border border-[#dde4ec] hover:border-[#0f172a] text-[#0f172a]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
