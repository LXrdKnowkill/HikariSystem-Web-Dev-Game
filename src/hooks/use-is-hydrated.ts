"use client";

import { useState, useEffect } from "react";
import { useGameStore } from "@/store/game-store";

export const useIsHydrated = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // A trick to wait for rehydration to complete
    const unsub = useGameStore.persist.onRehydrate(() => setIsHydrated(true));
    setIsHydrated(useGameStore.persist.hasHydrated());
    return () => {
      unsub();
    };
  }, []);

  return isHydrated;
};
