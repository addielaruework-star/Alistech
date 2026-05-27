import type { Metadata } from "next";
import { CORE_SERVICES, ADDITIONAL_SERVICES } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";
import Button from "@/components/ui/Button";
import CTASection from "@/components/home/CTASection";
import TechStackSection from "@/components/home/TechStackSection";
import {
  Globe, Briefcase, LayoutDashboard, Bot, AppWindow,
  Server, Link2, ShieldCheck, BarChart2, Rocket,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore AlisTech's services — website development, SaaS platforms, AI automation, and ongoing support for growing businesses.",
};

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe, Briefcase, LayoutDashboard, Bot, AppWindow,
  Server, Link: Link2, ShieldCheck, BarChart2, Rocket,
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-14 bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
        <div className="section-container relative z-10 text-center">
          <SectionHeading
            eyebrow="Services"
            title="What We "
            highlight="Build"
            subtitle="From simple websites to full SaaS platforms — we build what your business needs, at the right scale."
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-bg-primary to-transparent" />
      </section>

      {/* Core services */}
      <section className="py-16 bg-bg-primary">
        <div className="section-container">
          <h2 className="font-sora font-bold text-white text-2xl mb-2">Core Services</h2>
          <p className="text-gray-400 mb-8 max-w-lg text-sm leading-relaxed">
            Our main offerings — built for businesses that want clean, scalable, high-quality digital products.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CORE_SERVICES.map((service, i) => {
              const Icon = ICON_MAP[service.icon] ?? Globe;
              return (
                <GlowCard key={service.title} delay={i * 0.07}>
                  <div className="flex flex-col gap-4">
                    <div className="w-11 h-11 rounded-xl bg-blue-600/12 border border-blue-500/22 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="font-sora font-bold text-white text-lg">{service.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                    <Button variant="ghost" size="sm" href="/contact">
                      Get a Quote →
                    </Button>
                  </div>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support services */}
      <section className="py-14 bg-bg-secondary border-t border-white/5">
        <div className="section-container">
          <h2 className="font-sora font-bold text-white text-2xl mb-2">Support Services</h2>
          <p className="text-gray-400 mb-8 max-w-lg text-sm leading-relaxed">
            Everything around your core project — hosting, domains, maintenance, and deployment.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADDITIONAL_SERVICES.map((service, i) => {
              const Icon = ICON_MAP[service.icon] ?? Rocket;
              return (
                <GlowCard key={service.title} delay={i * 0.06} glowColor="rgba(80,80,80,0.08)">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-sora font-semibold text-white text-sm mb-1">{service.title}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </section>

      <TechStackSection />
      <CTASection />
    </>
  );
}
