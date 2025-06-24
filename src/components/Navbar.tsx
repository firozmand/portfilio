"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/80 backdrop-blur-sm shadow-md">
      <nav className="flex items-center justify-between max-w-screen-xl mx-auto px-6 py-4">
        {/* Logo */}
        <Link href="/" className="z-50">
          <Image
            src="/logo.png"
            alt="Ali Firozmand Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <ol className="flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <li
                key={index}
                className="text-light-slate hover:text-green transition-colors"
              >
                <Link href={link.url}>
                  <span className="text-green mr-1">0{index + 1}.</span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ol>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-green text-green rounded hover:bg-green/10 transition-colors"
          >
            Resume
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden z-50">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-green text-3xl"
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
              transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
              className="fixed top-0 right-0 h-screen w-3/4 bg-light-navy p-8 pt-24 z-40 flex flex-col items-center justify-center"
            >
              <ol className="flex flex-col items-center space-y-8 text-center">
                {navLinks.map((link, index) => (
                  <li
                    key={index}
                    className="text-lg text-lightest-slate hover:text-green transition-colors"
                  >
                    <Link href={link.url} onClick={() => setIsMenuOpen(false)}>
                      <span className="text-green font-mono mr-2">
                        0{index + 1}.
                      </span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ol>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-12 px-8 py-3 border border-green text-green rounded hover:bg-green/10 transition-colors text-lg"
              >
                Resume
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
