import { motion } from "framer-motion";
import { SKILLS } from "../constants/skills.js";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, delay, ease: "easeOut" },
});

function Skills() {
  return (
    <section id="skills" className="px-6 py-24 max-w-6xl mx-auto">
      <motion.div {...fadeUp(0)} className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-50 mb-3">
          Technical Proficiency
        </h2>
        <p className="text-neutral-300 text-base md:text-lg">
          Specialized toolkit for building modern, full-stack web applications.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SKILLS.map(({ category, icon: Icon, items }, index) => (
          <motion.div
            key={category}
            {...fadeUp(0.1 + index * 0.1)}
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:-translate-y-1 transition-transform duration-200"
          >
            <div className="w-10 h-10 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center text-amber-700 mb-4">
              <Icon size={20} />
            </div>
            <h3 className="text-neutral-50 font-semibold text-lg mb-3">
              {category}
            </h3>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item} className="text-neutral-400 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
