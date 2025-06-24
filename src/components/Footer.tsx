import React from "react";
import Link from "next/link";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="text-center py-6 text-slate">
      {/* این آیکون‌ها فعلاً در فوتر هستن و بعداً به کنار صفحه منتقلشون می‌کنیم */}
      <div className="flex items-center justify-center space-x-6 md:hidden mb-4">
        <a
          href="https://github.com/firozmand"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green transition-colors"
        >
          <FiGithub size={20} />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green transition-colors"
        >
          <FiLinkedin size={20} />
        </a>
        <a
          href="https://instagram.com/ui_by_ali"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green transition-colors"
        >
          <FiInstagram size={20} />
        </a>
      </div>
      <p className="font-mono text-sm">
        <a
          href="https://github.com/firozmand/my-portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green transition-colors"
        >
          Designed by Brittany Chiang & Built by Ali Firozmand
        </a>
      </p>
    </footer>
  );
};

export default Footer;
