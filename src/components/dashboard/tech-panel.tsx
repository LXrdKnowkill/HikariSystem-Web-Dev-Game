"use client";

import { useGameStore, useGameActions } from "@/store/game-store";
import { technologies as allTechs, ranks } from "@/lib/game-logic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, ChevronRight, FlaskConical, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TechPanel() {
  const { money, technologies: ownedTechs, rank } = useGameStore();
  const { researchTechnology } = useGameActions();
  const { toast } = useToast();

  const handleResearch = (techId: string, cost: number) => {
    if (money >= cost) {
      researchTechnology(techId);
       toast({
        title: "Pesquisa Concluída!",
        description: `Você aprendeu ${allTechs.find(t => t.id === techId)?.name}.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Fundos Insuficientes",
        description: "Você precisa de mais dinheiro para pesquisar esta tecnologia.",
      });
    }
  };
  
  const currentRankIndex = ranks.findIndex(r => r.name === rank);

  return (
    <Card className="shadow-lg h-full border-0">
      <CardHeader>
        <div className="flex items-center gap-3">
            <FlaskConical className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline">Tecnologias</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <ScrollArea className="h-[55vh]">
            <div className="flex flex-col gap-2 pr-4">
              {allTechs.map((tech, index) => {
                const requiredRankIndex = tech.requiredRank ? ranks.findIndex(r => r.name === tech.requiredRank) : -1;
                const isLocked = requiredRankIndex > currentRankIndex;

                return (
                  <div key={tech.id}>
                    <div className="flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-muted/50">
                      <div className="flex flex-col">
                        <h4 className="font-semibold">{tech.name}</h4>
                        <p className="text-xs text-muted-foreground">{tech.description}</p>
                        {isLocked && (
                            <p className="text-xs text-destructive/80 font-medium mt-1">Requer: {tech.requiredRank}</p>
                        )}
                      </div>
                      {ownedTechs[tech.id] ? (
                        <div className="flex items-center gap-2 text-green-400">
                          <CheckCircle className="h-5 w-5" />
                          <span className="text-sm font-medium">Adquirida</span>
                        </div>
                      ) : (
                         <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="relative">
                                    <Button
                                      size="sm"
                                      onClick={() => handleResearch(tech.id, tech.cost)}
                                      disabled={money < tech.cost || isLocked}
                                    >
                                      {isLocked && <Lock className="h-4 w-4 mr-1" />}
                                      ${tech.cost}
                                      {!isLocked && <ChevronRight className="h-4 w-4 ml-1" />}
                                    </Button>
                                </div>
                            </TooltipTrigger>
                             {(money < tech.cost || isLocked) && (
                                <TooltipContent>
                                    {isLocked ? `Requer cargo: ${tech.requiredRank}` : `Dinheiro insuficiente`}
                                </TooltipContent>
                             )}
                        </Tooltip>
                      )}
                    </div>
                    {index < allTechs.length - 1 && <Separator />}
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
