"use client";

import { motion } from "framer-motion";
import { Zap, Paintbrush, Code2, Headphones, Globe2, ShieldCheck } from "lucide-react";
import { WHY_CHOOSE_US } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Paintbrush,
  Code2,
  Headphones,
  Globe2,
  ShieldCheck,
};

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 bg-bg-secondary overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#dde4ec] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#dde4ec] to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full bg-[#bef264]/15 blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionHeading
          eyebrow="Why Work With Us"
          title="Honest. Capable. "
          highlight="Reliable."
          subtitle="We focus on building real things that work well — no over-promises, no bloated process."
          className="mb-14"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 perspective-grid">
          {WHY_CHOOSE_US.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Zap;
            const isSlate = i % 2 === 1;
            return (
              <div
                key={item.title}
                className="rv tilt relative card-v2 p-5 transition-all duration-300 group hover:border-[#334155] overflow-hidden"
                style={{ ['--rv-delay' as string]: `${(i % 4) * 80}ms` }}
              >
                {/* Watermark number */}
                <div
                  aria-hidden="true"
                  className="absolute top-3 right-4 font-sora font-extrabold text-5xl text-[#0f172a]/5 leading-none select-none pointer-events-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="relative z-10 flex flex-col gap-4">
                  <div className={`gem ${isSlate ? "teal" : ""}`} aria-hidden="true">
                    <Icon />
                  </div>
                  <div>
                    <h3 className="font-sora font-semibold text-[#0f172a] text-base mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-[#475569] text-sm leading-relaxed">{item.description}</p>
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
