// Navigation links
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/#courses", label: "Courses" },
  { href: "/portfolio", label: "Our Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Contact details
export const PHONE_NUMBER = "+91 9603337862";
export const PHONE_NUMBER_2 = "+91 7997007897";
export const EMAIL_ADDRESS = "AlisTech2877@gmail.com";
export const WHATSAPP_NUMBER = "919603337862";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const WHATSAPP_NUMBER_2 = "917997007897";
export const WHATSAPP_URL_2 = `https://wa.me/${WHATSAPP_NUMBER_2}`;
export const WHATSAPP_QR_URL = "https://wa.me/qr/VFWFGVUGTMO3L1";

// Social media
export const INSTAGRAM_URL = "https://www.instagram.com/alis_techs?stkn=MTR2anY5YnRjYnMxZw==";
export const LINKEDIN_URL = "https://www.linkedin.com/in/alis-tech-152012441?utm_source=share_via&utm_content=profile&utm_medium=member_android";

// Services section sub-line (PDF)
export const SERVICES_SUBTITLE =
  "Websites, apps, AI and automation — simple solutions for everyday business problems.";

// Core services — 12 items from the PDF (exact wording)
export interface CoreService {
  number: string;
  icon: string;
  title: string;
  description: string;
  howItHelps: [string, string, string];
}

export const CORE_SERVICES: CoreService[] = [
  {
    number: "01",
    icon: "Globe",
    title: "Website",
    description: "Business website, online store, portfolio, landing page",
    howItHelps: [
      "Customers find you on Google",
      "Your business looks trusted and professional",
      "Get enquiries 24/7, even when you're closed",
    ],
  },
  {
    number: "02",
    icon: "Smartphone",
    title: "Mobile App",
    description: "Android & iPhone apps for shopping, booking, delivery",
    howItHelps: [
      "Customers order or book in one tap",
      "Your brand stays on their phone",
      "Send offers straight to customers",
    ],
  },
  {
    number: "03",
    icon: "LayoutDashboard",
    title: "Business Software",
    description: "Customers, staff, stock, bookings, billing & orders",
    howItHelps: [
      "No more registers and messy Excel sheets",
      "Check stock, sales and staff anytime",
      "Fewer billing mistakes",
    ],
  },
  {
    number: "04",
    icon: "Bot",
    title: "AI Solutions",
    description: "Chatbots, AI support, assistant, chat with your PDFs",
    howItHelps: [
      "Customers get instant answers, 24/7",
      "Find any info in your files in seconds",
      "Staff stop answering the same questions",
    ],
  },
  {
    number: "05",
    icon: "MessageCircle",
    title: "WhatsApp Automation",
    description: "Auto-replies, reminders, bookings, order updates",
    howItHelps: [
      "Never miss a customer message",
      "Fewer missed appointments with reminders",
      "More sales from on-time follow-ups",
    ],
  },
  {
    number: "06",
    icon: "Zap",
    title: "Business Automation",
    description: "Repetitive tasks, reports, leads, emails & messages",
    howItHelps: [
      "Save hours of manual work every week",
      "No lead gets forgotten",
      "Your tools share data automatically",
    ],
  },
  {
    number: "07",
    icon: "BarChart2",
    title: "Data & Reports",
    description: "Sales reports, dashboards, analysis, forecasting",
    howItHelps: [
      "See your whole business at a glance",
      "Know what sells and what doesn't",
      "Plan stock and sales in advance",
    ],
  },
  {
    number: "08",
    icon: "BookOpen",
    title: "Online Course Platform",
    description: "For coaching centres: videos, tests, student login",
    howItHelps: [
      "Teach students beyond your classroom",
      "Earn more from recorded courses",
      "Track every student's progress",
    ],
  },
  {
    number: "09",
    icon: "FileText",
    title: "Document Processing",
    description: "Read bills, invoices & forms automatically (OCR)",
    howItHelps: [
      "No more typing data by hand",
      "Fewer errors, faster work",
      "Data goes straight into Excel or your software",
    ],
  },
  {
    number: "10",
    icon: "Database",
    title: "Data Collection",
    description: "Prices, product lists & leads from public websites",
    howItHelps: [
      "Track competitor prices easily",
      "Get fresh leads without manual searching",
      "Data delivered ready in Excel",
    ],
  },
  {
    number: "11",
    icon: "CreditCard",
    title: "Payment Integration",
    description: "UPI, cards & Razorpay on your site or app",
    howItHelps: [
      "Get paid online, instantly",
      "Customers pay the way they prefer",
      "Every payment recorded automatically",
    ],
  },
  {
    number: "12",
    icon: "Wrench",
    title: "Custom Solutions",
    description: "Software or AI built for your specific idea or problem",
    howItHelps: [
      "Built around how you already work",
      "Solves what ready-made apps can't",
      "From idea to working product",
    ],
  },
];

// Additional / support services — 6 items (not in PDF; kept as-is)
export const ADDITIONAL_SERVICES = [
  {
    icon: "LayoutDashboard",
    title: "CMS & Admin Systems",
    description:
      "Custom dashboards and content management systems that give your team control over your digital content without complexity.",
    tag: "Support",
  },
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

// Typed courses data for Courses section (#courses)
export interface CourseItem {
  id: string;
  name: string;
  number: string;
  hint: string;
  svgInner: string;
}

export const COURSES: CourseItem[] = [
  {
    id: "python",
    number: "01",
    name: "Python Programming",
    hint: "Start coding from zero",
    svgInner: '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
  },
  {
    id: "data-science",
    number: "02",
    name: "Data Science & Analytics",
    hint: "Turn data into decisions",
    svgInner: '<path d="M4 4v16h16"/><path d="M7.5 15l3.5-4 3 3 5-6"/>',
  },
  {
    id: "machine-learning",
    number: "03",
    name: "Machine Learning",
    hint: "Build models that predict",
    svgInner: '<circle cx="6" cy="7" r="2"/><circle cx="18" cy="7" r="2"/><circle cx="12" cy="17" r="2"/><path d="M8 7h8M7 9l4 6M17 9l-4 6"/>',
  },
  {
    id: "deep-learning",
    number: "04",
    name: "Deep Learning",
    hint: "Neural networks for images and text",
    svgInner: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
  },
  {
    id: "genai",
    number: "05",
    name: "Generative AI & LLMs",
    hint: "Build ChatGPT-style AI apps",
    svgInner: '<path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z"/>',
  },
  {
    id: "agentic-ai",
    number: "06",
    name: "AI Agents & Automation",
    hint: "Make AI do tasks for you",
    svgInner: '<rect x="5" y="8" width="14" height="11" rx="3"/><path d="M12 4v4M9.5 13.5h.01M14.5 13.5h.01"/>',
  },
  {
    id: "computer-vision",
    number: "07",
    name: "Computer Vision",
    hint: "Teach computers to see",
    svgInner: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  },
  {
    id: "nlp",
    number: "08",
    name: "Natural Language Processing",
    hint: "AI that understands language",
    svgInner: '<path d="M4 6h16M4 12h10M4 18h14"/>',
  },
];

// GenAI course topics (Draft copy - confirm with AlisTech owner before launch)
export const GENAI_TOPICS = [
  "Prompt engineering",
  "Working with LLM APIs",
  "Chat with your own documents (RAG)",
  "Building chatbots and assistants",
  "Checking and improving AI answers",
  "A final project you can show",
];

// Agentic AI course topics (Draft copy - confirm with AlisTech owner before launch)
export const AGENTIC_TOPICS = [
  "How AI agents plan and decide",
  "Connecting tools and APIs",
  "Multi-step workflows",
  "Automating WhatsApp, email and sheets",
  "Safety and human approval",
  "A final project you can show",
];

// Agentic AI sample run steps
export const AGENTIC_STEPS = [
  { step: 1, title: "Goal", description: "Follow up with every new enquiry." },
  { step: 2, title: "Plan", description: "Check the sheet, then write a message for each person." },
  { step: 3, title: "Act", description: "Send on WhatsApp and update the sheet." },
  { step: 4, title: "Report", description: "Show you the list and ask before anything important." },
];

