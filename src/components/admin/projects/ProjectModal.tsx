"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Upload,
  Trash2,
  ChevronUp,
  ChevronDown,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { type Project } from "@/types/project";
import { uploadProjectImages } from "@/lib/storage";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Project | null;
  onSave: (projectData: Omit<Project, "id" | "createdAt" | "updatedAt">) => Promise<void>;
}

export default function ProjectModal({
  isOpen,
  onClose,
  project,
  onSave,
}: ProjectModalProps) {
  const isEdit = !!project;

  /* ── Form States ────────────────────────────────────────────────────────── */
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Concept Project");
  const [clientType, setClientType] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);

  /* ── Image states ───────────────────────────────────────────────────────── */
  const [galleryItems, setGalleryItems] = useState<(File | string)[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  /* ── Action States ──────────────────────────────────────────────────────── */
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  /* ── Auto slug generator ────────────────────────────────────────────────── */
  const generateSlug = (val: string) => {
    return val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    setSlug(generateSlug(val));
  };

  /* ── Load existing project data ─────────────────────────────────────────── */
  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setSlug(project.slug);
      setCategory(project.category);
      setClientType(project.clientType || "");
      setShortDescription(project.shortDescription);
      setFullDescription(project.fullDescription);
      setTechnologies(project.technologies.join(", "));
      setFeatured(project.featured);
      setPublished(project.published);

      const initialImages = project.galleryImages || [];
      setGalleryItems(initialImages);
      setImagePreviews(initialImages);
    } else {
      setTitle("");
      setSlug("");
      setCategory("Concept Project");
      setClientType("");
      setShortDescription("");
      setFullDescription("");
      setTechnologies("");
      setFeatured(false);
      setPublished(true);
      setGalleryItems([]);
      setImagePreviews([]);
    }
    setError(null);
    setSuccess(false);
  }, [project, isOpen]);

  /* ── Multiple Image Handler ─────────────────────────────────────────────── */
  const handleImagesSelect = (files: FileList) => {
    const newFiles = Array.from(files);
    setGalleryItems((prev) => [...prev, ...newFiles]);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImageItem = (index: number) => {
    setGalleryItems((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMoveItem = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= galleryItems.length) return;

    const newItems = [...galleryItems];
    const tempItem = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = tempItem;
    setGalleryItems(newItems);

    const newPreviews = [...imagePreviews];
    const tempPrev = newPreviews[index];
    newPreviews[index] = newPreviews[targetIndex];
    newPreviews[targetIndex] = tempPrev;
    setImagePreviews(newPreviews);
  };

  /* ── Drag & Drop ────────────────────────────────────────────────────────── */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleImagesSelect(e.dataTransfer.files);
    }
  };

  /* ── Submit / Save ──────────────────────────────────────────────────────── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!title.trim()) return setError("Project Title is required.");
    if (!slug.trim()) return setError("Project Slug is required.");
    if (!shortDescription.trim()) return setError("Short Description is required.");

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      let finalGalleryUrls: string[] = [];
      const newFilesToUpload: { file: File; originalIndex: number }[] = [];

      galleryItems.forEach((item, index) => {
        if (typeof item === "string") {
          finalGalleryUrls[index] = item;
        } else {
          newFilesToUpload.push({ file: item, originalIndex: index });
        }
      });

      if (newFilesToUpload.length > 0) {
        setUploadStatus(
          `Uploading ${newFilesToUpload.length} image(s) to Cloudinary...`
        );
        const uploadedUrls = await uploadProjectImages(
          slug,
          newFilesToUpload.map((n) => n.file)
        );

        uploadedUrls.forEach((url, i) => {
          const originalIdx = newFilesToUpload[i].originalIndex;
          finalGalleryUrls[originalIdx] = url;
        });
      }

      finalGalleryUrls = finalGalleryUrls.filter(Boolean);
      const computedCoverImage = finalGalleryUrls.length > 0 ? finalGalleryUrls[0] : "";

      const techArray = technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      setUploadStatus("Saving project document...");

      await onSave({
        title: title.trim(),
        slug: slug.trim(),
        category,
        clientType: clientType.trim(),
        shortDescription: shortDescription.trim(),
        fullDescription: fullDescription.trim(),
        technologies: techArray,
        featured,
        published,
        coverImage: computedCoverImage,
        galleryImages: finalGalleryUrls,
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 800);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "An unexpected error occurred during save.");
    } finally {
      setLoading(false);
      setUploadStatus("");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !loading && onClose()}
          className="fixed inset-0 bg-[#0f172a]/50 backdrop-blur-xs"
        />

        {/* Modal content sheet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 12 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-8 max-h-[90vh] overflow-y-auto z-10 shadow-2xl text-[#0f172a]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[#f1f5f9] mb-6">
            <div>
              <h2 className="font-sora font-bold text-xl text-[#0f172a] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#0f172a]" />
                <span>{isEdit ? "Edit Project" : "Add Portfolio Project"}</span>
              </h2>
              <p className="text-xs text-[#64748b] mt-1">
                Configure details and upload showcase images. The first image automatically acts as the cover.
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title & Slug Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  required
                  placeholder="e.g. Healthcare Automation Portal"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm text-[#0f172a] bg-[#f8fafc] border border-[#cbd5e1] focus:bg-white focus:outline-none focus:border-[#0f172a] focus:ring-2 focus:ring-[#7CFF4F]/50 transition-all placeholder:text-[#94a3b8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                  URL Slug (Auto-generated) *
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(generateSlug(e.target.value))}
                  required
                  placeholder="e.g. healthcare-automation-portal"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm text-[#0f172a] bg-[#f8fafc] border border-[#cbd5e1] focus:bg-white focus:outline-none focus:border-[#0f172a] focus:ring-2 focus:ring-[#7CFF4F]/50 transition-all font-mono text-xs"
                />
              </div>
            </div>

            {/* Category & Client Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm text-[#0f172a] bg-[#f8fafc] border border-[#cbd5e1] focus:bg-white focus:outline-none focus:border-[#0f172a] focus:ring-2 focus:ring-[#7CFF4F]/50 transition-all cursor-pointer"
                >
                  <option value="Concept Project">Concept Project</option>
                  <option value="Client Project">Client Project</option>
                  <option value="SaaS Platform">SaaS Platform</option>
                  <option value="Mobile Application">Mobile Application</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                  Target Client / Domain
                </label>
                <input
                  type="text"
                  value={clientType}
                  onChange={(e) => setClientType(e.target.value)}
                  placeholder="e.g. Healthcare Networks, Logistics"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm text-[#0f172a] bg-[#f8fafc] border border-[#cbd5e1] focus:bg-white focus:outline-none focus:border-[#0f172a] focus:ring-2 focus:ring-[#7CFF4F]/50 transition-all placeholder:text-[#94a3b8]"
                />
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                Technologies (comma-separated list)
              </label>
              <input
                type="text"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                placeholder="e.g. Next.js, Firebase, Tailwind CSS, Python"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm text-[#0f172a] bg-[#f8fafc] border border-[#cbd5e1] focus:bg-white focus:outline-none focus:border-[#0f172a] focus:ring-2 focus:ring-[#7CFF4F]/50 transition-all placeholder:text-[#94a3b8]"
              />
            </div>

            {/* Descriptions */}
            <div>
              <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                Short Description (Card Summary) *
              </label>
              <textarea
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                required
                rows={2}
                placeholder="A concise 1-2 sentence hook displayed on the portfolio card…"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm text-[#0f172a] bg-[#f8fafc] border border-[#cbd5e1] focus:bg-white focus:outline-none focus:border-[#0f172a] focus:ring-2 focus:ring-[#7CFF4F]/50 transition-all placeholder:text-[#94a3b8] resize-y"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                Full Case Study Details
              </label>
              <textarea
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                rows={4}
                placeholder="Full case study write-up with challenges, architectural solutions, and business outcomes…"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm text-[#0f172a] bg-[#f8fafc] border border-[#cbd5e1] focus:bg-white focus:outline-none focus:border-[#0f172a] focus:ring-2 focus:ring-[#7CFF4F]/50 transition-all placeholder:text-[#94a3b8] resize-y"
              />
            </div>

            {/* Image Gallery Upload Zone */}
            <div>
              <label className="block text-xs font-semibold text-[#0f172a] mb-1">
                Project Gallery Images
              </label>
              <span className="block text-xs text-[#64748b] mb-2.5">
                Drag-and-drop or click to browse. The first image automatically serves as the primary project cover.
              </span>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl transition-all p-6 bg-[#f8fafc] flex flex-col justify-center min-h-[140px] ${
                  isDragging
                    ? "border-[#0f172a] bg-[#f1f5f9]"
                    : "border-[#cbd5e1] hover:border-[#94a3b8]"
                }`}
              >
                <div className="relative w-full text-center flex flex-col items-center justify-center py-4">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => e.target.files && handleImagesSelect(e.target.files)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#e2e8f0] flex items-center justify-center mb-2 shadow-2xs">
                    <Upload className="w-5 h-5 text-[#0f172a]" />
                  </div>
                  <span className="text-xs text-[#0f172a] font-semibold">
                    Upload showcase images
                  </span>
                  <span className="text-[11px] text-[#64748b] mt-0.5">
                    Drag files here or click to choose from your computer
                  </span>
                </div>

                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mt-5 pt-5 border-t border-[#e2e8f0]">
                    {imagePreviews.map((preview, i) => (
                      <div
                        key={i}
                        className="relative rounded-xl aspect-[16/10] bg-white border border-[#e2e8f0] overflow-hidden group shadow-2xs"
                      >
                        <img
                          src={preview}
                          alt={`Gallery image ${i}`}
                          className="w-full h-full object-cover"
                        />
                        {i === 0 && (
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#0f172a] text-[9px] font-bold text-white uppercase tracking-wider select-none shadow-xs">
                            Cover
                          </div>
                        )}
                        <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-white/90 text-[9px] text-[#0f172a] font-semibold border border-[#e2e8f0] select-none shadow-xs">
                          #{i + 1}
                        </div>

                        {/* Hover Overlay Controls */}
                        <div className="absolute inset-0 bg-[#0f172a]/70 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity duration-150">
                          <button
                            type="button"
                            disabled={i === 0}
                            onClick={() => handleMoveItem(i, "up")}
                            className="p-1.5 rounded-lg bg-white/20 hover:bg-white text-white hover:text-[#0f172a] disabled:opacity-20 disabled:pointer-events-none transition-all"
                            title="Move image earlier"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            disabled={i === imagePreviews.length - 1}
                            onClick={() => handleMoveItem(i, "down")}
                            className="p-1.5 rounded-lg bg-white/20 hover:bg-white text-white hover:text-[#0f172a] disabled:opacity-20 disabled:pointer-events-none transition-all"
                            title="Move image later"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveImageItem(i)}
                            className="p-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-all"
                            title="Remove image"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Checkbox Toggles */}
            <div className="flex flex-wrap gap-6 pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded border-[#cbd5e1] text-[#0f172a] focus:ring-[#7CFF4F]"
                />
                <span className="text-xs font-semibold text-[#0f172a]">Featured on homepage</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-4 h-4 rounded border-[#cbd5e1] text-[#0f172a] focus:ring-[#7CFF4F]"
                />
                <span className="text-xs font-semibold text-[#0f172a]">Publish immediately</span>
              </label>
            </div>

            {/* Feedback Alerts */}
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
                <span>Project saved successfully!</span>
              </motion.div>
            )}

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 pt-5 border-t border-[#f1f5f9] mt-4">
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
                  <span>Save Project</span>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
