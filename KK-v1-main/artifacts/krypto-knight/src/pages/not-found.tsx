import { Link } from "wouter";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <div className="text-8xl font-extrabold text-primary/20 mb-4 select-none">404</div>
          <h1 className="text-3xl font-bold text-white mb-3">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-xl border border-white/10 text-muted-foreground font-semibold text-sm hover:text-white hover:border-white/20 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
