"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  Globe,
  Bot,
  Smartphone,
  Zap,
  Brain,
  GraduationCap,
  BookOpen,
  Stethoscope,
  ShoppingBag,
  Utensils,
  Building2,
  Rocket,
  Briefcase,
  Building,
  HeartHandshake,
  UserCheck,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Clock,
  Phone,
  Mail,
  Sparkles,
  ChevronRight,
  Layers,
  FileCheck2,
} from "lucide-react";
import {
  SERVICE_PILLARS,
  INDUSTRY_DOMAINS,
  HOW_WE_WORK_STEPS,
} from "@/lib/services-data";
import {
  PHONE_NUMBER,
  EMAIL_ADDRESS,
  WHATSAPP_NUMBER,
} from "@/lib/constants";

// Map string icon names to Lucide icon components safely
const ICON_COMPONENTS: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Bot,
  Smartphone,
  Zap,
  Brain,
  GraduationCap,
  BookOpen,
  Stethoscope,
  ShoppingBag,
  Utensils,
  Building2,
  Rocket,
  Briefcase,
  Building,
  HeartHandshake,
  UserCheck,
};

export default function ServicesPage() {
  const [activeDomainTab, setActiveDomainTab] = useState<string>("schools-colleges");

  return (
    <>
      {/* ── 1. Hero Section ─────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-white overflow-hidden border-b border-[#f1f5f9]">
        <div className="section-container relative z-10 text-center max-w-4xl mx-auto">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] text-xs font-semibold tracking-wide w-fit mx-auto mb-6">
            <span className="w-2 h-2 rounded-full bg-[#7CFF4F] shadow-[0_0_8px_#7CFF4F]" />
            <span>Digital Engineering &amp; AI Solutions</span>
          </div>

          {/* Main Hero Heading */}
          <h1 className="font-sora font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0f172a] tracking-tight leading-[1.15] mb-6 text-balance">
            Software, Automation &amp;{" "}
            <span className="text-[#0f172a] relative inline-block">
              AI Solutions
              <span className="absolute bottom-1 left-0 right-0 h-2.5 bg-[#7CFF4F]/50 -z-10 rounded-full" />
            </span>
          </h1>

          {/* Description */}
          <p className="text-[#475569] text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
            From modern websites and mobile apps to smart WhatsApp automations and custom AI assistants — explore our capabilities and see how we solve real problems for 11 key industries.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Button
              variant="primary"
              size="lg"
              href="#industries"
              className="w-full sm:w-auto px-8 py-3.5 font-bold shadow-[0_8px_20px_-6px_rgba(124,255,79,0.55)]"
            >
              Explore 11 Industries ↓
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="#pillars"
              className="w-full sm:w-auto px-7 py-3.5 font-bold text-[#0f172a]"
            >
              Our 6 Service Pillars ↓
            </Button>
          </div>

          {/* Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f8fafc] border border-[#e2e8f0] text-xs font-semibold text-[#0f172a]">
              <Layers className="w-3.5 h-3.5 text-[#2d6a0a]" /> 6 Core Service Pillars
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f8fafc] border border-[#e2e8f0] text-xs font-semibold text-[#0f172a]">
              <Building2 className="w-3.5 h-3.5 text-[#2d6a0a]" /> 11 Domains We Serve
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f8fafc] border border-[#e2e8f0] text-xs font-semibold text-[#0f172a]">
              <FileCheck2 className="w-3.5 h-3.5 text-[#2d6a0a]" /> 20 Practical Demo Solutions
            </span>
          </div>
        </div>
      </section>

      {/* ── 2. Quick Jump Domain Bar (Connects to homepage links) ───────────── */}
      <nav aria-label="Jump to industry solutions" className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-[#e2e8f0] shadow-xs py-3.5 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-[#0f172a] shrink-0 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#7CFF4F]" />
            <span>Jump to Domain:</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full lg:w-auto">
            {INDUSTRY_DOMAINS.map((domain) => (
              <a
                key={domain.anchorId}
                href={`#${domain.anchorId}`}
                onClick={() => setActiveDomainTab(domain.anchorId)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                  activeDomainTab === domain.anchorId
                    ? "bg-[#0f172a] text-[#7CFF4F] shadow-sm"
                    : "bg-[#f8fafc] hover:bg-[#eef2f6] text-[#475569] hover:text-[#0f172a] border border-[#e2e8f0]"
                }`}
              >
                {domain.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── 3. Six Core Service Pillars ─────────────────────────────────────── */}
      <section id="pillars" className="relative py-20 sm:py-24 bg-[#f8fafc] border-b border-[#e2e8f0]">
        <div className="section-container relative z-10">
          <SectionHeading
            eyebrow="What We Build"
            title="Six Core "
            highlight="Service Pillars"
            subtitle="Everything your business needs to establish an authoritative digital presence, automate repetitive operations, and leverage modern AI."
            className="mb-14 sm:mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICE_PILLARS.map((pillar) => {
              const Icon = ICON_COMPONENTS[pillar.iconName] ?? Globe;

              return (
                <div
                  key={pillar.id}
                  id={pillar.id}
                  className="p-7 rounded-2xl bg-white border border-[#e2e8f0] hover:border-[#7CFF4F] hover:shadow-[0_12px_32px_-12px_rgba(15,23,42,0.1)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top row: Number and Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-[#3f6212] bg-[#ecfccb] border border-[#7CFF4F]/60 px-2.5 py-0.5 rounded-full">
                        {pillar.number}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center text-[#2d6a0a] shadow-xs">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="font-sora font-bold text-[#0f172a] text-xl mb-1 leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#2d6a0a] mb-3">
                      {pillar.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-[#475569] text-xs sm:text-sm leading-relaxed mb-5">
                      {pillar.description}
                    </p>

                    {/* Key features checklist */}
                    <div className="pt-4 border-t border-[#f1f5f9] mb-6">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] block mb-2.5">
                        Key Capabilities Included:
                      </span>
                      <ul className="space-y-2 list-none p-0 m-0">
                        {pillar.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2 text-xs text-[#0f172a] font-medium leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#2d6a0a] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Pillar CTA / Link */}
                  {pillar.linkHref ? (
                    <div className="pt-4 border-t border-[#f1f5f9]">
                      <Link
                        href={pillar.linkHref}
                        className="inline-flex items-center justify-between w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#ecfccb] hover:bg-[#d9f99d] text-[#2d6a0a] border border-[#7CFF4F]/80 transition-colors"
                      >
                        <span>{pillar.linkLabel}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ) : (
                    <div className="pt-4 border-t border-[#f1f5f9]">
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                          `Hi AlisTech, I would like to discuss your ${pillar.title} service for my business.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#f8fafc] hover:bg-[#eef2f6] text-[#0f172a] border border-[#e2e8f0] transition-colors group"
                      >
                        <span>Enquire on WhatsApp</span>
                        <MessageCircle className="w-3.5 h-3.5 text-[#2d6a0a] group-hover:scale-110 transition-transform" />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. Eleven Industry Sections & Twenty Demo Solutions ─────────────── */}
      <section id="industries" className="relative py-20 sm:py-24 bg-white border-b border-[#e2e8f0]">
        <div className="section-container relative z-10">
          <SectionHeading
            eyebrow="Domains We Serve"
            title="Industry-Specific "
            highlight="Solutions &amp; Demos"
            subtitle="Explore how we solve practical problems for 11 distinct domains. Every section includes concrete demonstration concepts showcasing what we can build for your workflow."
            className="mb-14 sm:mb-16"
          />

          {/* 11 Industry Sections */}
          <div className="space-y-16 max-w-6xl mx-auto">
            {INDUSTRY_DOMAINS.map((domain) => {
              const Icon = ICON_COMPONENTS[domain.iconName] ?? Building2;

              return (
                <div
                  key={domain.id}
                  id={domain.anchorId}
                  className="scroll-mt-36 p-6 sm:p-10 rounded-3xl bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#7CFF4F] shadow-xs transition-all duration-300"
                >
                  {/* Domain Header */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[#e2e8f0]">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-[#e2e8f0] flex items-center justify-center text-[#2d6a0a] shadow-xs shrink-0 mt-1">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs font-bold text-[#3f6212] bg-[#ecfccb] border border-[#7CFF4F]/60 px-2 py-0.5 rounded-full">
                            Domain {domain.number}
                          </span>
                          <span className="text-xs font-semibold text-[#64748b]">
                            Industry Solution
                          </span>
                        </div>
                        <h3 className="font-sora font-extrabold text-2xl sm:text-3xl text-[#0f172a] tracking-tight">
                          {domain.name}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold text-[#2d6a0a] mt-1">
                          {domain.tagline}
                        </p>
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                        `Hi AlisTech, I'm interested in discussing a digital solution for ${domain.name}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[#7CFF4F] hover:bg-[#6be042] text-[#0f172a] shadow-xs transition-all shrink-0 self-start md:self-center"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#0f172a]" />
                      <span>Enquire for {domain.name}</span>
                    </a>
                  </div>

                  {/* Domain Overview & Typical Needs */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6">
                    <div className="lg:col-span-7">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] block mb-2">
                        How We Help This Industry
                      </span>
                      <p className="text-[#475569] text-sm leading-relaxed">
                        {domain.description}
                      </p>
                    </div>

                    <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-[#e2e8f0]">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#0f172a] block mb-2.5 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#2d6a0a]" />
                        Typical Operational Needs
                      </span>
                      <ul className="space-y-2 list-none p-0 m-0">
                        {domain.typicalNeeds.map((need) => (
                          <li key={need} className="flex items-start gap-2 text-xs text-[#475569]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7CFF4F] shrink-0 mt-1.5" />
                            <span>{need}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Demo Projects Showcase */}
                  <div className="pt-6 border-t border-[#e2e8f0]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-sora font-bold text-xs uppercase tracking-wider text-[#0f172a] flex items-center gap-1.5">
                        <span>Demonstration Solutions</span>
                        <span className="text-[#64748b] font-normal normal-case">
                          ({domain.demos.length} {domain.demos.length === 1 ? "project concept" : "project concepts"})
                        </span>
                      </span>
                      <span className="text-[11px] text-[#64748b] hidden sm:inline">
                        Designed around practical operational workflows
                      </span>
                    </div>

                    <div className={`grid grid-cols-1 ${domain.demos.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1"} gap-5`}>
                      {domain.demos.map((demo) => {
                        const waDemoUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                          `Hi AlisTech, I saw your demonstration solution "${demo.title}" for ${domain.name} and would like to discuss building something similar for my business.`
                        )}`;

                        return (
                          <div
                            key={demo.id}
                            className="p-5 sm:p-6 rounded-2xl bg-white border border-[#e2e8f0] hover:border-[#7CFF4F] shadow-xs flex flex-col justify-between transition-all"
                          >
                            <div>
                              {/* Demo Badge */}
                              <div className="flex items-center justify-between gap-2 mb-3">
                                {demo.isLiveCaseStudy ? (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#ecfccb] text-[#2d6a0a] border border-[#7CFF4F]/80">
                                    <Sparkles className="w-2.5 h-2.5 text-[#2d6a0a]" /> Verified Case Study
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]">
                                    Demonstration Concept
                                  </span>
                                )}

                                <div className="flex items-center gap-1">
                                  {demo.tags.slice(0, 2).map((tag) => (
                                    <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#f8fafc] text-[#64748b] border border-[#e2e8f0]">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Title */}
                              <h4 className="font-sora font-bold text-[#0f172a] text-base mb-2">
                                {demo.title}
                              </h4>

                              {/* Summary */}
                              <p className="text-xs text-[#475569] leading-relaxed mb-4">
                                {demo.summary}
                              </p>

                              {/* Key Features */}
                              <div className="mb-5 pt-3 border-t border-[#f1f5f9]">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b] block mb-2">
                                  Key Capabilities:
                                </span>
                                <ul className="space-y-1.5 list-none p-0 m-0">
                                  {demo.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2 text-xs text-[#0f172a]">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2d6a0a] shrink-0 mt-0.5" />
                                      <span className="leading-snug">{f}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Demo Actions */}
                            <div className="pt-3 border-t border-[#f1f5f9] flex flex-wrap items-center gap-2">
                              {demo.isLiveCaseStudy && demo.caseStudySlug && (
                                <Link
                                  href={`/projects/${demo.caseStudySlug}`}
                                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-[#f8fafc] hover:bg-[#eef2f6] text-[#0f172a] border border-[#e2e8f0] transition-colors"
                                >
                                  <span>View Case Study</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                              )}

                              <a
                                href={waDemoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-[#2d6a0a] bg-[#ecfccb] hover:bg-[#d9f99d] border border-[#7CFF4F]/80 transition-colors"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>Discuss This Solution</span>
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Technology Training Bridge ───────────────────────────────────── */}
      <section className="relative py-20 bg-[#f8fafc] border-b border-[#e2e8f0]">
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto p-8 sm:p-10 rounded-3xl bg-white border border-[#e2e8f0] shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ecfccb] border border-[#7CFF4F]/80 text-[#2d6a0a] text-xs font-bold tracking-wide mb-3">
                <GraduationCap className="w-3.5 h-3.5 text-[#2d6a0a]" />
                <span>AlisTech Skills &amp; Training</span>
              </div>
              <h3 className="font-sora font-extrabold text-2xl sm:text-3xl text-[#0f172a] tracking-tight mb-2">
                Learn Modern Technology &amp; AI
              </h3>
              <p className="text-[#475569] text-sm leading-relaxed mb-4">
                We also teach what we build. Explore our 8 practical technology courses covering Python, Data Science, Machine Learning, Deep Learning, and our two dedicated spotlights: <strong>Generative AI &amp; LLMs</strong> and <strong>Agentic AI</strong>.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-[#64748b]">
                <span className="px-2.5 py-1 rounded-full bg-[#f8fafc] border border-[#e2e8f0]">No full syllabus published</span>
                <span className="px-2.5 py-1 rounded-full bg-[#f8fafc] border border-[#e2e8f0]">Brochure on WhatsApp</span>
                <span className="px-2.5 py-1 rounded-full bg-[#f8fafc] border border-[#e2e8f0]">100% Practical Focus</span>
              </div>
            </div>

            <div className="shrink-0 w-full md:w-auto">
              <Link
                href="/courses"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold bg-[#7CFF4F] hover:bg-[#6be042] text-[#0f172a] shadow-[0_4px_14px_rgba(124,255,79,0.45)] transition-all"
              >
                <span>Explore All Courses</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. How We Work Section ─────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-24 bg-white border-b border-[#e2e8f0]">
        <div className="section-container relative z-10">
          <SectionHeading
            eyebrow="Our Process"
            title="How We Deliver "
            highlight="Your Project"
            subtitle="Transparent scope, continuous live demos, and direct developer communication at every step."
            className="mb-14 sm:mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {HOW_WE_WORK_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#7CFF4F] hover:bg-white hover:shadow-xs transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <span className="w-8 h-8 rounded-full bg-[#0f172a] text-[#7CFF4F] border border-[#7CFF4F]/50 flex items-center justify-center text-xs font-bold font-mono mb-4 shadow-xs">
                    {step.step}
                  </span>
                  <h4 className="font-sora font-bold text-[#0f172a] text-lg mb-2">
                    {step.title}
                  </h4>
                  <p className="text-[#475569] text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Closing Consultation CTA ────────────────────────────────────── */}
      <section className="relative py-20 sm:py-24 bg-[#f8fafc] overflow-hidden">
        <div className="section-container relative z-10">
          <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#e2e8f0] bg-white text-[#0f172a] text-xs font-semibold tracking-wider uppercase shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#7CFF4F] shadow-[0_0_8px_#7CFF4F]" />
              Start Your Project
            </span>

            <h2 className="font-sora font-extrabold text-3xl sm:text-4xl lg:text-[44px] text-[#0f172a] leading-tight text-balance">
              Let&apos;s Build Something{" "}
              <span className="text-[#0f172a] relative inline-block">
                Useful.
                <span className="absolute bottom-1 left-0 right-0 h-2.5 bg-[#7CFF4F]/50 -z-10 rounded-full" />
              </span>
            </h2>

            <p className="text-[#475569] text-base sm:text-lg leading-relaxed max-w-lg">
              Tell us what you need. Let&apos;s discuss a practical solution that works for you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mt-2">
              <Button
                variant="primary"
                size="lg"
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 font-bold shadow-[0_8px_20px_-6px_rgba(124,255,79,0.55)]"
              >
                Let&apos;s Discuss a Solution →
              </Button>
            </div>

            {/* Approved Consultation Supporting Text */}
            <div className="flex items-start sm:items-center gap-3 p-3.5 rounded-xl bg-white border border-[#e2e8f0] text-xs text-[#64748b] max-w-md text-left sm:text-center shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-[#ecfccb] text-[#2d6a0a] flex items-center justify-center shrink-0 border border-[#7CFF4F]/60">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-bold text-[#0f172a] block sm:inline">Your Free 30-Minute Consultation: </span>
                <span>Tell us what you need. Let&apos;s find the right solution.</span>
              </div>
            </div>

            {/* Direct Contact Links */}
            <div
              suppressHydrationWarning
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#64748b] pt-1"
            >
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s+/g, "")}`}
                suppressHydrationWarning
                className="flex items-center gap-2 hover:text-[#0f172a] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#2d6a0a]" />
                <span suppressHydrationWarning className="font-semibold text-[#0f172a]">
                  {PHONE_NUMBER}
                </span>
              </a>
              <span className="text-[#cbd5e1] hidden sm:inline">•</span>
              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                suppressHydrationWarning
                className="flex items-center gap-2 hover:text-[#0f172a] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#2d6a0a]" />
                <span className="font-semibold underline underline-offset-4 text-[#0f172a]">
                  {EMAIL_ADDRESS}
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
