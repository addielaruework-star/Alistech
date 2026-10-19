"use client";

import { useEffect, useState, useRef, useCallback } from "react";
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
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

/* ── Status config ────────────────────────────────────────────────────────── */
const ALL_STATUSES: {
  value: LeadStatus;
  label: string;
  text: string;
  bg: string;
  border: string;
}[] = [
  {
    value: "new",
    label: "New",
    text: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    value: "contacted",
    label: "Contacted",
    text: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  {
    value: "in-progress",
    label: "In Progress",
    text: "text-purple-700",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
  {
    value: "closed",
    label: "Closed",
    text: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
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

  const loadSingleLead = useCallback(async () => {
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
  }, [id]);

  useEffect(() => {
    if (!id || !user || !isAdmin) return;
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    loadSingleLead();
  }, [id, user, isAdmin, loadSingleLead]);

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
    if (!lead || !confirm("Are you sure you want to delete this lead permanently? This cannot be undone.")) return;
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
    try {
      const d = typeof lead.createdAt.toDate === "function" ? lead.createdAt.toDate() : new Date(String(lead.createdAt));
      return d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "—";
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="h-5 w-28 rounded-lg bg-[#e2e8f0] animate-pulse" />
        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-8 space-y-5 shadow-xs">
          <div className="h-7 w-56 rounded bg-[#f1f5f9] animate-pulse" />
          <div className="h-4 w-72 rounded bg-[#f1f5f9] animate-pulse" />
          <div className="h-32 w-full rounded-xl bg-[#f8fafc] animate-pulse" />
        </div>
      </div>
    );
  }

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
          onClick={loadSingleLead}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0f172a] text-white hover:bg-[#1e293b] transition-colors"
        >
          Retry Load
        </button>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <p className="text-sm font-semibold text-[#0f172a] mb-2">Lead not found</p>
        <p className="text-xs text-[#64748b] mb-4">The inquiry you are looking for does not exist or has been deleted.</p>
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0f172a] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to all leads</span>
        </Link>
      </div>
    );
  }

  const currentStatus = ALL_STATUSES.find((s) => s.value === lead.status) || ALL_STATUSES[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* ── Back Navigation ─────────────────────────────────────────────────── */}
      <Link
        href="/admin/leads"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748b] hover:text-[#0f172a] px-2.5 py-1.5 rounded-lg hover:bg-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Leads</span>
      </Link>

      {/* ── Main Lead Card ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl border border-[#e2e8f0] bg-white overflow-hidden shadow-xs space-y-6"
      >
        {/* Header Section */}
        <div className="p-6 sm:p-8 border-b border-[#f1f5f9]">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-sora font-bold text-2xl text-[#0f172a] tracking-tight">
                  {lead.name}
                </h1>
                <span
                  className={`text-xs font-semibold px-3 py-0.5 rounded-full border ${currentStatus.bg} ${currentStatus.text} ${currentStatus.border}`}
                >
                  {currentStatus.label}
                </span>
              </div>

              {/* Contact Info Pills */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#64748b] mt-3">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#94a3b8]" />
                  <a
                    href={`mailto:${lead.email}`}
                    className="hover:text-[#0f172a] underline underline-offset-2 transition-colors"
                  >
                    {lead.email}
                  </a>
                </span>
                {lead.whatsapp && (
                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-[#94a3b8]" />
                    <span>{lead.whatsapp}</span>
                  </span>
                )}
                {lead.projectType && (
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#94a3b8]" />
                    <span className="bg-[#f1f5f9] px-2 py-0.5 rounded text-[#0f172a] font-medium">
                      {lead.projectType}
                    </span>
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#94a3b8]" />
                  <span>{fmtDate()}</span>
                </span>
              </div>
            </div>

            {/* Quick Action Links */}
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${lead.email}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#0f172a] text-white hover:bg-[#1e293b] transition-colors shadow-2xs"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Email</span>
              </a>
              {lead.whatsapp && (
                <a
                  href={`https://wa.me/${lead.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-2xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                  <ExternalLink className="w-3 h-3 text-emerald-600" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Message Container */}
        <div className="px-6 sm:px-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
              Inquiry Message
            </h3>
          </div>
          <div className="p-5 bg-[#f8fafc] rounded-xl border border-[#e2e8f0] text-sm text-[#0f172a] leading-relaxed whitespace-pre-wrap">
            {lead.message}
          </div>
        </div>

        {/* Status Lifecycle Selector */}
        <div className="px-6 sm:px-8 py-5 border-t border-[#f1f5f9] bg-[#f8fafc]/50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748b] flex items-center gap-2">
              <span>Update Lifecycle Status</span>
              {statusSaved && (
                <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-medium normal-case tracking-normal">
                  <Check className="w-3 h-3" /> Updated successfully
                </span>
              )}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {ALL_STATUSES.map((s) => {
              const isSelected = lead.status === s.value;
              return (
                <button
                  key={s.value}
                  onClick={() => handleStatusChange(s.value)}
                  disabled={updating || isSelected}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all shadow-2xs ${
                    isSelected
                      ? `${s.bg} ${s.text} ${s.border} ring-2 ring-current`
                      : "bg-white text-[#475569] border-[#cbd5e1] hover:text-[#0f172a] hover:border-[#94a3b8] hover:bg-[#f8fafc]"
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Danger Zone / Delete */}
        <div className="px-6 sm:px-8 py-5 border-t border-[#f1f5f9] flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#0f172a]">Delete Lead</p>
            <p className="text-[11px] text-[#64748b]">Permanently remove this inquiry from your CRM database.</p>
          </div>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300 transition-colors disabled:opacity-40"
          >
            {deleting ? (
              <div className="w-3.5 h-3.5 border-2 border-red-500/30 border-t-red-600 rounded-full animate-spin" />
            ) : (
              <Trash2 className="w-3.5 h-3.5" />
            )}
            <span>{deleting ? "Deleting…" : "Delete"}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
