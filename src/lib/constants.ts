// Navigation links
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// WhatsApp config — update with real number when ready
export const WHATSAPP_NUMBER = ""; // e.g. "971501234567"
export const WHATSAPP_URL = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}`
  : "#";

// Core services
export const CORE_SERVICES = [
  {
    icon: "Globe",
    title: "Website Development",
    description:
      "Fast, SEO-friendly websites built with modern frameworks. From landing pages to full business websites that work across all devices.",
    tag: "Core",
  },
  {
    icon: "Briefcase",
    title: "Portfolio Development",
    description:
      "Clean, focused portfolio websites that present your work professionally and help you attract the right clients.",
    tag: "Core",
  },
  {
    icon: "LayoutDashboard",
    title: "CMS & Admin Systems",
    description:
      "Custom dashboards and content management systems that give your team control over your digital content without complexity.",
    tag: "Core",
  },
  {
    icon: "Bot",
    title: "AI & Automation",
    description:
      "Smart integrations, AI chatbots, and automation workflows that save time and help your business run more efficiently.",
    tag: "Core",
  },
  {
    icon: "AppWindow",
    title: "Platform Development",
    description:
      "Web applications and SaaS platforms built with scalable architecture, designed to grow as your user base grows.",
    tag: "Core",
  },
];

export const ADDITIONAL_SERVICES = [
  {
    icon: "Server",
    title: "Hosting Setup",
    description: "Vercel, AWS, or VPS configuration for reliable uptime and fast load times.",
    tag: "Support",
  },
  {
    icon: "Link",
    title: "Domain Setup",
    description: "Domain configuration, DNS management, and SSL certificate installation.",
    tag: "Support",
  },
  {
    icon: "ShieldCheck",
    title: "Maintenance",
    description: "Ongoing updates, security patches, and performance monitoring on a monthly basis.",
    tag: "Support",
  },
  {
    icon: "BarChart2",
    title: "SEO Basics",
    description: "On-page SEO, meta tags, sitemap setup, and Google Search Console configuration.",
    tag: "Support",
  },
  {
    icon: "Rocket",
    title: "Deployment Support",
    description: "Smooth deployments, CI/CD pipelines, and hands-on support at launch.",
    tag: "Support",
  },
];



// About section pillars (no icons, pure text credibility)
export const VALUE_CARDS = [
  {
    icon: "Code2",
    title: "Engineering First",
    description: "Every product is built with clean architecture, maintainable code, and long-term scalability in mind.",
  },
  {
    icon: "Bot",
    title: "AI-Ready",
    description: "We build systems that can integrate intelligence — from automations to full AI-powered workflows.",
  },
  {
    icon: "Zap",
    title: "Shipped on Time",
    description: "Clear scope, clear milestones. We communicate openly and deliver what we commit to.",
  },
  {
    icon: "ShieldCheck",
    title: "Built to Last",
    description: "No shortcuts. No technical debt. Projects are built to be maintained and extended easily.",
  },
];

// Why choose us
export const WHY_CHOOSE_US = [
  {
    icon: "Zap",
    title: "Built for Speed",
    description:
      "We optimize every project for fast load times because performance directly impacts user experience and conversions.",
  },
  {
    icon: "Paintbrush",
    title: "Thoughtful Design",
    description:
      "Clean, modern UI/UX that looks professional and builds confidence with your visitors from the first impression.",
  },
  {
    icon: "Code2",
    title: "Clean, Scalable Code",
    description:
      "Production-ready architecture built to grow with your business. No shortcuts, no technical debt.",
  },
  {
    icon: "Headphones",
    title: "Responsive Support",
    description:
      "We stay available post-launch to help with updates, fixes, and any questions you have along the way.",
  },
  {
    icon: "Globe2",
    title: "Remote-First Workflow",
    description:
      "We work with clients across time zones using async communication and clear project management practices.",
  },
  {
    icon: "ShieldCheck",
    title: "Honest & Transparent",
    description:
      "No hidden costs. No fake timelines. We tell you what's realistic and deliver on what we promise.",
  },
];

// Process steps
export const PROCESS_STEPS = [
  {
    number: "01",
    icon: "Search",
    title: "Discovery",
    description:
      "Understanding your business, goals, audience, and project requirements before a single line of code is written.",
  },
  {
    number: "02",
    icon: "Layers",
    title: "Strategy",
    description:
      "Planning the structure, user experience, technology stack, and execution approach tailored to your goals.",
  },
  {
    number: "03",
    icon: "Code2",
    title: "Development",
    description:
      "Building fast, scalable, and modern digital experiences with clean implementation and continuous communication.",
  },
  {
    number: "04",
    icon: "Rocket",
    title: "Launch & Support",
    description:
      "Deployment, optimization, and ongoing support to keep everything running smoothly after go-live.",
  },
];

// FAQ items
export const FAQ_ITEMS = [
  {
    question: "How long does a project usually take?",
    answer:
      "Project timelines vary depending on complexity, but most websites and digital products are completed within a few weeks. We'll give you a realistic estimate upfront based on your scope.",
  },
  {
    question: "Do you work with startups?",
    answer:
      "Yes. We work with startups, founders, and growing businesses looking to build modern digital experiences. Early-stage or scaling — we're comfortable at every stage.",
  },
  {
    question: "Can you redesign existing websites?",
    answer:
      "Absolutely. We can redesign and modernize outdated websites to improve performance, usability, and overall user experience — while preserving your brand identity.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes. We offer maintenance, updates, optimization, and technical support after launch. You don't have to figure it out alone once the project is live.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We use modern technologies including Next.js, React, Python, Firebase, Tailwind CSS, AI integrations, and scalable cloud-based infrastructure — chosen to match your project's needs.",
  },
];

// AI & Development Stack
export const TECHNOLOGIES = [
  { name: "AI Integration", category: "Intelligence" },
  { name: "Machine Learning", category: "Intelligence" },
  { name: "Python", category: "Language" },
  { name: "Next.js", category: "Framework" },
  { name: "React", category: "UI Library" },
  { name: "Node.js", category: "Runtime" },
  { name: "Firebase", category: "Backend" },
  { name: "Automation Systems", category: "Workflow" },
  { name: "API Integrations", category: "Connectivity" },
  { name: "Cloud Infrastructure", category: "Deployment" },
];

// Who we work with
export const WHO_WE_WORK_WITH = [
  "Startups & Founders",
  "Personal Brands & Creators",
  "Real Estate Businesses",
  "Restaurants & Cafes",
  "Clinics & Healthcare Professionals",
  "Tech Companies & SaaS Startups",
  "Educational Institutions",
  "Local Businesses & Agencies",
];

