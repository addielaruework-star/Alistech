"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  Code2,
  BarChart3,
  Brain,
  Cpu,
  Sparkles,
  Bot,
  Eye,
  MessageSquareText,
  Clock,
  Phone,
  Mail,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  BookOpen,
  MessageCircle,
  Laptop,
  Users2,
  Layers,
  ExternalLink,
  Workflow,
  Zap,
  Check,
  ShieldCheck,
  Database,
  Terminal,
} from "lucide-react";
import {
  PHONE_NUMBER,
  EMAIL_ADDRESS,
  WHATSAPP_NUMBER,
  GENAI_TOPICS,
  AGENTIC_TOPICS,
  AGENTIC_STEPS,
} from "@/lib/constants";

/**
 * 8 Courses data structure tailored for the simple introduction + private brochure enquiry flow.
 * Strictly no full syllabus public display, no invented durations, no false placement/certificate claims.
 */
interface CourseCardData {
  id: string;
  number: string;
  name: string;
  intro: string;
  about: string;
  topics: string[];
  outcomes: string[];
  audience: string;
  practicalFocus: string;
  icon: React.ComponentType<{ className?: string }>;
  spotlightAnchor?: string;
  spotlightLabel?: string;
}

const COURSES_DATA: CourseCardData[] = [
  {
    id: "python",
    number: "01",
    name: "Python Programming",
    intro: "A gentle, practical start to writing software and automating everyday computer tasks with code.",
    about:
      "Learn the fundamentals of computer programming and logical thinking using Python, the world's most accessible and versatile coding language.",
    topics: [
      "Writing clean Python syntax and functions",
      "Working with lists, dictionaries, and text files",
      "Connecting to web APIs and handling data",
      "Debugging and solving everyday code problems",
    ],
    outcomes: [
      "Write scripts to automate daily repetitive computer tasks",
      "Understand core programming logic used across modern software",
    ],
    audience:
      "Ideal for complete beginners, students, professionals from non-technical fields, and anyone wanting to start coding with zero prior experience.",
    practicalFocus:
      "You will practice through guided coding exercises and build small, working automation scripts.",
    icon: Code2,
  },
  {
    id: "data-science",
    number: "02",
    name: "Data Science & Data Analytics",
    intro: "Turn everyday business figures into clear, visual charts and practical decisions.",
    about:
      "Learn how to collect, organize, clean, and explore datasets to answer real questions and present data in simple, compelling ways.",
    topics: [
      "Data cleaning and filtering",
      "Summary statistics and trend analysis",
      "Visual charts and simple interactive dashboards",
      "Asking the right questions from raw data",
    ],
    outcomes: [
      "Understand business numbers and identify growth trends",
      "Create clear visual reports and dashboards that explain complex information simply",
    ],
    audience:
      "Anyone working with spreadsheets, business reports, sales numbers, or interested in exploring data-driven roles.",
    practicalFocus:
      "Hands-on data exploration using realistic business scenarios and visual reporting.",
    icon: BarChart3,
  },
  {
    id: "machine-learning",
    number: "03",
    name: "Machine Learning",
    intro: "Discover how computers learn patterns from examples instead of fixed manual rules.",
    about:
      "Learn how machine learning models spot patterns in past data to predict outcomes, organize information, and help make smarter recommendations.",
    topics: [
      "How computers learn from data (training vs. testing)",
      "Classification, regression, and clustering basics",
      "Evaluating how accurately a model predicts",
      "Choosing the right model for a specific problem",
    ],
    outcomes: [
      "Understand how predictive features (like recommendations and forecasts) work",
      "Train and evaluate models on real datasets",
    ],
    audience:
      "Learners with a basic comfort with data or programming who want to understand modern predictive software.",
    practicalFocus:
      "Working through real prediction problems step-by-step to see how models learn and improve.",
    icon: Brain,
  },
  {
    id: "deep-learning",
    number: "04",
    name: "Deep Learning",
    intro: "Explore the multi-layer neural networks that power image recognition, voice tools, and modern AI.",
    about:
      "Understand how artificial neural networks work, how they process images and sounds, and how deep architectures learn rich patterns.",
    topics: [
      "Neural network foundations and layers",
      "How networks learn from error (training process)",
      "Recognizing patterns in image and audio data",
      "Using pre-trained models to solve visual tasks",
    ],
    outcomes: [
      "Understand the inner workings of modern neural network architectures",
      "Apply vision and recognition models to practical problems",
    ],
    audience:
      "Those who want to understand what makes modern deep learning models different from standard programming.",
    practicalFocus:
      "Hands-on experiments with neural network layers and pre-trained models.",
    icon: Cpu,
  },
  {
    id: "genai",
    number: "05",
    name: "Generative AI & Language Models",
    intro: "Learn how modern language models work and how to build smart assistants on top of them.",
    about:
      "Understand the technology behind ChatGPT and modern LLMs, and learn how to connect language models with your own tools and documents.",
    topics: [
      "Effective prompt engineering and context framing",
      "Connecting with LLM APIs in practical software",
      "Question-answering over your own documents (RAG)",
      "Checking for quality, safety, and reliable answers",
    ],
    outcomes: [
      "Understand how large language models generate text and handle context",
      "Build custom AI assistants that can read notes and answer questions accurately",
    ],
    audience:
      "Anyone interested in using modern AI APIs, building chatbots, or creating smart productivity tools.",
    practicalFocus:
      "Constructing working assistant prototypes connected to real APIs and private documents.",
    icon: Sparkles,
    spotlightAnchor: "spotlight-genai",
    spotlightLabel: "Dedicated Spotlight Below ↓",
  },
  {
    id: "agentic-ai",
    number: "06",
    name: "AI Agents & Automation",
    intro: "Teach AI to plan multi-step tasks, use software tools, and get real work done for you.",
    about:
      "Learn how AI agents break down a goal into steps, interact with email, spreadsheets, and messaging apps, and complete workflows with human supervision.",
    topics: [
      "How AI agents plan steps and make decisions",
      "Connecting AI to tools, databases, and APIs",
      "Automating multi-step repetitive processes",
      "Keeping a human in the loop for safety and review",
    ],
    outcomes: [
      "Understand how autonomous software workflows are structured",
      "Build an agent workflow that can process an enquiry and send a response",
    ],
    audience:
      "Professionals and creators who want to automate repetitive workflows and explore the future of software agents.",
    practicalFocus:
      "Setting up real automated task flows connecting forms, messages, and smart agents.",
    icon: Bot,
    spotlightAnchor: "spotlight-agentic",
    spotlightLabel: "Dedicated Spotlight Below ↓",
  },
  {
    id: "computer-vision",
    number: "07",
    name: "Computer Vision",
    intro: "Enable software to inspect, recognize, and interpret images and real-time video feeds.",
    about:
      "Learn how computers process visual information, detect objects, read text from images, and analyze camera feeds for practical applications.",
    topics: [
      "Image processing basics (pixels, filters, edges)",
      "Detecting and tracking objects in photos and video",
      "Reading text from documents and signs (OCR)",
      "Visual inspection and counting concepts",
    ],
    outcomes: [
      "Understand how cameras and software work together to interpret scenes",
      "Build simple image detection pipelines for counting or quality checking",
    ],
    audience:
      "Learners interested in smart camera applications, automated inspection, robotics, and image tools.",
    practicalFocus:
      "Testing object detection and image filters on practical sample videos and photos.",
    icon: Eye,
  },
  {
    id: "nlp",
    number: "08",
    name: "Natural Language Processing",
    intro: "Understand how software analyzes, categorizes, and summarizes written human language.",
    about:
      "Learn the fundamentals of processing written language, extracting sentiment from reviews, categorizing messages, and summarizing long articles.",
    topics: [
      "Breaking text into words, tokens, and meanings",
      "Sentiment analysis and customer feedback tagging",
      "Text categorization and smart search",
      "Automatic summarization of longer documents",
    ],
    outcomes: [
      "Understand how search engines and text analyzers process words",
      "Build a tool that categorizes customer feedback and detects customer sentiment",
    ],
    audience:
      "Anyone interested in text analysis, search technology, customer feedback systems, and language tools.",
    practicalFocus:
      "Analyzing real text samples to extract key phrases, sentiment scores, and summaries.",
    icon: MessageSquareText,
  },
];

