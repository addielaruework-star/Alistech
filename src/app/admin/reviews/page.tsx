"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";
import { motion, AnimatePresence } from "framer-motion";
import {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
} from "@/lib/firestore";
import { deleteStorageFile, getCloudinaryUrl } from "@/lib/storage";
import { type Review } from "@/types/review";
import {
  Star,
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  User,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import ReviewModal from "@/components/admin/reviews/ReviewModal";
import { toast } from "sonner";

/* ── Star display helper ──────────────────────────────────────────────────── */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5 ${
            s <= rating
              ? "text-amber-400 fill-amber-400"
              : "text-[#cbd5e1]"
          }`}
        />
      ))}
    </div>
  );
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterApproved, setFilterApproved] = useState<"all" | "approved" | "pending">("all");

  /* ── Modal state ──────────────────────────────────────────────────────────*/
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  /* ── Optimistic updating ──────────────────────────────────────────────────*/
  const [toggling, setToggling] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchedRef = useRef(false);
  const { user, isAdmin } = useAuth();

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllReviews();
      setReviews(data);
    } catch (err: any) {
      console.error("Failed to fetch reviews:", err);
      setError(err?.message || "Missing or insufficient permissions.");
      toast.error("Failed to load reviews. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || !isAdmin) return;
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchReviews();
  }, [user, isAdmin]);

  /* ── Filter ───────────────────────────────────────────────────────────────*/
  const filtered = reviews.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch =
      !search ||
      r.name.toLowerCase().includes(q) ||
      r.company.toLowerCase().includes(q) ||
      r.role.toLowerCase().includes(q) ||
      r.review.toLowerCase().includes(q);

    const matchFilter =
      filterApproved === "all"
        ? true
        : filterApproved === "approved"
        ? r.approved
        : !r.approved;

    return matchSearch && matchFilter;
  });

  /* ── Save handler ─────────────────────────────────────────────────────────*/
  const handleSave = async (data: Omit<Review, "id" | "createdAt">) => {
    try {
      if (selectedReview?.id) {
        await updateReview(selectedReview.id, data);
        toast.success("Review updated successfully");
      } else {
        await createReview(data);
        toast.success("Review created successfully");
      }
      await fetchReviews();
    } catch (err) {
      console.error("Save failed:", err);
      toast.error("Failed to save review");
    }
  };

  /* ── Delete ───────────────────────────────────────────────────────────────*/
  const handleDelete = async (review: Review) => {
    if (!confirm(`Are you sure you want to delete the testimonial from "${review.name}"?`)) return;
    try {
      if (review.id) await deleteReview(review.id);
      if (review.image) await deleteStorageFile(review.image);
      setReviews((prev) => prev.filter((r) => r.id !== review.id));
      toast.success("Review deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete review");
    }
  };

  /* ── Quick-toggle approve/featured ───────────────────────────────────────*/
  const handleToggle = async (
    review: Review,
    field: "approved" | "featured"
  ) => {
    if (!review.id || toggling) return;
    setToggling(review.id + field);
    const newValue = !review[field];
    // Optimistic update
    setReviews((prev) =>
      prev.map((r) => (r.id === review.id ? { ...r, [field]: newValue } : r))
    );
    try {
      await updateReview(review.id, { [field]: newValue });
      toast.success(
        field === "approved"
          ? newValue
            ? "Review approved and is now live"
            : "Review unapproved"
          : newValue
          ? "Review marked as featured"
          : "Review removed from featured"
      );
    } catch (err) {
      // Rollback
      setReviews((prev) =>
        prev.map((r) => (r.id === review.id ? { ...r, [field]: !newValue } : r))
      );
      toast.error("Failed to update status");
    } finally {
      setToggling(null);
    }
  };

  const pendingCount = reviews.filter((r) => !r.approved).length;
  const approvedCount = reviews.filter((r) => r.approved).length;
  const featuredCount = reviews.filter((r) => r.featured && r.approved).length;

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
          onClick={fetchReviews}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0f172a] text-white hover:bg-[#1e293b] transition-colors"
        >
          Retry Load
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-sora font-bold text-2xl text-[#0f172a] tracking-tight">
            Client Testimonials
          </h1>
          <p className="text-sm text-[#64748b] mt-1">
            {reviews.length} total client reviews —{" "}
            {pendingCount > 0 ? (
              <span className="text-amber-700 font-semibold">{pendingCount} pending approval</span>
            ) : (
              <span className="text-emerald-700 font-medium">all testimonials approved</span>
            )}
          </p>
        </div>
        <button
          onClick={() => { setSelectedReview(null); setModalOpen(true); }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#0f172a] hover:bg-[#1e293b] transition-all cursor-pointer shadow-2xs w-fit"
        >
          <Plus className="w-4 h-4 text-[#7CFF4F]" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* ── Quick Stats Mini-Row ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Reviews", value: reviews.length, badge: "Catalog" },
          { label: "Live & Approved", value: approvedCount, badge: "Public" },
          { label: "Featured Showcase", value: featuredCount, badge: "Homepage" },
        ].map(({ label, value, badge }) => (
          <div
            key={label}
            className="rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-xs flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#64748b] mb-1">
                {label}
              </p>
              <p className="font-sora font-bold text-2xl text-[#0f172a]">
                {loading ? <span className="inline-block h-6 w-8 rounded bg-[#f1f5f9] animate-pulse" /> : value}
              </p>
            </div>
            <span className="text-[10px] font-semibold text-[#64748b] bg-[#f8fafc] border border-[#e2e8f0] px-2 py-0.5 rounded-md">
              {badge}
            </span>
          </div>
        ))}
      </div>

      {/* ── Search & Filter Bar ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reviews by client, company, or testimonial text…"
            className="w-full pl-10 pr-9 py-2.5 rounded-xl text-sm text-[#0f172a] bg-white border border-[#cbd5e1] placeholder:text-[#94a3b8] focus:bg-white focus:outline-none focus:border-[#0f172a] focus:ring-2 focus:ring-[#7CFF4F]/50 transition-all shadow-2xs"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#0f172a] p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          {(["all", "approved", "pending"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilterApproved(f)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all capitalize shadow-2xs ${
                filterApproved === f
                  ? f === "pending"
                    ? "bg-amber-50 text-amber-800 border-amber-300 ring-1 ring-amber-400"
                    : f === "approved"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-300 ring-1 ring-emerald-400"
                    : "bg-[#0f172a] text-white border-[#0f172a]"
                  : "bg-white text-[#64748b] border-[#cbd5e1] hover:text-[#0f172a] hover:bg-[#f8fafc]"
              }`}
            >
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Reviews Table Card ──────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-[#e2e8f0] bg-white overflow-hidden shadow-xs">
        {loading ? (
          <div className="divide-y divide-[#f1f5f9]">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4 animate-pulse">
                <div className="w-10 h-10 rounded-full bg-[#f1f5f9] shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-4 w-36 rounded bg-[#f1f5f9]" />
                  <div className="h-3 w-56 rounded bg-[#f1f5f9]" />
                </div>
                <div className="h-6 w-20 rounded-full bg-[#f1f5f9]" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <MessageSquare className="w-10 h-10 text-[#94a3b8] mx-auto mb-3 opacity-40" />
            <p className="text-sm font-semibold text-[#0f172a]">No testimonials found</p>
            <p className="text-xs text-[#64748b] mt-1">
              {search || filterApproved !== "all"
                ? "Try adjusting your search criteria."
                : "Add your first client testimonial to showcase client trust."}
            </p>
          </div>
        ) : (
          <div>
            {/* Table Header (Desktop) */}
            <div className="hidden md:grid grid-cols-[1.5fr_2fr_110px_140px_80px] gap-4 px-6 py-3.5 bg-[#f8fafc] border-b border-[#e2e8f0] text-xs font-semibold uppercase tracking-wider text-[#64748b]">
              <span>Client</span>
              <span>Testimonial</span>
              <span>Rating</span>
              <span>Approval Status</span>
              <span className="text-right">Actions</span>
            </div>

            {/* Rows */}
            <div className="divide-y divide-[#f1f5f9]">
              <AnimatePresence>
                {filtered.map((review) => (
                  <motion.div
                    key={review.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-[#f8fafc] transition-colors"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[1.5fr_2fr_110px_140px_80px] md:items-center gap-3 md:gap-4 px-6 py-4">
                      {/* Avatar + Name */}
                      <div className="flex items-center gap-3">
                        {review.image ? (
                          <Image
                            src={getCloudinaryUrl(review.image, { width: 80 })}
                            alt={review.name}
                            width={38}
                            height={38}
                            className="rounded-full object-cover shrink-0 border border-[#e2e8f0]"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-[#f1f5f9] border border-[#e2e8f0] flex items-center justify-center shrink-0 text-[#0f172a]">
                            <User className="w-4 h-4 text-[#64748b]" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#0f172a] truncate">
                            {review.name}
                          </p>
                          <p className="text-[11px] text-[#64748b] truncate">
                            {review.role}{review.company && ` · ${review.company}`}
                          </p>
                        </div>
                      </div>

                      {/* Review text snippet */}
                      <div className="text-xs text-[#475569] line-clamp-2 leading-relaxed">
                        &ldquo;{review.review}&rdquo;
                      </div>

                      {/* Star rating */}
                      <div>
                        <StarRating rating={review.rating} />
                      </div>

                      {/* Status toggle buttons */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {/* Approve toggle */}
                        <button
                          onClick={() => handleToggle(review, "approved")}
                          disabled={!!toggling}
                          title={review.approved ? "Click to move to pending" : "Click to approve and publish"}
                          className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border transition-all ${
                            review.approved
                              ? "text-emerald-800 bg-emerald-50 border-emerald-300 hover:bg-emerald-100"
                              : "text-amber-800 bg-amber-50 border-amber-300 hover:bg-amber-100"
                          }`}
                        >
                          {review.approved ? <Check className="w-3 h-3 text-emerald-600" /> : <X className="w-3 h-3 text-amber-600" />}
                          <span>{review.approved ? "Live" : "Pending"}</span>
                        </button>

                        {/* Featured toggle */}
                        <button
                          onClick={() => handleToggle(review, "featured")}
                          disabled={!!toggling}
                          title={review.featured ? "Remove from featured showcase" : "Mark as featured testimonial"}
                          className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full border transition-all ${
                            review.featured
                              ? "text-blue-800 bg-blue-50 border-blue-300 hover:bg-blue-100"
                              : "text-[#64748b] bg-white border-[#cbd5e1] hover:bg-[#f8fafc]"
                          }`}
                        >
                          <Star className={`w-3 h-3 ${review.featured ? "text-blue-600 fill-blue-600" : "text-[#94a3b8]"}`} />
                          <span>{review.featured ? "Feat" : "—"}</span>
                        </button>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => { setSelectedReview(review); setModalOpen(true); }}
                          className="p-1.5 rounded-lg text-[#64748b] hover:text-[#0f172a] hover:bg-white transition-colors"
                          title="Edit review"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(review)}
                          className="p-1.5 rounded-lg text-[#94a3b8] hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete review"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        review={selectedReview}
        onSave={handleSave}
      />
    </div>
  );
}
