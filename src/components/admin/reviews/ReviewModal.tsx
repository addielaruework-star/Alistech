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
      setName("");
      setCompany("");
      setRole("");
      setReviewText("");
      setRating(5);
      setFeatured(false);
      setApproved(false);
      setExistingAvatarUrl("");
      setAvatarPreview("");
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
        setUploadStatus("Uploading client avatar to Cloudinary...");
        const uploadId = review?.id || `temp-${Date.now()}`;
        finalAvatarUrl = await uploadReviewAvatar(uploadId, avatarFile);
      }

      setUploadStatus("Saving testimonial document...");

      await onSave({
        name: name.trim(),
        company: company.trim(),
        role: role.trim(),
        review: reviewText.trim(),
        rating,
        featured,
        approved,
        image: finalAvatarUrl,
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 700);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to save review.");
    } finally {
      setLoading(false);
      setUploadStatus("");
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview("");
    setExistingAvatarUrl("");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !loading && onClose()}
          className="fixed inset-0 bg-[#0f172a]/50 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 12 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-8 max-h-[90vh] overflow-y-auto z-10 shadow-2xl text-[#0f172a]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[#f1f5f9] mb-5">
            <div>
              <h2 className="font-sora font-bold text-xl text-[#0f172a]">
                {isEdit ? "Edit Testimonial" : "Add Client Testimonial"}
              </h2>
              <p className="text-xs text-[#64748b] mt-1">
                Configure feedback, rating, and avatar to build client credibility.
              </p>
            </div>
            <button
              onClick={onClose}
              disabled={loading}
              className="p-1.5 rounded-lg text-[#94a3b8] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors disabled:opacity-40"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4.5">
            {/* Avatar & Name Row */}
            <div className="flex items-start gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                  Avatar
                </label>
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-[#f8fafc] border border-[#cbd5e1] flex items-center justify-center shrink-0 shadow-2xs">
                  {avatarPreview ? (
                    <>
                      <img
                        src={avatarPreview}
                        alt="Avatar preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveAvatar}
                        className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                        title="Remove photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center cursor-pointer hover:bg-[#f1f5f9] transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                      />
                      <User className="w-5 h-5 text-[#94a3b8]" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm text-[#0f172a] bg-[#f8fafc] border border-[#cbd5e1] focus:bg-white focus:outline-none focus:border-[#0f172a] focus:ring-2 focus:ring-[#7CFF4F]/50 transition-all placeholder:text-[#94a3b8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Acme Health"
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm text-[#0f172a] bg-[#f8fafc] border border-[#cbd5e1] focus:bg-white focus:outline-none focus:border-[#0f172a] focus:ring-2 focus:ring-[#7CFF4F]/50 transition-all placeholder:text-[#94a3b8]"
                  />
                </div>
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                Role / Title
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Chief Operating Officer"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm text-[#0f172a] bg-[#f8fafc] border border-[#cbd5e1] focus:bg-white focus:outline-none focus:border-[#0f172a] focus:ring-2 focus:ring-[#7CFF4F]/50 transition-all placeholder:text-[#94a3b8]"
              />
            </div>

            {/* Star Rating Picker */}
            <div>
              <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                Star Rating ({rating} of 5)
              </label>
              <div className="flex items-center gap-1.5 p-2 bg-[#f8fafc] rounded-xl border border-[#cbd5e1] w-fit">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                    aria-label={`Select ${star} stars`}
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-[#cbd5e1]"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review text */}
            <div>
              <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                Testimonial Content *
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
                rows={4}
                placeholder="What did the client say about partnering with AlisTech?"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm text-[#0f172a] bg-[#f8fafc] border border-[#cbd5e1] focus:bg-white focus:outline-none focus:border-[#0f172a] focus:ring-2 focus:ring-[#7CFF4F]/50 transition-all placeholder:text-[#94a3b8] resize-y"
              />
            </div>

            {/* Checkboxes */}
            <div className="flex flex-wrap gap-6 pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={approved}
                  onChange={(e) => setApproved(e.target.checked)}
                  className="w-4 h-4 rounded border-[#cbd5e1] text-[#0f172a] focus:ring-[#7CFF4F]"
                />
                <div>
                  <span className="text-xs font-semibold text-[#0f172a]">Approved (Live)</span>
                  <p className="text-[11px] text-[#64748b]">Display on public website</p>
                </div>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded border-[#cbd5e1] text-[#0f172a] focus:ring-[#7CFF4F]"
                />
                <div>
                  <span className="text-xs font-semibold text-[#0f172a]">Featured</span>
                  <p className="text-[11px] text-[#64748b]">Show on landing page</p>
                </div>
              </label>
            </div>

            {/* Alerts */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-red-200 bg-red-50 text-red-700 text-xs shadow-2xs"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
                <span>{error}</span>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs shadow-2xs"
              >
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                <span>Testimonial saved successfully!</span>
              </motion.div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 pt-5 border-t border-[#f1f5f9] mt-3">
              {uploadStatus && (
                <span className="text-xs text-blue-600 font-medium animate-pulse mr-auto">
                  {uploadStatus}
                </span>
              )}
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#64748b] border border-[#cbd5e1] hover:text-[#0f172a] hover:bg-[#f8fafc] transition-colors disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#0f172a] hover:bg-[#1e293b] transition-all flex items-center gap-2 disabled:opacity-50 shadow-2xs"
              >
                {loading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save Testimonial</span>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
