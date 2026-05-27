"use client";

import { motion } from "framer-motion";
import { Zap, Paintbrush, Code2, Headphones, Globe2, ShieldCheck } from "lucide-react";
import { WHY_CHOOSE_US } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap, Paintbrush, Code2, Headphones, Globe2, ShieldCheck,
};

export default function WhyChooseUs() {
  return (
    <section className="relative py-20 bg-bg-secondary overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full bg-blue-600/5 blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionHeading
          eyebrow="Why Work With Us"
          title="Honest. Capable. "
          highlight="Reliable."
          subtitle="We focus on building real things that work well — no over-promises, no bloated process."
          className="mb-14"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {WHY_CHOOSE_US.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Zap;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                whileHover={{ y: -3, transition: { duration: 0.18 } }}
                className="relative glass-card rounded-2xl p-6 border border-white/5 hover:border-blue-500/18 transition-all duration-300 group overflow-hidden"
              >
                {/* Watermark number */}
                <div className="absolute top-3 right-4 font-sora font-extrabold text-5xl text-white/3 leading-none select-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-gradient-to-br from-blue-600/7 to-transparent rounded-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-col gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-600/10 border border-blue-500/18 flex items-center justify-center group-hover:bg-blue-600/18 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-sora font-semibold text-white text-base mb-1.5">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
