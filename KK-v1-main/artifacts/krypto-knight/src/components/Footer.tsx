import React from "react";
import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <img
                src="/knight-head.png"
                alt="Krypto Knight"
                className="w-8 h-8 drop-shadow-[0_0_5px_rgba(0,255,156,0.8)]"
              />
              <span className="font-bold text-xl tracking-tight text-white">KRYPTO KNIGHT</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              Institutional-grade digital asset infrastructure. Regulated, secure, and built for the next era of global finance.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,255,156,0.8)]" />
              <span className="text-xs font-mono text-primary">ALL SYSTEMS OPERATIONAL</span>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold text-white mb-6">Platform</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Exchange Services
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Institutional Custody
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Trading Platform
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Fund Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Open Account
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Client Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-6">Legal & Compliance</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Regulatory Status
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Security Disclosures
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Risk warning */}
        <div className="border border-white/5 rounded-xl p-4 mb-8 bg-white/2">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="text-white font-semibold">Risk Warning: </span>
            Cryptocurrencies come with a great risk of losing money rapidly due to high volatility.
            You should consider whether you understand how Cryptocurrencies trading works and whether
            you can afford to take the high risk of losing your money.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Krypto Knight Ltd. CySEC — CASP Registration No. 015/24. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-white transition-colors text-sm">Twitter</a>
            <a href="#" className="text-muted-foreground hover:text-white transition-colors text-sm">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
