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
          subtitle="From a simple landing page to a full AI-powered platform — we have everything your business needs to dominate digitally."
          className="mb-16"
        />

        {/* Core services */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-[#3f6212] uppercase tracking-widest mb-6">
            Core Services
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CORE_SERVICES.map((service, i) => {
              const Icon = ICON_MAP[service.icon] ?? Globe;
              const isSlate = i % 2 === 1;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="card-v2 p-5 flex flex-col justify-between gap-4 group hover:border-[#334155] transition-all duration-300"
                >
                  <div className="flex flex-col gap-4">
                    <div className={`gem ${isSlate ? "teal" : ""}`} aria-hidden="true">
                      <Icon />
                    </div>
                    <div>
                      <h4 className="font-sora font-bold text-[#0f172a] text-lg mb-2">
                        {service.title}
                      </h4>
                      <p className="text-[#475569] text-sm leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                  <span className="inline-flex w-fit items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#ecfccb] text-[#3f6212] border border-[#bef264]">
                    {service.tag}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Additional services */}
        <div className="mt-14">
          <h3 className="text-xs font-semibold text-[#475569] uppercase tracking-widest mb-6">
            Additional Support
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {ADDITIONAL_SERVICES.map((service, i) => {
              const Icon = ICON_MAP[service.icon] ?? Rocket;
              const isSlate = (i + 1) % 2 === 1;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  whileHover={{ y: -3 }}
                  className="card-v2 p-5 flex flex-col gap-3 hover:border-[#334155] transition-all duration-300"
                >
                  <div className={`gem ${isSlate ? "teal" : ""}`} aria-hidden="true">
                    <Icon />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0f172a] text-sm mb-1">{service.title}</div>
                    <div className="text-[#475569] text-xs leading-relaxed">{service.description}</div>
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
