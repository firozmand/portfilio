"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight, FiDownload, FiMenu, FiX } from "react-icons/fi";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <header className="site-navbar">
      <nav className="nav-shell" aria-label="Primary navigation">
        <Link href="#home" className="nav-brand" aria-label="Ali Firozmand home">
          <span className="brand-mark">AF</span>
          <span className="brand-copy">
            <strong>Ali Firozmand</strong>
            <small>Front-End Developer</small>
          </span>
        </Link>

        <div className="desktop-nav">
          <ul>
            {links.map((link, index) => (
              <li key={link.href}>
                <a href={link.href}>
                  <span>0{index + 1}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            className="nav-resume"
            href="/resume.pdf"
            download="Ali-Firozmand-Resume.pdf"
          >
            Résumé <FiDownload aria-hidden="true" />
          </a>
        </div>

        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            className="mobile-nav"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="mobile-nav-inner">
              <p>Navigation</p>
              <ul>
                {links.map((link, index) => (
                  <li key={link.href}>
                    <a href={link.href} onClick={() => setOpen(false)}>
                      <span>0{index + 1}</span>
                      {link.label}
                      <FiArrowUpRight aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
              <a
                className="button button-primary"
                href="/resume.pdf"
                download="Ali-Firozmand-Resume.pdf"
                onClick={() => setOpen(false)}
              >
                Download résumé <FiDownload aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
