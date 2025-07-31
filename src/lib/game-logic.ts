import { Terminal, Code, ShieldCheck, ShieldOff, type LucideIcon, Zap, Dices } from "lucide-react";

export interface Technology {
  id: string;
  name: string;
  description: string;
  cost: number;
  requiredRank?: string;
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  levels: {
    cost: number;
    effect: number;
  }[];
}

export interface Career {
    id:string;
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

export interface Rank {
  name: string;
  xpRequired: number;
}

export const ranks: Rank[] = [
    { name: "Iniciante", xpRequired: 0 }, // 0
    { name: "Desenvolvedor Júnior", xpRequired: 500 }, // 1
    { name: "Desenvolvedor Pleno", xpRequired: 2500 }, // 2
    { name: "Desenvolvedor Sênior", xpRequired: 10000 }, // 3
    { name: "Arquiteto de Software", xpRequired: 30000 }, // 4
    { name: "Líder Técnico", xpRequired: 75000 }, // 5
    { name: "Gerente de Engenharia", xpRequired: 150000 }, // 6
    { name: "CTO", xpRequired: 500000 }, // 7
    { name: "Lenda do Código", xpRequired: 1000000 }, // 8
];


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
  { id: "react", name: "React", description: "Uma poderosa biblioteca baseada em componentes.", cost: 1000, requiredRank: "Desenvolvedor Júnior" },
  { id: "tailwind", name: "Tailwind CSS", description: "Um framework CSS utility-first.", cost: 800, requiredRank: "Desenvolvedor Júnior" },
  { id: "typescript", name: "TypeScript", description: "JavaScript com tipagem estática.", cost: 1500, requiredRank: "Desenvolvedor Pleno" },
  { id: "nextjs", name: "Next.js", description: "O framework React para produção.", cost: 2500, requiredRank: "Desenvolvedor Pleno" },
  { id: "nodejs", name: "Node.js", description: "Execute JavaScript no servidor.", cost: 2000, requiredRank: "Desenvolvedor Pleno" },
  { id: "graphql", name: "GraphQL", description: "Uma forma moderna de construir APIs.", cost: 3000, requiredRank: "Desenvolvedor Sênior" },
  { id: "docker", name: "Docker", description: "Containerize suas aplicações para facilitar o deploy.", cost: 5000, requiredRank: "Desenvolvedor Sênior" },
  { id: "kubernetes", name: "Kubernetes", description: "Orquestre containers em escala.", cost: 15000, requiredRank: "Arquiteto de Software" },
  { id: "webassembly", name: "WebAssembly", description: "Execute código de alta performance no navegador.", cost: 20000, requiredRank: "Líder Técnico" },
];

export const upgrades: Upgrade[] = [
    {
        id: "codingSpeed",
        name: "Velocidade de Codificação",
        description: "Aumenta a velocidade com que você completa projetos.",
        icon: Zap,
        levels: [
            { cost: 100, effect: 0.1 },
            { cost: 500, effect: 0.2 },
            { cost: 2000, effect: 0.3 },
            { cost: 10000, effect: 0.4 },
            { cost: 50000, effect: 0.5 },
        ]
    },
    {
        id: "goodLuck",
        name: "Sorte",
        description: "Aumenta a chance de eventos positivos acontecerem.",
        icon: Dices,
        levels: [
            { cost: 500, effect: 0.05 },
            { cost: 2500, effect: 0.10 },
            { cost: 10000, effect: 0.15 },
        ]
    }
];

const companyNameParts1 = ["Blue", "Red", "Green", "Quantum", "Hyper", "Stellar", "Lunar", "Solar"];
const companyNameParts2 = ["Pixel", "Code", "Logic", "Data", "Solutions", "Dynamics", "Innovations", "Ventures"];
const companyNameParts3 = ["LTDA", "S.A.", "Group", "Co."];

