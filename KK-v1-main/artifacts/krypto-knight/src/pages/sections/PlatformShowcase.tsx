import React from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card } from "@/components/ui/card";
import { ArrowUpRight, Wallet, ArrowDownRight, TrendingUp, Activity } from "lucide-react";

const chartData = [
  { time: '00:00', value: 42000, volume: 1200 },
  { time: '04:00', value: 42500, volume: 1800 },
  { time: '08:00', value: 41800, volume: 2200 },
  { time: '12:00', value: 43200, volume: 3100 },
  { time: '16:00', value: 44100, volume: 4500 },
  { time: '20:00', value: 43800, volume: 2800 },
  { time: '24:00', value: 45200, volume: 3800 },
];

const txData = [
  { id: 'tx_1', type: 'Deposit', amount: '+ 12.5 BTC', status: 'Completed', time: '2 mins ago' },
  { id: 'tx_2', type: 'Withdrawal', amount: '- 145,000 USDC', status: 'Processing', time: '15 mins ago' },
  { id: 'tx_3', type: 'Trade', amount: '500 ETH', status: 'Completed', time: '1 hour ago' },
  { id: 'tx_4', type: 'Deposit', amount: '+ 2,400 SOL', status: 'Completed', time: '3 hours ago' },
];

const PlatformShowcase = () => {
  return (
    <section id="platform" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute top-1/2 left-0 w-1/3 h-1/2 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Institutional-Grade Interface
          </h2>
          <p className="text-lg text-muted-foreground">
            A commanding dashboard designed for high-volume trading, treasury management, and multi-asset portfolio tracking.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-xl p-4 md:p-6 border border-white/10 shadow-2xl relative overflow-hidden"
        >
          {/* UI Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <img src="/knight-head.png" alt="Logo" className="w-6 h-6" />
              <span className="font-semibold text-white">Krypto Knight Terminal</span>
            </div>
            <div className="flex gap-2">
              <div className="px-3 py-1 bg-white/5 rounded-md text-xs font-mono text-muted-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Connected
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Chart Area */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Portfolio Value", value: "$45,231,890", change: "+4.2%", icon: Wallet },
                  { label: "24h Volume", value: "$12,450,000", change: "+12.1%", icon: Activity },
                  { label: "Active Assets", value: "14", change: "0", icon: TrendingUp },
                  { label: "Total Yield", value: "$245,900", change: "+1.4%", icon: ArrowUpRight }
                ].map((stat, i) => (
                  <Card key={i} className="bg-black/40 border-white/5 p-4 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <stat.icon className="w-4 h-4 text-muted-foreground" />
                      <span className={`text-xs font-mono ${stat.change.startsWith('+') ? 'text-primary' : 'text-muted-foreground'}`}>
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                    <div className="text-xl font-bold text-white tracking-tight">{stat.value}</div>
                  </Card>
                ))}
              </div>

              <Card className="bg-black/40 border-white/5 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Portfolio Performance</h3>
                    <p className="text-xs text-muted-foreground">Aggregated across all custody accounts</p>
                  </div>
                  <div className="flex gap-2">
                    {['1D', '1W', '1M', 'ALL'].map(t => (
                      <button key={t} className={`px-2 py-1 text-xs rounded-sm font-mono ${t === '1D' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-white/5'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0D0F18', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            {/* Sidebar / Transactions */}
            <div className="space-y-6">
              <Card className="bg-black/40 border-white/5 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {txData.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 rounded-md bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.type === 'Deposit' ? 'bg-primary/20 text-primary' : tx.type === 'Trade' ? 'bg-blue-500/20 text-blue-500' : 'bg-white/10 text-white'}`}>
                          {tx.type === 'Deposit' ? <ArrowDownRight className="w-4 h-4" /> : tx.type === 'Trade' ? <Activity className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{tx.type}</div>
                          <div className="text-xs text-muted-foreground font-mono">{tx.time}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${tx.type === 'Deposit' ? 'text-primary' : 'text-white'}`}>{tx.amount}</div>
                        <div className="text-xs text-muted-foreground">{tx.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 text-sm text-primary hover:bg-primary/5 rounded-md transition-colors border border-primary/20">
                  View All Transactions
                </button>
              </Card>

              <Card className="bg-black/40 border-white/5 p-6 rounded-lg">
                <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Volume Distribution</h3>
                <div className="h-[150px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <Tooltip 
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        contentStyle={{ backgroundColor: '#0D0F18', border: '1px solid rgba(255,255,255,0.1)' }}
                      />
                      <Bar dataKey="volume" fill="rgba(255,255,255,0.2)" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformShowcase;
