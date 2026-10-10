import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import BodyScopeProvider from "@/components/layout/BodyScopeProvider";
import { Toaster } from "sonner";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "AlisTech | Modern Digital Solutions",
    template: "%s | AlisTech",
  },
  description:
    "AlisTech builds modern websites, startup MVPs, admin dashboards, business solutions, and digital platforms with fast deployment and professional design.",
  keywords: [
    "web development",
    "digital agency",
    "Next.js",
    "website design",
    "AI integration",
    "SaaS development",
  ],
  authors: [{ name: "AlisTech" }],
  creator: "AlisTech",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alistech.dev",
    siteName: "AlisTech",
    title: "AlisTech — Modern Digital Agency",
    description: "Modern websites, platforms, and AI tools for businesses worldwide.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AlisTech — Modern Digital Agency",
    description: "Modern websites, platforms, and AI tools for businesses worldwide.",
    creator: "@alistech",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sora.variable} ${inter.variable}`}>
      <body
        suppressHydrationWarning
        className="font-inter antialiased bg-bg-primary text-ink overflow-x-hidden"
      >
        {/* Sets data-scope="dark" and data-admin on body based on pathname (client-only) */}
        <BodyScopeProvider />
        {/* Navbar/Footer/WhatsApp are hidden on admin routes via CSS [data-admin] selector */}
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <Toaster richColors position="top-right" theme="light" />
      </body>
    </html>
  );
}
