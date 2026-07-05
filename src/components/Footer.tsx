import React from "react";
import Link from "next/link";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="mt-16 flex flex-col items-center gap-4 px-6 pb-10 text-center text-sm text-[var(--text-secondary)]">
      <div className="flex items-center justify-center gap-4 md:hidden">
        <a
          href="https://github.com/firozmand"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface)] text-[var(--text-primary)] transition hover:text-green"
        >
          <FiGithub size={18} />
        </a>
        <a
          href="https://www.linkedin.com/in/ali-firozmand-5967411a4/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface)] text-[var(--text-primary)] transition hover:text-green"
        >
          <FiLinkedin size={18} />
        </a>
        <a
          href="https://instagram.com/ui_by_ali"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface)] text-[var(--text-primary)] transition hover:text-green"
        >
          <FiInstagram size={18} />
        </a>
      </div>
      <p className="font-mono text-xs leading-relaxed">
        <Link href="/admin" className="hover:text-green transition-colors">
          Crafted with a liquid glass theme • Built by Ali Firozmand
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
