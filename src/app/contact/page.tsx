"use client";

import { useState, useEffect, useCallback } from "react";
import { submitLead, validateLead, type LeadFieldErrors } from "@/lib/firestore";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MessageCircle,
  Clock,
  Globe,
  ChevronDown,
  CheckCircle,
  ArrowRight,
  Phone,
} from "lucide-react";
import { WHATSAPP_URL, WHO_WE_WORK_WITH, PHONE_NUMBER, EMAIL_ADDRESS } from "@/lib/constants";

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Phone",
    value: PHONE_NUMBER,
    href: `tel:${PHONE_NUMBER.replace(/\s+/g, "")}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: EMAIL_ADDRESS,
    href: `mailto:${EMAIL_ADDRESS}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Direct Chat",
    href: WHATSAPP_URL,
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Usually responds within a few hours",
    href: "#",
  },
];

const PROJECT_TYPES = [
  "Website Development",
  "Portfolio Website",
  "CMS / Admin System",
  "AI & Automation",
  "Platform / SaaS",
  "Other",
];

const INITIAL_FORM = {
  name: "",
  email: "",
  whatsapp: "",
  projectType: "",
  message: "",
};

/* ── Shared field styles ─────────────────────────────────────────────────── */
const fieldBase =
  "w-full px-4 py-3 rounded-xl text-sm text-[#0f172a] " +
  "bg-white " +
  "border border-[#dde4ec] " +
  "placeholder:text-[#94a3b8] " +
  "caret-[#84cc16] " +
  "transition-all duration-200 " +
  "focus:outline-none " +
  "focus:border-[#334155] " +
  "focus:bg-white " +
  "focus:shadow-[0_0_0_4px_rgba(132,204,22,0.18)] " +
  "hover:border-[#334155]";

const fieldError =
  "border-red-500/50 focus:border-red-500/70 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.12)]";

