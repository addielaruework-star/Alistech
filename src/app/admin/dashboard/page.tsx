"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/lib/auth-context";
import { motion } from "framer-motion";
import { fetchLeads } from "@/lib/firestore";
import { getProjects } from "@/lib/firestore";
import { getAllReviews } from "@/lib/firestore";

import { type Lead } from "@/lib/firestore";
import { type Project } from "@/types/project";
import { type Review } from "@/types/review";
import {
  Inbox,
  Briefcase,
  Star,
  TrendingUp,
  Clock,
  CheckCircle2,
  UserCheck,
  BarChart3,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

/* ── Helpers ──────────────────────────────────────────────────────────────── */
function isThisMonth(ts: any): boolean {
  if (!ts) return false;
  try {
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    const now = new Date();
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  } catch {
    return false;
  }
}

/* ── Stat card ────────────────────────────────────────────────────────────── */
interface StatCardProps {
  label: string;
  value: number | string;
  sub?: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  delay?: number;
  href?: string;
}

function StatCard({
  label, value, sub, icon: Icon, color, bg, border, delay = 0, href,
}: StatCardProps) {
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className={`rounded-xl border ${border} bg-white/[0.02] p-5 flex flex-col gap-3 h-full ${href ? "hover:bg-white/[0.035] transition-colors cursor-pointer" : ""}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
          {label}
        </span>
        <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${color}`} />
        </div>
      </div>
      <div>
        <div className="font-sora font-bold text-2xl text-white">{value}</div>
        {sub && <p className="text-[11px] text-white/30 mt-0.5">{sub}</p>}
      </div>
    </motion.div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}

/* ── Mini bar chart ───────────────────────────────────────────────────────── */
function MiniBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = max === 0 ? 0 : Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10.5px] text-white/40 w-24 flex-shrink-0 capitalize">{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
      <span className="text-[10.5px] font-semibold text-white/50 w-6 text-right">{value}</span>
    </div>
  );
}

