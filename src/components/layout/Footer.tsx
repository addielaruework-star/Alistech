"use client";

import { Zap, Twitter, Instagram, Linkedin, Github, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import Link from "next/link";
import { NAV_LINKS, WHATSAPP_URL, PHONE_NUMBER, EMAIL_ADDRESS } from "@/lib/constants";

const SERVICES = [
  "Website Development",
  "Portfolio Development",
  "CMS & Admin Systems",
  "AI & Automation",
  "Platform Development",
];

const SOCIALS = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="relative bg-bg-primary border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full bg-blue-600/5 blur-[80px] pointer-events-none" />

      <div className="section-container py-14 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                <Zap className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="font-sora font-bold text-xl text-white">
                Alis<span className="text-blue-400">Tech</span>
              </span>
            </Link>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs uppercase tracking-wider font-semibold text-blue-400">Modern Digital Solutions</span>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                A remote-first digital agency building modern websites, startup MVPs, admin dashboards, and AI tools worldwide.
              </p>
            </div>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/8 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/15 transition-all duration-200"
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
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
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
            <ul className="flex flex-col gap-2.5">
              {SERVICES.map((s) => (
                <li key={s}>
                  <Link href="/services" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
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
            <ul className="flex flex-col gap-3">
              <li>
                <a href={`tel:${PHONE_NUMBER.replace(/\s+/g, "")}`} className="flex items-center gap-2.5 text-gray-400 hover:text-white text-sm transition-colors group">
                  <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  {PHONE_NUMBER}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL_ADDRESS}`} className="flex items-center gap-2.5 text-gray-400 hover:text-white text-sm transition-colors group">
                  <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  {EMAIL_ADDRESS}
                </a>
              </li>
              <li className="mt-1">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-7 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 AlisTech. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm">
            Flexible pricing for startups and growing businesses.
          </p>
        </div>
      </div>
    </footer>
  );
}
