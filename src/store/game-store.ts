"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  Project,
  generateNewProject,
  getTechnologyById,
  GameEvent,
  GameEventOption,
  generateRandomEvent,
  getRank,
  ranks,
  Upgrade,
  getUpgradeById,
  getEventById,
  technologies
} from "@/lib/game-logic";

// Constants
const BASE_EVENT_CHANCE = 0.05; // 5% chance per tick
const EVENT_COOLDOWN = 60 * 1000; // 60 seconds
const BASE_RISK_CHANCE = 0.4; // 40% chance of getting caught for black hat projects
const PRESTIGE_XP_BONUS_PER_LEVEL = 0.10; // 10% bonus XP per prestige level
const HISTORY_INTERVAL = 5; // Record history every 5 seconds (5 ticks)
const MAX_HISTORY_LENGTH = 50; // Keep the last 50 data points

interface HistoryData {
  time: number;
  value: number;
}
interface GameState {
  money: number;
  xp: number;
  level: number;
  rank: string;
  prestigeLevel: number;
  technologies: Record<string, boolean>;
  upgrades: Record<string, number>; // upgradeId: level
  currentProject: Project | null;
  career: string | null;
  currentEvent: GameEvent | null;
  lastEventTimestamp: number;
  moneyHistory: HistoryData[];
  xpHistory: HistoryData[];
  historyTickCounter: number;
  actions: {
    tick: (delta: number) => void;
    getNewProject: () => void;
    researchTechnology: (techId: string) => void;
    purchaseUpgrade: (upgradeId: string) => void;
    setCareer: (careerId: string) => void;
    applyEvent: (effects: GameEventOption['effects'] | undefined) => void;
    clearEvent: () => void;
    reset: () => void;
    prestige: () => void;
  };
}

const getInitialTechnologies = (careerId: string | null): Record<string, boolean> => {
    if (!careerId) return {};
    const initialTechs: Record<string, boolean> = {};
    
    const startingTechs = technologies.filter(t => {
      if (!t.career) return false;
      if (Array.isArray(t.career)) {
        return t.career.includes(careerId) && t.cost === 0;
      }
      return t.career === careerId && t.cost === 0;
    });

    startingTechs.forEach(tech => {
        initialTechs[tech.id] = true;
    });
    
    return initialTechs;
}

