import type { Profile, Project, Skill } from "@prisma/client";

const contentDate = new Date("2026-07-05T00:00:00.000Z");

export const portfolioProfile: Profile = {
  id: "resume-profile",
  fullName: "Ali Firozmand",
  shortBio: "Front-End Developer focused on modern, high-performance products.",
  aboutMe:
    "Front-end developer with 4+ years of experience designing and building modern web applications, management panels, online sales systems, and content platforms. I focus on Next.js, React, and TypeScript, with a strong interest in component architecture, rendering strategy, performance, SEO, clean code, and practical collaboration.",
  email: "firozmand.dev@gmail.com",
  resumeUrl: "/resume.pdf",
  createdAt: contentDate,
  updatedAt: contentDate,
};

export const resumeProjects: (Omit<Project, "techStack"> & {
  techStack: string[];
})[] = [
  {
    id: "resume-festivvo",
    title: "Festivvo",
    description:
      "A modern event and concert ticketing product with responsive purchase journeys, scalable front-end architecture, and a strong focus on performance.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    thumbnail: null,
    liveUrl: "https://festivvo.ir",
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
      "A psychology assessment builder that turns structured data into HTML, CSS, JavaScript, and JSON while keeping complex rendering logic manageable.",
    techStack: ["Next.js", "JavaScript", "SSR/SSG", "JSON"],
    thumbnail: null,
    liveUrl: "https://esanj.ir",
    githubUrl: null,
    order: 2,
    isVisible: true,
    createdAt: contentDate,
    updatedAt: contentDate,
  },
  {
    id: "resume-asgari-holdings",
    title: "Asgari Holdings",
    description:
      "The corporate website for Asgari Holdings, shaped around a contemporary visual language, scalable content structure, fast delivery, and SEO.",
    techStack: ["Next.js", "TypeScript", "Responsive UI", "SEO"],
    thumbnail: null,
    liveUrl: "https://asgariholdings.com",
    githubUrl: null,
    order: 3,
    isVisible: true,
    createdAt: contentDate,
    updatedAt: contentDate,
  },
  {
    id: "resume-brand-center",
    title: "Brand Center",
    description:
      "A multi-surface platform for employers and brands, including profile pages, brand introductions, and structured organizational content.",
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    thumbnail: null,
    liveUrl: "https://brand-center.org",
    githubUrl: null,
    order: 4,
    isVisible: true,
    createdAt: contentDate,
    updatedAt: contentDate,
  },
];

const skills = [
  ["Next.js", 95, "Frontend"],
  ["React", 95, "Frontend"],
  ["TypeScript", 90, "Frontend"],
  ["JavaScript ES6+", 92, "Frontend"],
  ["Vue.js", 82, "Frontend"],
  ["Tailwind CSS", 95, "UI"],
  ["Sass / SCSS", 84, "UI"],
  ["Responsive UI", 94, "UI"],
  ["Redux Toolkit", 88, "State & Data"],
  ["Zustand", 86, "State & Data"],
  ["TanStack Query", 88, "State & Data"],
  ["REST APIs", 90, "State & Data"],
  ["SSR / SSG / CSR", 90, "Architecture"],
  ["SEO & Performance", 88, "Architecture"],
  ["Git / GitLab", 90, "Tools"],
  ["Docker", 76, "Tools"],
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
    company: "Festivvo / Asgari Holdings",
    role: "Front-End Developer",
    period: "Apr 2025 - Present",
    location: "Isfahan, Iran",
    summary:
      "Building and evolving a connected set of products across ticketing, brand content, and the group corporate website.",
    highlights: [
      "Delivered modern ticketing, profile, and interactive product flows with Next.js, TypeScript, and Tailwind CSS.",
      "Improved rendering strategy, responsive behavior, and component architecture for easier long-term growth.",
      "Collaborated through Git and GitLab with back-end teams and used AI-assisted workflows to shorten delivery cycles.",
    ],
  },
  {
    company: "E-Sanj",
    role: "Front-End Developer",
    period: "Apr 2024 - Mar 2025",
    location: "Tehran, Iran",
    summary:
      "Worked on a microservice and builder for creating and delivering psychology assessments.",
    highlights: [
      "Built interfaces for composing assessments and producing HTML, CSS, JavaScript, and JSON output.",
      "Managed complex front-end rendering and data flows with a scalable, maintainable approach.",
      "Applied advanced Next.js routing, SSR/SSG, performance optimization, and modular architecture.",
    ],
  },
  {
    company: "Independent / Remote",
    role: "Front-End Developer",
    period: "Apr 2020 - Nov 2022",
    location: "Remote",
    summary:
      "Partnered on web applications, admin panels, and online products including Finomate and several management platforms.",
    highlights: [
      "Implemented production interfaces with React, Next.js, Vue.js, TypeScript, and Tailwind CSS.",
      "Focused on clean UI, responsive behavior, SEO, speed, and a frictionless user experience.",
    ],
  },
] as const;

export const skillGroups = [
  {
    title: "Core front-end",
    description: "The everyday foundation for production interfaces.",
    items: ["Next.js", "React", "TypeScript", "JavaScript ES6+", "Vue.js"],
  },
  {
    title: "UI engineering",
    description: "Responsive systems with precise, maintainable styling.",
    items: ["Tailwind CSS", "Sass / SCSS", "Figma", "Responsive UI"],
  },
  {
    title: "State & data",
    description: "Predictable data flows and API-driven product behavior.",
    items: ["Redux Toolkit", "Zustand", "TanStack Query", "Axios", "REST APIs"],
  },
  {
    title: "Architecture",
    description: "The less visible work that keeps products fast and healthy.",
    items: ["SSR / SSG / CSR", "SEO", "Performance", "Git / GitLab", "Docker"],
  },
] as const;

export const personalDetails = {
  location: "Isfahan, Iran",
  phone: "+98 913 530 3669",
  website: "https://firozmand.ir",
  github: "https://github.com/firozmand",
  linkedin: "https://linkedin.com/in/ali-firozmand-5967411a4",
  education: "B.Sc. in Software Engineering",
  university: "Payame Noor University of Tehran",
  english: "Professional reading and listening (B2)",
} as const;
