import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import CrisisStats from "@/components/sections/CrisisStats";
import FailureStories from "@/components/sections/FailureStories";
import RootCause from "@/components/sections/RootCause";
import Solution from "@/components/sections/Solution";
import HowItWorks from "@/components/sections/HowItWorks";
import ImpactMetrics from "@/components/sections/ImpactMetrics";
import LiveDemo from "@/components/sections/LiveDemo";
import Vision from "@/components/sections/Vision";
import CallToAction from "@/components/sections/CallToAction";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <CrisisStats />
      <FailureStories />
      <RootCause />
      <Solution />
      <HowItWorks />
      <ImpactMetrics />
      <LiveDemo />
      <Vision />
      <CallToAction />
      <Footer />
    </main>
  );
}
