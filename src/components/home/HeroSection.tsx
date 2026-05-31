"use client";

import { motion } from "framer-motion";
import { Globe, Bot, Zap, Target } from "lucide-react";
import Button from "@/components/ui/Button";

import { PHONE_NUMBER, EMAIL_ADDRESS, WHATSAPP_URL } from "@/lib/constants";

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

            {/* Clickable Direct Contacts below text */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-300 bg-white/[0.02] border border-white/[0.05] px-5 py-2.5 rounded-full backdrop-blur-md max-w-fit mx-auto mt-2 hover:border-blue-500/20 transition-all duration-300"
            >
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s+/g, "")}`}
                className="flex items-center gap-2 hover:text-blue-400 transition-colors"
              >
                <span>📞</span>
                <span className="font-semibold">{PHONE_NUMBER}</span>
              </a>
              <span className="text-white/10 hidden sm:inline">|</span>
              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                className="flex items-center gap-2 hover:text-blue-400 transition-colors"
              >
                <span>✉️</span>
                <span className="font-semibold underline underline-offset-4">{EMAIL_ADDRESS}</span>
              </a>
            </motion.div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
          >
            <Button variant="primary" size="lg" href="/contact" className="w-full sm:w-auto">
              Start Your Project
            </Button>
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 cursor-pointer whitespace-nowrap px-8 py-4 text-lg bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.05)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </motion.a>
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
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-blue-500/5 text-blue-300 border border-blue-500/10 shadow-[0_2px_10px_rgba(37,99,235,0.03)]"
              >
                <span className="text-emerald-400 font-bold text-xs">✓</span>
                {badge}
              </span>
            ))}
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
