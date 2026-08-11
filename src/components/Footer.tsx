import Link from "next/link";
import { FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";

const links = [
  {
    label: "GitHub",
    href: "https://github.com/firozmand",
    icon: <FiGithub size={18} />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ali-firozmand-5967411a4/",
    icon: <FiLinkedin size={18} />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/mr__a1i",
    icon: <FiInstagram size={18} />,
  },
];

const Footer = () => (
  <footer className="mt-16 flex flex-col items-center gap-4 px-6 pb-10 text-center text-sm text-[var(--text-secondary)]">
    <div className="footer-sociallinks items-center justify-center gap-4">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface)] text-[var(--text-primary)] transition hover:text-green"
        >
          {link.icon}
        </a>
      ))}
    </div>
    <p className="font-mono text-xs leading-relaxed">
      <Link href="/admin" className="transition-colors hover:text-green">
        Crafted with a liquid glass theme - Built by Ali Firozmand
      </Link>
    </p>
  </footer>
);

export default Footer;
