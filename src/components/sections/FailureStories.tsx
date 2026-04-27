"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FAILURE_STORIES } from "@/lib/data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function StoryModal({ story, onClose }: { story: (typeof FAILURE_STORIES)[0]; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="relative glass-strong rounded-3xl p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-white/10"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full glass flex items-center justify-center text-white/50 hover:text-white transition-colors"
          >
            ✕
          </button>

          {/* Icon + location */}
          <div className="flex items-center gap-4 mb-6">
            <div className="text-5xl">{story.icon}</div>
            <div>
              <h3 className="font-display text-2xl font-bold text-white">{story.title}</h3>
              <span className="text-white/50 text-sm">
                {story.locationFlag} {story.location}
              </span>
            </div>
          </div>

          {/* Sections */}
          {[
            { label: "The Problem", text: story.problem, color: "text-danger" },
            { label: "Root Cause", text: story.rootCause, color: "text-yellow-400" },
            { label: "Human Impact", text: story.humanImpact, color: "text-cyan-glow" },
          ].map(({ label, text, color }) => (
            <div key={label} className="mb-5">
              <h4 className={`font-semibold text-sm uppercase tracking-widest mb-2 ${color}`}>{label}</h4>
              <p className="text-white/70 leading-relaxed">{text}</p>
            </div>
          ))}

          {/* Stat */}
          <div className="mt-6 p-4 rounded-2xl bg-danger/10 border border-danger/20 text-center">
            <span className="text-danger font-bold text-lg">{story.stat}</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function FailureStories() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<(typeof FAILURE_STORIES)[0] | null>(null);

  return (
    <section id="failures" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-danger bg-danger/10 border border-danger/20 mb-4 uppercase tracking-widest">
            📁 Real-World Failures
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-6">
            When AI Gets It Wrong,{" "}
            <span className="gradient-text-danger">People Pay With Their Lives</span>
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">
            These are not hypothetical scenarios. They are documented, peer-reviewed cases
            of AI bias causing real harm to real patients — right now.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FAILURE_STORIES.map((story) => (
            <motion.div
              key={story.id}
              variants={cardVariant}
              onClick={() => setSelected(story)}
              className={`relative glass rounded-2xl p-6 cursor-pointer border ${story.borderColor} hover:border-opacity-80 transition-all duration-300 group overflow-hidden`}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${story.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative z-10">
                {/* Icon + location */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{story.icon}</div>
                  <span className="text-xs text-white/40 flex items-center gap-1">
                    {story.locationFlag} {story.location}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-cyan-glow transition-colors">
                  {story.title}
                </h3>

                {/* Problem snippet */}
                <p className="text-white/55 text-sm leading-relaxed mb-4 line-clamp-3">
                  {story.problem}
                </p>

                {/* Stat badge */}
                <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-danger/15 border border-danger/25 text-danger">
                  {story.stat}
                </div>

                {/* Read more */}
                <div className="mt-4 flex items-center gap-2 text-cyan-glow text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Read Full Story <span>→</span>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-3xl bg-gradient-to-tl from-danger/10 to-transparent" />
            </motion.div>
          ))}
        </motion.div>

        {/* Click hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center text-white/30 text-sm mt-8"
        >
          Click any card to read the full story
        </motion.p>
      </div>

      {/* Modal */}
      {selected && <StoryModal story={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
