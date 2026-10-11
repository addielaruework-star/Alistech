"use client";

import ServiceRing from "./ServiceRing";
import Button from "@/components/ui/Button";
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
import { ADDITIONAL_SERVICES, SERVICES_SUBTITLE } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";

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

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-28 bg-bg-secondary overflow-hidden">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#dde4ec] to-transparent" />
      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#dde4ec] to-transparent" />

      {/* Radial glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] -translate-y-1/2 rounded-full bg-[#bef264]/15 blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Heading */}
        <SectionHeading
          eyebrow="What We Do"
          title="Services That "
          highlight="Scale"
          subtitle={SERVICES_SUBTITLE}
          className="mb-10"
        />

        {/* 3D Service Ring — primary interactive showcase */}
        <div className="mb-6">
          <p className="text-center text-xs text-[#94a3b8] mb-4 uppercase tracking-widest font-semibold select-none">
            Drag to explore · 12 services
          </p>
          <ServiceRing />
          <div className="mt-8 flex justify-center">
            <Button variant="secondary" href="/services">
              View all services →
            </Button>
          </div>
        </div>

        {/* Additional services — 6 items */}
        <div className="mt-14">
          <h3 className="text-xs font-semibold text-[#475569] uppercase tracking-widest mb-6">
            Additional Support
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 perspective-grid">
            {ADDITIONAL_SERVICES.map((service, i) => {
              const Icon = ICON_MAP[service.icon] ?? Rocket;
              const isSlate = (i + 1) % 2 === 1;
              return (
                <div
                  key={service.title}
                  className="rv tilt card-v2 p-5 flex flex-col gap-3 hover:border-[#334155] transition-all duration-300"
                  style={{ ["--rv-delay" as string]: `${(i % 4) * 80}ms` }}
                >
                  <div className={`gem ${isSlate ? "teal" : ""}`} aria-hidden="true">
                    <Icon />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0f172a] text-sm mb-1">{service.title}</div>
                    <div className="text-[#475569] text-xs leading-relaxed">{service.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
