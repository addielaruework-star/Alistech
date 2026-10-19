"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Clock,
  Phone,
  Mail,
  Globe,
  PhoneCall,
  MessageSquare,
  Smartphone,
  Zap,
  BarChart3,
  Bot,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { PHONE_NUMBER, EMAIL_ADDRESS } from "@/lib/constants";

/**
 * 7 approved service items for the hero vertical floating list, in exact requested order.
 */
const HERO_SERVICES = [
  {
    title: "Websites & Online Stores",
    description: "Build your online presence.",
    icon: Globe,
  },
  {
    title: "AI Phone Receptionist",
    description: "Answer customer calls automatically.",
    icon: PhoneCall,
  },
  {
    title: "WhatsApp AI Agent",
    description: "Reply to customers faster.",
    icon: MessageSquare,
  },
  {
    title: "Mobile Apps & Business Software",
    description: "Manage your work with ease.",
    icon: Smartphone,
  },
  {
    title: "Business Automation",
    description: "Save time on repeated tasks.",
    icon: Zap,
  },
  {
    title: "AI & Data Solutions",
    description: "Turn information into useful insights.",
    icon: BarChart3,
  },
  {
    title: "Custom AI Agents",
    description: "Solutions built around your needs.",
    icon: Bot,
  },
];

/**
 * HeroSection:
 * Left: Approved value proposition, headline, consultation CTA, contact channels (untouched).
 * Right: Premium animated floating vertical services list (7 cards in sequence).
 */
