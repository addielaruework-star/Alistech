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
  // galleryItems stores File objects for newly selected images, or URL strings for existing ones
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
      .replace(/[^\w\s-]/g, "") // remove special chars
      .replace(/[\s_]+/g, "-") // replace spaces/underscores with hyphens
      .replace(/^-+|-+$/g, ""); // trim hyphens
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

      // Map new clean schema correctly:
      const initialImages = project.galleryImages || [];
      setGalleryItems(initialImages);
      setImagePreviews(initialImages);
    } else {
      // Reset to defaults for Add mode
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

  /* ── Drag & Drop / File Select Images ───────────────────────────────────── */
  const handleImagesSelect = (files: FileList) => {
    const newFiles = Array.from(files);
    setGalleryItems((prev) => [...prev, ...newFiles]);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImagesSelect(e.dataTransfer.files);
    }
  };

  /* ── Remove Project Image ───────────────────────────────────────────────── */
  const handleRemoveImageItem = (index: number) => {
    const previewToRemove = imagePreviews[index];
    if (previewToRemove && !previewToRemove.startsWith("http")) {
      URL.revokeObjectURL(previewToRemove);
    }
    setGalleryItems((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  /* ── Reorder Project Images ─────────────────────────────────────────────── */
  const handleMoveItem = (fromIndex: number, direction: "up" | "down") => {
    const toIndex = direction === "up" ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= galleryItems.length) return;

    const updatedItems = [...galleryItems];
    const updatedPreviews = [...imagePreviews];

    // Swap items
    const tempItem = updatedItems[fromIndex];
    updatedItems[fromIndex] = updatedItems[toIndex];
    updatedItems[toIndex] = tempItem;

    // Swap previews
    const tempPreview = updatedPreviews[fromIndex];
    updatedPreviews[fromIndex] = updatedPreviews[toIndex];
    updatedPreviews[toIndex] = tempPreview;

    setGalleryItems(updatedItems);
    setImagePreviews(updatedPreviews);
  };

  /* ── Submit & Atomic Upload ──────────────────────────────────────────────── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    // Strict Schema validation
    if (!title.trim()) return setError("Project Title is required.");
    if (!slug.trim()) return setError("Slug is required.");
    if (!shortDescription.trim()) return setError("Short Description is required.");
    if (galleryItems.length === 0) return setError("At least 1 gallery image is required.");

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const finalImageUrls: string[] = [];

      // Separate existing Cloudinary URLs from newly uploaded Files
      const newFiles: File[] = [];
      const newFileIndices: number[] = [];

      galleryItems.forEach((item, index) => {
        if (typeof item === "string") {
          finalImageUrls.push(item);
        } else {
          newFiles.push(item);
          newFileIndices.push(index);
        }
      });

      // Upload newly added files to Cloudinary
      if (newFiles.length > 0) {
        setUploadStatus(`Uploading ${newFiles.length} new gallery image(s) to Cloudinary...`);
        const uploadedUrls = await uploadProjectImages(slug, newFiles);
        
        // Map the uploaded URLs back to their exact original position to respect ordering
        let uploadCounter = 0;
        galleryItems.forEach((item, index) => {
          if (typeof item !== "string") {
            finalImageUrls.splice(index, 0, uploadedUrls[uploadCounter]);
            uploadCounter++;
          }
        });
      }

      setUploadStatus("Saving project document...");

      // Parse technologies to array
      const parsedTech = technologies
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      // Auto-assign: coverImage = galleryImages[0]
      const coverImage = finalImageUrls[0] || "";

      const projectData: Omit<Project, "id" | "createdAt" | "updatedAt"> = {
        title: title.trim(),
        slug: slug.trim(),
        category: category.trim(),
        clientType: clientType.trim(),
        shortDescription: shortDescription.trim(),
        fullDescription: fullDescription.trim(),
        technologies: parsedTech,
        galleryImages: finalImageUrls,
        coverImage,
        featured,
        published,
      };

      // Save to Firestore using clean CRUD operations
      await onSave(projectData);

      // Clean up local preview objectURLs to prevent memory leaks
      imagePreviews.forEach((preview) => {
        if (preview && !preview.startsWith("http")) {
          URL.revokeObjectURL(preview);
        }
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1200);
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
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal content sheet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl rounded-2xl border border-white/[0.08] bg-[#09090e] p-6 lg:p-8 max-h-[90vh] overflow-y-auto z-10 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-white/[0.06] mb-6">
            <div>
              <h2 className="font-sora font-bold text-lg text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                {isEdit ? "Edit Project" : "Add Portfolio Project"}
              </h2>
              <p className="text-xs text-white/35 mt-1">
                Configure details and upload gallery showcase images. First image acts as the cover automatically.
              </p>
            </div>
            <button
              onClick={onClose}
              disabled={loading}
              className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.05] transition-colors disabled:opacity-40"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title & Slug Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10.5px] font-semibold uppercase tracking-widest text-white/40 mb-1.5">
                  Project Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  required
                  placeholder="e.g. Real Estate Platform"
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white bg-white/[0.03] border border-white/[0.08] focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-white/20"
                />
              </div>

              <div>
                <label className="block text-[10.5px] font-semibold uppercase tracking-widest text-white/40 mb-1.5">
                  Slug (Auto-generated)
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(generateSlug(e.target.value))}
                  required
                  placeholder="e.g. real-estate-platform"
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white bg-white/[0.015] border border-white/[0.05] text-white/50 focus:outline-none focus:border-blue-500/30 transition-all"
                />
              </div>
            </div>

            {/* Category & Client Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10.5px] font-semibold uppercase tracking-widest text-white/40 mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white bg-white/[0.03] border border-white/[0.08] focus:outline-none focus:border-blue-500/50 transition-all cursor-pointer"
                >
                  <option value="Concept Project" className="bg-[#09090e]">Concept Project</option>
                  <option value="Client Project" className="bg-[#09090e]">Client Project</option>
                  <option value="SaaS Platform" className="bg-[#09090e]">SaaS Platform</option>
                  <option value="Mobile Application" className="bg-[#09090e]">Mobile Application</option>
                </select>
              </div>

              <div>
                <label className="block text-[10.5px] font-semibold uppercase tracking-widest text-white/40 mb-1.5">
                  Target Client / Audience
                </label>
                <input
                  type="text"
                  value={clientType}
                  onChange={(e) => setClientType(e.target.value)}
                  placeholder="e.g. Real Estate Agencies"
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white bg-white/[0.03] border border-white/[0.08] focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-white/20"
                />
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <label className="block text-[10.5px] font-semibold uppercase tracking-widest text-white/40 mb-1.5">
                Technologies (comma-separated list)
              </label>
              <input
                type="text"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                placeholder="e.g. Next.js, Firebase, Tailwind CSS, Recharts"
                className="w-full px-4 py-2.5 rounded-xl text-sm text-white bg-white/[0.03] border border-white/[0.08] focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-white/20"
              />
            </div>

            {/* Description Fields */}
            <div>
              <label className="block text-[10.5px] font-semibold uppercase tracking-widest text-white/40 mb-1.5">
                Short Description
              </label>
              <textarea
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                required
                rows={2}
                placeholder="A brief 1-2 sentence hook displaying on portfolio search card..."
                className="w-full px-4 py-2.5 rounded-xl text-sm text-white bg-white/[0.03] border border-white/[0.08] focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-white/20 resize-y"
              />
            </div>

            <div>
              <label className="block text-[10.5px] font-semibold uppercase tracking-widest text-white/40 mb-1.5">
                Full Description / Case Study
              </label>
              <textarea
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                rows={4}
                placeholder="Write a highly-detailed showcase description for the inner project detail page..."
                className="w-full px-4 py-2.5 rounded-xl text-sm text-white bg-white/[0.03] border border-white/[0.08] focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-white/20 resize-y"
              />
            </div>

            {/* Unified Uploader (galleryImages only) */}
            <div>
              <label className="block text-[10.5px] font-semibold uppercase tracking-widest text-white/40 mb-1">
                Gallery / Mockup Images
              </label>
              <span className="block text-[10px] text-white/30 mb-2.5">
                Drag-and-drop or select images. Reorder them below using the arrows. The first image automatically becomes the project Cover.
              </span>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border border-dashed rounded-xl transition-all p-6 bg-white/[0.01] flex flex-col justify-center min-h-[140px] ${
                  isDragging ? "border-blue-500 bg-blue-500/[0.02]" : "border-white/[0.12] hover:border-white/30"
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
                  <Upload className="w-8 h-8 text-white/30 mb-2" />
                  <span className="text-xs text-white/50 font-medium">Add Gallery Images</span>
                  <span className="text-[10px] text-white/20 mt-1">Drag files here or click to browse</span>
                </div>

                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/[0.05]">
                    {imagePreviews.map((preview, i) => (
                      <div
                        key={i}
                        className="relative rounded-xl aspect-[16/10] bg-white/[0.02] border border-white/[0.05] overflow-hidden group shadow-lg"
                      >
                        <img
                          src={preview}
                          alt={`Gallery Image ${i}`}
                          className="w-full h-full object-cover"
                        />
                        {/* Badges */}
                        {i === 0 && (
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-blue-600 border border-blue-400/20 text-[8.5px] font-bold text-white uppercase tracking-wider select-none shadow">
                            Cover Image
                          </div>
                        )}
                        <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 text-[8.5px] text-white/60 font-medium select-none shadow">
                          #{i + 1}
                        </div>

                        {/* Hover Overlay Controls */}
                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-200">
                          {/* Reordering */}
                          <button
                            type="button"
                            disabled={i === 0}
                            onClick={() => handleMoveItem(i, "up")}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 disabled:pointer-events-none transition-all shadow"
                            title="Move image up"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            disabled={i === imagePreviews.length - 1}
                            onClick={() => handleMoveItem(i, "down")}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 disabled:pointer-events-none transition-all shadow"
                            title="Move image down"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
                          {/* Deletion */}
                          <button
                            type="button"
                            onClick={() => handleRemoveImageItem(i)}
                            className="p-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white transition-all shadow"
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

            {/* Featured & Published Toggles */}
            <div className="flex flex-wrap gap-6 pt-2">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4.5 h-4.5 rounded bg-white/[0.04] border border-white/[0.1] text-blue-600 focus:ring-0 focus:ring-offset-0 focus:outline-none"
                />
                <span className="text-xs text-white/80 font-medium">Featured Project</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-4.5 h-4.5 rounded bg-white/[0.04] border border-white/[0.1] text-blue-600 focus:ring-0 focus:ring-offset-0 focus:outline-none"
                />
                <span className="text-xs text-white/80 font-medium">Publish Immediately</span>
              </label>
            </div>

            {/* Alerts */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/[0.04] text-red-400 text-xs shadow-md"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-green-500/20 bg-green-500/[0.04] text-green-400 text-xs shadow-md"
              >
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                Project saved successfully!
              </motion.div>
            )}

            {/* Footer / Submit */}
            <div className="flex items-center justify-end gap-3 pt-5 border-t border-white/[0.06] mt-4">
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
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 hover:shadow-[0_0_16px_rgba(37,99,235,0.3)] transition-all flex items-center gap-2 disabled:opacity-45 shadow-lg"
              >
                {loading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Project"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
