import { useState, useEffect } from "react";
import { Link } from "wouter";

const STORAGE_KEY = "kk_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6">
      <div className="max-w-4xl mx-auto glass border border-white/10 rounded-2xl px-6 py-4 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-white font-medium mb-0.5">We use cookies</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            We use cookies to enhance your experience and analyse site traffic. By accepting, you agree to our{" "}
            <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link>
            {" "}and{" "}
            <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg shadow-[0_0_12px_rgba(0,255,156,0.3)] hover:shadow-[0_0_20px_rgba(0,255,156,0.5)] transition-all"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
