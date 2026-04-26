import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowLeftRight, Database, BarChart3, Lock, ShieldCheck,
  Users, Cpu, ArrowRight, CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    number: "01",
    icon: ArrowLeftRight,
    title: "Crypto Asset Exchange Services",
    intro:
      "We offer a robust and user-friendly platform that enables seamless exchange between various crypto assets and fiat currencies.",
    features: [
      {
        name: "Reception & Transmission of Orders",
        desc: "Easily submit your buy and sell orders through our intuitive platform. We ensure your orders are received and transmitted efficiently for execution.",
      },
      {
        name: "Execution of Orders on Your Behalf",
        desc: "Our advanced systems execute your orders promptly, ensuring you get the best available rates with minimal delays.",
      },
      {
        name: "Exchange Between Crypto & Fiat",
        desc: "Whether you wish to convert cryptocurrency to fiat or vice versa, our platform supports a wide range of currency pairs to facilitate your transactions.",
      },
      {
        name: "Exchange Between Crypto Assets",
        desc: "Diversify your portfolio effortlessly by exchanging one cryptocurrency for another, leveraging our extensive liquidity sources for optimal pricing.",
      },
    ],
  },
  {
    number: "02",
    icon: Database,
    title: "Comprehensive Crypto Asset Custody",
    intro:
      "Beyond exchange services, we provide a range of management solutions to safeguard and optimise your crypto investments.",
    features: [
      {
        name: "Administration & Transfer of Ownership",
        desc: "Manage the ownership of your crypto assets with ease. Our platform allows you to transfer ownership securely and efficiently.",
      },
      {
        name: "Custody Services",
        desc: "Your crypto assets and cryptographic keys are held securely. We offer state-of-the-art custody solutions to protect your investments against unauthorised access and cyber threats.",
      },
      {
        name: "Secure Holding & Safekeeping",
        desc: "Our infrastructure ensures that your crypto assets are stored safely, providing you with peace of mind and the ability to focus on your investment strategies.",
      },
    ],
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Advanced Trading Platform",
    intro:
      "Our cutting-edge crypto exchange platform is designed to provide you with complete control and transparency over your transactions.",
    features: [
      {
        name: "Direct Client Access",
        desc: "Access our platform directly through our website, allowing you to submit orders, monitor transactions, and manage your portfolio in real-time.",
      },
      {
        name: "Reliable Price Quotes",
        desc: "Benefit from accurate and up-to-date price quotes sourced from reputable liquidity providers. Our connections ensure the most competitive rates available.",
      },
      {
        name: "Seamless Order Execution",
        desc: "We collaborate with leading liquidity providers to guarantee that your orders are executed swiftly and at the best possible prices.",
      },
    ],
  },
  {
    number: "04",
    icon: Lock,
    title: "Secure Fund Management",
    intro:
      "Your financial security is our top priority. We implement stringent measures to protect your funds at every level.",
    features: [
      {
        name: "Segregated Client Accounts",
        desc: "All client deposits are maintained in segregated accounts, ensuring your funds are kept separate from the company's operational finances — enhancing the security and integrity of your investments.",
      },
    ],
  },
];

const whyChoose = [
  {
    icon: ShieldCheck,
    title: "Regulatory Compliance",
    desc: "As a CySEC-registered CASP, we operate under strict regulatory guidelines, ensuring transparency and trustworthiness in all our services.",
  },
  {
    icon: Users,
    title: "Trusted Partnerships",
    desc: "We partner with reputable technology providers to offer reliable and efficient transaction execution.",
  },
  {
    icon: Cpu,
    title: "User-Centric Approach",
    desc: "Our service is designed with the user in mind, offering intuitive processes and real-time comprehensive support to enhance your trading experience.",
  },
];

export default function Services() {
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
              CySEC-Registered CASP
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              Our <span className="text-gradient-primary">Services</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
              At KRYPTO KNIGHT LIMITED, we are committed to providing comprehensive and secure
              cryptocurrency services tailored to meet the diverse needs of our clients.
              We adhere to the highest standards of regulatory compliance and operational excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Service Cards ─────────────────────────────────────────────────── */}
      <section className="pb-24">
        <div className="container mx-auto px-6 lg:px-12 space-y-12">
          {services.map((svc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.05 }}
              className="glass-card rounded-2xl border border-white/10 hover:border-primary/20 transition-all overflow-hidden"
            >
              <div className="p-8 lg:p-10">
                {/* Header */}
                <div className="flex items-start gap-5 mb-8">
                  <div className="text-4xl font-black font-mono text-primary/20 leading-none">{svc.number}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <svc.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">{svc.title}</h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{svc.intro}</p>
                  </div>
                </div>

                {/* Features grid */}
                <div className={`grid grid-cols-1 ${svc.features.length === 1 ? "md:grid-cols-1 max-w-2xl" : "md:grid-cols-2"} gap-4`}>
                  {svc.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-start gap-3 p-5 rounded-xl bg-white/3 border border-white/5 hover:border-primary/20 transition-all"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <div className="text-white font-semibold mb-1">{feat.name}</div>
                        <div className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Why Choose ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[200px] bg-primary/8 blur-[120px] rounded-full" />
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
              Why Choose Us
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Why Choose <span className="text-gradient-primary">KRYPTO KNIGHT?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {whyChoose.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="glass-card p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-all group text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto glass-card rounded-3xl p-10 border border-primary/20 relative overflow-hidden text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Get <span className="text-gradient-primary">Started?</span>
            </h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join KRYPTO KNIGHT today and experience a secure, efficient, and user-friendly approach to managing and exchanging your crypto assets.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 font-semibold shadow-[0_0_20px_rgba(0,255,156,0.3)] hover:shadow-[0_0_30px_rgba(0,255,156,0.5)] transition-all rounded-sm group">
                  Open Account
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="h-12 px-8 font-semibold border-white/10 hover:bg-white/5 hover:text-white rounded-sm">
                  Contact Sales
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
