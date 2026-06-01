"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  User,
  Folder,
  Share2,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  ExternalLink,
  MessageCircle,
  Clock,
  Code2,
} from "lucide-react";
import { getProjectBySlug } from "@/lib/firestore";
import { getCloudinaryUrl } from "@/lib/storage";
import { type Project } from "@/types/project";
import { WHATSAPP_URL } from "@/lib/constants";
import { toast } from "sonner";
import Button from "@/components/ui/Button";

interface ProjectDetailsClientProps {
  slug: string;
}

export default function ProjectDetailsClient({ slug }: ProjectDetailsClientProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  /* ── Fetch project details from Firestore ───────────────────────────────── */
  useEffect(() => {
    if (!slug || slug === "undefined") {
      setLoading(false);
      return;
    }
    setLoading(true);
    console.log("[ProjectDetails] fetching slug:", slug);
    getProjectBySlug(slug)
      .then((data) => {
        console.log("[ProjectDetails] result:", data ? data.title : "NOT FOUND");
        setProject(data);
      })
      .catch((err) => {
        console.error("[ProjectDetails] fetch error:", err);
        toast.error("Could not load project details.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  /* ── Lightbox navigation handlers ───────────────────────────────────────── */
  const handlePrevImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (project && activeImageIndex !== null) {
        setActiveImageIndex((prev) =>
          prev === null ? null : prev === 0 ? project.galleryImages.length - 1 : prev - 1
        );
      }
    },
    [project, activeImageIndex]
  );

  const handleNextImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (project && activeImageIndex !== null) {
        setActiveImageIndex((prev) =>
          prev === null ? null : prev === project.galleryImages.length - 1 ? 0 : prev + 1
        );
      }
    },
    [project, activeImageIndex]
  );

  const handleCloseLightbox = useCallback(() => {
    setActiveImageIndex(null);
  }, []);

  /* ── Key Listeners for Lightbox ─────────────────────────────────────────── */
  useEffect(() => {
    if (activeImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseLightbox();
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImageIndex, handleCloseLightbox, handlePrevImage, handleNextImage]);

  /* ── Share project handler ──────────────────────────────────────────────── */
  const handleShare = () => {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(window.location.href);
    toast.success("Case study link copied to clipboard!");
  };

  /* ── Format dynamic creation timeline ───────────────────────────────────── */
  const getTimeline = (createdAt: any) => {
    if (!createdAt) return "Completed Recently";
    try {
      let date: Date;
      if (typeof createdAt.toDate === "function") {
        date = createdAt.toDate();
      } else if (createdAt instanceof Date) {
        date = createdAt;
      } else if (createdAt.seconds) {
        date = new Date(createdAt.seconds * 1000);
      } else {
        date = new Date(createdAt);
      }
      return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    } catch (e) {
      return "Completed Recently";
    }
  };

  /* ── Loading Skeleton State ─────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary pt-32 pb-24 text-white overflow-hidden relative">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="section-container relative z-10">
          {/* Back btn skeleton */}
          <div className="w-32 h-10 bg-white/5 rounded-xl animate-pulse mb-8" />

          {/* Hero Banner skeleton */}
          <div className="w-full h-[360px] md:h-[450px] bg-white/[0.02] rounded-3xl border border-white/5 p-6 md:p-10 flex flex-col justify-end gap-4 mb-12 overflow-hidden relative">
            <div className="absolute inset-0 shimmer pointer-events-none" />
            <div className="w-24 h-6 bg-white/5 rounded-full animate-pulse" />
            <div className="w-2/3 h-12 bg-white/5 rounded-xl animate-pulse" />
            <div className="w-1/2 h-6 bg-white/5 rounded animate-pulse" />
          </div>

          {/* Core Info Grid skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-8 space-y-6">
              <div className="w-1/3 h-7 bg-white/5 rounded animate-pulse" />
              <div className="w-full h-4 bg-white/5 rounded animate-pulse" />
              <div className="w-full h-4 bg-white/5 rounded animate-pulse" />
              <div className="w-5/6 h-4 bg-white/5 rounded animate-pulse" />
              <div className="w-full h-32 bg-white/[0.015] border border-white/5 rounded-2xl animate-pulse" />
            </div>
            <div className="lg:col-span-4">
              <div className="glass-card rounded-2xl border border-white/5 p-6 space-y-6">
                <div className="w-1/2 h-6 bg-white/5 rounded animate-pulse" />
                <hr className="border-white/5" />
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="w-16 h-4 bg-white/5 rounded animate-pulse" />
                    <div className="w-24 h-4 bg-white/5 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Project Not Found State ────────────────────────────────────────────── */
  if (!project) {
    return (
      <div className="min-h-screen bg-bg-primary pt-32 pb-24 text-white overflow-hidden relative flex items-center justify-center">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
        <div className="section-container relative z-10 text-center max-w-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-3xl border border-white/10 p-10 md:p-12 shadow-2xl relative"
          >
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-blue-600/10 rounded-2xl border border-blue-500/20 backdrop-blur-md flex items-center justify-center shadow-lg">
              <X className="w-10 h-10 text-blue-500" />
            </div>
            <h2 className="font-sora font-bold text-2xl md:text-3xl text-white mt-6 mb-4">
              Project Not Found
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              We searched high and low, but the dynamic case study for this project could not be loaded. 
              The project may have been moved, archived, or draft toggles are active in the administration panel.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" href="/portfolio" className="w-full sm:w-auto">
                <ArrowLeft className="w-4 h-4" /> Go to Portfolio
              </Button>
              <Button variant="secondary" href="/" className="w-full sm:w-auto">
                Back to Home
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ── Render Project Page ────────────────────────────────────────────────── */
  const formattedTimeline = getTimeline(project.createdAt);
  
  // Custom message for starting a project like this
  const contactWhatsAppUrl = `${WHATSAPP_URL}?text=Hi%20AlisTech!%20I%20just%20saw%20your%20project%20"${encodeURIComponent(
    project.title
  )}"%20and%20I'm%20very%20interested%20in%20building%20a%20similar%20digital%20product%20with%20you.`;

  return (
    <>
      <div className="min-h-screen bg-bg-primary pt-32 pb-24 text-white relative">
        {/* Background Grid & ambient light */}
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none z-0" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-blue-600/10 to-transparent blur-[120px] pointer-events-none z-0" />

        {/* Ambient background blurred cover image */}
        {project.coverImage && (
          <div className="absolute top-0 left-0 right-0 h-[60vh] overflow-hidden pointer-events-none opacity-20 z-0">
            <Image
              src={getCloudinaryUrl(project.coverImage, { width: 1200 })}
              alt="ambient"
              fill
              className="object-cover blur-[80px] scale-110"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/10 via-[#050508]/80 to-bg-primary" />
          </div>
        )}

        <div className="section-container relative z-10">
          {/* Breadcrumbs & Navigation */}
          <div className="mb-8">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/6 hover:bg-white/10 hover:border-blue-500/30 text-white/70 hover:text-white transition-all duration-300 backdrop-blur-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Showcase</span>
            </Link>
          </div>

          {/* Hero Banner Showcase card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full relative rounded-3xl border border-white/[0.08] overflow-hidden bg-white/[0.01] aspect-[21/9] min-h-[350px] shadow-2xl mb-12"
          >
            {project.coverImage ? (
              <Image
                src={getCloudinaryUrl(project.coverImage, { width: 1400 })}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-white/[0.02]">
                <Clock className="w-16 h-16 text-white/10" />
              </div>
            )}
            
            {/* Dark/Gradient overlay for typography contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-12" />

            {/* Typography Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 space-y-4">
              <div className="flex flex-wrap gap-2.5 items-center">
                <span className="px-3 py-1 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-300 text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm shadow-md">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3 h-3" /> Featured Work
                  </span>
                )}
                {project.published ? (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm flex items-center gap-1 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Product
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/60 text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">
                    Draft Case
                  </span>
                )}
              </div>

              <h1 className="font-sora font-extrabold text-3xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight max-w-4xl drop-shadow-lg">
                {project.title}
              </h1>

              {project.shortDescription && (
                <p className="text-white/80 text-sm md:text-lg max-w-3xl leading-relaxed drop-shadow">
                  {project.shortDescription}
                </p>
              )}
            </div>
          </motion.div>

          {/* Core Case Study Column Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
            
            {/* Case Study Details Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-8 space-y-8"
            >
              <div>
                <h2 className="font-sora font-extrabold text-xl md:text-2xl text-white mb-6 flex items-center gap-2.5">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full" />
                  Project Case Study
                </h2>
                
                {project.fullDescription ? (
                  <div className="space-y-6 text-white/70 text-sm md:text-base leading-relaxed font-normal">
                    {project.fullDescription.split("\n").map((para, i) => {
                      if (!para.trim()) return null;
                      return (
                        <p 
                          key={i} 
                          className={i === 0 ? "text-white/95 text-base md:text-lg leading-relaxed font-medium mb-8" : ""}
                        >
                          {para}
                        </p>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 rounded-2xl bg-white/[0.015] border border-dashed border-white/10 text-center">
                    <p className="text-white/40 text-sm">No extended case study details have been structured for this project yet.</p>
                  </div>
                )}
              </div>

              {/* Start Project CTA Banner inside case study */}
              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-blue-600/[0.08] to-cyan-500/[0.02] border border-blue-500/20 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="space-y-2 relative z-10 max-w-md">
                  <h3 className="font-sora font-bold text-white text-lg">Interested in a similar solution?</h3>
                  <p className="text-white/60 text-xs leading-relaxed">
                    We can build custom admin dashboards, responsive platforms, and SEO optimization models tailored specifically to your business framework. Let&apos;s build it together.
                  </p>
                </div>
                <Button variant="primary" size="md" href={contactWhatsAppUrl} className="relative z-10 shrink-0 w-full md:w-auto shadow-md">
                  <MessageCircle className="w-5 h-5 shrink-0" />
                  <span>Start Project Showcase</span>
                </Button>
              </div>
            </motion.div>

            {/* Sticky Sidebar Meta Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="lg:col-span-4"
            >
              <div className="glass-card rounded-2xl border border-white/[0.08] p-6 lg:p-7 space-y-6 sticky top-28 shadow-xl">
                <div>
                  <h3 className="font-sora font-bold text-white text-md">Project Specifications</h3>
                  <p className="text-[10px] text-white/30 uppercase font-semibold tracking-widest mt-1">Tech Stack & Scope Details</p>
                </div>

                <hr className="border-white/[0.06]" />

                {/* Scope Rows */}
                <div className="space-y-4 text-xs md:text-sm">
                  {project.clientType && (
                    <div className="flex items-center justify-between py-1 border-b border-white/[0.03]">
                      <span className="text-white/40 flex items-center gap-2"><User className="w-4 h-4 text-blue-400" /> Client Segment</span>
                      <span className="text-white/90 font-medium text-right">{project.clientType}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between py-1 border-b border-white/[0.03]">
                    <span className="text-white/40 flex items-center gap-2"><Folder className="w-4 h-4 text-blue-400" /> Category</span>
                    <span className="text-white/90 font-medium text-right">{project.category}</span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-white/[0.03]">
                    <span className="text-white/40 flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-400" /> Timeline Date</span>
                    <span className="text-white/90 font-medium text-right">{formattedTimeline}</span>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <span className="text-white/40 flex items-center gap-2"><Sparkles className="w-4 h-4 text-blue-400" /> Build Status</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Active & Verified
                    </span>
                  </div>
                </div>

                {/* Tech Stack list */}
                <div className="space-y-3 pt-2">
                  <span className="text-[10.5px] uppercase font-bold tracking-widest text-white/30 flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-blue-400" /> Technologies Integrated
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/5 border border-white/6 text-white/70 hover:border-blue-500/25 hover:text-white transition-colors cursor-default"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <hr className="border-white/[0.06]" />

                {/* Action CTA Buttons */}
                <div className="space-y-3 pt-2">
                  <Button variant="primary" size="md" href={contactWhatsAppUrl} className="w-full gap-2">
                    <MessageCircle className="w-4 h-4" /> Start Similar Project
                  </Button>
                  <Button variant="secondary" size="md" onClick={handleShare} className="w-full gap-2 border border-white/8 hover:border-white/15">
                    <Share2 className="w-4 h-4" /> Share Case Study
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Interactive Project Showcase Gallery */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="pt-12 border-t border-white/[0.06]"
            >
              <div className="mb-10 text-center md:text-left">
                <h2 className="font-sora font-extrabold text-2xl md:text-3xl text-white">Project Mockups & Gallery</h2>
                <p className="text-white/40 text-xs md:text-sm mt-1.5">
                  High-fidelity responsive captures and functional mockups saved directly from production environments.
                </p>
              </div>

              {/* Responsive optimized dynamic Grid layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.galleryImages.map((image, index) => {
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: index * 0.05 }}
                      whileHover={{ y: -6, transition: { duration: 0.2 } }}
                      onClick={() => setActiveImageIndex(index)}
                      className="glass-card rounded-2xl overflow-hidden border border-white/[0.06] hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] transition-all duration-300 cursor-pointer group aspect-[16/10] bg-white/[0.015] relative shadow-lg"
                    >
                      <Image
                        src={getCloudinaryUrl(image, { width: 800 })}
                        alt={`${project.title} gallery mockup ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                      
                      {/* Interactive Hover maximize overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <motion.div
                          initial={{ scale: 0.8 }}
                          whileHover={{ scale: 1.05 }}
                          className="w-12 h-12 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white shadow-md"
                        >
                          <Maximize2 className="w-5 h-5" />
                        </motion.div>
                      </div>

                      {/* Display image number badge */}
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/65 backdrop-blur-sm text-[10px] text-white/55 font-medium tracking-wide shadow">
                        Mockup #{index + 1}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          )}
        </div>
      </div>

      {/* Dynamic Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleCloseLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
          >
            {/* Ambient blurred reflection behind lightbox card */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
              <Image
                src={getCloudinaryUrl(project.galleryImages[activeImageIndex], { width: 1000 })}
                alt="lightbox-ambient"
                fill
                className="object-cover blur-[100px] scale-125"
              />
            </div>

            {/* Lightbox Content Container */}
            <div 
              className="relative w-full max-w-6xl aspect-[16/10] md:max-h-[85vh] px-4 md:px-12 flex items-center justify-center z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0.95, y: 15, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 15, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="relative w-full h-full rounded-2xl overflow-hidden border border-white/[0.08] bg-[#09090e]/50 shadow-2xl flex items-center justify-center group/panel"
              >
                <Image
                  src={getCloudinaryUrl(project.galleryImages[activeImageIndex], { width: 1400 })}
                  alt={`${project.title} active gallery image`}
                  fill
                  className="object-contain p-2 md:p-6"
                  priority
                />
                
                {/* Responsive Next/Prev navigation overlay arrows */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 p-3 rounded-2xl bg-black/60 border border-white/5 hover:border-white/20 hover:bg-black/80 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] text-white/70 hover:text-white transition-all duration-300 opacity-100 md:opacity-0 md:group-hover/panel:opacity-100 flex items-center justify-center shrink-0 z-20 shadow-md"
                  title="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 p-3 rounded-2xl bg-black/60 border border-white/5 hover:border-white/20 hover:bg-black/80 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] text-white/70 hover:text-white transition-all duration-300 opacity-100 md:opacity-0 md:group-hover/panel:opacity-100 flex items-center justify-center shrink-0 z-20 shadow-md"
                  title="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Floating image counter bottom HUD */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/70 border border-white/5 backdrop-blur-md text-xs font-semibold text-white/60 tracking-wider shadow select-none flex items-center gap-2">
                  <span>Image</span>
                  <span className="text-blue-400 font-bold">{activeImageIndex + 1}</span>
                  <span>of</span>
                  <span>{project.galleryImages.length}</span>
                </div>
              </motion.div>
            </div>

            {/* Top right floating HUD controls */}
            <div className="absolute top-6 right-6 flex items-center gap-3 z-20">
              {/* Keyboard tip indicator for premium feel (desktop only) */}
              <span className="hidden md:inline text-[9px] text-white/30 uppercase tracking-widest font-bold bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5 select-none">
                Use ◄ / ► Keys
              </span>
              <button
                onClick={handleCloseLightbox}
                className="p-2.5 rounded-xl bg-black/60 border border-white/5 hover:border-white/25 hover:bg-black/85 hover:text-red-400 transition-all duration-300 text-white/70 flex items-center justify-center shadow-lg"
                title="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
