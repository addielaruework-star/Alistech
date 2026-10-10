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
          <div className="hidden lg:block absolute top-[27px] left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-px pointer-events-none z-0">
            <div className="absolute inset-0 bg-[#dde4ec]" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.4, ease: "easeInOut" }}
              style={{ transformOrigin: "left center" }}
              className="absolute inset-0 bg-[#84cc16]"
            />
          </div>

          {PROCESS_STEPS.map((step, i) => {
            const Icon = ICONS[step.icon as IconKey] ?? Search;
            const isSlate = i % 2 === 1;
            return (
              <div
                key={step.number}
                className="rv group relative flex flex-col gap-4 z-10"
                style={{ ['--rv-delay' as string]: `${(i % 4) * 80}ms` }}
              >
                {/* Step icon badge (.gem, 54px) alternating lime and slate */}
                <div className="relative flex items-center">
                  <div className={`gem ${isSlate ? "teal" : ""}`} aria-hidden="true">
                    <Icon />
                  </div>
                  {/* Step number chip */}
                  <span className="absolute -top-1 left-10 w-6 h-6 rounded-full bg-[#0f172a] border border-white/20 flex items-center justify-center text-[10px] font-bold text-white tracking-tight shadow-sm">
                    {step.number}
                  </span>
                </div>

                {/* Card with new style */}
                <div className="tilt card-v2 p-5 flex-1 transition-all duration-300 group-hover:border-[#334155]">
                  <h3 className="font-sora font-bold text-[#0f172a] text-base mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[#475569] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
