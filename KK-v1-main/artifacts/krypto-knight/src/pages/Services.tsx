import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowLeftRight, Database, BarChart3,
  ShieldCheck, Users, Cpu, ArrowRight, CheckCircle2,
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
      "Buying, selling, and exchanging crypto assets should be effortless. Our platform is built to make it exactly that.",
    features: [
      {
        name: "Reception & Transmission of Orders",
        desc: "Submit your buy and sell orders through our clean, intuitive platform. We handle the rest — routing your orders efficiently and accurately for execution.",
      },
      {
        name: "Execution of Orders on Your Behalf",
        desc: "Our systems work around the clock to execute your orders promptly, ensuring you always benefit from the best available rates with no unnecessary delays.",
      },
      {
        name: "Exchange Between Crypto & Fiat",
        desc: "Need to convert crypto to euros or euros to crypto? We support a wide range of currency pairs so you can move between the two worlds freely and without friction.",
      },
      {
        name: "Exchange Between Crypto Assets",
        desc: "Looking to diversify or rebalance your portfolio? Swap one cryptocurrency for another with confidence, backed by deep liquidity sources and competitive pricing.",
      },
      {
        name: "Transfer Services",
        desc: "On behalf of our clients, we facilitate the transfer of crypto-assets from one distributed ledger address or account to another — whether to another Krypto Knight client account or to an external wallet address of your choosing. All transfers are executed securely, with full traceability and in strict compliance with our MiCAR licence conditions and applicable Travel Rule obligations.",
      },
    ],
  },
  {
    number: "02",
    icon: Database,
    title: "Crypto Asset Custody",
    intro:
      "Your assets deserve the highest level of protection. Our custody services are built on institutional-grade infrastructure so you can invest with complete peace of mind.",
    features: [
      {
        name: "Administration & Transfer of Ownership",
        desc: "Transfer and manage the ownership of your digital assets securely and efficiently, with a full audit trail and transparent record keeping at every step.",
      },
      {
        name: "Custody Services",
        desc: "We safeguard your crypto assets and cryptographic keys using state-of-the-art security infrastructure — protecting your investments from unauthorised access, cyber threats, and operational risk.",
      },
      {
        name: "Secure Holding & Safekeeping",
        desc: "Your assets are stored safely within our secure environment, giving you the freedom to focus on your investment strategy rather than worrying about what is happening underneath.",
      },
    ],
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Trading Platform",
    intro:
      "Our platform gives you real control over your digital asset activity — with transparency and reliability built in from the ground up.",
    features: [
      {
        name: "Direct Client Access",
        desc: "Log in from anywhere and access your full portfolio, submit orders, monitor transactions, and track your positions — all in one place, in real time.",
      },
      {
        name: "Reliable Price Quotes",
        desc: "We source accurate, up-to-date pricing from reputable liquidity providers so you always know what you are getting before you commit to a trade.",
      },
      {
        name: "Seamless Order Execution",
        desc: "We work with leading liquidity partners to make sure your orders are filled quickly and at the most competitive prices available.",
      },
    ],
  },
];

