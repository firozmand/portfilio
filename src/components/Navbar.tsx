"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { name: "About", url: "#about" },
  { name: "Experience", url: "#experience" },
  { name: "Projects", url: "#projects" },
  { name: "Contact", url: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open && panelRef.current) {
      panelRef.current.focus();
    }
  }, [open]);

  return (
    <header className="site-navbar">
      <a href="#main" className="sr-only focus:not-sr-only">
        Skip to content
      </a>

      <nav className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10 py-3">
        <div className="glass-panel flex items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              aria-label="Home"
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--color-primary)_18%,transparent)] border border-[var(--border-subtle)] shadow-[var(--shadow-soft)]">
                <span className="font-semibold text-green">AF</span>
              </div>
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  Ali Firozmand
                </span>
                <span className="text-xs text-[var(--text-secondary)]">
                  Front‑End Developer
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6 text-sm font-medium">
              {navLinks.map((l, i) => (
                <li key={l.url}>
                  <Link
                    href={l.url}
                    className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-green transition-colors"
                  >
                    <span className="text-green font-mono">0{i + 1}.</span>
                    <span>{l.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--color-primary)_14%,transparent)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] shadow-[var(--shadow-soft)] transition hover:shadow-lg"
            >
              Resume
            </a>
          </div>

          <div className="md:hidden">
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((s) => !s)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] text-green text-2xl shadow-[var(--shadow-soft)]"
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Mobile menu rendered into document.body via portal to avoid clipping by parent stacks */}
          {mounted &&
            createPortal(
              <AnimatePresence>
                {open && (
                  <>
                    <motion.div
                      key="nav-overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      onClick={() => setOpen(false)}
                      className="fixed inset-0 bg-black/40 z-30"
                    />

                    <motion.div
                      key="nav-modal"
                      id="mobile-menu"
                      ref={panelRef}
                      role="dialog"
                      aria-modal="true"
                      tabIndex={-1}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 28,
                      }}
                      className="fixed left-0 right-0 bottom-[-20px] z-40 glass-panel border-t border-[var(--border-strong)] px-6 pt-6 pb-8 w-full max-w-md rounded-t-2xl overflow-y-auto"
                      style={{ maxHeight: "calc(100vh - 64px)" }}
                    >
                      <ul className="flex flex-col gap-4 text-center text-lg font-semibold px-2">
                        {navLinks.map((l, i) => (
                          <li key={l.url}>
                            <a
                              href={l.url}
                              onClick={() => setOpen(false)}
                              className="block text-[var(--text-primary)] hover:text-green py-3"
                            >
                              <span className="text-green font-mono text-sm">
                                0{i + 1}.
                              </span>
                              <div className="mt-1 text-xl">{l.name}</div>
                            </a>
                          </li>
                        ))}
                      </ul>

                      <div className="px-2 mt-4">
                        <a
                          href="/resume.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-full items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--color-primary)_14%,transparent)] px-6 py-3 text-base font-semibold text-[var(--text-primary)] shadow-[var(--shadow-soft)]"
                        >
                          Resume
                        </a>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>,
              document.body,
            )}
        </div>
      </nav>
    </header>
  );
}
