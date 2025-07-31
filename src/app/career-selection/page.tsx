"use client";

import { useRouter } from "next/navigation";
import { useGameActions, useGameStore } from "@/store/game-store";
import { careers, type Career } from "@/lib/game-logic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function CareerSelectionPage() {
  const router = useRouter();
  const { setCareer } = useGameActions();
  const { career } = useGameStore();
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);

  const handleSelectCareer = (careerId: string) => {
    setSelectedCareer(careerId);
    setCareer(careerId);
  };

  // Aguarda a atualização do estado antes de redirecionar
  useEffect(() => {
    if (selectedCareer && career === selectedCareer) {
      router.push("/dashboard");
    }
  }, [career, selectedCareer, router]);

  return (
    <main className="flex items-center justify-center min-h-screen p-4 bg-background animate-in fade-in duration-500">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Escolha sua Carreira</CardTitle>
          <CardDescription className="text-muted-foreground">
            Cada caminho tem seus próprios desafios e recompensas.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {careers.map((career) => (
            <Card key={career.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                   <career.icon className="h-8 w-8 text-primary" />
                   <CardTitle className="font-headline text-2xl">{career.name}</CardTitle>
                </div>
                <CardDescription>{career.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex items-end">
                <Button 
                  className="w-full" 
                  onClick={() => handleSelectCareer(career.id)}
                  disabled={selectedCareer === career.id}
                >
                  {selectedCareer === career.id ? "Selecionando..." : `Selecionar ${career.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
