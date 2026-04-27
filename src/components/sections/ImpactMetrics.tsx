"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadialBarChart, RadialBar, Legend,
  AreaChart, Area,
} from "recharts";
import { IMPACT_METRICS, CHART_DATA } from "@/lib/data";

const radialData = [
  { name: "Target", value: 100, fill: "rgba(255,255,255,0.05)" },
  { name: "Minorities", value: 89, fill: "#0A84FF" },
  { name: "Cross-group", value: 94, fill: "#00FFD1" },
];

const areaData = [
  { month: "Jan", bias: 45, equity: 55 },
  { month: "Feb", bias: 40, equity: 62 },
  { month: "Mar", bias: 33, equity: 69 },
  { month: "Apr", bias: 26, equity: 76 },
  { month: "May", bias: 20, equity: 82 },
  { month: "Jun", bias: 14, equity: 88 },
  { month: "Jul", bias: 9, equity: 93 },
];

export default function ImpactMetrics() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="impact" className="section-padding relative overflow-hidden">
      {/* BG glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary/6 blur-3xl" />
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
            📈 Impact
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-6">
            Measurable Progress Toward{" "}
            <span className="gradient-text-cyan">Healthcare Equity</span>
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">
            EquiMed AI&apos;s impact is quantifiable. These are projected outcomes
            based on validated fairness correction methodologies.
          </p>
        </motion.div>

        {/* Progress bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {IMPACT_METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="glass rounded-2xl p-6 border border-white/8"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-white/70 text-sm">{metric.label}</span>
                <span className="font-bold text-lg" style={{ color: metric.color }}>
                  {metric.value}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${metric.value}%` } : {}}
                  transition={{ duration: 1.2, delay: 0.4 + i * 0.1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${metric.color}80, ${metric.color})`,
                    boxShadow: `0 0 10px ${metric.color}60`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar chart - Before/After accuracy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="glass rounded-2xl p-6 border border-white/8"
          >
            <h3 className="font-display font-bold text-white mb-1 text-lg">
              Diagnostic Accuracy: Before vs. After
            </h3>
            <p className="text-white/40 text-sm mb-5">By demographic group (%)</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={CHART_DATA} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[50, 100]}
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(13,27,42,0.95)",
                    border: "1px solid rgba(0,255,209,0.2)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="before" name="Before EquiMed" fill="#FF4D4D" fillOpacity={0.75} radius={[4, 4, 0, 0]} />
                <Bar dataKey="after" name="After EquiMed" fill="#00FFD1" fillOpacity={0.85} radius={[4, 4, 0, 0]} />
                <Legend
                  wrapperStyle={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Area chart - Bias reduction over time */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="glass rounded-2xl p-6 border border-white/8"
          >
            <h3 className="font-display font-bold text-white mb-1 text-lg">
              Bias Reduction Over Time
            </h3>
            <p className="text-white/40 text-sm mb-5">Platform deployment trajectory (%)</p>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="biasGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF4D4D" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FF4D4D" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FFD1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00FFD1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(13,27,42,0.95)",
                    border: "1px solid rgba(0,255,209,0.2)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
                <Area type="monotone" dataKey="bias" name="Bias Score" stroke="#FF4D4D" fill="url(#biasGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="equity" name="Equity Score" stroke="#00FFD1" fill="url(#equityGrad)" strokeWidth={2} />
                <Legend wrapperStyle={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Global stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "190+", label: "Countries Covered", icon: "🌍" },
            { value: "2.4B", label: "Underserved Patients Reached", icon: "👥" },
            { value: "67%", label: "Fewer False Negatives", icon: "✅" },
            { value: "94%", label: "Clinician Trust Score", icon: "🏥" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-5 text-center border border-cyan-glow/10">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="font-display text-3xl font-black text-cyan-glow mb-1">{stat.value}</div>
              <div className="text-white/45 text-xs">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
