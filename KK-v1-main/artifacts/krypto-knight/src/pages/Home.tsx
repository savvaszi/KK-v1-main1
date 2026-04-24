import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "./sections/HeroSection";
import TrustStrip from "./sections/TrustStrip";
import CoreServices from "./sections/CoreServices";
import PlatformShowcase from "./sections/PlatformShowcase";
import WhyKryptoKnight from "./sections/WhyKryptoKnight";
import UseCases from "./sections/UseCases";
import FinalCta from "./sections/FinalCta";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30 selection:text-white">
      <Navbar />
      <main>
        <HeroSection />
        <TrustStrip />
        <PlatformShowcase />
        <CoreServices />
        <WhyKryptoKnight />
        <UseCases />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
