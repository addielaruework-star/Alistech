"use client";

import { motion } from "framer-motion";
import { Search, Layers, Code2, Rocket } from "lucide-react";
import { PROCESS_STEPS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";

const ICONS = { Search, Layers, Code2, Rocket } as const;
type IconKey = keyof typeof ICONS;

export default function ProcessSection() {
  return (
    <section className="relative py-24 bg-bg-primary overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-blue-600/5 blur-[130px] pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionHeading
          eyebrow="How We Work"
          title="A Simple, Transparent "
          highlight="Process"
          subtitle="From idea to launch — a clear, collaborative workflow designed to move your project forward efficiently."
          className="mb-16"
        />

        {/* Steps grid */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-px pointer-events-none z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/6 to-transparent" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.4, ease: "easeInOut" }}
              style={{ transformOrigin: "left center" }}
              className="absolute inset-0 bg-gradient-to-r from-blue-500/40 via-blue-400/25 to-blue-500/40"
            />
          </div>

          {PROCESS_STEPS.map((step, i) => {
            const Icon = ICONS[step.icon as IconKey] ?? Search;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.52, delay: i * 0.12 }}
                className="group relative flex flex-col gap-5 z-10"
              >
                {/* Step number badge */}
                <div className="relative flex items-center justify-center w-[52px] h-[52px] rounded-2xl border border-blue-500/30 bg-blue-600/10 group-hover:bg-blue-600/16 group-hover:border-blue-500/50 transition-all duration-300 shadow-[0_0_18px_rgba(37,99,235,0.12)]">
                  <Icon className="w-5 h-5 text-blue-400" />
                  {/* Step number chip */}
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-blue-600 border border-blue-400/30 flex items-center justify-center text-[9px] font-bold text-white tracking-tight">
                    {step.number}
                  </span>
                </div>

                {/* Card */}
                <div
                  className="flex-1 rounded-2xl p-5 border border-[rgba(255,255,255,0.06)] group-hover:border-blue-500/20 transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    boxShadow: "0 1px 0 rgba(255,255,255,0.05) inset",
                  }}
                >
                  <h3 className="font-sora font-bold text-white text-base mb-2 group-hover:text-blue-100 transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="text-[rgba(255,255,255,0.42)] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
