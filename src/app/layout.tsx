import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EquiMed AI — Fair & Unbiased Healthcare Intelligence",
  description:
    "Building fair, explainable, and inclusive AI decision systems for equitable healthcare. Eliminating diagnostic bias across gender, ethnicity, age, and geography.",
  keywords: [
    "healthcare AI",
    "AI bias",
    "equitable AI",
    "medical AI fairness",
    "algorithmic bias",
    "EquiMed AI",
    "diagnostic AI",
  ],
  openGraph: {
    title: "EquiMed AI — Fair & Unbiased Healthcare Intelligence",
    description: "AI Should Save Lives — Not Reinforce Bias. Building fair, explainable healthcare AI for every person on Earth.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
