import Image from "next/image";
import Link from "next/link";
import { FiGithub, FiExternalLink } from "react-icons/fi";

// ۱. داده‌های مربوط به پروژه‌ها
const projectsData = [
  {
    title: "Portfolio Website v1",
    description:
      "A personal portfolio website to showcase my skills and projects. Built with Next.js and Tailwind CSS, following modern design trends. It is fully responsive and interactive.",
    tech: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    githubLink: "https://github.com/firozmand", // Replace with your actual repo link
    liveLink: "#", // Replace with your actual live link
    image: "/project1.png", // Ensure this image is in your /public folder
  },
  {
    title: "E-commerce Platform",
    description:
      "A full-featured e-commerce application with product listings, a shopping cart, and a checkout process. Integrated with a headless CMS for product management.",
    tech: ["Vue.js", "Nuxt.js", "Stripe", "Sanity.io"],
    githubLink: "https://github.com/firozmand",
    liveLink: "#",
    image: "/project2.png", // Ensure this image is in your /public folder
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24">
      <h2 className="text-2xl font-bold text-lightest-slate mb-12">
        <span className="text-green font-mono mr-2">03.</span>
        Some Things I’ve Built
      </h2>
      <div className="space-y-20">
        {projectsData.map((project, index) => (
          <div key={index} className="grid grid-cols-12 gap-4 items-center">
            {/* Project Image -  The order changes based on even/odd index */}
            <div
              className={`relative col-span-12 lg:col-span-7 rounded-lg overflow-hidden ${
                index % 2 === 0 ? "lg:order-last" : ""
              }`}
            >
              <div className="absolute inset-0 bg-green/10 rounded-lg hover:bg-transparent transition-colors duration-300"></div>
              <Image
                src={project.image}
                alt={project.title}
                width={1200}
                height={750}
                className="w-full h-auto"
              />
            </div>

            {/* Project Content - The order changes based on even/odd index */}
            <div
              className={`col-span-12 lg:col-span-5 ${
                index % 2 === 0 ? "text-left" : "lg:text-right"
              }`}
            >
              <p className="text-sm text-green font-mono mb-2">
                Featured Project
              </p>
              <h3 className="text-2xl font-bold text-lightest-slate hover:text-green transition-colors">
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.title}
                </a>
              </h3>
              <div className="bg-light-navy p-6 rounded-md my-6 shadow-lg">
                <p className="text-slate">{project.description}</p>
              </div>
              <ul
                className={`flex flex-wrap gap-x-4 gap-y-2 font-mono text-slate ${
                  index % 2 !== 0 ? "lg:justify-end" : ""
                }`}
              >
                {project.tech.map((tech, i) => (
                  <li key={i}>{tech}</li>
                ))}
              </ul>
              <div
                className={`flex items-center mt-4 gap-x-4 ${
                  index % 2 !== 0 ? "lg:justify-end" : ""
                }`}
              >
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light-slate hover:text-green transition-colors"
                >
                  <FiGithub size={24} />
                </a>
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light-slate hover:text-green transition-colors"
                >
                  <FiExternalLink size={24} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
