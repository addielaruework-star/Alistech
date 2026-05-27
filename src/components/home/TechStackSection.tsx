"use client";

import { motion } from "framer-motion";
import { TECHNOLOGIES } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";

// Color accent per category
const CATEGORY_COLORS: Record<string, string> = {
  Intelligence: "text-purple-400 border-purple-500/25 bg-purple-500/8",
  Language: "text-cyan-400 border-cyan-500/25 bg-cyan-500/8",
  Framework: "text-blue-400 border-blue-500/25 bg-blue-500/8",
  "UI Library": "text-blue-400 border-blue-500/20 bg-blue-500/6",
  Runtime: "text-green-400 border-green-500/25 bg-green-500/8",
  Backend: "text-orange-400 border-orange-500/25 bg-orange-500/8",
  Workflow: "text-yellow-400 border-yellow-500/25 bg-yellow-500/8",
  Connectivity: "text-teal-400 border-teal-500/25 bg-teal-500/8",
  Deployment: "text-indigo-400 border-indigo-500/25 bg-indigo-500/8",
};

export default function TechStackSection() {
  return (
    <section className="relative py-20 bg-bg-primary overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[250px] rounded-full bg-blue-600/5 blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionHeading
          eyebrow="Our Stack"
          title="AI & Development "
          highlight="Stack"
          subtitle="From frontend interfaces to AI integrations and cloud infrastructure — we build across the full product layer."
          className="mb-12"
        />

        <div className="flex flex-wrap justify-center gap-3">
          {TECHNOLOGIES.map((tech, i) => {
            const colorClass = CATEGORY_COLORS[tech.category] ?? "text-gray-400 border-white/8 bg-white/3";
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                whileHover={{ y: -2, transition: { duration: 0.15 } }}
                className={`rounded-xl border px-4 py-3 flex flex-col items-center gap-1 min-w-[120px] transition-all duration-200 ${colorClass}`}
              >
                <span className="font-sora font-semibold text-sm">{tech.name}</span>
                <span className="text-xs opacity-60">{tech.category}</span>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-gray-600 text-xs mt-10 max-w-lg mx-auto"
        >
          Every project uses the right tools for the job — not the most fashionable ones. We prioritize
          stability, maintainability, and long-term performance.
        </motion.p>
      </div>
    </section>
  );
}
