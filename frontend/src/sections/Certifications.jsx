import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { CERTIFICATIONS } from "../constants/certifications.js";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, delay, ease: "easeOut" },
});

function Certifications() {
  return (
    <section id="certifications" className="px-6 py-24 max-w-6xl mx-auto">
      <motion.h2
        {...fadeUp(0)}
        className="text-3xl md:text-4xl font-bold text-neutral-50 text-center mb-12"
      >
        Certifications
      </motion.h2>

      <div className="flex justify-center">
        {CERTIFICATIONS.map(({ name, issuer, url }, index) => {
          const CardWrapper = url ? motion.a : motion.div;
          return (
            <CardWrapper
              key={name}
              href={url}
              target={url ? "_blank" : undefined}
              rel={url ? "noopener noreferrer" : undefined}
              {...fadeUp(0.1 + index * 0.1)}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-10 text-center hover:-translate-y-1 transition-transform duration-200 max-w-md w-full"
            >
              <div className="w-16 h-16 rounded-full bg-amber-700/10 border border-amber-700/30 flex items-center justify-center text-amber-700 mx-auto mb-6">
                <BadgeCheck size={32} />
              </div>
              <h3 className="text-neutral-50 font-semibold text-xl mb-2">
                {name}
              </h3>
              <p className="text-neutral-400 text-sm">{issuer}</p>
              {url && (
                <p className="text-amber-700 text-xs mt-4 uppercase tracking-wide">
                  View Credential
                </p>
              )}
            </CardWrapper>
          );
        })}
      </div>
    </section>
  );
}

export default Certifications;
