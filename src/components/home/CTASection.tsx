"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";


export default function CTASection() {
  return (
    <section className="relative py-20 sm:py-24 bg-white overflow-hidden border-t border-[#e2e8f0]">
      <div className="section-container relative z-10">
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#e2e8f0] bg-[#f8fafc] text-[#0f172a] text-xs font-semibold tracking-wider uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#7CFF4F] shadow-[0_0_8px_#7CFF4F]" />
            Let&apos;s Work Together
          </span>

          <h2 className="font-sora font-extrabold text-3xl sm:text-4xl lg:text-[44px] text-[#0f172a] leading-tight text-balance">
            Let&apos;s Build Your{" "}
            <span className="text-[#0f172a] relative inline-block">
              Next Project
              <span className="absolute bottom-1 left-0 right-0 h-2.5 bg-[#7CFF4F]/50 -z-10 rounded-full" />
            </span>
          </h2>

          <p className="text-[#475569] text-base sm:text-lg leading-relaxed max-w-lg">
            Tell us about your business goals. We will help you find the right website, app, or automation solution to save time and grow.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mt-2">
            <Button variant="primary" size="lg" href="/contact" className="w-full sm:w-auto px-8 py-3.5 font-bold shadow-[0_8px_20px_-6px_rgba(124,255,79,0.55)]">
              Let&apos;s Discuss a Solution →
            </Button>
          </div>

          {/* Exact Approved Consultation Supporting Text */}
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-xs text-[#64748b]">
            <span className="font-bold text-[#0f172a]">Your Free 30-Minute Consultation:</span>
            <span>Tell us what you need. Let&apos;s find the right solution.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
