"use client";

import { useGameStore, useGameActions } from "@/store/game-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Code, Briefcase } from "lucide-react";

export default function ProjectCard() {
  const { currentProject } = useGameStore();
  const { getNewProject } = useGameActions();

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Briefcase className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Projeto Atual</CardTitle>
        </div>
        {currentProject && (
            <CardDescription>{currentProject.company}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {currentProject ? (
          <div className="flex flex-col gap-4">
            <div>
              <p className="font-semibold text-lg">{currentProject.task}</p>
              <p className="text-sm text-muted-foreground font-code">
                Tecnologia: <span className="text-primary">{currentProject.techRequirement}</span>
              </p>
            </div>
            <Progress value={(currentProject.progress / currentProject.effort) * 100} />
            <div className="flex justify-between text-sm font-mono">
              <span>
                Progresso: {Math.floor(currentProject.progress).toFixed(0)} / {Math.ceil(currentProject.effort)}
              </span>
              <span>
                Recompensa: ${currentProject.reward.toFixed(0)}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 flex flex-col items-center gap-4">
            <p className="text-muted-foreground">Nenhum projeto ativo. Hora de encontrar trabalho!</p>
            <Button onClick={getNewProject}>
              <Code className="mr-2 h-4 w-4" />
              Encontrar Novo Projeto
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