export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

  useEffect(() => {
    if (shouldReduceMotion) return;

    // Sequence through cards during initial entrance
    const timers = HERO_SERVICES.map((_, i) =>
      setTimeout(() => {
        setHighlightedIndex(i);
      }, i * 140)
    );

    // After entrance settles, gently cycle the active highlight
    let interval: NodeJS.Timeout;
    const settleTimer = setTimeout(() => {
      interval = setInterval(() => {
        setHighlightedIndex((prev) => (prev + 1) % HERO_SERVICES.length);
      }, 3200);
    }, HERO_SERVICES.length * 140 + 800);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(settleTimer);
      if (interval) clearInterval(interval);
    };
  }, [shouldReduceMotion]);

  return (
    <section
      id="hero"
      className="relative lg:min-h-[calc(100vh-5rem)] lg:flex lg:items-center pt-24 pb-12 lg:pt-0 lg:pb-0 bg-white overflow-hidden border-b border-[#f1f5f9]"
    >
      <div className="section-container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Core Value Proposition & CTA (7 cols on lg, intentional first screen on mobile) */}
          <div className="lg:col-span-7 min-h-[calc(100vh-7rem)] lg:min-h-0 flex flex-col justify-center text-left py-4 lg:py-8">
            <div className="flex flex-col gap-5 sm:gap-6 max-w-xl">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] text-xs font-semibold tracking-wide w-fit">
                <span className="w-2 h-2 rounded-full bg-[#7CFF4F] shadow-[0_0_8px_#7CFF4F]" />
                <span>Digital Solutions &amp; Software Studio</span>
              </div>

              {/* Headline — Balanced responsive scale, crisp navy with subtle lime accent */}
              <h1 className="font-sora font-extrabold text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] text-[#0f172a] tracking-tight leading-[1.14]">
                We Make Your{" "}
                <span className="text-[#0f172a] relative inline-block">
                  Work Easier.
                  <span className="absolute bottom-1 left-0 right-0 h-2.5 bg-[#7CFF4F]/50 -z-10 rounded-full" />
                </span>
              </h1>

              {/* Concise Description */}
              <p className="text-[#475569] text-base sm:text-lg leading-relaxed">
                AlisTech builds modern websites, apps, business software and smart tools that save you time, cut repetitive manual tasks, and help your business grow smoothly.
              </p>

              {/* CTA & Consultation Block */}
              <div className="flex flex-col gap-3.5 pt-1">
                {/* Primary CTA Button */}
                <div>
                  <Button
                    variant="primary"
                    size="lg"
                    href="/contact"
                    className="w-full sm:w-auto font-bold text-sm sm:text-base px-8 py-3.5 shadow-[0_8px_20px_-6px_rgba(124,255,79,0.55)]"
                  >
                    Let&apos;s Discuss a Solution →
                  </Button>
                </div>

                {/* Exact Approved Consultation Supporting Text */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] max-w-md shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-[#ecfccb] text-[#2d6a0a] flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#7CFF4F]/60">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0f172a] uppercase tracking-wider">
                      Your Free 30-Minute Consultation
                    </div>
                    <div className="text-xs text-[#64748b] leading-relaxed">
                      Tell us what you need. Let&apos;s find the right solution.
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Contact Links */}
              <div
                suppressHydrationWarning
                className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#64748b] pt-1"
              >
                <a
                  href={`tel:${PHONE_NUMBER.replace(/\s+/g, "")}`}
                  suppressHydrationWarning
                  className="flex items-center gap-2 hover:text-[#0f172a] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#2d6a0a]" />
                  <span suppressHydrationWarning className="font-semibold text-[#0f172a]">
                    {PHONE_NUMBER}
                  </span>
                </a>
                <span className="text-[#cbd5e1] hidden sm:inline">•</span>
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  suppressHydrationWarning
                  className="flex items-center gap-2 hover:text-[#0f172a] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#2d6a0a]" />
                  <span className="font-semibold underline underline-offset-4 text-[#0f172a]">
                    {EMAIL_ADDRESS}
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Animated Floating Vertical Services List (5 cols on lg) */}
          <div className="lg:col-span-5 w-full pb-8 lg:pb-0 flex flex-col justify-center">
            {/* Header label above cards */}
            <div className="flex items-center justify-between px-1 mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
                What We Build For You
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#2d6a0a] bg-[#ecfccb] border border-[#7CFF4F]/60 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7CFF4F] animate-pulse" />
                7 Core Services
              </span>
            </div>

            {/* Floating Vertical Cards Stack */}
            <div className="flex flex-col gap-2 sm:gap-2.5 w-full">
              {HERO_SERVICES.map((service, i) => {
                const Icon = service.icon;
                const isHighlighted = highlightedIndex === i;

                return (
                  <motion.div
                    key={service.title}
                    initial={
                      shouldReduceMotion
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 16, scale: 0.98 }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: shouldReduceMotion ? 0 : 0.12 * i,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onMouseEnter={() => setHighlightedIndex(i)}
                    className={`relative p-2.5 sm:p-3 rounded-xl border transition-all duration-300 flex items-center justify-between gap-3 group cursor-pointer ${
                      isHighlighted
                        ? "bg-white border-[#7CFF4F] shadow-[0_8px_24px_-6px_rgba(124,255,79,0.32)] -translate-y-0.5"
                        : "bg-white border-[#e2e8f0] hover:border-[#cbd5e1] shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)]"
                    }`}
                  >
                    {/* Left: Icon and Text */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${
                          isHighlighted
                            ? "bg-[#ecfccb] text-[#2d6a0a] border border-[#7CFF4F]/60"
                            : "bg-[#f8fafc] text-[#0f172a] border border-[#e2e8f0] group-hover:bg-[#f1f5f9]"
                        }`}
                      >
                        <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                      </div>

                      {/* Middle: Title & Description */}
                      <div className="min-w-0 flex flex-col justify-center">
                        <div className="flex items-center gap-2">
                          <h3 className="font-sora font-semibold text-xs sm:text-sm text-[#0f172a] truncate">
                            {service.title}
                          </h3>
                        </div>
                        <p className="text-[11px] sm:text-xs text-[#64748b] truncate leading-tight">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Right: Small lime indicator */}
                    <div className="shrink-0 flex items-center pr-1">
                      {isHighlighted ? (
                        <span className="w-2 h-2 rounded-full bg-[#7CFF4F] shadow-[0_0_8px_#7CFF4F] animate-pulse" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#cbd5e1] group-hover:bg-[#94a3b8]" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
