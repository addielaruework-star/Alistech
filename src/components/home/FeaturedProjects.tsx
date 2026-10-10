"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Briefcase } from "lucide-react";
import { getFeaturedProjects } from "@/lib/firestore";
import { getCloudinaryUrl } from "@/lib/storage";
import { type Project } from "@/types/project";
import { generateSlug } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

/** Returns a URL-safe path for a project card. Always sanitizes through generateSlug. */
function projectHref(project: Project): string {
  const raw = project.slug?.trim() || project.title || "";
  const safe = raw ? generateSlug(raw) : "";
  return safe ? `/projects/${safe}` : `/projects/${project.id}`;
}

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    getFeaturedProjects()
      .then((data) => setProjects(data.slice(0, 3)))
      .catch((err) => console.error("Failed to fetch featured projects:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative py-20 bg-bg-primary overflow-hidden">
      <div className="section-container relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <SectionHeading eyebrow="Dynamic Showcase" title="Work We've " highlight="Designed" align="left" />
          <Button variant="secondary" size="md" href="/portfolio">
            View All <ExternalLink className="w-4 h-4" />
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card-v2 rounded-[22px] border border-[#dde4ec] overflow-hidden aspect-[4/5] p-5 space-y-4 bg-white shadow-sm">
                <div className="w-full h-40 bg-[#f1f5f9] rounded-xl animate-pulse" />
                <div className="h-5 w-2/3 bg-[#f1f5f9] rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-[#f1f5f9] rounded animate-pulse" />
                <div className="flex gap-2">
                  <div className="h-6 w-12 bg-[#f1f5f9] rounded-full animate-pulse" />
                  <div className="h-6 w-16 bg-[#f1f5f9] rounded-full animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border border-[#dde4ec] bg-white shadow-sm">
            <Briefcase className="w-10 h-10 text-[#475569] mx-auto mb-4" />
            <p className="text-[#475569] text-sm">No featured projects showcased yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {projects.map((project, i) => {
                return (
                  <Link
                    href={projectHref(project)}
                    key={project.id || project.slug}
                    className="block h-full cursor-pointer"
                  >
                    <motion.article
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, delay: i * 0.08 }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="card-v2 rounded-[22px] overflow-hidden border border-[#dde4ec] hover:border-[#334155] transition-all duration-300 group flex flex-col justify-between bg-white h-full shadow-sm"
                    >
                      <div>
                        {/* Project Cover Image */}
                        <div className="relative h-48 overflow-hidden bg-[#f8fafc] border-b border-[#dde4ec]">
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
                        </div>

                        {/* Details */}
                        <div className="p-5 flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-[#475569]">{project.category}</span>
                            {project.clientType && <span className="text-xs text-[#3f6212] font-medium">{project.clientType}</span>}
                          </div>
                          <h3 className="font-sora font-bold text-[#0f172a] text-lg group-hover:text-[#3f6212] transition-colors duration-200">{project.title}</h3>
                          <p className="text-[#475569] text-xs leading-relaxed line-clamp-3">{project.shortDescription}</p>
                        </div>
                      </div>

                      {/* Tech stack */}
                      <div className="p-5 pt-0 mt-auto">
                        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#e2e8f0] mt-2">
                          {project.technologies.slice(0, 3).map((t) => (
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
      </div>
    </section>
  );
}
