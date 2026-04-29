import React from "react";
import { motion } from "framer-motion";

const PlatformIntro = () => {
  return (
    <section className="py-24 relative bg-background">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />
      </div>
      <div className="container relative z-10 mx-auto px-6 lg:px-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-mono tracking-widest uppercase mb-8">
            The Platform
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            The Krypto Knight <span className="text-gradient-primary">Platform</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Your digital assets, your way. Our platform gives you a clear and complete view of your holdings,
            your transactions, and your activity — all in one place. We have designed the experience to feel
            straightforward and reassuring, whether you are logging in for the first time or managing a complex
            multi-asset portfolio. Backed by institutional-grade infrastructure and built within a fully regulated
            framework, you can engage with confidence knowing everything is secure, compliant, and working the
            way it should.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformIntro;
