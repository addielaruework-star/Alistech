import type { Metadata } from "next";
import { VALUE_CARDS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/home/CTASection";
import { Heart, Target, Lightbulb, Zap, Code2, Bot, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "AlisTech is a remote-first digital agency building modern websites, platforms, and AI tools for businesses worldwide.",
};

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Code2,
  Bot,
  TrendingUp,
};

const VALUES = [
  { icon: Heart, title: "Client-First", description: "We take time to understand your goals before writing a single line of code." },
  { icon: Target, title: "Results-Driven", description: "We focus on outcomes that matter to your business, not just delivering files." },
  { icon: Lightbulb, title: "Keep Learning", description: "We stay current with modern tools and approaches so our work stays relevant." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-16 bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full bg-[#bef264]/15 blur-[100px] pointer-events-none" />
        <div className="section-container relative z-10 text-center">
          <SectionHeading
            eyebrow="About Us"
            title="A Small Team That Cares About "
            highlight="Good Work"
            subtitle="Based in Charminar, Hyderabad, we build websites, apps, AI tools and automation for businesses, and we teach the same skills to students and professionals."
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-bg-primary to-transparent" />
      </section>

      {/* Story */}
      <section className="py-16 bg-bg-primary">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div className="flex flex-col gap-5 text-[#475569] text-base leading-relaxed">
              <h2 className="font-sora font-bold text-[#0f172a] text-3xl">Our Story</h2>
              <p>
                AlisTech started with a simple goal: help businesses get a proper digital presence without agency overhead and big promises.
              </p>
              <p>
                We are a small team of developers and designers. We care about the details: clean code, thoughtful design and honest communication on every project.
              </p>
              <p>
                Today we build websites, mobile apps, business software, AI solutions, WhatsApp and business automation, reports and dashboards, and online payments. We also teach Python, data science, machine learning, generative AI and AI agents.
              </p>

              {/* Built With Purpose block */}
              <div className="mt-2 card-v2 p-5">
                <h3 className="font-sora font-bold text-[#0f172a] text-lg mb-1.5">Built With Purpose</h3>
                <p className="text-[#475569] text-sm leading-relaxed">
                  We are a small team that builds modern digital products to help businesses grow online. Not sure what you need? Share your business problem with us and we will suggest the right solution. Call or WhatsApp 9603337862.
                </p>
              </div>
            </div>

            {/* Value cards */}
            <div className="grid grid-cols-2 gap-4">
              {VALUE_CARDS.map(({ icon, title, description }, i) => {
                const Icon = ICON_MAP[icon] ?? Zap;
                const isSlate = i % 2 === 1;
                return (
                  <div
                    key={title}
                    className="card-v2 p-5 hover:border-[#334155] transition-all duration-300 flex flex-col gap-3"
                  >
                    <div className={`gem ${isSlate ? "teal" : ""}`} aria-hidden="true">
                      <Icon />
                    </div>
                    <div className="font-sora font-bold text-[#0f172a] text-sm">{title}</div>
                    <p className="text-[#475569] text-xs leading-relaxed">{description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-bg-secondary border-t border-[#dde4ec]">
        <div className="section-container">
          <SectionHeading eyebrow="Our Values" title="What We " highlight="Stand For" className="mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {VALUES.map(({ icon: Icon, title, description }, i) => {
              const isSlate = i % 2 === 1;
              return (
                <div
                  key={title}
                  className="card-v2 p-5 hover:border-[#334155] transition-all duration-300 flex flex-col gap-4"
                >
                  <div className={`gem ${isSlate ? "teal" : ""}`} aria-hidden="true">
                    <Icon />
                  </div>
                  <h3 className="font-sora font-bold text-[#0f172a] text-lg">{title}</h3>
                  <p className="text-[#475569] text-sm leading-relaxed">{description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
