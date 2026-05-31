"use client";

import { useState, useEffect, useCallback } from "react";
import { submitLead, validateLead, type LeadFieldErrors } from "@/lib/firestore";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Globe,
  ChevronDown,
  CheckCircle,
  ArrowRight,
  Phone,
} from "lucide-react";
import { WHATSAPP_URL, WHO_WE_WORK_WITH, PHONE_NUMBER, EMAIL_ADDRESS, WHATSAPP_QR_URL } from "@/lib/constants";

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
  "w-full px-4 py-3 rounded-xl text-sm text-white " +
  "bg-[rgba(255,255,255,0.05)] " +
  "border border-[rgba(255,255,255,0.08)] " +
  "placeholder:text-[rgba(255,255,255,0.30)] " +
  "caret-blue-400 " +
  "transition-all duration-200 " +
  "focus:outline-none " +
  "focus:border-blue-500/60 " +
  "focus:bg-[rgba(255,255,255,0.07)] " +
  "focus:shadow-[0_0_0_4px_rgba(37,99,235,0.14)] " +
  "hover:border-[rgba(255,255,255,0.15)]";

const fieldError =
  "border-red-500/50 focus:border-red-500/70 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.12)]";

const labelBase =
  "block text-[10.5px] font-semibold uppercase tracking-widest " +
  "text-[rgba(255,255,255,0.40)] mb-1.5";

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

    /* Prevent duplicate clicks */
    if (loading) return;

    /* Client-side validation */
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
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[340px] rounded-full bg-blue-600/8 blur-[110px] pointer-events-none" />

        <div className="relative z-10 max-w-[860px] mx-auto px-6 text-center">
          {/* Eyebrow pill */}
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-7 rounded-full border border-blue-500/25 bg-blue-500/8 text-blue-400 text-xs font-semibold tracking-widest uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Get In Touch
          </motion.span>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-sora font-extrabold text-4xl md:text-5xl text-white leading-tight tracking-tight mb-4"
          >
            Let&apos;s Build Something{" "}
            <span className="gradient-text">Great</span>
          </motion.h1>

          {/* Supporting line */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-[rgba(255,255,255,0.48)] text-base leading-relaxed max-w-xl mx-auto"
          >
            We work with startups, businesses, and creators building modern
            digital products.
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-bg-primary to-transparent" />
      </section>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <section className="py-10 pb-28 bg-bg-primary">
        {/* Constrained to 860px, centered */}
        <div className="max-w-[860px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

            {/* ── Left — info sidebar ─────────────────────────────────── */}
            <div className="lg:col-span-2 flex flex-col gap-5 lg:sticky lg:top-28">
              <div>
                <h2 className="font-sora font-semibold text-white text-base mb-1.5">
                  Contact Information
                </h2>
                <p className="text-[rgba(255,255,255,0.42)] text-sm leading-relaxed">
                  We&apos;re fully remote. Drop us a message and we&apos;ll
                  respond within one business day.
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                {CONTACT_INFO.map(({ icon: Icon, label, value, href }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.32, delay: i * 0.06 }}
                    className="flex items-center gap-3.5 p-3.5 rounded-xl border border-white/5 bg-[rgba(255,255,255,0.025)] hover:border-blue-500/20 hover:bg-[rgba(37,99,235,0.045)] transition-all duration-250 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/18 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/18 transition-colors">
                      <Icon className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-[9.5px] text-[rgba(255,255,255,0.35)] uppercase tracking-widest mb-0.5 font-semibold">
                        {label}
                      </div>
                      <div className="text-white text-xs font-medium leading-snug">
                        {value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Who we work with */}
              <div className="rounded-xl p-4 border border-white/5 bg-[rgba(255,255,255,0.025)]">
                <h3 className="font-sora font-semibold text-white mb-3 flex items-center gap-2 text-xs">
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  We Work With
                </h3>
                <ul className="flex flex-col gap-2">
                  {WHO_WE_WORK_WITH.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-[rgba(255,255,255,0.42)] text-xs"
                    >
                      <span className="w-1 h-1 rounded-full bg-blue-500/60 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* WhatsApp Direct Scan QR Code */}
              <div className="rounded-xl p-4 border border-emerald-500/10 bg-emerald-500/[0.01] flex flex-col items-center gap-3 text-center">
                <div className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                  Scan to Chat on WhatsApp
                </div>
                <div className="relative p-2 bg-white rounded-lg flex items-center justify-center w-28 h-28">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(WHATSAPP_QR_URL)}`}
                    alt="WhatsApp QR Code"
                    className="w-24 h-24"
                    loading="lazy"
                  />
                </div>
                <p className="text-[9.5px] text-[rgba(255,255,255,0.35)] leading-relaxed">
                  Scan with your phone camera to start chatting instantly.
                </p>
              </div>
            </div>

            {/* ── Right — form card ───────────────────────────────────── */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.48 }}
                className="rounded-2xl border border-[rgba(255,255,255,0.07)] overflow-hidden"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.048) 0%, rgba(255,255,255,0.018) 100%)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  boxShadow:
                    "0 1px 0 rgba(255,255,255,0.07) inset, 0 24px 56px rgba(0,0,0,0.30)",
                }}
              >
                {/* Card header */}
                <div className="px-7 pt-6 pb-5 border-b border-[rgba(255,255,255,0.05)]">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <h2 className="font-sora font-bold text-white text-base">
                      Tell Us About Your Project
                    </h2>
                  </div>
                  <p className="text-[rgba(255,255,255,0.35)] text-xs leading-relaxed pl-3.5">
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
                                className="text-red-400 text-[11px] mt-1.5 pl-1"
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
                                className="text-red-400 text-[11px] mt-1.5 pl-1"
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
                              placeholder="+1 234 567 8900"
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
                                    ? "text-[rgba(255,255,255,0.30)]"
                                    : "text-white")
                                }
                                style={{ colorScheme: "dark" }}
                              >
                                <option value="" disabled>
                                  Select type…
                                </option>
                                {PROJECT_TYPES.map((t) => (
                                  <option
                                    key={t}
                                    value={t}
                                    style={{
                                      background: "#0f172a",
                                      color: "#fff",
                                    }}
                                  >
                                    {t}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[rgba(255,255,255,0.30)]" />
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
                              className="text-red-400 text-[11px] mt-1.5 pl-1"
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
                              className="flex items-start gap-3 px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/8 text-red-400 text-xs leading-relaxed"
                            >
                              <span className="mt-0.5 w-3.5 h-3.5 flex-shrink-0 rounded-full border border-red-400/60 flex items-center justify-center text-[9px] font-bold">!</span>
                              {error}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Primary CTA */}
                        <motion.button
                          type="submit"
                          whileHover={{ scale: loading ? 1 : 1.006 }}
                          whileTap={{ scale: loading ? 1 : 0.996 }}
                          disabled={loading}
                          className="w-full py-3.5 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-55 disabled:cursor-not-allowed mt-1"
                          style={{
                            background:
                              "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                            boxShadow:
                              "0 0 22px rgba(37,99,235,0.28), 0 1px 0 rgba(255,255,255,0.10) inset",
                          }}
                          onMouseEnter={(e) => {
                            if (!loading)
                              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                                "0 0 34px rgba(37,99,235,0.46), 0 1px 0 rgba(255,255,255,0.10) inset";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.boxShadow =
                              "0 0 22px rgba(37,99,235,0.28), 0 1px 0 rgba(255,255,255,0.10) inset";
                          }}
                        >
                          {loading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
                        <p className="text-center text-xs text-[rgba(255,255,255,0.30)] leading-relaxed">
                          Prefer WhatsApp?{" "}
                          <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[rgba(255,255,255,0.48)] underline underline-offset-2 decoration-[rgba(255,255,255,0.20)] hover:text-[rgba(255,255,255,0.72)] hover:decoration-[rgba(255,255,255,0.40)] transition-all duration-200"
                          >
                            Chat with us directly.
                          </a>
                        </p>

                        <p className="text-[rgba(255,255,255,0.20)] text-[11px] text-center">
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
                        className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/28 flex items-center justify-center"
                      >
                        <CheckCircle className="w-7 h-7 text-green-400" />
                      </motion.div>
                      <div>
                        <h3 className="font-sora font-bold text-white text-lg mb-1.5">
                          Message Received
                        </h3>
                        <p className="text-[rgba(255,255,255,0.42)] text-sm leading-relaxed max-w-xs mx-auto">
                          We&apos;ll review your project details and follow up
                          personally within one business day.
                        </p>
                      </div>

                      {/* Send another */}
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        onClick={() => {
                          setSubmitted(false);
                          setForm(INITIAL_FORM);
                        }}
                        className="text-xs text-blue-400/70 hover:text-blue-400 underline underline-offset-2 decoration-blue-400/30 hover:decoration-blue-400/60 transition-all duration-200 mt-1"
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
