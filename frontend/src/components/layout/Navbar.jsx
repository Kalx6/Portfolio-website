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
          ? "bg-slate-900/95 backdrop-blur-sm border-slate-700"
          : "bg-slate-900 border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 items-center px-6 py-4">
        <a
          href="#home"
          className="flex items-center gap-2 text-slate-50 font-semibold justify-self-start"
        >
          <span className="w-8 h-8 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-700 text-sm">
            KA
          </span>
          <span>Khalid Abdulkerim</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 justify-self-center">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-slate-300 hover:text-slate-50 transition-colors duration-200"
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
          className="hidden md:inline-block bg-amber-700 hover:bg-amber-600 text-slate-50 text-sm font-semibold px-5 py-2 rounded-md transition-colors duration-200 justify-self-end"
        >
          Resume
        </a>

        <button
          className="md:hidden justify-self-end text-slate-50 cursor-pointer"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-700 px-6 py-4">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="block text-slate-300 hover:text-slate-50 transition-colors duration-200"
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
                className="inline-block bg-amber-700 hover:bg-amber-600 text-slate-50 text-sm font-semibold px-5 py-2 rounded-md transition-colors duration-200"
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
