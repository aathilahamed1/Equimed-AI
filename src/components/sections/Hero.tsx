"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const NeuralBackground = dynamic(() => import("@/components/ui/NeuralBackground"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <NeuralBackground />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-cyan-glow/8 blur-3xl animate-float pointer-events-none" style={{ animationDelay: "3s" }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-danger/6 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-glow/20 text-cyan-glow text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-glow animate-pulse" />
          Powered by Google Gemini AI · Enterprise Fairness Infrastructure
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display text-5xl md:text-7xl font-extrabold leading-[1.05] mb-6 tracking-tight"
        >
          <span className="text-white">AI Should Save Lives</span>
          <br />
          <span className="gradient-text-danger text-glow-blue">— Not Reinforce Bias.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Building fair, explainable, and inclusive healthcare intelligence for every{" "}
          <span className="text-cyan-glow font-medium">gender</span>,{" "}
          <span className="text-cyan-glow font-medium">ethnicity</span>,{" "}
          <span className="text-cyan-glow font-medium">age</span>, and{" "}
          <span className="text-cyan-glow font-medium">community</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#crisis"
            className="px-8 py-4 rounded-2xl text-base font-semibold border border-danger/50 text-danger hover:bg-danger/10 hover:border-danger transition-all duration-300"
          >
            See The Problem →
          </a>
          <a
            href="#solution"
            className="px-8 py-4 rounded-2xl text-base font-semibold bg-gradient-to-r from-cyan-glow to-primary text-black hover:opacity-90 transition-opacity shadow-glow-cyan"
          >
            Explore Our Solution
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 text-white/30 text-sm"
        >
          {["WHO Aligned", "GDPR Compliant", "Open Source", "Peer Reviewed", "FDA Audit Ready"].map((badge) => (
            <span key={badge} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-cyan-glow/50" />
              {badge}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030712] to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-0.5 h-8 bg-gradient-to-b from-cyan-glow/50 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}
