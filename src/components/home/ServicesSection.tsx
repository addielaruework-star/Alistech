"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  Globe,
  Bot,
  MessageCircle,
  Smartphone,
  GraduationCap,
  BarChart2,
  Wrench,
  ArrowRight,
} from "lucide-react";

/**
 * 7 customer-focused service areas as specified in homepage requirements.
 */
const WHAT_WE_DO = [
  {
    icon: Globe,
    title: "Websites & Online Stores",
    tag: "Google & Online Sales",
    description:
      "Fast, modern websites and online stores that help customers find you on Google, look trusted and professional, and bring in new orders and customer enquiries 24/7.",
    href: "/services",
  },
  {
    icon: Bot,
    title: "AI Assistants",
    tag: "Instant 24/7 Replies",
    description:
      "Smart chatbots and AI helpers that answer your customer questions instantly anytime and help your staff search business files, documents, and records in seconds.",
    href: "/services",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp & Phone Automation",
    tag: "Never Miss a Lead",
    description:
      "Auto-replies, appointment reminders, booking confirmations, and order updates sent straight to your customers on WhatsApp so no customer enquiry is ever lost.",
    href: "/services",
  },
  {
    icon: Smartphone,
    title: "Apps & Business Software",
    tag: "Android, iOS & Cloud",
    description:
      "Custom mobile apps and software to manage your customers, bookings, staff, stock, and billing in one easy place — replacing messy registers and Excel sheets.",
    href: "/services",
  },
  {
    icon: GraduationCap,
    title: "School & Learning Solutions",
    tag: "Coaching & Education",
    description:
      "Complete digital portals for schools, colleges, and coaching centres with student logins, recorded video lessons, online tests, attendance, and fee tracking.",
    href: "/services",
  },
  {
    icon: BarChart2,
    title: "Data & Reports",
    tag: "Sales & Performance",
    description:
      "Clear visual dashboards and automated reports that show your sales, expenses, and growth at a single glance so you can make confident business decisions.",
    href: "/services",
  },
  {
    icon: Wrench,
    title: "Custom Solutions",
    tag: "Built Around You",
    description:
      "Software, AI tools, and integrations designed around the exact way you work, solving everyday business challenges that off-the-shelf apps cannot fix.",
    href: "/services",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-20 sm:py-24 bg-[#f8fafc] overflow-hidden border-b border-[#e2e8f0]">
      {/* Subtle top & bottom divider lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#e2e8f0]" />

      <div className="section-container relative z-10">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="What We Do"
          title="Simple Solutions for "
          highlight="Everyday Work"
          subtitle="Websites, apps, business software and smart tools — designed to solve everyday business problems and help you work with less effort."
          className="mb-12 sm:mb-14"
        />

        {/* 7 Services Grid: 6 uniform cards (3x2) + 1 full-width executive feature card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHAT_WE_DO.slice(0, 6).map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-white border border-[#e2e8f0] hover:border-[#7CFF4F] hover:shadow-[0_12px_32px_-12px_rgba(15,23,42,0.1)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Icon + Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] group-hover:bg-[#ecfccb] group-hover:border-[#7CFF4F]/60 flex items-center justify-center text-[#0f172a] group-hover:text-[#2d6a0a] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#f8fafc] text-[#475569] border border-[#e2e8f0]">
                      {item.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-sora font-bold text-[#0f172a] text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#475569] text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Card footer link */}
                <div className="pt-4 border-t border-[#f1f5f9] mt-auto">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0f172a] group-hover:text-[#2d6a0a] transition-colors"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}

          {/* 7th Service: Custom Solutions - Full Width Executive Banner Card */}
          {(() => {
            const custom = WHAT_WE_DO[6];
            const Icon = custom.icon;
            return (
              <div className="md:col-span-2 lg:col-span-3 p-6 sm:p-7 rounded-2xl bg-white border border-[#e2e8f0] hover:border-[#7CFF4F] hover:shadow-[0_12px_32px_-12px_rgba(15,23,42,0.1)] transition-all duration-300 group flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-start sm:items-center gap-4 sm:gap-5 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-[#ecfccb] border border-[#7CFF4F]/60 flex items-center justify-center text-[#2d6a0a] shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                      <h3 className="font-sora font-bold text-[#0f172a] text-lg sm:text-xl">
                        {custom.title}
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#ecfccb] text-[#2d6a0a] border border-[#7CFF4F]/50">
                        {custom.tag}
                      </span>
                    </div>
                    <p className="text-[#475569] text-sm leading-relaxed max-w-3xl">
                      {custom.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center">
                  <Link
                    href={custom.href}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#f8fafc] text-[#0f172a] font-semibold text-xs sm:text-sm border border-[#e2e8f0] hover:border-[#7CFF4F] hover:bg-[#ecfccb] hover:text-[#2d6a0a] transition-all"
                  >
                    <span>Discuss Custom Scope</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })()}
        </div>

        {/* View All Services CTA */}
        <div className="mt-12 flex justify-center">
          <Button variant="secondary" href="/services" size="md">
            View All Services &amp; Details →
          </Button>
        </div>
      </div>
    </section>
  );
}
