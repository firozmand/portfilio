import type { Profile, Project, Skill } from "@prisma/client";

const contentDate = new Date("2026-08-08T00:00:00.000Z");

export const portfolioProfile: Profile = {
  id: "resume-profile",
  fullName: "Ali Firozmand",
  shortBio: "Front-End Developer | Next.js / React / TypeScript",
  aboutMe:
    "Front-end developer with 4 years of experience building web applications and admin panels with Next.js, React, and TypeScript. Focused on component architecture, API data management, responsive interfaces, SSR/SSG, performance optimization, SEO, and close collaboration with back-end teams.",
  email: "firozmand.dev@gmail.com",
  resumeUrl: "/resume.pdf",
  createdAt: contentDate,
  updatedAt: contentDate,
};

export const resumeProjects: (Omit<Project, "techStack"> & {
  techStack: string[];
})[] = [
  {
    id: "resume-brand-center",
    title: "Brand Center",
    description:
      "Responsive pages and interactive product structures for a platform connecting brands and influencers, built with reusable components and a strong focus on performance and SEO.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "SSR"],
    thumbnail: null,
    liveUrl: "https://brndcenter.com",
    githubUrl: null,
    order: 1,
    isVisible: true,
    createdAt: contentDate,
    updatedAt: contentDate,
  },
  {
    id: "resume-esanj",
    title: "E-Sanj Test Builder",
    description:
      "A modular assessment builder that produces HTML, CSS, JavaScript, and JSON output while keeping complex front-end rendering and data flows maintainable.",
    techStack: ["Next.js", "JavaScript", "HTML/CSS", "JSON"],
    thumbnail: null,
    liveUrl: "https://esanj.ir",
    githubUrl: null,
    order: 2,
    isVisible: true,
    createdAt: contentDate,
    updatedAt: contentDate,
  },
  {
    id: "resume-followtel-mock",
    title: "Followtel Mock",
    description:
      "A mock product environment covering sign-up, login, and administration-panel flows with clear feedback and responsive interactions.",
    techStack: ["React", "Authentication Flows", "Admin Panel", "Mock API"],
    thumbnail: null,
    liveUrl: "https://mock.followtel.ir",
    githubUrl: null,
    order: 3,
    isVisible: true,
    createdAt: contentDate,
    updatedAt: contentDate,
  },
  {
    id: "resume-mefaro",
    title: "Mefaro",
    description:
      "Front-end collaboration on responsive user interfaces and web pages, with attention to consistent visual structure and usability across screen sizes.",
    techStack: ["Responsive UI", "Web Interfaces", "Component Design"],
    thumbnail: null,
    liveUrl: "https://mefaro.ir",
    githubUrl: null,
    order: 4,
    isVisible: true,
    createdAt: contentDate,
    updatedAt: contentDate,
  },
  {
    id: "resume-directam-ai-panel",
    title: "Directam AI Panel",
    description:
      "Front-end collaboration on the interface and interactive flows of an AI-powered web panel, designed for a focused and practical user experience.",
    techStack: ["Admin Panel", "Interactive UI", "Responsive Design"],
    thumbnail: null,
    liveUrl: "https://ai-panel.directam.ir",
    githubUrl: null,
    order: 5,
    isVisible: true,
    createdAt: contentDate,
    updatedAt: contentDate,
  },
];

