"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "cyan" | "blue" | "red" | "none";
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
  glow = "none",
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={clsx(
        "glass rounded-2xl p-6 relative overflow-hidden",
        hover && "cursor-pointer transition-shadow duration-300",
        glow === "cyan" && "hover:glow-cyan",
        glow === "blue" && "hover:glow-blue",
        glow === "red" && "hover:glow-red",
        className
      )}
    >
      {/* Subtle top highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/30 to-transparent" />
      {children}
    </motion.div>
  );
}
