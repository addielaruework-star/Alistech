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
  AlertCircle,
  X,
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
      toast.success(nextPublished ? "Project published!" : "Project moved to draft.");
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
      if (project.id) {
        await deleteProject(project.id);
      }

      if (project.galleryImages && project.galleryImages.length > 0) {
        await Promise.all(
          project.galleryImages.map((imgUrl) => deleteProjectImage(imgUrl))
        );
      }

      setProjects((prev) => prev.filter((p) => p.id !== project.id));
      toast.success("Project and assets deleted successfully!");
    } catch (err) {
      console.error("Failed to delete project:", err);
      toast.error("Failed to delete the project.");
    }
  };

  const handleAddClick = () => {
    setSelectedProject(null);
    setModalOpen(true);
  };

  const handleEditClick = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
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
          onClick={fetchAllProjects}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0f172a] text-white hover:bg-[#1e293b] transition-colors"
        >
          Retry Load
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* ── Top Header Section ──────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-sora font-bold text-2xl text-[#0f172a] tracking-tight">
            Portfolio Projects
          </h1>
          <p className="text-sm text-[#64748b] mt-1">
            Manage your live portfolio case studies ({projects.length} total projects).
          </p>
        </div>

        <button
          onClick={handleAddClick}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#0f172a] hover:bg-[#1e293b] transition-all cursor-pointer shadow-2xs w-fit"
        >
          <Plus className="w-4 h-4 text-[#7CFF4F]" />
          <span>Add Project</span>
        </button>
      </div>

      {/* ── Search Bar ──────────────────────────────────────────────────────── */}
      <div className="relative w-full">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects by title, category, or technology stack…"
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

      {/* ── Projects Grid ───────────────────────────────────────────────────── */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[#e2e8f0] overflow-hidden p-5 space-y-4 bg-white shadow-xs animate-pulse"
            >
              <div className="w-full h-44 bg-[#f1f5f9] rounded-xl" />
              <div className="h-5 w-2/3 bg-[#f1f5f9] rounded" />
              <div className="h-4 w-1/2 bg-[#f1f5f9] rounded" />
              <div className="flex gap-2">
                <div className="h-6 w-14 bg-[#f1f5f9] rounded-full" />
                <div className="h-6 w-20 bg-[#f1f5f9] rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-[#e2e8f0] bg-white px-6 py-20 text-center shadow-xs">
          <Briefcase className="w-10 h-10 text-[#94a3b8] mx-auto mb-3 opacity-40" />
          <h3 className="font-sora font-semibold text-[#0f172a] text-sm">
            No projects found
          </h3>
          <p className="text-[#64748b] text-xs mt-1 max-w-sm mx-auto">
            {search
              ? "Try adjusting your search keywords."
              : "Create your first project case study to showcase on the AlisTech portfolio."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="rounded-2xl overflow-hidden border border-[#e2e8f0] bg-white hover:border-[#cbd5e1] hover:shadow-sm transition-all duration-200 flex flex-col justify-between shadow-xs group"
              >
                <div>
                  {/* Cover Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#f8fafc] border-b border-[#e2e8f0]">
                    {project.coverImage ? (
                      <Image
                        src={getCloudinaryUrl(project.coverImage, { width: 600 })}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#94a3b8]">
                        <Briefcase className="w-8 h-8 opacity-40" />
                      </div>
                    )}

                    {/* Interactive Badges (Published & Featured) */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                      <button
                        onClick={() => handleTogglePublished(project)}
                        type="button"
                        className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md transition-all shadow-xs ${
                          project.published
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100"
                            : "bg-white/90 text-[#64748b] border border-[#cbd5e1] hover:bg-white"
                        }`}
                        title="Toggle published status"
                      >
                        {project.published ? (
                          <>
                            <Eye className="w-3 h-3 text-emerald-600" />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 text-[#94a3b8]" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleToggleFeatured(project)}
                        type="button"
                        className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md transition-all shadow-xs ${
                          project.featured
                            ? "bg-blue-50 text-blue-800 border border-blue-300 hover:bg-blue-100"
                            : "bg-white/90 text-[#64748b] border border-[#cbd5e1] hover:bg-white"
                        }`}
                        title="Toggle featured showcase"
                      >
                        <Star
                          className={`w-3 h-3 ${
                            project.featured
                              ? "text-blue-600 fill-blue-600"
                              : "text-[#94a3b8]"
                          }`}
                        />
                        <span>Featured</span>
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                      <span>{project.category}</span>
                      {project.clientType && (
                        <span className="text-[#94a3b8] normal-case font-normal">
                          for {project.clientType}
                        </span>
                      )}
                    </div>

                    <h3 className="font-sora font-bold text-base text-[#0f172a] group-hover:text-blue-600 transition-colors line-clamp-1">
                      {project.title}
                    </h3>

                    <p className="text-xs text-[#475569] leading-relaxed line-clamp-2">
                      {project.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Footer stack technologies & buttons */}
                <div className="p-5 pt-0 mt-auto space-y-4">
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-[#f1f5f9] border border-[#e2e8f0] text-[10px] text-[#475569] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 rounded-md bg-white border border-[#e2e8f0] text-[10px] text-[#64748b]">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 pt-3 border-t border-[#f1f5f9]">
                    <button
                      onClick={() => handleEditClick(project)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-[#0f172a] bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] hover:border-[#94a3b8] transition-all shadow-2xs"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-[#64748b]" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project)}
                      className="p-2 rounded-xl text-[#94a3b8] hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Project Modal */}
      <ProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        project={selectedProject}
        onSave={handleSaveProject}
      />
    </div>
  );
}
