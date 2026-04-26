import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PolicyLayoutProps {
  icon: LucideIcon;
  badge: string;
  title: string;
  effectiveDate?: string;
  children: React.ReactNode;
}

/** Shared wrapper for all legal / policy pages */
export default function PolicyLayout({ icon: Icon, badge, title, effectiveDate, children }: PolicyLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Subtle glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-4xl pt-28 pb-24 px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-5">
            <Icon className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">{badge}</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">{title}</h1>
          {effectiveDate && (
            <p className="text-muted-foreground text-sm">Effective Date: {effectiveDate}</p>
          )}
        </motion.div>

        {/* Content card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card rounded-2xl p-8 lg:p-12 prose-policy"
        >
          {children}
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-white/30 text-xs mt-8"
        >
          © {new Date().getFullYear()} Krypto Knight Ltd — Company Reg. HE 434989 — CySEC CASP No. 015/24
        </motion.p>
      </div>

      <Footer />
    </div>
  );
}

/** Section heading */
export function PSection({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-semibold text-white mt-8 mb-3 pb-2 border-b border-white/10 first:mt-0">
      {children}
    </h2>
  );
}

/** Sub-heading */
export function PSub({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-semibold text-white/90 mt-5 mb-2">{children}</h3>;
}

/** Body paragraph */
export function PP({ children }: { children: React.ReactNode }) {
  return <p className="text-white/65 text-sm leading-relaxed mb-3">{children}</p>;
}

/** Unordered list */
export function PUL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="space-y-1.5 mb-4 ml-4">
      {children}
    </ul>
  );
}

/** List item */
export function PLI({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-white/65 text-sm leading-relaxed">
      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
      <span>{children}</span>
    </li>
  );
}

/** Ordered list */
export function POL({ children }: { children: React.ReactNode }) {
  return <ol className="space-y-2 mb-4 ml-4 list-decimal list-outside text-white/65 text-sm leading-relaxed pl-4">{children}</ol>;
}

/** Info / highlight box */
export function PBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primary/5 border border-primary/15 rounded-xl p-4 mb-4">
      <p className="text-white/70 text-sm leading-relaxed">{children}</p>
    </div>
  );
}

/** Contact info row */
export function PContact({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="flex items-start gap-3 text-sm mb-1.5">
      <span className="text-white/40 w-24 flex-shrink-0">{label}:</span>
      {href ? (
        <a href={href} className="text-primary hover:underline">{value}</a>
      ) : (
        <span className="text-white/70">{value}</span>
      )}
    </div>
  );
}
