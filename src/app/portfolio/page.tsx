"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { getPublishedProjects } from "@/lib/firestore";
import { getCloudinaryUrl } from "@/lib/storage";
import { type Project } from "@/types/project";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/home/CTASection";
import { Briefcase } from "lucide-react";

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
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
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
                <div key={i} className="glass-card rounded-2xl border border-white/6 overflow-hidden aspect-[4/5] p-5 space-y-4 bg-white/[0.01]">
                  <div className="w-full h-48 bg-white/[0.03] rounded-xl animate-pulse" />
                  <div className="h-6 w-2/3 bg-white/[0.03] rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-white/[0.03] rounded animate-pulse" />
                  <div className="flex gap-2">
                    <div className="h-6 w-12 bg-white/[0.03] rounded-full animate-pulse" />
                    <div className="h-6 w-16 bg-white/[0.03] rounded-full animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-white/30 text-sm">Failed to load projects. Please try again later.</p>
            </div>
          ) : projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-28"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center mx-auto mb-5">
                <Briefcase className="w-7 h-7 text-white/20" />
              </div>
              <h3 className="font-sora font-semibold text-white/50 text-lg mb-2">No projects published yet</h3>
              <p className="text-white/25 text-sm max-w-sm mx-auto">
                We are currently finalising updates on our showcase. Check back shortly to view our published work.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {projects.map((project, i) => {
                  return (
                    <motion.article
                      key={project.id || project.slug}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="glass-card rounded-2xl overflow-hidden border border-white/6 hover:border-white/12 transition-all duration-300 group flex flex-col justify-between bg-white/[0.01] h-full shadow-xl"
                    >
                      <div>
                        {/* Project Cover Image */}
                        <div className="relative h-52 overflow-hidden bg-white/[0.02] border-b border-white/[0.05]">
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
                          {project.featured && (
                            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-blue-600/25 backdrop-blur-sm text-blue-300 text-[10px] font-semibold uppercase tracking-wider border border-blue-500/30">
                              Featured Work
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div className="p-5 flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-white/30">{project.category}</span>
                            {project.clientType && <span className="text-xs text-blue-400/70 font-semibold">{project.clientType}</span>}
                          </div>
                          <h3 className="font-sora font-bold text-white text-lg group-hover:text-blue-300 transition-colors duration-200">{project.title}</h3>
                          <p className="text-white/50 text-xs leading-relaxed line-clamp-3">{project.shortDescription}</p>
                        </div>
                      </div>

                      {/* Tech stack */}
                      <div className="p-5 pt-0 mt-auto">
                        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.04] mt-2">
                          {project.technologies.map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/4 text-white/40 border border-white/6">{t}</span>
                          ))}
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-10 glass-card rounded-2xl border border-dashed border-white/10 p-10 text-center">
            <p className="text-gray-500 mb-1.5 font-medium">More work coming soon</p>
            <p className="text-gray-600 text-sm">We&apos;re currently working on new client installations. Check back for real case studies as they become available.</p>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
