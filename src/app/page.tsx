import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";

import NearViewport from "@/components/ui/NearViewport";

// Below-the-fold sections: lazy-loaded so they don't add to first-paint JS
const CoursesSection   = dynamic(() => import("@/components/home/CoursesSection"),   { ssr: true });
const FeaturedProjects = dynamic(() => import("@/components/home/FeaturedProjects"), { ssr: false });
const TechStackSection = dynamic(() => import("@/components/home/TechStackSection"), { ssr: true });
const WhyChooseUs      = dynamic(() => import("@/components/home/WhyChooseUs"),      { ssr: true });
const ProcessSection   = dynamic(() => import("@/components/home/ProcessSection"),   { ssr: true });
const TestimonialsSection = dynamic(() => import("@/components/home/TestimonialsSection"), { ssr: false });
const FAQSection       = dynamic(() => import("@/components/home/FAQSection"),       { ssr: true });
const CTASection       = dynamic(() => import("@/components/home/CTASection"),       { ssr: true });

export const metadata: Metadata = {
  title: "AlisTech | Modern Digital Solutions",
  description:
    "AlisTech builds modern websites, startup MVPs, admin dashboards, business solutions, and digital platforms with fast deployment and professional design.",
};

export default function HomePage() {
  return (
    <>
      {/* Above the fold — always server-rendered, no dynamic import */}
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      {/* Below the fold — lazy loaded */}
      <CoursesSection />
      <NearViewport minHeight="500px">
        <FeaturedProjects />
      </NearViewport>
      <TechStackSection />
      <WhyChooseUs />
      <ProcessSection />
      <NearViewport minHeight="450px">
        <TestimonialsSection />
      </NearViewport>
      <FAQSection />
      <CTASection />
    </>
  );
}
