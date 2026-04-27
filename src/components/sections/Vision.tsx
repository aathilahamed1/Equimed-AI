"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const VALUES = [
  { icon: "🌍", title: "Radically Inclusive", desc: "Every model we touch must work for every human on Earth — not just those with the most data." },
  { icon: "🔍", title: "Transparently Explainable", desc: "No black boxes. Every AI decision comes with a plain-language rationale clinicians can trust and override." },
  { icon: "⚖️", title: "Systemically Fair", desc: "We don't just fix disparities after the fact. We build fairness as infrastructure from day one." },
  { icon: "🤝", title: "Community-Driven", desc: "Solutions co-designed with the communities most harmed by algorithmic bias, not just for them." },
];

export default function Vision() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="team" className="section-padding relative overflow-hidden">
      {/* Gradient bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-glow/3 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-primary/5 blur-3xl" />
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
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-glow bg-cyan-glow/10 border border-cyan-glow/20 mb-4 uppercase tracking-widest">
            🚀 Our Vision
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Building the Future of{" "}
            <br />
            <span className="gradient-text-cyan">Equitable Intelligence</span>
          </h2>
          <p className="text-white/60 text-xl max-w-3xl mx-auto leading-relaxed">
            We believe AI in healthcare should amplify human compassion,
            not institutional inequities. EquiMed AI is not just a platform —
            it&apos;s a movement for a world where your diagnosis doesn&apos;t depend on
            your skin color, zip code, or gender.
          </p>
        </motion.div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {VALUES.map((val, i) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
              className="glass-strong rounded-2xl p-6 border border-cyan-glow/10 hover:border-cyan-glow/30 transition-colors group text-center"
            >
              <div className="text-5xl mb-4">{val.icon}</div>
              <h3 className="font-display font-bold text-white mb-3 group-hover:text-cyan-glow transition-colors">
                {val.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission statement banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="relative rounded-3xl overflow-hidden border border-cyan-glow/15"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-cyan-glow/8 to-primary/15" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/30 to-transparent" />

          <div className="relative z-10 p-10 md:p-16 text-center">
            <p className="font-display text-2xl md:text-4xl font-bold text-white leading-relaxed mb-6">
              &quot;The question is not whether AI will transform healthcare.
              <br />
              <span className="gradient-text-cyan">The question is whether that transformation will be just.&quot;</span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 text-white/40 text-sm">
              <div className="text-center">
                <div className="font-bold text-white text-lg">WHO</div>
                <div>Global Health Partner</div>
              </div>
              <div className="w-px h-8 bg-white/20 hidden sm:block" />
              <div className="text-center">
                <div className="font-bold text-white text-lg">IEEE</div>
                <div>AI Ethics Standard</div>
              </div>
              <div className="w-px h-8 bg-white/20 hidden sm:block" />
              <div className="text-center">
                <div className="font-bold text-white text-lg">NIH</div>
                <div>Research Aligned</div>
              </div>
              <div className="w-px h-8 bg-white/20 hidden sm:block" />
              <div className="text-center">
                <div className="font-bold text-white text-lg">FDA</div>
                <div>Audit Framework</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
