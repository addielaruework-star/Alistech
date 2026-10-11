"use client";

import { motion } from "framer-motion";
import { VALUE_CARDS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import { Code2, Bot, Zap, ShieldCheck } from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Bot,
  Zap,
  ShieldCheck,
};

export default function AboutSection() {
  return (
    <section className="relative py-20 bg-bg-primary overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#bef264]/20 blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Left — text */}
          <div className="flex flex-col gap-7">
            <SectionHeading
              eyebrow="About AlisTech"
              title="A Software Studio Focused on "
              highlight="Real Results"
              align="left"
            />

            <div className="flex flex-col gap-4 text-[#475569] text-base leading-relaxed">
              <p>
                AlisTech is a remote-first software and AI development studio. We work with startups,
                local businesses, and founders who need a reliable technical team to build and ship
                their digital products.
              </p>
              <p>
                We handle everything from architecture and design to development and deployment —
                with clean code, honest timelines, and direct communication throughout.
              </p>
            </div>

            {/* Built With Purpose — card style from reference, no icon */}
            <div
              className="rv mt-2 card-v2 p-5 relative overflow-hidden"
            >
              <h3 className="font-sora font-bold text-[#0f172a] text-base mb-2">Built With Purpose</h3>
              <p className="text-[#475569] text-sm leading-relaxed">
                Founded by a small team of developers and designers focused on building modern digital
                experiences that help businesses grow online.
              </p>
            </div>
          </div>

          {/* Right — engineering pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 perspective-grid">
            {VALUE_CARDS.map(({ icon, title, description }, i) => {
              const Icon = ICON_MAP[icon] ?? Code2;
              const isSlate = i % 2 === 1;
              return (
                <div
                  key={title}
                  className="rv tilt card-v2 p-5 flex flex-col gap-3 hover:border-[#334155] transition-all duration-300"
                  style={{ ['--rv-delay' as string]: `${(i % 4) * 80}ms` }}
                >
                  <div className={`gem ${isSlate ? "teal" : ""}`} aria-hidden="true">
                    <Icon />
                  </div>
                  <div className="font-sora font-semibold text-[#0f172a] text-sm">{title}</div>
                  <p className="text-[#475569] text-xs leading-relaxed">{description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
