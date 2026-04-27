"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const NAV_LINKS = [
  { href: "#crisis", label: "The Problem" },
  { href: "#solution", label: "Solution" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#impact", label: "Impact" },
  { href: "#team", label: "Vision" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-white/8 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-glow to-primary shadow-glow-cyan">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2V22M2 12H22" stroke="black" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="12" cy="2" r="2" fill="white"/>
                <circle cx="12" cy="22" r="2" fill="white"/>
                <circle cx="2" cy="12" r="2" fill="white"/>
                <circle cx="22" cy="12" r="2" fill="white"/>
                <circle cx="12" cy="12" r="3" fill="black"/>
              </svg>
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-glow animate-ping-slow" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-glow" />
          </div>
          <div>
            <span className="font-display font-bold text-lg text-white group-hover:text-cyan-glow transition-colors">
              EquiMed
            </span>
            <span className="font-display font-bold text-lg gradient-text-cyan"> AI</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/60 hover:text-cyan-glow text-sm font-medium transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#demo"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-glow to-primary text-black hover:opacity-90 transition-opacity shadow-glow-cyan"
          >
            See Demo
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-current transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-current transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass border-t border-white/8 px-6 py-4 space-y-3"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-white/70 hover:text-cyan-glow py-2 text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#demo"
            className="block text-center px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-glow to-primary text-black mt-2"
          >
            See Demo
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
