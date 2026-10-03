import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { MapPin, Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { sendContactMessage } from "../services/contactService.js";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, delay, ease: "easeOut" },
});

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Tracks the outcome of the last submission separately from react-hook-form's
  // own isSubmitting state, since we need to show a persistent success/error
  // message after the request finishes, not just during it.
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const onSubmit = async (data) => {
    setSubmitStatus(null);
    try {
      await sendContactMessage(data);
      setSubmitStatus("success");
      reset();
    } catch (error) {
      setSubmitStatus("error");
    }
  };

  return (
    <section id="contact" className="px-6 py-24 max-w-4xl mx-auto">
      <motion.h2
        {...fadeUp(0)}
        className="text-3xl md:text-4xl font-bold text-neutral-50 mb-4"
      >
        Get in Touch
      </motion.h2>
      <motion.p {...fadeUp(0.1)} className="text-neutral-300 mb-12 max-w-xl">
        Interested in collaborating or have a project in mind? Let's discuss how
        we can build something exceptional together.
      </motion.p>

      <div className="grid md:grid-cols-2 gap-12">
        <motion.div {...fadeUp(0.2)} className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-700 shrink-0">
              <MapPin size={18} />
            </div>
            <div>
              <p className="text-neutral-400 text-xs uppercase tracking-wide mb-1">
                Location
              </p>
              <p className="text-neutral-50 text-sm">Adama, Ethiopia</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-700 shrink-0">
              <Mail size={18} />
            </div>
            <div>
              <p className="text-neutral-400 text-xs uppercase tracking-wide mb-1">
                Email
              </p>
              <p className="text-neutral-50 text-sm">kalidabdu921@gmail.com</p>
            </div>
          </div>
        </motion.div>

        <motion.form
          {...fadeUp(0.3)}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-neutral-300 text-sm mb-2"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-neutral-50 text-sm focus:border-amber-700 focus:outline-none transition-colors duration-200"
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1.5">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-neutral-300 text-sm mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email",
                },
              })}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-neutral-50 text-sm focus:border-amber-700 focus:outline-none transition-colors duration-200"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1.5">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-neutral-300 text-sm mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters",
                },
              })}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-neutral-50 text-sm focus:border-amber-700 focus:outline-none transition-colors duration-200 resize-none"
              aria-invalid={errors.message ? "true" : "false"}
            />
            {errors.message && (
              <p className="text-red-400 text-xs mt-1.5">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-700 hover:bg-amber-600 disabled:opacity-60 disabled:cursor-not-allowed text-neutral-50 font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>

          {submitStatus === "success" && (
            <p className="flex items-center gap-2 text-green-400 text-sm">
              <CheckCircle2 size={16} /> Message sent successfully. I'll get
              back to you soon.
            </p>
          )}
          {submitStatus === "error" && (
            <p className="flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle size={16} /> Something went wrong. Please try again.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

export default Contact;
