"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote, MessageSquare } from "lucide-react";
import { getApprovedReviews } from "@/lib/firestore";
import { getCloudinaryUrl } from "@/lib/storage";
import { type Review } from "@/types/review";

/* ── Sub-components ──────────────────────────────────────────────────────── */

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5 ${s <= rating ? "text-amber-400" : "text-white/10"}`}
          fill={s <= rating ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

function Avatar({ review }: { review: Review }) {
  if (review.image) {
    return (
      <Image
        src={getCloudinaryUrl(review.image, { width: 80 })}
        alt={review.name}
        width={40}
        height={40}
        className="rounded-full object-cover border border-white/[0.1]"
      />
    );
  }
  const initials = review.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return (
    <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">
      {initials}
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="glass-card rounded-2xl border border-white/[0.06] p-6 space-y-4 bg-white/[0.01]"
        >
          <div className="h-3 w-16 rounded bg-white/[0.05] animate-pulse" />
          <div className="space-y-2">
            <div className="h-3 w-full rounded bg-white/[0.04] animate-pulse" />
            <div className="h-3 w-4/5 rounded bg-white/[0.04] animate-pulse" />
            <div className="h-3 w-3/5 rounded bg-white/[0.04] animate-pulse" />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-full bg-white/[0.05] animate-pulse" />
            <div className="space-y-1.5">
              <div className="h-3 w-24 rounded bg-white/[0.05] animate-pulse" />
              <div className="h-2.5 w-16 rounded bg-white/[0.03] animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-4 py-16 text-center"
    >
      <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
        <MessageSquare className="w-6 h-6 text-blue-400/60" />
      </div>
      <p className="text-white/30 text-sm max-w-xs leading-relaxed">
        Client reviews are on the way. Check back soon.
      </p>
    </motion.div>
  );
}

/* ── Main section ────────────────────────────────────────────────────────── */

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchedRef = useRef(false); // guard against React Strict Mode double-fetch

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    getApprovedReviews()
      .then((data) => setReviews(data as Review[]))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, []);

  // Hide section entirely only when done loading AND no reviews at all
  if (!loading && reviews.length === 0) return null;

  return (
    <section className="relative py-20 bg-bg-primary overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-blue-600/5 blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block text-[10.5px] font-bold uppercase tracking-[0.18em] text-blue-400/70 mb-4">
            Client Reviews
          </span>
          <h2 className="font-sora font-bold text-3xl md:text-4xl text-white">
            What Clients <span className="text-blue-400">Say</span>
          </h2>
          <p className="text-white/40 text-sm mt-4 max-w-md mx-auto leading-relaxed">
            Real feedback from real clients. We let results speak for themselves.
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <SkeletonGrid />
        ) : reviews.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.slice(0, 6).map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card rounded-2xl border border-white/[0.06] hover:border-white/[0.10] transition-all duration-300 p-6 flex flex-col gap-4 bg-white/[0.01]"
              >
                <Stars rating={review.rating} />
                <div className="relative flex-1">
                  <Quote
                    className="absolute -top-1 -left-1 w-5 h-5 text-blue-500/20"
                    fill="currentColor"
                  />
                  <p className="text-white/60 text-sm leading-relaxed pl-4">
                    {review.review}
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-2 border-t border-white/[0.05]">
                  <Avatar review={review} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      {review.name}
                    </p>
                    <p className="text-[11px] text-white/35 truncate">
                      {review.role}
                      {review.company && ` · ${review.company}`}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
