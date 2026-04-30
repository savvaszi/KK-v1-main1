import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowUpDown, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ASSETS = ["BTC","ETH","SOL","BNB","ADA","MATIC","AVAX","LINK","ATOM","ARB","AAVE","USDT","USDC"];

const ASSET_COLORS: Record<string, string> = {
  BTC:"#f7931a",ETH:"#627eea",SOL:"#9945ff",BNB:"#f3ba2f",ADA:"#0d1e7e",
  MATIC:"#8247e5",AVAX:"#e84142",LINK:"#2a5ada",ATOM:"#2e3148",ARB:"#28a0f0",
  AAVE:"#b6509e",USDT:"#26a17b",USDC:"#2775ca",
};

function AssetButton({ symbol, onClick }: { symbol: string; onClick: () => void }) {
  const color = ASSET_COLORS[symbol] ?? "#00ff9c";
  return (
    <button onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/40 border border-white/10 hover:border-white/20 transition-colors">
      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
        style={{ background:`${color}20`, color, border:`1px solid ${color}40` }}>
        {symbol.slice(0,2)}
      </div>
      <span className="text-sm font-semibold text-white">{symbol}</span>
    </button>
  );
}

function AssetPicker({ current, exclude, onSelect }: { current: string; exclude: string; onSelect: (s:string)=>void }) {
  return (
    <div className="grid grid-cols-4 gap-2 mt-2">
      {ASSETS.filter(a => a !== exclude).map(a => {
        const color = ASSET_COLORS[a] ?? "#00ff9c";
        return (
          <button key={a} onClick={() => onSelect(a)}
            className={`flex items-center gap-1.5 px-2 py-2 rounded-lg border transition-colors text-xs font-semibold ${
              a === current ? "border-primary/40 bg-primary/10 text-primary" : "border-white/10 text-muted-foreground hover:text-white hover:border-white/20"
            }`}>
            <div className="w-4 h-4 rounded-full shrink-0"
              style={{ background:`${color}30`, border:`1px solid ${color}60` }} />
            {a}
          </button>
        );
      })}
    </div>
  );
}

