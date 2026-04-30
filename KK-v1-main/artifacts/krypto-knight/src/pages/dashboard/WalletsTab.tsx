import { useState, useEffect, useCallback } from "react";
import { Download, Upload, TrendingUp, Eye, EyeOff, RefreshCw, Copy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ASSET_COLORS: Record<string, string> = {
  BTC:"#f7931a",ETH:"#627eea",SOL:"#9945ff",BNB:"#f3ba2f",ADA:"#0d1e7e",
  MATIC:"#8247e5",AVAX:"#e84142",LINK:"#2a5ada",ATOM:"#2e3148",ARB:"#28a0f0",
  AAVE:"#b6509e",USDT:"#26a17b",USDC:"#2775ca",
};

function fmtUsd(n: number) {
  if (n >= 1e6) return `$${(n/1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${n.toLocaleString("en-US",{maximumFractionDigits:2})}`;
  return `$${n.toFixed(2)}`;
}

type ModalType = "deposit" | "withdraw" | "send" | null;

function DepositModal({ asset, onClose, useApi }: { asset: string; onClose: ()=>void; useApi: ()=>(path:string,opts?:RequestInit)=>Promise<any> }) {
  const api = useApi();
  const [addr, setAddr] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    api(`/me/transfers/deposit-address/${asset}`)
      .then(d => d && setAddr(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [asset]);

  const copy = () => {
    if (addr?.address) { navigator.clipboard.writeText(addr.address); setCopied(true); setTimeout(() => setCopied(false), 2000); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="glass border border-white/10 rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-white">Deposit {asset}</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-white transition-colors text-xl leading-none">×</button>
        </div>

        {loading ? (
          <div className="flex justify-center py-8"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
        ) : addr ? (
          <div className="space-y-4">
            <div className="bg-black/40 border border-white/10 rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">Network</p>
              <p className="text-sm font-medium text-white">{addr.network}</p>
            </div>
            <div className="bg-black/40 border border-white/10 rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-2">Deposit Address</p>
              <div className="flex items-start gap-3">
                <p className="text-sm font-mono text-white break-all flex-1">{addr.address}</p>
                <Button size="sm" variant="ghost" onClick={copy} className="text-muted-foreground hover:text-primary shrink-0 p-1.5">
                  {copied ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              {addr.memo && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <p className="text-xs text-muted-foreground mb-1">Memo / Tag (required)</p>
                  <p className="text-sm font-mono text-white">{addr.memo}</p>
                </div>
              )}
            </div>
            <Alert className="border-amber-500/20 bg-amber-500/10">
              <AlertDescription className="text-amber-400 text-xs">{addr.warning}</AlertDescription>
            </Alert>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-6">Could not load deposit address. Please try again.</p>
        )}
      </div>
    </div>
  );
}

function WithdrawModal({ asset, balance, onClose, useApi }: { asset: string; balance: number; onClose: ()=>void; useApi: ()=>(path:string,opts?:RequestInit)=>Promise<any> }) {
  const api = useApi();
  const [form, setForm] = useState({ address: "", amount: "", note: "" });
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{text:string;ok:boolean}|null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true); setMsg(null);
    try {
      await api("/me/transfers/withdraw", {
        method: "POST",
        body: JSON.stringify({ asset, address: form.address, amount: parseFloat(form.amount), note: form.note }),
      });
      setMsg({ text: "Withdrawal request submitted. Funds will be sent within 1-2 business hours.", ok: true });
      setForm({ address: "", amount: "", note: "" });
    } catch (err: any) { setMsg({ text: err.message, ok: false }); }
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="glass border border-white/10 rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-white">Withdraw {asset}</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-white transition-colors text-xl leading-none">×</button>
        </div>

        {msg && (
          <Alert className={`mb-4 ${msg.ok ? "border-emerald-500/20 bg-emerald-500/10" : "border-red-500/20 bg-red-500/10"}`}>
            <AlertDescription className={msg.ok ? "text-emerald-400" : "text-red-400"}>{msg.text}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground mb-1 block">Destination Address</Label>
            <Input value={form.address} onChange={e => setForm(f=>({...f,address:e.target.value}))}
              placeholder="Enter wallet address…" className="bg-black/30 border-white/10 text-white font-mono text-sm" required />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <Label className="text-xs text-muted-foreground">Amount ({asset})</Label>
              <span className="text-xs text-muted-foreground">
                Available: <span className="text-white">{balance.toFixed(6)} {asset}</span>
              </span>
            </div>
            <div className="relative">
              <Input type="number" step="any" value={form.amount} onChange={e => setForm(f=>({...f,amount:e.target.value}))}
                placeholder="0.00" className="bg-black/30 border-white/10 text-white pr-14" required />
              <button type="button" onClick={() => setForm(f=>({...f,amount:balance.toFixed(8)}))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-primary font-semibold hover:underline">MAX</button>
            </div>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-1 block">Note (optional)</Label>
            <Input value={form.note} onChange={e => setForm(f=>({...f,note:e.target.value}))}
              placeholder="Purpose…" className="bg-black/30 border-white/10 text-white" />
          </div>
          <Alert className="border-red-500/20 bg-red-500/10">
            <AlertDescription className="text-red-400 text-xs">
              Always verify the destination address. Crypto transactions are irreversible.
            </AlertDescription>
          </Alert>
          <Button type="submit" disabled={submitting} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
            {submitting ? "Submitting…" : "Submit Withdrawal"}
          </Button>
        </form>
      </div>
    </div>
  );
}

function SendModal({ asset, balance, onClose, useApi }: { asset: string; balance: number; onClose: ()=>void; useApi: ()=>(path:string,opts?:RequestInit)=>Promise<any> }) {
  const api = useApi();
  const [form, setForm] = useState({ recipientEmail: "", amount: "", note: "" });
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{text:string;ok:boolean}|null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true); setMsg(null);
    try {
      await api("/me/transfers/send", {
        method: "POST",
        body: JSON.stringify({ asset, recipientEmail: form.recipientEmail, amount: parseFloat(form.amount), note: form.note }),
      });
      setMsg({ text: `Sent ${form.amount} ${asset} to ${form.recipientEmail} successfully!`, ok: true });
      setForm({ recipientEmail: "", amount: "", note: "" });
    } catch (err: any) { setMsg({ text: err.message, ok: false }); }
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="glass border border-white/10 rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-white">Send {asset}</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-white transition-colors text-xl leading-none">×</button>
        </div>

        {msg && (
          <Alert className={`mb-4 ${msg.ok ? "border-emerald-500/20 bg-emerald-500/10" : "border-red-500/20 bg-red-500/10"}`}>
            <AlertDescription className={msg.ok ? "text-emerald-400" : "text-red-400"}>{msg.text}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground mb-1 block">Recipient Email (Krypto Knight user)</Label>
            <Input type="email" value={form.recipientEmail} onChange={e => setForm(f=>({...f,recipientEmail:e.target.value}))}
              placeholder="user@example.com" className="bg-black/30 border-white/10 text-white" required />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <Label className="text-xs text-muted-foreground">Amount ({asset})</Label>
              <span className="text-xs text-muted-foreground">
                Available: <span className="text-white">{balance.toFixed(6)} {asset}</span>
              </span>
            </div>
            <Input type="number" step="any" value={form.amount} onChange={e => setForm(f=>({...f,amount:e.target.value}))}
              placeholder="0.00" className="bg-black/30 border-white/10 text-white" required />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-1 block">Note (optional)</Label>
            <Input value={form.note} onChange={e => setForm(f=>({...f,note:e.target.value}))}
              placeholder="Payment for…" className="bg-black/30 border-white/10 text-white" />
          </div>
          <Button type="submit" disabled={submitting} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
            {submitting ? "Sending…" : `Send ${asset}`}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function WalletsTab({ useApi }: { useApi: () => (path: string, opts?: RequestInit) => Promise<any> }) {
  const api = useApi();
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hideZero, setHideZero] = useState(false);
  const [modal, setModal] = useState<{type:ModalType;asset:string}|null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const d = await api("/me/portfolio");
      if (d) setPortfolio(d);
    } catch {}
    setLoading(false);
  }, [api]);

  useEffect(() => { load(); }, [load]);

  const assets: any[] = portfolio?.assets ?? [];
  const totalUsd = portfolio?.totalUsd ?? 0;
  const visible = hideZero ? assets.filter(a => parseFloat(a.amount) > 0) : assets;
  const sorted = [...visible].sort((a,b) => b.usdValue - a.usdValue);

  const getBalance = (symbol: string) => {
    const a = assets.find(a => a.symbol === symbol);
    return a ? parseFloat(a.amount) : 0;
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6">
      {modal?.type === "deposit" && <DepositModal asset={modal.asset} onClose={() => setModal(null)} useApi={useApi} />}
      {modal?.type === "withdraw" && <WithdrawModal asset={modal.asset} balance={getBalance(modal.asset)} onClose={() => setModal(null)} useApi={useApi} />}
      {modal?.type === "send" && <SendModal asset={modal.asset} balance={getBalance(modal.asset)} onClose={() => setModal(null)} useApi={useApi} />}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Wallets</h2>
          <p className="text-muted-foreground text-sm">
            Total: <span className="text-white font-semibold">{fmtUsd(totalUsd)}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
            <input type="checkbox" checked={hideZero} onChange={e => setHideZero(e.target.checked)}
              className="w-3.5 h-3.5 accent-primary" />
            Hide zero balances
          </label>
          <Button size="sm" variant="ghost" className="text-muted-foreground" onClick={load}>
            <RefreshCw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      <div className="glass border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-xs text-muted-foreground">
                <th className="px-5 py-3 text-left font-medium">Asset</th>
                <th className="px-4 py-3 text-right font-medium">Balance</th>
                <th className="px-4 py-3 text-right font-medium">USD Value</th>
                <th className="px-4 py-3 text-right font-medium">Price</th>
                <th className="px-4 py-3 text-right font-medium">Portfolio %</th>
                <th className="px-4 py-3 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sorted.map((a: any) => {
                const color = ASSET_COLORS[a.symbol] ?? "#00ff9c";
                const pct = totalUsd > 0 ? (a.usdValue / totalUsd * 100) : 0;
                const bal = parseFloat(a.amount);
                return (
                  <tr key={a.symbol} className="hover:bg-white/5 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                          style={{ background:`${color}20`, color, border:`1px solid ${color}40` }}>
                          {a.symbol.slice(0,3)}
                        </div>
                        <span className="font-semibold text-white">{a.symbol}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right text-white font-medium">
                      {a.price > 1000 ? bal.toFixed(6) : bal.toFixed(4)}
                    </td>
                    <td className="px-4 py-4 text-right text-white font-semibold">{fmtUsd(a.usdValue)}</td>
                    <td className="px-4 py-4 text-right text-muted-foreground">
                      {a.price > 0 ? `$${a.price > 1000 ? a.price.toLocaleString("en-US",{maximumFractionDigits:2}) : a.price.toFixed(4)}` : "—"}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width:`${Math.min(pct,100)}%`, background: color }} />
                        </div>
                        <span className="text-muted-foreground text-xs w-10 text-right">{pct.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-emerald-400 hover:bg-emerald-500/10"
                          onClick={() => setModal({type:"deposit",asset:a.symbol})}>
                          <Download className="w-3 h-3 mr-1" />Deposit
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-red-400 hover:bg-red-500/10"
                          onClick={() => setModal({type:"withdraw",asset:a.symbol})}>
                          <Upload className="w-3 h-3 mr-1" />Withdraw
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-blue-400 hover:bg-blue-500/10"
                          onClick={() => setModal({type:"send",asset:a.symbol})}>
                          <TrendingUp className="w-3 h-3 mr-1" />Send
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-sm text-muted-foreground">
                    {hideZero ? "No assets with balance. Uncheck 'Hide zero balances' to see all." : "No assets found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
