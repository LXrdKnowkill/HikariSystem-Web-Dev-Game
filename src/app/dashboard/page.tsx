"use client";

import { useGameStore, useGameActions } from "@/store/game-store";
import { useGameLoop } from "@/hooks/use-game-loop";
import { useIsHydrated } from "@/hooks/use-is-hydrated";
import GameStats from "@/components/dashboard/game-stats";
import ProjectCard from "@/components/dashboard/project-card";
import TechPanel from "@/components/dashboard/tech-panel";
import UpgradesPanel from "@/components/dashboard/upgrades-panel";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { careers } from "@/lib/game-logic";
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
import { FlaskConical, Zap } from "lucide-react";

export default function DashboardPage() {
  useGameLoop();
  const router = useRouter();
  const isHydrated = useIsHydrated();
  const { reset, applyEvent, clearEvent } = useGameActions();
  const { career, currentEvent } = useGameStore();
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  useEffect(() => {
    if (isHydrated && !career) {
      router.replace('/career-selection');
    }
  }, [isHydrated, career, router]);
  
  useEffect(() => {
    if (currentEvent) {
      setIsEventModalOpen(true);
    }
  }, [currentEvent]);

  const handleCloseEventModal = () => {
      if(currentEvent) {
        applyEvent(currentEvent);
        clearEvent();
        setIsEventModalOpen(false);
      }
  };

  const currentCareer = careers.find(c => c.id === career);

  if (!isHydrated || !career) {
    return <DashboardSkeleton />;
  }

  return (
    <>
      <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            {currentCareer && <currentCareer.icon className="h-8 w-8 text-primary" />}
            <h1 className="text-2xl md:text-3xl font-headline font-bold">
              {currentCareer?.name || "Dev Web Ocioso"}
            </h1>
          </div>
          <Button variant="outline" size="sm" onClick={() => {
            reset();
            router.push('/');
          }}>
             Reiniciar Jogo
          </Button>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <GameStats />
            <ProjectCard />
          </div>
          <div className="lg:col-span-1">
             <Card className="shadow-lg h-full">
              <Tabs defaultValue="tech">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="tech"><FlaskConical className="mr-2 h-4 w-4" /> Tecnologias</TabsTrigger>
                  <TabsTrigger value="upgrades"><Zap className="mr-2 h-4 w-4"/>Upgrades</TabsTrigger>
                </TabsList>
                <TabsContent value="tech">
                  <TechPanel />
                </TabsContent>
                <TabsContent value="upgrades">
                  <UpgradesPanel />
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
            <AlertDialogAction onClick={handleCloseEventModal}>Ok</AlertDialogAction>
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
          <Skeleton className="h-96 w-full rounded-lg" />
        </div>
      </main>
    </div>
  );
}
