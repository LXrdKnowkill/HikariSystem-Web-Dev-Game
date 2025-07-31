"use client";

import { useGameStore, useGameActions } from "@/store/game-store";
import { technologies as allTechs } from "@/lib/game-logic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, ChevronRight, FlaskConical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TechPanel() {
  const { money, technologies: ownedTechs } = useGameStore();
  const { researchTechnology } = useGameActions();
  const { toast } = useToast();

  const handleResearch = (techId: string, cost: number) => {
    if (money >= cost) {
      researchTechnology(techId);
       toast({
        title: "Research Complete!",
        description: `You've learned ${allTechs.find(t => t.id === techId)?.name}.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Insufficient Funds",
        description: "You need more money to research this technology.",
      });
    }
  };

  return (
    <Card className="shadow-lg h-full">
      <CardHeader>
        <div className="flex items-center gap-3">
            <FlaskConical className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline">Technologies</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[60vh]">
          <div className="flex flex-col gap-2 pr-4">
            {allTechs.map((tech, index) => (
              <div key={tech.id}>
                <div className="flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-muted/50">
                  <div>
                    <h4 className="font-semibold">{tech.name}</h4>
                    <p className="text-xs text-muted-foreground">{tech.description}</p>
                  </div>
                  {ownedTechs[tech.id] ? (
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">Owned</span>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleResearch(tech.id, tech.cost)}
                      disabled={money < tech.cost}
                    >
                      ${tech.cost}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                </div>
                {index < allTechs.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