export default function SwapTab({ useApi }: { useApi: () => (path: string, opts?: RequestInit) => Promise<any> }) {
  const api = useApi();
  const [from, setFrom] = useState("ETH");
  const [to, setTo] = useState("USDT");
  const [fromAmount, setFromAmount] = useState("");
  const [quote, setQuote] = useState<any>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [balance, setBalance] = useState<any>(null);
  const [swapping, setSwapping] = useState(false);
  const [msg, setMsg] = useState<{text:string;ok:boolean}|null>(null);
  const [picker, setPicker] = useState<"from"|"to"|null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout>|null>(null);

  const fetchQuote = useCallback(async (f: string, t: string, amt: string) => {
    const n = parseFloat(amt);
    if (!n || n <= 0 || f === t) { setQuote(null); return; }
    setQuoteLoading(true);
    try {
      const d = await api(`/me/swaps/quote?from=${f}&to=${t}&amount=${n}`);
      setQuote(d);
    } catch { setQuote(null); }
    setQuoteLoading(false);
  }, [api]);

  const loadBalance = useCallback(async () => {
    try {
      const d = await api("/me/portfolio");
      if (d?.assets) {
        const found = d.assets.find((a:any) => a.symbol === from);
        setBalance(found ?? { symbol: from, amount: "0" });
      }
    } catch {}
  }, [api, from]);

  const loadHistory = useCallback(async () => {
    try {
      const d = await api("/me/swaps?limit=5");
      if (Array.isArray(d)) setHistory(d);
    } catch {}
  }, [api]);

  useEffect(() => { loadBalance(); loadHistory(); }, []);
  useEffect(() => { loadBalance(); }, [from]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchQuote(from, to, fromAmount), 600);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [from, to, fromAmount, fetchQuote]);

  const flip = () => { setFrom(to); setTo(from); setFromAmount(""); setQuote(null); };

  const setMax = () => {
    const bal = parseFloat(balance?.amount ?? "0");
    setFromAmount(bal.toFixed(8));
  };

  const executeSwap = async () => {
    if (!quote || !fromAmount) return;
    setSwapping(true); setMsg(null);
    try {
      await api("/me/swaps", {
        method: "POST",
        body: JSON.stringify({ from, to, fromAmount: parseFloat(fromAmount) }),
      });
      setMsg({ text: `Swapped ${fromAmount} ${from} → ${quote.toAmount.toFixed(6)} ${to} successfully!`, ok: true });
      setFromAmount(""); setQuote(null);
      await Promise.all([loadBalance(), loadHistory()]);
    } catch (err: any) {
      setMsg({ text: err.message, ok: false });
    }
    setSwapping(false);
  };

  const available = parseFloat(balance?.amount ?? "0");
  const fromNum = parseFloat(fromAmount) || 0;
  const insufficient = fromNum > available;

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Swap</h2>
        <p className="text-muted-foreground text-sm">Instantly swap between supported assets</p>
      </div>

      <div className="glass border border-white/10 rounded-xl p-6 space-y-3">
        {msg && (
          <Alert className={msg.ok ? "border-emerald-500/20 bg-emerald-500/10" : "border-red-500/20 bg-red-500/10"}>
            <AlertDescription className={msg.ok ? "text-emerald-400" : "text-red-400"}>{msg.text}</AlertDescription>
          </Alert>
        )}

        {/* FROM */}
        <div className="bg-black/30 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">From</span>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Balance: <span className="text-white font-medium">{available.toFixed(6)} {from}</span></span>
              <button onClick={setMax} className="text-primary hover:underline font-medium">MAX</button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Input type="number" step="any" placeholder="0.000000" value={fromAmount}
                onChange={e => setFromAmount(e.target.value)}
                className="bg-transparent border-none text-2xl font-bold text-white focus:ring-0 focus-visible:ring-0 px-0 h-auto" />
              {quote && (
                <p className="text-xs text-muted-foreground mt-1">
                  ≈ ${(fromNum * (quote.fromPriceUsd ?? 0)).toLocaleString("en-US",{maximumFractionDigits:2})}
                </p>
              )}
            </div>
            <AssetButton symbol={from} onClick={() => setPicker(p => p==="from" ? null : "from")} />
          </div>
          {picker === "from" && (
            <AssetPicker current={from} exclude={to} onSelect={s => { setFrom(s); setPicker(null); }} />
          )}
        </div>

        {/* Flip Button */}
        <div className="flex justify-center">
          <button onClick={flip}
            className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center hover:border-primary/40 hover:text-primary transition-colors text-muted-foreground">
            <ArrowUpDown className="w-4 h-4" />
          </button>
        </div>

        {/* TO */}
        <div className="bg-black/30 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">To</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              {quoteLoading ? (
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                <p className="text-2xl font-bold text-white">
                  {quote ? quote.toAmount.toFixed(6) : "0.000000"}
                </p>
              )}
              {quote && (
                <p className="text-xs text-muted-foreground mt-1">
                  ≈ ${(quote.toAmount * (quote.toPriceUsd ?? 0)).toLocaleString("en-US",{maximumFractionDigits:2})}
                </p>
              )}
            </div>
            <AssetButton symbol={to} onClick={() => setPicker(p => p==="to" ? null : "to")} />
          </div>
          {picker === "to" && (
            <AssetPicker current={to} exclude={from} onSelect={s => { setTo(s); setPicker(null); }} />
          )}
        </div>

        {/* Quote details */}
        {quote && (
          <div className="bg-black/20 rounded-lg p-3 space-y-1.5 text-xs">
            <div className="flex justify-between text-muted-foreground">
              <span>Rate</span>
              <span className="text-white">1 {from} = {quote.rate.toFixed(6)} {to}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Fee (0.1%)</span>
              <span className="text-white">{quote.fee.toFixed(8)} {from}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>You receive</span>
              <span className="text-emerald-400 font-semibold">{quote.toAmount.toFixed(6)} {to}</span>
            </div>
          </div>
        )}

        {insufficient && fromNum > 0 && (
          <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            Insufficient {from} balance
          </div>
        )}

        <Button onClick={executeSwap} disabled={swapping || !quote || !fromAmount || insufficient}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12 text-base">
          {swapping ? (
            <><RefreshCw className="w-4 h-4 mr-2 animate-spin" />Swapping…</>
          ) : !fromAmount ? "Enter amount" : insufficient ? "Insufficient balance" : !quote ? "Getting rate…" : `Swap ${from} → ${to}`}
        </Button>
      </div>

      {/* Swap History */}
      {history.length > 0 && (
        <div className="glass border border-white/10 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-white/5">
            <h3 className="text-sm font-semibold text-white">Recent Swaps</h3>
          </div>
          {history.map((tx: any) => (
            <div key={tx.id} className="flex items-center justify-between px-5 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
              <div>
                <p className="text-sm font-medium text-white">
                  {parseFloat(tx.fromAmount).toFixed(6)} {tx.fromAsset} → {parseFloat(tx.toAmount).toFixed(6)} {tx.toAsset}
                </p>
                <p className="text-xs text-muted-foreground">{new Date(tx.createdAt).toLocaleString()}</p>
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                tx.status === "completed" ? "text-emerald-400 bg-emerald-500/10" : "text-amber-400 bg-amber-500/10"
              }`}>{tx.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
