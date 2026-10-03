import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";

import { PROJECTS } from "../constants/projects.js";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, delay, ease: "easeOut" },
});

function ProjectImage({ image, title }) {
  // Placeholder until real screenshots are added — keeps layout intact either way.
  if (!image) {
    return (
      <div className="w-full h-full min-h-48 bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center text-neutral-500 text-sm">
        Image coming soon
      </div>
    );
  }
  return <img src={image} alt={title} className="w-full h-full object-cover" />;
}

function FeaturedProjects() {
  const featuredProject = PROJECTS.find((project) => project.featured);
  const otherProjects = PROJECTS.filter((project) => !project.featured);

  return (
    <section id="projects" className="px-6 py-24 max-w-6xl mx-auto">
      <motion.h2
        {...fadeUp(0)}
        className="text-3xl md:text-4xl font-bold text-neutral-50 mb-12"
      >
        Featured Projects
      </motion.h2>

      {featuredProject && (
        <motion.div
          {...fadeUp(0.1)}
          className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden grid md:grid-cols-2 mb-8"
        >
          <div className="h-64 md:h-auto">
            <ProjectImage
              image={featuredProject.image}
              title={featuredProject.title}
            />
          </div>

          <div className="p-8 flex flex-col justify-center">
            <div className="flex flex-wrap gap-2 mb-4">
              {featuredProject.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-medium text-amber-700 bg-amber-700/10 border border-amber-700/30 px-2.5 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-neutral-50 mb-3">
              {featuredProject.title}
            </h3>
            <p className="text-neutral-300 text-sm leading-relaxed mb-6">
              {featuredProject.description}
            </p>

            <div className="flex items-center gap-6">
              <a
                href={featuredProject.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-neutral-50 hover:text-amber-700 transition-colors duration-200"
              >
                <ExternalLink size={14} /> Live Demo
              </a>
              <a
                href={featuredProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-neutral-300 hover:text-amber-700 transition-colors duration-200"
              >
                <SiGithub size={14} /> Source Code
              </a>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        {otherProjects.map((project, index) => (
          <motion.div
            key={project.id}
            {...fadeUp(0.2 + index * 0.1)}
            className="group bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:-translate-y-1 transition-transform duration-200"
          >
            <div className="h-40">
              <ProjectImage image={project.image} title={project.title} />
            </div>
            <div className="p-6">
              <h3 className="text-neutral-50  font-semibold text-lg mb-2">
                {project.title}
              </h3>
              <p className="text-neutral-300 text-sm mb-4">
                {project.description}
              </p>
              <span className="text-xs text-neutral-400 uppercase tracking-wide block mb-4">
                {project.tech.join(" · ")}
              </span>
              <div className="flex items-center gap-4">
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-amber-700 transition-colors duration-200"
                >
                  <ExternalLink size={13} /> Live Demo
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-amber-700 transition-colors duration-200"
                >
                  <SiGithub size={13} /> Code
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProjects;
