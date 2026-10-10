import type { Metadata } from "next";
import { CORE_SERVICES, ADDITIONAL_SERVICES } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import CTASection from "@/components/home/CTASection";
import TechStackSection from "@/components/home/TechStackSection";
import {
  Globe,
  Briefcase,
  LayoutDashboard,
  Bot,
  AppWindow,
  Server,
  Link2,
  ShieldCheck,
  BarChart2,
  Rocket,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore AlisTech's services — website development, SaaS platforms, AI automation, and ongoing support for growing businesses.",
};

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Briefcase,
  LayoutDashboard,
  Bot,
  AppWindow,
  Server,
  Link: Link2,
  ShieldCheck,
  BarChart2,
  Rocket,
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-14 bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] rounded-full bg-[#bef264]/15 blur-[100px] pointer-events-none" />
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
          <h2 className="font-sora font-bold text-[#0f172a] text-2xl mb-2">Core Services</h2>
          <p className="text-[#475569] mb-8 max-w-lg text-sm leading-relaxed">
            Our main offerings — built for businesses that want clean, scalable, high-quality digital products.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CORE_SERVICES.map((service, i) => {
              const Icon = ICON_MAP[service.icon] ?? Globe;
              const isSlate = i % 2 === 1;
              return (
                <div
                  key={service.title}
                  className="card-v2 p-5 flex flex-col justify-between gap-4 hover:border-[#334155] transition-all duration-300"
                >
                  <div className="flex flex-col gap-4">
                    <div className={`gem ${isSlate ? "teal" : ""}`} aria-hidden="true">
                      <Icon />
                    </div>
                    <h3 className="font-sora font-bold text-[#0f172a] text-lg">{service.title}</h3>
                    <p className="text-[#475569] text-sm leading-relaxed">{service.description}</p>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm" href="/contact">
                      Get a Quote →
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support services */}
      <section className="py-14 bg-bg-secondary border-t border-[#dde4ec]">
        <div className="section-container">
          <h2 className="font-sora font-bold text-[#0f172a] text-2xl mb-2">Support Services</h2>
          <p className="text-[#475569] mb-8 max-w-lg text-sm leading-relaxed">
            Everything around your core project — hosting, domains, maintenance, and deployment.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADDITIONAL_SERVICES.map((service, i) => {
              const Icon = ICON_MAP[service.icon] ?? Rocket;
              const isSlate = (i + 1) % 2 === 1;
              return (
                <div
                  key={service.title}
                  className="card-v2 p-5 flex items-start gap-4 hover:border-[#334155] transition-all duration-300"
                >
                  <div className={`gem ${isSlate ? "teal" : ""}`} aria-hidden="true">
                    <Icon />
                  </div>
                  <div>
                    <h3 className="font-sora font-semibold text-[#0f172a] text-sm mb-1">{service.title}</h3>
                    <p className="text-[#475569] text-xs leading-relaxed">{service.description}</p>
                  </div>
                </div>
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
