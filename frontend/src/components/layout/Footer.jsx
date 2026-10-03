import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
// If Github/Linkedin throw the "not exported" error again, swap to:
// import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons';

const FOOTER_LINKS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/your-username",
    icon: FaLinkedinIn,
  },
  { label: "GitHub", href: "https://github.com/your-username", icon: SiGithub },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-800 px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p className="text-neutral-50 font-semibold">Khalid Abdulkerim</p>

        <p className="text-neutral-400 text-xs order-3 md:order-2">
          © {currentYear} Khalid Abdulkerim. Engineered for performance.
        </p>

        <div className="flex items-center gap-6 order-2 md:order-3">
          {FOOTER_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center gap-1.5 text-neutral-400 hover:text-amber-600 transition-colors duration-200"
            >
              <Icon size={14} />
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
