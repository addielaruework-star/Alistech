"use client";

import { Zap, Instagram, Linkedin, Mail, Phone, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  NAV_LINKS,
  WHATSAPP_URL,
  WHATSAPP_URL_2,
  PHONE_NUMBER,
  PHONE_NUMBER_2,
  EMAIL_ADDRESS,
  INSTAGRAM_URL,
  LINKEDIN_URL,
} from "@/lib/constants";

const SERVICES = [
  "Website",
  "Mobile App",
  "Business Software",
  "AI Solutions",
  "WhatsApp Automation",
];

const SOCIALS = [
  { icon: Instagram, href: INSTAGRAM_URL, label: "Instagram" },
  { icon: Linkedin, href: LINKEDIN_URL, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#0f172a] text-[#b2bdcc] border-t border-white/10 overflow-hidden">
      <div className="section-container py-14 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5 group w-fit" aria-label="AlisTech Home">
              <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-white border border-white/20 shadow-[0_0_14px_rgba(124,255,79,0.25)] shrink-0">
                <Image
                  src="/alistech-official-logo.jpg"
                  alt="AlisTech Logo"
                  width={32}
                  height={32}
                  className="object-contain w-full h-full rounded-md"
                />
              </div>
              <span className="font-sora font-bold text-xl text-white">
                Alis<span className="gradient-text font-extrabold">Tech</span>
              </span>
            </Link>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#bef264]">
                Modern Digital Solutions
              </span>
              <p className="text-[#b2bdcc] text-sm leading-relaxed max-w-xs">
                A remote-first digital agency building modern websites, startup MVPs, admin dashboards, and AI tools worldwide.
              </p>
            </div>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-[#b2bdcc] hover:text-white hover:border-white/30 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div className="flex flex-col gap-4">
            <h3 className="font-sora font-semibold text-white text-sm tracking-wider uppercase">
              Pages
            </h3>
            <ul className="flex flex-col gap-2.5 list-none p-0">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#b2bdcc] hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-4">
            <h3 className="font-sora font-semibold text-white text-sm tracking-wider uppercase">
              Services
            </h3>
            <ul className="flex flex-col gap-2.5 list-none p-0">
              {SERVICES.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-[#b2bdcc] hover:text-white text-sm transition-colors duration-200"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-sora font-semibold text-white text-sm tracking-wider uppercase">
              Contact
            </h3>
            <ul className="flex flex-col gap-3 list-none p-0">
              <li>
                <a
                  href={`tel:${PHONE_NUMBER.replace(/\s+/g, "")}`}
                  suppressHydrationWarning
                  className="flex items-center gap-2.5 text-[#b2bdcc] hover:text-white text-sm transition-colors group"
                >
                  <Phone className="w-4 h-4 text-[#bef264] flex-shrink-0" />
                  <span suppressHydrationWarning>{PHONE_NUMBER}</span>
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL_2}
                  target="_blank"
                  rel="noopener noreferrer"
                  suppressHydrationWarning
                  className="flex items-center gap-2.5 text-[#b2bdcc] hover:text-white text-sm transition-colors group"
                >
                  <MessageCircle className="w-4 h-4 text-[#84cc16] flex-shrink-0" />
                  <span suppressHydrationWarning>{PHONE_NUMBER_2}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  suppressHydrationWarning
                  className="flex items-center gap-2.5 text-[#b2bdcc] hover:text-white text-sm transition-colors group"
                >
                  <Mail className="w-4 h-4 text-[#bef264] flex-shrink-0" />
                  <span suppressHydrationWarning>{EMAIL_ADDRESS}</span>
                </a>
              </li>
              <li className="mt-1">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-[#1a2e05] bg-gradient-to-r from-[#bef264] to-[#84cc16] hover:brightness-105 rounded-full transition-all duration-300 shadow-md"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-7 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-[#b2bdcc]">
            © 2026 AlisTech. All rights reserved.
          </p>
          <p className="text-[#b2bdcc]">
            Flexible pricing for startups and growing businesses.
          </p>
        </div>
      </div>
    </footer>
  );
}
