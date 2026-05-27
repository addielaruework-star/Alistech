"use client";

import { Zap, Twitter, Instagram, Linkedin, Github, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { NAV_LINKS, WHATSAPP_URL } from "@/lib/constants";
import { MessageCircle } from "lucide-react";

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
  const year = new Date().getFullYear();

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
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              A remote-first digital agency building modern websites, platforms, and AI tools for businesses worldwide.
            </p>
            {/* Social icons — visible but not linked until accounts are ready */}
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
                <a href="mailto:hello@alistech.dev" className="flex items-center gap-2.5 text-gray-400 hover:text-white text-sm transition-colors group">
                  <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  hello@alistech.dev
                </a>
              </li>
              <li>
                <a href={WHATSAPP_URL} className="flex items-center gap-2.5 text-gray-400 hover:text-white text-sm transition-colors group">
                  <MessageCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  WhatsApp Chat
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2.5 text-gray-500 text-sm">
                  <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  Remote · Global
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-7 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {year} AlisTech. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm">
            Flexible pricing for startups and growing businesses.
          </p>
        </div>
      </div>
    </footer>
  );
}
