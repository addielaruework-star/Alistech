"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/lib/auth-context";
import { useParams, useRouter } from "next/navigation";
import {
  fetchLead,
  updateLeadStatus,
  deleteLead,
  type Lead,
  type LeadStatus,
} from "@/lib/firestore";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  MessageCircle,
  Calendar,
  Briefcase,
  Trash2,
  Check,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

/* ── Status config ────────────────────────────────────────────────────────── */
const ALL_STATUSES: { value: LeadStatus; label: string; color: string; bg: string; border: string }[] = [
  { value: "new", label: "New", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/25" },
  { value: "contacted", label: "Contacted", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/25" },
  { value: "in-progress", label: "In Progress", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/25" },
  { value: "closed", label: "Closed", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/25" },
];

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [statusSaved, setStatusSaved] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const fetchedRef = useRef(false);
  const { user, isAdmin } = useAuth();

  const loadSingleLead = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLead(id);
      setLead(data);
    } catch (err: any) {
      console.error("Failed to fetch lead details:", err);
      setError(err?.message || "Missing or insufficient permissions.");
      toast.error("Failed to load lead details. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id || !user || !isAdmin) return;
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    loadSingleLead();
  }, [id, user, isAdmin]);

  /* Update status */
  const handleStatusChange = async (status: LeadStatus) => {
    if (!lead || updating) return;
    setUpdating(true);
    setStatusSaved(false);
    try {
      await updateLeadStatus(lead.id, status);
      setLead((prev) => (prev ? { ...prev, status } : prev));
      setStatusSaved(true);
      toast.success(`Status updated to "${status}"`);
      setTimeout(() => setStatusSaved(false), 2000);
    } catch (err) {
      console.error("Status update failed:", err);
      toast.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  /* Delete */
  const handleDelete = async () => {
    if (!lead || !confirm("Delete this lead permanently? This cannot be undone.")) return;
    setDeleting(true);
    try {
      await deleteLead(lead.id);
      toast.success("Lead deleted successfully");
      router.push("/admin/leads");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete lead");
      setDeleting(false);
    }
  };

  /* Format date */
  const fmtDate = () => {
    if (!lead?.createdAt) return "—";
    const d = lead.createdAt.toDate();
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /* ── Loading skeleton ─────────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="h-5 w-20 rounded bg-white/[0.06] animate-pulse" />
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-7 space-y-5">
          <div className="h-6 w-48 rounded bg-white/[0.06] animate-pulse" />
          <div className="h-4 w-64 rounded bg-white/[0.06] animate-pulse" />
          <div className="h-32 w-full rounded bg-white/[0.06] animate-pulse" />
        </div>
      </div>
    );
  }

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
          onClick={loadSingleLead}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
        >
          Retry Load
        </button>
      </div>
    );
  }

  /* ── Not found ─────────────────────────────────────────────────────────── */
  if (!lead) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <p className="text-white/30 text-sm mb-4">Lead not found.</p>
        <Link
          href="/admin/leads"
          className="text-blue-400 text-sm hover:underline"
        >
          ← Back to leads
        </Link>
      </div>
    );
  }

  const currentStatus = ALL_STATUSES.find((s) => s.value === lead.status) || ALL_STATUSES[0];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back link */}
      <Link
        href="/admin/leads"
        className="inline-flex items-center gap-1.5 text-sm text-white/35 hover:text-white/60 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to leads
      </Link>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-xl border border-white/[0.06] bg-white/[0.015] overflow-hidden"
      >
        {/* Header */}
        <div className="px-7 py-6 border-b border-white/[0.05]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-sora font-bold text-lg text-white mb-1">
                {lead.name}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-white/35">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3" />
                  <a
                    href={`mailto:${lead.email}`}
                    className="hover:text-white/60 transition-colors"
                  >
                    {lead.email}
                  </a>
                </span>
                {lead.whatsapp && (
                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="w-3 h-3" />
                    {lead.whatsapp}
                  </span>
                )}
                {lead.projectType && (
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-3 h-3" />
                    {lead.projectType}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {fmtDate()}
                </span>
              </div>
            </div>

            {/* Current status badge */}
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border flex-shrink-0 ${currentStatus.bg} ${currentStatus.border} ${currentStatus.color}`}
            >
              {currentStatus.label}
            </span>
          </div>
        </div>

        {/* Message */}
        <div className="px-7 py-6">
          <h3 className="text-[10.5px] font-semibold uppercase tracking-widest text-white/30 mb-3">
            Message
          </h3>
          <p className="text-sm text-white/60 leading-relaxed whitespace-pre-wrap">
            {lead.message}
          </p>
        </div>

        {/* Status selector */}
        <div className="px-7 py-5 border-t border-white/[0.05] bg-white/[0.01]">
          <h3 className="text-[10.5px] font-semibold uppercase tracking-widest text-white/30 mb-3 flex items-center gap-2">
            Update Status
            {statusSaved && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1 text-green-400 normal-case tracking-normal font-medium"
              >
                <Check className="w-3 h-3" /> Saved
              </motion.span>
            )}
          </h3>
          <div className="flex flex-wrap gap-2">
            {ALL_STATUSES.map((s) => (
              <button
                key={s.value}
                onClick={() => handleStatusChange(s.value)}
                disabled={updating || lead.status === s.value}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-all duration-150 disabled:cursor-default ${
                  lead.status === s.value
                    ? `${s.color} ${s.bg} ${s.border}`
                    : "text-white/30 border-white/[0.06] hover:text-white/60 hover:border-white/[0.12] hover:bg-white/[0.02]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Danger zone */}
        <div className="px-7 py-5 border-t border-white/[0.05]">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium text-red-400/60 border border-red-500/15 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/[0.05] transition-all disabled:opacity-40"
          >
            {deleting ? (
              <div className="w-3.5 h-3.5 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
            ) : (
              <Trash2 className="w-3.5 h-3.5" />
            )}
            {deleting ? "Deleting…" : "Delete Lead"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
