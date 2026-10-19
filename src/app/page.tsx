import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
import DomainsSection from "@/components/home/DomainsSection";
import ServicesSection from "@/components/home/ServicesSection";

import NearViewport from "@/components/ui/NearViewport";

// Below-the-fold sections: lazy-loaded so they don't add to first-paint JS
const FeaturedProjects = dynamic(() => import("@/components/home/FeaturedProjects"), { ssr: false });
const WhyChooseUs      = dynamic(() => import("@/components/home/WhyChooseUs"),      { ssr: true });
const ProcessSection   = dynamic(() => import("@/components/home/ProcessSection"),   { ssr: true });
const CoursesSection   = dynamic(() => import("@/components/home/CoursesSection"),   { ssr: true });
const TestimonialsSection = dynamic(() => import("@/components/home/TestimonialsSection"), { ssr: false });
const FAQSection       = dynamic(() => import("@/components/home/FAQSection"),       { ssr: true });
const CTASection       = dynamic(() => import("@/components/home/CTASection"),       { ssr: true });

export const metadata: Metadata = {
  title: "AlisTech | We Make Your Work Easier",
  description:
    "AlisTech builds modern websites, apps, business software and smart tools that save you time, cut repetitive manual tasks, and help your business grow smoothly.",
};

export default function HomePage() {
  return (
    <>
      {/* Above the fold & primary interactive overview */}
      <HeroSection />
      <DomainsSection />
      <ServicesSection />

      {/* Dynamic Projects Showcase from Firestore */}
      <NearViewport minHeight="500px">
        <FeaturedProjects />
      </NearViewport>

      {/* Value Proposition & Workflow */}
      <WhyChooseUs />
      <ProcessSection />

      {/* Educational Courses & AI training */}
      <CoursesSection />

      {/* Client Reviews from Firestore */}
      <NearViewport minHeight="450px">
        <TestimonialsSection />
      </NearViewport>

      {/* FAQ & Final Consultation CTA */}
      <FAQSection />
      <CTASection />
    </>
  );
}
