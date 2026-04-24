import React from "react";
import { motion } from "framer-motion";
import { Database, Lock, Globe, Zap, Cpu, Code2 } from "lucide-react";

const services = [
  {
    icon: Database,
    title: "Institutional Custody",
    description: "Military-grade cold storage with MPC technology, multi-sig authorization, and full regulatory compliance."
  },
  {
    icon: Zap,
    title: "High-Frequency Trading",
    description: "Deep liquidity pools, smart order routing, and zero-slippage execution for institutional block trades."
  },
  {
    icon: Lock,
    title: "Treasury Management",
    description: "Automated yield generation, risk hedging, and fiat-to-crypto treasury conversion at scale."
  },
  {
    icon: Globe,
    title: "Global Payments",
    description: "Cross-border settlement infrastructure utilizing stablecoins to bypass traditional banking latency."
  },
  {
    icon: Cpu,
    title: "AI Risk Engine",
    description: "Real-time anomaly detection, predictive risk modeling, and automated AML/KYC screening."
  },
  {
    icon: Code2,
    title: "Developer APIs",
    description: "REST & WebSocket APIs with 99.999% uptime SLAs for seamless integration into existing fintech stacks."
  }
];

const CoreServices = () => {
  return (
    <section id="services" className="py-24 relative bg-card border-y border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Comprehensive <br />
            <span className="text-gradient-primary">Infrastructure</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A unified suite of products eliminating the fragmentation of institutional crypto operations. One platform, complete control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-8 rounded-xl bg-background border border-white/5 hover:border-primary/30 transition-colors group cursor-default"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreServices;
