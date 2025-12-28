"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "About", url: "#about" },
    { name: "Experience", url: "#experience" },
    { name: "Projects", url: "#projects" },
    { name: "Contact", url: "#contact" },
  ];

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <header className="site-navbar fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(4,8,19,0.75)] via-[rgba(4,8,19,0.45)] to-transparent" />
      </div>
      <nav className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10 py-4">
        <div className="glass-panel flex items-center justify-between gap-4 px-4 py-3">
          {/* Logo / brand */}
          <Link href="/" className="relative z-50 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--color-primary)_18%,transparent)] border border-[var(--border-subtle)] shadow-[var(--shadow-soft)]">
              <span className="text-lg font-semibold text-primary text-green">
                AF
              </span>
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm font-semibold text-primary">
                Ali Firozmand
              </span>
              <span className="text-xs text-secondary">
                Front-End Developer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <ol className="flex items-center gap-6 text-sm font-medium">
              {navLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ y: -2 }}
                  className="text-secondary hover:text-green transition-colors"
                >
                  <Link href={link.url} className="flex items-center gap-2">
                    <span className="text-green font-mono">0{index + 1}.</span>
                    <span>{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ol>
            <div className="flex items-center gap-3">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--color-primary)_14%,transparent)] px-4 py-2 text-sm font-semibold text-primary text-[var(--text-primary)] shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Resume
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden z-50 flex items-center gap-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] text-green text-2xl shadow-[var(--shadow-soft)]"
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Mobile Menu Panel */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{
                  type: "tween",
                  ease: "easeInOut",
                  duration: 0.32,
                }}
                className="fixed top-0 right-0 h-screen w-full max-w-sm glass-panel border-l border-[var(--border-strong)] bg-[var(--bg-muted)]/90 px-8 pt-24 pb-10 z-40 flex flex-col gap-8"
              >
                <ol className="flex flex-col gap-6 text-center text-lg font-semibold">
                  {navLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.url}
                        onClick={() => setIsMenuOpen(false)}
                        className="group inline-flex w-full flex-col items-center gap-1 text-primary"
                      >
                        <span className="text-green font-mono text-sm">
                          0{index + 1}.
                        </span>
                        <span className="text-[var(--text-primary)] group-hover:text-green transition-colors">
                          {link.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--color-primary)_14%,transparent)] px-6 py-3 text-base font-semibold text-[var(--text-primary)] shadow-[var(--shadow-soft)]"
                >
                  Resume
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
