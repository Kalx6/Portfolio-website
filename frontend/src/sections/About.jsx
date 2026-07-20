import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, delay, ease: "easeOut" },
});

function About() {
  return (
    <section id="about" className="px-6 py-24 max-w-4xl mx-auto">
      <motion.h2
        {...fadeUp(0)}
        className="text-3xl md:text-4xl font-bold text-slate-50 mb-8"
      >
        About Me
      </motion.h2>

      <motion.div
        {...fadeUp(0.1)}
        className="space-y-6 text-slate-300 text-base md:text-lg leading-relaxed"
      >
        <p>
          I'm Khalid Abdulkerim, a Full Stack Web Developer who enjoys turning
          ideas into practical, user-focused web applications. My journey began
          with frontend development, where I built responsive and interactive
          interfaces, and gradually expanded into backend development using
          modern technologies to create complete, scalable solutions.
        </p>
        <p>
          Through the Evangadi Full Stack Development Bootcamp, I gained
          hands-on experience building real-world projects with React, Node.js,
          Express, MySQL, and PostgreSQL. I enjoy solving challenging problems,
          writing clean and maintainable code, and continuously improving my
          skills by learning new technologies and best practices.
        </p>
        <p>
          I'm currently focused on building high-quality web applications,
          strengthening my software engineering skills, and contributing to
          meaningful projects that make a positive impact.
        </p>
      </motion.div>
    </section>
  );
}

export default About;
