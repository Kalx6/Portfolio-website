import { motion } from "framer-motion";
import { EXPERIENCE } from "../constants/experience.js";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, delay, ease: "easeOut" },
});

function Experience() {
  return (
    <section id="experience" className="px-6 py-24 max-w-4xl mx-auto">
      <motion.h2
        {...fadeUp(0)}
        className="text-3xl md:text-4xl font-bold text-neutral-50 text-center mb-16"
      >
        Professional Journey
      </motion.h2>

      <ol className="relative border-l border-neutral-800 ml-3">
        {EXPERIENCE.map((entry, index) => (
          <motion.li
            key={entry.company}
            {...fadeUp(index * 0.1)}
            className="mb-12 ml-8 last:mb-0"
          >
            <span
              className={`absolute w-3 h-3 rounded-full -left-1.5 mt-1.5 ${
                index === 0 ? "bg-amber-700" : "bg-neutral-700"
              }`}
            />
            <time className="text-xs text-neutral-400 uppercase tracking-wide">
              {entry.period}
            </time>
            <h3 className="text-neutral-50 font-semibold text-lg mt-1">
              {entry.role}
            </h3>
            <p className="text-amber-700 text-sm mb-2">{entry.company}</p>
            <p className="text-neutral-300 text-sm leading-relaxed">
              {entry.description}
            </p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

export default Experience;
