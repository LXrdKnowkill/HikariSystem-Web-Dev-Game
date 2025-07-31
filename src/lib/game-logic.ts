import { Terminal, Code, ShieldCheck, ShieldOff, type LucideIcon } from "lucide-react";

export interface Technology {
  id: string;
  name: string;
  description: string;
  cost: number;
}

export interface Career {
    id: string;
    name: string;
    description: string;
    icon: LucideIcon;
}

export interface Project {
  company: string;
  task: string;
  effort: number;
  reward: number;
  xp: number;
  progress: number;
  techRequirement: string;
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  type: "positive" | "negative";
  effects: {
    money?: number;
    xp?: number;
  };
  career?: string; // Optional: to link events to specific careers
}

export const careers: Career[] = [
    {
        id: "frontend",
        name: "Frontend",
        description: "Focado na experiência do usuário e na interface visual. Cria sites e aplicações bonitas e interativas.",
        icon: Code,
    },
    {
        id: "backend",
        name: "Backend",
        description: "Trabalha nos bastidores, gerenciando servidores, bancos de dados e a lógica da aplicação.",
        icon: Terminal,
    },
    {
        id: "whitehat",
        name: "White Hat",
        description: "Um hacker ético que protege sistemas encontrando vulnerabilidades antes que sejam exploradas.",
        icon: ShieldCheck,
    },
    {
        id: "blackhat",
        name: "Black Hat",
        description: "Explora sistemas para ganho pessoal, operando nas sombras da internet.",
        icon: ShieldOff,
    },
]

export const technologies: Technology[] = [
  { id: "html", name: "HTML", description: "A espinha dorsal da web.", cost: 0 },
  { id: "css", name: "CSS", description: "Para deixar as coisas bonitas.", cost: 50 },
  { id: "javascript", name: "JavaScript", description: "Adicione interatividade aos sites.", cost: 200 },
  { id: "react", name: "React", description: "Uma poderosa biblioteca baseada em componentes.", cost: 1000 },
  { id: "tailwind", name: "Tailwind CSS", description: "Um framework CSS utility-first.", cost: 800 },
  { id: "typescript", name: "TypeScript", description: "JavaScript com tipagem estática.", cost: 1500 },
  { id: "nextjs", name: "Next.js", description: "O framework React para produção.", cost: 2500 },
  { id: "nodejs", name: "Node.js", description: "Execute JavaScript no servidor.", cost: 2000 },
  { id: "graphql", name: "GraphQL", description: "Uma forma moderna de construir APIs.", cost: 3000 },
];

const companyNameParts1 = ["Blue", "Red", "Green", "Quantum", "Hyper", "Stellar", "Lunar", "Solar"];
const companyNameParts2 = ["Pixel", "Code", "Logic", "Data", "Solutions", "Dynamics", "Innovations", "Ventures"];
const companyNameParts3 = ["LTDA", "S.A.", "Group", "Co."];

const projectTasks = [
  { task: "Construir uma landing page", baseEffort: 10, baseReward: 20, baseXp: 5, tech: "html" },
  { task: "Estilizar um site corporativo", baseEffort: 20, baseReward: 40, baseXp: 10, tech: "css" },
  { task: "Criar uma galeria interativa", baseEffort: 40, baseReward: 100, baseXp: 25, tech: "javascript" },
  { task: "Desenvolver uma aplicação de página única (SPA)", baseEffort: 100, baseReward: 500, baseXp: 150, tech: "react" },
  { task: "Refatorar CSS com um framework utility", baseEffort: 80, baseReward: 400, baseXp: 120, tech: "tailwind" },
  { task: "Migrar uma codebase JS para ser type-safe", baseEffort: 150, baseReward: 800, baseXp: 200, tech: "typescript" },
  { task: "Construir uma aplicação full-stack", baseEffort: 250, baseReward: 1500, baseXp: 400, tech: "nextjs" },
  { task: "Desenvolver uma API REST", baseEffort: 200, baseReward: 1200, baseXp: 300, tech: "nodejs" },
  { task: "Implementar um servidor GraphQL", baseEffort: 300, baseReward: 2000, baseXp: 500, tech: "graphql" },
];

