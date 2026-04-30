import React from "react";
import { motion } from "framer-motion";
import { Database, Lock, Globe, Zap, Cpu, Code2 } from "lucide-react";

const services = [
  {
    icon: Database,
    title: "Regulated Exchange Services",
    description: "Buy, sell, and exchange crypto assets against fiat currencies or other digital assets — backed by competitive pricing, reliable execution, and full MiCAR compliance. Simple for individuals, scalable for institutions."
  },
  {
    icon: Lock,
    title: "Institutional & Personal Custody",
    description: "Your digital assets and cryptographic keys are safeguarded using Fireblocks' Multi-Party Computation (MPC) technology — the same infrastructure trusted by leading financial institutions globally. Whether you hold a little or a lot, your assets are protected."
  },
  {
    icon: Globe,
    title: "Crypto Asset Transfer Services",
    description: "Send digital assets on your behalf from one distributed ledger address or account to another — to another Krypto Knight client or to an external wallet of your choosing. Fast, secure, and fully compliant with MiCAR Travel Rule obligations."
  },
  {
    icon: Zap,
    title: "Liquidity Access",
    description: "We partner with established institutional liquidity providers to ensure you always receive competitive pricing and reliable execution — regardless of the size of your transaction."
  },
  {
    icon: Cpu,
    title: "Fiat On & Off Ramp",
    description: "Move seamlessly between fiat and digital assets via our banking and EMI partnerships — supporting SEPA transfers and multi-currency settlement for both personal and corporate clients."
  },
  {
    icon: Code2,
    title: "Developer-Ready Integration",
    description: "For fintech companies and Web3 organisations looking to embed regulated crypto services into their own products, our API-first infrastructure makes integration straightforward and compliant from day one."
  }
];

const CoreServices = () => {
  return (
    <section id="services" className="py-24 relative bg-card border-y border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Everything You Need. <br />
            <span className="text-gradient-primary">One Regulated Platform.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Whether you are managing personal savings or institutional capital, Krypto Knight brings together all the tools you need under one compliant and supervised roof.
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
