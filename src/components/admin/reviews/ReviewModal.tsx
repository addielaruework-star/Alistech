"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Upload,
  Trash2,
  Star,
  AlertCircle,
  CheckCircle2,
  User,
} from "lucide-react";
import { type Review } from "@/types/review";
import { uploadReviewAvatar } from "@/lib/storage";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  review?: Review | null;
  onSave: (data: Omit<Review, "id" | "createdAt">) => Promise<void>;
}

export default function ReviewModal({
  isOpen,
  onClose,
  review,
  onSave,
}: ReviewModalProps) {
  const isEdit = !!review;

  /* ── Form state ─────────────────────────────────────────────────────────── */
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [featured, setFeatured] = useState(false);
  const [approved, setApproved] = useState(false);

  /* ── Avatar state ───────────────────────────────────────────────────────── */
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [existingAvatarUrl, setExistingAvatarUrl] = useState("");

  /* ── Action state ───────────────────────────────────────────────────────── */
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  /* ── Load data on open ──────────────────────────────────────────────────── */
  useEffect(() => {
    if (review) {
      setName(review.name);
      setCompany(review.company);
      setRole(review.role);
      setReviewText(review.review);
      setRating(review.rating);
      setFeatured(review.featured);
      setApproved(review.approved);
      setExistingAvatarUrl(review.image);
      setAvatarPreview(review.image);
    } else {
      setName(""); setCompany(""); setRole(""); setReviewText("");
      setRating(5); setFeatured(false); setApproved(false);
      setExistingAvatarUrl(""); setAvatarPreview("");
    }
    setAvatarFile(null);
    setError(null);
    setSuccess(false);
  }, [review, isOpen]);

  /* ── Submit ─────────────────────────────────────────────────────────────── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!name.trim()) return setError("Client name is required.");
    if (!reviewText.trim()) return setError("Review text is required.");
    if (rating < 1 || rating > 5) return setError("Rating must be between 1 and 5.");

    setLoading(true);
    setError(null);

    try {
      let finalAvatarUrl = existingAvatarUrl;

      if (avatarFile) {
        setUploadStatus("Uploading avatar image...");
        // Use a temp ID for new reviews, review.id for edits
        const uploadId = review?.id || `temp-${Date.now()}`;
        finalAvatarUrl = await uploadReviewAvatar(uploadId, avatarFile);
      }

      setUploadStatus("Saving review...");

      await onSave({
        name: name.trim(),
        company: company.trim(),
        role: role.trim(),
        review: reviewText.trim(),
        rating,
        image: finalAvatarUrl,
        featured,
        approved,
      });

      setSuccess(true);
      setTimeout(() => onClose(), 1500);
    } catch (err: any) {
      setError(err?.message || "Failed to save review. Please try again.");
    } finally {
      setLoading(false);
      setUploadStatus("");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !loading && onClose()}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-xl rounded-2xl border border-white/[0.08] bg-[#09090e] p-6 lg:p-8 max-h-[90vh] overflow-y-auto z-10 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-white/[0.06] mb-6">
            <div>
              <h2 className="font-sora font-bold text-base text-white flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400" fill="currentColor" />
                {isEdit ? "Edit Review" : "Add Review"}
              </h2>
              <p className="text-xs text-white/30 mt-1">
                New reviews require manual approval before going public.
              </p>
            </div>
            <button
              onClick={onClose}
              disabled={loading}
              className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Avatar upload */}
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0">
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-white/35 mb-2">
                  Photo
                </label>
                <div className="relative w-16 h-16">
                  {avatarPreview ? (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/[0.1] group">
                      <img
                        src={avatarPreview}
                        alt="Avatar Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setAvatarFile(null);
                          setAvatarPreview("");
                          setExistingAvatarUrl("");
                        }}
                        className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  ) : (
                    <div className="relative w-16 h-16 rounded-full border border-dashed border-white/[0.15] bg-white/[0.02] hover:border-white/30 transition-colors cursor-pointer flex items-center justify-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) {
                            setAvatarFile(f);
                            setAvatarPreview(URL.createObjectURL(f));
                          }
                        }}
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                      />
                      <User className="w-5 h-5 text-white/20" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-white/35 mb-1.5">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="John Smith"
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm text-white bg-white/[0.03] border border-white/[0.08] focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-white/20"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-white/35 mb-1.5">
                    Company
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Corp"
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm text-white bg-white/[0.03] border border-white/[0.08] focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-white/20"
                  />
                </div>
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-white/35 mb-1.5">
                Role / Title
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="CEO, Founder, Marketing Director..."
                className="w-full px-3.5 py-2.5 rounded-xl text-sm text-white bg-white/[0.03] border border-white/[0.08] focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-white/20"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-white/35 mb-2">
                Rating
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-6 h-6 transition-colors ${
                        star <= rating
                          ? "text-amber-400"
                          : "text-white/15"
                      }`}
                      fill={star <= rating ? "currentColor" : "none"}
                    />
                  </button>
                ))}
                <span className="ml-2 text-xs text-white/30">
                  {rating}/5 stars
                </span>
              </div>
            </div>

            {/* Review text */}
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-white/35 mb-1.5">
                Review Text *
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
                rows={4}
                placeholder="What the client said about working with AlisTech..."
                className="w-full px-3.5 py-2.5 rounded-xl text-sm text-white bg-white/[0.03] border border-white/[0.08] focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-white/20 resize-y"
              />
            </div>

            {/* Toggles */}
            <div className="flex flex-wrap gap-5 pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <div
                  onClick={() => setApproved(!approved)}
                  className={`w-9 h-5 rounded-full flex items-center transition-colors cursor-pointer ${
                    approved ? "bg-green-500" : "bg-white/[0.1]"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white shadow transition-transform ml-0.5 ${
                      approved ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </div>
                <div>
                  <span className="text-xs text-white font-medium">Approved</span>
                  <p className="text-[10px] text-white/25">Show publicly on website</p>
                </div>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <div
                  onClick={() => setFeatured(!featured)}
                  className={`w-9 h-5 rounded-full flex items-center transition-colors cursor-pointer ${
                    featured ? "bg-blue-600" : "bg-white/[0.1]"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white shadow transition-transform ml-0.5 ${
                      featured ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </div>
                <div>
                  <span className="text-xs text-white font-medium">Featured</span>
                  <p className="text-[10px] text-white/25">Show on homepage</p>
                </div>
              </label>
            </div>

            {/* Alerts */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/[0.04] text-red-400 text-xs"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-green-500/20 bg-green-500/[0.04] text-green-400 text-xs"
              >
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                Review saved successfully!
              </motion.div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 pt-5 border-t border-white/[0.05] mt-2">
              {uploadStatus && (
                <span className="text-xs text-blue-400 animate-pulse mr-auto">
                  {uploadStatus}
                </span>
              )}
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white/50 border border-white/[0.08] hover:text-white hover:bg-white/[0.04] transition-all disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center gap-2 disabled:opacity-45"
              >
                {loading ? (
                  <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
                ) : (
                  "Save Review"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
