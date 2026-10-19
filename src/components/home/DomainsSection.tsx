"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  GraduationCap,
  BookOpen,
  Stethoscope,
  ShoppingBag,
  Utensils,
  Building2,
  Rocket,
  Briefcase,
  Building,
  HeartHandshake,
  UserCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/**
 * 11 Domains We Serve as required.
 * Each links directly to its matching industry anchor on the Services page.
 */
const DOMAINS = [
  {
    name: "Schools & Colleges",
    slug: "schools-colleges",
    href: "/services#schools-colleges",
    icon: GraduationCap,
    description: "Student portals & fee systems",
  },
  {
    name: "Coaching Centres",
    slug: "coaching-centres",
    href: "/services#coaching-centres",
    icon: BookOpen,
    description: "Online classes & test portals",
  },
  {
    name: "Clinics & Healthcare",
    slug: "clinics-healthcare",
    href: "/services#clinics-healthcare",
    icon: Stethoscope,
    description: "Doctor booking & WhatsApp reminders",
  },
  {
    name: "Shops & Retail",
    slug: "shops-retail",
    href: "/services#shops-retail",
    icon: ShoppingBag,
    description: "Online stores & stock billing",
  },
  {
    name: "Restaurants & Cafes",
    slug: "restaurants-cafes",
    href: "/services#restaurants-cafes",
    icon: Utensils,
    description: "Digital menus & direct table orders",
  },
  {
    name: "Real Estate",
    slug: "real-estate",
    href: "/services#real-estate",
    icon: Building2,
    description: "Property listings & lead capture",
  },
  {
    name: "Startups",
    slug: "startups",
    href: "/services#startups",
    icon: Rocket,
    description: "MVPs & quick market launches",
  },
  {
    name: "Small Businesses",
    slug: "small-businesses",
    href: "/services#small-businesses",
    icon: Briefcase,
    description: "Professional sites & daily automations",
  },
  {
    name: "Enterprises",
    slug: "enterprises",
    href: "/services#enterprises",
    icon: Building,
    description: "Custom internal tools & data pipelines",
  },
  {
    name: "NGOs & Nonprofits",
    slug: "ngos-nonprofits",
    href: "/services#ngos-nonprofits",
    icon: HeartHandshake,
    description: "Donations & community outreach",
  },
  {
    name: "Individuals & Professionals",
    slug: "individuals-professionals",
    href: "/services#individuals-professionals",
    icon: UserCheck,
    description: "Personal brand & portfolio sites",
  },
];