const initialState = {
  money: 0,
  xp: 0,
  level: 1,
  rank: ranks[0].name,
  prestigeLevel: 0,
  technologies: {},
  upgrades: {},
  currentProject: null,
  career: null,
  currentEvent: null,
  lastEventTimestamp: 0,
  moneyHistory: [],
  xpHistory: [],
  historyTickCounter: 0,
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...initialState,
      actions: {
        tick: (delta) => {
          const now = Date.now();
          const { currentProject, technologies, lastEventTimestamp, career, upgrades, currentEvent, historyTickCounter } = get();
          
          // Project progress logic
          if (currentProject) {
            const ownedTechs = Object.keys(technologies).filter(
              (id) => technologies[id]
            );

            // Calculate Speed Bonus
            const codingSpeedLevel = upgrades['codingSpeed'] || 0;
            const codingSpeedUpgrade = getUpgradeById('codingSpeed');
            const speedBonus1 = codingSpeedLevel > 0 ? codingSpeedUpgrade!.levels[codingSpeedLevel-1].effect : 0;

            const devSetupLevel = upgrades['devSetup'] || 0;
            const devSetupUpgrade = getUpgradeById('devSetup');
            const speedBonus2 = devSetupLevel > 0 ? devSetupUpgrade!.levels[devSetupLevel-1].effect : 0;
            
            const totalSpeedBonus = speedBonus1 + speedBonus2;

            const techBonus = ownedTechs.length * 0.1;
            const progressIncrease = (delta / 1000) * (1 + techBonus + totalSpeedBonus);

            set((state) => {
              if (!state.currentProject) return {};

              const newProgress = Math.min(
                state.currentProject.progress + progressIncrease,
                state.currentProject.effort
              );

              if (newProgress >= state.currentProject.effort) {
                // Project Completion
                let finalReward = state.currentProject.reward;
                let finalXP = state.currentProject.xp;
                
                // --- GLOBAL UPGRADE BONUSES ---
                const negotiatorLevel = state.upgrades['expertNegotiator'] || 0;
                if (negotiatorLevel > 0) {
                    const negotiatorUpgrade = getUpgradeById('expertNegotiator');
                    finalReward *= (1 + negotiatorUpgrade!.levels[negotiatorLevel - 1].effect);
                }

                 const premiumToolsLevel = state.upgrades['premiumTools'] || 0;
                if (premiumToolsLevel > 0) {
                    const premiumToolsUpgrade = getUpgradeById('premiumTools');
                    finalReward *= (1 + premiumToolsUpgrade!.levels[premiumToolsLevel - 1].effect);
                }

                const learningLevel = state.upgrades['acceleratedLearning'] || 0;
                if(learningLevel > 0) {
                    const learningUpgrade = getUpgradeById('acceleratedLearning');
                    finalXP *= (1 + learningUpgrade!.levels[learningLevel - 1].effect);
                }
                
                // --- PRESTIGE BONUS ---
                if (state.prestigeLevel > 0) {
                    finalXP *= (1 + state.prestigeLevel * PRESTIGE_XP_BONUS_PER_LEVEL);
                }


                // --- CAREER UPGRADE BONUSES ---
                // Frontend Bonus
                const designMasterLevel = state.upgrades['designMaster'] || 0;
                if(designMasterLevel > 0) {
                    const designMasterUpgrade = getUpgradeById('designMaster');
                    const projectTech = state.currentProject.techRequirement;
                    if(designMasterUpgrade && (projectTech === 'react' || projectTech === 'tailwind')) {
                        finalReward *= (1 + designMasterUpgrade.levels[designMasterLevel - 1].effect);
                    }
                }
                // Whitehat Bonus
                const analysisToolsLevel = state.upgrades['analysisTools'] || 0;
                if(analysisToolsLevel > 0 && state.career === 'whitehat') {
                    const analysisToolsUpgrade = getUpgradeById('analysisTools');
                    finalReward *= (1 + analysisToolsUpgrade!.levels[analysisToolsLevel-1].effect);
                }

                const newXP = state.xp + finalXP;
                const newLevel = Math.floor(Math.pow(newXP / 100, 0.7)) + 1;
                const newRank = getRank(newXP);

                // --- BLACK HAT RISK ---
                if (state.currentProject.isHighRisk) {
                    const anonNetworkLevel = state.upgrades['anonNetwork'] || 0;
                    const anonNetworkUpgrade = getUpgradeById('anonNetwork');
                    const riskReduction = anonNetworkLevel > 0 ? anonNetworkUpgrade!.levels[anonNetworkLevel - 1].effect : 0;
                    if (Math.random() < BASE_RISK_CHANCE - riskReduction) {
                        const traceEvent = getEventById('traced');
                        if (traceEvent) {
                            set({ currentEvent: traceEvent, lastEventTimestamp: Date.now() });
                        }
                    }
                }
                
                return {
                  money: state.money + finalReward,
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
          const goodLuckLevel = upgrades['goodLuck'] || 0;
          const goodLuckUpgrade = getUpgradeById('goodLuck');
          const luckBonus = goodLuckLevel > 0 ? goodLuckUpgrade!.levels[goodLuckLevel-1].effect : 0;
          
          if (now - lastEventTimestamp > EVENT_COOLDOWN && Math.random() < BASE_EVENT_CHANCE && !currentEvent) {
              const newEvent = generateRandomEvent(career, luckBonus);
              set({ currentEvent: newEvent, lastEventTimestamp: now });
          }
          
           // History tracking logic
           const newHistoryTickCounter = historyTickCounter + 1;
           if (newHistoryTickCounter >= HISTORY_INTERVAL) {
               set(state => {
                   const newMoneyHistory = [...state.moneyHistory, { time: now, value: state.money }].slice(-MAX_HISTORY_LENGTH);
                   const newXpHistory = [...state.xpHistory, { time: now, value: state.xp }].slice(-MAX_HISTORY_LENGTH);
                   return {
                       moneyHistory: newMoneyHistory,
                       xpHistory: newXpHistory,
                       historyTickCounter: 0,
                   };
               });
           } else {
               set({ historyTickCounter: newHistoryTickCounter });
           }
        },
        getNewProject: () => {
          if (get().currentProject) return;
          const { technologies, rank, upgrades, career } = get();
          const ownedTechs = Object.keys(technologies).filter(id => technologies[id]);
          const newProject = generateNewProject(ownedTechs, rank, upgrades, career);
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
        purchaseUpgrade: (upgradeId: string) => {
          const upgrade = getUpgradeById(upgradeId);
          if (!upgrade) return;

          const currentLevel = get().upgrades[upgradeId] || 0;
          if (currentLevel >= upgrade.levels.length) return; // Max level reached

          const nextLevel = upgrade.levels[currentLevel];
          const canAfford = get().money >= nextLevel.cost;
          if (canAfford) {
              set(state => ({
                  money: state.money - nextLevel.cost,
                  upgrades: { ...state.upgrades, [upgradeId]: currentLevel + 1 }
              }));
          }
        },
        applyEvent: (effects) => {
            if (!effects) return;
            
            set(state => {
                let newMoney = state.money;
                let newXp = state.xp;

                if(effects.money !== undefined) {
                    // Check if it's a percentage (between -1 and 1, but not 0)
                    if(effects.money > -1 && effects.money < 1 && effects.money !== 0) {
                         newMoney += state.money * effects.money;
                    } else {
                        newMoney += effects.money;
                    }
                }
                if(effects.xp) {
                    newXp += effects.xp;
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
            set((state) => ({
              ...initialState, // Reset game progress
              prestigeLevel: state.prestigeLevel, // Keep prestige level on career change
              career: careerId,
              technologies: getInitialTechnologies(careerId),
            }));
        },
        prestige: () => {
            const { rank } = get();
            if (rank === ranks[ranks.length - 1].name) {
                set(state => ({
                    ...initialState,
                    career: state.career, // Keep career
                    prestigeLevel: state.prestigeLevel + 1, // Increase prestige level
                    technologies: getInitialTechnologies(state.career), // Reset techs for career
                }));
            }
        },
        reset: () => {
          set(state => ({
            ...initialState,
             // keep the selected career but reset everything else
            prestigeLevel: state.prestigeLevel,
            career: state.career,
            technologies: getInitialTechnologies(state.career)
          }));
          // a full reset would be set(initialState) and then pushing to career selection
          // for now, we just reset the progress for the current career
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
        prestigeLevel: state.prestigeLevel,
        technologies: state.technologies,
        upgrades: state.upgrades,
        currentProject: state.currentProject,
        career: state.career,
        lastEventTimestamp: state.lastEventTimestamp,
        moneyHistory: state.moneyHistory,
        xpHistory: state.xpHistory,
      }),
      merge: (persistedState, currentState) => {
        const state = { ...initialState, ...(persistedState as Partial<GameState>) };
        // On merge, we need to ensure the technologies are correctly initialized
        // if a career is set but technologies are not.
        if (state.career && (!state.technologies || Object.keys(state.technologies).length === 0)) {
            state.technologies = getInitialTechnologies(state.career);
        }
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
