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
          className={`w-3.5 h-3.5 ${s <= rating ? "text-amber-500" : "text-[#dde4ec]"}`}
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
        className="rounded-full object-cover border border-[#dde4ec]"
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
    <div className="w-10 h-10 rounded-full bg-[#e2e8f0] border border-[#dde4ec] flex items-center justify-center text-xs font-bold text-[#334155]">
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
          className="card-v2 p-6 space-y-4"
        >
          <div className="h-3 w-16 rounded bg-[#eef2f6] animate-pulse" />
          <div className="space-y-2">
            <div className="h-3 w-full rounded bg-[#eef2f6] animate-pulse" />
            <div className="h-3 w-4/5 rounded bg-[#eef2f6] animate-pulse" />
            <div className="h-3 w-3/5 rounded bg-[#eef2f6] animate-pulse" />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-full bg-[#eef2f6] animate-pulse" />
            <div className="space-y-1.5">
              <div className="h-3 w-24 rounded bg-[#eef2f6] animate-pulse" />
              <div className="h-2.5 w-16 rounded bg-[#eef2f6] animate-pulse" />
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
      <div className="w-14 h-14 rounded-2xl bg-[#e2e8f0] border border-[#dde4ec] flex items-center justify-center">
        <MessageSquare className="w-6 h-6 text-[#334155]" />
      </div>
      <p className="text-[#64748b] text-sm max-w-xs leading-relaxed">
        Client reviews are on the way. Check back soon.
      </p>
    </motion.div>
  );
}

/* ── Main section ────────────────────────────────────────────────────────── */

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    getApprovedReviews()
      .then((data) => setReviews(data as Review[]))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && reviews.length === 0) return null;

  return (
    <section className="relative py-24 bg-bg-primary overflow-hidden">
      <div className="section-container relative z-10">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-[#3f6212] mb-3">
            Client Reviews
          </span>
          <h2 className="font-sora font-bold text-3xl md:text-4xl text-[#0f172a]">
            What Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="text-[#475569] text-base mt-3 max-w-md mx-auto leading-relaxed">
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
                className="card-v2 p-6 flex flex-col gap-4 hover:border-[#334155] transition-all duration-300"
              >
                <Stars rating={review.rating} />
                <div className="relative flex-1">
                  <Quote
                    className="absolute -top-1 -left-1 w-5 h-5 text-[#334155]/15"
                    fill="currentColor"
                  />
                  <p className="text-[#475569] text-sm leading-relaxed pl-4">
                    {review.review}
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-[#dde4ec]">
                  <Avatar review={review} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#0f172a] truncate">
                      {review.name}
                    </p>
                    <p className="text-xs text-[#64748b] truncate">
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
