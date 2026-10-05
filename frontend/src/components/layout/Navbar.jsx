import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "../../constants/navLinks.js";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        isScrolled
          ? "bg-neutral-950/95 backdrop-blur-sm border-neutral-800"
          : "bg-neutral-950 border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 items-center px-6 py-4">
        <a
          href="#home"
          aria-label="Kalid Abdulkerim, back to top"
          className="group flex items-center gap-3 justify-self-start"
        >
          <img src="/logo-1.png" alt="" className="w-9 h-9 rounded-md" />

          <span className="text-xl font-bold tracking-tight text-neutral-50">
            Kalma
            <span className="font-mono text-amber-600 transition-colors duration-200 group-hover:text-amber-500">
              .dev
            </span>
          </span>
        </a>
        <ul className="hidden md:flex items-center gap-8 justify-self-center">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm lg:text-base font-semibold  text-neutral-300 hover:text-amber-600 transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-block bg-amber-700 hover:bg-amber-600 text-neutral-50 text-sm font-semibold px-5 py-2 rounded-md transition-colors duration-200 justify-self-end"
        >
          Resume
        </a>

        <button
          className="md:hidden justify-self-end text-neutral-50 cursor-pointer"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-950 border-t border-neutral-800 px-6 py-4">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="block text-neutral-300 hover:text-neutral-50 transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-amber-700 hover:bg-amber-600 text-neutral-50 text-sm font-semibold px-5 py-2 rounded-md transition-colors duration-200"
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbar;
