"use client";

import { useState, useEffect, useCallback } from "react";
import { submitLead, validateLead, type LeadFieldErrors } from "@/lib/firestore";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MessageCircle,
  Clock,
  ChevronDown,
  CheckCircle,
  CheckCircle2,
  ArrowRight,
  Phone,
} from "lucide-react";
import { WHATSAPP_URL, PHONE_NUMBER, EMAIL_ADDRESS } from "@/lib/constants";

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
    value: "Within a few hours",
    href: "#",
  },
];

const PROJECT_TYPES = [
  "Website",
  "Mobile App",
  "Business Software",
  "AI Solutions",
  "WhatsApp Automation",
  "Business Automation",
  "Data & Reports",
  "Online Course Platform",
  "Document Processing",
  "Data Collection",
  "Payment Integration",
  "Custom Solutions",
  "CMS & Admin Systems",
  "Hosting Setup",
  "Domain Setup",
  "Maintenance",
  "SEO Basics",
  "Deployment Support",
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
  "caret-[#2d6a0a] " +
  "transition-all duration-200 " +
  "focus:outline-none " +
  "focus:border-[#0f172a] " +
  "focus:bg-white " +
  "focus:shadow-[0_0_0_3px_rgba(124,255,79,0.35)] " +
  "hover:border-[#cbd5e1]";

const fieldError =
  "border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.2)]";

const labelBase =
  "block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5";

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
        "Something went wrong sending your message. Please try again or reach us directly on WhatsApp."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── 1. Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 bg-white overflow-hidden border-b border-[#f1f5f9]">
        <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full border border-[#dde4ec] bg-[#f8fafc] text-[#0f172a] text-xs font-semibold tracking-wide shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#7CFF4F] shadow-[0_0_8px_#7CFF4F]" />
            <span>Get In Touch • Hyderabad, India</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-sora font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0f172a] tracking-tight leading-[1.15] mb-4 text-balance"
          >
            Let&apos;s Build Something{" "}
            <span className="text-[#0f172a] relative inline-block">
              Useful.
              <span className="absolute bottom-1 left-0 right-0 h-2.5 bg-[#7CFF4F]/50 -z-10 rounded-full" />
            </span>
          </motion.h1>

          {/* Supporting line */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="text-[#475569] text-base sm:text-lg leading-relaxed max-w-xl mx-auto"
          >
            Tell us what you need. Let&apos;s discuss a practical solution that works for you.
          </motion.p>
        </div>
      </section>

      {/* ── 2. Main Content ──────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-[#f8fafc] border-b border-[#e2e8f0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* ── Left Column: Contact Cards + New 'We Work With' Section ───────── */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Contact Information Intro */}
              <div>
                <h2 className="font-sora font-bold text-[#0f172a] text-xl mb-1.5">
                  Contact Information
                </h2>
                <p className="text-[#475569] text-xs sm:text-sm leading-relaxed">
                  We&apos;re fully remote and based in Hyderabad, India. Reach out directly or send us an inquiry below.
                </p>
              </div>

              {/* Contact Cards (Phone, Email, WhatsApp, Response Time) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => {
                  const isExternal = href.startsWith("http");
                  return (
                    <a
                      key={label}
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 p-3.5 rounded-2xl border border-[#dde4ec] bg-white hover:border-[#7CFF4F] shadow-xs hover:shadow-sm transition-all duration-200 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center text-[#2d6a0a] shrink-0 group-hover:bg-[#ecfccb] transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] text-[#64748b] uppercase tracking-wider font-semibold">
                          {label}
                        </div>
                        <div className="text-[#0f172a] text-xs font-bold truncate">
                          {value}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* ── Solutions for Real Business Needs Content Section ── */}
              <div className="pt-6 border-t border-[#e2e8f0] flex flex-col gap-4">
                <div>
                  <h3 className="font-sora font-bold text-base sm:text-lg text-[#0f172a] mb-1.5">
                    Solutions for Real Business Needs
                  </h3>

                  <p className="text-[#475569] text-xs sm:text-sm leading-relaxed">
                    Whether you are starting a new business, improving an existing process, or exploring AI, AlisTech helps you find a practical digital solution.
                  </p>
                </div>

                {/* Four Concise Points */}
                <ul className="space-y-3 list-none p-0 m-0">
                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#475569]">
                    <CheckCircle2 className="w-4 h-4 text-[#2d6a0a] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      <strong className="font-bold text-[#0f172a]">Build Something New</strong> — Websites, apps and digital products designed around your goals.
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#475569]">
                    <CheckCircle2 className="w-4 h-4 text-[#2d6a0a] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      <strong className="font-bold text-[#0f172a]">Save Time</strong> — Automate repetitive tasks, customer enquiries and everyday workflows.
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#475569]">
                    <CheckCircle2 className="w-4 h-4 text-[#2d6a0a] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      <strong className="font-bold text-[#0f172a]">Serve Customers Better</strong> — Use websites, WhatsApp automation and AI assistants to respond more efficiently.
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#475569]">
                    <CheckCircle2 className="w-4 h-4 text-[#2d6a0a] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      <strong className="font-bold text-[#0f172a]">Make Better Decisions</strong> — Turn business data into useful reports, insights and dashboards.
                    </span>
                  </li>
                </ul>

                {/* Finishing Reassurance Sentence Box */}
                <div className="p-3.5 rounded-xl bg-white border border-[#e2e8f0] shadow-2xs">
                  <p className="text-xs text-[#475569] leading-relaxed">
                    Not sure what you need? Tell us your challenge. We&apos;ll discuss the options and help you identify a suitable next step.
                  </p>
                </div>

                {/* Chat With Us on WhatsApp Button Link */}
                <div className="pt-1">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-[#7CFF4F] hover:bg-[#6be042] text-[#0f172a] shadow-[0_4px_14px_rgba(124,255,79,0.45)] transition-all w-full sm:w-auto"
                  >
                    <MessageCircle className="w-4 h-4 text-[#0f172a]" />
                    <span>Chat With Us on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* ── Right Column: Interactive Form Card ─────────────────────────── */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-[#dde4ec] bg-white shadow-sm overflow-hidden">
                {/* Card header */}
                <div className="px-6 sm:px-7 pt-6 pb-5 border-b border-[#dde4ec] bg-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#7CFF4F] shadow-[0_0_8px_#7CFF4F]" />
                    <h2 className="font-sora font-bold text-[#0f172a] text-lg sm:text-xl">
                      Tell Us About Your Project
                    </h2>
                  </div>
                  <p className="text-[#64748b] text-xs leading-relaxed pl-4">
                    Fields marked * are required. Every message is reviewed personally.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="px-6 sm:px-7 py-6"
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
                              <p className="text-red-500 text-[11px] mt-1.5 pl-1 font-medium">
                                {fieldErrors.name}
                              </p>
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
                              <p className="text-red-500 text-[11px] mt-1.5 pl-1 font-medium">
                                {fieldErrors.email}
                              </p>
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
                            <p className="text-red-500 text-[11px] mt-1.5 pl-1 font-medium">
                              {fieldErrors.message}
                            </p>
                          )}
                        </div>

                        {/* Error banner */}
                        <AnimatePresence>
                          {error && (
                            <motion.div
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              className="flex items-start gap-3 px-4 py-3 rounded-xl border border-red-500/30 bg-red-50 text-red-600 text-xs leading-relaxed"
                            >
                              <span className="mt-0.5 w-3.5 h-3.5 shrink-0 rounded-full border border-red-500 flex items-center justify-center text-[9px] font-bold">!</span>
                              <span>{error}</span>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Primary Submit CTA */}
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full py-3.5 rounded-full font-bold text-sm text-[#0f172a] flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-55 disabled:cursor-not-allowed mt-1 bg-[#7CFF4F] hover:bg-[#6be042] shadow-[0_8px_20px_-6px_rgba(124,255,79,0.55)] cursor-pointer"
                        >
                          {loading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-[#0f172a]/30 border-t-[#0f172a] rounded-full animate-spin" />
                              <span>Sending…</span>
                            </>
                          ) : (
                            <>
                              <ArrowRight className="w-4 h-4" />
                              <span>Discuss Your Project</span>
                            </>
                          )}
                        </button>

                        {/* WhatsApp secondary CTA */}
                        <p className="text-center text-xs text-[#64748b] leading-relaxed">
                          Prefer WhatsApp?{" "}
                          <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#2d6a0a] font-bold underline underline-offset-2 hover:text-[#0f172a] transition-colors"
                          >
                            Chat with us directly.
                          </a>
                        </p>

                        <p className="text-[#94a3b8] text-[11px] text-center">
                          No spam — ever. We respect your privacy and never share your details.
                        </p>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="px-7 py-16 flex flex-col items-center text-center gap-5"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#ecfccb] border border-[#7CFF4F] flex items-center justify-center">
                        <CheckCircle className="w-7 h-7 text-[#2d6a0a]" />
                      </div>
                      <div>
                        <h3 className="font-sora font-bold text-[#0f172a] text-lg mb-1.5">
                          Message Received
                        </h3>
                        <p className="text-[#475569] text-sm leading-relaxed max-w-xs mx-auto">
                          We&apos;ll review your project details and follow up personally within one business day.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setForm(INITIAL_FORM);
                        }}
                        className="text-xs text-[#2d6a0a] font-bold hover:underline underline-offset-2 transition-all mt-1"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
