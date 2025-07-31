"use client"

import { useGameStore } from "@/store/game-store"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Coins, Sparkles } from "lucide-react";

const formatNumber = (num: number) => {
    if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
    return num.toString()
}

export default function StatsChart() {
  const { moneyHistory, xpHistory } = useGameStore()

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col space-y-1">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                {payload[0].name === 'money' ? 'Dinheiro' : 'XP'}
              </span>
              <span className="font-bold text-foreground">
                {formatNumber(payload[0].value)}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };


  if (moneyHistory.length < 2 && xpHistory.length < 2) {
    return (
        <Card className="shadow-lg">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    <CardTitle className="font-headline">Seu Progresso</CardTitle>
                </div>
                 <CardDescription>Jogue um pouco para ver seu progresso ao longo do tempo.</CardDescription>
            </CardHeader>
            <CardContent className="h-48 flex items-center justify-center">
                 <p className="text-muted-foreground text-sm">Aguardando dados...</p>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card className="shadow-lg">
        <CardHeader>
             <div className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-primary" />
                <CardTitle className="font-headline">Seu Progresso</CardTitle>
            </div>
            <CardDescription>Sua performance nas últimas sessões.</CardDescription>
        </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-56">
            <div>
                 <h4 className="text-sm font-semibold mb-2 flex items-center gap-2 text-primary/90">
                    <Coins className="h-4 w-4" />
                    Histórico de Dinheiro
                </h4>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={moneyHistory.map(h => ({ name: h.time, money: h.value }))} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorMoney" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                        <XAxis dataKey="name" tickFormatter={() => ''} tickLine={false} axisLine={false} />
                        <YAxis tickFormatter={(value) => formatNumber(Number(value))} />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}/>
                        <Area type="monotone" dataKey="money" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorMoney)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div>
                 <h4 className="text-sm font-semibold mb-2 flex items-center gap-2 text-primary/90">
                    <Sparkles className="h-4 w-4" />
                    Histórico de XP
                </h4>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={xpHistory.map(h => ({ name: h.time, xp: h.value }))} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                        <defs>
                             <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                        <XAxis dataKey="name" tickFormatter={() => ''} tickLine={false} axisLine={false} />
                        <YAxis tickFormatter={(value) => formatNumber(Number(value))} />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}/>
                        <Area type="monotone" dataKey="xp" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorXp)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}