export const gameEvents: GameEvent[] = [
    {
        id: "market_crash",
        title: "Queda na Bolsa de Tecnologia!",
        description: "Uma correção no mercado de ações de tecnologia fez com que seus investimentos perdessem valor. Você perde 8% do seu dinheiro.",
        type: "negative",
        effects: { money: -0.08 }, // Represents a percentage
    },
    {
        id: "viral_post",
        title: "Postagem Viral!",
        description: "Um artigo que você escreveu no seu blog sobre uma nova tecnologia se tornou viral! Você ganhou 50 XP pela sua contribuição à comunidade.",
        type: "positive",
        effects: { xp: 50 },
    },
    {
        id: "freelance_opportunity",
        title: "Oportunidade de Freelance!",
        description: "Um cliente antigo entrou em contato com um pequeno trabalho urgente. Você ganhou $100 extras.",
        type: "positive",
        effects: { money: 100 },
    },
    {
        id: "data_loss",
        title: "Perda de Dados!",
        description: "Seu HD falhou! Você perdeu um pouco de progresso em seu projeto atual e algum XP por ter que refazer o trabalho.",
        type: "negative",
        effects: { xp: -25 },
    },
     {
        id: "security_bounty",
        title: "Recompensa por Segurança!",
        description: "Você encontrou uma falha de segurança crítica em um grande sistema e recebeu uma recompensa. Você ganhou $500.",
        type: "positive",
        effects: { money: 500 },
        career: "whitehat",
    },
    {
        id: "phishing_attempt",
        title: "Tentativa de Phishing!",
        description: "Você quase caiu em um golpe de phishing, mas suas habilidades o salvaram. A experiência te rendeu 30 XP.",
        type: "positive",
        effects: { xp: 30 },
        career: "whitehat",
    },
     {
        id: "data_breach_profit",
        title: "Lucro com Vazamento de Dados!",
        description: "Você explorou uma vulnerabilidade e vendeu os dados na dark web. Você ganhou $1000, mas sua reputação pode estar em risco.",
        type: "positive",
        effects: { money: 1000 },
        career: "blackhat",
    },
    {
        id: "avoided_feds",
        title: "Feds na sua cola!",
        description: "As autoridades quase te pegaram, mas você conseguiu apagar seus rastros a tempo. O estresse te custou 50 XP.",
        type: "negative",
        effects: { xp: -50 },
        career: "blackhat",
    },
];


const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const generateNewProject = (ownedTechs: string[]): Project => {
  const availableTasks = projectTasks.filter(p => ownedTechs.includes(p.tech));
  const taskTemplate = getRandomElement(availableTasks.length > 0 ? availableTasks : [projectTasks[0]]);
  
  const levelMultiplier = ownedTechs.length;
  
  const company = `${getRandomElement(companyNameParts1)} ${getRandomElement(companyNameParts2)} ${getRandomElement(companyNameParts3)}`;
  
  return {
    company,
    task: taskTemplate.task,
    effort: taskTemplate.baseEffort * (1 + levelMultiplier * 0.2),
    reward: taskTemplate.baseReward * (1 + levelMultiplier * 0.3),
    xp: taskTemplate.baseXp * (1 + levelMultiplier * 0.25),
    progress: 0,
    techRequirement: taskTemplate.tech
  };
};

export const generateRandomEvent = (careerId?: string | null): GameEvent => {
    const careerSpecificEvents = careerId ? gameEvents.filter(e => e.career === careerId || !e.career) : gameEvents.filter(e => !e.career);
    return getRandomElement(careerSpecificEvents);
}

export const getTechnologyById = (id: string): Technology | undefined => {
  return technologies.find(t => t.id === id);
};
