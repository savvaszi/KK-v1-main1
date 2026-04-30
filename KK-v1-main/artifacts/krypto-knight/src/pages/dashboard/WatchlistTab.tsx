import { useState, useEffect, useCallback } from "react";
import { Star, ArrowUpRight, ArrowDownRight, Search, Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const API = "https://api.krypto-knight.com";
const ALL_ASSETS = ["BTC","ETH","SOL","BNB","ADA","MATIC","AVAX","LINK","ATOM","ARB","AAVE","USDT","USDC"];

const ASSET_COLORS: Record<string, string> = {
  BTC:"#f7931a",ETH:"#627eea",SOL:"#9945ff",BNB:"#f3ba2f",ADA:"#0d1e7e",
  MATIC:"#8247e5",AVAX:"#e84142",LINK:"#2a5ada",ATOM:"#2e3148",ARB:"#28a0f0",
  AAVE:"#b6509e",USDT:"#26a17b",USDC:"#2775ca",
};

function fmtPrice(n: number) {
  if (!n) return "—";
  if (n > 1000) return `$${n.toLocaleString("en-US",{maximumFractionDigits:2})}`;
  if (n > 1) return `$${n.toFixed(4)}`;
  return `$${n.toFixed(6)}`;
}

function fmtLarge(n: number) {
  if (!n) return "—";
  if (n >= 1e9) return `$${(n/1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n/1e6).toFixed(2)}M`;
  return `$${n.toLocaleString("en-US",{maximumFractionDigits:0})}`;
}

export default function WatchlistTab({ useApi }: { useApi: () => (path: string, opts?: RequestInit) => Promise<any> }) {
  const api = useApi();
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [prices, setPrices] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [adding, setAdding] = useState<string|null>(null);
  const [removing, setRemoving] = useState<string|null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const loadWatchlist = useCallback(async () => {
    try {
      const d = await api("/me/watchlist");
      if (Array.isArray(d)) setWatchlist(d);
    } catch {}
  }, [api]);

  const loadPrices = useCallback(async () => {
    try {
      const res = await fetch(`${API}/public/market/prices`);
      const d = await res.json();
      if (d.success && Array.isArray(d.data)) {
        const map: Record<string, any> = {};
        for (const item of d.data) map[item.symbol] = item;
        setPrices(map);
      }
    } catch {}
  }, []);

  useEffect(() => {
    setLoading(true);
    Promise.allSettled([loadWatchlist(), loadPrices()]).finally(() => setLoading(false));
    // Refresh prices every 30s
    const iv = setInterval(loadPrices, 30_000);
    return () => clearInterval(iv);
  }, []);

  const addToWatchlist = async (symbol: string) => {
    setAdding(symbol);
    try {
      await api(`/me/watchlist/${symbol}`, { method: "PUT" });
      setWatchlist(w => w.includes(symbol) ? w : [...w, symbol]);
    } catch {}
    setAdding(null);
  };

  const removeFromWatchlist = async (symbol: string) => {
    setRemoving(symbol);
    try {
      await api(`/me/watchlist/${symbol}`, { method: "DELETE" });
      setWatchlist(w => w.filter(s => s !== symbol));
    } catch {}
    setRemoving(null);
  };

  const notWatched = ALL_ASSETS.filter(a => !watchlist.includes(a));
  const filtered = search
    ? watchlist.filter(s => s.toLowerCase().includes(search.toLowerCase()))
    : watchlist;

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Watchlist</h2>
          <p className="text-muted-foreground text-sm">Track your favourite assets</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" className="text-muted-foreground" onClick={() => { loadWatchlist(); loadPrices(); }}>
            <RefreshCw className="w-3.5 h-3.5" />
          </Button>
          <Button size="sm" className="bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20"
            onClick={() => setShowAdd(s => !s)}>
            <Plus className="w-3.5 h-3.5 mr-1" />Add Asset
          </Button>
        </div>
      </div>

      {/* Add asset panel */}
      {showAdd && (
        <div className="glass border border-white/10 rounded-xl p-5">
          <p className="text-sm font-semibold text-white mb-3">Add to Watchlist</p>
          <div className="flex flex-wrap gap-2">
            {notWatched.map(a => {
              const color = ASSET_COLORS[a] ?? "#00ff9c";
              return (
                <button key={a} disabled={adding === a}
                  onClick={() => addToWatchlist(a)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-semibold text-muted-foreground hover:text-white hover:border-white/20 transition-colors disabled:opacity-50">
                  <div className="w-3.5 h-3.5 rounded-full shrink-0" style={{ background:`${color}40`, border:`1px solid ${color}70` }} />
                  {adding === a ? "Adding…" : a}
                </button>
              );
            })}
            {notWatched.length === 0 && (
              <p className="text-sm text-muted-foreground">All supported assets are in your watchlist!</p>
            )}
          </div>
        </div>
      )}

      {/* Search */}
      {watchlist.length > 3 && (
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search watchlist…"
            className="pl-9 bg-black/30 border-white/10 text-white focus:border-primary" />
        </div>
      )}

      {/* Watchlist table */}
      {filtered.length === 0 ? (
        <div className="glass border border-white/10 rounded-xl p-12 text-center">
          <Star className="w-10 h-10 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-white font-semibold mb-2">
            {watchlist.length === 0 ? "Your watchlist is empty" : "No assets match your search"}
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            {watchlist.length === 0 ? "Add assets to track their prices in real time." : "Try a different search term."}
          </p>
          {watchlist.length === 0 && (
            <Button size="sm" onClick={() => setShowAdd(true)} className="bg-primary text-primary-foreground">
              <Plus className="w-3.5 h-3.5 mr-1" />Add your first asset
            </Button>
          )}
        </div>
      ) : (
        <div className="glass border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-xs text-muted-foreground">
                  <th className="px-5 py-3 text-left font-medium w-10"></th>
                  <th className="px-4 py-3 text-left font-medium">Asset</th>
                  <th className="px-4 py-3 text-right font-medium">Price</th>
                  <th className="px-4 py-3 text-right font-medium">24h Change</th>
                  <th className="px-4 py-3 text-right font-medium hidden sm:table-cell">24h High</th>
                  <th className="px-4 py-3 text-right font-medium hidden sm:table-cell">24h Low</th>
                  <th className="px-4 py-3 text-right font-medium hidden lg:table-cell">Volume</th>
                  <th className="px-4 py-3 text-right font-medium hidden lg:table-cell">Market Cap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((symbol: string) => {
                  const color = ASSET_COLORS[symbol] ?? "#00ff9c";
                  const p = prices[symbol];
                  const change = p?.change24h ?? 0;
                  const up = change >= 0;
                  return (
                    <tr key={symbol} className="hover:bg-white/5 transition-colors">
                      <td className="px-5 py-4">
                        <button
                          onClick={() => removeFromWatchlist(symbol)}
                          disabled={removing === symbol}
                          className="text-amber-400 hover:text-amber-300 transition-colors disabled:opacity-50"
                          title="Remove from watchlist">
                          <Star className="w-4 h-4 fill-amber-400" />
                        </button>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                            style={{ background:`${color}20`, color, border:`1px solid ${color}40` }}>
                            {symbol.slice(0,3)}
                          </div>
                          <div>
                            <p className="font-semibold text-white">{symbol}</p>
                            <p className="text-xs text-muted-foreground">{p?.name ?? ""}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right font-semibold text-white">
                        {p ? fmtPrice(p.price) : <span className="text-muted-foreground">Loading…</span>}
                      </td>
                      <td className="px-4 py-4 text-right">
                        {p ? (
                          <span className={`flex items-center justify-end gap-0.5 font-semibold ${up ? "text-emerald-400" : "text-red-400"}`}>
                            {up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                            {up ? "+" : ""}{change.toFixed(2)}%
                          </span>
                        ) : "—"}
                      </td>
                      <td className="px-4 py-4 text-right text-muted-foreground hidden sm:table-cell">
                        {p ? fmtPrice(p.high24h) : "—"}
                      </td>
                      <td className="px-4 py-4 text-right text-muted-foreground hidden sm:table-cell">
                        {p ? fmtPrice(p.low24h) : "—"}
                      </td>
                      <td className="px-4 py-4 text-right text-muted-foreground hidden lg:table-cell">
                        {p ? fmtLarge(p.volume24h) : "—"}
                      </td>
                      <td className="px-4 py-4 text-right text-muted-foreground hidden lg:table-cell">
                        {p ? fmtLarge(p.marketCap) : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
