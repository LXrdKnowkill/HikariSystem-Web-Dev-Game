"use client";

import { useRouter } from "next/navigation";
import { useGameActions } from "@/store/game-store";
import { careers } from "@/lib/game-logic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function CareerSelectionPage() {
  const router = useRouter();
  const { setCareer } = useGameActions();

  const handleSelectCareer = (careerId: string) => {
    // Define a carreira
    setCareer(careerId);
    
    // Redireciona imediatamente
    setTimeout(() => {
      router.push("/dashboard");
    }, 50); // Pequeno delay para garantir que o estado foi salvo
  };

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
                >
                  Selecionar {career.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
