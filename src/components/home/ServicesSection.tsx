"use client";

import { motion } from "framer-motion";
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
import { CORE_SERVICES, ADDITIONAL_SERVICES } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";

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

export default function ServicesSection() {
  return (
    <section className="relative py-28 bg-bg-secondary overflow-hidden">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      {/* Radial glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] -translate-y-1/2 rounded-full bg-blue-600/8 blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Heading */}
        <SectionHeading
          eyebrow="What We Do"
          title="Services That "
          highlight="Scale"
          subtitle="From a simple landing page to a full AI-powered platform — we have everything your business needs to dominate digitally."
          className="mb-16"
        />

        {/* Core services */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-6">
            Core Services
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CORE_SERVICES.map((service, i) => {
              const Icon = ICON_MAP[service.icon] ?? Globe;
              return (
                <GlowCard key={service.title} delay={i * 0.08}>
                  <div className="flex flex-col gap-4">
                    <div className="w-11 h-11 rounded-xl bg-blue-600/15 border border-blue-500/25 flex items-center justify-center group-hover:bg-blue-600/25 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-sora font-semibold text-white text-lg mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                    </div>
                    <span className="inline-flex w-fit items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {service.tag}
                    </span>
                  </div>
                </GlowCard>
              );
            })}
          </div>
        </div>

        {/* Additional services */}
        <div className="mt-12">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-6">
            Additional Support
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {ADDITIONAL_SERVICES.map((service, i) => {
              const Icon = ICON_MAP[service.icon] ?? Rocket;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  whileHover={{ y: -3 }}
                  className="glass-card rounded-xl p-5 flex flex-col gap-3 border border-white/5 hover:border-white/10 transition-all duration-300 cursor-default"
                >
                  <Icon className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-200 text-sm mb-1">{service.title}</div>
                    <div className="text-gray-500 text-xs leading-relaxed">{service.description}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
