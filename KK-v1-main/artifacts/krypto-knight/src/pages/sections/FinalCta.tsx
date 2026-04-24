import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const FinalCta = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-background">
      {/* Glowing backdrop */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-[600px] h-[300px] bg-primary/20 blur-[150px] rounded-full pointer-events-none"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto glass-card rounded-3xl p-12 border border-primary/20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mr-16 -mt-16 opacity-10">
            <img src="/knight-head.png" alt="" className="w-64 h-64 grayscale" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 relative z-10">
            Build on <span className="text-gradient-primary">Regulated</span> <br />
            Crypto Infrastructure
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto relative z-10">
            Join the leading enterprises managing their digital assets with Krypto Knight's secure, scalable, and compliant platform.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10">
            <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-10 text-lg font-bold shadow-[0_0_20px_rgba(0,255,156,0.3)] hover:shadow-[0_0_30px_rgba(0,255,156,0.5)] transition-all rounded-sm" data-testid="btn-cta-get-started">
              Open Institutional Account
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-10 text-lg font-semibold border-white/10 hover:bg-white/5 hover:text-white rounded-sm" data-testid="btn-cta-contact-sales">
              Contact Sales
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCta;
