"use client";

import { FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";
import { motion } from "framer-motion";

const socialLinks = [
  {
    label: "GitHub",
    icon: <FiGithub size={20} />,
    url: "https://github.com/firozmand",
  },
  {
    label: "LinkedIn",
    icon: <FiLinkedin size={20} />,
    url: "https://www.linkedin.com/in/ali-firozmand-5967411a4/",
  },
  {
    label: "Instagram",
    icon: <FiInstagram size={20} />,
    url: "https://instagram.com/mr__a1i",
  },
];

const SocialLinks = () => (
  <div className="site-sociallinks">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      className="fixed bottom-0 left-10 hidden flex-col items-center lg:flex"
    >
      <ul className="flex flex-col items-center space-y-6">
        {socialLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="group relative block rounded-full border border-[var(--border-subtle)] bg-[var(--surface)] p-3 text-[var(--text-secondary)] shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:text-green"
            >
              {link.icon}
              <span className="pointer-events-none absolute inset-0 rounded-full bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-6 h-24 w-px bg-[var(--border-subtle)]" />
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      className="fixed bottom-0 right-10 hidden flex-col items-center lg:flex"
    >
      <a
        href="mailto:firozmand.dev@gmail.com"
        className="font-mono text-sm tracking-[0.28em] text-[var(--text-secondary)] transition-all duration-300 hover:-translate-y-1 hover:text-green"
        style={{ writingMode: "vertical-rl" }}
      >
        firozmand.dev@gmail.com
      </a>
      <div className="mt-6 h-24 w-px bg-[var(--border-subtle)]" />
    </motion.div>
  </div>
);

export default SocialLinks;
