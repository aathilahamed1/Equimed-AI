"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/8 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-glow to-primary shadow-glow-cyan">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2V22M2 12H22" stroke="black" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="12" cy="2" r="2" fill="white"/>
              <circle cx="12" cy="22" r="2" fill="white"/>
              <circle cx="2" cy="12" r="2" fill="white"/>
              <circle cx="22" cy="12" r="2" fill="white"/>
              <circle cx="12" cy="12" r="3" fill="black"/>
            </svg>
          </div>
          <span className="font-display font-bold text-white">EquiMed AI</span>
        </div>

        {/* Mission */}
        <p className="text-white/30 text-sm text-center max-w-md">
          Building fair, explainable, and inclusive healthcare intelligence.
          AI that works for every human — without exception.
        </p>

        {/* Links */}
        <div className="flex items-center gap-6 text-white/30 text-sm">
          <a href="#crisis" className="hover:text-cyan-glow transition-colors">Problem</a>
          <a href="#solution" className="hover:text-cyan-glow transition-colors">Solution</a>
          <a href="#impact" className="hover:text-cyan-glow transition-colors">Impact</a>
          <a href="#contact" className="hover:text-cyan-glow transition-colors">Contact</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-white/5 text-center text-white/20 text-xs">
        © 2025 EquiMed AI · Built for a fairer world.
      </div>
    </footer>
  );
}
