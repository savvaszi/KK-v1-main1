import React from "react";
import { motion } from "framer-motion";
import { Building2, Wallet, Blocks, LineChart } from "lucide-react";

const useCases = [
  {
    icon: Building2,
    title: "Enterprises",
    desc: "Convert fiat to crypto instantly, manage vendor payments in USDC, and hold Bitcoin on your corporate balance sheet securely.",
  },
  {
    icon: Wallet,
    title: "Funds & Asset Managers",
    desc: "Execute block trades with smart routing, access prime brokerage services, and generate yield on idle stablecoins.",
  },
  {
    icon: Blocks,
    title: "Fintech Startups",
    desc: "Embed crypto buying, selling, and holding into your app using our white-label REST APIs and regulatory licenses.",
  },
  {
    icon: LineChart,
    title: "Web3 Companies",
    desc: "Manage protocol treasuries, execute safe multi-sig payroll, and off-ramp to fiat globally without bank friction.",
  }
];

const UseCases = () => {
  return (
    <section id="company" className="py-24 bg-card border-y border-white/5 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Who Builds With Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Engineered specifically for institutional capital, not retail day traders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 p-8 rounded-xl bg-background border border-white/5 hover:border-primary/20 transition-all"
            >
              <div className="shrink-0 w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <useCase.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{useCase.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {useCase.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
