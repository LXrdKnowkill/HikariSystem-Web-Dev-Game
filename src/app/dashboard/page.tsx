"use client";

import { useGameStore, useGameActions } from "@/store/game-store";
import { useGameLoop } from "@/hooks/use-game-loop";
import { useIsHydrated } from "@/hooks/use-is-hydrated";
import GameStats from "@/components/dashboard/game-stats";
import ProjectCard from "@/components/dashboard/project-card";
import TechPanel from "@/components/dashboard/tech-panel";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { careers } from "@/lib/game-logic";

export default function DashboardPage() {
  useGameLoop();
  const router = useRouter();
  const isHydrated = useIsHydrated();
  const { reset } = useGameActions();
  const { career } = useGameStore();

  useEffect(() => {
    if (isHydrated && !career) {
      router.replace('/career-selection');
    }
  }, [isHydrated, career, router]);

  const currentCareer = careers.find(c => c.id === career);

  if (!isHydrated || !career) {
    return <DashboardSkeleton />;
  }

  return (
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
          <TechPanel />
        </div>
      </main>
    </div>
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
