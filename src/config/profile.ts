export const profileConfig = {
  personal: {
    name: "Sandeep Halyal",
    title: "Forward Deployed Engineer | AI & Full-Stack",
    email: "sandeep.d.halyal@gmail.com",
    phone: "+918660371123",
    location: "Bengaluru, India",
    linkedin: "https://www.linkedin.com/in/sandeep-h-6709a7a5/",
    quora: "https://www.quora.com/profile/Sandeep-Halyal/",
    github: "https://github.com/SandeepHalyal",
    website: "https://sandeephalyal.vercel.app",
    tagline: "Forward Deployed Engineer bridging MERN stack foundations, real-time AI agents, and high-security local-first architectures.",
  },
  skills: [
    "Forward Deployed Engineering Skills",
    "Product Architecture & Engineering Skills",
    "Self-Orchestrated AI & RAG Skills",
    "Hybrid LLM Orchestration (Local & Cloud) Skills",
    "Conversational AI (Voice & Text / STT & TTS) Skills",
    "Local-First & Offline Applications Skills",
    "High-Security & HIPAA Compliance Skills",
    "AES-256 Encryption (AES-GCM / Web Crypto) Skills",
    "MERN Stack (MongoDB, Express, React, Node.js) Skills",
    "GraphQL & REST APIs Skills",
    "TypeScript & Next.js/React Skills",
    "System Architecture Skills",
    "Docker & Cloud Systems (GCP) Skills",
  ],
  languages: [
    { name: "Kannada", proficiency: 90 },
    { name: "Hindi", proficiency: 80 },
    { name: "English", proficiency: 80 },
  ],
  interests: ["Bike Riding", "Poetry", "Story Writing"],
  experience: [
    {
      role: "MERN Developer +",
      company: "RoaDo - Hicetane Logistics Innovations Private Limited",
      period: "10/2019 - Present",
      location: "Bengaluru, India",
      description: "Progressed from core MERN full-stack developer to leading the end-to-end development, architecture, and management of multiple business-critical internal applications for company operations and accounting.",
      achievements: [
        "<b>Product Architecture & Delivery:</b> Designed, built, and managed multiple business-critical internal applications for company operations and accounting, automating billing and workflow pipelines.",
        "<b>MERN Stack Foundation:</b> Developed and scaled core logistics dashboards, micro-frontends (React), and backend APIs (Node.js/Express) using MongoDB for transaction telemetry.",
        "<b>Core Automations:</b> Built mathematical tracking models (alphanumeric UIDs), Razorpay payment integrations, and operational billing pipelines handling high-volume logistics transactions.",
        "<b>DevOps & Team Leadership:</b> Managed database migrations, configured CI/CD release pipelines, and mentored a team of 4 junior developers in agile sprint environments.",
        "<b>Forward Deployed Operations:</b> Collaborated closely with operational, sales, and design teams, conducting field visits to translate user behavior into new software capabilities."
      ],
      images: []
    },
    {
      role: "Founder & Systems Builder",
      company: "Samprithi Farms",
      period: "04/2023 - 03/2025",
      location: "Bengaluru, India",
      description: "Launched a direct-to-consumer food supply brand, building custom enterprise software for order management and fulfillment.",
      link: "https://www.instagram.com/samprithiorganicfarm?igsh=MWExbzIwOHNrdXVzdg==",
      achievements: [
        "<b>System Architecture & Build:</b> Architected and deployed a custom MERN-based order management portal.",
        "<b>Business & Partnerships:</b> Scaled retail operations and secured partner contracts with premium organic stores and thousands of direct-to-consumer buyers.",
        "<b>Product Leadership:</b> Directed digital growth campaigns and oversaw product-market fit research and operations."
      ],
      images: [
        '/images/farm/img1.jpg',
        '/images/farm/img2.jpg',
        '/images/farm/img3.jpg',
        '/images/farm/img4.jpg',
        '/images/farm/img5.jpg',
      ]
    }
  ],
  projects: [
    {
      name: "Hanchu (ಹಂಚು)",
      period: "07/2026 - Present",
      description: "Open-source, highly secure, HIPAA-compliant local-first vault for BDS and MDS dental students to manage clinical quotas and securely hand over patient records to juniors. Architected with a zero-backend 'Smart Lens' design: Vite PWA, OPFS + wa-sqlite for structured metadata secured with AES-256 encryption (AES-GCM at the app layer via Web Crypto API), File System Access API for unencrypted media on disk, local Tesseract OCR, and offline ZIP handovers.",
      link: 'https://hanchu.tridenta.in',
      images: []
    },
    {
      name: "Tridenta",
      period: "04/2026 - Present",
      description: "All-in-one, AI-first OS for dentists to manage clinics, consultations, and academics, engineered and deployed end-to-end. <b>AI Agent Integration:</b> Built self-orchestrated voice and text conversational AI agents using a custom hybrid configuration of local and backend cloud LLMs, alongside optimized STT/TTS combinations to maximize speed and minimize cost. Architected with high-security, HIPAA-compliant parameters, React micro-frontends (Module Federation), Node.js, Turborepo, and local-first data privacy.",
      link: "https://tridenta.in",
      images: []
    },
    {
      name: "Dwithi",
      period: "05/2025 - Present",
      description: "A text-only conversational RAG pipeline. Features custom self-orchestrated RAG pipelines (embedding and retrieving scriptures like Mahabharata & Ramayana from MongoDB) and web-searching via Puppeteer, engineered end-to-end to optimize query performance and reduce operational latency.",
      link: 'https://dwithi.vercel.app',
      images: []
    },
    {
      name: "Marriage Memories",
      period: "07/2025 - Present",
      description: "An SSR website with details of my marriage and a portal to upload and view photos stored in Cloudinary.",
      link:'https://aishudeepu.vercel.app',
      images: []
    },
    {
      name: "Stock Maths",
      period: "12/2021 - 01/2022",
      description: "TypeScript script written to analyze stock market movement and notify when expected behavior is observed.",
      images: []
    },
    {
      name: "YouTube",
      period: "01/2018 - 08/2020",
      description: "Created a series of YouTube videos (Video Logs)",
      link: "https://youtube.com/@sandeephalyal7325?si=-_jvlref0A662da3",
      images: []
    }
  ],
  education: [
    {
      degree: "Mechanical Engineering",
      institution: "PES University",
      period: "08/2014 - 08/2018",
      minor: "Electronics and Communication"
    }
  ]
};
