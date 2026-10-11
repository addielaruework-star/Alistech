"use client";

import { motion } from "framer-motion";
import { TECHNOLOGIES } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";

export default function TechStackSection() {
  return (
    <section className="relative py-24 bg-bg-secondary overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#dde4ec] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#dde4ec] to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[250px] rounded-full bg-[#bef264]/15 blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionHeading
          eyebrow="Our Stack"
          title="AI &amp; Development "
          highlight="Stack"
          subtitle="From frontend interfaces to AI integrations and cloud infrastructure — we build across the full product layer."
          className="mb-12"
        />

        <div className="flex flex-wrap justify-center gap-3">
          {TECHNOLOGIES.map((tech, i) => {
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                whileHover={{ y: -2, transition: { duration: 0.15 } }}
                className="rounded-2xl border border-[#dde4ec] bg-white px-5 py-3.5 flex flex-col items-center gap-1 min-w-[130px] shadow-sm hover:border-[#334155] transition-all duration-200"
              >
                <span className="font-sora font-semibold text-sm text-[#0f172a]">{tech.name}</span>
                <span className="text-xs font-medium text-[#475569]">{tech.category}</span>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-[#64748b] text-xs mt-10 max-w-lg mx-auto leading-relaxed"
        >
          Every project uses the right tools for the job — not the most fashionable ones. We prioritize
          stability, maintainability, and long-term performance.
        </motion.p>
      </div>
    </section>
  );
}
