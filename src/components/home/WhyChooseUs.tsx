"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import {
  MessageSquare,
  Target,
  Zap,
  Clock,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

const WHY_CHOOSE_ITEMS = [
  {
    icon: MessageSquare,
    title: "Simple, Plain-English Communication",
    description:
      "No confusing jargon or technical acronyms. We explain everything clearly, keep you updated at every step, and speak like real humans.",
  },
  {
    icon: Target,
    title: "Built for Real Business Needs",
    description:
      "We don't build software just for show. Every tool, website, and automation is engineered to save your team time and solve actual daily problems.",
  },
  {
    icon: Zap,
    title: "Fast, Clean & Mobile-Ready",
    description:
      "High-performance websites and apps that load quickly, look great on phones, and never make your customers wait.",
  },
  {
    icon: Clock,
    title: "Delivered on Time",
    description:
      "Clear project scopes and realistic delivery milestones. We value your schedule and deliver on the dates we promise.",
  },
  {
    icon: CreditCard,
    title: "Fair & Transparent Pricing",
    description:
      "Straightforward quotes with no hidden costs, secret fees, or surprise bills. Flexible options tailored for startups and small businesses.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Long-Term Support",
    description:
      "We stay by your side after launch with hosting, security updates, and maintenance whenever you need a quick fix or new feature.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative py-20 sm:py-24 bg-[#f8fafc] overflow-hidden border-b border-[#e2e8f0]">
      <div className="section-container relative z-10">
        <SectionHeading
          eyebrow="Why Choose AlisTech?"
          title="Why Choose "
          highlight="AlisTech?"
          subtitle="We focus on building reliable software and websites that solve real business problems — simple, honest, and built to last."
          className="mb-12 sm:mb-14"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_ITEMS.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="relative p-6 rounded-2xl bg-white border border-[#e2e8f0] hover:border-[#7CFF4F] hover:shadow-[0_12px_32px_-12px_rgba(15,23,42,0.1)] transition-all duration-300 group overflow-hidden flex flex-col justify-between"
              >
                {/* Watermark number */}
                <div
                  aria-hidden="true"
                  className="absolute top-4 right-5 font-sora font-extrabold text-4xl text-[#0f172a]/5 leading-none select-none pointer-events-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="relative z-10 flex flex-col gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] group-hover:bg-[#ecfccb] group-hover:border-[#7CFF4F]/60 flex items-center justify-center text-[#0f172a] group-hover:text-[#2d6a0a] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sora font-bold text-[#0f172a] text-base sm:text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[#475569] text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
