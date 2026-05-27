"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { LayoutDashboard, Inbox, LogOut, Zap, Menu, X, Briefcase, Star, Settings } from "lucide-react";

/* ── Sidebar links ────────────────────────────────────────────────────────── */
const NAV = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: Inbox },
  { label: "Projects", href: "/admin/projects", icon: Briefcase },
  { label: "Reviews", href: "/admin/reviews", icon: Star },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

/* ── Inner shell (needs auth context) ─────────────────────────────────────── */
function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  /* Redirect logic — role-aware ───────────────────────────────────────────
     State machine:
     1. loading  → hold, show loader
     2. no user  → if on login page: show login; else redirect to login
     3. user but NOT admin → show access denied (never redirect to dashboard)
     4. user + admin + on login page → redirect to dashboard
     5. user + admin + on protected page → render dashboard shell
  ──────────────────────────────────────────────────────────────────────── */
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

  return (
    <div className="flex h-screen bg-[#050508] overflow-hidden text-white font-inter">
      {/* ── Sidebar (desktop) ──────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-[240px] border-r border-white/[0.06] bg-[#08080d]">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-6 h-16 border-b border-white/[0.06]">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shadow-[0_0_16px_rgba(37,99,235,0.4)]">
            <Zap className="w-3.5 h-3.5 text-white" fill="white" />
          </div>
          <span className="font-sora font-bold text-sm text-white">
            Alis<span className="text-blue-400">Tech</span>
          </span>
          <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider text-white/25 border border-white/10 px-1.5 py-0.5 rounded">
            Admin
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  active
                    ? "text-white bg-white/[0.07] border border-white/[0.08]"
                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.03] border border-transparent"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/[0.06]">
          <button
            onClick={() => signOut()}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/30 hover:text-red-400 hover:bg-red-500/[0.06] transition-all duration-150 w-full border border-transparent"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* ── Mobile sidebar overlay ─────────────────────────────────── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative w-[260px] h-full flex flex-col bg-[#08080d] border-r border-white/[0.06]">
            <div className="flex items-center justify-between px-5 h-16 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-white" fill="white" />
                </div>
                <span className="font-sora font-bold text-sm text-white">
                  Alis<span className="text-blue-400">Tech</span>
                </span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-white/40 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
              {NAV.map(({ label, href, icon: Icon }) => {
                const active = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                      active
                        ? "text-white bg-white/[0.07]"
                        : "text-white/40 hover:text-white/70 hover:bg-white/[0.03]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                );
              })}
            </nav>
            <div className="px-3 py-4 border-t border-white/[0.06]">
              <button
                onClick={() => signOut()}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/30 hover:text-red-400 hover:bg-red-500/[0.06] transition-all w-full"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ── Main area ──────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="flex items-center h-16 px-6 border-b border-white/[0.06] bg-[#08080d]/80 backdrop-blur-xl flex-shrink-0">
          <button
            className="lg:hidden text-white/50 hover:text-white mr-4 p-1"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-sora font-semibold text-sm text-white/80 capitalize">
            {pathname.split("/").pop()?.replace(/[^a-zA-Z]/g, " ") || "Admin"}
          </h1>
          <div className="ml-auto flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-[11px] font-bold text-blue-400">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
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
    <div className="h-screen w-full flex items-center justify-center bg-[#050508] relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[200px] rounded-full bg-red-600/5 blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-5 text-center px-6 max-w-sm">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <Zap className="w-6 h-6 text-red-400" />
        </div>

        <div>
          <h1 className="font-sora font-bold text-lg text-white mb-2">
            Access Denied
          </h1>
          <p className="text-sm text-white/40 leading-relaxed">
            <span className="text-white/60">{email}</span> does not have admin
            permissions. Contact the system administrator.
          </p>
        </div>

        <button
          onClick={onSignOut}
          className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white/60 border border-white/[0.08] hover:text-white hover:bg-white/[0.05] transition-all"
        >
          Sign Out
        </button>

        <p className="text-[10px] text-white/15 uppercase tracking-widest">
          AlisTech Internal · Restricted
        </p>
      </div>
    </div>
  );
}

/* ── Premium Vercel/Supabase-style minimal loader ────────────────────────── */
function AdminLoader({ label = "Loading dashboard..." }: { label?: string }) {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#050508] relative overflow-hidden">
      {/* Background glow overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-blue-600/5 blur-[90px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="flex flex-col items-center gap-5 relative z-10">
        {/* Logo and breathing animation wrapper */}
        <div className="relative flex items-center justify-center w-16 h-16">
          {/* Animated Pulsing Outer Glow Ring */}
          <div className="absolute inset-0 rounded-2xl bg-blue-600/10 border border-blue-500/30 animate-ping opacity-75 scale-90" style={{ animationDuration: "2s" }} />
          
          {/* Main Logo Container */}
          <div className="relative w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.45)] border border-blue-400/20">
            <Zap className="w-5 h-5 text-white" fill="white" />
          </div>
        </div>

        {/* Minimal loading text with subtle shimmer/pulse effect */}
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-white/70 text-xs font-medium tracking-wide animate-pulse">
            {label}
          </p>
          <span className="text-[10px] text-white/20 uppercase tracking-widest font-semibold font-sora">
            AlisTech Internal
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
