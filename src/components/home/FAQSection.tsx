"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="relative py-24 bg-bg-secondary overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#dde4ec] to-transparent" />

      <div className="section-container relative z-10">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked "
          highlight="Questions"
          subtitle="Answers to common questions about working with AlisTech."
          className="mb-12"
        />

        <div className="max-w-2xl mx-auto flex flex-col gap-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="rounded-2xl border transition-colors duration-200 overflow-hidden shadow-sm"
                style={{
                  borderColor: isOpen ? "#334155" : "#dde4ec",
                  background: isOpen ? "#ffffff" : "#ffffff",
                }}
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="font-sora font-semibold text-base text-[#0f172a] group-hover:text-[#334155] transition-colors duration-150 leading-snug">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    className="flex-shrink-0 w-6 h-6 rounded-full border border-[#dde4ec] flex items-center justify-center bg-[#eef2f6]"
                  >
                    <ChevronDown className="w-3.5 h-3.5 text-[#334155]" />
                  </motion.div>
                </button>

                {/* Answer — animated */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.26, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-0">
                        <div className="h-px bg-[#dde4ec] mb-4" />
                        <p className="text-[#475569] text-sm leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom nudge */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-[#64748b] text-xs mt-10"
        >
          Still have questions?{" "}
          <a
            href="/contact"
            className="text-[#3f6212] font-semibold hover:underline transition-colors duration-150"
          >
            Reach out directly
          </a>{" "}
          — we&apos;re happy to help.
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#dde4ec] to-transparent" />
    </section>
  );
}
