"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { WHATSAPP_URL } from "@/lib/constants";

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

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center mt-3 px-4 sm:px-0">
            <Button variant="primary" size="lg" href="/contact" className="w-full sm:w-auto">
              Get Free Consultation
            </Button>
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap px-8 py-4 text-base bg-[#0f172a] hover:bg-[#1e293b] text-white shadow-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </motion.a>
          </div>

          <p className="text-[#475569] text-xs mt-3">
            Flexible pricing for startups and growing businesses. No obligation.
          </p>
        </div>
      </div>
    </section>
  );
}
