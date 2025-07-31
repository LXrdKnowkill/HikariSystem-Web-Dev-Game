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
            Welcome to Web Dev Idle
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Your journey from script-kiddie to code-ninja begins now.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-6 bg-muted/50 rounded-lg">
            <p className="font-code text-primary">
              // Start your career.
              <br />
              // Write code.
              <br />
              // Earn cash.
              <br />
              // Repeat.
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
            Start Coding
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
