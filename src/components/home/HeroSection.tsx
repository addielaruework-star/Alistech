"use client";

import { motion } from "framer-motion";
import { Globe, Bot, Zap, Target } from "lucide-react";
import Button from "@/components/ui/Button";
import { PHONE_NUMBER, EMAIL_ADDRESS } from "@/lib/constants";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const CAPABILITIES = [
  {
    icon: Globe,
    title: "Web Platforms",
    description: "Modern websites and scalable digital products built for growing businesses.",
  },
  {
    icon: Bot,
    title: "AI Solutions",
    description: "AI integrations, automation systems, and intelligent workflows.",
  },
  {
    icon: Zap,
    title: "Performance Focused",
    description: "Fast-loading, optimized systems designed for speed and scalability.",
  },
  {
    icon: Target,
    title: "Business Focused",
    description: "Built for startups, brands, and modern companies that want to grow online.",
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary">
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-bg opacity-100" />

      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#bef264]/20 blur-[150px] pointer-events-none" />

      <div className="section-container relative z-10 pt-32 pb-20">
        <div className="flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">
          {/* Headline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-4"
          >
            <motion.h1
              variants={itemVariants}
              className="font-sora font-extrabold text-5xl sm:text-6xl md:text-7xl text-[#0f172a] leading-[1.06] tracking-tight text-balance"
            >
              Build Digital Products{" "}
              <span className="gradient-text">That Help Businesses Grow</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-[#475569] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            >
              We design and engineer websites, platforms, and AI-powered tools for startups and growing businesses.
              Clean code. Thoughtful design. Delivered on time.
            </motion.p>

            {/* Clickable Direct Contacts below text */}
            <motion.div
              variants={itemVariants}
              suppressHydrationWarning
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#475569] bg-white border border-[#dde4ec] px-5 py-2.5 rounded-full shadow-sm max-w-fit mx-auto mt-2 hover:border-[#334155] transition-all duration-300"
            >
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s+/g, "")}`}
                suppressHydrationWarning
                className="flex items-center gap-2 hover:text-[#0f172a] transition-colors"
              >
                <span>📞</span>
                <span suppressHydrationWarning className="font-semibold text-[#0f172a]">{PHONE_NUMBER}</span>
              </a>
              <span className="text-[#dde4ec] hidden sm:inline">|</span>
              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                suppressHydrationWarning
                className="flex items-center gap-2 hover:text-[#0f172a] transition-colors"
              >
                <span>✉️</span>
                <span className="font-semibold underline underline-offset-4 text-[#0f172a]">{EMAIL_ADDRESS}</span>
              </a>
            </motion.div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="flex items-center justify-center w-full sm:w-auto"
          >
            <Button variant="primary" size="lg" href="/contact" className="w-auto px-8">
              Start Your Project
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mt-1"
          >
            {[
              "Mobile Responsive",
              "Modern UI/UX",
              "Fast Delivery",
              "Startup Friendly",
              "Secure Systems",
              "Custom Admin Dashboards",
            ].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white text-[#3f6212] border border-[#dde4ec] shadow-sm"
              >
                <span className="text-[#84cc16] font-bold text-xs">✓</span>
                {badge}
              </span>
            ))}
          </motion.div>

          {/* Four Focus Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl mt-12 text-left"
          >
            {CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon;
              const isSlate = i % 2 === 1;
              return (
                <motion.div
                  key={cap.title}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="card-v2 p-5 flex items-start gap-4 transition-all duration-300 group hover:border-[#334155]"
                >
                  {/* Glossy Icon Badge (.gem, 54px) alternating lime and slate */}
                  <div className={`gem ${isSlate ? "teal" : ""}`} aria-hidden="true">
                    <Icon />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-sora font-semibold text-[#0f172a] text-base tracking-wide">
                      {cap.title}
                    </h3>
                    <p className="text-[#475569] text-sm leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg-primary to-transparent pointer-events-none" />
    </section>
  );
}
