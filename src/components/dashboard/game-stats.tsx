"use client";

import { useGameStore } from "@/store/game-store";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, BarChart, BrainCircuit } from "lucide-react";

export default function GameStats() {
  const { money, xp, level } = useGameStore();

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("pt-BR", {
      notation: "compact",
      compactDisplay: "short",
    }).format(num);
  };

  const xpForNextLevel = Math.pow((level) / 1, 1 / 0.7) * 100;
  const xpProgress = ((xp - (Math.pow((level-1)/1, 1/0.7) * 100)) / (xpForNextLevel - (Math.pow((level-1)/1, 1/0.7) * 100))) * 100;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-muted/50 rounded-lg flex flex-col items-center justify-center">
            <DollarSign className="h-6 w-6 mb-2 text-primary" />
            <span className="text-2xl font-bold font-headline">
              ${formatNumber(money)}
            </span>
            <span className="text-sm text-muted-foreground">Dinheiro</span>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg flex flex-col items-center justify-center">
            <BrainCircuit className="h-6 w-6 mb-2 text-primary" />
            <span className="text-2xl font-bold font-headline">
              {formatNumber(xp)}
            </span>
            <span className="text-sm text-muted-foreground">XP Total</span>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg flex flex-col items-center justify-center">
            <BarChart className="h-6 w-6 mb-2 text-primary" />
            <span className="text-2xl font-bold font-headline">
              {level}
            </span>
            <span className="text-sm text-muted-foreground">Nível</span>
          </div>
        </div>
         <div className="mt-4">
            <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${xpProgress}%` }}></div>
            </div>
            <p className="text-center text-xs mt-1 text-muted-foreground">XP para o próximo nível</p>
        </div>
      </CardContent>
    </Card>
  );
}
