import { useState, useEffect, useCallback } from "react";
import { useLocation, Link } from "wouter";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  LayoutDashboard, User, Shield, Bell, Wallet, LogOut,
  Key, Clock, CheckCircle2, XCircle, AlertTriangle, Copy, Plus, Trash2,
  Layers, TrendingUp, Image, ArrowRightLeft, Star, BarChart2, DollarSign,
  Sun, Moon, Home,
} from "lucide-react";
import LiveTicker from "@/components/LiveTicker";
import PortfolioTab from "./dashboard/PortfolioTab";
import ExchangeTab from "./dashboard/ExchangeTab";
import SwapTab from "./dashboard/SwapTab";
import WalletsTab from "./dashboard/WalletsTab";
import WatchlistTab from "./dashboard/WatchlistTab";

const API = "https://api.krypto-knight.com";

function useApi() {
  const { token, logout } = useAuth();
  return useCallback(async (path: string, opts: RequestInit = {}) => {
    const res = await fetch(`${API}${path}`, {
      ...opts,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        ...(opts.headers as Record<string, string> ?? {}),
      },
    });
    if (res.status === 401) { logout(); return null; }
    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Request failed");
    return data.data;
  }, [token, logout]);
}

function useTheme() {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("kk_theme") !== "light";
  });

  // Never touch <html> — the theme class is applied to the dashboard container only,
  // so the public site is never affected.
  useEffect(() => {
    // Clean up any stale class that may have been left on <html> by a previous version.
    document.documentElement.classList.remove("light");
  }, []);

  const toggle = () => setDark(d => {
    const next = !d;
    localStorage.setItem("kk_theme", next ? "dark" : "light");
    return next;
  });

  return { dark, toggle, themeClass: dark ? "" : "light" };
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "Just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function ScoreRing({ score }: { score: number }) {
  const r = 36, c = 2 * Math.PI * r;
  const color = score >= 70 ? "#00ff9c" : score >= 40 ? "#f59e0b" : "#ef4444";
  return (
    <svg width="96" height="96" viewBox="0 0 96 96">
      <circle cx="48" cy="48" r={r} fill="none" stroke="#1e2230" strokeWidth="8" />
      <circle cx="48" cy="48" r={r} fill="none" stroke={color} strokeWidth="8"
        strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)}
        strokeLinecap="round" transform="rotate(-90 48 48)" />
      <text x="48" y="48" textAnchor="middle" dy="0.35em" fill="white" fontSize="20" fontWeight="700">{score}</text>
    </svg>
  );
}

