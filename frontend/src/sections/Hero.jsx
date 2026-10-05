import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "../constants/socialLinks.js";
import profileImage from "../assets/images/profile.jpg";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" },
});

function Hero() {
  return (
    <section
      id="home"
      className="flex flex-col items-center text-center px-6 py-24 max-w-4xl mx-auto"
    >
      <motion.div {...fadeUp(0)} className="mb-6 md:mb-8">
        <div className="avatar-float">
          <div className="avatar-ring">
            <img
              src={profileImage}
              alt="Portrait of Kalid Abdulkerim"
              width={256}
              height={256}
              decoding="async"
              className="block w-24 h-24 sm:w-40 sm:h-40 md:w-64 md:h-64 rounded-full object-cover"
            />
          </div>
        </div>
      </motion.div>

      <motion.p
        {...fadeUp(0.1)}
        className="text-amber-700 text-xs font-medium tracking-widest uppercase mb-4"
      >
        Hi, I'm Kalid Abdulkerim
      </motion.p>

      <motion.h1
        {...fadeUp(0.2)}
        className="text-4xl md:text-5xl font-bold text-neutral-50 mb-6"
      >
        Full Stack Developer
      </motion.h1>

      <motion.p
        {...fadeUp(0.3)}
        className="text-neutral-300 text-base md:text-lg mb-8 max-w-xl"
      >
        Building scalable, production-ready web applications with clean
        architecture and meticulous attention to detail. Engineering software
        that performs at scale.
      </motion.p>

      <motion.div
        {...fadeUp(0.4)}
        className="flex flex-wrap justify-center gap-4 mb-8"
      >
        <a
          href="#projects"
          className="bg-amber-700 hover:bg-amber-600 text-neutral-50 font-semibold px-6 py-3 rounded-md transition-colors duration-200"
        >
          View Projects
        </a>
        <a
          href="#contact"
          className="border border-neutral-800 hover:border-neutral-500 hover:text-amber-600 text-neutral-50 font-semibold px-6 py-3 rounded-md transition-colors duration-200"
        >
          Contact Me
        </a>
      </motion.div>

      <motion.div {...fadeUp(0.5)} className="flex items-center gap-6">
        {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex items-center gap-2 text-neutral-300 hover:text-amber-600 text-sm transition-colors duration-200"
          >
            <Icon size={16} />
            {label}
          </a>
        ))}
      </motion.div>
    </section>
  );
}

export default Hero;
