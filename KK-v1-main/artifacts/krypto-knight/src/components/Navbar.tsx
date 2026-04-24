import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 py-4">
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group" data-testid="link-home">
          <div className="w-10 h-10 rounded-full bg-black/50 border border-primary/20 flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/30 transition-colors blur-xl rounded-full"></div>
            <img src="/knight-head.png" alt="Krypto Knight" className="w-6 h-6 z-10 drop-shadow-[0_0_8px_rgba(0,255,156,0.8)]" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white group-hover:text-primary transition-colors">
            KRYPTO KNIGHT
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#services" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors" data-testid="link-services">Services</Link>
          <Link href="#platform" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors" data-testid="link-platform">Platform</Link>
          <Link href="#compliance" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors" data-testid="link-compliance">Compliance</Link>
          <Link href="#company" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors" data-testid="link-company">Company</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden sm:inline-flex text-white hover:text-primary hover:bg-primary/10" data-testid="btn-login">
            Client Login
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(0,255,156,0.3)] hover:shadow-[0_0_30px_rgba(0,255,156,0.5)] transition-all font-semibold" data-testid="btn-get-started">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
