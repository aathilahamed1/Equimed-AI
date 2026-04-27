"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HOW_IT_WORKS_STEPS } from "@/lib/data";

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="how-it-works" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/50 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-primary bg-primary/10 border border-primary/20 mb-4 uppercase tracking-widest">
            ⚙️ How It Works
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-6">
            From Biased Data to{" "}
            <span className="gradient-text-cyan">Ethical Intelligence</span>
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">
            EquiMed AI intervenes at every stage of the clinical AI pipeline,
            ensuring fairness is built in — not bolted on.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-0.5">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-primary via-cyan-glow to-primary origin-left"
              style={{ boxShadow: "0 0 8px rgba(0,255,209,0.4)" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {HOW_IT_WORKS_STEPS.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                {/* Step number + icon */}
                <div className="relative mb-5">
                  <div
                    className="w-[104px] h-[104px] rounded-3xl flex flex-col items-center justify-center border relative z-10"
                    style={{
                      background: `${step.color}12`,
                      borderColor: `${step.color}40`,
                      boxShadow: `0 0 20px ${step.color}20`,
                    }}
                  >
                    <span className="text-3xl mb-1">{step.icon}</span>
                    <span className="text-xs font-black" style={{ color: step.color }}>
                      {step.step}
                    </span>
                  </div>
                  {/* Pulse ring */}
                  <div
                    className="absolute inset-0 rounded-3xl animate-ping-slow opacity-20"
                    style={{ border: `1px solid ${step.color}` }}
                  />
                </div>

                <h3 className="font-display font-bold text-white mb-2 text-sm">
                  {step.title}
                </h3>
                <p className="text-white/45 text-xs leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Compliance badge row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-4"
        >
          {[
            "HIPAA Compliant",
            "FDA Audit Ready",
            "EU AI Act Aligned",
            "HL7 FHIR Compatible",
            "ISO 27001 Certified",
          ].map((badge) => (
            <span
              key={badge}
              className="px-4 py-2 rounded-full glass border border-cyan-glow/15 text-xs text-white/50 font-medium"
            >
              ✓ {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
