"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface DemographicSlider {
  label: string;
  key: string;
  value: number;
}

const initialSliders: DemographicSlider[] = [
  { label: "Gender Diversity", key: "gender", value: 50 },
  { label: "Ethnic Diversity", key: "ethnicity", value: 40 },
  { label: "Age Range Coverage", key: "age", value: 60 },
  { label: "Geographic Diversity", key: "geo", value: 35 },
  { label: "Socioeconomic Range", key: "socio", value: 45 },
];

function calculateFairness(sliders: DemographicSlider[]): number {
  const avg = sliders.reduce((acc, s) => acc + s.value, 0) / sliders.length;
  // Apply penalty for very low values
  const minVal = Math.min(...sliders.map((s) => s.value));
  const penalty = minVal < 30 ? (30 - minVal) * 0.8 : 0;
  return Math.max(0, Math.min(100, avg - penalty));
}

function getScoreColor(score: number) {
  if (score >= 80) return "#00FFD1";
  if (score >= 60) return "#0A84FF";
  if (score >= 40) return "#FF8C00";
  return "#FF4D4D";
}

function getScoreLabel(score: number) {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Adequate";
  if (score >= 40) return "At Risk";
  return "Biased";
}

export default function FairnessSimulator() {
  const [sliders, setSliders] = useState<DemographicSlider[]>(initialSliders);
  const score = calculateFairness(sliders);
  const color = getScoreColor(score);
  const label = getScoreLabel(score);
  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (score / 100) * circumference;

  const updateSlider = (key: string, value: number) => {
    setSliders((prev) =>
      prev.map((s) => (s.key === key ? { ...s, value } : s))
    );
  };

  return (
    <div className="glass-strong rounded-3xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="font-display text-xl font-bold text-white mb-2">
          Interactive Fairness Score Simulator
        </h3>
        <p className="text-white/50 text-sm">
          Adjust dataset diversity parameters to see how fairness score changes
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Score Ring */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <div className="relative w-36 h-36">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
              <motion.circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke={color}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                animate={{ strokeDashoffset: dashOffset }}
                transition={{ type: "spring", stiffness: 60, damping: 15 }}
                style={{ filter: `drop-shadow(0 0 8px ${color})` }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                className="text-3xl font-bold font-display"
                style={{ color }}
                animate={{ color }}
                transition={{ duration: 0.3 }}
              >
                {Math.round(score)}
              </motion.span>
              <span className="text-white/40 text-xs">/ 100</span>
            </div>
          </div>
          <motion.span
            className="mt-3 text-sm font-semibold px-4 py-1 rounded-full"
            style={{ color, backgroundColor: `${color}20`, border: `1px solid ${color}40` }}
            animate={{ color, backgroundColor: `${color}20`, borderColor: `${color}40` }}
          >
            {label}
          </motion.span>
        </div>

        {/* Sliders */}
        <div className="flex-1 space-y-4 w-full">
          {sliders.map((slider) => (
            <div key={slider.key}>
              <div className="flex justify-between mb-1">
                <span className="text-white/70 text-sm">{slider.label}</span>
                <span className="text-white/50 text-sm">{slider.value}%</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={slider.value}
                  onChange={(e) => updateSlider(slider.key, Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, ${color} 0%, ${color} ${slider.value}%, rgba(255,255,255,0.1) ${slider.value}%, rgba(255,255,255,0.1) 100%)`,
                    accentColor: color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warning */}
      {score < 60 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center"
        >
          ⚠️ This dataset configuration would produce a biased AI model — EquiMed AI would flag and block deployment.
        </motion.div>
      )}
      {score >= 80 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-3 rounded-xl bg-cyan-glow/10 border border-cyan-glow/30 text-cyan-glow text-sm text-center"
        >
          ✅ Excellent dataset diversity — EquiMed AI certifies this dataset as fair for deployment.
        </motion.div>
      )}
    </div>
  );
}