// ─── Overview ────────────────────────────────────────────────────────────────
function OverviewTab({ user, security, apiKeys, audit }: { user: any; security: any; apiKeys: any[]; audit: any[] }) {
  const api = useApi();
  const [portfolio, setPortfolio] = useState<any>(null);
  const [kycStatus, setKycStatus] = useState<string|null>(null);

  useEffect(() => {
    api("/me/portfolio").then(d => d && setPortfolio(d)).catch(()=>{});
    api("/me/kyc/status").then(d => d && setKycStatus(d.status)).catch(()=>{});
  }, []);

  const daysActive = Math.floor((Date.now() - new Date(user.createdAt).getTime()) / 86400000);
  const score = security?.score ?? 0;
  const scoreLabel = score >= 70 ? "Strong" : score >= 40 ? "Fair" : "Needs Attention";
  const scoreColor = score >= 70 ? "text-primary" : score >= 40 ? "text-amber-400" : "text-red-400";
  const totalUsd = portfolio?.totalUsd ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Welcome back, {user.firstName || user.email.split("@")[0]}</h2>
        <p className="text-muted-foreground text-sm">Here's an overview of your account.</p>
      </div>

      {/* KYC Banner */}
      {kycStatus && kycStatus !== "approved" && (
        <Alert className={`${kycStatus === "pending" ? "border-amber-500/20 bg-amber-500/10" : "border-red-500/20 bg-red-500/10"}`}>
          <AlertDescription className={kycStatus === "pending" ? "text-amber-400" : "text-red-400"}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>
                  {kycStatus === "none" && "Identity verification required to unlock full trading features."}
                  {kycStatus === "pending" && "Your identity verification is under review. This usually takes 1-2 business days."}
                  {kycStatus === "rejected" && "Your identity verification was rejected. Please resubmit your documents."}
                </span>
              </div>
              {(kycStatus === "none" || kycStatus === "rejected") && (
                <Button size="sm" className="ml-4 bg-primary text-primary-foreground hover:bg-primary/90 shrink-0">
                  Verify Identity
                </Button>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: DollarSign, label: "Portfolio Value", value: totalUsd > 0 ? `$${totalUsd.toLocaleString("en-US",{maximumFractionDigits:2})}` : "—", sub: "Live USD value" },
          { icon: Shield, label: "Security Score", value: `${score}/100`, sub: scoreLabel, color: scoreColor },
          { icon: Clock, label: "Account Age", value: `${daysActive}d`, sub: "Member since " + new Date(user.createdAt).toLocaleDateString() },
          { icon: Key, label: "API Keys", value: apiKeys.filter(k => k.status === "active").length.toString(), sub: "Active keys" },
        ].map(({ icon: Icon, label, value, sub, color }) => (
          <div key={label} className="glass border border-white/10 rounded-xl p-5">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className={`text-xs mt-1 ${color ?? "text-muted-foreground"}`}>{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass border border-white/10 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-white">Security Checklist</h3>
              <p className="text-xs text-muted-foreground">Protect your account</p>
            </div>
            <ScoreRing score={score} />
          </div>
          <div className="space-y-3">
            {[
              { label: "Two-Factor Authentication", done: user.twoFaEnabled },
              { label: "Email Verified", done: user.emailVerified },
              { label: "Phone Verified", done: user.phoneVerified },
              { label: "KYC Approved", done: kycStatus === "approved" },
            ].map(({ label, done }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  {done ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <XCircle className="w-4 h-4 text-muted-foreground" />}
                  <span className="text-sm text-white">{label}</span>
                </div>
                {!done && <span className="text-xs text-amber-400 font-medium">Pending</span>}
              </div>
            ))}
          </div>
          <p className={`mt-4 text-sm font-semibold ${scoreColor}`}>{scoreLabel}</p>
        </div>

        <div className="glass border border-white/10 rounded-xl p-5">
          <h3 className="font-semibold text-white mb-1">Recent Activity</h3>
          <p className="text-xs text-muted-foreground mb-4">Your account activity</p>
          {audit.length === 0 ? (
            <p className="text-sm text-muted-foreground">No activity yet.</p>
          ) : (
            <div className="space-y-3">
              {audit.slice(0, 5).map((log: any) => (
                <div key={log.id} className="flex items-start justify-between py-2 border-b border-white/5 last:border-0">
                  <div>
                    <p className="text-sm text-white">{log.action}</p>
                    {log.detail && <p className="text-xs text-muted-foreground">{log.detail}</p>}
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{timeAgo(log.createdAt)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Profile ─────────────────────────────────────────────────────────────────
function ProfileTab({ user, onRefresh }: { user: any; onRefresh: () => void }) {
  const api = useApi();
  const [form, setForm] = useState({ firstName: user.firstName ?? "", lastName: user.lastName ?? "", phone: user.phone ?? "", bio: user.bio ?? "" });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setMsg("");
    try {
      await api("/me", { method: "PATCH", body: JSON.stringify(form) });
      setMsg("Profile updated.");
      onRefresh();
    } catch (err: any) { setMsg(err.message); }
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Personal Information</h2>
        <p className="text-muted-foreground text-sm">Manage your personal details.</p>
      </div>
      <div className="glass border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
          <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
            {(user.firstName?.[0] ?? user.email[0]).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-white">{user.firstName} {user.lastName}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <button onClick={() => navigator.clipboard.writeText(user.id)} className="text-xs text-muted-foreground hover:text-primary mt-1 flex items-center gap-1">
              <Copy className="w-3 h-3" />{user.id.slice(0, 8)}…
            </button>
          </div>
        </div>
        {msg && <Alert className={`mb-4 ${msg === "Profile updated." ? "border-primary/30 bg-primary/10" : "border-red-500/30 bg-red-500/10"}`}><AlertDescription className={msg === "Profile updated." ? "text-primary" : "text-red-400"}>{msg}</AlertDescription></Alert>}
        <form onSubmit={save} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">First Name</Label>
              <Input value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} className="bg-black/30 border-white/10 text-white focus:border-primary" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Last Name</Label>
              <Input value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} className="bg-black/30 border-white/10 text-white focus:border-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email Address</Label>
            <Input value={user.email} disabled className="bg-black/20 border-white/5 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone Number</Label>
            <Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+1 (555) 000-0000" className="bg-black/30 border-white/10 text-white focus:border-primary" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Bio</Label>
            <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} placeholder="Tell us about yourself…" rows={3}
              className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-sm text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary resize-none" />
          </div>
          <Button type="submit" disabled={saving} className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
            {saving ? "Saving…" : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
}

// ─── Security ────────────────────────────────────────────────────────────────
function SecurityTab({ user, security, sessions, onRefresh }: { user: any; security: any; sessions: any[]; onRefresh: () => void }) {
  const api = useApi();
  const score = security?.score ?? 0;
  const scoreColor = score >= 70 ? "text-primary" : score >= 40 ? "text-amber-400" : "text-red-400";
  const scoreLabel = score >= 70 ? "Strong" : score >= 40 ? "Fair" : "At Risk";
  const [secMsg, setSecMsg] = useState("");
  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [savingPw, setSavingPw] = useState(false);

  const revoke = async (id: string) => { await api(`/me/sessions/${id}`, { method: "DELETE" }); onRefresh(); };
  const verifyEmail = async () => {
    try { await api("/me/security/verify-email", { method: "POST" }); setSecMsg("Email verified!"); onRefresh(); }
    catch (e: any) { setSecMsg(e.message); }
  };
  const enable2fa = async () => {
    try { await api("/me/security/enable-2fa", { method: "POST" }); setSecMsg("2FA enabled!"); onRefresh(); }
    catch (e: any) { setSecMsg(e.message); }
  };
  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwForm.next !== pwForm.confirm) { setSecMsg("New passwords don't match."); return; }
    setSavingPw(true); setSecMsg("");
    try {
      await api("/me/security/change-password", { method: "POST", body: JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.next }) });
      setSecMsg("Password changed successfully."); setPwForm({ current: "", next: "", confirm: "" });
    } catch (e: any) { setSecMsg(e.message); }
    setSavingPw(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Security Center</h2>
        <p className="text-muted-foreground text-sm">Manage your account security and authentication settings.</p>
      </div>
      <div className="glass border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex gap-2 flex-wrap mb-2">
              {!user.twoFaEnabled && <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">2FA Inactive</span>}
              {!user.emailVerified && <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">Email Unverified</span>}
              {user.twoFaEnabled && user.emailVerified && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">Verified</span>}
            </div>
            <p className={`text-2xl font-bold ${scoreColor}`}>{scoreLabel}</p>
            <p className="text-sm text-muted-foreground">Security score: {score}/100</p>
          </div>
          <ScoreRing score={score} />
        </div>
      </div>
      {secMsg && <Alert className="border-primary/30 bg-primary/10"><AlertDescription className="text-primary">{secMsg}</AlertDescription></Alert>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass border border-white/10 rounded-xl p-5 flex items-center justify-between">
          <div><p className="font-semibold text-white">Two-Factor Authentication</p><p className="text-sm text-muted-foreground">Extra layer of security</p></div>
          {user.twoFaEnabled ? <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary font-medium">Enabled</span>
            : <Button size="sm" onClick={enable2fa} className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">Enable</Button>}
        </div>
        <div className="glass border border-white/10 rounded-xl p-5 flex items-center justify-between">
          <div><p className="font-semibold text-white">Email Verification</p><p className="text-sm text-muted-foreground">{user.email}</p></div>
          {user.emailVerified ? <CheckCircle2 className="w-5 h-5 text-primary" />
            : <Button size="sm" variant="outline" onClick={verifyEmail} className="border-primary/30 text-primary hover:bg-primary/10">Verify</Button>}
        </div>
      </div>
      <div className="glass border border-white/10 rounded-xl p-6 max-w-md">
        <h3 className="font-semibold text-white mb-4">Change Password</h3>
        <form onSubmit={changePassword} className="space-y-3">
          {(["current","next","confirm"] as const).map((k, i) => (
            <div key={k} className="space-y-1.5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {k === "current" ? "Current Password" : k === "next" ? "New Password" : "Confirm New Password"}
              </Label>
              <Input type="password" value={pwForm[k]} onChange={e => setPwForm(f => ({ ...f, [k]: e.target.value }))}
                className="bg-black/30 border-white/10 text-white focus:border-primary" required />
            </div>
          ))}
          <Button type="submit" disabled={savingPw} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold mt-2">
            {savingPw ? "Changing…" : "Change Password"}
          </Button>
        </form>
      </div>
      <div className="glass border border-white/10 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div><h3 className="font-semibold text-white">Active Sessions</h3><p className="text-xs text-muted-foreground">Devices logged in</p></div>
          <Button size="sm" variant="outline" className="border-white/10 text-muted-foreground hover:text-white"
            onClick={async () => { await api("/me/sessions", { method: "DELETE" }); onRefresh(); }}>Sign Out All</Button>
        </div>
        {sessions.map((s: any) => (
          <div key={s.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
            <div><p className="text-sm text-white">{s.userAgent ?? "Unknown device"}</p><p className="text-xs text-muted-foreground">{s.ipAddress ?? ""} · {timeAgo(s.createdAt)}</p></div>
            <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300" onClick={() => revoke(s.id)}>Revoke</Button>
          </div>
        ))}
        {sessions.length === 0 && <p className="text-sm text-muted-foreground">No active sessions.</p>}
      </div>
    </div>
  );
}

// ─── API Keys ─────────────────────────────────────────────────────────────────
function ApiKeysTab({ apiKeys, onRefresh }: { apiKeys: any[]; onRefresh: () => void }) {
  const api = useApi();
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  const [newKey, setNewKey] = useState<string | null>(null);

  const create = async () => {
    if (!name.trim()) return;
    setCreating(true);
    try {
      const data = await api("/me/api-keys", { method: "POST", body: JSON.stringify({ name }) });
      setNewKey(data.fullKey); setName(""); onRefresh();
    } catch {}
    setCreating(false);
  };

  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold text-white mb-1">API Keys</h2><p className="text-muted-foreground text-sm">Manage your API access keys.</p></div>
      {newKey && (
        <Alert className="border-primary/30 bg-primary/10">
          <AlertDescription className="text-primary">
            <p className="font-semibold mb-1">New API key created — copy it now, it won't be shown again:</p>
            <code className="text-xs break-all">{newKey}</code>
            <button onClick={() => navigator.clipboard.writeText(newKey!)} className="ml-2 text-xs underline">Copy</button>
          </AlertDescription>
        </Alert>
      )}
      <div className="glass border border-white/10 rounded-xl p-5">
        <h3 className="font-semibold text-white mb-3">Create New Key</h3>
        <div className="flex gap-3">
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="Key name (e.g. Trading Bot)" className="bg-black/30 border-white/10 text-white focus:border-primary" />
          <Button onClick={create} disabled={creating || !name.trim()} className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shrink-0">
            <Plus className="w-4 h-4 mr-1" />{creating ? "Creating…" : "Create"}
          </Button>
        </div>
      </div>
      <div className="glass border border-white/10 rounded-xl p-5">
        <h3 className="font-semibold text-white mb-4">Your Keys</h3>
        {apiKeys.length === 0 ? <p className="text-sm text-muted-foreground">No API keys yet.</p> : apiKeys.map((k: any) => (
          <div key={k.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
            <div><p className="text-sm font-medium text-white">{k.name}</p><p className="text-xs text-muted-foreground">{k.keyId}… · Created {timeAgo(k.createdAt)}</p></div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${k.status === "active" ? "bg-primary/20 text-primary" : "bg-red-500/20 text-red-400"}`}>{k.status}</span>
              <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 p-1.5" onClick={async () => { await api(`/me/api-keys/${k.id}`, { method: "DELETE" }); onRefresh(); }}>
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Notifications ────────────────────────────────────────────────────────────
function NotificationsTab({ user }: { user: any }) {
  const api = useApi();
  const [prefs, setPrefs] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api("/me/notifications").then(d => d && setPrefs({
      emailNotifications: d.emailNotifications ?? true,
      smsNotifications: d.smsNotifications ?? false,
      pushNotifications: d.pushNotifications ?? false,
      securityAlerts: d.securityAlerts ?? true,
      marketingEmails: d.marketingEmails ?? false,
    }));
  }, []);

  const save = async () => { setSaving(true); await api("/me/notifications", { method: "PATCH", body: JSON.stringify(prefs) }); setSaving(false); };

  if (!prefs) return <div className="text-muted-foreground text-sm">Loading…</div>;
  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold text-white mb-1">Notification Preferences</h2><p className="text-muted-foreground text-sm">Choose how you receive notifications.</p></div>
      <div className="glass border border-white/10 rounded-xl divide-y divide-white/5">
        {[
          { key: "emailNotifications", label: "Email Notifications", desc: `via ${user.email}` },
          { key: "smsNotifications", label: "SMS Notifications", desc: "via SMS" },
          { key: "securityAlerts", label: "Security Alerts", desc: "Login attempts, password changes" },
          { key: "marketingEmails", label: "Marketing Emails", desc: "Product updates and announcements" },
        ].map(({ key, label, desc }) => (
          <div key={key} className="flex items-center justify-between p-5">
            <div><p className="text-sm font-medium text-white">{label}</p><p className="text-xs text-muted-foreground">{desc}</p></div>
            <Switch checked={!!prefs[key]} onCheckedChange={v => setPrefs((p: any) => ({ ...p, [key]: v }))} />
          </div>
        ))}
      </div>
      <Button onClick={save} disabled={saving} className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
        {saving ? "Saving…" : "Save Preferences"}
      </Button>
    </div>
  );
}

// ─── Wallet (Fireblocks) ──────────────────────────────────────────────────────
const POPULAR_ASSETS = ["BTC","ETH","USDC","USDT","SOL","MATIC"];

function WalletTab(_props: { wallets: any[]; onRefresh: () => void }) {
  const api = useApi();
  const [subtab, setSubtab] = useState<"assets"|"receive"|"send"|"history">("assets");
  const [vault, setVault] = useState<any>(null);
  const [txs, setTxs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState("ETH");
  const [addresses, setAddresses] = useState<any[]>([]);
  const [addrLoading, setAddrLoading] = useState(false);
  const [sendForm, setSendForm] = useState({ assetId: "ETH", amount: "", destinationAddress: "", note: "" });
  const [sending, setSending] = useState(false);
  const [sendMsg, setSendMsg] = useState("");
  const [copied, setCopied] = useState("");
  const [activating, setActivating] = useState("");
  const [fbUnavailable, setFbUnavailable] = useState(false);

  const loadVault = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api("/me/fireblocks/vault");
      if (data) setVault(data); else setFbUnavailable(true);
    } catch { setFbUnavailable(true); }
    setLoading(false);
  }, [api]);

  const loadTxs = useCallback(async () => {
    try {
      const data = await api("/me/fireblocks/transactions?limit=25");
      if (data) setTxs(Array.isArray(data) ? data : []);
    } catch {}
  }, [api]);

  useEffect(() => { loadVault(); loadTxs(); }, []);

  useEffect(() => {
    if (subtab !== "receive" || !selectedAsset) return;
    setAddrLoading(true);
    api(`/me/fireblocks/vault/assets/${selectedAsset}/addresses`)
      .then(d => { if (d) setAddresses(Array.isArray(d.addresses) ? d.addresses : Array.isArray(d) ? d : []); })
      .catch(() => {}).finally(() => setAddrLoading(false));
  }, [subtab, selectedAsset]);

  const activateAsset = async (assetId: string) => {
    setActivating(assetId);
    try { await api(`/me/fireblocks/vault/assets/${assetId}`, { method: "POST" }); await loadVault(); }
    catch {}
    setActivating("");
  };

  const send = async (e: React.FormEvent) => {
    e.preventDefault(); setSending(true); setSendMsg("");
    try {
      await api("/me/fireblocks/transactions", { method: "POST", body: JSON.stringify(sendForm) });
      setSendMsg("Transaction submitted successfully.");
      setSendForm(f => ({ ...f, amount: "", destinationAddress: "", note: "" }));
      await loadTxs();
    } catch (err: any) { setSendMsg(err.message); }
    setSending(false);
  };

  const copy = (text: string, id: string) => { navigator.clipboard.writeText(text); setCopied(id); setTimeout(() => setCopied(""), 2000); };
  const txColor = (s: string) => ({ COMPLETED:"text-primary", FAILED:"text-red-400", CANCELLED:"text-red-400", CONFIRMING:"text-blue-400", PENDING_SIGNATURE:"text-amber-400" }[s] ?? "text-muted-foreground");
  const vaultAssets: any[] = vault?.assets ?? [];

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  if (fbUnavailable) return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold text-white mb-1">Fireblocks Vault</h2></div>
      <div className="glass border border-white/10 rounded-xl p-8 text-center">
        <Wallet className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
        <p className="text-white font-semibold mb-2">Custody not configured</p>
        <p className="text-sm text-muted-foreground">The Fireblocks custody service is not available. Contact support.</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold text-white mb-1">Fireblocks Vault</h2><p className="text-muted-foreground text-sm">MPC-secured · Vault {vault?.id}</p></div>
        <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-semibold">
          <Shield className="w-3.5 h-3.5" />MPC Secured
        </div>
      </div>
      <div className="flex gap-1 border-b border-white/10">
        {(["assets","receive","send","history"] as const).map(t => (
          <button key={t} onClick={() => setSubtab(t)}
            className={`px-4 py-2.5 text-sm font-semibold capitalize transition-colors border-b-2 -mb-px ${subtab===t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-white"}`}>
            {t === "assets" ? "Assets" : t === "receive" ? "Receive" : t === "send" ? "Send" : "History"}
          </button>
        ))}
      </div>
      {subtab === "assets" && (
        <div className="space-y-4">
          {vaultAssets.length > 0 && (
            <div className="glass border border-white/10 rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-white/5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Vault Assets</div>
              {vaultAssets.map((a: any) => (
                <div key={a.id} className="flex items-center justify-between px-5 py-3.5 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">{(a.id||"?").slice(0,3)}</div>
                    <div><p className="text-sm font-semibold text-white">{a.id}</p><p className="text-xs text-muted-foreground">{a.blockchainDescriptor||""}</p></div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">{parseFloat(a.total||"0").toFixed(8)}</p>
                    <p className="text-xs text-muted-foreground">Available: {parseFloat(a.available||"0").toFixed(8)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="glass border border-white/10 rounded-xl p-5">
            <p className="text-sm font-semibold text-white mb-3">Activate Asset</p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {POPULAR_ASSETS.map(a => {
                const active = vaultAssets.some((v: any) => v.id === a);
                return (
                  <button key={a} disabled={active||activating===a} onClick={() => activateAsset(a)}
                    className={`py-2 rounded-lg text-xs font-semibold transition-colors ${active ? "bg-primary/10 border border-primary/30 text-primary cursor-default" : "border border-white/10 text-muted-foreground hover:border-primary/40 hover:text-white"}`}>
                    {activating===a ? "…" : a}{active ? " ✓" : ""}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {subtab === "receive" && (
        <div className="space-y-4">
          <div className="glass border border-white/10 rounded-xl p-5">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 block">Select Asset</Label>
            <div className="flex gap-2 flex-wrap mb-4">
              {(vaultAssets.length > 0 ? vaultAssets.map((a: any) => a.id) : POPULAR_ASSETS).map((a: string) => (
                <button key={a} onClick={() => setSelectedAsset(a)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${selectedAsset===a ? "bg-primary/20 border border-primary/40 text-primary" : "border border-white/10 text-muted-foreground hover:border-primary/30 hover:text-white"}`}>{a}</button>
              ))}
            </div>
            {addrLoading ? <div className="text-sm text-muted-foreground">Loading…</div> : addresses.length === 0 ? (
              <div className="text-sm text-muted-foreground">No deposit address yet.{" "}
                <button onClick={async () => { setAddrLoading(true); await api(`/me/fireblocks/vault/assets/${selectedAsset}/addresses`,{method:"POST"}); const d = await api(`/me/fireblocks/vault/assets/${selectedAsset}/addresses`); if(d) setAddresses(Array.isArray(d.addresses)?d.addresses:Array.isArray(d)?d:[]); setAddrLoading(false); }} className="text-primary underline">Generate one</button>
              </div>
            ) : (
              <div className="space-y-3">
                {addresses.map((addr: any, i: number) => (
                  <div key={i} className="flex items-center justify-between gap-3 p-3 rounded-lg bg-black/30 border border-white/10">
                    <div><p className="text-xs text-muted-foreground mb-0.5">{addr.description||`Address ${i+1}`}</p><p className="text-sm font-mono text-white break-all">{addr.address}</p>{addr.tag&&<p className="text-xs text-muted-foreground mt-0.5">Tag: {addr.tag}</p>}</div>
                    <Button size="sm" variant="ghost" className="shrink-0 text-muted-foreground hover:text-primary" onClick={() => copy(addr.address,addr.address)}>
                      <Copy className="w-4 h-4" />{copied===addr.address?" Copied!":""}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Alert className="border-amber-500/20 bg-amber-500/10"><AlertDescription className="text-amber-400 text-xs">Only send {selectedAsset} to this address. Sending other assets may result in permanent loss.</AlertDescription></Alert>
        </div>
      )}
      {subtab === "send" && (
        <div className="glass border border-white/10 rounded-xl p-6 max-w-lg">
          <h3 className="font-semibold text-white mb-4">Send Crypto</h3>
          {sendMsg && <Alert className={`mb-4 ${sendMsg.includes("success")?"border-primary/30 bg-primary/10":"border-red-500/30 bg-red-500/10"}`}><AlertDescription className={sendMsg.includes("success")?"text-primary":"text-red-400"}>{sendMsg}</AlertDescription></Alert>}
          <form onSubmit={send} className="space-y-4">
            <div className="space-y-2"><Label className="text-xs font-semibold text-muted-foreground uppercase">Asset</Label>
              <select value={sendForm.assetId} onChange={e => setSendForm(f=>({...f,assetId:e.target.value}))} className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-primary">
                {(vaultAssets.length>0?vaultAssets.map((a:any)=>a.id):POPULAR_ASSETS).map((a:string)=><option key={a} value={a}>{a}</option>)}
              </select></div>
            <div className="space-y-2"><Label className="text-xs font-semibold text-muted-foreground uppercase">Destination Address</Label>
              <Input value={sendForm.destinationAddress} onChange={e=>setSendForm(f=>({...f,destinationAddress:e.target.value}))} placeholder="0x…" className="bg-black/30 border-white/10 text-white font-mono text-sm" required /></div>
            <div className="space-y-2"><Label className="text-xs font-semibold text-muted-foreground uppercase">Amount</Label>
              <Input type="number" step="any" value={sendForm.amount} onChange={e=>setSendForm(f=>({...f,amount:e.target.value}))} placeholder="0.00" className="bg-black/30 border-white/10 text-white" required /></div>
            <Alert className="border-red-500/20 bg-red-500/10"><AlertDescription className="text-red-400 text-xs">Always double-check the destination address. Transactions cannot be reversed.</AlertDescription></Alert>
            <Button type="submit" disabled={sending} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">{sending?"Submitting…":"Send"}</Button>
          </form>
        </div>
      )}
      {subtab === "history" && (
        <div className="glass border border-white/10 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-white/5 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center justify-between">
            <span>Transaction History</span><button onClick={loadTxs} className="hover:text-primary">↻</button>
          </div>
          {txs.length===0?<div className="p-8 text-center text-sm text-muted-foreground">No transactions yet.</div>:txs.map((tx:any)=>(
            <div key={tx.id} className="flex items-center justify-between px-5 py-3.5 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.status==="COMPLETED"?"bg-primary/10":"bg-white/5"}`}><Key className="w-4 h-4 text-muted-foreground" /></div>
                <div><p className="text-sm font-medium text-white">{tx.assetId} · {tx.amount}</p><p className="text-xs text-muted-foreground font-mono">{(tx.id||"").slice(0,16)}…</p></div>
              </div>
              <div className="text-right"><p className={`text-xs font-semibold ${txColor(tx.status)}`}>{tx.status}</p><p className="text-xs text-muted-foreground">{tx.createdAt?timeAgo(tx.createdAt):""}</p></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Staking Tab ─────────────────────────────────────────────────────────────
function StakingTab() {
  const api = useApi();
  const [providers,setProviders]=useState<any[]>([]);
  const [positions,setPositions]=useState<any[]>([]);
  const [chains,setChains]=useState<any[]>([]);
  const [loading,setLoading]=useState(true);
  const [stakeForm,setStakeForm]=useState({chainDescriptor:"ETH",providerId:"",stakedAmount:""});
  const [stakeMsg,setStakeMsg]=useState("");
  const [staking,setStaking]=useState(false);

  useEffect(()=>{
    Promise.allSettled([
      api("/me/fireblocks/staking/providers").then(d=>setProviders(Array.isArray(d)?d:[])),
      api("/me/fireblocks/staking/chains").then(d=>setChains(Array.isArray(d)?d:[])),
      api("/me/fireblocks/staking/positions").then(d=>setPositions(Array.isArray(d)?d:(d?.positions??[]))),
    ]).finally(()=>setLoading(false));
  },[]);

  const stake=async(e:React.FormEvent)=>{
    e.preventDefault();
    if(!stakeForm.providerId||!stakeForm.stakedAmount){setStakeMsg("Fill all fields.");return;}
    setStaking(true);setStakeMsg("");
    try{
      await api("/me/fireblocks/staking/stake",{method:"POST",body:JSON.stringify(stakeForm)});
      setStakeMsg("Staking initiated!");
      const d=await api("/me/fireblocks/staking/positions");
      setPositions(Array.isArray(d)?d:(d?.positions??[]));
    }catch(err:any){setStakeMsg(err.message);}
    setStaking(false);
  };

  const action=async(posId:string,act:"unstake"|"withdraw"|"claim")=>{
    try{await api(`/me/fireblocks/staking/positions/${posId}/${act}`,{method:"POST"});const d=await api("/me/fireblocks/staking/positions");setPositions(Array.isArray(d)?d:(d?.positions??[]));}
    catch(err:any){alert(err.message);}
  };

  if(loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"/></div>;
  return(
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold text-white mb-1">Staking</h2><p className="text-muted-foreground text-sm">Earn rewards via Fireblocks</p></div>
      <div className="glass border border-white/10 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-white/5 text-xs font-semibold text-muted-foreground uppercase">My Positions ({positions.length})</div>
        {positions.length===0?<div className="p-8 text-center text-sm text-muted-foreground">No staking positions yet.</div>:positions.map((p:any)=>(
          <div key={p.id} className="flex items-center justify-between px-5 py-4 border-b border-white/5 last:border-0">
            <div><p className="text-sm font-semibold text-white">{p.asset||p.assetId||"—"} · {p.amount||"—"}</p><p className="text-xs text-muted-foreground">Provider: {p.providerId||"—"}</p></div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${p.status==="ACTIVE"?"bg-primary/10 text-primary border border-primary/20":"bg-white/5 text-muted-foreground"}`}>{p.status||"—"}</span>
              {p.status==="ACTIVE"&&<Button size="sm" variant="outline" className="text-xs h-7" onClick={()=>action(p.id,"unstake")}>Unstake</Button>}
              {p.status==="UNSTAKING"&&<Button size="sm" variant="outline" className="text-xs h-7" onClick={()=>action(p.id,"withdraw")}>Withdraw</Button>}
              {p.rewards&&<Button size="sm" variant="outline" className="text-xs h-7 text-primary border-primary/30" onClick={()=>action(p.id,"claim")}>Claim</Button>}
            </div>
          </div>
        ))}
      </div>
      <div className="glass border border-white/10 rounded-xl p-6 max-w-lg">
        <h3 className="font-semibold text-white mb-4">Stake Assets</h3>
        {stakeMsg&&<Alert className={`mb-4 ${stakeMsg.includes("success")||stakeMsg.includes("initiated")?"border-primary/30 bg-primary/10":"border-red-500/30 bg-red-500/10"}`}><AlertDescription className={stakeMsg.includes("success")||stakeMsg.includes("initiated")?"text-primary":"text-red-400"}>{stakeMsg}</AlertDescription></Alert>}
        <form onSubmit={stake} className="space-y-4">
          <div className="space-y-2"><Label className="text-xs font-semibold text-muted-foreground uppercase">Chain</Label>
            <select value={stakeForm.chainDescriptor} onChange={e=>setStakeForm(f=>({...f,chainDescriptor:e.target.value}))} className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-primary">
              {chains.length>0?chains.map((c:any)=><option key={c.id||c} value={c.id||c}>{c.name||c.id||c}</option>):["ETH","SOL","MATIC"].map(c=><option key={c} value={c}>{c}</option>)}
            </select></div>
          <div className="space-y-2"><Label className="text-xs font-semibold text-muted-foreground uppercase">Provider</Label>
            <select value={stakeForm.providerId} onChange={e=>setStakeForm(f=>({...f,providerId:e.target.value}))} className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-primary">
              <option value="">Select provider…</option>
              {providers.map((p:any)=><option key={p.id} value={p.id}>{p.name||p.id}</option>)}
            </select></div>
          <div className="space-y-2"><Label className="text-xs font-semibold text-muted-foreground uppercase">Amount</Label>
            <Input type="number" step="any" value={stakeForm.stakedAmount} onChange={e=>setStakeForm(f=>({...f,stakedAmount:e.target.value}))} placeholder="0.00" className="bg-black/30 border-white/10 text-white focus:border-primary" required /></div>
          <Button type="submit" disabled={staking} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">{staking?"Submitting…":"Stake Now"}</Button>
        </form>
      </div>
    </div>
  );
}

// ─── Earn Tab ─────────────────────────────────────────────────────────────────
function EarnTab() {
  const api=useApi();
  const [opportunities,setOpportunities]=useState<any[]>([]);
  const [positions,setPositions]=useState<any[]>([]);
  const [loading,setLoading]=useState(true);
  const [actionMsg,setActionMsg]=useState("");

  useEffect(()=>{
    Promise.allSettled([
      api("/me/fireblocks/earn/opportunities").then(d=>setOpportunities(Array.isArray(d)?d:[])),
      api("/me/fireblocks/earn/positions").then(d=>setPositions(Array.isArray(d)?d:[])),
    ]).finally(()=>setLoading(false));
  },[]);

  const enterPosition=async(opportunityId:string)=>{
    setActionMsg("");
    try{await api("/me/fireblocks/earn/actions",{method:"POST",body:JSON.stringify({opportunityId,type:"ENTER_POSITION"})});setActionMsg("Position entered!");}
    catch(err:any){setActionMsg(err.message);}
  };

  if(loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"/></div>;
  return(
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold text-white mb-1">Earn / Yield</h2><p className="text-muted-foreground text-sm">Automated yield via Fireblocks Earn</p></div>
      {actionMsg&&<Alert className="border-primary/30 bg-primary/10"><AlertDescription className="text-primary text-sm">{actionMsg}</AlertDescription></Alert>}
      {positions.length>0&&(
        <div className="glass border border-white/10 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-white/5 text-xs font-semibold text-muted-foreground uppercase">Active Positions</div>
          {positions.map((p:any,i:number)=>(
            <div key={p.id||i} className="flex items-center justify-between px-5 py-4 border-b border-white/5 last:border-0">
              <div><p className="text-sm font-semibold text-white">{p.asset||p.assetId||"—"}</p><p className="text-xs text-muted-foreground">Provider: {p.providerId||"—"} · APY: {p.apy!=null?`${(p.apy*100).toFixed(2)}%`:"—"}</p></div>
              <div className="text-right"><p className="text-sm font-bold text-white">{p.amount||"—"}</p><span className="text-xs text-primary">{p.status||"ACTIVE"}</span></div>
            </div>
          ))}
        </div>
      )}
      <div className="glass border border-white/10 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-white/5 text-xs font-semibold text-muted-foreground uppercase">Opportunities ({opportunities.length})</div>
        {opportunities.length===0?<div className="p-8 text-center text-sm text-muted-foreground">No opportunities available.</div>:opportunities.map((o:any,i:number)=>(
          <div key={o.id||i} className="flex items-center justify-between px-5 py-4 border-b border-white/5 last:border-0">
            <div><p className="text-sm font-semibold text-white">{o.assetId||o.asset||"—"}</p><p className="text-xs text-muted-foreground">{o.providerId||"—"}</p></div>
            <div className="flex items-center gap-3">
              {o.apy!=null&&<span className="text-primary font-bold text-sm">{(o.apy*100).toFixed(2)}% APY</span>}
              <Button size="sm" className="bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 text-xs h-7" onClick={()=>enterPosition(o.id)}>Enter Position</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── NFTs Tab ─────────────────────────────────────────────────────────────────
function NFTsTab() {
  const api=useApi();
  const [nfts,setNfts]=useState<any[]>([]);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{ api("/me/fireblocks/nfts").then(d=>setNfts(Array.isArray(d)?d:[])).finally(()=>setLoading(false)); },[]);
  if(loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"/></div>;
  return(
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold text-white mb-1">NFTs</h2><p className="text-muted-foreground text-sm">Your NFT holdings in Fireblocks</p></div>
      {nfts.length===0?(
        <div className="glass border border-white/10 rounded-xl p-12 text-center">
          <Image className="w-10 h-10 text-muted-foreground/30 mx-auto mb-4"/>
          <p className="text-white font-semibold mb-2">No NFTs found</p>
          <p className="text-sm text-muted-foreground">NFTs in your vault will appear here.</p>
        </div>
      ):(
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {nfts.map((n:any,i:number)=>(
            <div key={n.id||i} className="glass border border-white/10 rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
              {n.media?.[0]?.url?<img src={n.media[0].url} alt={n.name||"NFT"} className="w-full aspect-square object-cover"/>:
                <div className="w-full aspect-square bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center"><Image className="w-10 h-10 text-muted-foreground/30"/></div>}
              <div className="p-3"><p className="text-sm font-semibold text-white truncate">{n.name||"Unnamed NFT"}</p><p className="text-xs text-muted-foreground truncate">{n.collection?.name||n.blockchainDescriptor||"—"}</p></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const TABS = [
  { id:"overview",    label:"Overview",    icon:LayoutDashboard, sub:"Account summary" },
  { id:"portfolio",   label:"Portfolio",   icon:TrendingUp,      sub:"Holdings & chart" },
  { id:"exchange",    label:"Exchange",    icon:BarChart2,       sub:"Trade pairs" },
  { id:"swap",        label:"Swap",        icon:ArrowRightLeft,  sub:"Instant swaps" },
  { id:"wallets",     label:"Wallets",     icon:Wallet,          sub:"All assets" },
  { id:"watchlist",   label:"Watchlist",   icon:Star,            sub:"Track assets" },
  { id:"vault",       label:"Vault",       icon:DollarSign,      sub:"Fireblocks custody" },
  { id:"staking",     label:"Staking",     icon:Layers,          sub:"Earn rewards" },
  { id:"earn",        label:"Earn",        icon:TrendingUp,      sub:"Yield opportunities" },
  { id:"nfts",        label:"NFTs",        icon:Image,           sub:"NFT holdings" },
  { id:"profile",     label:"Profile",     icon:User,            sub:"Personal info" },
  { id:"security",    label:"Security",    icon:Shield,          sub:"Protection" },
  { id:"keys",        label:"API Keys",    icon:Key,             sub:"Access keys" },
  { id:"notifications",label:"Alerts",    icon:Bell,            sub:"Preferences" },
];

export default function Dashboard() {
  const { user, logout, loading, refreshUser } = useAuth();
  const [, navigate] = useLocation();
  const [tab, setTab] = useState("overview");
  const api = useApi();
  const { dark, toggle: toggleTheme, themeClass } = useTheme();
  const [portfolioUsd, setPortfolioUsd] = useState<number|null>(null);

  const [data, setData] = useState<any>({ security:null, apiKeys:[], sessions:[], audit:[], wallets:[] });

  const loadData = useCallback(async () => {
    if (!user) return;
    try {
      const [sec,keys,sess,aud,wal] = await Promise.allSettled([
        api("/me/security"), api("/me/api-keys"), api("/me/sessions"),
        api("/me/audit?limit=10"), api("/me/wallets"),
      ]);
      setData({
        security: sec.status==="fulfilled"?sec.value:null,
        apiKeys: keys.status==="fulfilled"?(Array.isArray(keys.value)?keys.value:[]):[],
        sessions: sess.status==="fulfilled"?(Array.isArray(sess.value)?sess.value:[]):[],
        audit: aud.status==="fulfilled"?(Array.isArray(aud.value)?aud.value:[]):[],
        wallets: wal.status==="fulfilled"?(Array.isArray(wal.value)?wal.value:[]):[],
      });
    } catch {}
  }, [user, api]);

  // Load portfolio balance for sidebar
  useEffect(() => {
    api("/me/portfolio").then(d => { if (d?.totalUsd != null) setPortfolioUsd(d.totalUsd); }).catch(()=>{});
  }, [api]);

  useEffect(() => { loadData(); }, [loadData]);
  useEffect(() => { if (!loading && !user) navigate("/login"); }, [loading, user, navigate]);

  const handleRefresh = () => { refreshUser(); loadData(); };

  if (loading || !user) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const score = data.security?.score ?? 0;

  return (
    <div className={`min-h-screen bg-background flex flex-col${themeClass ? ` ${themeClass}` : ""}`}>
      {/* Live Ticker */}
      <LiveTicker />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 glass border-r border-white/10 flex flex-col overflow-y-auto">
          <Link href="/" className="flex items-center gap-2 px-5 py-4 border-b border-white/10 shrink-0">
            <div className="w-8 h-8 rounded-full bg-black/50 border border-primary/20 flex items-center justify-center">
              <img src="/knight-head.png" alt="KK" className="w-5 h-5 drop-shadow-[0_0_6px_rgba(0,255,156,0.8)]" />
            </div>
            <span className="font-bold text-sm tracking-tight text-white">KRYPTO KNIGHT</span>
          </Link>

          {/* User + Balance Card */}
          <div className="px-4 py-4 border-b border-white/5 shrink-0">
            <div className="glass-card rounded-xl p-4 mb-3">
              <p className="text-xs text-muted-foreground mb-1">Total Balance</p>
              <p className="text-xl font-bold text-white">
                {portfolioUsd != null ? `$${portfolioUsd.toLocaleString("en-US",{maximumFractionDigits:2})}` : "—"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-sm">
                {(user.firstName?.[0] ?? user.email[0]).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{user.firstName ?? user.email.split("@")[0]}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Security</span>
                <span className={score>=70?"text-primary":score>=40?"text-amber-400":"text-red-400"}>{score}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${score>=70?"bg-primary":score>=40?"bg-amber-400":"bg-red-400"}`} style={{width:`${score}%`}} />
              </div>
            </div>
          </div>

          <nav className="flex-1 py-3 px-3">
            {/* Home link */}
            <Link href="/"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-2 text-left transition-colors hover:bg-white/5 border border-white/5 hover:border-white/10">
              <Home className="w-4 h-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Home</p>
                <p className="text-xs text-muted-foreground/60">Back to site</p>
              </div>
            </Link>
            {TABS.map(({ id, label, icon: Icon, sub }) => (
              <button key={id} onClick={() => setTab(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-left transition-colors ${tab===id ? "bg-primary/10 border border-primary/20" : "hover:bg-white/5"}`}>
                <Icon className={`w-4 h-4 shrink-0 ${tab===id?"text-primary":"text-muted-foreground"}`} />
                <div>
                  <p className={`text-sm font-medium ${tab===id?"text-white":"text-muted-foreground"}`}>{label}</p>
                  <p className="text-xs text-muted-foreground/60">{sub}</p>
                </div>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-white/10 shrink-0 space-y-1">
            <button onClick={toggleTheme}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors w-full px-3 py-2 rounded-lg hover:bg-white/5">
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {dark ? "Light Mode" : "Dark Mode"}
            </button>
            <button onClick={async () => { await logout(); navigate("/"); }}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors w-full px-3 py-2 rounded-lg hover:bg-white/5">
              <LogOut className="w-4 h-4" />Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 lg:p-8">
          {tab === "overview"      && <OverviewTab user={user} security={data.security} apiKeys={data.apiKeys} audit={data.audit} />}
          {tab === "portfolio"     && <PortfolioTab useApi={useApi} />}
          {tab === "exchange"      && <ExchangeTab useApi={useApi} />}
          {tab === "swap"          && <SwapTab useApi={useApi} />}
          {tab === "wallets"       && <WalletsTab useApi={useApi} />}
          {tab === "watchlist"     && <WatchlistTab useApi={useApi} />}
          {tab === "vault"         && <WalletTab wallets={data.wallets} onRefresh={handleRefresh} />}
          {tab === "staking"       && <StakingTab />}
          {tab === "earn"          && <EarnTab />}
          {tab === "nfts"          && <NFTsTab />}
          {tab === "profile"       && <ProfileTab user={user} onRefresh={handleRefresh} />}
          {tab === "security"      && <SecurityTab user={user} security={data.security} sessions={data.sessions} onRefresh={handleRefresh} />}
          {tab === "keys"          && <ApiKeysTab apiKeys={data.apiKeys} onRefresh={handleRefresh} />}
          {tab === "notifications" && <NotificationsTab user={user} />}
        </main>
      </div>
    </div>
  );
}