const projectTasks = [
  { task: "Construir uma landing page", baseEffort: 10, baseReward: 20, baseXp: 5, tech: "html" },
  { task: "Estilizar um site corporativo", baseEffort: 20, baseReward: 40, baseXp: 10, tech: "css" },
  { task: "Criar uma galeria interativa", baseEffort: 40, baseReward: 100, baseXp: 25, tech: "javascript" },
  { task: "Desenvolver uma aplicação de página única (SPA)", baseEffort: 100, baseReward: 500, baseXp: 150, tech: "react", requiredRank: "Desenvolvedor Júnior" },
  { task: "Refatorar CSS com um framework utility", baseEffort: 80, baseReward: 400, baseXp: 120, tech: "tailwind", requiredRank: "Desenvolvedor Júnior" },
  { task: "Migrar uma codebase JS para ser type-safe", baseEffort: 150, baseReward: 800, baseXp: 200, tech: "typescript", requiredRank: "Desenvolvedor Pleno" },
  { task: "Construir uma aplicação full-stack", baseEffort: 250, baseReward: 1500, baseXp: 400, tech: "nextjs", requiredRank: "Desenvolvedor Pleno" },
  { task: "Desenvolver uma API REST", baseEffort: 200, baseReward: 1200, baseXp: 300, tech: "nodejs", requiredRank: "Desenvolvedor Pleno" },
  { task: "Implementar um servidor GraphQL", baseEffort: 300, baseReward: 2000, baseXp: 500, tech: "graphql", requiredRank: "Desenvolvedor Sênior" },
  { task: "Otimizar a performance de renderização de um app React", baseEffort: 400, baseReward: 2500, baseXp: 600, tech: "react", requiredRank: "Desenvolvedor Sênior" },
  { task: "Conteinerizar uma aplicação legada para deploy", baseEffort: 500, baseReward: 4000, baseXp: 800, tech: "docker", requiredRank: "Desenvolvedor Sênior" },
  { task: "Liderar a arquitetura de um sistema distribuído", baseEffort: 1000, baseReward: 10000, baseXp: 2000, tech: "nodejs", requiredRank: "Arquiteto de Software" },
  { task: "Criar um cluster Kubernetes para um microserviço", baseEffort: 1500, baseReward: 15000, baseXp: 3000, tech: "kubernetes", requiredRank: "Arquiteto de Software" },
  { task: "Gerenciar uma migração de API legada para GraphQL", baseEffort: 1200, baseReward: 12000, baseXp: 2500, tech: "graphql", requiredRank: "Líder Técnico" },
  { task: "Desenvolver um módulo de física para um jogo de navegador", baseEffort: 2000, baseReward: 25000, baseXp: 5000, tech: "webassembly", requiredRank: "Líder Técnico" },
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
        id: "ui_award",
        title: "Prêmio de Design de UI!",
        description: "Sua interface de usuário em um projeto recente foi elogiada publicamente. Você ganhou $200 e 75 XP.",
        type: "positive",
        effects: { money: 200, xp: 75 },
        career: "frontend",
    },
    {
        id: "css_bug",
        title: "Bug de CSS Maluco!",
        description: "Você passou horas caçando um bug de CSS que acabou sendo um ponto-e-vírgula faltando. Você perdeu tempo, mas ganhou 15 XP pela paciência.",
        type: "negative",
        effects: { xp: 15 },
        career: "frontend",
    },
    {
        id: "db_optimization",
        title: "Otimização de Banco de Dados!",
        description: "Você reescreveu uma consulta complexa e acelerou a aplicação em 200%. O cliente está feliz! Você ganhou $250 e 100 XP.",
        type: "positive",
        effects: { money: 250, xp: 100 },
        career: "backend",
    },
    {
        id: "server_downtime",
        title: "Servidor Fora do Ar!",
        description: "O servidor principal caiu durante a noite, e você teve que acordar para consertá-lo. Foi estressante, mas você ganhou 40 XP pela resolução de problemas.",
        type: "negative",
        effects: { xp: 40 },
        career: "backend",
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

export const generateNewProject = (ownedTechs: string[], currentRank: string): Project => {
  const currentRankIndex = ranks.findIndex(r => r.name === currentRank);

  const availableTasksByTech = projectTasks.filter(p => ownedTechs.includes(p.tech));
  
  const availableTasksByRank = availableTasksByTech.filter(p => {
    if (!p.requiredRank) return true;
    const requiredRankIndex = ranks.findIndex(r => r.name === p.requiredRank);
    return currentRankIndex >= requiredRankIndex;
  });

  const taskTemplate = getRandomElement(availableTasksByRank.length > 0 ? availableTasksByRank : [projectTasks[0]]);
  
  const levelMultiplier = ownedTechs.length + currentRankIndex;
  
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

export const generateRandomEvent = (careerId?: string | null, luckBonus: number = 0): GameEvent => {
    const isPositive = Math.random() < (0.5 + luckBonus); // Base 50% chance for positive event, modified by luck
    
    let potentialEvents = gameEvents.filter(e => e.type === (isPositive ? 'positive' : 'negative'));

    const careerSpecificEvents = careerId ? potentialEvents.filter(e => e.career === careerId || !e.career) : potentialEvents.filter(e => !e.career);

    if (careerSpecificEvents.length > 0) {
        return getRandomElement(careerSpecificEvents);
    }
    // Fallback to any event of the chosen type if no career-specific one is found
    return getRandomElement(potentialEvents);
}


export const getTechnologyById = (id: string): Technology | undefined => {
  return technologies.find(t => t.id === id);
};

export const getUpgradeById = (id: string): Upgrade | undefined => {
    return upgrades.find(u => u.id === id);
};

export const getRank = (xp: number): string => {
    return ranks.slice().reverse().find(r => xp >= r.xpRequired)?.name || ranks[0].name;
}
