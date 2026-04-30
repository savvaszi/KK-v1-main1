import { useState, useEffect, useCallback } from "react";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis,
  Tooltip, CartesianGrid,
} from "recharts";
import { ArrowUpRight, ArrowDownRight, ArrowRightLeft, Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const API = "https://api.krypto-knight.com";
const RANGES = ["1D","7D","1M","6M","1Y"] as const;
type Range = typeof RANGES[number];

const ASSET_COLORS: Record<string, string> = {
  BTC:"#f7931a", ETH:"#627eea", SOL:"#9945ff", BNB:"#f3ba2f",
  ADA:"#0d1e7e", MATIC:"#8247e5", AVAX:"#e84142", LINK:"#2a5ada",
  ATOM:"#2e3148", ARB:"#28a0f0", AAVE:"#b6509e", USDT:"#26a17b", USDC:"#2775ca",
};

function fmtUsd(n: number) {
  if (n >= 1e9) return `$${(n/1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n/1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${n.toLocaleString("en-US",{maximumFractionDigits:2})}`;
  return `$${n.toFixed(2)}`;
}

function fmtTime(ts: number, range: Range) {
  const d = new Date(ts);
  if (range === "1D") return d.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"});
  if (range === "7D") return d.toLocaleDateString("en-US",{month:"short",day:"numeric"});
  return d.toLocaleDateString("en-US",{month:"short",day:"numeric"});
}

export default function PortfolioTab({ useApi }: { useApi: () => (path: string, opts?: RequestInit) => Promise<any> }) {
  const api = useApi();
  const [range, setRange] = useState<Range>("1M");
  const [portfolio, setPortfolio] = useState<any>(null);
  const [chart, setChart] = useState<any[]>([]);
  const [txs, setTxs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(false);

  const loadPortfolio = useCallback(async () => {
    setLoading(true);
    try {
      const [port, txData] = await Promise.allSettled([
        api("/me/portfolio"),
        api("/me/transactions?limit=5"),
      ]);
      if (port.status === "fulfilled" && port.value) setPortfolio(port.value);
      if (txData.status === "fulfilled" && Array.isArray(txData.value)) setTxs(txData.value);
    } catch {}
    setLoading(false);
  }, [api]);

  const loadChart = useCallback(async (r: Range) => {
    setChartLoading(true);
    try {
      const data = await api(`/me/portfolio/chart?range=${r}`);
      if (data?.points) {
        setChart(data.points.map((p: any) => ({ time: p.time, value: p.value, label: fmtTime(p.time, r) })));
      }
    } catch {}
    setChartLoading(false);
  }, [api]);

  useEffect(() => { loadPortfolio(); }, [loadPortfolio]);
  useEffect(() => { loadChart(range); }, [range, loadChart]);

  const totalUsd = portfolio?.totalUsd ?? 0;
  const assets: any[] = portfolio?.assets ?? [];
  const nonZero = assets.filter(a => parseFloat(a.amount) > 0);
  const topAssets = [...assets].sort((a,b) => b.usdValue - a.usdValue).slice(0,6);

  // Compute chart change
  const chartFirst = chart[0]?.value ?? 0;
  const chartLast = chart[chart.length-1]?.value ?? 0;
  const chartChange = chartFirst > 0 ? ((chartLast - chartFirst)/chartFirst)*100 : 0;
  const chartUp = chartChange >= 0;

  const txIcon = (type: string) => {
    if (type === "swap") return <ArrowRightLeft className="w-4 h-4 text-foreground" />;
    if (type === "receive" || type === "deposit") return <ArrowDownRight className="w-4 h-4 text-emerald-400" />;
    return <ArrowUpRight className="w-4 h-4 text-blue-400" />;
  };
  const txBg = (type: string) => {
    if (type === "swap") return "bg-secondary";
    if (type === "receive" || type === "deposit") return "bg-emerald-500/20";
    return "bg-blue-500/20";
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Portfolio</h2>
          <p className="text-muted-foreground text-sm">Your live holdings and performance</p>
        </div>
        <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-white" onClick={loadPortfolio}>
          <RefreshCw className="w-4 h-4 mr-1" /> Refresh
        </Button>
      </div>

      {/* Main Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Chart */}
        <div className="lg:col-span-2 glass border border-white/10 rounded-xl p-6 flex flex-col">
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-1">Total Portfolio Value</p>
            <div className="flex items-baseline gap-3">
              <h2 className="text-4xl font-bold text-white">{fmtUsd(totalUsd)}</h2>
              {chart.length > 1 && (
                <span className={`flex items-center text-sm font-medium px-2 py-0.5 rounded-md ${chartUp ? "text-emerald-400 bg-emerald-500/10" : "text-red-400 bg-red-500/10"}`}>
                  {chartUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                  {chartUp ? "+" : ""}{chartChange.toFixed(2)}%
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-1.5 mb-4">
            {RANGES.map(r => (
              <Button key={r} size="sm" variant={range === r ? "default" : "outline"}
                className={`h-7 px-3 text-xs rounded-full ${range === r ? "bg-primary text-primary-foreground" : "bg-transparent border-white/10 text-muted-foreground hover:text-white"}`}
                onClick={() => setRange(r)}>
                {r}
              </Button>
            ))}
          </div>

          <div className="flex-1 min-h-[220px]">
            {chartLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : chart.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chart} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#00ff9c" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#00ff9c" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="label" axisLine={false} tickLine={false}
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} dy={8} interval="preserveStartEnd" />
                  <YAxis axisLine={false} tickLine={false}
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    tickFormatter={v => `$${(v/1000).toFixed(0)}k`} width={52} />
                  <Tooltip
                    contentStyle={{ background:"rgba(10,12,20,0.95)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8 }}
                    labelStyle={{ color:"hsl(var(--muted-foreground))", fontSize:11 }}
                    formatter={(v: number) => [fmtUsd(v), "Value"]}
                    labelFormatter={(_l, payload) => payload?.[0]?.payload?.label ?? ""}
                  />
                  <Area type="monotone" dataKey="value" stroke="#00ff9c" strokeWidth={2} fillOpacity={1} fill="url(#chartGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                No chart data — make some trades to start tracking!
              </div>
            )}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="glass border border-white/10 rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-white">Recent Activity</h3>
          </div>
          {txs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No transactions yet.</p>
          ) : (
            <div className="space-y-3">
              {txs.map((tx: any) => (
                <div key={tx.id} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${txBg(tx.type)}`}>
                      {txIcon(tx.type)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white capitalize">{tx.type}</p>
                      <p className="text-xs text-muted-foreground">
                        {tx.fromAsset}{tx.toAsset && tx.toAsset !== tx.fromAsset ? ` → ${tx.toAsset}` : ""}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">
                      {parseFloat(tx.fromAmount || "0").toFixed(4)} {tx.fromAsset}
                    </p>
                    <div className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                      {tx.status === "pending" && <Clock className="w-3 h-3 text-amber-400" />}
                      <span className={tx.status === "completed" ? "text-emerald-400" : tx.status === "failed" ? "text-red-400" : "text-amber-400"}>
                        {tx.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Asset Breakdown */}
      <div className="glass border border-white/10 rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Asset Breakdown</h3>
          <span className="text-xs text-muted-foreground">{nonZero.length} assets held</span>
        </div>
        {topAssets.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            No balances yet. Make a deposit or swap to get started.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {topAssets.map((a: any) => {
              const pct = totalUsd > 0 ? (a.usdValue / totalUsd) * 100 : 0;
              const color = ASSET_COLORS[a.symbol] ?? "#00ff9c";
              return (
                <div key={a.symbol} className="flex items-center px-5 py-3 hover:bg-white/5 transition-colors">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mr-3 shrink-0"
                    style={{ background:`${color}20`, color, border:`1px solid ${color}40` }}>
                    {a.symbol.slice(0,3)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-white">{a.symbol}</span>
                      <span className="text-sm font-semibold text-white">{fmtUsd(a.usdValue)}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{parseFloat(a.amount).toFixed(a.price > 1000 ? 6 : 4)}</span>
                      <span>{pct.toFixed(1)}%</span>
                    </div>
                    <div className="mt-1.5 h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width:`${Math.min(pct,100)}%`, background: color }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
