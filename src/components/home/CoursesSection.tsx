"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { COURSES, GENAI_TOPICS, AGENTIC_TOPICS, AGENTIC_STEPS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";

function CourseFlipCard({
  course,
  index,
}: {
  course: (typeof COURSES)[number];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const isSlate = index % 2 === 1;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${course.name}. Open to ask about this course.`}
      className={`flip ${open ? "open" : ""}`}
      onClick={() => setOpen((prev) => !prev)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen((prev) => !prev);
        }
      }}
    >
      <div className="in">
        {/* Front face */}
        <div className="face front">
          <div className="top">
            <span className="n font-mono font-bold text-sm text-[#3f6212]">{course.number}</span>
            <div className={`gem ${isSlate ? "teal" : ""}`} aria-hidden="true">
              <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: course.svgInner }} />
            </div>
          </div>
          <div>
            <h3 className="font-sora font-bold text-xl text-[#0f172a]">{course.name}</h3>
            <div className="hint">{course.hint}</div>
          </div>
        </div>

        {/* Back face */}
        <div className="face back">
          <div>
            <h4>Interested?</h4>
            <p>Message us on WhatsApp and we will tell you about this course.</p>
          </div>
          <div className="bot">
            <div className="t">{course.name}</div>
            <a
              className="wa"
              href={`https://wa.me/919603337862?text=${encodeURIComponent(
                `Hi AlisTech, I want to know about: ${course.name}`
              )}`}
              target="_blank"
              rel="noopener"
              onClick={(e) => e.stopPropagation()}
            >
              Ask about this course <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CoursesSection() {
  return (
    <>
      {/* 3a. Courses Section */}
      <section id="courses" className="relative py-24 bg-bg-secondary overflow-hidden">
        <div className="section-container relative z-10">
          <SectionHeading
            eyebrow="Courses"
            title="Learn trending "
            highlight="tech skills"
            subtitle="For students, freshers and working professionals."
            className="mb-10"
          />

          <p className="text-xs font-semibold uppercase tracking-widest text-[#475569] mb-6">
            Courses we teach
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COURSES.map((course, i) => (
              <div key={course.id} className="rv" style={{ ['--rv-delay' as string]: `${(i % 4) * 80}ms` }}>
                <CourseFlipCard course={course} index={i} />
              </div>
            ))}
          </div>

          {/* Route to dedicated Courses page */}
          <div className="mt-12 text-center">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm bg-white border border-[#dde4ec] text-[#0f172a] hover:border-[#7CFF4F] hover:bg-[#f8fafc] shadow-sm transition-all duration-200 group"
            >
              <span>Explore All Courses &amp; Details</span>
              <span className="text-[#2d6a0a] group-hover:translate-x-0.5 transition-transform font-bold">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3b. GenAI Course Section (Dark Band) */}
      <section id="genai" className="relative py-24 bg-[#0f172a] text-[#f8fafc] overflow-hidden">
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              <span className="font-mono text-xs font-semibold tracking-widest uppercase text-[#e2e8f0]">
                Course
              </span>
              <h2 className="font-sora font-extrabold text-4xl sm:text-5xl text-[#f8fafc] leading-tight">
                Generative AI &amp; <span className="gradient-text">LLMs</span>
              </h2>
              <p className="text-[#b2bdcc] text-lg leading-relaxed max-w-xl">
                Learn how tools like ChatGPT work and how to build your own assistants and chatbots on
                top of large language models.
              </p>

              {/* Six topic chips */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 list-none p-0">
                {GENAI_TOPICS.map((topic) => (
                  <li
                    key={topic}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.06] border border-white/[0.12] text-sm font-medium text-[#f8fafc]"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#bef264] to-[#84cc16] flex-shrink-0" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mt-4">
                <a
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-sm bg-gradient-to-r from-[#bef264] to-[#84cc16] text-[#1a2e05] shadow-[0_12px_28px_-12px_rgba(132,204,22,0.7)] hover:shadow-[0_16px_32px_-12px_rgba(132,204,22,0.85)] transition-all"
                  href="https://wa.me/919603337862?text=Hi%20AlisTech%2C%20I%20want%20to%20know%20about%3A%20Generative%20AI%20%26%20LLMs%20course"
                  target="_blank"
                  rel="noopener"
                >
                  Ask about this course <span aria-hidden="true">↗</span>
                </a>
                <a
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold text-sm bg-transparent border border-white/30 text-white hover:border-white transition-all"
                  href="#agentic"
                >
                  Next: Agentic AI
                </a>
              </div>
            </div>

            {/* Right Column: Example Card */}
            <div className="lg:col-span-5">
              <div className="tilt bg-white text-[#0f172a] rounded-[28px] p-6 shadow-[0_22px_44px_-24px_rgba(132,204,22,0.35),0_2px_6px_rgba(0,0,0,0.05)] border border-[#dde4ec]">
                <span className="font-mono text-xs font-semibold tracking-wider uppercase text-[#475569] block mb-4">
                  Example
                </span>
                <div className="chat-pop p-4 rounded-2xl bg-[#eef2f6] border border-[#dde4ec] text-sm text-[#0f172a] leading-relaxed">
                  <small className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1">
                    You ask
                  </small>
                  Summarise this fee policy for parents in three lines.
                </div>
                <div className="chat-pop mt-3 p-4 rounded-2xl bg-gradient-to-br from-[#bef264] to-[#84cc16] text-[#1a2e05] text-sm font-medium leading-relaxed shadow-sm">
                  <small className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#1a2e05] mb-1">
                    Assistant
                  </small>
                  Fees are paid every quarter. Late payments may have a small fine. Brothers and
                  sisters can get a discount.
                  <div className="flex items-center gap-1.5 mt-2.5">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {["Prompts", "APIs", "RAG", "Chatbots"].map((chip) => (
                    <span
                      key={chip}
                      className="px-3 py-1.5 rounded-full bg-[#e2e8f0] text-[#0f172a] text-xs font-semibold"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3c. Agentic AI Course Section (Light Band, Mirrored) */}
      <section id="agentic" className="relative py-24 bg-white text-[#0f172a] border-t border-b border-[#dde4ec] overflow-hidden">
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Example Agent Run */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="tilt bg-white rounded-[28px] p-6 shadow-[0_22px_44px_-24px_rgba(132,204,22,0.35),0_2px_6px_rgba(0,0,0,0.05)] border border-[#dde4ec]">
                <span className="font-mono text-xs font-semibold tracking-wider uppercase text-[#475569] block mb-4">
                  Example agent run
                </span>
                <ol className="flow">
                  {AGENTIC_STEPS.map((step) => (
                    <li key={step.step}>
                      <div>
                        <b>{step.title}</b>
                        <span>{step.description}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Right Column: Course Info */}
            <div className="lg:col-span-7 flex flex-col gap-5 order-1 lg:order-2">
              <span className="font-mono text-xs font-semibold tracking-widest uppercase text-[#3f6212]">
                Course
              </span>
              <h2 className="font-sora font-extrabold text-4xl sm:text-5xl text-[#0f172a] leading-tight">
                Agentic <span className="gradient-text">AI</span>
              </h2>
              <p className="text-[#475569] text-lg leading-relaxed max-w-xl">
                Build AI agents that plan a task, use tools and finish the work for you, with a person
                staying in control.
              </p>

              {/* Six topic chips */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 list-none p-0">
                {AGENTIC_TOPICS.map((topic) => (
                  <li
                    key={topic}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#eef2f6] border border-[#dde4ec] text-sm font-medium text-[#0f172a]"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#bef264] to-[#84cc16] flex-shrink-0" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mt-4">
                <a
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-sm bg-gradient-to-r from-[#bef264] to-[#84cc16] text-[#1a2e05] shadow-[0_12px_28px_-12px_rgba(132,204,22,0.7)] hover:shadow-[0_16px_32px_-12px_rgba(132,204,22,0.85)] transition-all"
                  href="https://wa.me/919603337862?text=Hi%20AlisTech%2C%20I%20want%20to%20know%20about%3A%20Agentic%20AI%20course"
                  target="_blank"
                  rel="noopener"
                >
                  Ask about this course <span aria-hidden="true">↗</span>
                </a>
                <Link
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold text-sm bg-white border border-[#dde4ec] text-[#0f172a] hover:border-[#0f172a] transition-all"
                  href="/courses"
                >
                  All courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
