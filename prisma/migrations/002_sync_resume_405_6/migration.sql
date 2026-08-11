-- Keep existing profile records aligned with the published resume.
UPDATE "Profile"
SET
  "fullName" = 'Ali Firozmand',
  "shortBio" = 'Front-End Developer | Next.js / React / TypeScript',
  "aboutMe" = 'Front-end developer with 4 years of experience building web applications and admin panels with Next.js, React, and TypeScript. Focused on component architecture, API data management, responsive interfaces, SSR/SSG, performance optimization, SEO, and close collaboration with back-end teams.',
  "email" = 'firozmand.dev@gmail.com',
  "resumeUrl" = '/resume.pdf',
  "updatedAt" = CURRENT_TIMESTAMP;

INSERT INTO "Profile" (
  "id",
  "fullName",
  "shortBio",
  "aboutMe",
  "email",
  "resumeUrl",
  "createdAt",
  "updatedAt"
)
SELECT
  'default-profile',
  'Ali Firozmand',
  'Front-End Developer | Next.js / React / TypeScript',
  'Front-end developer with 4 years of experience building web applications and admin panels with Next.js, React, and TypeScript. Focused on component architecture, API data management, responsive interfaces, SSR/SSG, performance optimization, SEO, and close collaboration with back-end teams.',
  'firozmand.dev@gmail.com',
  '/resume.pdf',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM "Profile");

-- Retain old records for admin history, but remove them from the public portfolio.
UPDATE "Project"
SET "isVisible" = false, "updatedAt" = CURRENT_TIMESTAMP
WHERE "id" IN (
  'portfolio-festivvo',
  'portfolio-esanj',
  'portfolio-asgari-holdings',
  'portfolio-brand-center'
);

INSERT INTO "Project" (
  "id",
  "title",
  "description",
  "techStack",
  "thumbnail",
  "liveUrl",
  "githubUrl",
  "order",
  "isVisible",
  "createdAt",
  "updatedAt"
)
VALUES
  (
    'resume-brand-center',
    'Brand Center',
    'Responsive pages and interactive product structures for a platform connecting brands and influencers, built with reusable components and a strong focus on performance and SEO.',
    '["Next.js","TypeScript","Tailwind CSS","SSR"]',
    NULL,
    'https://brndcenter.com',
    NULL,
    1,
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'resume-esanj',
    'E-Sanj Test Builder',
    'A modular assessment builder that produces HTML, CSS, JavaScript, and JSON output while keeping complex front-end rendering and data flows maintainable.',
    '["Next.js","JavaScript","HTML/CSS","JSON"]',
    NULL,
    'https://esanj.ir',
    NULL,
    2,
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'resume-followtel-mock',
    'Followtel Mock',
    'A mock product environment covering sign-up, login, and administration-panel flows with clear feedback and responsive interactions.',
    '["React","Authentication Flows","Admin Panel","Mock API"]',
    NULL,
    'https://mock.followtel.ir',
    NULL,
    3,
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'resume-mefaro',
    'Mefaro',
    'Front-end collaboration on responsive user interfaces and web pages, with attention to consistent visual structure and usability across screen sizes.',
    '["Responsive UI","Web Interfaces","Component Design"]',
    NULL,
    'https://mefaro.ir',
    NULL,
    4,
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'resume-directam-ai-panel',
    'Directam AI Panel',
    'Front-end collaboration on the interface and interactive flows of an AI-powered web panel, designed for a focused and practical user experience.',
    '["Admin Panel","Interactive UI","Responsive Design"]',
    NULL,
    'https://ai-panel.directam.ir',
    NULL,
    5,
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  )
ON CONFLICT ("id") DO UPDATE SET
  "title" = EXCLUDED."title",
  "description" = EXCLUDED."description",
  "techStack" = EXCLUDED."techStack",
  "thumbnail" = EXCLUDED."thumbnail",
  "liveUrl" = EXCLUDED."liveUrl",
  "githubUrl" = EXCLUDED."githubUrl",
  "order" = EXCLUDED."order",
  "isVisible" = EXCLUDED."isVisible",
  "updatedAt" = CURRENT_TIMESTAMP;

-- Replace only repository-managed skills; user-created admin records are preserved.
DELETE FROM "Skill"
WHERE "id" LIKE 'portfolio-skill-%' OR "id" LIKE 'resume-skill-%';

INSERT INTO "Skill" (
  "id",
  "name",
  "level",
  "category",
  "order",
  "createdAt",
  "updatedAt"
)
VALUES
  ('resume-skill-1', 'Next.js', 95, 'Core Front-End', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('resume-skill-2', 'React', 95, 'Core Front-End', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('resume-skill-3', 'TypeScript', 90, 'Core Front-End', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('resume-skill-4', 'JavaScript (ES6+)', 92, 'Core Front-End', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('resume-skill-5', 'HTML5', 95, 'Core Front-End', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('resume-skill-6', 'CSS3', 95, 'Core Front-End', 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('resume-skill-7', 'Vue.js', 82, 'Core Front-End', 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('resume-skill-8', 'Tailwind CSS', 95, 'UI Engineering', 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('resume-skill-9', 'Responsive Web Design', 94, 'UI Engineering', 9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('resume-skill-10', 'Figma to Code', 88, 'UI Engineering', 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('resume-skill-11', 'TanStack Query', 88, 'State & API', 11, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('resume-skill-12', 'Redux Toolkit', 88, 'State & API', 12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('resume-skill-13', 'Zustand', 86, 'State & API', 13, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('resume-skill-14', 'Axios', 90, 'State & API', 14, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('resume-skill-15', 'REST API', 90, 'State & API', 15, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('resume-skill-16', 'SSR / SSG', 90, 'Architecture', 16, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('resume-skill-17', 'Component Architecture', 92, 'Architecture', 17, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('resume-skill-18', 'Performance Optimization', 88, 'Architecture', 18, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('resume-skill-19', 'SEO', 88, 'Architecture', 19, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('resume-skill-20', 'Git', 90, 'Engineering Tools', 20, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('resume-skill-21', 'GitHub', 90, 'Engineering Tools', 21, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('resume-skill-22', 'GitLab', 90, 'Engineering Tools', 22, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('resume-skill-23', 'Docker', 76, 'Engineering Tools', 23, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('resume-skill-24', 'ESLint', 88, 'Engineering Tools', 24, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
