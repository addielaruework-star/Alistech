"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/lib/auth-context";
import { motion } from "framer-motion";
import { fetchLeads, getProjects, getAllReviews } from "@/lib/firestore";
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
  RefreshCw,
  ArrowRight,
  Sparkles,
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

/* ── Stat card component ─────────────────────────────────────────────────── */
interface StatCardProps {
  label: string;
  value: number | string;
  sub?: string;
  icon: React.ElementType;
  delay?: number;
  href?: string;
}

function StatCard({ label, value, sub, icon: Icon, delay = 0, href }: StatCardProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className={`bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs flex flex-col justify-between gap-4 h-full transition-all duration-150 ${
        href ? "hover:border-[#cbd5e1] hover:shadow-sm cursor-pointer group" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
          {label}
        </span>
        <div className="w-10 h-10 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center text-[#0f172a] group-hover:bg-[#f1f5f9] transition-colors">
          <Icon className="w-5 h-5 text-[#0f172a]" />
        </div>
      </div>
      <div>
        <div className="font-sora font-bold text-2xl sm:text-3xl text-[#0f172a] tracking-tight">
          {value}
        </div>
        {sub && <p className="text-xs text-[#64748b] mt-1 font-medium">{sub}</p>}
      </div>
    </motion.div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}

/* ── Mini bar chart component ────────────────────────────────────────────── */
function MiniBar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const pct = max === 0 ? 0 : Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-[#475569] font-medium w-24 flex-shrink-0 capitalize">
        {label}
      </span>
      <div className="flex-1 h-2 rounded-full bg-[#f1f5f9] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
      <span className="text-xs font-semibold text-[#0f172a] w-8 text-right">
        {value}
      </span>
    </div>
  );
}

/* ── Main Dashboard Page ─────────────────────────────────────────────────── */
export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchedRef = useRef(false);

  const { user, isAdmin } = useAuth();

  const loadData = async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const [l, p, r] = await Promise.all([fetchLeads(), getProjects(), getAllReviews()]);
      setLeads(l);
      setProjects(p);
      setReviews(r);
      if (isManualRefresh) toast.success("Dashboard data refreshed");
    } catch (err: any) {
      console.error("Dashboard fetch failed:", err);
      setError(err?.message || "Missing or insufficient permissions.");
      toast.error("Failed to load dashboard data.");
    } finally {
      setLoading(false);
      setRefreshing(false);
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

  const approvedReviews = reviews.filter((r) => r.approved).length;
  const pendingReviews = reviews.filter((r) => !r.approved).length;
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
      : "—";

  const conversionPct =
    totalLeads > 0 ? Math.round((closedLeads / totalLeads) * 100) : 0;

  const recentLeads = leads.slice(0, 5);

  const STATUS_CFG = {
    new: {
      label: "New",
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
    },
    contacted: {
      label: "Contacted",
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-200",
    },
    "in-progress": {
      label: "In Progress",
      bg: "bg-purple-50",
      text: "text-purple-700",
      border: "border-purple-200",
    },
    closed: {
      label: "Closed",
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-200",
    },
  } as const;

  if (error) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center mx-auto text-red-600">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-sora font-bold text-lg text-[#0f172a]">Connection Issue</h2>
          <p className="text-xs text-[#64748b] mt-1 leading-relaxed">{error}</p>
        </div>
        <button
          onClick={() => loadData(true)}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0f172a] text-white hover:bg-[#1e293b] transition-colors"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* ── Dashboard Welcome Header ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-sora font-bold text-2xl text-[#0f172a] tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-[#64748b] mt-1">
            Overview of your active customer leads, portfolio case studies, and client reviews.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => loadData(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-[#cbd5e1] text-[#0f172a] hover:bg-[#f8fafc] hover:border-[#94a3b8] transition-all shadow-2xs disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#64748b] ${refreshing ? "animate-spin" : ""}`} />
            <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
          </button>
        </div>
      </div>

      {/* ── Row 1: Primary Stat Cards ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[#e2e8f0] bg-white p-6 h-[124px] animate-pulse shadow-2xs"
            />
          ))
        ) : (
          <>
            <StatCard
              label="Total Leads"
              value={totalLeads}
              sub={`${leadsThisMonth} inquiries this month`}
              icon={Inbox}
              delay={0}
              href="/admin/leads"
            />
            <StatCard
              label="Projects"
              value={publishedProjects}
              sub={`${featuredProjects} featured · ${projects.length} total`}
              icon={Briefcase}
              delay={0.05}
              href="/admin/projects"
            />
            <StatCard
              label="Reviews"
              value={approvedReviews}
              sub={pendingReviews > 0 ? `${pendingReviews} pending approval` : "all approved"}
              icon={Star}
              delay={0.1}
              href="/admin/reviews"
            />
            <StatCard
              label="Conversion"
              value={`${conversionPct}%`}
              sub={`${closedLeads} of ${totalLeads} leads closed`}
              icon={TrendingUp}
              delay={0.15}
            />
          </>
        )}
      </div>

      {/* ── Row 2: Lead Pipeline Chart & Recent Leads Table ────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Lead Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-[#0f172a]" />
                </div>
                <div>
                  <h2 className="font-sora font-semibold text-sm text-[#0f172a]">
                    Lead Pipeline
                  </h2>
                  <p className="text-[11px] text-[#64748b]">Stage progression</p>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="space-y-4 py-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-6 rounded bg-[#f1f5f9] animate-pulse" />
                ))}
              </div>
            ) : totalLeads === 0 ? (
              <div className="py-8 text-center text-xs text-[#94a3b8]">
                No leads recorded yet
              </div>
            ) : (
              <div className="space-y-4 pt-1">
                <MiniBar label="New" value={newLeads} max={totalLeads} color="bg-blue-500" />
                <MiniBar label="Contacted" value={contactedLeads} max={totalLeads} color="bg-amber-500" />
                <MiniBar label="In Progress" value={inProgressLeads} max={totalLeads} color="bg-purple-500" />
                <MiniBar label="Closed" value={closedLeads} max={totalLeads} color="bg-emerald-500" />
              </div>
            )}
          </div>

          {/* Quick Metrics Footer */}
          <div className="mt-6 pt-5 border-t border-[#f1f5f9] grid grid-cols-2 gap-4 text-center">
            <div className="p-2.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
              <div className="flex items-center justify-center gap-1 font-sora font-bold text-lg text-[#0f172a]">
                <span>{avgRating}</span>
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              </div>
              <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mt-0.5">
                Average Rating
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
              <p className="font-sora font-bold text-lg text-[#0f172a]">{projects.length}</p>
              <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mt-0.5">
                Total Projects
              </p>
            </div>
          </div>
        </motion.div>

        {/* Recent Leads Table */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="lg:col-span-3 rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center">
                  <Clock className="w-4 h-4 text-[#0f172a]" />
                </div>
                <div>
                  <h2 className="font-sora font-semibold text-sm text-[#0f172a]">
                    Recent Leads
                  </h2>
                  <p className="text-[11px] text-[#64748b]">Latest customer submissions</p>
                </div>
              </div>
              <Link
                href="/admin/leads"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0f172a] hover:text-[#475569] transition-colors"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-12 rounded-xl bg-[#f1f5f9] animate-pulse" />
                ))}
              </div>
            ) : recentLeads.length === 0 ? (
              <div className="py-12 text-center">
                <Inbox className="w-8 h-8 text-[#94a3b8] mx-auto mb-2 opacity-50" />
                <p className="text-xs text-[#64748b]">No customer inquiries yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-[#f1f5f9]">
                {recentLeads.map((lead) => {
                  const s = STATUS_CFG[lead.status] ?? STATUS_CFG.new;
                  return (
                    <Link
                      key={lead.id}
                      href={`/admin/leads/${lead.id}`}
                      className="flex items-center justify-between py-3 hover:bg-[#f8fafc] px-2.5 -mx-2.5 rounded-xl transition-colors group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-[#f1f5f9] border border-[#e2e8f0] flex items-center justify-center text-xs font-bold text-[#0f172a] shrink-0">
                          {lead.name[0]?.toUpperCase() || "L"}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-[#0f172a] group-hover:text-[#475569] transition-colors truncate">
                            {lead.name}
                          </p>
                          <p className="text-[11px] text-[#64748b] truncate">{lead.email}</p>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border shrink-0 ${s.bg} ${s.text} ${s.border}`}
                      >
                        {s.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* ── Row 3: Actionable Content Summary Cards ────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            label: "Pending Review Approvals",
            value: pendingReviews,
            icon: Star,
            href: "/admin/reviews",
            emptyText: "All reviews approved",
            ctaText: "Review and approve",
          },
          {
            label: "Draft Projects",
            value: projects.filter((p) => !p.published).length,
            icon: Briefcase,
            href: "/admin/projects",
            emptyText: "All projects published",
            ctaText: "Publish case studies",
          },
          {
            label: "New Unread Leads",
            value: newLeads,
            icon: UserCheck,
            href: "/admin/leads",
            emptyText: "No unread inquiries",
            ctaText: "Respond to leads",
          },
        ].map(({ label, value, icon: Icon, href, emptyText, ctaText }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.05 }}
          >
            <Link
              href={href}
              className="block rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-xs hover:border-[#cbd5e1] hover:shadow-sm transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  {label}
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center text-[#0f172a]">
                  <Icon className="w-4 h-4 text-[#0f172a]" />
                </div>
              </div>

              {loading ? (
                <div className="h-8 w-16 rounded bg-[#f1f5f9] animate-pulse" />
              ) : value > 0 ? (
                <div className="space-y-2">
                  <div className="font-sora font-bold text-2xl text-[#0f172a]">{value}</div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0f172a] group-hover:text-[#475569] transition-colors">
                    <span>{ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0f172a]" />
                  </div>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{emptyText} ✓</span>
                </div>
              )}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
