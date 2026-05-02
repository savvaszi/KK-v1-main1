import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ArrowRight, Activity } from "lucide-react";

const HeroSection = () => {
  const [, navigate] = useLocation();
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-background z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] opacity-50 mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[128px] opacity-30 mix-blend-screen pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNCIvPjwvc3ZnPg==')] opacity-20 pointer-events-none z-0"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-6">
              <ShieldCheck className="w-4 h-4" />
              <span>CySEC Registered CASP</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              Your Gateway to Digital Assets —<br />
              Regulated, Secure, and <br />
              <span className="text-gradient-primary">Built for Everyone</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-xl font-light leading-relaxed">
              Whether you are an individual taking your first steps into crypto or an institution managing digital assets at scale, Krypto Knight gives you access to a fully regulated, secure, and straightforward platform — registered with CySEC and built for the MiCAR era.
            </p>

            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
              <Button size="lg" onClick={() => navigate("/open-account")} className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-base font-semibold shadow-[0_0_20px_rgba(0,255,156,0.2)] hover:shadow-[0_0_30px_rgba(0,255,156,0.4)] transition-all rounded-sm group" data-testid="btn-hero-get-started">
                Open Account
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/contact")} className="h-14 px-8 text-base font-semibold border-white/10 hover:bg-white/5 hover:text-white rounded-sm group" data-testid="btn-hero-request-access">
                <Activity className="mr-2 w-5 h-5 text-primary group-hover:text-primary transition-colors" />
                Contact Us
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_5px_rgba(0,255,156,1)]"></div>
                <span>MiCA Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_5px_rgba(0,255,156,1)]"></div>
                <span>MiCA License in Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_5px_rgba(0,255,156,1)]"></div>
                <span>KYC/AML Integrated</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_5px_rgba(0,255,156,1)]"></div>
                <span>Fireblocks Powered</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative lg:ml-auto w-full max-w-lg mx-auto"
          >
            <div className="relative aspect-square w-full">
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_60s_linear_infinite]"></div>
              <div className="absolute inset-4 rounded-full border border-primary/10 animate-[spin_40s_linear_infinite_reverse]"></div>
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl"></div>
              
              <img 
                src="/knight-logo.png" 
                alt="Krypto Knight Platform" 
                className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_0_30px_rgba(0,255,156,0.3)] z-10"
              />
              
              {/* Floating metrics cards */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -right-8 bottom-1/4 glass-card p-4 rounded-lg z-20 hidden md:block"
              >
                <div className="text-xs text-muted-foreground mb-1 font-mono">Uptime</div>
                <div className="text-lg font-bold text-white">99.999%</div>
                <div className="text-xs text-primary mt-1 flex items-center gap-1">
                  SLA Guaranteed
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
