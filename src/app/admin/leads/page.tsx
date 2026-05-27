"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/lib/auth-context";
import { fetchLeads, deleteLead, type Lead, type LeadStatus } from "@/lib/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { Inbox, Trash2, Search, X, AlertCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

/* ── Status config ────────────────────────────────────────────────────────── */
const STATUS_CFG: Record<
  LeadStatus,
  { label: string; color: string; bg: string; border: string }
> = {
  new: {
    label: "New",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/25",
  },
  contacted: {
    label: "Contacted",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/25",
  },
  "in-progress": {
    label: "In Progress",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/25",
  },
  closed: {
    label: "Closed",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/25",
  },
};

const ALL_STATUSES: LeadStatus[] = ["new", "contacted", "in-progress", "closed"];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<LeadStatus | "all">("all");
  const [deleting, setDeleting] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  const fetchedRef = useRef(false);
  const { user, isAdmin } = useAuth();

  const loadLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLeads();
      setLeads(data);
    } catch (err: any) {
      console.error("Failed to fetch leads:", err);
      setError(err?.message || "Missing or insufficient permissions.");
      toast.error("Failed to load leads. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || !isAdmin) return;
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    loadLeads();
  }, [user, isAdmin]);

  /* Filter + search */
  const filtered = leads.filter((l) => {
    if (filter !== "all" && l.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.projectType?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  /* Delete handler */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this lead permanently?")) return;
    setDeleting(id);
    try {
      await deleteLead(id);
      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleting(null);
    }
  };

  /* Format date */
  const fmtDate = (lead: Lead) => {
    if (!lead.createdAt) return "—";
    const d = lead.createdAt.toDate();
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

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
          onClick={loadLeads}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
        >
          Retry Load
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-sora font-bold text-xl text-white mb-1">Leads</h1>
          <p className="text-white/35 text-sm">
            {leads.length} total {leads.length === 1 ? "inquiry" : "inquiries"}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads…"
            className="w-full pl-9 pr-8 py-2.5 rounded-lg text-sm text-white bg-white/[0.04] border border-white/[0.08] placeholder:text-white/25 focus:outline-none focus:border-blue-500/50 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Status filter pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
            filter === "all"
              ? "text-white bg-white/[0.08] border-white/[0.12]"
              : "text-white/35 border-white/[0.06] hover:text-white/60 hover:border-white/[0.1]"
          }`}
        >
          All ({leads.length})
        </button>
        {ALL_STATUSES.map((s) => {
          const cfg = STATUS_CFG[s];
          const count = leads.filter((l) => l.status === s).length;
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                filter === s
                  ? `${cfg.color} ${cfg.bg} ${cfg.border}`
                  : "text-white/35 border-white/[0.06] hover:text-white/60 hover:border-white/[0.1]"
              }`}
            >
              {cfg.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Table / cards */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] overflow-hidden">
        {loading ? (
          <div className="divide-y divide-white/[0.04]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4">
                <div className="h-4 w-28 rounded bg-white/[0.06] animate-pulse" />
                <div className="h-4 w-40 rounded bg-white/[0.06] animate-pulse hidden sm:block" />
                <div className="h-4 w-20 rounded bg-white/[0.06] animate-pulse hidden md:block" />
                <div className="ml-auto h-5 w-16 rounded-full bg-white/[0.06] animate-pulse" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <Inbox className="w-8 h-8 text-white/15 mx-auto mb-3" />
            <p className="text-white/30 text-sm">
              {search || filter !== "all"
                ? "No leads match your filters."
                : "No leads yet."}
            </p>
          </div>
        ) : (
          /* Header row (desktop) */
          <>
            <div className="hidden md:grid grid-cols-[1fr_1fr_120px_100px_48px] gap-4 px-5 py-3 border-b border-white/[0.04]">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-white/25">
                Name
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-white/25">
                Email
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-white/25">
                Date
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-white/25">
                Status
              </span>
              <span />
            </div>
            <AnimatePresence>
              {filtered.map((lead) => {
                const s = STATUS_CFG[lead.status] || STATUS_CFG.new;
                return (
                  <motion.div
                    key={lead.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-b border-white/[0.04] last:border-0"
                  >
                    <div className="md:grid md:grid-cols-[1fr_1fr_120px_100px_48px] md:items-center gap-4 px-5 py-3.5 hover:bg-white/[0.015] transition-colors">
                      {/* Name — clickable */}
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="text-sm text-white font-medium hover:text-blue-400 transition-colors truncate block"
                      >
                        {lead.name}
                        {lead.projectType && (
                          <span className="text-white/25 font-normal ml-2 text-xs hidden lg:inline">
                            {lead.projectType}
                          </span>
                        )}
                      </Link>

                      {/* Email */}
                      <span className="text-xs text-white/35 truncate block mt-1 md:mt-0">
                        {lead.email}
                      </span>

                      {/* Date */}
                      <span className="text-xs text-white/25 hidden md:block">
                        {fmtDate(lead)}
                      </span>

                      {/* Status badge */}
                      <span
                        className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${s.bg} ${s.border} ${s.color} mt-2 md:mt-0`}
                      >
                        {s.label}
                      </span>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(lead.id)}
                        disabled={deleting === lead.id}
                        className="text-white/15 hover:text-red-400 transition-colors p-1 disabled:opacity-30 mt-2 md:mt-0"
                        title="Delete lead"
                      >
                        {deleting === lead.id ? (
                          <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}
