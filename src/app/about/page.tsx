import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  MapPin,
  Sparkles,
  Users,
  Target,
  CheckCircle2,
  Headphones,
  MessageSquare,
  SlidersHorizontal,
  CreditCard,
  ShieldCheck,
  Clock,
  Phone,
  Mail,
  ArrowRight,
  FileText,
  Code2,
  Rocket,
} from "lucide-react";
import { PHONE_NUMBER, EMAIL_ADDRESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us | AlisTech — Technology That Works for You",
  description:
    "AlisTech is an AI and software solutions company based in Hyderabad, India. We help schools, businesses, startups and individuals solve problems with websites, apps, business software and smart tools.",
};

/**
 * 5 points for "What Makes Us Different"
 */
const DIFFERENTIATORS = [
  {
    icon: Headphones,
    title: "We Listen First",
    description: "We understand your needs before suggesting a solution.",
  },
  {
    icon: MessageSquare,
    title: "Simple Communication",
    description: "We explain the work clearly, without unnecessary technical language.",
  },
  {
    icon: SlidersHorizontal,
    title: "Built Around You",
    description: "We focus on solutions that fit your goals.",
  },
  {
    icon: CreditCard,
    title: "Clear Pricing",
    description: "We discuss the scope, timeline and cost before work begins.",
  },
  {
    icon: ShieldCheck,
    title: "Ongoing Support",
    description: "We can help maintain and improve your solution after launch, as agreed.",
  },
];

/**
 * 4 simple steps for "How We Work"
 */
