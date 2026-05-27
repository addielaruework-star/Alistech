"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/lib/firestore";
import { deleteProjectImage, getCloudinaryUrl } from "@/lib/storage";
import { type Project } from "@/types/project";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import ProjectModal from "@/components/admin/projects/ProjectModal";
import { toast } from "sonner";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  /* ── Modal states ───────────────────────────────────────────────────────── */
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  /* ── Fetch projects on mount ────────────────────────────────────────────── */
  const fetchedRef = useRef(false);

  const fetchAllProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err: any) {
      console.error("Failed to fetch projects:", err);
      setError(err?.message || "Missing or insufficient permissions.");
      toast.error("Failed to load projects. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (!user || !isAdmin) return;
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchAllProjects();
  }, [user, isAdmin]);

  /* ── Filter projects ────────────────────────────────────────────────────── */
  const filteredProjects = projects.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.technologies.some((t) => t.toLowerCase().includes(q))
    );
  });

  /* ── Save/Create handler ────────────────────────────────────────────────── */
  const handleSaveProject = async (
    projectData: Omit<Project, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      if (selectedProject?.id) {
        // Edit mode
        await updateProject(selectedProject.id, projectData);
        toast.success("Project updated successfully!");
      } else {
        // Create mode
        await createProject(projectData);
        toast.success("New project created successfully!");
      }
      // Refresh listing
      await fetchAllProjects();
    } catch (err) {
      console.error("Save failed:", err);
      toast.error("Failed to save project");
    }
  };

  /* ── Toggle Published flag directly ────────────────────────────────────── */
  const handleTogglePublished = async (project: Project) => {
    if (!project.id) return;
    const nextPublished = !project.published;
    try {
      await updateProject(project.id, { published: nextPublished });
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, published: nextPublished } : p))
      );
      toast.success(nextPublished ? "Project published!" : "Project saved to draft.");
    } catch (err) {
      console.error("Failed to toggle status:", err);
      toast.error("Failed to update status.");
    }
  };

  /* ── Toggle Featured flag directly ─────────────────────────────────────── */
  const handleToggleFeatured = async (project: Project) => {
    if (!project.id) return;
    const nextFeatured = !project.featured;
    try {
      await updateProject(project.id, { featured: nextFeatured });
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, featured: nextFeatured } : p))
      );
      toast.success(
        nextFeatured ? "Added to featured showcase!" : "Removed from featured showcase."
      );
    } catch (err) {
      console.error("Failed to toggle featured status:", err);
      toast.error("Failed to update status.");
    }
  };

  /* ── Delete handler ─────────────────────────────────────────────────────── */
  const handleDeleteProject = async (project: Project) => {
    if (
      !confirm(
        `Are you sure you want to permanently delete the project "${project.title}"?\nThis will remove the database record and purge all associated images from Cloudinary.`
      )
    ) {
      return;
    }

    try {
      // 1. Delete document from Firestore
      if (project.id) {
        await deleteProject(project.id);
      }

      // 2. Delete all Project Images from Cloudinary Storage
      if (project.galleryImages && project.galleryImages.length > 0) {
        await Promise.all(
          project.galleryImages.map((imgUrl) => deleteProjectImage(imgUrl))
        );
      }

      // 3. Update state instantly for optimistic UX update
      setProjects((prev) => prev.filter((p) => p.id !== project.id));
      toast.success("Project and all associated assets deleted successfully!");
    } catch (err) {
      console.error("Failed to delete project:", err);
      toast.error("Error: Failed to completely delete the project.");
    }
  };

  /* ── Launch add modal ───────────────────────────────────────────────────── */
  const handleAddClick = () => {
    setSelectedProject(null);
    setModalOpen(true);
  };

  /* ── Launch edit modal ──────────────────────────────────────────────────── */
  const handleEditClick = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
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
          onClick={fetchAllProjects}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
        >
          Retry Load
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-sora font-bold text-xl text-white mb-1">
            Projects CMS
          </h1>
          <p className="text-white/35 text-sm">
            {projects.length} dynamic portfolio showcase{" "}
            {projects.length === 1 ? "project" : "projects"}.
          </p>
        </div>

        <button
          onClick={handleAddClick}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 hover:shadow-[0_0_16px_rgba(37,99,235,0.3)] transition-all cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="relative w-full">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, category, or technology stack..."
          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white bg-white/[0.03] border border-white/[0.08] placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-all"
        />
      </div>

      {/* Projects Grid List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl border border-white/[0.06] overflow-hidden aspect-[4/5] p-5 space-y-4 bg-white/[0.015]"
            >
              <div className="w-full h-40 bg-white/[0.03] rounded-xl animate-pulse" />
              <div className="h-5 w-2/3 bg-white/[0.03] rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-white/[0.03] rounded animate-pulse" />
              <div className="flex gap-2">
                <div className="h-6 w-12 bg-white/[0.03] rounded-full animate-pulse" />
                <div className="h-6 w-16 bg-white/[0.03] rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] px-5 py-20 text-center">
          <Briefcase className="w-10 h-10 text-white/10 mx-auto mb-4" />
          <h3 className="font-sora font-semibold text-white/60 text-sm">
            No projects found
          </h3>
          <p className="text-white/20 text-xs mt-1 max-w-sm mx-auto">
            {search
              ? "Try adjusting your search filters to find what you are looking for."
              : "Kickstart your dynamic portfolio by uploading your first case study showcase."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 group flex flex-col justify-between bg-white/[0.015] h-full"
              >
                <div>
                  {/* cover image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.02] border-b border-white/[0.05]">
                    {project.coverImage ? (
                      <Image
                        src={getCloudinaryUrl(project.coverImage, { width: 500 })}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/10">
                        <Briefcase className="w-8 h-8" />
                      </div>
                    )}

                    {/* Interactive Badge Toggles (Featured & Published) */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                      <button
                        onClick={() => handleTogglePublished(project)}
                        type="button"
                        className={`flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md transition-all shadow-md ${
                          project.published
                            ? "bg-green-500/20 border border-green-500/35 text-green-300 hover:bg-green-500/30"
                            : "bg-white/[0.08] border border-white/[0.15] text-white/50 hover:bg-white/[0.15]"
                        }`}
                        title="Click to toggle publish status"
                      >
                        {project.published ? (
                          <>
                            <Eye className="w-2.5 h-2.5" /> Published
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-2.5 h-2.5" /> Draft
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleToggleFeatured(project)}
                        type="button"
                        className={`flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md transition-all shadow-md ${
                          project.featured
                            ? "bg-blue-500/25 border border-blue-500/35 text-blue-300 hover:bg-blue-500/35"
                            : "bg-white/[0.04] border border-white/[0.08] text-white/35 hover:bg-white/[0.1]"
                        }`}
                        title="Click to toggle featured placement"
                      >
                        <Star className={`w-2.5 h-2.5 ${project.featured ? "text-blue-300 fill-blue-300" : ""}`} />
                        Featured
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-white/30">
                      <span>{project.category}</span>
                      {project.clientType && (
                        <span className="text-white/20 font-semibold lowercase tracking-normal">
                          for {project.clientType}
                        </span>
                      )}
                    </div>

                    <h3 className="font-sora font-bold text-white text-base group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs text-white/40 leading-relaxed line-clamp-2">
                      {project.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Footer stack technologies & buttons */}
                <div className="p-5 pt-0 mt-auto space-y-4">
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[10px] text-white/40 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 rounded bg-white/[0.02] border border-transparent text-[10px] text-white/20">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 pt-3 border-t border-white/[0.04]">
                    <button
                      onClick={() => handleEditClick(project)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[10.5px] font-semibold text-white/60 bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:text-white transition-all shadow"
                    >
                      <Edit2 className="w-3 h-3" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project)}
                      className="p-2 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/[0.06] border border-transparent hover:border-red-500/10 transition-all"
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Manage Project Modal sheet */}
      <ProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        project={selectedProject}
        onSave={handleSaveProject}
      />
    </div>
  );
}
