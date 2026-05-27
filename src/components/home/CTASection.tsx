"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Send, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="relative py-20 bg-bg-secondary overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/25 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-blue-600/12 blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto flex flex-col items-center text-center gap-7"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-semibold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Let&apos;s Work Together
          </span>

          <h2 className="font-sora font-extrabold text-4xl md:text-5xl lg:text-6xl text-white leading-tight text-balance">
            Ready to Build Something{" "}
            <span className="gradient-text">That Works?</span>
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed">
            Drop your email and we&apos;ll get back to you to discuss your project.
            We usually respond within one business day.
          </p>

          {/* Email form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-5 py-3.5 rounded-xl text-white text-sm transition-all duration-200 focus:outline-none focus:border-blue-500/60 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.15)] hover:border-[rgba(255,255,255,0.16)] caret-blue-400"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-[0_0_25px_rgba(37,99,235,0.35)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] whitespace-nowrap"
              >
                <Send className="w-4 h-4" />
                Get In Touch
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 px-6 py-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400"
            >
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Thanks! We&apos;ll be in touch soon.</span>
            </motion.div>
          )}

          <div className="flex items-center gap-4 text-gray-600 text-sm">
            <div className="h-px w-12 bg-white/10" />
            <span>or</span>
            <div className="h-px w-12 bg-white/10" />
          </div>

          <Button variant="secondary" size="md" href="/contact">
            Send a Full Project Brief <ArrowRight className="w-4 h-4" />
          </Button>

          <p className="text-gray-600 text-sm">
            Flexible pricing for startups and growing businesses. No spam.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
