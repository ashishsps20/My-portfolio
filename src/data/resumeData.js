// ============================================================
// PORTFOLIO DATA — Ashish Gautam
// ============================================================

export const portfolioData = {
  personal: {
    name: "Ashish Gautam",
    title: "Software Developer",
    roles: [
      "Full-Stack Developer",
      "Software Engineer",
      "Competitive Programmer",
      "Problem Solver",
    ],
    summary:
      "Computer Science undergraduate at MNNIT Allahabad with a strong foundation in Data Structures, Algorithms, and Full-Stack Web Development. Passionate about building high-performance applications and solving complex algorithmic challenges.",
    email: "infoashish17@gmail.com",
    phone: "+91 6395634320",
    location: "Prayagraj, India",
    github: "https://github.com/ashishsps20",
    linkedin: "https://www.linkedin.com/in/ashish-gautam-8abbb6322",
    resumePDF: "/resume.pdf",
  },

  // ============================================================
  // EDUCATION
  // ============================================================

  education: [
    {
      degree: "B.Tech in Computer Science and Engineering",
      institution: "Motilal Nehru National Institute of Technology Allahabad",
      location: "Prayagraj, India",
      year: "2023 – Present",
      cgpa: "8.12 / 10",
      coursework: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming",
        "Operating Systems",
        "DBMS",
        "Computer Networks",
        "Software Engineering",
      ],
    },
    {
      degree: "Class XII (CBSE)",
      institution: "B.G.B. Braj Education Academy, Mahawan, Mathura",
      location: "Mathura, UP",
      year: "2022",
      cgpa: "87.2%",
      coursework: [],
    },
    {
      degree: "Class X (CBSE)",
      institution: "B.G.B. Braj Education Academy, Mahawan, Mathura",
      location: "Mathura, UP",
      year: "2020",
      cgpa: "81.3%",
      coursework: [],
    },
  ],

  // ============================================================
  // TECHNICAL SKILLS
  // ============================================================

  skills: {
    languages: [
      { name: "C++", icon: "💻" },
      { name: "C", icon: "🖥️" },
      { name: "Java", icon: "☕" },
      { name: "JavaScript", icon: "⚡" },
      { name: "SQL", icon: "🗄️" },
    ],

    frontend: [
      { name: "React.js", icon: "⚛️" },
      { name: "Tailwind CSS", icon: "💨" },
    ],

    backend: [
      { name: "Node.js", icon: "🟢" },
      { name: "Express.js", icon: "🚂" },
    ],

    databases: [
      { name: "MongoDB", icon: "🍃" },
      { name: "MySQL", icon: "🐬" },
      { name: "Mongoose", icon: "🐹" },
    ],

    tools: [
      { name: "Git", icon: "🌿" },
      { name: "GitHub", icon: "🐙" },
      { name: "Visual Studio Code", icon: "🖥️" },
      { name: "Linux", icon: "🐧" },
    ],

    fundamentals: [
      { name: "Data Structures & Algorithms", icon: "🧩" },
      { name: "Object-Oriented Programming", icon: "🏗️" },
      { name: "DBMS", icon: "📊" },
      { name: "Operating Systems", icon: "🖥️" },
      { name: "Computer Networks", icon: "🌐" },
      { name: "Software Engineering", icon: "⚙️" },
    ],

    interests: [
      "Full-Stack Web Development",
      "Competitive Programming",
      "Database Management",
    ],
  },

  // ============================================================
  // PROJECTS
  // ============================================================

  projects: [
    {
      id: 1,
      name: "Rubik's Cube Solver",
      year: "2026",
      tagline: "High-performance C++ solver engine",
      description:
        "High-performance C++ Rubik's Cube solver combining bitwise optimization, graph search AI, and interactive 3D rendering.",

      problem:
        "Solving a Rubik's Cube programmatically requires handling an extremely large state space, making efficient state representation, search, and memory usage essential.",

      solution:
        "Engineered a highly performant C++ cube engine using 64-bit integer bitboards and an Iterative Deepening A* solver guided by a custom BFS Corner Pattern Database.",

      features: [
        "64-bit integer bitboard state encoding",
        "IDA* AI solver",
        "Custom BFS Corner Pattern Database",
        "4-bit NibbleArray memory optimization",
        "Multi-threaded 3D visualization",
        "60 FPS rendering using std::async",
        "Dynamic mouse raycasting",
        "Matrix-transformed slice animations",
      ],

      tech: [
        "C++",
        "Raylib",
        "CMake",
        "OpenGL",
        "Multithreading",
        "BFS",
        "DFS",
        "IDA*",
      ],

      github: "https://github.com/ashishsps20/AI-Powered-Developer-Collaboration-Platform",
      demo: "",
      color: "#3B82F6",
      featured: true,
    },

    {
      id: 2,
      name: "Doctor Appointment System",
      year: "2025",
      tagline: "Scalable, AI-powered healthcare platform",

      description:
        "Developed a MERN-based healthcare appointment platform with dedicated Patient, Doctor, and Admin portals, secure authentication, role-based APIs, and AI-powered healthcare features.",

      problem:
        "Patients need a reliable platform to discover appropriate specialists, manage appointments, and access healthcare services through a unified system.",

      solution:
        "Built a scalable MVC backend with MongoDB data modeling, JWT authentication, role-based REST APIs, and integrated Gemini AI for symptom-based specialist recommendations and healthcare assistance.",

      features: [
        "Dedicated Patient, Doctor, and Admin portals",
        "JWT authentication",
        "Role-based REST APIs",
        "Secure appointment management",
        "Gemini AI symptom-based recommendations",
        "AI healthcare chatbot",
        "Redis caching",
        "Razorpay payment integration",
        "Cloudinary media storage",
        "Responsive React SPA",
      ],

      tech: [
        "React 19",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Tailwind CSS",
        "Vite",
        "JWT",
        "Redis",
        "Razorpay",
        "Cloudinary",
        "Multer",
        "Axios",
      ],

      github: "https://github.com/ashishsps20/Doctor-Appointment-Project",
      demo: "https://healthcaredoctorappointment-green.vercel.app/",
      color: "#10B981",
      featured: true,
    },

    {
      id: 3,
      name: "Legacy Trunk",
      year: "2024 – Present",
      tagline: "Collaborative digital family album and heritage platform",

      description:
        "Collaborative digital family album and heritage platform designed to preserve family history, relationships, and multimedia content across generations.",

      problem:
        "Preserving family history and multimedia across generations requires a secure, structured, and easily accessible platform.",

      solution:
        "Engineered a recursive family tree using MongoDB $graphLookup and Mongoose pre-save hooks, while building Time Capsule and Personal Vault features for scheduled content delivery and secure multimedia storage.",

      features: [
        "Recursive family tree using MongoDB $graphLookup",
        "Mongoose pre-save hooks",
        "Dynamic multi-generational hierarchy calculation",
        "Time Capsule scheduled multimedia delivery",
        "Node.js cron jobs",
        "MongoDB TTL indexes",
        "Personal Vault using AWS S3",
        "bcrypt + JWT-based RBAC",
        "RESTful version-control API",
        "Cryptographic claim codes",
      ],

      tech: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "TailwindCSS",
        "JWT",
        "Mongoose",
        "AWS S3",
      ],

      github: "https://github.com/70Gaurav61/The-Legacy-Trunk/tree/main",
      demo: "",
      color: "#8B5CF6",
      featured: true,
    },
    {
      id: 4,
      name: "AI Developer Workspace",
      year: "2024",
      tagline: "AI-Powered Developer Collaboration Platform",

      description:
        "A developer-centric platform unifying project management, GitHub workflows, real-time collaboration, and AI-assisted knowledge retrieval (RAG).",

      problem:
        "Modern software workflows are highly fragmented. Developers bounce between disparate tools for issue tracking, source control, team communication, and documentation.",

      solution:
        "Built a Unified Developer Workspace embedding a context-aware AI assistant utilizing Retrieval-Augmented Generation (RAG) to provide answers informed by specific project docs and GitHub repository activity.",

      features: [
        "RAG Knowledge Base with Qdrant vector storage",
        "Context-aware AI Project Assistant",
        "Real-Time Collaboration via Socket.io",
        "Deep GitHub integration & two-way sync via Webhooks",
        "RBAC and Organization Management",
        "Kanban-style status workflows",
        "High-performance caching with Redis & BullMQ",
      ],

      tech: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Redis",
        "Socket.io",
        "Qdrant",
        "TailwindCSS",
        "Zustand",
        "BullMQ",
      ],

      github: "https://github.com/ashishsps20/AI-Powered-Developer-Collaboration-Platform",
      demo: "",
      color: "#EC4899",
      featured: true,
    },
    {
      id: 5,
      name: "Task Manager",
      year: "2024",
      tagline: "Intuitive MERN-based Task Management Web App",

      description:
        "A powerful Task Management Web App designed to simplify productivity and enhance team collaboration through an intuitive dashboard and real-time updates.",

      problem:
        "Teams often struggle with tracking daily tasks, managing deadlines, and collaborating efficiently without dealing with complex, bloated enterprise software.",

      solution:
        "Developed a streamlined MERN stack application featuring multi-user collaboration, task prioritization, due dates, and a real-time dashboard.",

      features: [
        "Secure User Authentication (Login & Signup)",
        "Comprehensive Task CRUD operations",
        "Due Dates and Prioritization system",
        "Dashboard with real-time updates",
        "Team Collaboration (Multi-user support)",
        "Dark Mode Support",
        "Fully responsive design for mobile & desktop",
      ],

      tech: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
      ],

      github: "https://github.com/ashishsps20/Task-manager-project",
      demo: "",
      color: "#F59E0B",
      featured: true,
    },
    {
      id: 6,
      name: "SkyWarden ✈️",
      year: "2024",
      tagline: "AI-powered military aircraft detection",

      description:
        "A computer-vision system that detects military aircraft in aerial images, classifies each as friendly or enemy, and raises an alert when a hostile aircraft is spotted.",

      problem:
        "Automatically identifying and classifying military aircraft from aerial imagery for rapid situational awareness.",

      solution:
        "Combined a YOLOv8 detector, a Segment-Anything-assisted labeling pipeline, and a Streamlit front end into a single end-to-end aerial image analysis demo.",

      features: [
        "Aircraft detection with YOLOv8 bounding boxes",
        "77-class recognition (fighters, bombers, UAVs)",
        "Rule-based friend/enemy classification",
        "Real-time visual alerts for enemy aircraft",
        "Reproducible training pipeline with SAM auto-labeling",
        "Web interface via Streamlit for image uploads",
      ],

      tech: [
        "YOLOv8",
        "PyTorch",
        "OpenCV",
        "Segment Anything (SAM)",
        "Streamlit",
        "Python",
      ],

      github: "https://github.com/ashishsps20/SkyWarden",
      demo: "",
      color: "#06B6D4", // Cyan
      featured: true,
    },
  ],

  // ============================================================
  // POSITIONS OF RESPONSIBILITY
  // ============================================================

  experience: [
    {
      id: 1,
      role: "Event Co-ordinator",
      company:
        "Footprint Committee (Fashion & Ramp Walk) – Culrav, MNNIT Allahabad",
      location: "Prayagraj",
      duration: "Present",
      type: "Position of Responsibility",

      description:
        "Coordinating events and managing activities for the Fashion & Ramp Walk event at Culrav, MNNIT Allahabad.",

      points: [
        "Organizing and managing the Fashion & Ramp Walk event.",
        "Collaborating with diverse teams to ensure smooth execution of festival activities.",
      ],

      tech: ["Event Management", "Leadership", "Teamwork"],
    },
  ],

  // ============================================================
  // ACHIEVEMENTS
  // ============================================================

  achievements: [
    {
      id: 1,
      title: "LeetCode Knight",
      description:
        "Achieved a maximum rating of 1950 (Knight) on LeetCode with 600+ problems solved.",
      icon: "🏆",
      category: "Competitive Programming",
      year: "Current",
    },

    {
      id: 2,
      title: "Codeforces Pupil",
      description:
        "Achieved a rating of 1255 (Pupil) on Codeforces with a best rank of 2187 in Round #1114 (Div. 3).",
      icon: "🚀",
      category: "Competitive Programming",
      year: "Current",
    },

    {
      id: 3,
      title: "GeeksforGeeks",
      description:
        "Solved 160+ problems across core Data Structures and Algorithms topics.",
      icon: "💻",
      category: "Competitive Programming",
      year: "Current",
    },

    {
      id: 4,
      title: "CodeSparks 2k24",
      description:
        "Secured a Top 5 position in the institute-level coding contest at MNNIT Allahabad.",
      icon: "⭐",
      category: "Competitive Programming",
      year: "2024",
    },
  ],

  // ============================================================
  // CODING PROFILES
  // ============================================================

  codingProfiles: [
    {
      platform: "LeetCode",
      handle: "iam_ashish",
      url: "https://leetcode.com/iam_ashish",
      stats: "600+ Problems",
      detail: "Rating 1950 | Knight",
      color: "#FFA116",
      icon: "⚡",
    },

    {
      platform: "Codeforces",
      handle: "ashishsps2034",
      url: "https://codeforces.com/profile/ashishsps2034",
      stats: "Rating 1255",
      detail: "Pupil | Best Rank: 2187",
      color: "#1890FF",
      icon: "🔷",
    },

    {
      platform: "GeeksForGeeks",
      handle: "ashishd9ur",
      url: "https://www.geeksforgeeks.org/user/ashishd9ur",
      stats: "160+ Problems",
      detail: "Core DSA Topics",
      color: "#2F8D46",
      icon: "🌿",
    },

    {
      platform: "GitHub",
      handle: "ashishsps20",
      url: "https://github.com/ashishsps20",
      stats: "Projects & Contributions",
      detail: "Full-Stack & C++",
      color: "#6e40c9",
      icon: "🐙",
    },
  ],

  // ============================================================
  // ABOUT
  // ============================================================

  about: {
    terminal: [
      {
        cmd: "whoami",
        output: "Ashish Gautam | Software Developer",
      },
      {
        cmd: "cat current_focus.txt",
        output: "Full-Stack Web Development • Competitive Programming • DSA",
      },
      {
        cmd: "cat interests.txt",
        output: "Full-Stack Development • Competitive Programming • Database Management",
      },
      {
        cmd: "cat philosophy.txt",
        output: "Write code that humans can read, not just machines.",
      },
      {
        cmd: "status",
        output: "Building • Learning • Improving 🚀",
      },
    ],

    highlights: [
      {
        label: "LeetCode Rating",
        value: "1950",
      },
      {
        label: "Problems Solved",
        value: "600+",
      },
      {
        label: "Projects Built",
        value: "3",
      },
      {
        label: "CF Best Rank",
        value: "2187",
      },
    ],
  },
};

export default portfolioData;