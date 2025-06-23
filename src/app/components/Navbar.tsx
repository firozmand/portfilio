import Link from "next/link";

const Navbar = () => {
  const navLinks = [
    { name: "About", url: "#about" },
    { name: "Experience", url: "#experience" },
    { name: "Projects", url: "#projects" },
    { name: "Contact", url: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/80 backdrop-blur-sm shadow-md">
      <nav className="flex items-center justify-between max-w-screen-xl mx-auto px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-green w-10 h-10 flex items-center justify-center border-2 border-green rounded-full font-bold text-xl hover:bg-green/10 transition-colors"
        >
          A
        </Link>{" "}
        {/* 👈 ۲. تگ a به Link تغییر کرد */}
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <ol className="flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <li
                key={index}
                className="text-light-slate hover:text-green transition-colors"
              >
                <Link href={link.url}>
                  {" "}
                  {/* 👈 ۳. تگ a به Link تغییر کرد */}
                  <span className="text-green mr-1">0{index + 1}.</span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ol>
          {/* 👇 نکته مهم: این لینک چون به یک فایل خارجی (PDF) اشاره داره، باید همون تگ <a> باقی بمونه */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-green text-green rounded hover:bg-green/10 transition-colors"
          >
            Resume
          </a>
        </div>
        {/* Mobile Menu Button (we will make it functional later) */}
        <div className="md:hidden text-green text-3xl">
          {/* Hamburger Icon will go here */}
          &#9776;
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
