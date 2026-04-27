"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { CRISIS_STATS } from "@/lib/data";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function CrisisStats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="crisis" className="section-padding relative">
      {/* Red glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-danger/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-danger bg-danger/10 border border-danger/20 mb-4 uppercase tracking-widest">
            🔴 The Crisis
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-6">
            Healthcare AI Is Failing{" "}
            <span className="gradient-text-danger">Billions</span> of People
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto leading-relaxed">
            Every day, life-or-death medical decisions are made by AI systems 
            trained on data that systematically excludes most of humanity.
            The consequences are invisible — until someone dies.
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {CRISIS_STATS.map((stat) => (
            <motion.div
              key={stat.id}
              variants={item}
              className="relative group"
            >
              <div className="glass rounded-2xl p-7 text-center border border-danger/20 hover:border-danger/50 transition-all duration-300 h-full">
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-danger/0 group-hover:bg-danger/5 transition-colors duration-300" />

                {/* Icon */}
                <div className="text-4xl mb-4">{stat.icon}</div>

                {/* Number */}
                <div className="font-display text-5xl font-black text-danger mb-3 text-glow-blue">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2200} />
                </div>

                {/* Label */}
                <p className="text-white/55 text-sm leading-relaxed">{stat.label}</p>

                {/* Bottom red bar */}
                <div className="mt-5 h-0.5 w-full rounded-full bg-gradient-to-r from-transparent via-danger/50 to-transparent" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Emotional quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <blockquote className="glass-strong rounded-3xl p-8 max-w-3xl mx-auto border border-danger/20">
            <p className="font-display text-xl md:text-2xl font-semibold text-white/90 italic leading-relaxed">
              &quot;When AI is trained on biased data, it does not merely make mistakes —
              it systematizes them. It scales injustice at machine speed.&quot;
            </p>
            <footer className="mt-4 text-white/40 text-sm">
              — Dr. Timnit Gebru, AI Ethics Researcher
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