const WORK_STEPS = [
  {
    step: "01",
    title: "Tell Us What You Need",
    description: "Share your goals, daily challenges, and what you want to achieve. We listen first.",
    icon: FileText,
  },
  {
    step: "02",
    title: "Plan Together",
    description: "We discuss the right approach, confirm the timeline, and agree on clear upfront pricing.",
    icon: Target,
  },
  {
    step: "03",
    title: "Build Your Solution",
    description: "We develop your website, app, or automation tool with regular progress updates and testing.",
    icon: Code2,
  },
  {
    step: "04",
    title: "Launch & Support",
    description: "We help you go live smoothly and provide dependable ongoing support to keep things running.",
    icon: Rocket,
  },
];

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-white overflow-hidden border-b border-[#f1f5f9]">
        <div className="section-container relative z-10 text-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] text-xs font-semibold tracking-wide w-fit mx-auto mb-6">
            <span className="w-2 h-2 rounded-full bg-[#7CFF4F] shadow-[0_0_8px_#7CFF4F]" />
            <span>About AlisTech</span>
          </div>

          {/* Heading */}
          <h1 className="font-sora font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0f172a] tracking-tight leading-[1.15] max-w-3xl mx-auto mb-6 text-balance">
            Technology That{" "}
            <span className="text-[#0f172a] relative inline-block">
              Works for You
              <span className="absolute bottom-1 left-0 right-0 h-2.5 bg-[#7CFF4F]/50 -z-10 rounded-full" />
            </span>
          </h1>

          {/* Description */}
          <p className="text-[#475569] text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
            AlisTech is an AI and software solutions company based in Hyderabad, India. We help schools, businesses, startups and individuals solve problems with websites, apps, business software and smart tools.
          </p>

          {/* Location & Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f8fafc] border border-[#e2e8f0] text-xs font-semibold text-[#0f172a]">
              <MapPin className="w-3.5 h-3.5 text-[#2d6a0a]" /> Hyderabad, India
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f8fafc] border border-[#e2e8f0] text-xs font-semibold text-[#0f172a]">
              <Sparkles className="w-3.5 h-3.5 text-[#2d6a0a]" /> AI &amp; Software Solutions
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f8fafc] border border-[#e2e8f0] text-xs font-semibold text-[#0f172a]">
              <Users className="w-3.5 h-3.5 text-[#2d6a0a]" /> Schools, Businesses &amp; Startups
            </span>
          </div>
        </div>
      </section>

      {/* 2 & 3. Who We Are & Our Mission */}
      <section className="relative py-20 sm:py-24 bg-[#f8fafc] overflow-hidden border-b border-[#e2e8f0]">
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Column: Who We Are (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center gap-6 text-left">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-[#dde4ec] bg-white text-[#3f6212] shadow-sm w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16]" />
                Who We Are
              </span>

              <h2 className="font-sora font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0f172a] leading-tight">
                Solutions Built for Your Real Business Needs
              </h2>

              <div className="space-y-4 text-[#475569] text-base leading-relaxed">
                <p>
                  Every business has different needs. We work with our customers to understand their goals and build digital solutions that fit their work.
                </p>
                <p>
                  We believe technology should make work easier, not more confusing. We explain our solutions in simple language and help customers understand their options.
                </p>
              </div>

              {/* Approach Note */}
              <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] flex items-start gap-3 mt-1 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-[#ecfccb] text-[#2d6a0a] border border-[#7CFF4F]/60 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-xs text-[#475569] leading-relaxed">
                  <span className="font-bold text-[#0f172a] block mb-0.5">Practical, Human-Friendly Software</span>
                  No confusing jargon, no unnecessary complexity. Just dependable websites, software, and automations that make everyday tasks simpler.
                </div>
              </div>
            </div>

            {/* Right Column: Our Mission (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="p-7 sm:p-8 rounded-2xl bg-white border-2 border-[#7CFF4F]/40 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.08)] flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#ecfccb] border border-[#7CFF4F]/60 flex items-center justify-center text-[#2d6a0a]">
                      <Target className="w-6 h-6" />
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#f8fafc] text-[#0f172a] border border-[#e2e8f0]">
                      Our Core Purpose
                    </span>
                  </div>

                  <span className="text-xs font-bold text-[#64748b] uppercase tracking-wider block mb-2">
                    Our Mission
                  </span>

                  <h3 className="font-sora font-extrabold text-xl sm:text-2xl text-[#0f172a] leading-snug mb-5">
                    &ldquo;To make useful technology easier to access, helping people and businesses save time, work better and grow.&rdquo;
                  </h3>
                </div>

                <div className="grid grid-cols-3 gap-2.5 pt-5 border-t border-[#f1f5f9]">
                  <div className="text-center p-2.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                    <div className="font-sora font-bold text-xs text-[#0f172a]">Save Time</div>
                    <div className="text-[10px] text-[#64748b] font-medium">Cut manual work</div>
                  </div>
                  <div className="text-center p-2.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                    <div className="font-sora font-bold text-xs text-[#0f172a]">Work Better</div>
                    <div className="text-[10px] text-[#64748b] font-medium">Clear workflows</div>
                  </div>
                  <div className="text-center p-2.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                    <div className="font-sora font-bold text-xs text-[#0f172a]">Grow Smoothly</div>
                    <div className="text-[10px] text-[#64748b] font-medium">Scalable tools</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. What Makes Us Different */}
      <section className="relative py-20 sm:py-24 bg-white overflow-hidden border-b border-[#e2e8f0]">
        <div className="section-container relative z-10">
          <SectionHeading
            eyebrow="Why Work With Us"
            title="What Makes Us "
            highlight="Different"
            subtitle="We focus on straightforward collaboration, practical software, and long-term customer relationships."
            className="mb-12 sm:mb-14"
          />

          {/* 5 Cards Grid: 3 in top row, 2 centered in bottom row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIFFERENTIATORS.slice(0, 3).map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#7CFF4F] hover:bg-white hover:shadow-[0_12px_32px_-12px_rgba(15,23,42,0.1)] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-white border border-[#e2e8f0] group-hover:bg-[#ecfccb] group-hover:border-[#7CFF4F]/60 flex items-center justify-center text-[#0f172a] group-hover:text-[#2d6a0a] transition-colors mb-4 shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-sora font-bold text-[#0f172a] text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[#475569] text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}

            {DIFFERENTIATORS.slice(3, 5).map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#7CFF4F] hover:bg-white hover:shadow-[0_12px_32px_-12px_rgba(15,23,42,0.1)] transition-all duration-300 flex flex-col justify-between group md:col-span-1 lg:col-span-1"
                >
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-white border border-[#e2e8f0] group-hover:bg-[#ecfccb] group-hover:border-[#7CFF4F]/60 flex items-center justify-center text-[#0f172a] group-hover:text-[#2d6a0a] transition-colors mb-4 shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-sora font-bold text-[#0f172a] text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[#475569] text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Quick summary card to fill the 6th spot gracefully */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white border border-[#334155] shadow-sm flex flex-col justify-between md:col-span-2 lg:col-span-1">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7CFF4F] block mb-2">
                  Our Promise
                </span>
                <h3 className="font-sora font-bold text-lg mb-2 text-white">
                  Built Around Your Success
                </h3>
                <p className="text-white/75 text-sm leading-relaxed mb-4">
                  We don&apos;t just deliver software files and disappear. We take the time to understand your goals and ensure your team gets genuine value from every digital solution.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#7CFF4F] font-semibold">
                <span>Free 30-min consultation</span>
                <Link href="/contact" className="hover:underline flex items-center gap-1">
                  Talk to us <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How We Work */}
      <section className="relative py-20 sm:py-24 bg-[#f8fafc] overflow-hidden border-b border-[#e2e8f0]">
        <div className="section-container relative z-10">
          <SectionHeading
            eyebrow="Our Process"
            title="A Clear, Simple "
            highlight="Way to Work"
            subtitle="Four straightforward steps from your first idea to a working digital tool."
            className="mb-14 sm:mb-16"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORK_STEPS.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.step}
                  className="group relative flex flex-col gap-4 z-10"
                >
                  {/* Step icon badge and number chip */}
                  <div className="relative flex items-center">
                    <div className="w-12 h-12 rounded-xl bg-white border border-[#e2e8f0] group-hover:bg-[#ecfccb] group-hover:border-[#7CFF4F]/60 flex items-center justify-center text-[#0f172a] group-hover:text-[#2d6a0a] transition-colors shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    {/* Step number chip */}
                    <span className="absolute -top-1 left-9 w-6 h-6 rounded-full bg-[#0f172a] border border-[#7CFF4F]/50 flex items-center justify-center text-[10px] font-bold text-[#7CFF4F] tracking-tight shadow-sm">
                      {step.step}
                    </span>
                  </div>

                  {/* Card with clean white style */}
                  <div className="p-6 rounded-2xl bg-white border border-[#e2e8f0] hover:border-[#7CFF4F] hover:shadow-[0_12px_32px_-12px_rgba(15,23,42,0.1)] transition-all duration-300 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-sora font-bold text-[#0f172a] text-base sm:text-lg mb-2">
                        {step.title}
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Closing CTA */}
      <section className="relative py-20 sm:py-24 bg-white overflow-hidden">
        <div className="section-container relative z-10">
          <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#e2e8f0] bg-[#f8fafc] text-[#0f172a] text-xs font-semibold tracking-wider uppercase shadow-sm">
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
              Tell us what you need. Let&apos;s discuss a solution that works for you.
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

            {/* Exact Approved Consultation Supporting Text */}
            <div className="flex items-start sm:items-center gap-3 p-3.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-xs text-[#64748b] max-w-md text-left sm:text-center">
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
