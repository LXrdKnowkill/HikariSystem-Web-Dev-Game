"use client";

import { useGameStore, useGameActions } from "@/store/game-store";
import { upgrades as allUpgrades } from "@/lib/game-logic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Zap, CheckCircle, ChevronRight, Palette, Sprout, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function UpgradesPanel() {
  const { money, upgrades: purchasedUpgrades, career } = useGameStore();
  const { purchaseUpgrade } = useGameActions();
  const { toast } = useToast();

  const handlePurchase = (upgradeId: string) => {
    const upgrade = allUpgrades.find(u => u.id === upgradeId);
    if (!upgrade) return;

    const currentLevel = purchasedUpgrades[upgradeId] || 0;
    if (currentLevel >= upgrade.levels.length) {
       toast({
        title: "Nível Máximo",
        description: `Você já alcançou o nível máximo para ${upgrade.name}.`,
      });
      return;
    }

    const cost = upgrade.levels[currentLevel].cost;

    if (money >= cost) {
      purchaseUpgrade(upgradeId);
      toast({
        title: "Upgrade Adquirido!",
        description: `Você melhorou ${upgrade.name} para o nível ${currentLevel + 1}.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Fundos Insuficientes",
        description: "Você precisa de mais dinheiro para comprar este upgrade.",
      });
    }
  };

  const availableUpgrades = allUpgrades.filter(u => !u.career || u.career === career);

  return (
    <Card className="shadow-lg h-full border-0 rounded-t-none">
       <CardHeader>
        <div className="flex items-center gap-3">
            <CardTitle className="font-headline sr-only">Upgrades Passivos</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <TooltipProvider>
          <ScrollArea className="h-[calc(100vh-280px)]">
            <div className="flex flex-col gap-2 pr-4">
              {availableUpgrades.map((upgrade, index) => {
                const currentLevel = purchasedUpgrades[upgrade.id] || 0;
                const maxLevel = upgrade.levels.length;
                const isMaxed = currentLevel >= maxLevel;
                const nextLevelStats = !isMaxed ? upgrade.levels[currentLevel] : null;

                return (
                  <div key={upgrade.id}>
                    <div className="flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-muted/50">
                      <div className="flex items-center gap-3">
                         <upgrade.icon className="h-6 w-6 text-primary/80" />
                         <div className="flex flex-col">
                            <h4 className="font-semibold">{upgrade.name}</h4>
                            <p className="text-xs text-muted-foreground">{upgrade.description}</p>
                             <p className="text-xs font-medium mt-1">Nível: {currentLevel} / {maxLevel}</p>
                         </div>
                      </div>
                      
                      {isMaxed ? (
                        <div className="flex items-center gap-2 text-green-400">
                          <CheckCircle className="h-5 w-5" />
                          <span className="text-sm font-medium">Máximo</span>
                        </div>
                      ) : (
                         <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="relative">
                                    <Button
                                      size="sm"
                                      onClick={() => handlePurchase(upgrade.id)}
                                      disabled={money < nextLevelStats!.cost}
                                    >
                                      ${nextLevelStats!.cost.toLocaleString('pt-BR')}
                                      <ChevronRight className="h-4 w-4 ml-1" />
                                    </Button>
                                </div>
                            </TooltipTrigger>
                             {money < nextLevelStats!.cost && (
                                <TooltipContent>
                                    Dinheiro insuficiente
                                </TooltipContent>
                             )}
                        </Tooltip>
                      )}
                    </div>
                    {index < availableUpgrades.length - 1 && <Separator />}
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
