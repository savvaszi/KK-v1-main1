import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const API = "https://api.krypto-knight.com";
const PAIRS = ["BTC","ETH","SOL","BNB","ADA","MATIC","AVAX","LINK","USDT","USDC"];

interface PriceTick {
  symbol: string;
  price: number;
  change24h: number;
}

export default function LiveTicker() {
  const [ticks, setTicks] = useState<PriceTick[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchPrices = async () => {
    try {
      const res = await fetch(`${API}/public/market/prices`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        const filtered = (data.data as any[])
          .filter(d => PAIRS.includes(d.symbol))
          .map(d => ({ symbol: d.symbol, price: d.price ?? 0, change24h: d.change24h ?? 0 }));
        setTicks(filtered);
      }
    } catch {/* silent */}
  };

  useEffect(() => {
    fetchPrices();
    intervalRef.current = setInterval(fetchPrices, 30_000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  if (ticks.length === 0) return null;

  // Duplicate for seamless loop
  const items = [...ticks, ...ticks];

  return (
    <div className="w-full overflow-hidden bg-black/40 border-b border-white/5 py-1.5">
      <div className="flex gap-8 animate-ticker whitespace-nowrap" style={{ width: "max-content" }}>
        {items.map((t, i) => (
          <div key={i} className="flex items-center gap-2 text-xs shrink-0">
            <span className="font-semibold text-white">{t.symbol}</span>
            <span className="text-muted-foreground">${t.price < 1 ? t.price.toFixed(4) : t.price.toLocaleString("en-US", { maximumFractionDigits: 2 })}</span>
            <span className={`flex items-center gap-0.5 font-medium ${t.change24h >= 0 ? "text-emerald-400" : "text-red-400"}`}>
              {t.change24h >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {Math.abs(t.change24h).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
