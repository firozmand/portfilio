"use client";

import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { motion } from "framer-motion";

const SocialLinks = () => {
  const socialLinks = [
    { icon: <FiGithub size={20} />, url: "https://github.com/firozmand" },
    {
      icon: <FiLinkedin size={20} />,
      url: "https://www.linkedin.com/in/ali-firozmand-5967411a4/",
    }, // 👈 لینک لینکدین خودت رو اینجا بذار
    { icon: <FiInstagram size={20} />, url: "https://instagram.com/mr__a1i" },
  ];

  return (
    <div className="site-sociallinks">
      {/* نوار سمت چپ (آیکون‌های اجتماعی) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="hidden lg:flex flex-col items-center fixed bottom-0 left-10"
      >
        <ul className="flex flex-col items-center space-y-6">
          {socialLinks.map((link, i) => (
            <li key={i}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block rounded-full border border-[var(--border-subtle)] bg-[var(--surface)] p-3 text-[var(--text-secondary)] shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:text-green"
              >
                {link.icon}
                <span className="pointer-events-none absolute inset-0 rounded-full bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
            </li>
          ))}
        </ul>
        {/* خط عمودی */}
        <div className="w-px h-24 bg-[var(--border-subtle)] mt-6"></div>
      </motion.div>

      {/* نوار سمت راست (ایمیل) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="hidden lg:flex flex-col items-center fixed bottom-0 right-10"
      >
        <a
          href="mailto:firozmand.dev@gmail.com"
          className="font-mono text-sm tracking-[0.28em] text-[var(--text-secondary)] hover:text-green hover:-translate-y-1 transition-all duration-300"
          style={{ writingMode: "vertical-rl" }}
        >
          firozmand.dev@gmail.com
        </a>
        {/* خط عمودی */}
        <div className="w-px h-24 bg-[var(--border-subtle)] mt-6"></div>
      </motion.div>
    </div>
  );
};

export default SocialLinks;
