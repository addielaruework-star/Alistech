"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getPublishedProjects } from "@/lib/firestore";
import { getCloudinaryUrl } from "@/lib/storage";
import { type Project } from "@/types/project";
import { generateSlug } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/home/CTASection";
import { Briefcase } from "lucide-react";

/** Returns a URL-safe path for a project card. Always sanitizes through generateSlug. */
function projectHref(project: Project): string {
  // Use stored slug if present, otherwise derive from title
  const raw = project.slug?.trim() || project.title || "";
  const safe = raw ? generateSlug(raw) : "";
  // Final fallback: Firestore document ID (always URL-safe)
  return safe ? `/projects/${safe}` : `/projects/${project.id}`;
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    getPublishedProjects()
      .then((data) => setProjects(data))
      .catch((err) => {
        console.error("Failed to load portfolio:", err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-14 bg-bg-primary overflow-hidden">
        <div className="section-container relative z-10 text-center">
          <SectionHeading
            eyebrow="Dynamic Showcase"
            title="Work We&apos;ve "
            highlight="Built"
            subtitle="These are production products, real-world case studies, and advanced concepts that showcase our engineering, design excellence, and high-performance stack."
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-bg-primary to-transparent" />
      </section>

      {/* Projects Grid */}
      <section className="py-14 pb-20 bg-bg-primary">
        <div className="section-container">
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="card-v2 rounded-[22px] border border-[#dde4ec] overflow-hidden aspect-[4/5] p-5 space-y-4 bg-white shadow-sm">
                  <div className="w-full h-48 bg-[#f1f5f9] rounded-xl animate-pulse" />
                  <div className="h-6 w-2/3 bg-[#f1f5f9] rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-[#f1f5f9] rounded animate-pulse" />
                  <div className="flex gap-2">
                    <div className="h-6 w-12 bg-[#f1f5f9] rounded-full animate-pulse" />
                    <div className="h-6 w-16 bg-[#f1f5f9] rounded-full animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-[#475569] text-sm">Failed to load projects. Please try again later.</p>
            </div>
          ) : projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-28"
            >
              <div className="w-16 h-16 rounded-2xl bg-white border border-[#dde4ec] shadow-sm flex items-center justify-center mx-auto mb-5">
                <Briefcase className="w-7 h-7 text-[#475569]" />
              </div>
              <h3 className="font-sora font-semibold text-[#0f172a] text-lg mb-2">No projects published yet</h3>
              <p className="text-[#475569] text-sm max-w-sm mx-auto">
                We are currently finalising updates on our showcase. Check back shortly to view our published work.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {projects.map((project, i) => {
                  return (
                    <Link
                      href={projectHref(project)}
                      key={project.id || project.slug}
                      className="block h-full"
                    >
                      <motion.article
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        className="card-v2 rounded-[22px] overflow-hidden border border-[#dde4ec] hover:border-[#334155] transition-all duration-300 group flex flex-col justify-between bg-white h-full shadow-sm"
                      >
                        <div>
                          {/* Project Cover Image */}
                          <div className="relative h-52 overflow-hidden bg-[#f8fafc] border-b border-[#dde4ec]">
                            {project.coverImage ? (
                              <Image
                                src={getCloudinaryUrl(project.coverImage, { width: 600 })}
                                alt={project.title}
                                fill
                                sizes="(max-width: 1024px) 100vw, 33vw"
                                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[#94a3b8]">
                                <Briefcase className="w-8 h-8" />
                              </div>
                            )}
                            {project.featured && (
                              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white text-[#0f172a] text-[10px] font-bold uppercase tracking-wider border border-[#dde4ec] shadow-sm">
                                Featured Work
                              </div>
                            )}
                          </div>

                          {/* Details */}
                          <div className="p-5 flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] uppercase font-bold tracking-widest text-[#475569]">{project.category}</span>
                              {project.clientType && <span className="text-xs text-[#3f6212] font-semibold">{project.clientType}</span>}
                            </div>
                            <h3 className="font-sora font-bold text-[#0f172a] text-lg group-hover:text-[#3f6212] transition-colors duration-200">{project.title}</h3>
                            <p className="text-[#475569] text-xs leading-relaxed line-clamp-3">{project.shortDescription}</p>
                          </div>
                        </div>

                        {/* Tech stack */}
                        <div className="p-5 pt-0 mt-auto">
                          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#e2e8f0] mt-2">
                            {project.technologies.map((t) => (
                              <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#f1f5f9] text-[#0f172a] border border-[#e2e8f0]">{t}</span>
                            ))}
                          </div>
                        </div>
                      </motion.article>
                    </Link>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-10 card-v2 rounded-[22px] border border-dashed border-[#cbd5e1] bg-white p-10 text-center shadow-sm">
            <p className="text-[#0f172a] mb-1.5 font-medium">More work coming soon</p>
            <p className="text-[#475569] text-sm">We&apos;re currently working on new client installations. Check back for real case studies as they become available.</p>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
