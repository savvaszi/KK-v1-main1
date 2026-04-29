import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Wallet, ScanFace, Eye } from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Regulatory First",
    desc: "Licensed by CySEC and fully aligned with MiCAR from day one. Every service we offer is authorised, supervised, and compliant — giving every client, retail or institutional, the same level of regulatory protection.",
  },
  {
    icon: Cpu,
    title: "Powered by Fireblocks",
    desc: "Our custody and transaction infrastructure runs on Fireblocks — the world's leading institutional digital asset platform. Your assets benefit from MPC security, policy-based approval workflows, and real-time transaction monitoring — regardless of your account size.",
  },
  {
    icon: Wallet,
    title: "Segregated Client Accounts",
    desc: "All client funds — whether personal or corporate — are held in fully segregated accounts, completely separate from Krypto Knight's own operational finances. Your money is yours, always.",
  },
  {
    icon: ScanFace,
    title: "KYC/AML Integrated",
    desc: "Every client is onboarded through a rigorous, automated KYC and AML screening process — ensuring the highest standards of client due diligence and a smooth, straightforward onboarding experience for all.",
  },
  {
    icon: Eye,
    title: "Transparent & Accessible",
    desc: "No hidden fees, no opaque processes. We believe every client deserves to understand exactly what they are getting, what it costs, and how their assets are being managed.",
  },
];

const BuiltForTrust = () => {
  return (
    <section className="py-24 relative bg-background border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>
      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-mono tracking-widest uppercase mb-8">
            Built for Trust
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Built for Trust. <span className="text-gradient-primary">Built for You.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Whether you are new to crypto or a seasoned professional, you deserve a platform that puts
            security, transparency, and regulation first. That is exactly what Krypto Knight is built to deliver.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`p-8 rounded-xl bg-card border border-white/5 hover:border-primary/30 transition-colors group cursor-default${
                idx === 3 ? " md:col-start-1 lg:col-start-auto" : ""
              }`}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuiltForTrust;
