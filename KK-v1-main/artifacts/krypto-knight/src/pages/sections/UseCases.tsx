import React from "react";
import { motion } from "framer-motion";
import { Building2, Wallet, Blocks, LineChart } from "lucide-react";

const useCases = [
  {
    icon: Wallet,
    title: "Individual Investors",
    desc: "Whether you are buying crypto for the first time or managing a growing personal portfolio, our platform makes it simple, safe, and fully regulated — with real support whenever you need it.",
  },
  {
    icon: Building2,
    title: "Enterprises & Corporates",
    desc: "Convert fiat to crypto, manage treasury holdings in digital assets, and execute cross-border settlements within a fully regulated and auditable framework.",
  },
  {
    icon: LineChart,
    title: "Funds & Asset Managers",
    desc: "Access institutional-grade execution, custody, and reporting tools — built to meet the governance and compliance standards your investors and regulators expect.",
  },
  {
    icon: Blocks,
    title: "Fintech Startups & Web3 Organisations",
    desc: "Integrate regulated crypto asset services into your product using our API infrastructure and benefit from our MiCAR licence — accelerating your time to market without the regulatory burden of building from scratch.",
  }
];

const UseCases = () => {
  return (
    <section id="company" className="py-24 bg-card border-y border-white/5 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Who We Serve
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Krypto Knight is built for anyone who values security, compliance, and a trustworthy partner in the world of digital assets.
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
