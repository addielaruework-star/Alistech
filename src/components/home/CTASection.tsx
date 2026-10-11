"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";


export default function CTASection() {
  return (
    <section className="relative py-24 bg-bg-primary overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#dde4ec] to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-[#bef264]/20 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-100" />

      <div className="section-container relative z-10">
        <div
          className="rv max-w-2xl mx-auto flex flex-col items-center text-center gap-7"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#dde4ec] bg-white text-[#3f6212] text-xs font-semibold tracking-wider uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16] animate-pulse" />
            Let&apos;s Work Together
          </span>

          <h2 className="font-sora font-extrabold text-4xl md:text-5xl lg:text-6xl text-[#0f172a] leading-tight text-balance">
            Let&apos;s Build Your{" "}
            <span className="gradient-text">Next Project</span>
          </h2>

          <p className="text-[#475569] text-base sm:text-lg leading-relaxed max-w-lg">
            Let&apos;s discuss your business goals and design a high-converting digital experience. We usually respond within a few hours.
          </p>

          <div className="flex items-center justify-center w-full mt-3 px-4 sm:px-0">
            <Button variant="primary" size="lg" href="/contact" className="w-auto px-8">
              Get Free Consultation
            </Button>
          </div>

          <p className="text-[#475569] text-xs mt-3">
            Flexible pricing for startups and growing businesses. No obligation.
          </p>
        </div>
      </div>
    </section>
  );
}
