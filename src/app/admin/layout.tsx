"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Inbox,
  LogOut,
  Menu,
  X,
  Briefcase,
  Star,
  Settings,
  ShieldAlert,
  ExternalLink,
} from "lucide-react";

/* ── Sidebar links ────────────────────────────────────────────────────────── */
const NAV = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: Inbox },
  { label: "Projects", href: "/admin/projects", icon: Briefcase },
  { label: "Reviews", href: "/admin/reviews", icon: Star },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

/* ── Logo mark component ──────────────────────────────────────────────────── */
function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <div
      className="rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center border border-[#e2e8f0] bg-white shadow-2xs"
      style={{ width: size, height: size }}
    >
      <Image
        src="/alistech-official-logo.jpg"
        alt="AlisTech Logo"
        width={size}
        height={size}
        className="object-contain w-full h-full"
        priority
      />
    </div>
  );
}

/* ── Wordmark component ───────────────────────────────────────────────────── */
function Wordmark() {
  return (
    <div className="flex items-center gap-2">
      <span className="font-sora font-bold text-base text-[#0f172a] tracking-tight">
        Alis<span className="gradient-text font-extrabold">Tech</span>
      </span>
      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#0f172a]/5 text-[#0f172a] border border-[#0f172a]/10">
        CMS
      </span>
    </div>
  );
}

