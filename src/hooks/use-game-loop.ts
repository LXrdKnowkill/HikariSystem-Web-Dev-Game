"use client";

import { useEffect, useRef } from "react";
import { useGameStore } from "@/store/game-store";

export const useGameLoop = () => {
  const {
    actions: { tick },
  } = useGameStore();
  const lastTick = useRef(Date.now());
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const loop = () => {
      const now = Date.now();
      const delta = now - lastTick.current;
      if (delta >= 1000) { // Tick every second
        tick(delta);
        lastTick.current = now;
      }
      animationFrameId.current = requestAnimationFrame(loop);
    };

    animationFrameId.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [tick]);
};
