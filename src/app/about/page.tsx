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
  Zap, Code2, Bot, TrendingUp,
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
        <div className="section-container relative z-10 text-center">
          <SectionHeading
            eyebrow="About Us"
            title="A Small Team That Cares About "
            highlight="Good Work"
            subtitle="We build websites, platforms, and digital tools — with a focus on quality, clarity, and long-term value."
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-bg-primary to-transparent" />
      </section>

      {/* Story */}
      <section className="py-16 bg-bg-primary">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div className="flex flex-col gap-5 text-gray-400 text-lg leading-relaxed">
              <h2 className="font-sora font-bold text-white text-3xl">Our Story</h2>
              <p>
                AlisTech started with a straightforward goal: help businesses build a proper
                digital presence without the bloated agency overhead and inflated promises.
              </p>
              <p>
                We&apos;re a remote-first team of developers and designers who care about the
                details — clean code, thoughtful design, and honest communication throughout
                every project.
              </p>
              <p>
                We work with startups, local businesses, personal brands, and growing companies
                who want a reliable team to build and maintain their digital products.
              </p>

              {/* Built With Purpose block */}
              <div className="mt-2 glass-card rounded-2xl p-6 border border-white/5 flex items-start gap-4">
                <div className="text-2xl flex-shrink-0">🛠</div>
                <div>
                  <h3 className="font-sora font-bold text-white text-lg mb-1.5">Built With Purpose</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Founded by a small team of developers and designers focused on building modern
                    digital experiences that help businesses grow online.
                  </p>
                </div>
              </div>
            </div>

            {/* Value cards */}
            <div className="grid grid-cols-2 gap-4">
              {VALUE_CARDS.map(({ icon, title, description }, i) => {
                const Icon = ICON_MAP[icon] ?? Zap;
                return (
                  <div key={title} className="glass-card rounded-2xl p-5 border border-white/5 hover:border-blue-500/18 transition-all duration-300 flex flex-col gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-600/12 border border-blue-500/18 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="font-sora font-bold text-white text-sm">{title}</div>
                    <p className="text-gray-500 text-xs leading-relaxed">{description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-bg-secondary border-t border-white/5">
        <div className="section-container">
          <SectionHeading eyebrow="Our Values" title="What We " highlight="Stand For" className="mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="glass-card rounded-2xl p-6 border border-white/5 hover:border-blue-500/18 transition-all duration-300 flex flex-col gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-600/12 border border-blue-500/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-sora font-bold text-white text-lg">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
