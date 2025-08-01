"use client";

import { useGameStore, useGameActions } from "@/store/game-store";
import { useGameLoop } from "@/hooks/use-game-loop";
import { useIsHydrated } from "@/hooks/use-is-hydrated";
import GameStats from "@/components/dashboard/game-stats";
import ProjectCard from "@/components/dashboard/project-card";
import TechPanel from "@/components/dashboard/tech-panel";
import UpgradesPanel from "@/components/dashboard/upgrades-panel";
import OfficePanel from "@/components/dashboard/office-panel";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { careers, GameEventOption, ranks } from "@/lib/game-logic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card } from "@/components/ui/card";
import { FlaskConical, Zap, Gem, Armchair } from "lucide-react";

export default function DashboardPage() {
  useGameLoop();
  const router = useRouter();
  const isHydrated = useIsHydrated();
  const { reset, applyEvent, clearEvent, prestige } = useGameActions();
  const { career, currentEvent, rank } = useGameStore();
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  // Modificação: só redireciona após um delay para garantir que o estado foi carregado
  useEffect(() => {
    if (isHydrated && !career && !redirecting) {
      setRedirecting(true);
      setTimeout(() => {
        router.replace('/career-selection');
      }, 500); // Delay de 500ms para garantir que o estado foi carregado completamente
    }
  }, [isHydrated, career, router, redirecting]);
  
  useEffect(() => {
    if (currentEvent) {
      setIsEventModalOpen(true);
    }
  }, [currentEvent]);

  const handleEventChoice = (option?: GameEventOption) => {
      if(currentEvent) {
        applyEvent(currentEvent.effects || option?.effects);
        clearEvent();
        setIsEventModalOpen(false);
      }
  };
  
  const handlePrestige = () => {
    prestige();
  }

  const currentCareer = careers.find(c => c.id === career);
  const canPrestige = rank === ranks[ranks.length - 1].name;

  // Se ainda está carregando ou redirecionando, mostra skeleton
  if (!isHydrated || !career || redirecting) {
    return <DashboardSkeleton />;
  }

  return (
    <>
      <div className="min-h-screen bg-background text-foreground p-4 md:p-8 animate-in fade-in duration-500">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            {currentCareer && <currentCareer.icon className="h-8 w-8 text-primary" />}
            <h1 className="text-2xl md:text-3xl font-headline font-bold">
              {currentCareer?.name || "Dev Web Ocioso"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {canPrestige && (
               <Button variant="secondary" onClick={handlePrestige}>
                  <Gem className="mr-2 h-4 w-4" />
                  Prestigiar
               </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => {
              reset();
              router.push('/career-selection');
            }}>
               Reiniciar Jogo
            </Button>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <GameStats />
            <ProjectCard />
          </div>
          <div className="lg:col-span-1">
             <Card className="shadow-lg h-full">
              <Tabs defaultValue="tech" className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="tech"><FlaskConical className="mr-2 h-4 w-4" /> Tecnologias</TabsTrigger>
                  <TabsTrigger value="upgrades"><Zap className="mr-2 h-4 w-4"/>Upgrades</TabsTrigger>
                  <TabsTrigger value="office"><Armchair className="mr-2 h-4 w-4"/>Escritório</TabsTrigger>
                </TabsList>
                <TabsContent value="tech" className="flex-grow">
                  <TechPanel />
                </TabsContent>
                <TabsContent value="upgrades" className="flex-grow">
                  <UpgradesPanel />
                </TabsContent>
                 <TabsContent value="office" className="flex-grow">
                  <OfficePanel />
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </main>
      </div>
      
      <AlertDialog open={isEventModalOpen} onOpenChange={setIsEventModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{currentEvent?.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {currentEvent?.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
             {currentEvent?.options ? (
              currentEvent.options.map((option, index) => (
                <AlertDialogAction key={index} onClick={() => handleEventChoice(option)}>
                  {option.text}
                </AlertDialogAction>
              ))
            ) : (
              <AlertDialogAction onClick={() => handleEventChoice()}>Ok</AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-48" />
        </div>
        <Skeleton className="h-9 w-24" />
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <Skeleton className="h-24 w-full rounded-lg" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
        <div className="lg:col-span-1">
          <Skeleton className="h-[calc(100vh-200px)] w-full rounded-lg" />
        </div>
      </main>
    </div>
  );
}
