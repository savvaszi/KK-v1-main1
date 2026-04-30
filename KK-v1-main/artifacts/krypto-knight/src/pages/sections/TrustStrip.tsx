import React from "react";
import { motion } from "framer-motion";

const TrustStrip = () => {
  const partners = [
    { name: "MiCA", subtitle: "Ready" },
    { name: "CySEC", subtitle: "Licensed" },
    { name: "KYC/AML", subtitle: "Integrated" },
    { name: "Fireblocks", subtitle: "Powered" },
  ];

  return (
    <section className="py-10 border-y border-white/5 bg-black/40 backdrop-blur-md">
      <div className="container mx-auto px-6 lg:px-12">
        <p className="text-center text-sm font-medium text-muted-foreground mb-8 uppercase tracking-widest">
          Trusted by global financial institutions
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 lg:gap-x-24">
          {partners.map((partner, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
            >
              <span className="text-xl md:text-2xl font-bold font-serif tracking-tight text-white/90">
                {partner.name}
              </span>
              <span className="text-xs font-mono text-primary/80 mt-1 uppercase tracking-wider">
                {partner.subtitle}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