const labelBase =
  "block text-[10.5px] font-semibold uppercase tracking-widest " +
  "text-[#475569] mb-1.5";

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function ContactPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<LeadFieldErrors>({});

  /* Clear individual field error on change */
  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setForm((f) => ({ ...f, [name]: value }));
      setFieldErrors((prev) => {
        if (!prev[name as keyof typeof prev]) return prev;
        const next = { ...prev };
        delete next[name as keyof typeof next];
        return next;
      });
    },
    []
  );

  /* Auto-hide success after 8 seconds */
  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => {
      setSubmitted(false);
      setForm(INITIAL_FORM);
    }, 8000);
    return () => clearTimeout(timer);
  }, [submitted]);

  /* Submit handler */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    const errors = validateLead(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    setError(null);
    setFieldErrors({});

    try {
      await submitLead(form);
      setSubmitted(true);
      setForm(INITIAL_FORM);
    } catch (err) {
      console.error("Firestore write failed:", err);
      setError(
        "Something went wrong sending your message. Please try again or reach us on WhatsApp."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-10 bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-100" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[340px] rounded-full bg-[#bef264]/15 blur-[110px] pointer-events-none" />

        <div className="relative z-10 max-w-[860px] mx-auto px-6 text-center">
          {/* Eyebrow pill */}
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-7 rounded-full border border-[#dde4ec] bg-white text-[#3f6212] text-xs font-semibold tracking-widest uppercase shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16]" />
            Get In Touch
          </motion.span>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-sora font-extrabold text-4xl md:text-5xl text-[#0f172a] leading-tight tracking-tight mb-4"
          >
            Let&apos;s Build Something{" "}
            <span className="gradient-text">Great</span>
          </motion.h1>

          {/* Supporting line */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-[#475569] text-base leading-relaxed max-w-xl mx-auto"
          >
            We work with startups, businesses, and creators building modern
            digital products.
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-bg-primary to-transparent" />
      </section>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <section className="py-10 pb-28 bg-bg-primary">
        <div className="max-w-[860px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            {/* ── Left — info sidebar ─────────────────────────────────── */}
            <div className="lg:col-span-2 flex flex-col gap-5 lg:sticky lg:top-28">
              <div>
                <h2 className="font-sora font-semibold text-[#0f172a] text-base mb-1.5">
                  Contact Information
                </h2>
                <p className="text-[#475569] text-sm leading-relaxed">
                  We&apos;re fully remote. Drop us a message and we&apos;ll
                  respond within one business day.
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                {CONTACT_INFO.map(({ icon: Icon, label, value, href }, i) => {
                  const isSlate = i % 2 === 1;
                  return (
                    <motion.a
                      key={label}
                      href={href}
                      initial={{ opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.32, delay: i * 0.06 }}
                      className="flex items-center gap-3.5 p-3.5 rounded-2xl border border-[#dde4ec] bg-white hover:border-[#334155] shadow-sm transition-all duration-200 group"
                    >
                      <div className={`gem ${isSlate ? "teal" : ""}`} style={{ width: 42, height: 42 }} aria-hidden="true">
                        <Icon style={{ width: 20, height: 20 }} />
                      </div>
                      <div>
                        <div className="text-[9.5px] text-[#64748b] uppercase tracking-widest mb-0.5 font-semibold">
                          {label}
                        </div>
                        <div className="text-[#0f172a] text-xs font-semibold leading-snug">
                          {value}
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              {/* Who we work with */}
              <div className="rounded-2xl p-5 border border-[#dde4ec] bg-white shadow-sm">
                <h3 className="font-sora font-semibold text-[#0f172a] mb-3 flex items-center gap-2 text-xs">
                  <Globe className="w-3.5 h-3.5 text-[#3f6212]" />
                  We Work With
                </h3>
                <ul className="flex flex-col gap-2 list-none p-0">
                  {WHO_WE_WORK_WITH.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-[#475569] text-xs font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── Right — form card ───────────────────────────────────── */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.48 }}
                className="card-v2 overflow-hidden"
              >
                {/* Card header */}
                <div className="px-7 pt-6 pb-5 border-b border-[#dde4ec]">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-[#84cc16]" />
                    <h2 className="font-sora font-bold text-[#0f172a] text-lg">
                      Tell Us About Your Project
                    </h2>
                  </div>
                  <p className="text-[#64748b] text-xs leading-relaxed pl-4">
                    Fields marked * are required. Every message is read
                    personally.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.28 }}
                      className="px-7 py-6"
                    >
                      <form
                        onSubmit={handleSubmit}
                        noValidate
                        className="flex flex-col gap-4"
                      >
                        {/* Row 1 — Name + Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className={labelBase}>Name *</label>
                            <input
                              name="name"
                              value={form.name}
                              onChange={handleChange}
                              placeholder="Your full name"
                              autoComplete="name"
                              className={`${fieldBase} ${fieldErrors.name ? fieldError : ""}`}
                            />
                            {fieldErrors.name && (
                              <motion.p
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-500 text-[11px] mt-1.5 pl-1"
                              >
                                {fieldErrors.name}
                              </motion.p>
                            )}
                          </div>
                          <div>
                            <label className={labelBase}>Email *</label>
                            <input
                              name="email"
                              type="email"
                              value={form.email}
                              onChange={handleChange}
                              placeholder="your@email.com"
                              autoComplete="email"
                              className={`${fieldBase} ${fieldErrors.email ? fieldError : ""}`}
                            />
                            {fieldErrors.email && (
                              <motion.p
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-500 text-[11px] mt-1.5 pl-1"
                              >
                                {fieldErrors.email}
                              </motion.p>
                            )}
                          </div>
                        </div>

                        {/* Row 2 — WhatsApp + Project Type */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className={labelBase}>WhatsApp</label>
                            <input
                              name="whatsapp"
                              value={form.whatsapp}
                              onChange={handleChange}
                              placeholder="+91 96033 37862"
                              autoComplete="tel"
                              className={fieldBase}
                            />
                          </div>
                          <div>
                            <label className={labelBase}>Project Type</label>
                            <div className="relative">
                              <select
                                name="projectType"
                                value={form.projectType}
                                onChange={handleChange}
                                className={
                                  fieldBase +
                                  " appearance-none cursor-pointer pr-9 " +
                                  (form.projectType === ""
                                    ? "text-[#94a3b8]"
                                    : "text-[#0f172a]")
                                }
                              >
                                <option value="" disabled>
                                  Select type…
                                </option>
                                {PROJECT_TYPES.map((t) => (
                                  <option
                                    key={t}
                                    value={t}
                                    style={{
                                      background: "#ffffff",
                                      color: "#0f172a",
                                    }}
                                  >
                                    {t}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
                            </div>
                          </div>
                        </div>

                        {/* Message */}
                        <div>
                          <label className={labelBase}>Message *</label>
                          <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Tell us about your project — what you need, your goals, and any timeline…"
                            className={`${fieldBase} resize-none leading-relaxed ${fieldErrors.message ? fieldError : ""}`}
                          />
                          {fieldErrors.message && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-500 text-[11px] mt-1.5 pl-1"
                            >
                              {fieldErrors.message}
                            </motion.p>
                          )}
                        </div>

                        {/* Error banner */}
                        <AnimatePresence>
                          {error && (
                            <motion.div
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              className="flex items-start gap-3 px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/8 text-red-600 text-xs leading-relaxed"
                            >
                              <span className="mt-0.5 w-3.5 h-3.5 flex-shrink-0 rounded-full border border-red-500 flex items-center justify-center text-[9px] font-bold">!</span>
                              {error}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Primary CTA */}
                        <motion.button
                          type="submit"
                          whileHover={{ scale: loading ? 1 : 1.01 }}
                          whileTap={{ scale: loading ? 1 : 0.99 }}
                          disabled={loading}
                          className="w-full py-3.5 rounded-full font-bold text-sm text-[#1a2e05] flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-55 disabled:cursor-not-allowed mt-1 bg-gradient-to-r from-[#bef264] to-[#84cc16] shadow-[0_12px_28px_-12px_rgba(132,204,22,0.7)] hover:shadow-[0_16px_32px_-12px_rgba(132,204,22,0.85)]"
                        >
                          {loading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-[#1a2e05]/30 border-t-[#1a2e05] rounded-full animate-spin" />
                              Sending…
                            </>
                          ) : (
                            <>
                              <ArrowRight className="w-4 h-4" />
                              Discuss Your Project
                            </>
                          )}
                        </motion.button>

                        {/* WhatsApp secondary CTA */}
                        <p className="text-center text-xs text-[#64748b] leading-relaxed">
                          Prefer WhatsApp?{" "}
                          <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#3f6212] font-semibold underline underline-offset-2 hover:text-[#1a2e05] transition-all duration-200"
                          >
                            Chat with us directly.
                          </a>
                        </p>

                        <p className="text-[#94a3b8] text-[11px] text-center">
                          No spam — ever. We take your privacy seriously.
                        </p>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="px-7 py-16 flex flex-col items-center text-center gap-5"
                    >
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay: 0.14,
                          type: "spring",
                          stiffness: 210,
                        }}
                        className="w-14 h-14 rounded-full bg-[#ecfccb] border border-[#bef264] flex items-center justify-center"
                      >
                        <CheckCircle className="w-7 h-7 text-[#3f6212]" />
                      </motion.div>
                      <div>
                        <h3 className="font-sora font-bold text-[#0f172a] text-lg mb-1.5">
                          Message Received
                        </h3>
                        <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto">
                          We&apos;ll review your project details and follow up
                          personally within one business day.
                        </p>
                      </div>

                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        onClick={() => {
                          setSubmitted(false);
                          setForm(INITIAL_FORM);
                        }}
                        className="text-xs text-[#3f6212] font-semibold hover:underline underline-offset-2 transition-all duration-200 mt-1"
                      >
                        Send another message
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
