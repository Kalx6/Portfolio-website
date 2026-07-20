// Each section below is built in its own dedicated phase.
// This file exists now so routing has a real target, and will fill in
// section by section as we progress.
import About from "../sections/About.jsx";
import Certifications from "../sections/Certifications.jsx";
import Contact from "../sections/Contacts.jsx";
import Experience from "../sections/Experience.jsx";
import FeaturedProjects from "../sections/FeaturedProjects.jsx";
import Hero from "../sections/Hero.jsx";
import Skills from "../sections/Skills.jsx";
import SEO from "../components/common/SEO.jsx";
function HomePage() {
  return (
    <div>
      <SEO
        title="Khalid Abdulkerim — Full Stack Developer"
        description="Full Stack Developer building scalable, production-ready web applications with clean architecture."
      />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <FeaturedProjects />
      <Certifications />
      <Contact />
    </div>
  );
}

export default HomePage;
