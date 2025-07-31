"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  Project,
  generateNewProject,
  getTechnologyById,
  GameEvent,
  generateRandomEvent,
  getRank,
  ranks
} from "@/lib/game-logic";

// Constants
const EVENT_CHANCE = 0.1; // 10% chance per tick
const EVENT_COOLDOWN = 60 * 1000; // 60 seconds

interface GameState {
  money: number;
  xp: number;
  level: number;
  rank: string;
  technologies: Record<string, boolean>;
  currentProject: Project | null;
  career: string | null;
  currentEvent: GameEvent | null;
  lastEventTimestamp: number;
  actions: {
    tick: (delta: number) => void;
    getNewProject: () => void;
    researchTechnology: (techId: string) => void;
    setCareer: (careerId: string) => void;
    applyEvent: (event: GameEvent) => void;
    clearEvent: () => void;
    reset: () => void;
  };
}

const initialState = {
  money: 0,
  xp: 0,
  level: 1,
  rank: ranks[0].name,
  technologies: { "html": true },
  currentProject: null,
  career: null,
  currentEvent: null,
  lastEventTimestamp: 0,
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...initialState,
      actions: {
        tick: (delta) => {
          const now = Date.now();
          const { currentProject, technologies, lastEventTimestamp, career } = get();
          
          // Project progress logic
          if (currentProject) {
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
                const newXP = state.xp + state.currentProject.reward;
                const newLevel = Math.floor(Math.pow(newXP / 100, 0.7)) + 1;
                const newRank = getRank(newXP);

                return {
                  money: state.money + state.currentProject.reward,
                  xp: newXP,
                  level: newLevel,
                  rank: newRank,
                  currentProject: null,
                };
              }

              return {
                currentProject: { ...state.currentProject, progress: newProgress },
              };
            });
          }

          // Event trigger logic
          if (now - lastEventTimestamp > EVENT_COOLDOWN && Math.random() < EVENT_CHANCE) {
              const newEvent = generateRandomEvent(career);
              set({ currentEvent: newEvent, lastEventTimestamp: now });
          }
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
        applyEvent: (event) => {
            set(state => {
                let newMoney = state.money;
                let newXp = state.xp;

                if(event.effects.money) {
                    if(event.effects.money > -1 && event.effects.money < 1) {
                         newMoney += state.money * event.effects.money;
                    } else {
                        newMoney += event.effects.money;
                    }
                }
                if(event.effects.xp) {
                    newXp += event.effects.xp;
                }

                const newRank = getRank(newXp);

                return { 
                  money: Math.max(0, newMoney), 
                  xp: Math.max(0, newXp),
                  rank: newRank,
                }
            });
        },
        clearEvent: () => {
            set({ currentEvent: null });
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
        rank: state.rank,
        technologies: state.technologies,
        currentProject: state.currentProject,
        career: state.career,
        lastEventTimestamp: state.lastEventTimestamp
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
