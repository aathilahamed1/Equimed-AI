"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function CallToAction() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [formState, setFormState] = useState({ name: "", email: "", org: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="cta" className="section-padding relative overflow-hidden">
      {/* Dramatic background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#030712]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-cyan-glow/6 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-danger/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero CTA banner */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-glow bg-cyan-glow/10 border border-cyan-glow/20 mb-6 uppercase tracking-widest">
            🌐 Join the Movement
          </span>
          <h2 className="font-display text-4xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Rebuild Healthcare
            <br />
            <span className="gradient-text-cyan">With Fair AI.</span>
          </h2>
          <p className="text-white/60 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Healthcare bias is not inevitable. It&apos;s a design choice.
            Join us in making the other choice.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <motion.a
              href="#demo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 rounded-2xl text-base font-bold bg-gradient-to-r from-cyan-glow to-primary text-black shadow-glow-cyan hover:opacity-95 transition-opacity"
            >
              🚀 Live Demo
            </motion.a>
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 rounded-2xl text-base font-bold glass border border-white/20 text-white hover:border-cyan-glow/40 transition-colors"
            >
              ⭐ GitHub Repo
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 rounded-2xl text-base font-bold border border-danger/40 text-danger hover:bg-danger/10 transition-colors"
            >
              📧 Contact Team
            </motion.a>
          </div>

          {/* Trust badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl glass border border-cyan-glow/15">
            <span className="text-2xl">🛡️</span>
            <div className="text-left">
              <div className="text-white font-semibold text-sm">Enterprise Ready</div>
              <div className="text-white/40 text-xs">HIPAA Compliant · SOC2 Audited</div>
            </div>
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.div
          id="contact"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-strong rounded-3xl p-8 md:p-10 border border-cyan-glow/15">
            <h3 className="font-display text-2xl font-bold text-white mb-2 text-center">
              Get In Touch
            </h3>
            <p className="text-white/50 text-sm text-center mb-8">
              Investors, healthcare orgs, or researchers — we want to hear from you.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="text-5xl mb-4">✅</div>
                <div className="font-display text-xl font-bold text-cyan-glow mb-2">Message Received!</div>
                <p className="text-white/50">We&apos;ll be in touch within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Dr. Jane Smith"
                      className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-cyan-glow/50 text-white placeholder-white/20 text-sm outline-none transition-colors bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="jane@hospital.org"
                      className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-cyan-glow/50 text-white placeholder-white/20 text-sm outline-none transition-colors bg-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Organization</label>
                  <input
                    type="text"
                    value={formState.org}
                    onChange={(e) => setFormState({ ...formState, org: e.target.value })}
                    placeholder="Hospital / VC Firm / Research Lab"
                    className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-cyan-glow/50 text-white placeholder-white/20 text-sm outline-none transition-colors bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell us about your interest in equitable AI healthcare..."
                    className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-cyan-glow/50 text-white placeholder-white/20 text-sm outline-none transition-colors bg-transparent resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-2xl font-bold text-black bg-gradient-to-r from-cyan-glow to-primary hover:opacity-95 transition-opacity shadow-glow-cyan text-sm"
                >
                  Send Message →
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
