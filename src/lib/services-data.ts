export interface ServicePillar {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  features: string[];
  highlightTag?: string;
  linkHref?: string;
  linkLabel?: string;
}

export interface DemoProject {
  id: string;
  title: string;
  isLiveCaseStudy?: boolean;
  caseStudySlug?: string;
  summary: string;
  features: string[];
  tags: string[];
}

export interface IndustryDomain {
  id: string;
  anchorId: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  typicalNeeds: string[];
  demos: DemoProject[];
}

/* ── 6 Core Service Pillars ─────────────────────────────────────────────── */
export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: "web-digital",
    number: "01",
    title: "Websites & Online Presence",
    tagline: "Google Visibility & Online Stores",
    description:
      "Modern, fast-loading business websites, online stores, landing pages, and portfolios designed to look trusted, rank on search engines, and convert visitors into inquiries 24/7.",
    iconName: "Globe",
    features: [
      "Custom responsive websites (Next.js & React)",
      "eCommerce & online store catalogs",
      "Domain setup, DNS configuration & SSL certificates",
      "Fast cloud hosting (Vercel, AWS, VPS)",
      "On-page SEO fundamentals & Google Search Console",
      "Monthly maintenance, security patches & uptime monitoring",
    ],
    highlightTag: "Web & eCommerce",
  },
  {
    id: "ai-communication",
    number: "02",
    title: "AI Assistants & Communication",
    tagline: "24/7 Automated Replies & Lead Capture",
    description:
      "Smart customer support chatbots, WhatsApp business agents, and automated AI phone receptionists that respond instantly to incoming customer queries so you never miss a lead.",
    iconName: "Bot",
    features: [
      "24/7 website customer support chatbots",
      "WhatsApp business auto-replies & booking confirmations",
      "AI phone receptionists for call screening & FAQ answers",
      "Lead qualification & appointment scheduling",
      "Multi-language conversational support",
      "Human handoff when complex assistance is needed",
    ],
    highlightTag: "AI & WhatsApp",
  },
  {
    id: "apps-software",
    number: "03",
    title: "Apps & Business Software",
    tagline: "Custom Systems Built Around Your Workflow",
    description:
      "Custom mobile applications and cloud-based software to manage your customers, staff, bookings, inventory, and billing in one unified place — replacing scattered spreadsheets and paper registers.",
    iconName: "Smartphone",
    features: [
      "Cross-platform iOS & Android mobile applications",
      "Custom internal CRM & customer databases",
      "Inventory management & stock reorder alerts",
      "Staff scheduling & attendance tracking",
      "Point of Sale (POS) & quick barcode billing",
      "Role-based access control & secure admin dashboards",
    ],
    highlightTag: "Mobile & Cloud ERP",
  },
  {
    id: "automation-data",
    number: "04",
    title: "Business Automation & Data",
    tagline: "Save Hours of Repetitive Weekly Work",
    description:
      "Connect your everyday tools to run automatically. Eliminate manual data entry, automate document reading (OCR), integrate online payments, and view clean visual business reports.",
    iconName: "Zap",
    features: [
      "Automated cross-app workflows (sheets, email & CRM)",
      "Document processing & invoice scanning (OCR)",
      "Instant payment gateway setup (UPI, cards, Razorpay)",
      "Automated WhatsApp & email notification dispatch",
      "Visual sales & revenue performance dashboards",
      "Business trend analysis & inventory forecasting",
    ],
    highlightTag: "Automation & BI",
  },
  {
    id: "advanced-ai",
    number: "05",
    title: "Advanced AI & Custom Solutions",
    tagline: "Next-Generation Intelligent Systems",
    description:
      "Custom engineering tailored to your unique business problems. From private AI search over company documents (RAG) and autonomous agents to computer vision cameras and startup MVPs.",
    iconName: "Brain",
    features: [
      "Private Document AI (chat with company PDFs & manuals via RAG)",
      "Autonomous AI agents that plan & execute multi-step tasks",
      "Computer vision for visual inspection, OCR & object counting",
      "Voice solutions & automated speech transcription",
      "Private on-premise or cloud-isolated AI deployments",
      "Rapid startup MVPs & functional product prototypes",
    ],
    highlightTag: "Custom AI & MVPs",
  },
  {
    id: "practical-training",
    number: "06",
    title: "Practical Technology Training",
    tagline: "Hands-On Skills in Modern Tech & AI",
    description:
      "Learn modern programming, data analytics, and artificial intelligence through hands-on practice. We explain concepts in plain English without unrealistic promises.",
    iconName: "GraduationCap",
    features: [
      "Python programming fundamentals for complete beginners",
      "Data Science & Analytics with visual business dashboards",
      "Machine Learning & Deep Learning foundations",
      "Dedicated Generative AI & Large Language Models track",
      "Dedicated Agentic AI & Autonomous Workflows track",
      "Computer Vision & Natural Language Processing (NLP)",
    ],
    highlightTag: "Training & Skills",
    linkHref: "/courses",
    linkLabel: "Explore All 8 Courses & AI Spotlights →",
  },
];

