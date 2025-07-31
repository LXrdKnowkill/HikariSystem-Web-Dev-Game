"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  Project,
  generateNewProject,
  getTechnologyById,
} from "@/lib/game-logic";

interface GameState {
  money: number;
  xp: number;
  level: number;
  technologies: Record<string, boolean>;
  currentProject: Project | null;
  career: string | null;
  actions: {
    tick: (delta: number) => void;
    getNewProject: () => void;
    researchTechnology: (techId: string) => void;
    setCareer: (careerId: string) => void;
    reset: () => void;
  };
}

const initialState = {
  money: 0,
  xp: 0,
  level: 1,
  technologies: { "html": true },
  currentProject: null,
  career: null,
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...initialState,
      actions: {
        tick: (delta) => {
          const { currentProject, technologies } = get();
          if (!currentProject) return;

          const ownedTechs = Object.keys(technologies).filter(
            (id) => technologies[id]
          );
          const techBonus = ownedTechs.length * 0.1;
          const progressIncrease = (delta / 1000) * (1 + techBonus);

          set((state) => {
            if (!state.currentProject) return {};

            const newProgress = Math.min(
              state.currentProject.progress + progressIncrease,
              state.currentProject.effort
            );

            if (newProgress >= state.currentProject.effort) {
              const newXP = state.xp + state.currentProject.xp;
              const newLevel = Math.floor(Math.pow(newXP / 100, 0.7)) + 1;
              return {
                money: state.money + state.currentProject.reward,
                xp: newXP,
                level: newLevel,
                currentProject: null,
              };
            }

            return {
              currentProject: { ...state.currentProject, progress: newProgress },
            };
          });
        },
        getNewProject: () => {
          if (get().currentProject) return;
          const ownedTechs = Object.keys(get().technologies).filter(id => get().technologies[id]);
          const newProject = generateNewProject(ownedTechs);
          set({ currentProject: newProject });
        },
        researchTechnology: (techId: string) => {
          const tech = getTechnologyById(techId);
          if (!tech || get().technologies[techId]) return;

          const canAfford = get().money >= tech.cost;
          if (canAfford) {
            set((state) => ({
              money: state.money - tech.cost,
              technologies: { ...state.technologies, [techId]: true },
            }));
          }
        },
        setCareer: (careerId: string) => {
            set({ career: careerId });
        },
        reset: () => {
          set(initialState);
        },
      },
    }),
    {
      name: "web-dev-idle-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        money: state.money,
        xp: state.xp,
        level: state.level,
        technologies: state.technologies,
        currentProject: state.currentProject,
        career: state.career,
      }),
      merge: (persistedState, currentState) => {
        const state = persistedState as GameState;
        return {
          ...currentState,
          ...state,
          // Re-attach actions
          actions: currentState.actions,
        };
      },
    }
  )
);

// Export actions separately for easy access in components
export const useGameActions = () => useGameStore((state) => state.actions);