const skills = [
  ["Next.js", 95, "Core Front-End"],
  ["React", 95, "Core Front-End"],
  ["TypeScript", 90, "Core Front-End"],
  ["JavaScript (ES6+)", 92, "Core Front-End"],
  ["HTML5", 95, "Core Front-End"],
  ["CSS3", 95, "Core Front-End"],
  ["Vue.js", 82, "Core Front-End"],
  ["Tailwind CSS", 95, "UI Engineering"],
  ["Responsive Web Design", 94, "UI Engineering"],
  ["Figma to Code", 88, "UI Engineering"],
  ["TanStack Query", 88, "State & API"],
  ["Redux Toolkit", 88, "State & API"],
  ["Zustand", 86, "State & API"],
  ["Axios", 90, "State & API"],
  ["REST API", 90, "State & API"],
  ["SSR / SSG", 90, "Architecture"],
  ["Component Architecture", 92, "Architecture"],
  ["Performance Optimization", 88, "Architecture"],
  ["SEO", 88, "Architecture"],
  ["Git", 90, "Engineering Tools"],
  ["GitHub", 90, "Engineering Tools"],
  ["GitLab", 90, "Engineering Tools"],
  ["Docker", 76, "Engineering Tools"],
  ["ESLint", 88, "Engineering Tools"],
] as const;

export const resumeSkills: Skill[] = skills.map(
  ([name, level, category], index) => ({
    id: `resume-skill-${index + 1}`,
    name,
    level,
    category,
    order: index + 1,
    createdAt: contentDate,
    updatedAt: contentDate,
  }),
);

export const workExperience = [
  {
    company: "Brand Center",
    website: "https://brndcenter.com",
    role: "Front-End Developer",
    period: "Apr 2025 - Present",
    location: "Isfahan, Iran",
    summary:
      "Developing a platform that connects brands and influencers through responsive, reusable, and production-ready interfaces.",
    highlights: [
      "Build responsive pages and reusable components with Next.js, TypeScript, and Tailwind CSS.",
      "Improve routing, SSR, mobile behavior, SEO, and front-end performance.",
      "Collaborate closely with the back-end team through Git and GitLab workflows.",
    ],
  },
  {
    company: "E-Sanj",
    website: "https://esanj.ir",
    role: "Front-End Developer",
    period: "Apr 2024 - Mar 2025",
    location: "Tehran, Iran",
    summary:
      "Worked on a test-builder microservice that generates HTML, CSS, JavaScript, and JSON output for psychology assessments.",
    highlights: [
      "Designed modular front-end rendering and data-management flows for complex assessment output.",
      "Applied Next.js routing, SSR/SSG, and performance optimization in a maintainable architecture.",
    ],
  },
  {
    company: "Remote & Freelance",
    website: null,
    role: "Front-End Developer",
    period: "Apr 2020 - Nov 2022",
    location: "Remote / Tehran",
    summary:
      "Delivered web applications and administration panels across remote and freelance collaborations.",
    highlights: [
      "Built production interfaces with React, Next.js, Vue.js, TypeScript, and Tailwind CSS.",
      "Focused on responsive behavior, SEO, speed, clean UI, and practical user experience.",
    ],
  },
] as const;

export const skillGroups = [
  {
    title: "Core Front-End",
    description: "The foundation for production web interfaces.",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Vue.js",
    ],
  },
  {
    title: "State & API",
    description: "Predictable client state and API-driven product behavior.",
    items: ["TanStack Query", "Redux Toolkit", "Zustand", "Axios", "REST API"],
  },
  {
    title: "UI Engineering",
    description: "Responsive, accessible interfaces built from product designs.",
    items: ["Tailwind CSS", "Responsive Web Design", "Figma to Code"],
  },
  {
    title: "Architecture & Tools",
    description: "The engineering practices that keep products fast and maintainable.",
    items: [
      "SSR / SSG",
      "Component Architecture",
      "Performance Optimization",
      "SEO",
      "Git",
      "GitHub",
      "GitLab",
      "Docker",
      "ESLint",
    ],
  },
] as const;

export const personalDetails = {
  location: "Isfahan, Iran",
  phone: "+98 913 570 3669",
  phoneHref: "tel:+989135703669",
  website: "https://firozmand.ir",
  github: "https://github.com/firozmand",
  linkedin: "https://linkedin.com/in/ali-firozmand-5967411a4",
  education: "B.Sc. in Software Engineering, GPA 17/20",
  university: "Shahid Shamsipour Technical College, Tehran",
  english: "Reading B2, Listening B2, Writing B1, Speaking B1",
} as const;
