"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/lib/auth-context";
import { fetchLeads, deleteLead, type Lead, type LeadStatus } from "@/lib/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { Inbox, Trash2, Search, X, AlertCircle, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

/* ── Status config ────────────────────────────────────────────────────────── */
const STATUS_CFG: Record<
  LeadStatus,
  { label: string; text: string; bg: string; border: string }
> = {
  new: {
    label: "New",
    text: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  contacted: {
    label: "Contacted",
    text: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  "in-progress": {
    label: "In Progress",
    text: "text-purple-700",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
  closed: {
    label: "Closed",
    text: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
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
  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this lead permanently?")) return;
    setDeleting(id);
    try {
      await deleteLead(id);
      setLeads((prev) => prev.filter((l) => l.id !== id));
      toast.success("Lead removed successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete lead");
    } finally {
      setDeleting(null);
    }
  };

  /* Format date */
  const fmtDate = (lead: Lead) => {
    if (!lead.createdAt) return "—";
    try {
      const d = typeof lead.createdAt.toDate === "function" ? lead.createdAt.toDate() : new Date(String(lead.createdAt));
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "—";
    }
  };

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
          onClick={loadLeads}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0f172a] text-white hover:bg-[#1e293b] transition-colors"
        >
          Retry Load
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* ── Page Header & Search ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-sora font-bold text-2xl text-[#0f172a] tracking-tight">
            Leads & Inquiries
          </h1>
          <p className="text-sm text-[#64748b] mt-1">
            {leads.length} total customer {leads.length === 1 ? "inquiry" : "inquiries"} received from the contact form.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, service…"
            className="w-full pl-9 pr-8 py-2.5 rounded-xl text-sm text-[#0f172a] bg-white border border-[#cbd5e1] placeholder:text-[#94a3b8] focus:bg-white focus:outline-none focus:border-[#0f172a] focus:ring-2 focus:ring-[#7CFF4F]/50 transition-all shadow-2xs"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#0f172a] p-1"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ── Status Filter Pills ─────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-2xs ${
            filter === "all"
              ? "bg-[#0f172a] text-white"
              : "bg-white text-[#64748b] border border-[#e2e8f0] hover:text-[#0f172a] hover:bg-[#f8fafc]"
          }`}
        >
          All ({leads.length})
        </button>
        {ALL_STATUSES.map((s) => {
          const cfg = STATUS_CFG[s];
          const count = leads.filter((l) => l.status === s).length;
          const active = filter === s;
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-2xs border ${
                active
                  ? `${cfg.bg} ${cfg.text} ${cfg.border} ring-1 ring-current`
                  : "bg-white text-[#64748b] border-[#e2e8f0] hover:text-[#0f172a] hover:bg-[#f8fafc]"
              }`}
            >
              {cfg.label} ({count})
            </button>
          );
        })}
      </div>

      {/* ── Leads Table / List Card ──────────────────────────────────────────── */}
      <div className="rounded-2xl border border-[#e2e8f0] bg-white overflow-hidden shadow-xs">
        {loading ? (
          <div className="divide-y divide-[#f1f5f9]">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4 animate-pulse">
                <div className="w-9 h-9 rounded-full bg-[#f1f5f9]" />
                <div className="space-y-1 flex-1">
                  <div className="h-4 w-36 rounded bg-[#f1f5f9]" />
                  <div className="h-3 w-48 rounded bg-[#f1f5f9]" />
                </div>
                <div className="h-6 w-20 rounded-full bg-[#f1f5f9]" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <Inbox className="w-10 h-10 text-[#94a3b8] mx-auto mb-3 opacity-40" />
            <p className="text-sm font-semibold text-[#0f172a]">No inquiries found</p>
            <p className="text-xs text-[#64748b] mt-1">
              {search || filter !== "all"
                ? "Try adjusting your search query or status filter."
                : "New contact inquiries will appear here automatically."}
            </p>
          </div>
        ) : (
          <div>
            {/* Table Header (Desktop) */}
            <div className="hidden md:grid grid-cols-[1.5fr_1.5fr_1fr_120px_90px] items-center gap-4 px-6 py-3.5 bg-[#f8fafc] border-b border-[#e2e8f0] text-xs font-semibold uppercase tracking-wider text-[#64748b]">
              <span>Customer Name</span>
              <span>Email & Service</span>
              <span>Submission Date</span>
              <span>Status</span>
              <span className="text-right">Actions</span>
            </div>

            {/* Rows */}
            <div className="divide-y divide-[#f1f5f9]">
              <AnimatePresence>
                {filtered.map((lead) => {
                  const s = STATUS_CFG[lead.status] || STATUS_CFG.new;
                  return (
                    <motion.div
                      key={lead.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="grid grid-cols-1 md:grid-cols-[1.5fr_1.5fr_1fr_120px_90px] items-center gap-3 md:gap-4 px-6 py-4 hover:bg-[#f8fafc] transition-colors group"
                      >
                        {/* Name Column */}
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-full bg-[#f1f5f9] border border-[#e2e8f0] flex items-center justify-center font-bold text-xs text-[#0f172a] shrink-0">
                            {lead.name[0]?.toUpperCase() || "L"}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[#0f172a] group-hover:text-blue-600 transition-colors truncate">
                              {lead.name}
                            </p>
                            {lead.whatsapp && (
                              <p className="text-[11px] text-[#94a3b8] truncate">{lead.whatsapp}</p>
                            )}
                          </div>
                        </div>

                        {/* Email & Service */}
                        <div className="min-w-0">
                          <p className="text-xs text-[#475569] truncate">{lead.email}</p>
                          {lead.projectType && (
                            <span className="inline-block text-[10px] text-[#64748b] bg-[#f1f5f9] px-2 py-0.5 rounded-md mt-1">
                              {lead.projectType}
                            </span>
                          )}
                        </div>

                        {/* Date */}
                        <div className="text-xs text-[#64748b]">{fmtDate(lead)}</div>

                        {/* Status Badge */}
                        <div>
                          <span
                            className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${s.bg} ${s.text} ${s.border}`}
                          >
                            {s.label}
                          </span>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center justify-end gap-1.5">
                          <span className="p-1.5 rounded-lg text-[#94a3b8] group-hover:text-[#0f172a] transition-colors">
                            <ArrowUpRight className="w-4 h-4" />
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleDelete(e, lead.id)}
                            disabled={deleting === lead.id}
                            className="p-1.5 rounded-lg text-[#94a3b8] hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Lead"
                            aria-label="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
