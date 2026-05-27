"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Briefcase } from "lucide-react";
import { getFeaturedProjects } from "@/lib/firestore";
import { getCloudinaryUrl } from "@/lib/storage";
import { type Project } from "@/types/project";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

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
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-blue-600/6 blur-[100px] pointer-events-none" />
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
              <div key={i} className="glass-card rounded-2xl border border-white/6 overflow-hidden aspect-[4/5] p-5 space-y-4 bg-white/[0.01]">
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
        ) : projects.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border border-white/6 bg-white/[0.01]">
            <Briefcase className="w-10 h-10 text-white/10 mx-auto mb-4" />
            <p className="text-white/30 text-sm">No featured projects showcased yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {projects.map((project, i) => {
                return (
                  <motion.article
                    key={project.id || project.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: i * 0.08 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="glass-card rounded-2xl overflow-hidden border border-white/6 hover:border-white/12 transition-all duration-300 group flex flex-col justify-between bg-white/[0.01] h-full shadow-xl"
                  >
                    <div>
                      {/* Project Cover Image */}
                      <div className="relative h-48 overflow-hidden bg-white/[0.02] border-b border-white/[0.05]">
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
                          <div className="w-full h-full flex items-center justify-center text-white/10">
                            <Briefcase className="w-8 h-8" />
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="p-5 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-white/30">{project.category}</span>
                          {project.clientType && <span className="text-xs text-blue-400/70 font-medium">{project.clientType}</span>}
                        </div>
                        <h3 className="font-sora font-bold text-white text-lg group-hover:text-blue-300 transition-colors duration-200">{project.title}</h3>
                        <p className="text-white/50 text-xs leading-relaxed line-clamp-3">{project.shortDescription}</p>
                      </div>
                    </div>

                    {/* Tech stack */}
                    <div className="p-5 pt-0 mt-auto">
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.04] mt-2">
                        {project.technologies.slice(0, 3).map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/4 text-white/45 border border-white/6">{t}</span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
