"use client";

import { useGameStore, useGameActions } from "@/store/game-store";
import { officeItems as allOfficeItems } from "@/lib/game-logic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, ChevronRight, AlertCircle, Armchair } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function OfficePanel() {
  const { money, officeItems: purchasedItems } = useGameStore();
  const { purchaseOfficeItem } = useGameActions();
  const { toast } = useToast();

  const handlePurchase = (itemId: string, cost: number) => {
    if (money >= cost) {
      purchaseOfficeItem(itemId);
      toast({
        title: <div className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /><span>Item Comprado!</span></div>,
        description: `Você decorou seu escritório com ${allOfficeItems.find(i => i.id === itemId)?.name}.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: <div className="flex items-center gap-2"><AlertCircle className="h-5 w-5" /><span>Fundos Insuficientes</span></div>,
        description: "Você precisa de mais dinheiro para comprar este item.",
      });
    }
  };

  return (
    <Card className="shadow-lg h-full border-0 rounded-t-none">
      <CardHeader>
        <div className="flex items-center gap-3">
          <CardTitle className="font-headline sr-only">Escritório</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <TooltipProvider>
          <ScrollArea className="h-[calc(100vh-280px)]">
            <div className="flex flex-col gap-2 pr-4">
              {allOfficeItems.map((item, index) => {
                const isPurchased = purchasedItems[item.id];
                return (
                  <div key={item.id}>
                    <div className="flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-muted/50">
                      <div className="flex items-center gap-3">
                         <item.icon className="h-6 w-6 text-primary/80" />
                         <div className="flex flex-col">
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                         </div>
                      </div>
                      
                      {isPurchased ? (
                        <div className="flex items-center gap-2 text-green-400">
                          <CheckCircle className="h-5 w-5" />
                          <span className="text-sm font-medium">Adquirido</span>
                        </div>
                      ) : (
                         <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="relative">
                                    <Button
                                      size="sm"
                                      onClick={() => handlePurchase(item.id, item.cost)}
                                      disabled={money < item.cost}
                                    >
                                      ${item.cost.toLocaleString('pt-BR')}
                                      <ChevronRight className="h-4 w-4 ml-1" />
                                    </Button>
                                </div>
                            </TooltipTrigger>
                             {money < item.cost && (
                                <TooltipContent>
                                    Dinheiro insuficiente
                                </TooltipContent>
                             )}
                        </Tooltip>
                      )}
                    </div>
                    {index < allOfficeItems.length - 1 && <Separator />}
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
