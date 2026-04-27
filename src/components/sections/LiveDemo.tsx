"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

export default function LiveDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [demoState, setDemoState] = useState<"input" | "analyzing" | "results">("input");
  
  const [formData, setFormData] = useState({
    symptoms: "",
    gender: "",
    ethnicity: "",
    age: "",
  });

  const [results, setResults] = useState<any>(null);

  const fillExample = (type: string) => {
    if (type === "derma") {
      setFormData({
        symptoms: "Patient presented with a changing mole on the forearm. Irregular borders.",
        gender: "Female",
        ethnicity: "Fitzpatrick VI (Dark Skin)",
        age: "42",
      });
    } else if (type === "cardio") {
      setFormData({
        symptoms: "Patient complains of jaw pain, severe fatigue, and nausea. No chest pain.",
        gender: "Female",
        ethnicity: "Caucasian",
        age: "55",
      });
    } else if (type === "mental") {
      setFormData({
        symptoms: "Chronic fatigue, stomach pains, headaches. Frequent clinical visits with no physical cause found.",
        gender: "Male",
        ethnicity: "East Asian",
        age: "28",
      });
    }
  };

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.symptoms) return;

    setDemoState("analyzing");

    // Simulate AI Processing time
    setTimeout(() => {
      const text = (formData.symptoms + " " + formData.gender + " " + formData.ethnicity).toLowerCase();
      let scenario;

      if (text.includes("skin") || text.includes("mole") || text.includes("lesion") || text.includes("melanoma") || text.includes("dark") || text.includes("fitzpatrick")) {
        scenario = {
          detection: {
            question: "Is this decision likely biased?",
            flag: `Confidence is 40% lower for ${formData.ethnicity || 'dark skin'}. Flag = Potential skin-tone bias.`,
          },
          diagnosis: [
            "Underrepresented training data (< 5% dark skin images)",
            "Faulty proxy (lighting conditions mismatch)",
          ],
          correction: {
            a: "Recalibrate prediction using fairness-aware algorithms",
            b: "Compare with diverse demographic benchmarks",
            c: "Apply skin-tone aware feature extraction",
            confOrig: "62%",
            confNew: "89%",
          },
          output: {
            original: "Benign. Routine monitoring.",
            corrected: "Suspicious melanoma detected after skin-tone bias correction. Immediate biopsy recommended.",
          },
        };
      } else if (text.includes("heart") || text.includes("chest") || text.includes("jaw") || text.includes("fatigue") || text.includes("cardiac") || text.includes("nausea")) {
        scenario = {
          detection: {
            question: "Is this decision likely biased?",
            flag: `Symptoms flagged as atypical vs standard male baseline. Flag = Potential gender bias for ${formData.gender || 'female'}.`,
          },
          diagnosis: [
            "Male-centric symptom baseline in training data",
            "Missing demographic representation for female cardiac events",
          ],
          correction: {
            a: "Recalibrate using female-specific cardiac datasets",
            b: "Adjust output using fairness-aware algorithms",
            c: "Apply demographic-aware diagnosis (Female symptoms ≠ male baseline)",
            confOrig: "45%",
            confNew: "91%",
          },
          output: {
            original: "Low cardiac risk. Likely anxiety.",
            corrected: "Elevated cardiac risk detected after gender-bias correction. Immediate ECG + troponin recommended.",
          },
        };
      } else if (text.includes("sad") || text.includes("depress") || text.includes("pain") || text.includes("stomach") || text.includes("asian")) {
        scenario = {
          detection: {
            question: "Is this decision likely biased?",
            flag: "Somatic distress misclassified by Western NLP model. Flag = Language/cultural bias.",
          },
          diagnosis: [
            "Western symptom assumptions in NLP model",
            "Cultural-linguistic mismatch for depression expression",
          ],
          correction: {
            a: "Reinterpret somatic distress using culturally-adapted NLP",
            b: "Cross-check against inclusive global datasets",
            c: "Apply cultural-aware symptom re-weighting",
            confOrig: "58%",
            confNew: "94%",
          },
          output: {
            original: "Low depression risk. Recommend rest.",
            corrected: "High depression risk detected after cultural-linguistic correction. Specialized psychiatric care needed.",
          },
        };
      } else {
        // Generic fallback
        scenario = {
          detection: {
            question: "Is this decision likely biased?",
            flag: `General model optimization may disadvantage ${formData.ethnicity || 'minority groups'} or ${formData.gender || 'specific demographics'}.`,
          },
          diagnosis: [
            "Generic datasets optimize for majority populations",
            "Potential for intersectional bias in edge cases",
          ],
          correction: {
            a: "Re-weighting features for demographic parity",
            b: "Confidence intervals adjusted for representation gaps",
            c: "Cross-checked against diverse global baseline",
            confOrig: "72%",
            confNew: "88%",
          },
          output: {
            original: "Standard care pathway recommended based on majority data.",
            corrected: "Adjusted care pathway: Monitor closely for demographic-specific atypical presentations.",
          },
        };
      }

      setResults(scenario);
      setDemoState("results");
    }, 2000);
  };

  return (
    <section id="demo" className="section-padding relative overflow-hidden bg-[#030712]">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-cyan-glow/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-glow bg-cyan-glow/10 border border-cyan-glow/20 mb-4 uppercase tracking-widest">
            🔴 Try The Platform
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-6">
            Input Data. Detect Bias.
            <br />
            <span className="gradient-text-cyan">Repair Clinical Intelligence.</span>
          </h2>
          <p className="text-white/60 text-lg max-w-3xl mx-auto font-medium">
            Test the EquiMed AI engine yourself. Enter clinical data and watch how we audit, correct, and deliver equitable decisions in real time.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            
            {/* STATE: INPUT FORM */}
            {demoState === "input" && (
              <motion.div
                key="input"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-strong rounded-3xl p-8 border border-white/10"
              >
                <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
                  <h3 className="text-xl font-display font-bold text-white">Enter Clinical Data</h3>
                  <div className="flex gap-2">
                    <span className="text-white/40 text-sm mt-1.5 mr-2">Try an example:</span>
                    <button type="button" onClick={() => fillExample("derma")} className="px-3 py-1.5 text-xs rounded bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10">Dermatology</button>
                    <button type="button" onClick={() => fillExample("cardio")} className="px-3 py-1.5 text-xs rounded bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10">Cardiology</button>
                    <button type="button" onClick={() => fillExample("mental")} className="px-3 py-1.5 text-xs rounded bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10">Mental Health</button>
                  </div>
                </div>

                <form onSubmit={handleAnalyze} className="space-y-6">
                  <div>
                    <label className="block text-white/70 text-sm font-semibold mb-2">Patient Symptoms & Clinical Notes</label>
                    <textarea
                      required
                      value={formData.symptoms}
                      onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                      placeholder="e.g., Jaw pain, severe fatigue, and nausea. No chest pain."
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-cyan-glow/50 transition-colors h-32 resize-none"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-white/70 text-sm font-semibold mb-2">Gender</label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-glow/50 transition-colors appearance-none"
                      >
                        <option value="">Select Gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Non-binary">Non-binary</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm font-semibold mb-2">Ethnicity / Skin Tone</label>
                      <input
                        type="text"
                        value={formData.ethnicity}
                        onChange={(e) => setFormData({ ...formData, ethnicity: e.target.value })}
                        placeholder="e.g., Black, East Asian, Fitzpatrick VI"
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-cyan-glow/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm font-semibold mb-2">Age</label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        placeholder="e.g., 45"
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-cyan-glow/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      disabled={!formData.symptoms}
                      className="px-8 py-4 rounded-xl font-bold text-black bg-gradient-to-r from-cyan-glow to-primary hover:opacity-90 transition-opacity shadow-glow-cyan disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Run BiasGuard Analysis →
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STATE: ANALYZING (LOADING) */}
            {demoState === "analyzing" && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-strong rounded-3xl p-16 border border-cyan-glow/30 text-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-glow/10 to-transparent animate-[shimmer_2s_infinite]" />
                <div className="relative z-10">
                  <div className="w-20 h-20 border-4 border-white/10 border-t-cyan-glow rounded-full animate-spin mx-auto mb-8" />
                  <h3 className="text-2xl font-display font-bold text-white mb-3">Auditing Clinical Intelligence</h3>
                  <p className="text-cyan-glow animate-pulse">Running fairness correction layers...</p>
                  
                  <div className="max-w-md mx-auto mt-8 space-y-3 text-left">
                    <div className="flex items-center gap-3 text-white/60 text-sm">
                      <span className="text-cyan-glow">✓</span> Data ingested
                    </div>
                    <div className="flex items-center gap-3 text-white/60 text-sm">
                      <span className="text-cyan-glow">✓</span> Demographic metadata mapped
                    </div>
                    <div className="flex items-center gap-3 text-white/60 text-sm opacity-50 animate-pulse">
                      <span className="text-white/40">⏳</span> Scanning against 500k+ diverse benchmarks...
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STATE: RESULTS */}
            {demoState === "results" && results && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Reset button */}
                <button 
                  onClick={() => setDemoState("input")}
                  className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm mb-4"
                >
                  ← Test another patient
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Input -> Detect -> Diagnose */}
                  <div className="lg:col-span-5 space-y-6">
                    
                    {/* Step 1: Input */}
                    <div className="glass-strong rounded-2xl p-6 border border-white/10 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-white/20" />
                      <h3 className="text-white/50 text-xs font-bold tracking-widest uppercase mb-4">Step 1: Provided Healthcare Data</h3>
                      <ul className="space-y-2">
                        <li className="text-white text-sm flex items-start gap-2">
                          <span className="text-cyan-glow mt-0.5">▸</span> <strong>Symptoms:</strong> {formData.symptoms}
                        </li>
                        <li className="text-white text-sm flex items-start gap-2">
                          <span className="text-cyan-glow mt-0.5">▸</span> <strong>Demographics:</strong> {[formData.gender, formData.age ? formData.age + "yo" : "", formData.ethnicity].filter(Boolean).join(", ")}
                        </li>
                      </ul>
                    </div>

                    {/* Step 2: Bias Detection Engine */}
                    <div className="glass-strong rounded-2xl p-6 border border-danger/30 relative overflow-hidden">
                      <div className="absolute inset-0 bg-danger/5" />
                      <div className="absolute top-0 left-0 w-1 h-full bg-danger" />
                      <div className="relative z-10">
                        <h3 className="text-danger text-xs font-bold tracking-widest uppercase mb-4">Step 2: Bias Detection Engine</h3>
                        <div className="bg-black/40 rounded-lg p-3 text-xs text-white/70 mb-3 font-mono">
                          System check: &quot;{results.detection.question}&quot;
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-xl animate-pulse">⚠️</span>
                          <p className="text-white text-sm font-medium leading-relaxed">
                            {results.detection.flag}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Step 3: Bias Diagnosis */}
                    <div className="glass-strong rounded-2xl p-6 border border-yellow-500/30 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500" />
                      <h3 className="text-yellow-500 text-xs font-bold tracking-widest uppercase mb-4">Step 3: Bias Diagnosis (Why?)</h3>
                      <ul className="space-y-3">
                        {results.diagnosis.map((item: string, i: number) => (
                          <li key={i} className="text-white text-sm flex items-start gap-2">
                            <span className="text-yellow-500 mt-0.5">•</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Correction -> Output */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    {/* Step 4: Fairness Correction Layer (The Core) */}
                    <div className="glass-strong rounded-2xl p-8 border border-cyan-glow/40 relative overflow-hidden shadow-glow-cyan h-full flex flex-col">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-glow/10 to-primary/5" />
                      <div className="absolute top-0 left-0 w-1 h-full bg-cyan-glow shadow-[0_0_15px_#00FFD1]" />
                      
                      <div className="relative z-10 flex-1">
                        <div className="flex items-center gap-3 mb-6">
                          <h3 className="text-cyan-glow text-xs font-bold tracking-widest uppercase">Step 4: Fairness Correction Layer</h3>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-glow/20 text-cyan-glow border border-cyan-glow/30">CORE ENGINE</span>
                        </div>

                        <div className="space-y-5 mb-8">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-cyan-glow/20 flex items-center justify-center text-cyan-glow text-xs font-bold shrink-0">A</div>
                            <p className="text-white text-sm">{results.correction.a}</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-cyan-glow/20 flex items-center justify-center text-cyan-glow text-xs font-bold shrink-0">B</div>
                            <p className="text-white text-sm">{results.correction.b}</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-cyan-glow/20 flex items-center justify-center text-cyan-glow text-xs font-bold shrink-0">C</div>
                            <p className="text-white text-sm">{results.correction.c}</p>
                          </div>
                        </div>

                        {/* Confidence Transparency */}
                        <div className="bg-black/50 rounded-xl p-5 border border-white/10 mt-auto">
                          <h4 className="text-white/40 text-xs uppercase mb-3 font-semibold">Confidence Transparency</h4>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white/70 text-sm">Original AI Confidence:</span>
                            <span className="text-danger font-mono">{results.correction.confOrig}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white font-medium text-sm">Bias-Corrected Confidence:</span>
                            <span className="text-cyan-glow font-mono font-bold text-lg drop-shadow-[0_0_5px_rgba(0,255,209,0.5)]">{results.correction.confNew}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 5: Final Output Comparison */}
                <div className="glass-strong rounded-2xl border border-white/10 overflow-hidden relative mt-6">
                  <h3 className="absolute top-4 left-6 text-white/40 text-xs font-bold tracking-widest uppercase">Step 5: Output Corrected Decision</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 mt-12 border-t border-white/5 divide-y md:divide-y-0 md:divide-x divide-white/10">
                    {/* Ordinary AI */}
                    <div className="p-8 bg-black/20">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-white/40 text-sm font-semibold">Ordinary AI:</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-white/40 border border-white/10">DECISION ONLY</span>
                      </div>
                      <p className="text-white/60 text-lg">
                        &quot;{results.output.original}&quot;
                      </p>
                    </div>

                    {/* EquiMed AI */}
                    <div className="p-8 bg-cyan-glow/5 relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-glow/0 to-cyan-glow/10 pointer-events-none" />
                      <div className="flex items-center gap-2 mb-4 relative z-10">
                        <span className="text-cyan-glow text-sm font-bold">EquiMed AI:</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-glow/20 text-cyan-glow border border-cyan-glow/30">AUDIT + CORRECTION + RECOMMENDATION</span>
                      </div>
                      <p className="text-white text-lg font-medium leading-relaxed relative z-10 text-glow-cyan">
                        &quot;{results.output.corrected}&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
