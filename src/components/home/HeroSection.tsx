"use client";

import { motion } from "framer-motion";
import { Globe, Bot, Zap, Target } from "lucide-react";
import Button from "@/components/ui/Button";

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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-blue-600/5 blur-[160px] pointer-events-none" />

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
              className="font-sora font-extrabold text-5xl sm:text-6xl md:text-7xl text-white leading-[1.06] tracking-tight text-balance"
            >
              Build Digital Products{" "}
              <span className="gradient-text">That Help Businesses Grow</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            >
              We design and engineer websites, platforms, and AI-powered tools for startups and growing businesses.
              Clean code. Thoughtful design. Delivered on time.
            </motion.p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            <Button variant="primary" size="lg" href="/contact">
              Start a Project →
            </Button>
            <Button variant="secondary" size="lg" href="/portfolio">
              View Our Work
            </Button>
          </motion.div>

          {/* New Capabilities Grid (Agency Capability Showcase) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl mt-12 text-left"
          >
            {CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="relative group rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md p-6 hover:border-blue-500/20 transition-all duration-300 overflow-hidden"
                >
                  {/* Subtle inner hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-600/[0.03] to-transparent rounded-2xl pointer-events-none" />

                  <div className="flex items-start gap-4">
                    {/* Minimal Icon Container */}
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/15 group-hover:border-blue-500/30 transition-all duration-300">
                      <Icon className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-sora font-semibold text-white text-base tracking-wide">
                        {cap.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {cap.description}
                      </p>
                    </div>
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
