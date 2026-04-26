import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Platform", href: "/#platform" },
  { label: "Compliance", href: "/#compliance" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Anchor links (#section) use native <a> tags; route links use Wouter <Link>
const isAnchorLink = (href: string) => href.startsWith("/#");

const Navbar = () => {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => location === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 py-4">
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" data-testid="link-home">
          <div className="w-10 h-10 rounded-full bg-black/50 border border-primary/20 flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/30 transition-colors blur-xl rounded-full" />
            <img
              src="/knight-head.png"
              alt="Krypto Knight"
              className="w-6 h-6 z-10 drop-shadow-[0_0_8px_rgba(0,255,156,0.8)]"
            />
          </div>
          <span className="font-bold text-lg tracking-tight text-white group-hover:text-primary transition-colors">
            KRYPTO KNIGHT
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link =>
            isAnchorLink(link.href) ? (
              <a
                key={link.href}
                href={link.href.replace(/^\/#/, "/#")}
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
                data-testid={`link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-white"
                }`}
                data-testid={`link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <Button
              onClick={() => navigate("/dashboard")}
              variant="ghost"
              className="text-white hover:text-primary hover:bg-primary/10"
              data-testid="btn-login"
            >
              My Dashboard
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              variant="ghost"
              className="text-white hover:text-primary hover:bg-primary/10"
              data-testid="btn-login"
            >
              Client Login
            </Button>
          )}
          <Button
            onClick={() => navigate(user ? "/dashboard" : "/register")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(0,255,156,0.3)] hover:shadow-[0_0_30px_rgba(0,255,156,0.5)] transition-all font-semibold"
            data-testid="btn-get-started"
          >
            {user ? "Dashboard" : "Get Started"}
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-t border-white/5 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map(link =>
                isAnchorLink(link.href) ? (
                  <a
                    key={link.href}
                    href={link.href.replace(/^\/#/, "/#")}
                    onClick={() => setMobileOpen(false)}
                    className="text-base font-medium text-muted-foreground hover:text-white transition-colors py-1"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-base font-medium transition-colors py-1 ${
                      isActive(link.href) ? "text-primary" : "text-muted-foreground hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="flex flex-col gap-3 mt-2 pt-4 border-t border-white/5">
                <Button
                  onClick={() => { navigate(user ? "/dashboard" : "/login"); setMobileOpen(false); }}
                  variant="ghost"
                  className="justify-start text-white hover:text-primary hover:bg-primary/10"
                >
                  {user ? "My Dashboard" : "Client Login"}
                </Button>
                <Button
                  onClick={() => { navigate(user ? "/dashboard" : "/register"); setMobileOpen(false); }}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                >
                  {user ? "Dashboard" : "Get Started"}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
