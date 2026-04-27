"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SOLUTION_FEATURES } from "@/lib/data";
import GlassCard from "@/components/ui/GlassCard";
import dynamic from "next/dynamic";

const FairnessSimulator = dynamic(() => import("@/components/ui/FairnessSimulator"), { ssr: false });

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const cardItem = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Solution() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="solution" className="section-padding relative overflow-hidden">
      {/* Cyan glow bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-cyan-glow/5 blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] rounded-full bg-primary/8 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-6"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-glow bg-cyan-glow/10 border border-cyan-glow/20 mb-4 uppercase tracking-widest">
            ✨ Our Solution
          </span>
          {/* Brand reveal */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-glow to-primary flex items-center justify-center text-black font-black text-2xl shadow-glow-cyan"
            >
              E
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-display text-5xl md:text-6xl font-extrabold"
            >
              <span className="gradient-text-cyan">EquiMed AI</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/60 text-xl max-w-3xl mx-auto leading-relaxed"
          >
            The world&apos;s first end-to-end fairness infrastructure for clinical AI —
            built to make healthcare algorithms equitable by design, not by accident.
          </motion.p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14"
        >
          {SOLUTION_FEATURES.map((feature) => (
            <motion.div key={feature.id} variants={cardItem}>
              <GlassCard
                glow={feature.color as "cyan" | "blue"}
                className="h-full border border-white/8 hover:border-cyan-glow/30"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{
                    background: feature.color === "cyan" ? "rgba(0,255,209,0.12)" : "rgba(10,132,255,0.12)",
                    border: `1px solid ${feature.color === "cyan" ? "rgba(0,255,209,0.25)" : "rgba(10,132,255,0.25)"}`,
                  }}
                >
                  {feature.icon}
                </div>

                {/* Title */}
                <h3
                  className="font-display font-bold text-lg mb-3"
                  style={{ color: feature.color === "cyan" ? "#00FFD1" : "#0A84FF" }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-white/55 text-sm leading-relaxed">{feature.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-white/40 text-sm uppercase tracking-widest mb-6 font-medium">
            Live Platform Preview
          </p>
          <div className="relative rounded-3xl overflow-hidden border border-cyan-glow/15 shadow-glow-cyan max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/80 via-transparent to-transparent z-10 pointer-events-none" />
            {/* Dashboard image will be placed here */}
            <div className="w-full h-[420px] bg-gradient-to-br from-[#0D1B2A] to-[#030712] flex items-center justify-center">
              <div className="text-center space-y-4 p-8">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Fairness Score", value: "94%", color: "#00FFD1" },
                    { label: "Bias Alerts", value: "0 Active", color: "#0A84FF" },
                    { label: "Demographics", value: "7 Groups", color: "#00FFD1" },
                  ].map((m) => (
                    <div key={m.label} className="glass rounded-xl p-4 border border-white/8">
                      <div className="font-bold text-2xl mb-1" style={{ color: m.color }}>{m.value}</div>
                      <div className="text-white/40 text-xs">{m.label}</div>
                    </div>
                  ))}
                </div>
                <div className="glass rounded-xl p-6 border border-cyan-glow/15">
                  <div className="flex justify-between mb-3">
                    <span className="text-white/60 text-sm">Diagnostic Accuracy by Demographic</span>
                    <span className="text-cyan-glow text-xs">Real-time</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { group: "White Male", before: 94, after: 94 },
                      { group: "Black Female", before: 64, after: 90 },
                      { group: "Hispanic", before: 69, after: 91 },
                      { group: "Indigenous", before: 58, after: 89 },
                    ].map((d) => (
                      <div key={d.group} className="flex items-center gap-3 text-xs">
                        <span className="text-white/50 w-24 text-right">{d.group}</span>
                        <div className="flex-1 flex gap-1">
                          <div className="h-4 rounded bg-danger/60 flex items-center justify-end pr-1" style={{ width: `${d.before}%`, maxWidth: "50%" }}>
                            <span className="text-white/70 text-xs">{d.before}%</span>
                          </div>
                          <div className="h-4 rounded bg-cyan-glow/60 flex items-center pr-1" style={{ width: `${d.after * 0.5}%` }}>
                            <span className="text-black text-xs font-bold">{d.after}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-3 justify-center text-xs text-white/40">
                    <span className="flex items-center gap-1"><span className="w-3 h-2 rounded bg-danger/60 inline-block"/>Before EquiMed</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-2 rounded bg-cyan-glow/60 inline-block"/>After EquiMed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fairness Simulator */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="mt-20"
        >
          <p className="text-white/40 text-sm uppercase tracking-widest mb-8 text-center font-medium">
            Try It Yourself — Interactive Simulator
          </p>
          <FairnessSimulator />
        </motion.div>
      </div>
    </section>
  );
}
