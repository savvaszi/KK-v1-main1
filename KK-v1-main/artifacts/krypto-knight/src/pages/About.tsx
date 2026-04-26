import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ShieldCheck, Eye, Zap, Target, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const priorities = [
  {
    icon: ShieldCheck,
    title: "Security",
    desc: "As a registered cryptocurrency services provider we fully comply with AML/KYC regulations and have strict procedures and systems in place to detect suspicious activity.",
  },
  {
    icon: Eye,
    title: "Transparency",
    desc: "We maintain a culture of high responsibility within our operating environment, which is regularly subject to independent financial and regulatory audits.",
  },
  {
    icon: Zap,
    title: "Ease-Of-Use",
    desc: "We utilise ready-to-use crypto transaction solutions to facilitate a seamless trading experience, while our support team is always there to assist you.",
  },
];

const pillars = [
  {
    label: "Frequent financial and regulatory audits",
    desc: "Ensure we maintain the highest standards of integrity and operational resilience.",
  },
  {
    label: "Registered with CySEC",
    desc: "Adhering to stringent procedures with our own compliance and AML department. CASP Registration No. 015/24.",
  },
  {
    label: "Focus on Assets Security",
    desc: "Continuously updated to comply with evolving legal requirements, ensuring your investments are safeguarded.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30 selection:text-white">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-background">
          <div className="absolute top-1/3 left-1/3 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[128px] opacity-40 pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[128px] opacity-20 pointer-events-none" />
        </div>

        <div className="container relative z-10 mx-auto px-6 lg:px-12 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-8">
              <ShieldCheck className="w-4 h-4" />
              <span>CySEC — CASP Reg. No. 015/24</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              Unlocking the World <br />
              of <span className="text-gradient-primary">Crypto Trading</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
              KRYPTO KNIGHT is a gateway into the world of crypto trading, unlocking limitless
              opportunities and empowering you to navigate the vast digital financial landscape with ease.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Company Overview ──────────────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white text-sm font-medium mb-6">
                Who We Are
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
                Your Partner in <span className="text-gradient-primary">Digital Finance</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We are headquartered in Cyprus (Company Reg. No. HE 434989), and hold a registration
                by the Cyprus Securities and Exchange Commission to operate as a Crypto Asset Services
                Provider (CASP Registration No. 015/24), ensuring compliance and security in all our operations.
              </p>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                We strive to facilitate an interconnection between crypto and traditional finance,
                providing an effortless, yet effective crypto-to-fiat bridge.
              </p>

              <div className="space-y-5">
                {pillars.map((p, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary mt-0.5 shrink-0" />
                    <div>
                      <span className="text-white font-semibold">{p.label}: </span>
                      <span className="text-muted-foreground">{p.desc}</span>
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
              className="relative h-[520px] rounded-2xl border border-white/10 overflow-hidden glass flex flex-col justify-end"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src="/knight-full.png"
                  alt="Krypto Knight"
                  className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
              </div>
              <div className="relative z-10 p-6 m-6 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl">
                <div className="text-sm font-mono text-primary mb-2">REGULATORY STATUS</div>
                <h3 className="text-2xl font-bold text-white mb-2">CySEC Registered CASP</h3>
                <p className="text-muted-foreground text-sm">
                  Operating under strict regulatory guidelines, ensuring transparency and trustworthiness in every service.
                </p>
                <div className="mt-4 w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-primary shadow-[0_0_10px_rgba(0,255,156,0.8)]" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── We Prioritise ────────────────────────────────────────────────── */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[200px] bg-primary/8 blur-[120px] rounded-full" />
        </div>
        <div className="container relative z-10 mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white text-sm font-medium mb-6">
              Our Core Values
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              We <span className="text-gradient-primary">Prioritise</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {priorities.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="glass-card p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Mission ──────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto glass-card rounded-3xl p-12 border border-primary/20 relative overflow-hidden text-center"
          >
            <div className="absolute top-0 right-0 -mr-16 -mt-16 opacity-10">
              <img src="/knight-head.png" alt="" className="w-64 h-64 grayscale" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-8">
              <Target className="w-4 h-4" />
              Our Mission
            </div>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 relative z-10">
              Excellence in <span className="text-gradient-primary">Digital Finance</span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6 relative z-10 max-w-2xl mx-auto">
              To deliver excellence in digital finance and to satisfy the modern investor's everyday needs
              in crypto trading through simplicity, reliability, and a customer-centric approach.
            </p>
            <p className="text-muted-foreground leading-relaxed relative z-10 max-w-2xl mx-auto">
              Delivering the highest grade of convenience and quality is of paramount importance at
              KRYPTO KNIGHT. We strive to consistently monitor and improve our service and products,
              allowing us to stay at the forefront of the latest industry trends.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <Link href="/contact">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 font-semibold shadow-[0_0_20px_rgba(0,255,156,0.3)] hover:shadow-[0_0_30px_rgba(0,255,156,0.5)] transition-all rounded-sm group">
                  Get In Touch
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="h-14 px-8 font-semibold border-white/10 hover:bg-white/5 hover:text-white rounded-sm">
                  Our Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
