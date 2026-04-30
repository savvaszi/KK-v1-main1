import { useState, useEffect, useCallback, useRef } from "react";
import {
  ComposedChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Cell,
} from "recharts";
import { ChevronDown, ArrowUpRight, ArrowDownRight, Trash2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

const API = "https://api.krypto-knight.com";
const PAIRS = [
  "BTC/USDT","ETH/USDT","SOL/USDT","BNB/USDT","ADA/USDT",
  "MATIC/USDT","AVAX/USDT","LINK/USDT","ATOM/USDT","ARB/USDT",
  "AAVE/USDT","ETH/BTC","SOL/BTC",
];
const INTERVALS = ["1H","4H","1D"] as const;

function fmtPrice(n: number) {
  if (n > 1000) return n.toLocaleString("en-US",{maximumFractionDigits:2});
  if (n > 1) return n.toFixed(4);
  return n.toFixed(6);
}

// Custom candlestick bar shape for recharts ComposedChart
const CandleShape = (props: any) => {
  const { x, y, width, height, payload } = props;
  if (!payload) return null;
  const green = payload.close >= payload.open;
  const color = green ? "#00ff9c" : "#ef4444";
  const bodyTop = Math.min(props.y, props.y + props.height);
  const bodyH = Math.abs(props.height);
  // wick
  const wickX = x + width / 2;
  const highY = props.background?.y ?? 0;
  return (
    <g>
      <line x1={wickX} x2={wickX} y1={payload._highY ?? y} y2={payload._lowY ?? y+height} stroke={color} strokeWidth={1} />
      <rect x={x+1} y={bodyTop} width={Math.max(width-2,1)} height={Math.max(bodyH,1)} fill={color} rx={1} />
    </g>
  );
};

export default function ExchangeTab({ useApi }: { useApi: () => (path: string, opts?: RequestInit) => Promise<any> }) {
  const api = useApi();
  const [pair, setPair] = useState("ETH/USDT");
  const [interval, setInterval] = useState<"1H"|"4H"|"1D">("1H");
  const [ticker, setTicker] = useState<any>(null);
  const [candles, setCandles] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [orderTab, setOrderTab] = useState<"open"|"history">("open");
  const [orderType, setOrderType] = useState<"limit"|"market">("limit");
  const [side, setSide] = useState<"buy"|"sell">("buy");
  const [form, setForm] = useState({ price: "", amount: "" });
  const [pctAmt, setPctAmt] = useState(0);
  const [balance, setBalance] = useState<any>(null);
  const [placing, setPlacing] = useState(false);
  const [msg, setMsg] = useState("");
  const [pairOpen, setPairOpen] = useState(false);
  const [loadingCandles, setLoadingCandles] = useState(false);
  const tickerRef = useRef<ReturnType<typeof setInterval>|null>(null);

  const [base, quote] = pair.split("/");

  const loadTicker = useCallback(async () => {
    try {
      const res = await fetch(`${API}/public/market/ticker/${base}`);
      const d = await res.json();
      if (d.success) setTicker(d.data);
    } catch {}
  }, [base]);

  const loadCandles = useCallback(async () => {
    setLoadingCandles(true);
    try {
      const res = await fetch(`${API}/public/market/candles/${base}?interval=${interval}`);
      const d = await res.json();
      if (d.success && Array.isArray(d.data)) {
        // Build chart-friendly data; compute pixel positions via value domain
        const raw = d.data as { time:number; open:number; high:number; low:number; close:number }[];
        // For ComposedChart we use Bar with custom shape; values = [low, high] range
        const allVals = raw.flatMap(c=>[c.low,c.high]);
        const domainMin = Math.min(...allVals);
        const domainMax = Math.max(...allVals);
        setCandles(raw.map(c => ({
          ...c,
          bodyLow: Math.min(c.open, c.close),
          bodyHigh: Math.max(c.open, c.close),
          bodyRange: [Math.min(c.open, c.close), Math.max(c.open, c.close)],
          wickRange: [c.low, c.high],
          label: new Date(c.time).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),
          _domainMin: domainMin,
          _domainMax: domainMax,
        })));
      }
    } catch {}
    setLoadingCandles(false);
  }, [base, interval]);

  const loadOrders = useCallback(async () => {
    try {
      const d = await api(`/me/orders?status=${orderTab === "open" ? "open" : "all"}&limit=20`);
      if (Array.isArray(d)) setOrders(d);
    } catch {}
  }, [api, orderTab]);

  const loadBalance = useCallback(async () => {
    try {
      const d = await api("/me/portfolio");
      if (d?.assets) {
        const spendAsset = side === "buy" ? quote : base;
        const found = d.assets.find((a:any) => a.symbol === spendAsset);
        setBalance(found ?? { symbol: spendAsset, amount: "0", usdValue: 0 });
      }
    } catch {}
  }, [api, side, base, quote]);

  useEffect(() => { loadTicker(); loadCandles(); loadOrders(); loadBalance(); }, [pair, interval]);
  useEffect(() => { loadBalance(); }, [side]);
  useEffect(() => {
    tickerRef.current = setInterval(loadTicker, 15_000);
    return () => { if (tickerRef.current) clearInterval(tickerRef.current); };
  }, [loadTicker]);

  const handlePct = (pct: number) => {
    setPctAmt(pct);
    const bal = parseFloat(balance?.amount ?? "0");
    const price = parseFloat(form.price || ticker?.price || "0");
    if (side === "buy" && price > 0) {
      const spend = bal * (pct/100);
      setForm(f => ({ ...f, amount: (spend/price).toFixed(6) }));
    } else if (side === "sell") {
      setForm(f => ({ ...f, amount: (bal*(pct/100)).toFixed(6) }));
    }
  };

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(""); setPlacing(true);
    try {
      await api("/me/orders", {
        method: "POST",
        body: JSON.stringify({
          pair,
          side,
          orderType,
          price: orderType === "limit" ? parseFloat(form.price) : undefined,
          amount: parseFloat(form.amount),
        }),
      });
      setMsg(`${side.toUpperCase()} order placed!`);
      setForm({ price: "", amount: "" }); setPctAmt(0);
      await Promise.all([loadOrders(), loadBalance()]);
    } catch (err: any) { setMsg(err.message); }
    setPlacing(false);
  };

  const cancelOrder = async (id: string) => {
    try { await api(`/me/orders/${id}`, { method: "DELETE" }); await loadOrders(); }
    catch (err: any) { alert(err.message); }
  };

  const change24h = ticker?.change24h ?? 0;
  const isUp = change24h >= 0;

  return (
    <div className="space-y-4">
      {/* Header: pair selector + stats */}
      <div className="glass border border-white/10 rounded-xl p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Pair Selector */}
          <div className="relative">
            <button onClick={() => setPairOpen(o=>!o)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                {base.slice(0,2)}
              </div>
              <div className="text-left">
                <p className="font-bold text-white leading-none flex items-center gap-1">
                  {pair} <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </p>
                <p className="text-xs text-primary mt-0.5">{base}</p>
              </div>
            </button>
            {pairOpen && (
              <div className="absolute top-full left-0 mt-1 z-50 glass border border-white/10 rounded-xl overflow-hidden w-48">
                {PAIRS.map(p => (
                  <button key={p} onClick={() => { setPair(p); setPairOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors ${p===pair ? "text-primary" : "text-white"}`}>
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex gap-6 overflow-x-auto">
            <div>
              <p className="text-xs text-muted-foreground">Price</p>
              <p className={`font-semibold ${isUp ? "text-emerald-400" : "text-red-400"}`}>
                {ticker ? fmtPrice(ticker.price) : "—"}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">24h Change</p>
              <p className={`font-semibold flex items-center gap-0.5 ${isUp ? "text-emerald-400" : "text-red-400"}`}>
                {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {isUp ? "+" : ""}{change24h.toFixed(2)}%
              </p>
            </div>
            <div className="hidden sm:block">
              <p className="text-xs text-muted-foreground">24h High</p>
              <p className="font-medium text-white">{ticker ? fmtPrice(ticker.high24h) : "—"}</p>
            </div>
            <div className="hidden sm:block">
              <p className="text-xs text-muted-foreground">24h Low</p>
              <p className="font-medium text-white">{ticker ? fmtPrice(ticker.low24h) : "—"}</p>
            </div>
            <div className="hidden lg:block">
              <p className="text-xs text-muted-foreground">Volume</p>
              <p className="font-medium text-white">
                {ticker ? `$${(ticker.volume24h/1e6).toFixed(1)}M` : "—"}
              </p>
            </div>
          </div>
          <Button size="sm" variant="ghost" className="text-muted-foreground" onClick={() => { loadTicker(); loadCandles(); }}>
            <RefreshCw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart */}
        <div className="lg:col-span-2 glass border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            {INTERVALS.map(iv => (
              <Button key={iv} size="sm" variant={interval===iv ? "default" : "ghost"}
                className={`h-7 px-3 text-xs ${interval===iv ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-white"}`}
                onClick={() => setInterval(iv)}>
                {iv}
              </Button>
            ))}
          </div>
          {loadingCandles ? (
            <div className="flex items-center justify-center h-56">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : candles.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={candles} margin={{ top:4, right:4, left:0, bottom:0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="label" axisLine={false} tickLine={false}
                    tick={{ fontSize:10, fill:"hsl(var(--muted-foreground))" }}
                    interval={Math.floor(candles.length/6)} dy={6} />
                  <YAxis axisLine={false} tickLine={false}
                    tick={{ fontSize:10, fill:"hsl(var(--muted-foreground))" }}
                    tickFormatter={v => fmtPrice(v)} width={62}
                    domain={["auto","auto"]} />
                  <Tooltip
                    contentStyle={{ background:"rgba(10,12,20,0.95)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, fontSize:12 }}
                    content={({ payload }) => {
                      if (!payload?.length) return null;
                      const d = payload[0]?.payload;
                      if (!d) return null;
                      const g = d.close >= d.open;
                      return (
                        <div className="p-3 text-xs space-y-1">
                          <p className="text-muted-foreground">{d.label}</p>
                          <p><span className="text-muted-foreground mr-2">O</span><span className={g?"text-emerald-400":"text-red-400"}>{fmtPrice(d.open)}</span></p>
                          <p><span className="text-muted-foreground mr-2">H</span><span className="text-white">{fmtPrice(d.high)}</span></p>
                          <p><span className="text-muted-foreground mr-2">L</span><span className="text-white">{fmtPrice(d.low)}</span></p>
                          <p><span className="text-muted-foreground mr-2">C</span><span className={g?"text-emerald-400":"text-red-400"}>{fmtPrice(d.close)}</span></p>
                        </div>
                      );
                    }}
                  />
                  {/* Wick bars (full high-low range) */}
                  <Bar dataKey="wickRange" stackId="w" shape={(props: any) => {
                    const { x, width, y, height, payload } = props;
                    if (!payload) return null;
                    const green = payload.close >= payload.open;
                    const color = green ? "#00ff9c" : "#ef4444";
                    const cx = x + width / 2;
                    return <line x1={cx} x2={cx} y1={y} y2={y+height} stroke={color} strokeWidth={1} />;
                  }} fill="transparent" />
                  {/* Body bars */}
                  <Bar dataKey="bodyRange" stackId="b" shape={(props: any) => {
                    const { x, width, y, height, payload } = props;
                    if (!payload || height === undefined) return null;
                    const green = payload.close >= payload.open;
                    const color = green ? "#00ff9c" : "#ef4444";
                    return <rect x={x+1} y={y} width={Math.max(width-2,2)} height={Math.max(Math.abs(height),2)} fill={color} rx={1} />;
                  }} fill="transparent" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-sm text-muted-foreground">
              Chart data unavailable
            </div>
          )}
        </div>

        {/* Order Form */}
        <div className="glass border border-white/10 rounded-xl p-5">
          {/* Buy / Sell */}
          <div className="flex gap-1 mb-4 p-1 bg-black/30 rounded-lg">
            {(["buy","sell"] as const).map(s => (
              <button key={s} onClick={() => setSide(s)}
                className={`flex-1 py-2 rounded-md text-sm font-semibold transition-colors capitalize ${
                  side===s
                    ? s==="buy" ? "bg-emerald-500 text-black" : "bg-red-500 text-white"
                    : "text-muted-foreground hover:text-white"
                }`}>
                {s}
              </button>
            ))}
          </div>

          {/* Limit / Market */}
          <div className="flex gap-1 mb-4">
            {(["limit","market"] as const).map(o => (
              <button key={o} onClick={() => setOrderType(o)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors capitalize border ${
                  orderType===o ? "border-primary/40 text-primary bg-primary/10" : "border-white/10 text-muted-foreground hover:text-white"
                }`}>
                {o}
              </button>
            ))}
          </div>

          {msg && (
            <div className={`mb-3 p-2.5 rounded-lg text-xs font-medium ${msg.includes("placed") ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
              {msg}
            </div>
          )}

          <form onSubmit={placeOrder} className="space-y-3">
            {orderType === "limit" && (
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">Price ({quote})</Label>
                <Input type="number" step="any" placeholder={ticker ? fmtPrice(ticker.price) : "0.00"}
                  value={form.price} onChange={e => setForm(f => ({...f, price: e.target.value}))}
                  className="bg-black/30 border-white/10 text-white focus:border-primary text-sm" required />
              </div>
            )}
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">Amount ({base})</Label>
              <Input type="number" step="any" placeholder="0.00000"
                value={form.amount} onChange={e => setForm(f => ({...f, amount: e.target.value}))}
                className="bg-black/30 border-white/10 text-white focus:border-primary text-sm" required />
            </div>

            {/* % Slider */}
            <div className="flex gap-1">
              {[25,50,75,100].map(pct => (
                <button key={pct} type="button" onClick={() => handlePct(pct)}
                  className={`flex-1 py-1 text-xs rounded-md transition-colors border ${
                    pctAmt===pct ? "border-primary/40 text-primary bg-primary/10" : "border-white/10 text-muted-foreground hover:text-white"
                  }`}>
                  {pct}%
                </button>
              ))}
            </div>

            {/* Balance */}
            {balance && (
              <p className="text-xs text-muted-foreground">
                Available: <span className="text-white font-medium">
                  {parseFloat(balance.amount).toFixed(6)} {balance.symbol}
                </span>
              </p>
            )}

            {/* Total estimate */}
            {form.amount && (orderType === "market" ? ticker?.price : form.price) && (
              <p className="text-xs text-muted-foreground">
                Total ≈ <span className="text-white font-medium">
                  {(parseFloat(form.amount) * parseFloat(orderType==="market" ? ticker?.price ?? "0" : form.price)).toFixed(2)} {quote}
                </span>
              </p>
            )}

            <Button type="submit" disabled={placing}
              className={`w-full font-semibold ${side==="buy" ? "bg-emerald-500 hover:bg-emerald-600 text-black" : "bg-red-500 hover:bg-red-600 text-white"}`}>
              {placing ? "Placing…" : `${side === "buy" ? "Buy" : "Sell"} ${base}`}
            </Button>
          </form>
        </div>
      </div>

      {/* Orders Panel */}
      <div className="glass border border-white/10 rounded-xl overflow-hidden">
        <div className="flex items-center gap-1 px-5 py-3 border-b border-white/5">
          {(["open","history"] as const).map(t => (
            <button key={t} onClick={() => setOrderTab(t)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors capitalize ${
                orderTab===t ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:text-white"
              }`}>
              {t === "open" ? "Open Orders" : "Order History"}
            </button>
          ))}
          <button onClick={loadOrders} className="ml-auto text-muted-foreground hover:text-primary transition-colors">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
        {orders.length === 0 ? (
          <div className="p-6 text-center text-sm text-muted-foreground">No orders yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-muted-foreground border-b border-white/5">
                  <th className="px-5 py-2 text-left font-medium">Pair</th>
                  <th className="px-3 py-2 text-left font-medium">Side</th>
                  <th className="px-3 py-2 text-left font-medium">Type</th>
                  <th className="px-3 py-2 text-right font-medium">Price</th>
                  <th className="px-3 py-2 text-right font-medium">Amount</th>
                  <th className="px-3 py-2 text-right font-medium">Filled</th>
                  <th className="px-3 py-2 text-right font-medium">Status</th>
                  {orderTab === "open" && <th className="px-3 py-2" />}
                </tr>
              </thead>
              <tbody>
                {orders.map((o: any) => (
                  <tr key={o.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3 font-medium text-white">{o.pair}</td>
                    <td className="px-3 py-3">
                      <span className={`font-semibold ${o.side==="buy" ? "text-emerald-400" : "text-red-400"}`}>
                        {o.side?.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-muted-foreground capitalize">{o.orderType}</td>
                    <td className="px-3 py-3 text-right text-white">{o.price ? fmtPrice(parseFloat(o.price)) : "Market"}</td>
                    <td className="px-3 py-3 text-right text-white">{parseFloat(o.amount).toFixed(6)}</td>
                    <td className="px-3 py-3 text-right text-white">{parseFloat(o.filled||"0").toFixed(6)}</td>
                    <td className="px-3 py-3 text-right">
                      <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                        o.status==="filled" ? "text-emerald-400 bg-emerald-500/10" :
                        o.status==="open" ? "text-primary bg-primary/10" :
                        o.status==="cancelled" ? "text-muted-foreground bg-white/5" :
                        "text-amber-400 bg-amber-500/10"
                      }`}>{o.status}</span>
                    </td>
                    {orderTab==="open" && (
                      <td className="px-3 py-3">
                        {(o.status==="open"||o.status==="partial") && (
                          <button onClick={() => cancelOrder(o.id)} className="text-red-400 hover:text-red-300 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