const whyChoose = [
  {
    icon: ShieldCheck,
    title: "A Licence You Can Trust",
    desc: "As a CySEC-registered CASP operating under MiCAR, we are held to the highest regulatory standards in the EU. You are not just a customer — you are a protected client of a fully supervised financial entity.",
  },
  {
    icon: Cpu,
    title: "Security You Can Count On",
    desc: "Our infrastructure is powered by Fireblocks, the same platform used by leading banks, exchanges, and asset managers worldwide. Your assets are in good hands.",
  },
  {
    icon: Users,
    title: "Partners Who Care",
    desc: "We work with carefully selected, reputable technology and liquidity partners to make sure every part of your experience — from pricing to execution to support — meets the standard you deserve.",
  },
  {
    icon: ShieldCheck,
    title: "Built Around You",
    desc: "Whether you are a first-time crypto buyer or a seasoned institutional trader, our platform and our team are here to make your experience as smooth and straightforward as possible. Real support, real people, real service.",
  },
  {
    icon: Users,
    title: "The People Behind It All",
    desc: "Behind Krypto Knight is a vastly experienced and dedicated team of professionals who bring together deep expertise in digital assets, financial regulation, technology, and client service. They are the ones who make everything work — every day, for every client — and their commitment to excellence is at the heart of everything we do.",
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
              Welcome to <span className="text-gradient-primary">Krypto Knight</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed mb-4">
              Your trusted partner in digital asset services — regulated, secure, and built for everyone.
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Whether you are taking your first steps into crypto or managing institutional-scale digital assets, we are here to make your experience straightforward, safe, and supported every step of the way.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
              <Link href="/open-account">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 font-semibold shadow-[0_0_20px_rgba(0,255,156,0.3)] hover:shadow-[0_0_30px_rgba(0,255,156,0.5)] transition-all rounded-sm">
                  Open Account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="h-12 px-8 font-semibold border-white/10 hover:bg-white/5 hover:text-white rounded-sm">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Services Intro ────────────────────────────────────────────────── */}
      <section className="pb-8">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At Krypto Knight, we believe that accessing the world of digital assets should be simple, secure, and transparent. That is why we have built a comprehensive suite of services designed to serve both individual investors and institutional clients — all under the protection of a fully regulated MiCAR framework.
          </p>
        </div>
      </section>

      {/* ── Service Cards ─────────────────────────────────────────────────── */}
      <section className="pb-24 pt-8">
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

      {/* ── MiCAR Regulatory Standing ─────────────────────────────────────── */}
      <section className="py-24 bg-card border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[200px] bg-primary/8 blur-[120px] rounded-full" />
        </div>
        <div className="container relative z-10 mx-auto px-6 lg:px-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-6">
              <ShieldCheck className="w-4 h-4" />
              MiCAR Licence &amp; Regulatory Standing
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Regulated the <span className="text-gradient-primary">Right Way</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              At Krypto Knight, regulation is not a box we tick — it is the foundation everything we do is built on. We are proud to be a CySEC-registered Crypto Asset Service Provider (CASP), operating under the full framework of the Markets in Crypto Assets Regulation (MiCAR) — the gold standard for crypto regulation across the European Union.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              What this means for you is simple. Every service we offer, every transaction we process, and every client we onboard is governed by strict regulatory standards designed to protect you. You will always know who you are dealing with, what your rights are, and how your assets and funds are being managed.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Our regulatory credentials are not just a licence number at the bottom of the page. They represent our ongoing commitment to transparency, accountability, and doing things properly — so you can engage with digital assets confidently, knowing you are in safe and supervised hands.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/5 border border-white/10 font-mono text-sm text-muted-foreground">
              CySEC CASP Registration No. 015/24
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Powered by Fireblocks ─────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="absolute top-1/2 left-0 w-1/3 h-1/2 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container relative z-10 mx-auto px-6 lg:px-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white text-sm font-medium mb-6">
              Powered by Fireblocks
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Institutional-Grade Security, <span className="text-gradient-primary">Built In</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Behind every transaction and every asset stored on our platform sits Fireblocks — the world's leading digital asset infrastructure platform, trusted by hundreds of regulated financial institutions globally.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Fireblocks provides our custody and transaction layer with Multi-Party Computation (MPC) technology, meaning your assets are protected by a security architecture that eliminates single points of failure. There are no private keys that can be stolen, no single device that can be compromised, and no single person who can move your assets unilaterally.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Every transaction on our platform goes through Fireblocks' policy engine — with built-in controls, approval workflows, and real-time monitoring — so nothing moves without the right authorisations in place.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              For our clients, this means institutional-grade security without institutional complexity. You get the protection of the world's most trusted digital asset infrastructure, wrapped in an experience that is straightforward and accessible for everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Why Choose ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-card border-y border-white/5 relative overflow-hidden">
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
              Why Choose <span className="text-gradient-primary">Krypto Knight?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {whyChoose.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass-card p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
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
              Join Krypto Knight today and experience a smarter, safer way to manage and grow your digital assets. We are regulated, we are ready, and we are here for you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/open-account">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 font-semibold shadow-[0_0_20px_rgba(0,255,156,0.3)] hover:shadow-[0_0_30px_rgba(0,255,156,0.5)] transition-all rounded-sm group">
                  Open Account
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="h-12 px-8 font-semibold border-white/10 hover:bg-white/5 hover:text-white rounded-sm">
                  Contact Us
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
