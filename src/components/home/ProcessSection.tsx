"use client";

import { motion } from "framer-motion";
import { MessageSquare, FileCheck, Code2, Rocket } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const WORK_STEPS = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Discovery & Free Chat",
    description:
      "We listen to your business goals, review your everyday workflow, and pinpoint the exact website, app, or automation you need.",
  },
  {
    number: "02",
    icon: FileCheck,
    title: "Simple Plan & Scope",
    description:
      "We outline a clear roadmap, delivery timeline, and transparent pricing before any work begins. No technical confusion, no surprise fees.",
  },
  {
    number: "03",
    icon: Code2,
    title: "Design & Development",
    description:
      "We build your software with modern, fast tools, sharing regular live demos so you can see your product coming to life step by step.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Smooth Launch & Support",
    description:
      "We test everything thoroughly, help you go live with confidence, and provide reliable ongoing support so your business never stops.",
  },
];

export default function ProcessSection() {
  return (
    <section id="how-we-work" className="relative py-20 sm:py-24 bg-white overflow-hidden border-b border-[#e2e8f0]">
      <div className="section-container relative z-10">
        <SectionHeading
          eyebrow="How We Work"
          title="A Simple, Transparent "
          highlight="4-Step Process"
          subtitle="From your initial idea to a working digital product — a clear, collaborative journey with no surprises."
          className="mb-14 sm:mb-16"
        />

        {/* Steps grid */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-[24px] left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-px pointer-events-none z-0">
            <div className="absolute inset-0 bg-[#e2e8f0]" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.4, ease: "easeInOut" }}
              style={{ transformOrigin: "left center" }}
              className="absolute inset-0 bg-[#7CFF4F]"
            />
          </div>

          {WORK_STEPS.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative flex flex-col gap-4 z-10"
              >
                {/* Step icon badge and number chip */}
                <div className="relative flex items-center">
                  <div className="w-12 h-12 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] group-hover:bg-[#ecfccb] group-hover:border-[#7CFF4F]/60 flex items-center justify-center text-[#0f172a] group-hover:text-[#2d6a0a] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  {/* Step number chip */}
                  <span className="absolute -top-1 left-9 w-6 h-6 rounded-full bg-[#0f172a] border border-[#7CFF4F]/50 flex items-center justify-center text-[10px] font-bold text-[#7CFF4F] tracking-tight shadow-sm">
                    {step.number}
                  </span>
                </div>

                {/* Card with clean white style */}
                <div className="p-6 rounded-2xl bg-white border border-[#e2e8f0] hover:border-[#7CFF4F] hover:shadow-[0_12px_32px_-12px_rgba(15,23,42,0.1)] transition-all duration-300 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-sora font-bold text-[#0f172a] text-base sm:text-lg mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[#475569] text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