/* ── Main page ────────────────────────────────────────────────────────────── */
export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchedRef = useRef(false);

  const { user, isAdmin } = useAuth();

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [l, p, r] = await Promise.all([fetchLeads(), getProjects(), getAllReviews()]);
      setLeads(l);
      setProjects(p);
      setReviews(r);
    } catch (err: any) {
      console.error("Dashboard fetch failed:", err);
      setError(err?.message || "Missing or insufficient permissions.");
      toast.error("Failed to load dashboard data. Retrying may help.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || !isAdmin) return;
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    loadData();
  }, [user, isAdmin]);

  /* ── Derived metrics ──────────────────────────────────────────────────────*/
  const totalLeads = leads.length;
  const leadsThisMonth = leads.filter((l) => isThisMonth(l.createdAt)).length;
  const newLeads = leads.filter((l) => l.status === "new").length;
  const contactedLeads = leads.filter((l) => l.status === "contacted").length;
  const inProgressLeads = leads.filter((l) => l.status === "in-progress").length;
  const closedLeads = leads.filter((l) => l.status === "closed").length;

  const publishedProjects = projects.filter((p) => p.published).length;
  const featuredProjects = projects.filter((p) => p.featured && p.published).length;

  const totalReviews = reviews.length;
  const approvedReviews = reviews.filter((r) => r.approved).length;
  const pendingReviews = reviews.filter((r) => !r.approved).length;
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
      : "—";

  // Conversion: leads that reached closed / total
  const conversionPct =
    totalLeads > 0 ? Math.round((closedLeads / totalLeads) * 100) : 0;

  const recentLeads = leads.slice(0, 5);

  const STATUS_CFG = {
    new: { label: "New", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/25", bar: "bg-blue-500" },
    contacted: { label: "Contacted", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/25", bar: "bg-amber-500" },
    "in-progress": { label: "In Progress", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/25", bar: "bg-purple-500" },
    closed: { label: "Closed", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/25", bar: "bg-green-500" },
  } as const;


  if (error) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-5">
        <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
          <AlertCircle className="w-5 h-5 text-red-400" />
        </div>
        <div>
          <h2 className="font-sora font-semibold text-white text-base">Connection Issue</h2>
          <p className="text-white/40 text-xs mt-1.5 leading-relaxed">{error}</p>
        </div>
        <button
          onClick={loadData}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
        >
          Retry Load
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-sora font-bold text-xl text-white mb-1">Dashboard</h1>
        <p className="text-white/35 text-sm">
          Your AlisTech business overview.
        </p>
      </div>

      {/* ── Row 1: Primary stats ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-5 h-[110px] animate-pulse" />
          ))
        ) : (
          <>
            <StatCard label="Total Leads" value={totalLeads} sub={`${leadsThisMonth} this month`} icon={Inbox} color="text-blue-400" bg="bg-blue-500/10" border="border-blue-500/20" delay={0} href="/admin/leads" />
            <StatCard label="Projects" value={publishedProjects} sub={`${featuredProjects} featured`} icon={Briefcase} color="text-purple-400" bg="bg-purple-500/10" border="border-purple-500/20" delay={0.06} href="/admin/projects" />
            <StatCard label="Reviews" value={approvedReviews} sub={pendingReviews > 0 ? `${pendingReviews} pending` : "all approved"} icon={Star} color="text-amber-400" bg="bg-amber-500/10" border="border-amber-500/20" delay={0.12} href="/admin/reviews" />
            <StatCard label="Conversion" value={`${conversionPct}%`} sub={`${closedLeads} of ${totalLeads} closed`} icon={TrendingUp} color="text-green-400" bg="bg-green-500/10" border="border-green-500/20" delay={0.18} />
          </>
        )}
      </div>

      {/* ── Row 2: Charts + Recent leads ─────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* Lead status breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="lg:col-span-2 rounded-xl border border-white/[0.06] bg-white/[0.015] p-5"
        >
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 className="w-4 h-4 text-white/40" />
            <h2 className="font-sora font-semibold text-sm text-white">Lead Pipeline</h2>
          </div>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-5 rounded bg-white/[0.04] animate-pulse" />
              ))}
            </div>
          ) : totalLeads === 0 ? (
            <p className="text-white/25 text-xs text-center py-6">No leads yet</p>
          ) : (
            <div className="space-y-3.5">
              <MiniBar label="New" value={newLeads} max={totalLeads} color="bg-blue-500" />
              <MiniBar label="Contacted" value={contactedLeads} max={totalLeads} color="bg-amber-500" />
              <MiniBar label="In Progress" value={inProgressLeads} max={totalLeads} color="bg-purple-500" />
              <MiniBar label="Closed" value={closedLeads} max={totalLeads} color="bg-green-500" />
            </div>
          )}

          {/* Additional metrics */}
          <div className="mt-6 pt-4 border-t border-white/[0.05] grid grid-cols-2 gap-3">
            <div className="text-center">
              <p className="font-sora font-bold text-lg text-white">{avgRating}</p>
              <p className="text-[10px] text-white/25 uppercase tracking-widest">Avg Rating</p>
            </div>
            <div className="text-center">
              <p className="font-sora font-bold text-lg text-white">{projects.length}</p>
              <p className="text-[10px] text-white/25 uppercase tracking-widest">All Projects</p>
            </div>
          </div>
        </motion.div>

        {/* Recent leads table */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
          className="lg:col-span-3 rounded-xl border border-white/[0.06] bg-white/[0.015] p-5"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-white/40" />
              <h2 className="font-sora font-semibold text-sm text-white">Recent Leads</h2>
            </div>
            <Link href="/admin/leads" className="text-xs text-blue-400/60 hover:text-blue-400 transition-colors">
              View all →
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-10 rounded-lg bg-white/[0.03] animate-pulse" />
              ))}
            </div>
          ) : recentLeads.length === 0 ? (
            <div className="py-10 text-center">
              <Inbox className="w-7 h-7 text-white/10 mx-auto mb-2" />
              <p className="text-white/25 text-xs">No leads yet. Share your contact page!</p>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {recentLeads.map((lead) => {
                const s = STATUS_CFG[lead.status] ?? STATUS_CFG.new;
                return (
                  <Link
                    key={lead.id}
                    href={`/admin/leads/${lead.id}`}
                    className="flex items-center gap-3 py-2.5 hover:bg-white/[0.02] -mx-2 px-2 rounded-lg transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-full bg-blue-600/15 border border-blue-500/20 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-blue-400">
                      {lead.name[0]?.toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white font-medium truncate group-hover:text-blue-400 transition-colors">
                        {lead.name}
                      </p>
                      <p className="text-[10px] text-white/25 truncate">{lead.email}</p>
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border flex-shrink-0 ${s.bg} ${s.border} ${s.color}`}>
                      {s.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>

      {/* ── Row 3: Content summary cards ──────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            label: "Pending Review Approvals",
            value: pendingReviews,
            icon: Star,
            color: "text-amber-400",
            href: "/admin/reviews",
            empty: "All reviews approved ✓",
            cta: "Approve now →",
          },
          {
            label: "Draft Projects",
            value: projects.filter((p) => !p.published).length,
            icon: Briefcase,
            color: "text-purple-400",
            href: "/admin/projects",
            empty: "All projects published ✓",
            cta: "Publish now →",
          },
          {
            label: "New Unread Leads",
            value: newLeads,
            icon: UserCheck,
            color: "text-blue-400",
            href: "/admin/leads",
            empty: "No new leads waiting",
            cta: "View leads →",
          },
        ].map(({ label, value, icon: Icon, color, href, empty, cta }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.05 }}
          >
            <Link
              href={href}
              className="block rounded-xl border border-white/[0.06] bg-white/[0.015] p-5 hover:bg-white/[0.025] transition-colors group"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">{label}</p>
                <Icon className={`w-4 h-4 ${color} opacity-60`} />
              </div>
              {loading ? (
                <div className="h-7 w-12 rounded bg-white/[0.06] animate-pulse" />
              ) : value > 0 ? (
                <>
                  <p className={`font-sora font-bold text-2xl ${color}`}>{value}</p>
                  <p className="text-[11px] text-blue-400/60 mt-2 group-hover:text-blue-400 transition-colors">{cta}</p>
                </>
              ) : (
                <p className="text-xs text-green-400/70 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {empty}
                </p>
              )}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
