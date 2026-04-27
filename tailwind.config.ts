import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A84FF",
        cyan: {
          glow: "#00FFD1",
          DEFAULT: "#00FFD1",
          dim: "#00B896",
        },
        danger: "#FF4D4D",
        surface: {
          DEFAULT: "#0D1B2A",
          dark: "#030712",
          card: "rgba(255,255,255,0.04)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-hero": "linear-gradient(135deg, #030712 0%, #0D1B2A 50%, #0A1628 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          from: { boxShadow: "0 0 20px rgba(0, 255, 209, 0.3)" },
          to: { boxShadow: "0 0 40px rgba(0, 255, 209, 0.7), 0 0 80px rgba(0, 255, 209, 0.3)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "glow-cyan": "0 0 30px rgba(0, 255, 209, 0.4)",
        "glow-blue": "0 0 30px rgba(10, 132, 255, 0.4)",
        "glow-red": "0 0 30px rgba(255, 77, 77, 0.4)",
        "glass": "0 8px 32px rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
