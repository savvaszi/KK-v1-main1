import { motion } from "framer-motion";
import { Link } from "wouter";
import { User, Building2, ChevronRight, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function OpenAccount() {
  return (
    <>
    <Navbar />
    <div className="bg-background pt-28 pb-20 px-6">
      <div className="container mx-auto max-w-3xl">

        {/* Header */}
        <motion.div {...fade()} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-5">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">CySEC CASP Reg. No. 015/24</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Open an Account
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Choose the account type that best suits your needs. Our onboarding process is
            fully digital and compliant with CySEC CASP requirements.
          </p>
        </motion.div>

        {/* Account type cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Personal */}
          <motion.div {...fade(0.1)}>
            <Link href="/open-personal-account">
              <div className="glass-card rounded-2xl p-8 cursor-pointer group hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,156,0.08)] h-full flex flex-col">
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <User className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-white mb-3">Personal Account</h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                  For individual investors. Access crypto exchange, custody, and trading
                  platform services under your personal name.
                </p>
                <ul className="space-y-2 mb-8">
                  {[
                    "Identity verification (KYC)",
                    "Proof of address",
                    "Tax information",
                    "3 simple steps",
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                  Apply Now <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Business */}
          <motion.div {...fade(0.2)}>
            <Link href="/open-business-account">
              <div className="glass-card rounded-2xl p-8 cursor-pointer group hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,156,0.08)] h-full flex flex-col">
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Building2 className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-white mb-3">Business Account</h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                  For companies and institutional clients. Unlock corporate custody, fund
                  management, and dedicated relationship management.
                </p>
                <ul className="space-y-2 mb-8">
                  {[
                    "Company documents (KYB)",
                    "Incorporation certificate",
                    "Business address proof",
                    "3 simple steps",
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                  Apply Now <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Footer note */}
        <motion.p {...fade(0.3)} className="text-center text-white/30 text-xs mt-10 max-w-lg mx-auto">
          All applications are subject to compliance review. Krypto Knight Ltd is registered
          under CySEC CASP No. 015/24. Your information is encrypted and handled in accordance
          with our Privacy Policy.
        </motion.p>
      </div>
    </div>
    <Footer />
    </>
  );
}
