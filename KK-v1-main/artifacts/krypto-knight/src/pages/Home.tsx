import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "./sections/HeroSection";
import TrustStrip from "./sections/TrustStrip";
import PlatformIntro from "./sections/PlatformIntro";
import CoreServices from "./sections/CoreServices";
import BuiltForTrust from "./sections/BuiltForTrust";
import UseCases from "./sections/UseCases";
import FinalCta from "./sections/FinalCta";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30 selection:text-white">
      <Navbar />
      <main>
        <HeroSection />
        <TrustStrip />
        <PlatformIntro />
        <CoreServices />
        <BuiltForTrust />
        <UseCases />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
