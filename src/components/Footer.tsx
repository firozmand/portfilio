import Link from "next/link";
import { FiArrowUp } from "react-icons/fi";
import { personalDetails } from "@/lib/portfolio";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <span>© {new Date().getFullYear()} Ali Firozmand</span>
        <Link href="/admin">Designed & built with intent.</Link>
      </div>
      <div>
        <a href={personalDetails.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={personalDetails.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href="#home" aria-label="Back to top" className="back-to-top">
          <FiArrowUp aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
