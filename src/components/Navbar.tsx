"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
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

const subscribeToHydration = () => () => undefined;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open && panelRef.current) panelRef.current.focus();
  }, [open]);

  return (
    <header className="site-navbar">
      <a href="#main" className="sr-only focus:not-sr-only">
        Skip to content
      </a>

      <nav className="mx-auto max-w-screen-2xl px-4 py-3 sm:px-6 lg:px-10">
        <div className="glass-panel flex items-center justify-between gap-4 px-4 py-3">
          <Link href="/" aria-label="Home" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[color-mix(in_srgb,var(--color-primary)_18%,transparent)] shadow-[var(--shadow-soft)]">
              <span className="font-semibold text-green">AF</span>
            </div>
            <div className="hidden flex-col leading-tight sm:flex">
              <span className="text-sm font-semibold text-[var(--text-primary)]">
                Ali Firozmand
              </span>
              <span className="text-xs text-[var(--text-secondary)]">
                Front-End Developer
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-6 text-sm font-medium">
              {navLinks.map((link, index) => (
                <li key={link.url}>
                  <Link
                    href={link.url}
                    className="flex items-center gap-2 text-[var(--text-secondary)] transition-colors hover:text-green"
                  >
                    <span className="font-mono text-green">0{index + 1}.</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href="/resume.pdf"
              download="Ali-Firozmand-Resume-405.6.pdf"
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
              onClick={() => setOpen((current) => !current)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] text-2xl text-green shadow-[var(--shadow-soft)]"
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>

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
                      className="fixed inset-0 z-30 bg-black/40"
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
                      className="glass-panel fixed bottom-[-20px] left-0 right-0 z-40 w-full max-w-md overflow-y-auto rounded-t-2xl border-t border-[var(--border-strong)] px-6 pb-8 pt-6"
                      style={{ maxHeight: "calc(100vh - 64px)" }}
                    >
                      <ul className="flex flex-col gap-4 px-2 text-center text-lg font-semibold">
                        {navLinks.map((link, index) => (
                          <li key={link.url}>
                            <a
                              href={link.url}
                              onClick={() => setOpen(false)}
                              className="block py-3 text-[var(--text-primary)] hover:text-green"
                            >
                              <span className="font-mono text-sm text-green">
                                0{index + 1}.
                              </span>
                              <div className="mt-1 text-xl">{link.name}</div>
                            </a>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 px-2">
                        <a
                          href="/resume.pdf"
                          download="Ali-Firozmand-Resume-405.6.pdf"
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
