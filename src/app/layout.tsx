import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { headers } from "next/headers";

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
    default: "AlisTech — Modern Digital Agency",
    template: "%s | AlisTech",
  },
  description:
    "AlisTech builds modern websites, platforms, and AI-powered tools for businesses worldwide. Fast delivery, clean code, real results.",
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

import { Toaster } from "sonner";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  /* Detect admin routes — skip public Navbar/Footer/WhatsApp */
  const headersList = await headers();
  const pathname = headersList.get("x-next-pathname") || "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body className="font-inter antialiased bg-bg-primary text-white overflow-x-hidden">
        {!isAdmin && <Navbar />}
        <main>{children}</main>
        {!isAdmin && <Footer />}
        {!isAdmin && <WhatsAppButton />}
        <Toaster richColors position="top-right" theme="dark" />
      </body>
    </html>
  );
}