export default function DomainsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth continuous infinite scrolling loop via requestAnimationFrame
  useEffect(() => {
    const el = scrollRef.current;
    const setEl = setRef.current;
    if (!el || !setEl) return;

    // Respect user's reduced-motion preference
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    let animId: number;
    let lastTime = performance.now();
    const speed = 0.65; // ~39px/sec: calm, readable, luxurious drift

    const step = (now: number) => {
      const delta = Math.min((now - lastTime) / 16.67, 2); // cap frame spikes
      lastTime = now;

      if (!isPaused && el && setEl) {
        const singleSetWidth = setEl.offsetWidth;
        if (singleSetWidth > 0) {
          el.scrollLeft += speed * delta;
          // When 1 full set of 11 items has scrolled past, seamlessly subtract its width
          if (el.scrollLeft >= singleSetWidth) {
            el.scrollLeft -= singleSetWidth;
          }
        }
      }

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animId);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [isPaused]);

  // Arrow button handlers with pause and seamless boundary wrapping
  const handleScroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    const setEl = setRef.current;
    if (!el || !setEl) return;

    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 4000);

    const singleSetWidth = setEl.offsetWidth;
    const scrollAmount = direction === "left" ? -300 : 300;

    // Wrap seamlessly if near left boundary
    if (direction === "left" && el.scrollLeft <= 50 && singleSetWidth > 0) {
      el.scrollLeft += singleSetWidth;
    }

    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }, []);

  const pauseAuto = () => setIsPaused(true);
  const resumeAuto = () => {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    setIsPaused(false);
  };
  const resumeWithDelay = (delayMs = 2500) => {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), delayMs);
  };

  return (
    <section id="domains" className="relative py-16 sm:py-20 bg-white overflow-hidden border-b border-[#e2e8f0]">
      <div className="section-container relative z-10">
        {/* Header with Desktop Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <SectionHeading
            eyebrow="Who We Help"
            title="Domains We "
            highlight="Serve"
            subtitle="Tailored digital solutions built for the specific ways businesses, schools, clinics, and professionals work."
            align="left"
            className="mb-0"
          />

          {/* Carousel Arrows */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleScroll("left")}
              aria-label="Previous domains"
              className="w-10 h-10 rounded-full border border-[#e2e8f0] bg-white text-[#0f172a] flex items-center justify-center hover:border-[#7CFF4F] hover:bg-[#f8fafc] transition-all shadow-sm active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              aria-label="Next domains"
              className="w-10 h-10 rounded-full border border-[#e2e8f0] bg-white text-[#0f172a] flex items-center justify-center hover:border-[#7CFF4F] hover:bg-[#f8fafc] transition-all shadow-sm active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Swipe Hint for Mobile */}
        <p className="sm:hidden text-xs text-[#64748b] -mt-6 mb-6 font-medium flex items-center gap-1.5">
          <span>Swipe horizontally to explore domains</span>
          <span>→</span>
        </p>

        {/* Horizontal Scrolling Row with Smooth Edge Gradient Masks */}
        <div className="relative overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div
            ref={scrollRef}
            onMouseEnter={pauseAuto}
            onMouseLeave={resumeAuto}
            onFocusCapture={pauseAuto}
            onBlurCapture={resumeAuto}
            onTouchStart={pauseAuto}
            onTouchEnd={() => resumeWithDelay(2500)}
            className="flex items-start overflow-x-auto scroll-smooth pb-4 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{
              touchAction: "pan-x",
              maskImage:
                "linear-gradient(to right, transparent 0, black 32px, black calc(100% - 32px), transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0, black 32px, black calc(100% - 32px), transparent 100%)",
            }}
          >
            {/* 3 identical sets of all 11 domains for mathematically seamless infinite looping */}
            {[0, 1, 2].map((setIndex) => (
              <div
                key={`domain-set-${setIndex}`}
                ref={setIndex === 0 ? setRef : undefined}
                aria-hidden={setIndex > 0 ? "true" : undefined}
                className="flex items-start gap-4 sm:gap-6 shrink-0 pr-4 sm:pr-6"
              >
                {DOMAINS.map((domain) => {
                  const Icon = domain.icon;

                  return (
                    <Link
                      key={`${domain.slug}-${setIndex}`}
                      href={domain.href}
                      tabIndex={setIndex > 0 ? -1 : undefined}
                      className="flex flex-col items-center gap-2.5 shrink-0 group text-center w-[116px] sm:w-[136px] lg:w-[144px] focus:outline-none"
                      aria-label={`Learn about solutions for ${domain.name}`}
                    >
                      {/* Circular Item */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#f8fafc] border border-[#e2e8f0] group-hover:border-[#7CFF4F] shadow-sm flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_4px_20px_rgba(124,255,79,0.35)] group-hover:-translate-y-1 relative overflow-hidden shrink-0">
                        {/* Pale lime glow inside */}
                        <div className="absolute inset-0 bg-[#7CFF4F]/0 group-hover:bg-[#7CFF4F]/10 rounded-full transition-colors duration-300" />

                        <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#0f172a] group-hover:text-[#2d6a0a] transition-all duration-300 group-hover:scale-110 relative z-10" />
                      </div>

                      {/* Domain Title */}
                      <div className="flex flex-col items-center gap-0.5 w-full">
                        <span className="font-sora font-semibold text-xs sm:text-sm text-[#0f172a] group-hover:text-[#2d6a0a] transition-colors leading-snug line-clamp-2 px-1">
                          {domain.name}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-[#64748b] font-medium hidden sm:inline-block leading-tight line-clamp-2 px-1">
                          {domain.description}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
