"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { Code } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/dashboard");
  };

  return (
    <main className="flex items-center justify-center min-h-screen p-4 bg-background">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Icons.logo className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline">
            Bem-vindo ao Dev Web Ocioso
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Sua jornada de iniciante a mestre do código começa agora.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-6 bg-muted/50 rounded-lg">
            <p className="font-code text-primary">
              // Comece sua carreira.
              <br />
              // Escreva código.
              <br />
              // Ganhe dinheiro.
              <br />
              // Repita.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full text-lg"
            size="lg"
            onClick={handleStart}
          >
            <Code className="mr-2 h-5 w-5" />
            Começar a Programar
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
