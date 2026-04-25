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
  Key, Clock, CheckCircle2, XCircle, AlertTriangle, Copy, Plus, Trash2
} from "lucide-react";

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
  const daysActive = Math.floor((Date.now() - new Date(user.createdAt).getTime()) / 86400000);
  const score = security?.score ?? 0;
  const scoreLabel = score >= 70 ? "Strong" : score >= 40 ? "Fair" : "Needs Attention";
  const scoreColor = score >= 70 ? "text-primary" : score >= 40 ? "text-amber-400" : "text-red-400";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Welcome back, {user.firstName || user.email.split("@")[0]}</h2>
        <p className="text-muted-foreground text-sm">Here's an overview of your account status and security.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Shield, label: "Security Score", value: `${score}/100`, sub: scoreLabel, color: scoreColor },
          { icon: Clock, label: "Account Age", value: `${daysActive} days`, sub: "Member since " + new Date(user.createdAt).toLocaleDateString() },
          { icon: Key, label: "API Keys", value: apiKeys.filter(k => k.isActive).length.toString(), sub: "Active keys" },
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
            ].map(({ label, done }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  {done
                    ? <CheckCircle2 className="w-4 h-4 text-primary" />
                    : <XCircle className="w-4 h-4 text-muted-foreground" />}
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
                    {log.details && <p className="text-xs text-muted-foreground">{log.details}</p>}
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
            <button onClick={() => { navigator.clipboard.writeText(user.id); }} className="text-xs text-muted-foreground hover:text-primary mt-1 flex items-center gap-1">
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

  const revoke = async (id: string) => {
    await api(`/me/sessions/${id}`, { method: "DELETE" });
    onRefresh();
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
              {!user.phoneVerified && <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">Phone Unverified</span>}
              {user.twoFaEnabled && user.emailVerified && user.phoneVerified && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">All Verified</span>}
            </div>
            <p className={`text-2xl font-bold ${scoreColor}`}>{scoreLabel}</p>
            <p className="text-sm text-muted-foreground">Security score: {score}/100</p>
          </div>
          <ScoreRing score={score} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass border border-white/10 rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="font-semibold text-white">Two-Factor Authentication</p>
            <p className="text-sm text-muted-foreground">Add an extra layer of security.</p>
          </div>
          {user.twoFaEnabled
            ? <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary font-medium">Enabled</span>
            : <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">Enable</Button>}
        </div>
        <div className="glass border border-white/10 rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="font-semibold text-white">Email Verification</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          {user.emailVerified
            ? <CheckCircle2 className="w-5 h-5 text-primary" />
            : <Button size="sm" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">Verify</Button>}
        </div>
      </div>

      <div className="glass border border-white/10 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-white">Active Sessions</h3>
            <p className="text-xs text-muted-foreground">Devices currently logged in</p>
          </div>
          <Button size="sm" variant="outline" className="border-white/10 text-muted-foreground hover:text-white" onClick={async () => { await api("/me/sessions", { method: "DELETE" }); onRefresh(); }}>
            Sign Out All
          </Button>
        </div>
        {sessions.length === 0
          ? <p className="text-sm text-muted-foreground">No active sessions.</p>
          : sessions.map((s: any) => (
            <div key={s.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
              <div>
                <p className="text-sm text-white">{s.userAgent ?? "Unknown device"}</p>
                <p className="text-xs text-muted-foreground">{s.ipAddress ?? ""} · {timeAgo(s.createdAt)}</p>
              </div>
              <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10" onClick={() => revoke(s.id)}>Revoke</Button>
            </div>
          ))}
      </div>

      {(!user.twoFaEnabled || !user.emailVerified || !user.phoneVerified) && (
        <div className="glass border border-amber-500/20 rounded-xl p-5">
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-400" />Security Recommendations</h3>
          <div className="space-y-2">
            {!user.twoFaEnabled && <p className="text-sm text-muted-foreground flex gap-2"><AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />Enable Two-Factor Authentication to protect your account from unauthorized access.</p>}
            {!user.emailVerified && <p className="text-sm text-muted-foreground flex gap-2"><AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />Verify your email address to unlock full account features.</p>}
            {!user.phoneVerified && <p className="text-sm text-muted-foreground flex gap-2"><AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />Add phone verification for additional account recovery options.</p>}
          </div>
        </div>
      )}
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
      setNewKey(data.key);
      setName("");
      onRefresh();
    } catch { /* ignore */ }
    setCreating(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">API Keys</h2>
        <p className="text-muted-foreground text-sm">Manage your API access keys.</p>
      </div>

      {newKey && (
        <Alert className="border-primary/30 bg-primary/10">
          <AlertDescription className="text-primary">
            <p className="font-semibold mb-1">New API key created — copy it now, it won't be shown again:</p>
            <code className="text-xs break-all">{newKey}</code>
            <button onClick={() => { navigator.clipboard.writeText(newKey); }} className="ml-2 text-xs underline">Copy</button>
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
        {apiKeys.length === 0
          ? <p className="text-sm text-muted-foreground">No API keys yet.</p>
          : apiKeys.map((k: any) => (
            <div key={k.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
              <div>
                <p className="text-sm font-medium text-white">{k.name}</p>
                <p className="text-xs text-muted-foreground">{k.keyPrefix}… · Created {timeAgo(k.createdAt)}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${k.isActive ? "bg-primary/20 text-primary" : "bg-red-500/20 text-red-400"}`}>{k.isActive ? "Active" : "Revoked"}</span>
                <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1.5" onClick={async () => { await api(`/me/api-keys/${k.id}`, { method: "DELETE" }); onRefresh(); }}>
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
    api("/me/notifications").then(d => d && setPrefs(d.preferences));
  }, []);

  const save = async () => {
    setSaving(true);
    await api("/me/notifications", { method: "PATCH", body: JSON.stringify(prefs) });
    setSaving(false);
  };

  if (!prefs) return <div className="text-muted-foreground text-sm">Loading…</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Notification Preferences</h2>
        <p className="text-muted-foreground text-sm">Choose how you want to receive notifications.</p>
      </div>
      <div className="glass border border-white/10 rounded-xl divide-y divide-white/5">
        {[
          { key: "emailNotifications", label: "Email Notifications", desc: `Receive notifications via email at ${user.email}` },
          { key: "smsNotifications", label: "SMS Notifications", desc: "Receive notifications via SMS" },
          { key: "pushNotifications", label: "Push Notifications", desc: "Receive notifications on your devices" },
          { key: "securityAlerts", label: "Security Alerts", desc: "Login attempts, password changes, API key usage" },
          { key: "marketingEmails", label: "Marketing Emails", desc: "Product updates and announcements" },
        ].map(({ key, label, desc }) => (
          <div key={key} className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium text-white">{label}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
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

// ─── Wallet ───────────────────────────────────────────────────────────────────
function WalletTab({ wallets, onRefresh }: { wallets: any[]; onRefresh: () => void }) {
  const api = useApi();

  const disconnect = async (id: string) => {
    await api(`/me/wallets/${id}`, { method: "DELETE" });
    onRefresh();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">External Wallet Connection</h2>
        <p className="text-muted-foreground text-sm">Connect your Web3 wallet for blockchain transactions.</p>
      </div>

      {wallets.length === 0 ? (
        <div className="glass border border-white/10 rounded-xl p-8 text-center">
          <Wallet className="w-12 h-12 text-primary/50 mx-auto mb-4" />
          <h3 className="font-semibold text-white mb-2">Connect Your Crypto Wallet</h3>
          <p className="text-sm text-muted-foreground mb-6">Link your wallet to access blockchain features, manage digital assets, and enable secure transactions.</p>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {["Secure", "Fast", "Multi-chain"].map(tag => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full border border-white/10 text-muted-foreground">{tag}</span>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["MetaMask", "WalletConnect", "Coinbase", "Trust Wallet"].map(w => (
              <button key={w} className="py-2.5 px-3 rounded-lg border border-white/10 text-sm text-muted-foreground hover:border-primary/40 hover:text-white transition-colors">
                {w}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="glass border border-white/10 rounded-xl p-5">
          {wallets.map((w: any) => (
            <div key={w.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
              <div>
                <p className="text-sm font-mono text-white">{w.address.slice(0, 6)}…{w.address.slice(-4)}</p>
                <p className="text-xs text-muted-foreground">{w.walletType} · {w.network}</p>
              </div>
              <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10" onClick={() => disconnect(w.id)}>Disconnect</Button>
            </div>
          ))}
        </div>
      )}

      <div className="glass border border-white/10 rounded-xl p-5 flex gap-3">
        <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">Your wallet connection is secure and encrypted. We never store your private keys. Only sign transactions that you initiate and trust.</p>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, sub: "Account summary" },
  { id: "profile", label: "Profile", icon: User, sub: "Personal information" },
  { id: "security", label: "Security", icon: Shield, sub: "Protection settings" },
  { id: "keys", label: "API Keys", icon: Key, sub: "Access management" },
  { id: "notifications", label: "Notifications", icon: Bell, sub: "Alert preferences" },
  { id: "wallet", label: "Wallet", icon: Wallet, sub: "Connected wallets" },
];

export default function Dashboard() {
  const { user, logout, loading, refreshUser } = useAuth();
  const [, navigate] = useLocation();
  const [tab, setTab] = useState("overview");
  const api = useApi();

  const [data, setData] = useState<any>({ security: null, apiKeys: [], sessions: [], audit: [], wallets: [] });

  const loadData = useCallback(async () => {
    if (!user) return;
    try {
      const [sec, keys, sess, aud, wal] = await Promise.allSettled([
        api("/me/security"),
        api("/me/api-keys"),
        api("/me/sessions"),
        api("/me/audit?limit=10"),
        api("/me/wallets"),
      ]);
      setData({
        security: sec.status === "fulfilled" ? sec.value : null,
        apiKeys: keys.status === "fulfilled" ? (keys.value?.keys ?? []) : [],
        sessions: sess.status === "fulfilled" ? (sess.value?.sessions ?? []) : [],
        audit: aud.status === "fulfilled" ? (aud.value?.logs ?? []) : [],
        wallets: wal.status === "fulfilled" ? (wal.value?.wallets ?? []) : [],
      });
    } catch { /* ignore */ }
  }, [user, api]);

  useEffect(() => { loadData(); }, [loadData]);

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [loading, user, navigate]);

  const handleRefresh = () => { refreshUser(); loadData(); };

  if (loading || !user) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const score = data.security?.score ?? 0;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 glass border-r border-white/10 flex flex-col">
        <Link href="/" className="flex items-center gap-2 px-5 py-5 border-b border-white/10">
          <div className="w-8 h-8 rounded-full bg-black/50 border border-primary/20 flex items-center justify-center">
            <img src="/knight-head.png" alt="KK" className="w-5 h-5 drop-shadow-[0_0_6px_rgba(0,255,156,0.8)]" />
          </div>
          <span className="font-bold text-sm tracking-tight text-white">KRYPTO KNIGHT</span>
        </Link>

        <div className="px-4 py-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary">
              {(user.firstName?.[0] ?? user.email[0]).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user.firstName ?? user.email.split("@")[0]}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Profile</span><span className={score >= 70 ? "text-primary" : score >= 40 ? "text-amber-400" : "text-red-400"}>{score}%</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all ${score >= 70 ? "bg-primary" : score >= 40 ? "bg-amber-400" : "bg-red-400"}`} style={{ width: `${score}%` }} />
            </div>
          </div>
        </div>

        <nav className="flex-1 py-3 px-3">
          {TABS.map(({ id, label, icon: Icon, sub }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-left transition-colors ${tab === id ? "bg-primary/10 border border-primary/20" : "hover:bg-white/5"}`}>
              <Icon className={`w-4 h-4 shrink-0 ${tab === id ? "text-primary" : "text-muted-foreground"}`} />
              <div>
                <p className={`text-sm font-medium ${tab === id ? "text-white" : "text-muted-foreground"}`}>{label}</p>
                <p className="text-xs text-muted-foreground/60">{sub}</p>
              </div>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={async () => { await logout(); navigate("/"); }}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors w-full px-3 py-2 rounded-lg hover:bg-white/5">
            <LogOut className="w-4 h-4" />Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-8">
        {tab === "overview" && <OverviewTab user={user} security={data.security} apiKeys={data.apiKeys} audit={data.audit} />}
        {tab === "profile" && <ProfileTab user={user} onRefresh={handleRefresh} />}
        {tab === "security" && <SecurityTab user={user} security={data.security} sessions={data.sessions} onRefresh={handleRefresh} />}
        {tab === "keys" && <ApiKeysTab apiKeys={data.apiKeys} onRefresh={handleRefresh} />}
        {tab === "notifications" && <NotificationsTab user={user} />}
        {tab === "wallet" && <WalletTab wallets={data.wallets} onRefresh={handleRefresh} />}
      </main>
    </div>
  );
}
