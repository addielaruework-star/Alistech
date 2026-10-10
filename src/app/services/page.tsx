import type { Metadata } from "next";
import { CORE_SERVICES, ADDITIONAL_SERVICES, SERVICES_SUBTITLE } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/home/CTASection";
import TechStackSection from "@/components/home/TechStackSection";
import {
  Globe,
  Smartphone,
  LayoutDashboard,
  Bot,
  MessageCircle,
  Zap,
  BarChart2,
  BookOpen,
  FileText,
  Database,
  CreditCard,
  Wrench,
  Server,
  Link2,
  ShieldCheck,
  Rocket,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore AlisTech's services — websites, apps, AI solutions, automation, and more for everyday business problems.",
};

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Smartphone,
  LayoutDashboard,
  Bot,
  MessageCircle,
  Zap,
  BarChart2,
  BookOpen,
  FileText,
  Database,
  CreditCard,
  Wrench,
  Server,
  Link: Link2,
  ShieldCheck,
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
            subtitle={SERVICES_SUBTITLE}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-bg-primary to-transparent" />
      </section>

      {/* Core services — 12 */}
      <section className="py-16 bg-bg-primary">
        <div className="section-container">
          <h2 className="font-sora font-bold text-[#0f172a] text-2xl mb-2">Core Services</h2>
          <p className="text-[#475569] mb-8 max-w-lg text-sm leading-relaxed">
            Websites, apps, AI and automation — built for everyday business problems.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CORE_SERVICES.map((service, i) => {
              const Icon = ICON_MAP[service.icon] ?? Globe;
              const isSlate = i % 2 === 1;
              return (
                <div
                  key={service.title}
                  className="card-v2 p-5 flex flex-col gap-4 hover:border-[#334155] transition-all duration-300"
                >
                  {/* Number + Icon */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-[#3f6212]">
                      {service.number}
                    </span>
                    <div className={`gem ${isSlate ? "teal" : ""}`} aria-hidden="true">
                      <Icon />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-sora font-bold text-[#0f172a] text-lg mb-1">
                      {service.title}
                    </h3>
                    <p className="text-[#475569] text-sm leading-relaxed">{service.description}</p>
                  </div>

                  {/* How it helps you */}
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#475569] mb-2">
                      How it helps you
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {service.howItHelps.map((line) => (
                        <li key={line} className="flex items-start gap-2 text-xs text-[#0f172a]">
                          <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-[#84cc16] flex-shrink-0" />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#3f6212] hover:text-[#1a2e05] hover:underline mt-auto"
                    href={`https://wa.me/919603337862?text=${encodeURIComponent(
                      `Hi AlisTech, I want to know about: ${service.title}`
                    )}`}
                    target="_blank"
                    rel="noopener"
                  >
                    Ask about this service <span aria-hidden="true">↗</span>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support services — 6 */}
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
                    <h3 className="font-sora font-semibold text-[#0f172a] text-sm mb-1">
                      {service.title}
                    </h3>
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
