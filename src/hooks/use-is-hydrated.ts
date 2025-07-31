"use client";

import { useState, useEffect } from "react";
import { useGameStore } from "@/store/game-store";

export const useIsHydrated = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const unsub = useGameStore.persist.onHasHydrated(() => {
      setIsHydrated(true);
    });

    setIsHydrated(useGameStore.persist.hasHydrated());

    return () => {
      unsub();
    };
  }, []);

  return isHydrated;
};