/**
 * 4 principles explaining the value of practical learning without unsupported promises.
 */
const PRACTICAL_LEARNING_PILLARS = [
  {
    icon: Laptop,
    title: "Focus on Hands-On Practice",
    description:
      "We believe you learn best by doing. Rather than just reading theory, you work through real code examples and practical tasks.",
  },
  {
    icon: BookOpen,
    title: "Simple, Step-by-Step Language",
    description:
      "We explain complex concepts in plain English without unnecessary technical jargon, so you can build understanding at a steady pace.",
  },
  {
    icon: Layers,
    title: "Modern, Useful Tools",
    description:
      "Training focuses on standard technologies, libraries, and workflows used in modern software development and AI engineering.",
  },
  {
    icon: Users2,
    title: "Direct & Attentive Support",
    description:
      "You receive clear answers to your questions, guidance on problem-solving, and practical feedback to help you improve your skills.",
  },
];

/**
 * 3 clear enquiry steps.
 */
const ENQUIRY_STEPS = [
  {
    step: "01",
    title: "Choose Your Course",
    description:
      "Review the basic course introductions above and pick the subject you are interested in exploring.",
  },
  {
    step: "02",
    title: "Request the Syllabus on WhatsApp",
    description:
      "Click 'More Details' and then 'Get Brochure on WhatsApp'. A pre-filled message will open with AlisTech.",
  },
  {
    step: "03",
    title: "Receive Brochure & Discuss Schedule",
    description:
      "Our team will share the complete brochure, syllabus outline, and available batch timings directly with you.",
  },
];

