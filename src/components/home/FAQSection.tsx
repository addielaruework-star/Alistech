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
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />
      {/* Ambient glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked "
          highlight="Questions"
          subtitle="Answers to common questions about working with AlisTech."
          className="mb-12"
        />

        <div className="max-w-2xl mx-auto flex flex-col gap-2.5">
          {FAQ_ITEMS.map((item, i) => {
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
                    className="flex-shrink-0 w-5 h-5 rounded-full border border-[rgba(255,255,255,0.10)] flex items-center justify-center"
                    style={{
                      background: isOpen
                        ? "rgba(37,99,235,0.20)"
                        : "rgba(255,255,255,0.04)",
                      borderColor: isOpen
                        ? "rgba(37,99,235,0.35)"
                        : "rgba(255,255,255,0.10)",
                    }}
                  >
                    <ChevronDown className="w-3 h-3 text-[rgba(255,255,255,0.55)]" />
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
                      <div className="px-5 pb-4 pt-0">
                        <div className="h-px bg-gradient-to-r from-blue-500/20 via-white/5 to-transparent mb-4" />
                        <p className="text-[rgba(255,255,255,0.50)] text-sm leading-relaxed">
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
          className="text-center text-[rgba(255,255,255,0.28)] text-xs mt-10"
        >
          Still have questions?{" "}
          <a
            href="/contact"
            className="text-blue-400 hover:text-blue-300 transition-colors duration-150 underline underline-offset-2 decoration-blue-500/30"
          >
            Reach out directly
          </a>{" "}
          — we&apos;re happy to help.
        </motion.p>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />
    </section>
  );
}