/* ── 11 Industry Domains with 20 Demo Projects ──────────────────────────── */
export const INDUSTRY_DOMAINS: IndustryDomain[] = [
  {
    id: "schools-colleges",
    anchorId: "schools-colleges",
    number: "01",
    name: "Schools & Colleges",
    tagline: "Student Portals, Fee Systems & Automated Communication",
    description:
      "Modernize administrative workflows for educational institutions with digital student records, online fee receipts, automated parent notifications, and smart exam evaluation.",
    iconName: "GraduationCap",
    typicalNeeds: [
      "Automated fee collection with instant receipt generation",
      "Student attendance & parent WhatsApp notifications",
      "Digitized exam grading and performance report cards",
    ],
    demos: [
      {
        id: "demo-campussync",
        title: "CampusSync Management Portal",
        isLiveCaseStudy: false,
        summary:
          "A demonstration school portal that unifies student records, fee collection, daily attendance, and automated WhatsApp notices to parents.",
        features: [
          "Student & staff profile directories with class rosters",
          "Automated fee ledger with UPI payment links & receipt generation",
          "One-click attendance logging with parent absent alerts",
        ],
        tags: ["School Portal", "Fee Receipts", "Parent WhatsApp"],
      },
      {
        id: "demo-examgrader",
        title: "Handwritten Q&A Evaluator",
        isLiveCaseStudy: true,
        caseStudySlug: "handwritten-qa-evaluator",
        summary:
          "An AI-assisted document evaluation tool that scans handwritten student answer sheets, detects responses, and assists teachers with preliminary grading.",
        features: [
          "Scanned handwriting OCR and key answer matching",
          "Teacher review interface with side-by-side annotations",
          "Automated score tallying and student performance metrics",
        ],
        tags: ["AI Computer Vision", "Handwriting OCR", "Education"],
      },
    ],
  },
  {
    id: "coaching-centres",
    anchorId: "coaching-centres",
    number: "02",
    name: "Coaching Centres",
    tagline: "Online Test Engines, Video Lessons & Student Inquiries",
    description:
      "Help coaching institutes scale beyond physical classrooms with structured video course portals, timed online test series, and 24/7 admission query handling.",
    iconName: "BookOpen",
    typicalNeeds: [
      "Recorded video lesson platforms with student logins",
      "Timed online practice exams with instant rank scorecards",
      "Instant WhatsApp answering for course fees and new batch timings",
    ],
    demos: [
      {
        id: "demo-edurank",
        title: "EduRank Online Test & LMS Engine",
        isLiveCaseStudy: false,
        summary:
          "A demonstration learning platform featuring structured video course modules, chapter-wise question banks, and timed mock test series.",
        features: [
          "Secure student dashboard with video lesson playback",
          "Timed test engine with negative marking and instant results",
          "Automated batch ranking and student improvement charts",
        ],
        tags: ["Online LMS", "Mock Test Engine", "Student Analytics"],
      },
      {
        id: "demo-coaching-bot",
        title: "Coaching Admissions & Doubt Bot",
        isLiveCaseStudy: false,
        summary:
          "An automated WhatsApp assistant that guides prospective students through course options, upcoming batch dates, and fee schedules.",
        features: [
          "Instant answers on syllabus, batch timings, and faculty details",
          "Automated brochure delivery directly inside WhatsApp",
          "Lead capture that alerts the institute coordinator for follow-up",
        ],
        tags: ["WhatsApp Assistant", "Admission Automation", "Lead Capture"],
      },
    ],
  },
  {
    id: "clinics-healthcare",
    anchorId: "clinics-healthcare",
    number: "03",
    name: "Clinics & Healthcare",
    tagline: "Doctor Appointments, OPD Queues & WhatsApp Reminders",
    description:
      "Reduce waiting room congestion and missed appointments with digital doctor scheduling, live OPD token tracking, and private electronic medical records.",
    iconName: "Stethoscope",
    typicalNeeds: [
      "Online appointment scheduling with doctor availability calendar",
      "Live token queue numbers to avoid crowded waiting rooms",
      "Automated WhatsApp reminders to reduce patient no-shows",
    ],
    demos: [
      {
        id: "demo-mediqueue",
        title: "MediQueue Live OPD Token System",
        isLiveCaseStudy: false,
        summary:
          "A demonstration clinic queue manager where patients check real-time token numbers from their phones and receive departure notifications.",
        features: [
          "Live waiting room screen displaying current consultation token",
          "Mobile token tracking with estimated consultation time",
          "Automated WhatsApp reminder when patient's turn is next",
        ],
        tags: ["Queue Management", "OPD Token", "WhatsApp Reminders"],
      },
      {
        id: "demo-caredesk",
        title: "CareDesk Digital Medical Records",
        isLiveCaseStudy: false,
        summary:
          "A lightweight clinic management tool allowing doctors to quickly generate digital prescriptions, log patient vitals, and review past visits.",
        features: [
          "Quick-type prescription generator with dosage templates",
          "Printable and PDF-shareable prescription formats",
          "Searchable patient visit history and lab report attachments",
        ],
        tags: ["Digital EHR", "Prescription Generator", "Patient Records"],
      },
    ],
  },
  {
    id: "shops-retail",
    anchorId: "shops-retail",
    number: "04",
    name: "Shops & Retail",
    tagline: "Fast Barcode Billing, Stock Control & Online Catalogs",
    description:
      "Equip retail shops, grocery stores, and local merchants with lightning-fast POS billing, real-time stock alerts, and direct WhatsApp product ordering.",
    iconName: "ShoppingBag",
    typicalNeeds: [
      "Fast billing with barcode scanner and receipt printer",
      "Low-stock notifications to prevent running out of key items",
      "Simple online digital catalog for neighborhood customers",
    ],
    demos: [
      {
        id: "demo-quickpos",
        title: "QuickPOS Retail Billing Terminal",
        isLiveCaseStudy: false,
        summary:
          "A demonstration point-of-sale system built for touchscreens and barcode scanners, providing rapid checkout and automatic daily profit reports.",
        features: [
          "One-scan product lookup with thermal printer compatibility",
          "Automatic GST calculations and UPI QR code on bill",
          "Daily cash summary and low-inventory warning alerts",
        ],
        tags: ["Retail POS", "Barcode Billing", "Inventory Alerts"],
      },
      {
        id: "demo-localstore",
        title: "LocalStore WhatsApp eCommerce Catalog",
        isLiveCaseStudy: false,
        summary:
          "A mobile-friendly product catalog allowing neighborhood shoppers to browse items, add to cart, and send completed orders directly to shop WhatsApp.",
        features: [
          "Clean mobile product catalog with category filters",
          "Instant WhatsApp order summary with delivery address",
          "Shopkeeper admin to update prices and mark out-of-stock items",
        ],
        tags: ["WhatsApp Store", "Local eCommerce", "Instant Orders"],
      },
    ],
  },
  {
    id: "restaurants-cafes",
    anchorId: "restaurants-cafes",
    number: "05",
    name: "Restaurants & Cafes",
    tagline: "Digital QR Menus, Table Ordering & Reservation Bots",
    description:
      "Modernize dining operations with contactless QR table menus, direct-to-kitchen order tickets, and automated reservation bots that drive repeat visits.",
    iconName: "Utensils",
    typicalNeeds: [
      "Easy-to-update digital menus accessible via QR code on tables",
      "Direct table ordering that routes tickets straight to the kitchen",
      "Automated reservation booking and diner review collection",
    ],
    demos: [
      {
        id: "demo-dinetap",
        title: "DineTap Digital QR Table Menu",
        isLiveCaseStudy: false,
        summary:
          "A demonstration contactless dining solution where guests scan a table QR code to browse photos, customize orders, and submit tickets to the kitchen.",
        features: [
          "Instant mobile menu loading without downloading any app",
          "Special instructions, dietary tags, and chef recommendation badges",
          "Kitchen display feed showing table orders in real time",
        ],
        tags: ["QR Menu", "Contactless Dining", "Kitchen Orders"],
      },
      {
        id: "demo-tablebot",
        title: "TableBot Reservation Agent",
        isLiveCaseStudy: false,
        summary:
          "An automated conversational bot that answers reservation requests, checks table capacity, confirms party bookings, and sends venue directions.",
        features: [
          "Real-time table availability checking for lunch and dinner slots",
          "Automated WhatsApp confirmation with Google Maps pin",
          "Post-dining automated feedback request to boost Google ratings",
        ],
        tags: ["Reservation Bot", "Dining Feedback", "WhatsApp Booking"],
      },
    ],
  },
  {
    id: "real-estate",
    anchorId: "real-estate",
    number: "06",
    name: "Real Estate",
    tagline: "Searchable Property Listings & Instant Lead Capture",
    description:
      "Equip real estate builders, agencies, and independent brokers with high-converting property showcase portals, interactive filter search, and automated buyer lead capture.",
    iconName: "Building2",
    typicalNeeds: [
      "Searchable property showcase with location & price filters",
      "Floor plans, photo galleries, and video walkthrough embeds",
      "Instant WhatsApp brochure download with buyer phone capture",
    ],
    demos: [
      {
        id: "demo-estateview",
        title: "EstateView Property Showcase Hub",
        isLiveCaseStudy: false,
        summary:
          "A demonstration real estate portal displaying residential apartments and commercial properties with responsive filters and interactive floor plans.",
        features: [
          "Location, budget, and BHK property filtering",
          "High-resolution photo galleries and YouTube video tour embeds",
          "Mortgage / EMI calculator widget for prospective home buyers",
        ],
        tags: ["Property Portal", "Real Estate Showcase", "Floor Plans"],
      },
      {
        id: "demo-brokerlead",
        title: "BrokerLead WhatsApp Qualifier",
        isLiveCaseStudy: false,
        summary:
          "An automated lead funnel that delivers property PDF brochures to buyer WhatsApp numbers and automatically qualifies their budget and timeframe.",
        features: [
          "Instant PDF brochure delivery upon phone number verification",
          "Automated qualification questionnaire (budget, ready-to-move vs. under-construction)",
          "Instant notification to sales team when a high-intent buyer responds",
        ],
        tags: ["Lead Qualification", "Brochure Automation", "Real Estate CRM"],
      },
    ],
  },
  {
    id: "startups",
    anchorId: "startups",
    number: "07",
    name: "Startups",
    tagline: "Rapid MVP Prototypes & Scalable Digital Products",
    description:
      "Turn your startup idea into a working digital product within weeks. We build clean, high-performance web applications and mobile MVPs ready for initial users and investors.",
    iconName: "Rocket",
    typicalNeeds: [
      "Rapid turnaround from product idea to working web or mobile MVP",
      "Secure authentication, database modeling, and billing integrations",
      "Scalable modern tech stack (Next.js, Python, Cloud infrastructure)",
    ],
    demos: [
      {
        id: "demo-launchkit",
        title: "LaunchKit SaaS MVP Boilerplate",
        isLiveCaseStudy: false,
        summary:
          "A demonstration full-stack SaaS foundation featuring user signups, multi-tenant team workspaces, subscription billing, and an admin metrics dashboard.",
        features: [
          "Firebase Auth & Google social login integration",
          "Subscription payment gateway integration with webhooks",
          "Role-based permissions and team invite management",
        ],
        tags: ["Startup MVP", "SaaS Architecture", "Next.js & Cloud"],
      },
      {
        id: "demo-unixum",
        title: "uniXum Sports & Community Platform",
        isLiveCaseStudy: true,
        caseStudySlug: "unixum-sports-platform",
        summary:
          "A multi-tenant sports and community platform built for athletes, academies, and scouts featuring athlete profiles, tournament calendars, and event registration.",
        features: [
          "Athlete portfolio pages with verified statistics & match highlights",
          "Academy and tournament management directory",
          "Community discovery feed with mobile-responsive design",
        ],
        tags: ["Community App", "Verified Case Study", "Multi-Tenant Platform"],
      },
    ],
  },
  {
    id: "small-businesses",
    anchorId: "small-businesses",
    number: "08",
    name: "Small Businesses",
    tagline: "Professional Websites, Digital Invoicing & Daily Efficiency",
    description:
      "Help service businesses, agencies, and contractors look established online, rank on local Google search, automate client quotes, and get paid faster.",
    iconName: "Briefcase",
    typicalNeeds: [
      "Professional, modern business website that builds trust",
      "Quick quote creation, GST invoices, and payment reminders",
      "Customer inquiry tracking so no potential job is overlooked",
    ],
    demos: [
      {
        id: "demo-bizpro",
        title: "BizPro Professional Service Showcase",
        isLiveCaseStudy: false,
        summary:
          "A demonstration corporate website for service businesses featuring service breakdowns, verified customer reviews, Google Map embed, and contact capture.",
        features: [
          "Clear explanation of services, pricing guides, and past work",
          "SEO-optimized layout for local city and regional searches",
          "Direct click-to-call, email, and WhatsApp inquiry buttons",
        ],
        tags: ["Business Website", "Local SEO", "Lead Inquiries"],
      },
      {
        id: "demo-invoicemate",
        title: "InvoiceMate Quote & Billing Manager",
        isLiveCaseStudy: false,
        summary:
          "A clean business management tool to generate professional estimates, convert them to invoices upon client approval, and log payments.",
        features: [
          "Branded PDF quote & invoice generator with company logo",
          "One-click payment status tracking (Draft, Sent, Paid, Overdue)",
          "Automated WhatsApp payment reminder message template",
        ],
        tags: ["Invoice Manager", "PDF Quotes", "Payment Tracking"],
      },
    ],
  },
  {
    id: "enterprises",
    anchorId: "enterprises",
    number: "09",
    name: "Enterprises",
    tagline: "Custom Internal Dashboards, Security & Private AI Search",
    description:
      "Deliver enterprise-grade internal tooling, data pipelines, security consoles, and private AI document intelligence models deployed within your infrastructure.",
    iconName: "Building",
    typicalNeeds: [
      "Custom operations consoles and cross-departmental dashboards",
      "Private AI question-answering over confidential company manuals (RAG)",
      "Strict data privacy, role-based access, and enterprise audit logs",
    ],
    demos: [
      {
        id: "demo-socvision",
        title: "AI Security SOC Dashboard",
        isLiveCaseStudy: true,
        caseStudySlug: "ai-security-soc-dashboard",
        summary:
          "A real-time security operations center dashboard for monitoring threat feeds, analyzing security incident severity, and dispatching alert notifications.",
        features: [
          "Interactive live threat visualization and severity categorization",
          "Automated incident triage and response playbook tracking",
          "Enterprise role permissions and compliance audit logging",
        ],
        tags: ["Cybersecurity", "Verified Case Study", "Enterprise Console"],
      },
      {
        id: "demo-docintel",
        title: "Enterprise DocIntel (Private RAG Assistant)",
        isLiveCaseStudy: false,
        summary:
          "A private document intelligence platform that indexes internal company policy documents, technical specs, and contracts for instant cited answers.",
        features: [
          "Private vector search with precise document page citations",
          "Strict data isolation with zero model training on company data",
          "Role-restricted document folders ensuring access confidentiality",
        ],
        tags: ["Private AI", "Document RAG", "Enterprise Search"],
      },
    ],
  },
  {
    id: "ngos-nonprofits",
    anchorId: "ngos-nonprofits",
    number: "10",
    name: "NGOs & Nonprofits",
    tagline: "Transparent Donation Portals, 80G Receipts & Outreach",
    description:
      "Enable charities, foundations, and community initiatives to raise funds transparently, issue tax receipts automatically, and showcase real social impact.",
    iconName: "HeartHandshake",
    typicalNeeds: [
      "Transparent online donation collection with UPI and card support",
      "Instant 80G tax exemption receipt delivery to donor email/WhatsApp",
      "Impact stories, photo updates, and volunteer registration forms",
    ],
    demos: [
      {
        id: "demo-sevacare",
        title: "SevaCare Donation & 80G Receipt Portal",
        isLiveCaseStudy: false,
        summary:
          "A demonstration charitable portal featuring campaign progress bars, instant digital donation checkout, and automated tax certificate generation.",
        features: [
          "One-click UPI and international card donation integration",
          "Instant automated 80G tax receipt PDF generated and emailed to donor",
          "Transparent live campaign funds tracker and photo update gallery",
        ],
        tags: ["Donation Portal", "80G Tax Receipts", "NGO Transparency"],
      },
    ],
  },
  {
    id: "individuals-professionals",
    anchorId: "individuals-professionals",
    number: "11",
    name: "Individuals & Professionals",
    tagline: "Personal Brand Portfolios & Appointment Scheduling",
    description:
      "Help consultants, doctors, lawyers, creators, and independent experts showcase their experience, publish case studies, and book high-value client advisory sessions.",
    iconName: "UserCheck",
    typicalNeeds: [
      "Distinguished personal website that highlights expertise & credentials",
      "Curated showcase of publications, client case studies, or speaking",
      "Direct consultation booking with WhatsApp or calendar link",
    ],
    demos: [
      {
        id: "demo-consultant",
        title: "Mohammed Basharat — Professional Portfolio",
        isLiveCaseStudy: true,
        caseStudySlug: "mohammed-basharat-professional-portfolio-website",
        summary:
          "A demonstration executive portfolio site highlighting advisory credentials, published articles, client testimonials, and a direct inquiry calendar.",
        features: [
          "Clean executive personal branding with tailored biography and skills",
          "Curated case study library and media appearance highlights",
          "Seamless client contact integration via WhatsApp and direct email",
        ],
        tags: ["Personal Brand", "Verified Case Study", "Consultant Portfolio"],
      },
    ],
  },
];

/* ── 4 How We Work Steps ─────────────────────────────────────────────────── */
export const HOW_WE_WORK_STEPS = [
  {
    step: "01",
    title: "Understand Your Needs",
    description:
      "We begin with a friendly discussion to understand your business goals, daily challenges, and exact technical requirements before writing any code.",
  },
  {
    step: "02",
    title: "Practical Strategy & Plan",
    description:
      "We design a clear architecture, choose the right tools (Next.js, Python, AI APIs), and provide a straightforward scope with no technical jargon.",
  },
  {
    step: "03",
    title: "Clean Development & Live Demos",
    description:
      "We build your software with modern, fast tools, sharing regular live demos so you can see your product coming to life step by step.",
  },
  {
    step: "04",
    title: "Launch & Ongoing Support",
    description:
      "We manage domain setup, hosting configuration, and deployment, staying available post-launch to keep everything running smoothly.",
  },
];
