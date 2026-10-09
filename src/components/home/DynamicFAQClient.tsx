"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { type FAQItem } from "@/types/site-content";

interface DynamicFAQClientProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  items?: FAQItem[];
  visible?: boolean;
}

export default function DynamicFAQClient({
  eyebrow = "FAQ",
  title = "Frequently Asked ",
  highlight = "Questions",
  subtitle = "Answers to common questions about working with AlisTech.",
  items = [],
  visible = true,
}: DynamicFAQClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (visible === false || !items || items.length === 0) {
    return null;
  }

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="relative py-24 bg-bg-secondary overflow-hidden">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />
      {/* Ambient glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          highlight={highlight}
          subtitle={subtitle}
          className="mb-12"
        />

        <div className="max-w-2xl mx-auto flex flex-col gap-2.5">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="rounded-xl border overflow-hidden transition-colors duration-200"
                style={{
                  borderColor: isOpen
                    ? "rgba(37,99,235,0.30)"
                    : "rgba(255,255,255,0.06)",
                  background: isOpen
                    ? "linear-gradient(135deg, rgba(37,99,235,0.06) 0%, rgba(255,255,255,0.025) 100%)"
                    : "rgba(255,255,255,0.025)",
                }}
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="font-sora font-semibold text-sm text-white group-hover:text-blue-100 transition-colors duration-150 leading-snug">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-white/30 group-hover:text-white/60 transition-colors"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                {/* Answer row */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-sm text-gray-400 leading-relaxed border-t border-white/[0.04] whitespace-pre-wrap">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
