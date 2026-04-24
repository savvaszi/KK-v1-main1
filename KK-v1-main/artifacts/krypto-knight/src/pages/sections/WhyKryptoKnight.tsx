import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const WhyKryptoKnight = () => {
  const points = [
    {
      title: "Regulatory First",
      desc: "Licensed by CySEC and built for MiCA compliance from day one. We don't adapt to regulations; we are built on them."
    },
    {
      title: "Enterprise Architecture",
      desc: "Isolated accounts, strict role-based access controls, and custom approval workflows designed for corporate governance."
    },
    {
      title: "Audited & Proven",
      desc: "Regular Proof of Reserves, SOC 2 Type II certification, and code audited by top-tier security firms."
    }
  ];

  return (
    <section id="compliance" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white text-sm font-medium mb-6">
              Not Another Crypto Company
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Built for <span className="text-gradient-primary">Trust</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              We operate at the intersection of traditional finance and digital assets. Krypto Knight abstracts away technical complexity and regulatory uncertainty, allowing you to focus on strategy.
            </p>

            <div className="space-y-6">
              {points.map((point, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="mt-1">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{point.title}</h4>
                    <p className="text-muted-foreground mt-1">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] rounded-2xl border border-white/10 overflow-hidden glass p-8 flex flex-col justify-end"
          >
            <div className="absolute inset-0 z-0">
               <img src="/knight-full.png" alt="Krypto Knight Defender" className="w-full h-full object-cover opacity-30 mix-blend-luminosity grayscale hover:grayscale-0 transition-all duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
            </div>
            
            <div className="relative z-10 p-6 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl">
              <div className="text-sm font-mono text-primary mb-2">SECURITY STATUS</div>
              <h3 className="text-2xl font-bold text-white mb-2">Assets Secured</h3>
              <p className="text-muted-foreground mb-4">100% of client funds are held in bankrupt-remote, bankruptcy-remote segregated accounts.</p>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="w-full h-full bg-primary shadow-[0_0_10px_rgba(0,255,156,0.8)]"></div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhyKryptoKnight;
