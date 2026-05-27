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
          className={`w-3 h-3 ${s <= rating ? "text-amber-400" : "text-white/10"}`}
          fill={s <= rating ? "currentColor" : "none"}
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

  const { user, isAdmin } = useAuth();

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
    if (!confirm(`Delete review from "${review.name}"? This cannot be undone.`)) return;
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
      <div className="max-w-md mx-auto py-16 text-center space-y-5">
        <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
          <AlertCircle className="w-5 h-5 text-red-400" />
        </div>
        <div>
          <h2 className="font-sora font-semibold text-white text-base">Connection Issue</h2>
          <p className="text-white/40 text-xs mt-1.5 leading-relaxed">{error}</p>
        </div>
        <button
          onClick={fetchReviews}
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
          <h1 className="font-sora font-bold text-xl text-white mb-1">Reviews</h1>
          <p className="text-white/35 text-sm">
            {reviews.length} total — {pendingCount > 0 && (
              <span className="text-amber-400 font-medium">{pendingCount} pending approval</span>
            )}
            {pendingCount === 0 && "all approved"}
          </p>
        </div>
        <button
          onClick={() => { setSelectedReview(null); setModalOpen(true); }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 hover:shadow-[0_0_16px_rgba(37,99,235,0.3)] transition-all w-fit"
        >
          <Plus className="w-4 h-4" /> Add Review
        </button>
      </div>

      {/* Stats mini-row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total", value: reviews.length, color: "text-white" },
          { label: "Approved", value: approvedCount, color: "text-green-400" },
          { label: "Featured", value: featuredCount, color: "text-blue-400" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-xl border border-white/[0.06] bg-white/[0.015] px-4 py-3">
            <p className="text-[10px] uppercase font-bold tracking-widest text-white/25 mb-1">{label}</p>
            <p className={`font-sora font-bold text-xl ${color}`}>
              {loading ? <span className="inline-block h-6 w-8 rounded bg-white/[0.06] animate-pulse" /> : value}
            </p>
          </div>
        ))}
      </div>

      {/* Search + filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reviews..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-white bg-white/[0.03] border border-white/[0.08] placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-all"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "approved", "pending"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilterApproved(f)}
              className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all capitalize ${
                filterApproved === f
                  ? f === "pending"
                    ? "text-amber-400 bg-amber-500/10 border-amber-500/25"
                    : f === "approved"
                    ? "text-green-400 bg-green-500/10 border-green-500/25"
                    : "text-white bg-white/[0.07] border-white/[0.10]"
                  : "text-white/30 border-white/[0.06] hover:text-white/60"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews list */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] overflow-hidden">
        {loading ? (
          <div className="divide-y divide-white/[0.04]">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4">
                <div className="w-9 h-9 rounded-full bg-white/[0.06] animate-pulse flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-4 w-32 rounded bg-white/[0.06] animate-pulse" />
                  <div className="h-3 w-48 rounded bg-white/[0.04] animate-pulse" />
                </div>
                <div className="h-5 w-16 rounded-full bg-white/[0.06] animate-pulse" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <MessageSquare className="w-8 h-8 text-white/10 mx-auto mb-3" />
            <p className="text-white/30 text-sm">
              {search || filterApproved !== "all" ? "No reviews match your filters." : "No reviews yet. Add your first testimonial!"}
            </p>
          </div>
        ) : (
          /* Table header */
          <>
            <div className="hidden md:grid grid-cols-[auto_1fr_100px_130px_80px] gap-4 px-5 py-3 border-b border-white/[0.04] text-[10px] font-semibold uppercase tracking-widest text-white/20">
              <span>Client</span>
              <span>Review</span>
              <span>Rating</span>
              <span>Status</span>
              <span />
            </div>
            <AnimatePresence>
              {filtered.map((review) => (
                <motion.div
                  key={review.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                  className="border-b border-white/[0.04] last:border-0"
                >
                  <div className="md:grid md:grid-cols-[auto_1fr_100px_130px_80px] md:items-center gap-4 px-5 py-4 hover:bg-white/[0.015] transition-colors">
                    {/* Avatar + name */}
                    <div className="flex items-center gap-3 mb-2 md:mb-0">
                      {review.image ? (
                        <Image
                          src={getCloudinaryUrl(review.image, { width: 72 })}
                          alt={review.name}
                          width={36}
                          height={36}
                          className="rounded-full object-cover flex-shrink-0 border border-white/[0.08]"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-blue-400" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm text-white font-medium truncate">{review.name}</p>
                        <p className="text-[10px] text-white/30 truncate">
                          {review.role}{review.company && ` · ${review.company}`}
                        </p>
                      </div>
                    </div>

                    {/* Review text snippet */}
                    <p className="text-xs text-white/40 line-clamp-2 leading-relaxed hidden md:block">
                      &ldquo;{review.review}&rdquo;
                    </p>

                    {/* Star rating */}
                    <div className="hidden md:block">
                      <StarRating rating={review.rating} />
                    </div>

                    {/* Status toggles */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {/* Approve toggle */}
                      <button
                        onClick={() => handleToggle(review, "approved")}
                        disabled={!!toggling}
                        title={review.approved ? "Click to unapprove" : "Click to approve"}
                        className={`flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border transition-all ${
                          review.approved
                            ? "text-green-400 bg-green-500/10 border-green-500/25 hover:bg-green-500/20"
                            : "text-amber-400 bg-amber-500/10 border-amber-500/25 hover:bg-amber-500/20"
                        }`}
                      >
                        {review.approved ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
                        {review.approved ? "Live" : "Pending"}
                      </button>

                      {/* Featured toggle */}
                      <button
                        onClick={() => handleToggle(review, "featured")}
                        disabled={!!toggling}
                        title={review.featured ? "Remove from featured" : "Add to featured"}
                        className={`flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border transition-all ${
                          review.featured
                            ? "text-blue-400 bg-blue-500/10 border-blue-500/25 hover:bg-blue-500/20"
                            : "text-white/20 bg-white/[0.02] border-white/[0.06] hover:border-white/20"
                        }`}
                      >
                        <Star className="w-2.5 h-2.5" fill={review.featured ? "currentColor" : "none"} />
                        {review.featured ? "Feat." : "—"}
                      </button>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 mt-2 md:mt-0">
                      <button
                        onClick={() => { setSelectedReview(review); setModalOpen(true); }}
                        className="p-1.5 rounded-lg text-white/25 hover:text-white hover:bg-white/[0.05] transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(review)}
                        className="p-1.5 rounded-lg text-white/15 hover:text-red-400 hover:bg-red-500/[0.06] transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Modal */}
      <ReviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        review={selectedReview}
        onSave={handleSave}
      />
    </div>
  );
}
