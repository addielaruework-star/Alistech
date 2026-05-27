"use client";

import { motion } from "framer-motion";
import { VALUE_CARDS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import { Code2, Bot, Zap, ShieldCheck } from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2, Bot, Zap, ShieldCheck,
};

export default function AboutSection() {
  return (
    <section className="relative py-20 bg-bg-primary overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-blue-600/5 blur-[100px] pointer-events-none" />

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

            <div className="flex flex-col gap-4 text-gray-400 text-base leading-relaxed">
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

            {/* Built With Purpose — no icon, clean text block */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-2 rounded-2xl p-6 border border-blue-500/15 bg-blue-600/5 relative overflow-hidden"
            >
              {/* Subtle glow accent */}
              <div className="absolute top-0 left-0 w-32 h-px bg-gradient-to-r from-blue-500/50 to-transparent" />
              <h3 className="font-sora font-bold text-white text-base mb-2">Built With Purpose</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Founded by a small team of developers and designers focused on building modern digital
                experiences that help businesses grow online.
              </p>
            </motion.div>
          </div>

          {/* Right — engineering pillars */}
          <div className="grid grid-cols-2 gap-4">
            {VALUE_CARDS.map(({ icon, title, description }, i) => {
              const Icon = ICON_MAP[icon] ?? Code2;
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="glass-card rounded-xl p-5 flex flex-col gap-3 border border-white/5 hover:border-blue-500/18 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/18 flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <div className="font-sora font-semibold text-white text-sm">{title}</div>
                  <p className="text-gray-500 text-xs leading-relaxed">{description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
