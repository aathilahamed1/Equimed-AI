"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ROOT_CAUSES } from "@/lib/data";

const PIPELINE = [
  { label: "Biased Data", icon: "📊", color: "#FF4D4D", desc: "Skewed, unrepresentative training datasets" },
  { label: "Biased Model", icon: "🤖", color: "#FF8C00", desc: "AI learns and amplifies data biases" },
  { label: "Biased Decisions", icon: "⚖️", color: "#FFB800", desc: "Systematically unfair outputs at scale" },
  { label: "Harmful Outcomes", icon: "💔", color: "#FF4D4D", desc: "Real patients harmed, trust destroyed" },
];

export default function RootCause() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCause, setActiveCause] = useState<string | null>(null);

  return (
    <section id="root-cause" className="section-padding relative overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-danger/3 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 mb-4 uppercase tracking-widest">
            🔬 Root Cause Analysis
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-6">
            How Bias Enters the{" "}
            <span className="gradient-text-danger">AI Pipeline</span>
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">
            Understanding where bias originates is the first step to eliminating it.
            The chain from flawed data to harmful outcomes is systematic — and fixable.
          </p>
        </motion.div>

        {/* Pipeline visualization */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-0 mb-16 overflow-x-auto">
          {PIPELINE.map((step, i) => (
            <div key={step.label} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.18 }}
                className="flex flex-col items-center text-center px-6 py-4"
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mb-3 border"
                  style={{
                    background: `${step.color}15`,
                    borderColor: `${step.color}40`,
                    boxShadow: `0 0 20px ${step.color}20`,
                  }}
                >
                  {step.icon}
                </div>
                <span className="font-display font-bold text-white text-sm mb-1" style={{ color: step.color }}>
                  {step.label}
                </span>
                <span className="text-white/40 text-xs max-w-[100px]">{step.desc}</span>
              </motion.div>

              {/* Arrow */}
              {i < PIPELINE.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.18 + 0.3 }}
                  className="hidden md:flex items-center text-danger/50 text-2xl px-2"
                >
                  →
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Cause cards */}
        <div className="mb-6 text-center">
          <p className="text-white/40 text-sm">Click a bias type to learn more</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {ROOT_CAUSES.map((cause, i) => (
            <motion.div
              key={cause.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              onClick={() => setActiveCause(activeCause === cause.id ? null : cause.id)}
              className="glass rounded-2xl p-5 cursor-pointer border border-white/8 hover:border-danger/40 transition-all duration-300 group"
            >
              <div className="text-3xl mb-3">{cause.icon}</div>
              <h4 className="font-semibold text-white text-sm mb-2 group-hover:text-danger transition-colors">
                {cause.title}
              </h4>
              {/* Severity bar */}
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${cause.severity}%` } : {}}
                  transition={{ duration: 1, delay: 0.8 + i * 0.1, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-danger/60 to-danger"
                />
              </div>
              <span className="text-danger text-xs font-bold">{cause.severity}% severity</span>

              {/* Expanded description */}
              {activeCause === cause.id && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-white/55 text-xs leading-relaxed mt-3 border-t border-white/10 pt-3"
                >
                  {cause.description}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Google Maps Embed: The Global Data Void */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mt-32"
        >
          <div className="text-center mb-10">
             <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-glow bg-cyan-glow/10 border border-cyan-glow/20 mb-4 uppercase tracking-widest">
              🗺️ Google Maps Intelligence
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white">
              Visualizing the <span className="gradient-text-cyan">Global Data Void</span>
            </h3>
            <p className="text-white/55 text-sm max-w-2xl mx-auto mt-4">
              Medical AI is predominantly trained on data from North America and Western Europe. We use Google Maps to identify massive demographic data voids, allowing us to actively correct for regional underrepresentation in our Fairness Correction Layer.
            </p>
          </div>

          <div className="glass-strong rounded-3xl overflow-hidden border border-white/10 relative p-2 shadow-glow-cyan group">
            {/* Gradient Overlay for style */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent pointer-events-none z-10 opacity-60" />
            
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d45145892.35515234!2d17.0690022756855!3d23.018652396180373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sus!4v1714151234567!5m2!1sen!2sus"
              width="100%"
              height="500"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(110%) opacity(0.8)" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl pointer-events-none"
            />
            
            {/* Map Markers Overlay */}
            <div className="absolute inset-2 z-15 pointer-events-none overflow-hidden rounded-2xl">
              {/* High Risk (Africa & SE Asia) */}
              <div className="absolute top-[50%] left-[46%] flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-danger/30 animate-ping" style={{ animationDuration: '3s' }} />
                <span className="relative w-3 h-3 rounded-full bg-danger shadow-[0_0_15px_#FF4D4D]" />
              </div>
              <div className="absolute top-[68%] left-[53%] flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-danger/30 animate-ping" style={{ animationDuration: '2.5s' }} />
                <span className="relative w-3 h-3 rounded-full bg-danger shadow-[0_0_15px_#FF4D4D]" />
              </div>
              <div className="absolute top-[55%] left-[82%] flex items-center justify-center hidden md:flex">
                <span className="absolute w-8 h-8 rounded-full bg-danger/30 animate-ping" style={{ animationDuration: '3.5s' }} />
                <span className="relative w-3 h-3 rounded-full bg-danger shadow-[0_0_15px_#FF4D4D]" />
              </div>

              {/* Moderate Risk (South America & India) */}
              <div className="absolute top-[65%] left-[18%] flex items-center justify-center hidden sm:flex">
                <span className="absolute w-6 h-6 rounded-full bg-yellow-500/30 animate-ping" style={{ animationDuration: '2.8s' }} />
                <span className="relative w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_10px_#EAB308]" />
              </div>
              <div className="absolute top-[44%] left-[69%] flex items-center justify-center">
                <span className="absolute w-6 h-6 rounded-full bg-yellow-500/30 animate-ping" style={{ animationDuration: '3.2s' }} />
                <span className="relative w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_10px_#EAB308]" />
              </div>

              {/* Verified Baselines (Europe & North America) */}
              <div className="absolute top-[26%] left-[48%] flex items-center justify-center">
                <span className="relative w-2 h-2 rounded-full bg-cyan-glow shadow-[0_0_10px_#00FFD1]" />
              </div>
              <div className="absolute top-[28%] left-[12%] flex items-center justify-center hidden sm:flex">
                <span className="relative w-2 h-2 rounded-full bg-cyan-glow shadow-[0_0_10px_#00FFD1]" />
              </div>
            </div>
            
            {/* Mock UI Overlay over the map to make it look like a dashboard */}
            <div className="absolute top-8 left-8 z-20 glass-strong border border-white/10 p-5 rounded-2xl flex flex-col gap-4 shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-danger animate-pulse shadow-[0_0_8px_#FF4D4D]" />
                <span className="text-white text-xs font-bold uppercase tracking-widest">High Risk Data Voids</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_8px_#EAB308]" />
                <span className="text-white text-xs font-bold uppercase tracking-widest">Moderate Voids</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-glow shadow-[0_0_8px_#00FFD1]" />
                <span className="text-white text-xs font-bold uppercase tracking-widest">Verified Baselines</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