export default function CoursesPage() {
  // Track open state for each course card in the 8-card grid
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Independent toggle state for the two dedicated spotlight deep-dives
  const [genAiExpanded, setGenAiExpanded] = useState<boolean>(false);
  const [agenticExpanded, setAgenticExpanded] = useState<boolean>(false);

  const toggleDetails = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // WhatsApp pre-filled messages for the two dedicated spotlight sections
  const genAiWaMessage =
    "Hi AlisTech, I'm interested in the Generative AI & LLMs course. Please share the course brochure and detailed syllabus with me.";
  const genAiWaUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(genAiWaMessage)}`;

  const agenticWaMessage =
    "Hi AlisTech, I'm interested in the Agentic AI course. Please share the course brochure and detailed syllabus with me.";
  const agenticWaUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(agenticWaMessage)}`;

  return (
    <>
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-white overflow-hidden border-b border-[#f1f5f9]">
        <div className="section-container relative z-10 text-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] text-xs font-semibold tracking-wide w-fit mx-auto mb-6">
            <span className="w-2 h-2 rounded-full bg-[#7CFF4F] shadow-[0_0_8px_#7CFF4F]" />
            <span>Practical Technology Training</span>
          </div>

          {/* Main Hero Heading */}
          <h1 className="font-sora font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0f172a] tracking-tight leading-[1.15] max-w-3xl mx-auto mb-6 text-balance">
            Learn Technology.{" "}
            <span className="text-[#0f172a] relative inline-block">
              Build Your Skills.
              <span className="absolute bottom-1 left-0 right-0 h-2.5 bg-[#7CFF4F]/50 -z-10 rounded-full" />
            </span>
          </h1>

          {/* Description */}
          <p className="text-[#475569] text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
            Learn useful technology skills through practical training designed to help you understand modern tools and apply what you learn.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Button
              variant="primary"
              size="lg"
              href="#courses-list"
              className="w-full sm:w-auto px-8 py-3.5 font-bold shadow-[0_8px_20px_-6px_rgba(124,255,79,0.55)]"
            >
              View 8 Core Courses ↓
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="#spotlights"
              className="w-full sm:w-auto px-7 py-3.5 font-bold text-[#0f172a]"
            >
              AI Spotlights ↓
            </Button>
          </div>

          {/* Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f8fafc] border border-[#e2e8f0] text-xs font-semibold text-[#0f172a]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2d6a0a]" /> Hands-On Practice
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f8fafc] border border-[#e2e8f0] text-xs font-semibold text-[#0f172a]">
              <Sparkles className="w-3.5 h-3.5 text-[#2d6a0a]" /> Modern AI &amp; Software Tools
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f8fafc] border border-[#e2e8f0] text-xs font-semibold text-[#0f172a]">
              <BookOpen className="w-3.5 h-3.5 text-[#2d6a0a]" /> Simple, Plain Explanations
            </span>
          </div>
        </div>
      </section>

      {/* 2. Courses List Section with "More Details" and "Get Brochure on WhatsApp" flow */}
      <section id="courses-list" className="relative py-20 sm:py-24 bg-[#f8fafc] overflow-hidden border-b border-[#e2e8f0]">
        <div className="section-container relative z-10">
          <SectionHeading
            eyebrow="Core Programs"
            title="Explore Our "
            highlight="8 Courses"
            subtitle="Review the fundamentals of each program. Click 'More Details' on any course to request the complete brochure & syllabus via WhatsApp."
            className="mb-14 sm:mb-16"
          />

          {/* 8 Course Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {COURSES_DATA.map((course) => {
              const Icon = course.icon;
              const isExpanded = expandedId === course.id;

              // Exact pre-filled WhatsApp message requested by user
              const waMessage = `Hi AlisTech, I'm interested in the ${course.name} course. Please share the course brochure and detailed syllabus with me.`;
              const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

              return (
                <div
                  key={course.id}
                  id={`course-${course.id}`}
                  className="p-7 rounded-2xl bg-white border border-[#e2e8f0] hover:border-[#7CFF4F] shadow-sm hover:shadow-[0_12px_32px_-12px_rgba(15,23,42,0.1)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top row: Number chip and Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#3f6212] bg-[#ecfccb] border border-[#7CFF4F]/60 px-2.5 py-0.5 rounded-full">
                          {course.number}
                        </span>
                        {course.spotlightAnchor && (
                          <a
                            href={`#${course.spotlightAnchor}`}
                            className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[10px] font-bold text-[#0f172a] transition-colors"
                            title="Jump to dedicated deep-dive spotlight"
                          >
                            <Sparkles className="w-2.5 h-2.5 text-[#2d6a0a]" />
                            <span>Spotlight Below ↓</span>
                          </a>
                        )}
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center text-[#2d6a0a] shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Course Title */}
                    <h3 className="font-sora font-bold text-[#0f172a] text-xl mb-2 leading-snug">
                      {course.name}
                    </h3>

                    {/* Short beginner-friendly intro */}
                    <p className="text-xs sm:text-sm font-semibold text-[#3f6212] mb-3">
                      {course.intro}
                    </p>

                    {/* What the course is about */}
                    <div className="mb-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] block mb-1">
                        About this course
                      </span>
                      <p className="text-[#475569] text-xs sm:text-sm leading-relaxed">
                        {course.about}
                      </p>
                    </div>

                    {/* Key topics/skills covered (brief overview only) */}
                    <div className="mb-4 pt-3 border-t border-[#f1f5f9]">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] block mb-2">
                        Key skills covered (overview)
                      </span>
                      <ul className="space-y-1.5 list-none p-0 m-0">
                        {course.topics.map((t) => (
                          <li key={t} className="flex items-start gap-2 text-xs text-[#475569]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7CFF4F] shrink-0 mt-1.5" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What the learner may build or understand */}
                    <div className="mb-5 pt-3 border-t border-[#f1f5f9]">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] block mb-2">
                        What you may build or understand
                      </span>
                      <ul className="space-y-1.5 list-none p-0 m-0">
                        {course.outcomes.map((o) => (
                          <li key={o} className="flex items-start gap-2 text-xs text-[#0f172a] font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#2d6a0a] shrink-0 mt-0.5" />
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Button Flow: "More Details" Toggle */}
                  <div className="pt-3 border-t border-[#f1f5f9] space-y-2">
                    <button
                      type="button"
                      onClick={() => toggleDetails(course.id)}
                      aria-expanded={isExpanded}
                      className="inline-flex items-center justify-between w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#f8fafc] hover:bg-[#eef2f6] border border-[#e2e8f0] text-[#0f172a] transition-colors"
                    >
                      <span>{isExpanded ? "Hide Details" : "More Details"}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#475569]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#475569]" />
                      )}
                    </button>

                    {/* Optional jump to dedicated spotlight for GenAI & Agentic AI */}
                    {course.spotlightAnchor && (
                      <a
                        href={`#${course.spotlightAnchor}`}
                        className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl text-[11px] font-semibold text-[#2d6a0a] bg-[#ecfccb]/70 hover:bg-[#ecfccb] border border-[#7CFF4F]/60 transition-colors"
                      >
                        <Sparkles className="w-3 h-3 text-[#2d6a0a]" />
                        <span>View Dedicated Spotlight Section ↓</span>
                      </a>
                    )}

                    {/* Additional Information Section (Revealed when "More Details" is clicked) */}
                    {isExpanded && (
                      <div className="mt-4 p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-xs space-y-3.5 animate-in fade-in duration-200">
                        <div>
                          <span className="font-bold text-[#0f172a] block mb-1">
                            Who It&apos;s For:
                          </span>
                          <p className="text-[#475569] leading-relaxed">
                            {course.audience}
                          </p>
                        </div>

                        <div>
                          <span className="font-bold text-[#0f172a] block mb-1">
                            Practical Learning Focus:
                          </span>
                          <p className="text-[#475569] leading-relaxed">
                            {course.practicalFocus}
                          </p>
                        </div>

                        {/* WhatsApp Brochure CTA Button */}
                        <div className="pt-2">
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full text-xs font-bold bg-[#7CFF4F] hover:bg-[#6be042] text-[#0f172a] shadow-[0_4px_12px_rgba(124,255,79,0.4)] transition-all"
                          >
                            <MessageCircle className="w-4 h-4 text-[#0f172a]" />
                            <span>Get Brochure on WhatsApp</span>
                            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                          </a>
                          <p className="text-[11px] text-[#64748b] text-center mt-2">
                            Opens WhatsApp with AlisTech (+91 9603337862) to receive the full brochure &amp; syllabus.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          DEDICATED COURSE SPOTLIGHTS INTRO
          Clear separation between the 8 high-level course overview cards and the
          two dedicated deep-dive spotlight sections for Generative AI & Agentic AI.
          ========================================================================= */}
      <section id="spotlights" className="relative py-16 bg-white border-b border-[#e2e8f0]">
        <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] text-xs font-semibold tracking-wide mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#2d6a0a]" />
            <span>Dedicated AI Spotlights</span>
          </div>
          <h2 className="font-sora font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0f172a] tracking-tight mb-4">
            In-Depth Course Spotlights
          </h2>
          <p className="text-[#475569] text-sm sm:text-base leading-relaxed">
            While our 8 core courses cover full-spectrum technology foundations, our two dedicated spotlights take a deep dive into the most transformative fields of modern AI: <strong>Generative AI &amp; LLMs</strong> and <strong>Agentic AI</strong>.
          </p>
        </div>
      </section>

      {/* =========================================================================
          DEDICATED SPOTLIGHT 1: GENERATIVE AI & LLMs
          ========================================================================= */}
      <section id="spotlight-genai" className="relative py-20 sm:py-24 bg-white overflow-hidden border-b border-[#e2e8f0]">
        <div className="section-container relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Header Badge & Title */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ecfccb] border border-[#7CFF4F]/80 text-[#2d6a0a] text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#2d6a0a]" />
                <span>Dedicated Spotlight • Course 05</span>
              </div>
              <span className="text-xs font-semibold text-[#64748b]">
                Specialized AI Track
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Intro, Topics, What Learners Build */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div>
                  <h3 className="font-sora font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0f172a] leading-tight mb-3">
                    Generative AI &amp;{" "}
                    <span className="text-[#0f172a] relative inline-block">
                      LLMs
                      <span className="absolute bottom-1 left-0 right-0 h-2 bg-[#7CFF4F]/60 -z-10 rounded-full" />
                    </span>
                  </h3>
                  <p className="text-[#475569] text-base sm:text-lg leading-relaxed">
                    Learn how modern Large Language Models work and how to build practical, context-aware AI assistants, custom document search tools (RAG), and smart automations on top of them.
                  </p>
                </div>

                {/* Key Topics Overview */}
                <div className="p-6 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#3f6212] block mb-3 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    Key Topics Overview
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {GENAI_TOPICS.map((topic) => (
                      <div
                        key={topic}
                        className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-[#e2e8f0] text-xs font-medium text-[#0f172a]"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#7CFF4F] shrink-0" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What Learners Can Build */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0f172a] block mb-3">
                    What You Can Build in This Course
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-xs">
                      <div className="w-7 h-7 rounded-lg bg-[#ecfccb] text-[#2d6a0a] flex items-center justify-center text-xs font-bold mb-2">
                        1
                      </div>
                      <h4 className="font-sora font-bold text-xs text-[#0f172a] mb-1">
                        Private Document Assistant (RAG)
                      </h4>
                      <p className="text-[11px] text-[#475569] leading-relaxed">
                        Query internal company PDFs, handbooks, and policies with exact citations.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-xs">
                      <div className="w-7 h-7 rounded-lg bg-[#ecfccb] text-[#2d6a0a] flex items-center justify-center text-xs font-bold mb-2">
                        2
                      </div>
                      <h4 className="font-sora font-bold text-xs text-[#0f172a] mb-1">
                        Domain-Specific Chatbot
                      </h4>
                      <p className="text-[11px] text-[#475569] leading-relaxed">
                        Build conversational bots with system personas, rules, and conversational memory.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-xs">
                      <div className="w-7 h-7 rounded-lg bg-[#ecfccb] text-[#2d6a0a] flex items-center justify-center text-xs font-bold mb-2">
                        3
                      </div>
                      <h4 className="font-sora font-bold text-xs text-[#0f172a] mb-1">
                        Automated Summary Pipeline
                      </h4>
                      <p className="text-[11px] text-[#475569] leading-relaxed">
                        Summarize lengthy customer feedback, reports, or transcripts into structured bullets.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-xs">
                      <div className="w-7 h-7 rounded-lg bg-[#ecfccb] text-[#2d6a0a] flex items-center justify-center text-xs font-bold mb-2">
                        4
                      </div>
                      <h4 className="font-sora font-bold text-xs text-[#0f172a] mb-1">
                        Quality &amp; Guardrail Checker
                      </h4>
                      <p className="text-[11px] text-[#475569] leading-relaxed">
                        Evaluate AI responses, prevent hallucinations, and verify safety before delivery.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Concept Card & "More Details" Toggle */}
              <div className="lg:col-span-5 flex flex-col gap-5">
                {/* Visual Architecture Preview (Clean, Light-Themed Adaptation) */}
                <div className="p-6 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] shadow-sm">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#64748b] block mb-3">
                    Concept Preview • Document RAG Flow
                  </span>

                  {/* Step 1: User Query */}
                  <div className="p-3.5 rounded-xl bg-white border border-[#e2e8f0] text-xs text-[#0f172a] mb-2.5">
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#3f6212] mb-1">
                      User Question
                    </span>
                    &ldquo;What is our refund timeline for online course enrolments?&rdquo;
                  </div>

                  {/* Step 2: Retrieval */}
                  <div className="px-3 py-2 rounded-lg bg-[#e2e8f0]/60 border border-[#cbd5e1] text-[11px] text-[#475569] flex items-center gap-2 mb-2.5">
                    <Database className="w-3.5 h-3.5 text-[#2d6a0a]" />
                    <span>Searching verified handbook documents... (Found Section 4.2)</span>
                  </div>

                  {/* Step 3: Assistant Answer */}
                  <div className="p-3.5 rounded-xl bg-[#ecfccb] border border-[#7CFF4F]/80 text-xs text-[#1a2e05] leading-relaxed">
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#2d6a0a] mb-1">
                      AI Assistant (Grounded Answer)
                    </span>
                    Refunds are processed within 5 business days if requested within 48 hours of enrolment.
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[#e2e8f0]">
                    {["Prompting", "LLM APIs", "Embeddings", "RAG", "Guardrails"].map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-md bg-white border border-[#e2e8f0] text-[10px] font-semibold text-[#475569]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Spotlight "More Details" Toggle Card */}
                <div className="p-6 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-sora font-bold text-sm text-[#0f172a]">
                      Course Details &amp; Brochure Request
                    </h4>
                    <span className="text-[11px] font-medium text-[#64748b]">
                      Via WhatsApp
                    </span>
                  </div>

                  <p className="text-xs text-[#475569] leading-relaxed mb-4">
                    Learn more about target audience, practical project milestones, and request the official syllabus.
                  </p>

                  <button
                    type="button"
                    onClick={() => setGenAiExpanded((prev) => !prev)}
                    aria-expanded={genAiExpanded}
                    className="inline-flex items-center justify-between w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#0f172a] hover:bg-[#1e293b] text-white transition-colors"
                  >
                    <span>{genAiExpanded ? "Hide Details" : "More Details"}</span>
                    {genAiExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#7CFF4F]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#7CFF4F]" />
                    )}
                  </button>

                  {/* Expanded Details */}
                  {genAiExpanded && (
                    <div className="mt-4 pt-4 border-t border-[#f1f5f9] space-y-4 animate-in fade-in duration-200 text-xs">
                      <div>
                        <span className="font-bold text-[#0f172a] block mb-1">
                          Who This Course Is For:
                        </span>
                        <p className="text-[#475569] leading-relaxed">
                          Software developers, product managers, data enthusiasts, and tech creators looking to build production AI features using modern LLM APIs.
                        </p>
                      </div>

                      <div>
                        <span className="font-bold text-[#0f172a] block mb-1">
                          Prerequisites &amp; Learning Mode:
                        </span>
                        <p className="text-[#475569] leading-relaxed">
                          Basic programming comfort (Python recommended). No deep mathematics or machine learning background required. Focus is 100% on practical implementation.
                        </p>
                      </div>

                      <div>
                        <span className="font-bold text-[#0f172a] block mb-1">
                          Practical Capstone Project:
                        </span>
                        <p className="text-[#475569] leading-relaxed">
                          Build and demo a complete, functional document question-answering assistant connected to live LLM APIs that you can showcase in your portfolio.
                        </p>
                      </div>

                      {/* WhatsApp Brochure CTA Button */}
                      <div className="pt-2">
                        <a
                          href={genAiWaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-full text-xs font-bold bg-[#7CFF4F] hover:bg-[#6be042] text-[#0f172a] shadow-[0_4px_14px_rgba(124,255,79,0.45)] transition-all"
                        >
                          <MessageCircle className="w-4 h-4 text-[#0f172a]" />
                          <span>Get Brochure on WhatsApp</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                        </a>
                        <p className="text-[11px] text-[#64748b] text-center mt-2">
                          Direct request to AlisTech (+91 9603337862) for the Generative AI &amp; LLMs brochure and detailed syllabus outline.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          DEDICATED SPOTLIGHT 2: AGENTIC AI
          ========================================================================= */}
      <section id="spotlight-agentic" className="relative py-20 sm:py-24 bg-[#f8fafc] overflow-hidden border-b border-[#e2e8f0]">
        <div className="section-container relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Header Badge & Title */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ecfccb] border border-[#7CFF4F]/80 text-[#2d6a0a] text-xs font-bold tracking-wide">
                <Bot className="w-3.5 h-3.5 text-[#2d6a0a]" />
                <span>Dedicated Spotlight • Course 06</span>
              </div>
              <span className="text-xs font-semibold text-[#64748b]">
                Autonomous Systems Track
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Intro, Topics, What Learners Build */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div>
                  <h3 className="font-sora font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0f172a] leading-tight mb-3">
                    Agentic{" "}
                    <span className="text-[#0f172a] relative inline-block">
                      AI
                      <span className="absolute bottom-1 left-0 right-0 h-2 bg-[#7CFF4F]/60 -z-10 rounded-full" />
                    </span>
                  </h3>
                  <p className="text-[#475569] text-base sm:text-lg leading-relaxed">
                    Move beyond simple chat interfaces. Teach AI to break down multi-step goals, use business software tools, and complete end-to-end work autonomously with human oversight.
                  </p>
                </div>

                {/* Key Topics Overview */}
                <div className="p-6 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#3f6212] block mb-3 flex items-center gap-1.5">
                    <Workflow className="w-3.5 h-3.5" />
                    Key Topics Overview
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {AGENTIC_TOPICS.map((topic) => (
                      <div
                        key={topic}
                        className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-xs font-medium text-[#0f172a]"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#7CFF4F] shrink-0" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What Learners Can Build */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0f172a] block mb-3">
                    What You Can Build in This Course
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-xs">
                      <div className="w-7 h-7 rounded-lg bg-[#ecfccb] text-[#2d6a0a] flex items-center justify-center text-xs font-bold mb-2">
                        1
                      </div>
                      <h4 className="font-sora font-bold text-xs text-[#0f172a] mb-1">
                        Inquiry Follow-up Agent
                      </h4>
                      <p className="text-[11px] text-[#475569] leading-relaxed">
                        An agent that reads incoming leads, categorizes intent, and creates follow-up tasks.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-xs">
                      <div className="w-7 h-7 rounded-lg bg-[#ecfccb] text-[#2d6a0a] flex items-center justify-center text-xs font-bold mb-2">
                        2
                      </div>
                      <h4 className="font-sora font-bold text-xs text-[#0f172a] mb-1">
                        Tool-Calling Task Runner
                      </h4>
                      <p className="text-[11px] text-[#475569] leading-relaxed">
                        Connect AI agents to Google Sheets, email APIs, web search, and calculation tools.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-xs">
                      <div className="w-7 h-7 rounded-lg bg-[#ecfccb] text-[#2d6a0a] flex items-center justify-center text-xs font-bold mb-2">
                        3
                      </div>
                      <h4 className="font-sora font-bold text-xs text-[#0f172a] mb-1">
                        Multi-Step Workflow Automator
                      </h4>
                      <p className="text-[11px] text-[#475569] leading-relaxed">
                        Coordinate multi-agent sequences where one agent drafts, one verifies, and one notifies.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-xs">
                      <div className="w-7 h-7 rounded-lg bg-[#ecfccb] text-[#2d6a0a] flex items-center justify-center text-xs font-bold mb-2">
                        4
                      </div>
                      <h4 className="font-sora font-bold text-xs text-[#0f172a] mb-1">
                        Human-in-the-Loop Safe Guard
                      </h4>
                      <p className="text-[11px] text-[#475569] leading-relaxed">
                        System pauses to request human sign-off before sending messages or altering data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Concept Card & "More Details" Toggle */}
              <div className="lg:col-span-5 flex flex-col gap-5">
                {/* Visual Workflow Steps (Clean, Light-Themed Adaptation) */}
                <div className="p-6 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#64748b] block mb-3">
                    Concept Preview • 4-Step Agent Execution
                  </span>

                  <ol className="space-y-3 list-none p-0 m-0">
                    {AGENTIC_STEPS.map((s) => (
                      <li
                        key={s.step}
                        className="p-3 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] flex items-start gap-3"
                      >
                        <span className="w-6 h-6 rounded-full bg-[#0f172a] text-[#7CFF4F] text-[11px] font-bold font-mono flex items-center justify-center shrink-0 mt-0.5">
                          {s.step}
                        </span>
                        <div>
                          <span className="font-sora font-bold text-xs text-[#0f172a] block">
                            {s.title}
                          </span>
                          <span className="text-[11px] text-[#475569] leading-tight block mt-0.5">
                            {s.description}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ol>

                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-[#f1f5f9]">
                    {["Task Planning", "Tool Use", "API Actions", "Human Approval"].map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-md bg-[#f8fafc] border border-[#e2e8f0] text-[10px] font-semibold text-[#475569]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Spotlight "More Details" Toggle Card */}
                <div className="p-6 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-sora font-bold text-sm text-[#0f172a]">
                      Course Details &amp; Brochure Request
                    </h4>
                    <span className="text-[11px] font-medium text-[#64748b]">
                      Via WhatsApp
                    </span>
                  </div>

                  <p className="text-xs text-[#475569] leading-relaxed mb-4">
                    Learn more about target audience, practical workflow projects, and request the official syllabus.
                  </p>

                  <button
                    type="button"
                    onClick={() => setAgenticExpanded((prev) => !prev)}
                    aria-expanded={agenticExpanded}
                    className="inline-flex items-center justify-between w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#0f172a] hover:bg-[#1e293b] text-white transition-colors"
                  >
                    <span>{agenticExpanded ? "Hide Details" : "More Details"}</span>
                    {agenticExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#7CFF4F]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#7CFF4F]" />
                    )}
                  </button>

                  {/* Expanded Details */}
                  {agenticExpanded && (
                    <div className="mt-4 pt-4 border-t border-[#f1f5f9] space-y-4 animate-in fade-in duration-200 text-xs">
                      <div>
                        <span className="font-bold text-[#0f172a] block mb-1">
                          Who This Course Is For:
                        </span>
                        <p className="text-[#475569] leading-relaxed">
                          Engineers, operations professionals, automation specialists, and developers looking to harness agentic loops that interact with external services.
                        </p>
                      </div>

                      <div>
                        <span className="font-bold text-[#0f172a] block mb-1">
                          Prerequisites &amp; Learning Mode:
                        </span>
                        <p className="text-[#475569] leading-relaxed">
                          Basic understanding of Python and API requests. Hands-on coding sessions focused on designing reliable, deterministic tool-calling workflows.
                        </p>
                      </div>

                      <div>
                        <span className="font-bold text-[#0f172a] block mb-1">
                          Practical Capstone Project:
                        </span>
                        <p className="text-[#475569] leading-relaxed">
                          Build and run an autonomous workflow agent that receives customer inquiries, retrieves database information, formats responses, and queues them for human approval.
                        </p>
                      </div>

                      {/* WhatsApp Brochure CTA Button */}
                      <div className="pt-2">
                        <a
                          href={agenticWaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-full text-xs font-bold bg-[#7CFF4F] hover:bg-[#6be042] text-[#0f172a] shadow-[0_4px_14px_rgba(124,255,79,0.45)] transition-all"
                        >
                          <MessageCircle className="w-4 h-4 text-[#0f172a]" />
                          <span>Get Brochure on WhatsApp</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                        </a>
                        <p className="text-[11px] text-[#64748b] text-center mt-2">
                          Direct request to AlisTech (+91 9603337862) for the Agentic AI brochure and detailed syllabus outline.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Practical Learning Value Section (Without unsupported promises) */}
      <section className="relative py-20 sm:py-24 bg-white overflow-hidden border-b border-[#e2e8f0]">
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Heading and Context */}
            <div className="lg:col-span-5 flex flex-col gap-6 text-left">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-[#dde4ec] bg-white text-[#3f6212] shadow-sm w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16]" />
                Our Learning Approach
              </span>

              <h2 className="font-sora font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0f172a] leading-tight">
                Why Practical Learning Works
              </h2>

              <div className="space-y-4 text-[#475569] text-base leading-relaxed">
                <p>
                  Technology evolves quickly. Reading notes or watching lectures alone does not give you confidence with code and AI tools.
                </p>
                <p>
                  We focus on real implementation. You learn by writing code, testing ideas, running tools, and seeing how software works in real scenarios. We avoid unrealistic promises and focus entirely on helping you build genuine competence.
                </p>
              </div>

              {/* No False Promises Box */}
              <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] flex items-start gap-3 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-[#ecfccb] text-[#2d6a0a] border border-[#7CFF4F]/60 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-xs text-[#475569] leading-relaxed">
                  <span className="font-bold text-[#0f172a] block mb-0.5">Honest &amp; Transparent Training</span>
                  No exaggerated claims or unrealistic guarantees. Just practical, step-by-step guidance designed to make you comfortable with modern technology.
                </div>
              </div>
            </div>

            {/* Right Column: 4 Value Pillars */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {PRACTICAL_LEARNING_PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="p-6 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#7CFF4F] hover:bg-white hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#e2e8f0] flex items-center justify-center text-[#2d6a0a] mb-3 shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-sora font-bold text-[#0f172a] text-base mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-[#475569] text-xs sm:text-sm leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. How to Enquire Section */}
      <section id="enquire" className="relative py-20 sm:py-24 bg-[#f8fafc] overflow-hidden border-b border-[#e2e8f0]">
        <div className="section-container relative z-10">
          <SectionHeading
            eyebrow="Simple Enrolment"
            title="How to Enquire "
            highlight="About Training"
            subtitle="Get in touch to discuss your goals, ask questions, and request detailed course brochures."
            className="mb-14 sm:mb-16"
          />

          {/* 3 Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {ENQUIRY_STEPS.map((item) => (
              <div
                key={item.step}
                className="p-6 rounded-2xl bg-white border border-[#e2e8f0] hover:border-[#7CFF4F] hover:shadow-[0_12px_32px_-12px_rgba(15,23,42,0.1)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="w-8 h-8 rounded-full bg-[#0f172a] text-[#7CFF4F] border border-[#7CFF4F]/50 flex items-center justify-center text-xs font-bold font-mono mb-4 shadow-sm">
                    {item.step}
                  </span>
                  <h3 className="font-sora font-bold text-[#0f172a] text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#475569] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Direct Channels Bar */}
          <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <span className="text-xs font-bold text-[#3f6212] uppercase tracking-wider block mb-1">
                Direct Communication
              </span>
              <h4 className="font-sora font-bold text-xl text-[#0f172a]">
                Ready to talk about your training?
              </h4>
              <p className="text-xs sm:text-sm text-[#475569] mt-1">
                Reach out directly on WhatsApp or call our team.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Hi AlisTech, I would like to enquire about your technology training courses and request a brochure."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-[#7CFF4F] text-[#0f172a] hover:bg-[#6be042] shadow-[0_4px_14px_rgba(124,255,79,0.4)] transition-all"
              >
                <MessageCircle className="w-4 h-4" /> Message on WhatsApp
              </a>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] hover:bg-[#eef2f6] transition-colors"
              >
                Online Form →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Closing CTA */}
      <section className="relative py-20 sm:py-24 bg-white overflow-hidden">
        <div className="section-container relative z-10">
          <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#e2e8f0] bg-[#f8fafc] text-[#0f172a] text-xs font-semibold tracking-wider uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#7CFF4F] shadow-[0_0_8px_#7CFF4F]" />
              Start Your Journey
            </span>

            <h2 className="font-sora font-extrabold text-3xl sm:text-4xl lg:text-[44px] text-[#0f172a] leading-tight text-balance">
              Let&apos;s Build Something{" "}
              <span className="text-[#0f172a] relative inline-block">
                Useful.
                <span className="absolute bottom-1 left-0 right-0 h-2.5 bg-[#7CFF4F]/50 -z-10 rounded-full" />
              </span>
            </h2>

            <p className="text-[#475569] text-base sm:text-lg leading-relaxed max-w-lg">
              Tell us what you need. Let&apos;s discuss a solution that works for you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mt-2">
              <Button
                variant="primary"
                size="lg"
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 font-bold shadow-[0_8px_20px_-6px_rgba(124,255,79,0.55)]"
              >
                Let&apos;s Discuss a Solution →
              </Button>
            </div>

            {/* Approved Consultation Supporting Text */}
            <div className="flex items-start sm:items-center gap-3 p-3.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-xs text-[#64748b] max-w-md text-left sm:text-center">
              <div className="w-7 h-7 rounded-lg bg-[#ecfccb] text-[#2d6a0a] flex items-center justify-center shrink-0 border border-[#7CFF4F]/60">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-bold text-[#0f172a] block sm:inline">Your Free 30-Minute Consultation: </span>
                <span>Tell us what you need. Let&apos;s find the right solution.</span>
              </div>
            </div>

            {/* Direct Contact Links */}
            <div
              suppressHydrationWarning
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#64748b] pt-1"
            >
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s+/g, "")}`}
                suppressHydrationWarning
                className="flex items-center gap-2 hover:text-[#0f172a] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#2d6a0a]" />
                <span suppressHydrationWarning className="font-semibold text-[#0f172a]">
                  {PHONE_NUMBER}
                </span>
              </a>
              <span className="text-[#cbd5e1] hidden sm:inline">•</span>
              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                suppressHydrationWarning
                className="flex items-center gap-2 hover:text-[#0f172a] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#2d6a0a]" />
                <span className="font-semibold underline underline-offset-4 text-[#0f172a]">
                  {EMAIL_ADDRESS}
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