/* ── Inner shell (needs auth context) ─────────────────────────────────────── */
function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  /* Redirect logic — role-aware */
  useEffect(() => {
    if (loading) return;

    if (!user && !isLoginPage) {
      router.replace("/admin/login");
    } else if (user && isAdmin && isLoginPage) {
      router.replace("/admin/dashboard");
    } else if (user && !isAdmin && isLoginPage) {
      // Signed in but not admin — stay on login, they'll see denied state
    }
  }, [user, isAdmin, loading, isLoginPage, router]);

  // 1. Loading — hold everything
  if (loading) {
    return <AdminLoader label={isLoginPage ? "Verifying access..." : "Loading dashboard..."} />;
  }

  // 2. No user at all
  if (!user) {
    if (isLoginPage) return <>{children}</>;
    return <AdminLoader label="Redirecting to login..." />;
  }

  // 3. Authenticated but NOT admin — hard block
  if (!isAdmin) {
    return <AccessDenied onSignOut={signOut} email={user.email ?? ""} />;
  }

  // 4. Admin on login page — redirect in progress
  if (isLoginPage) {
    return <AdminLoader label="Access granted. Redirecting..." />;
  }

  const pageTitle =
    NAV.find((item) => pathname.startsWith(item.href))?.label ||
    (pathname.split("/").pop()?.replace(/[^a-zA-Z]/g, " ") || "Admin");

  return (
    <div className="flex h-screen bg-[#f8fafc] text-[#0f172a] overflow-hidden font-inter selection:bg-[#7CFF4F] selection:text-[#0f172a]">
      {/* ── Sidebar (desktop) ──────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-[260px] border-r border-[#e2e8f0] bg-white flex-shrink-0 z-30">
        {/* Logo Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-[#e2e8f0]">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <LogoMark size={32} />
            <Wordmark />
          </Link>
        </div>

        {/* Nav links */}
        <nav data-admin-nav className="flex-1 px-3 py-5 flex flex-col gap-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-[#94a3b8]">
            Management
          </div>
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  active
                    ? "text-[#0f172a] bg-[#f1f5f9] font-semibold border border-[#e2e8f0] shadow-2xs"
                    : "text-[#64748b] hover:text-[#0f172a] hover:bg-[#f8fafc]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      active ? "text-[#0f172a]" : "text-[#64748b]"
                    }`}
                  />
                  <span>{label}</span>
                </div>
                {active && (
                  <span className="w-1.5 h-4 rounded-full bg-[#7CFF4F]" aria-hidden="true" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer with Account & Logout */}
        <div className="p-3 border-t border-[#e2e8f0] bg-[#f8fafc]/50 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-[#64748b] hover:text-[#0f172a] hover:bg-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#94a3b8]" />
              <span>Public Website</span>
            </span>
            <span className="text-[10px] text-[#94a3b8]">↗</span>
          </Link>

          <div className="flex items-center justify-between px-2 pt-2 border-t border-[#e2e8f0]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#0f172a] text-[#7CFF4F] font-sora font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                {user?.email ? user.email[0].toUpperCase() : "A"}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#0f172a] truncate">Admin</p>
                <p className="text-[11px] text-[#64748b] truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              title="Sign Out"
              className="p-1.5 rounded-lg text-[#64748b] hover:text-red-600 hover:bg-red-50 transition-colors"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Mobile sidebar overlay ─────────────────────────────────── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-xs"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative w-[270px] h-full flex flex-col bg-white border-r border-[#e2e8f0] shadow-xl">
            <div className="flex items-center justify-between px-5 h-16 border-b border-[#e2e8f0]">
              <div className="flex items-center gap-2.5">
                <LogoMark size={32} />
                <Wordmark />
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-[#64748b] hover:text-[#0f172a] p-1.5 rounded-lg hover:bg-[#f1f5f9]"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav data-admin-nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
              <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-[#94a3b8]">
                Management
              </div>
              {NAV.map(({ label, href, icon: Icon }) => {
                const active = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                      active
                        ? "text-[#0f172a] bg-[#f1f5f9] font-semibold border border-[#e2e8f0]"
                        : "text-[#64748b] hover:text-[#0f172a] hover:bg-[#f8fafc]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-[#0f172a]" />
                      <span>{label}</span>
                    </div>
                    {active && <span className="w-1.5 h-4 rounded-full bg-[#7CFF4F]" />}
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-[#e2e8f0] bg-[#f8fafc]/50">
              <button
                onClick={() => signOut()}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-all w-full"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ── Main area ──────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 border-b border-[#e2e8f0] bg-white/90 backdrop-blur-md flex-shrink-0 z-20">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-[#64748b] hover:text-[#0f172a] p-1.5 rounded-lg hover:bg-[#f1f5f9] transition-colors"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-sora font-bold text-base sm:text-lg text-[#0f172a] capitalize tracking-tight">
              {pageTitle}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>CMS Active</span>
            </div>
            <Link
              href="/"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium text-[#64748b] hover:text-[#0f172a] px-3 py-1.5 rounded-lg hover:bg-[#f1f5f9] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </Link>
            <div className="h-5 w-px bg-[#e2e8f0] hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#0f172a] text-[#7CFF4F] font-sora font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                {user?.email ? user.email[0].toUpperCase() : "A"}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-[#0f172a] leading-tight">
                  {user?.email?.split("@")[0] || "Admin"}
                </p>
                <span className="text-[10px] text-[#64748b]">Authorized</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

/* ── Access Denied screen ────────────────────────────────────────────────── */
function AccessDenied({
  onSignOut,
  email,
}: {
  onSignOut: () => void;
  email: string;
}) {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#f8fafc] text-[#0f172a] p-6 font-inter">
      <div className="w-full max-w-md bg-white border border-[#e2e8f0] rounded-2xl p-8 shadow-sm text-center flex flex-col items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center">
          <ShieldAlert className="w-7 h-7 text-red-600" />
        </div>
        <div>
          <h1 className="font-sora font-bold text-xl text-[#0f172a] mb-2">Access Denied</h1>
          <p className="text-sm text-[#64748b] leading-relaxed">
            <span className="font-semibold text-[#0f172a]">{email}</span> does not have admin permissions in Firestore.
          </p>
        </div>
        <div className="w-full p-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-xs text-[#64748b] text-left">
          <p className="font-semibold text-[#0f172a] mb-1">Authorization required:</p>
          <p>
            Please configure your authenticated account UID in Firestore under the <code className="bg-[#e2e8f0] px-1 py-0.5 rounded text-[11px] text-[#0f172a]">users</code> collection with <code className="bg-[#e2e8f0] px-1 py-0.5 rounded text-[11px] text-[#0f172a]">role: &quot;admin&quot;</code>.
          </p>
        </div>
        <button
          onClick={onSignOut}
          className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs bg-[#0f172a] text-white hover:bg-[#1e293b] transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

/* ── Minimal Light Loader ────────────────────────────────────────────────── */
function AdminLoader({ label = "Loading dashboard..." }: { label?: string }) {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#f8fafc] relative overflow-hidden font-inter">
      <div className="flex flex-col items-center gap-5 relative z-10">
        <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[#e2e8f0] shadow-xs bg-white p-2 flex items-center justify-center">
          <Image
            src="/alistech-official-logo.jpg"
            alt="AlisTech"
            width={48}
            height={48}
            className="object-contain w-full h-full"
            priority
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-5 h-5 border-2 border-[#0f172a]/20 border-t-[#0f172a] rounded-full animate-spin" />
          <p className="text-[#0f172a] text-xs font-semibold tracking-wide">{label}</p>
          <span className="text-[10px] text-[#94a3b8] uppercase tracking-widest font-semibold font-sora">
            AlisTech CMS
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Layout export ─────────────────────────────────────────────────────────── */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminShell>{children}</AdminShell>
    </AuthProvider>
  );
}
