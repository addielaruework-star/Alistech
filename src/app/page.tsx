import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import TechStackSection from "@/components/home/TechStackSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ProcessSection from "@/components/home/ProcessSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "AlisTech | Modern Digital Solutions",
  description:
    "AlisTech builds modern websites, startup MVPs, admin dashboards, business solutions, and digital platforms with fast deployment and professional design.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <FeaturedProjects />
      <TechStackSection />
      <WhyChooseUs />
      <ProcessSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
