
import { Terminal, Code, ShieldCheck, ShieldOff, type LucideIcon, Zap, Dices, Palette, Gauge, Target, Sprout, Bomb, Bug, Dna, Anchor, Brain, Wallet, HardDrive, DraftingCompass, Lamp, FileText, Shirt, ToyBrick } from "lucide-react";

export interface Technology {
  id: string;
  name: string;
  description: string;
  cost: number;
  requiredRank?: string;
  career?: string | string[]; // Can be for one or multiple careers
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
  career?: string; // Add career requirement
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
  isHighRisk?: boolean; // For Black Hat projects
}

export interface GameEventOption {
    text: string;
    effects: {
        money?: number; // Can be a fixed amount or a percentage
        xp?: number;
    };
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  type: "positive" | "negative" | "choice";
  effects?: {
    money?: number;
    xp?: number;
  };
  options?: GameEventOption[];
  career?: string; // Optional: to link events to specific careers
}


export interface Rank {
  name: string;
  xpRequired: number;
}

export interface OfficeItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: LucideIcon;
  type: 'cosmetic' | 'functional';
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
  // --- Frontend Path ---
  { id: "html", name: "HTML", description: "A espinha dorsal da web.", cost: 0, career: "frontend" },
  { id: "css", name: "CSS", description: "Para deixar as coisas bonitas.", cost: 50, career: "frontend" },
  { id: "javascript_fe", name: "JavaScript (Frontend)", description: "Adicione interatividade aos sites.", cost: 200, career: "frontend" },
  { id: "react", name: "React", description: "Uma poderosa biblioteca baseada em componentes.", cost: 1000, requiredRank: "Desenvolvedor Júnior", career: "frontend" },
  { id: "tailwind", name: "Tailwind CSS", description: "Um framework CSS utility-first.", cost: 800, requiredRank: "Desenvolvedor Júnior", career: "frontend" },
  { id: "typescript_fe", name: "TypeScript (Frontend)", description: "JavaScript com tipagem estática para interfaces.", cost: 1500, requiredRank: "Desenvolvedor Pleno", career: "frontend" },
  { id: "nextjs_fe", name: "Next.js", description: "O framework React para produção.", cost: 2500, requiredRank: "Desenvolvedor Pleno", career: "frontend" },
  { id: "webassembly", name: "WebAssembly", description: "Execute código de alta performance no navegador.", cost: 20000, requiredRank: "Líder Técnico", career: "frontend" },

  // --- Backend Path ---
  { id: "javascript_be", name: "JavaScript (Backend)", description: "Use JS para a lógica do servidor.", cost: 0, career: "backend" },
  { id: "nodejs", name: "Node.js", description: "Execute JavaScript no servidor.", cost: 500, requiredRank: "Desenvolvedor Júnior", career: "backend" },
  { id: "typescript_be", name: "TypeScript (Backend)", description: "Tipagem estática para APIs robustas.", cost: 1500, requiredRank: "Desenvolvedor Pleno", career: "backend" },
  { id: "graphql", name: "GraphQL", description: "Uma forma moderna de construir APIs.", cost: 3000, requiredRank: "Desenvolvedor Sênior", career: "backend" },
  { id: "kubernetes", name: "Kubernetes", description: "Orquestre containers em escala.", cost: 15000, requiredRank: "Arquiteto de Software", career: "backend" },

  // --- White Hat Path ---
  { id: "networking_wh", name: "Análise de Redes", description: "Analise o tráfego para encontrar anomalias.", cost: 0, career: "whitehat" },
  { id: "linux_wh", name: "Linux Hardening", description: "Proteja servidores contra acessos não autorizados.", cost: 600, requiredRank: "Desenvolvedor Júnior", career: "whitehat"},
  { id: "scripting_wh", name: "Scripting (Defensivo)", description: "Automatize a detecção de ameaças e a resposta a incidentes.", cost: 1800, requiredRank: "Desenvolvedor Pleno", career: "whitehat"},
  { id: "yara", name: "Análise com Yara", description: "Crie regras para identificar e classificar malware.", cost: 4000, requiredRank: "Desenvolvedor Sênior", career: "whitehat" },
  { id: "threat_intel", name: "Inteligência de Ameaças", description: "Estude táticas de adversários para prever ataques.", cost: 8000, requiredRank: "Arquiteto de Software", career: "whitehat" },
  { id: "reverse_engineering", name: "Engenharia Reversa", description: "Desconstrua malwares para entender seu funcionamento.", cost: 22000, requiredRank: "Líder Técnico", career: "whitehat" },
  
  // --- Black Hat Path ---
  { id: "networking_bh", name: "Spoofing de Rede", description: "Mascare sua identidade na rede.", cost: 0, career: "blackhat" },
  { id: "linux_bh", name: "Exploração de Linux", description: "Encontre e explore fraquezas em servidores.", cost: 750, requiredRank: "Desenvolvedor Júnior", career: "blackhat"},
  { id: "scripting_bh", name: "Scripting (Ofensivo)", description: "Crie scripts para automatizar ataques.", cost: 2000, requiredRank: "Desenvolvedor Pleno", career: "blackhat"},
  { id: "malware_dev", name: "Desenvolvimento de Malware", description: "Crie trojans e ransomwares personalizados.", cost: 6000, requiredRank: "Desenvolvedor Sênior", career: "blackhat" },
  { id: "zero_day", name: "Exploração de 0-Day", description: "Encontre e utilize vulnerabilidades desconhecidas.", cost: 12000, requiredRank: "Arquiteto de Software", career: "blackhat" },
  { id: "ddos", name: "Ataques DDoS", description: "Orquestre botnets para derrubar serviços online.", cost: 30000, requiredRank: "Líder Técnico", career: "blackhat" },

  // --- Advanced Shared Techs ---
  { id: "docker", name: "Docker", description: "Containerize suas aplicações para facilitar o deploy.", cost: 5000, requiredRank: "Desenvolvedor Sênior", career: ["frontend", "backend", "whitehat", "blackhat"] },
];


export const upgrades: Upgrade[] = [
    {
        id: "codingSpeed",
        name: "Velocidade de Codificação",
        description: "Aumenta a velocidade com que você completa projetos.",
        icon: Zap,
        levels: [
            { cost: 250, effect: 1 },
            { cost: 1250, effect: 2 },
            { cost: 5000, effect: 3.5 },
            { cost: 20000, effect: 5 },
            { cost: 80000, effect: 7 },
            { cost: 250000, effect: 10 },
            { cost: 1000000, effect: 15 },
        ]
    },
    {
        id: "devSetup",
        name: "Setup de Desenvolvimento",
        description: "Hardware melhor significa mais poder de fogo para codificar.",
        icon: HardDrive,
        levels: [
            { cost: 5000, effect: 0.5 },
            { cost: 25000, effect: 1.0 },
            { cost: 100000, effect: 1.5 },
            { cost: 400000, effect: 2.0 },
            { cost: 1200000, effect: 2.5 },
        ]
    },
    {
        id: "premiumTools",
        name: "Suíte de Ferramentas Premium",
        description: "Software de qualidade aumenta o valor do seu trabalho.",
        icon: DraftingCompass,
        levels: [
            { cost: 4000, effect: 0.05 },
            { cost: 18000, effect: 0.10 },
            { cost: 75000, effect: 0.15 },
            { cost: 300000, effect: 0.20 },
            { cost: 900000, effect: 0.25 },
        ]
    },
    {
        id: "acceleratedLearning",
        name: "Aprendizagem Acelerada",
        description: "Aumenta permanentemente todo o XP ganho.",
        icon: Brain,
        levels: [
            { cost: 1000, effect: 0.1 },
            { cost: 5000, effect: 0.2 },
            { cost: 20000, effect: 0.3 },
            { cost: 100000, effect: 0.4 },
            { cost: 500000, effect: 0.5 },
        ]
    },
    {
        id: "expertNegotiator",
        name: "Negociador Experiente",
        description: "Aumenta o dinheiro ganho em todos os projetos.",
        icon: Wallet,
        levels: [
            { cost: 1000, effect: 0.05 },
            { cost: 5000, effect: 0.10 },
            { cost: 20000, effect: 0.15 },
            { cost: 100000, effect: 0.20 },
            { cost: 500000, effect: 0.25 },
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
            { cost: 50000, effect: 0.20 },
            { cost: 200000, effect: 0.25 },
        ]
    },
    {
        id: "designMaster",
        name: "Mestre do Design",
        description: "Aumenta a recompensa de projetos com React e Tailwind CSS.",
        icon: Palette,
        career: "frontend",
        levels: [
            { cost: 2000, effect: 0.1 }, // 10% bonus
            { cost: 8000, effect: 0.2 }, // 20% bonus
            { cost: 25000, effect: 0.3 }, // 30% bonus
        ]
    },
    {
        id: "optimizationMaster",
        name: "Mestre da Otimização",
        description: "Reduz o esforço necessário para completar projetos de Node.js e GraphQL.",
        icon: Gauge,
        career: "backend",
        levels: [
            { cost: 2000, effect: 0.1 }, // 10% effort reduction
            { cost: 8000, effect: 0.2 }, // 20% effort reduction
            { cost: 25000, effect: 0.3 }, // 30% effort reduction
        ]
    },
     {
        id: "analysisTools",
        name: "Ferramentas de Análise",
        description: "Aumenta o pagamento de projetos de Bug Bounty.",
        icon: Target,
        career: "whitehat",
        levels: [
            { cost: 3000, effect: 0.15 },
            { cost: 10000, effect: 0.30 },
            { cost: 40000, effect: 0.50 },
        ]
    },
    {
        id: "anonNetwork",
        name: "Rede Anônima",
        description: "Reduz a chance de ser pego após uma invasão.",
        icon: Sprout,
        career: "blackhat",
        levels: [
            { cost: 5000, effect: 0.10 }, // Reduces chance by 10%
            { cost: 20000, effect: 0.20 },
            { cost: 100000, effect: 0.35 },
        ]
    }
];

export const officeItems: OfficeItem[] = [
  { id: 'office_plant', name: 'Planta de Escritório', description: 'Um pouco de verde para alegrar o ambiente. Totalmente cosmético.', cost: 1500, icon: Sprout, type: 'cosmetic' },
  { id: 'motivational_poster', name: 'Pôster Motivacional', description: '"Feito é melhor que perfeito". Aumenta a moral.', cost: 750, icon: FileText, type: 'cosmetic' },
  { id: 'lava_lamp', name: 'Luminária de Lava', description: 'Hipnótica e calmante. Ótima para pensar.', cost: 2500, icon: Lamp, type: 'cosmetic' },
  { id: 'nerd_figure', name: 'Action Figure Nerd', description: 'Um pequeno herói para sua mesa.', cost: 5000, icon: ToyBrick, type: 'cosmetic' },
  { id: 'company_shirt', name: 'Camiseta da Empresa', description: 'Vista a camisa, literalmente.', cost: 1000, icon: Shirt, type: 'cosmetic' },
];

const companyNameParts1 = ["Blue", "Red", "Green", "Quantum", "Hyper", "Stellar", "Lunar", "Solar"];
const companyNameParts2 = ["Pixel", "Code", "Logic", "Data", "Solutions", "Dynamics", "Innovations", "Ventures"];
const companyNameParts3 = ["LTDA", "S.A.", "Group", "Co."];

const projectTasks = [
  // --- Frontend ---
  { task: "Construir uma landing page", baseEffort: 10, baseReward: 20, baseXp: 5, tech: "html" },
  { task: "Estilizar um site corporativo", baseEffort: 20, baseReward: 40, baseXp: 10, tech: "css" },
  { task: "Criar uma galeria interativa", baseEffort: 40, baseReward: 100, baseXp: 25, tech: "javascript_fe" },
  { task: "Desenvolver uma aplicação de página única (SPA)", baseEffort: 100, baseReward: 500, baseXp: 150, tech: "react", requiredRank: "Desenvolvedor Júnior" },
  { task: "Refatorar CSS com um framework utility", baseEffort: 80, baseReward: 400, baseXp: 120, tech: "tailwind", requiredRank: "Desenvolvedor Júnior" },
  { task: "Migrar uma codebase JS para ser type-safe", baseEffort: 150, baseReward: 800, baseXp: 200, tech: "typescript_fe", requiredRank: "Desenvolvedor Pleno" },
  { task: "Construir uma aplicação full-stack", baseEffort: 250, baseReward: 1500, baseXp: 400, tech: "nextjs_fe", requiredRank: "Desenvolvedor Pleno" },
  { task: "Desenvolver um módulo de física para um jogo de navegador", baseEffort: 2000, baseReward: 25000, baseXp: 5000, tech: "webassembly", requiredRank: "Líder Técnico" },
  
  // --- Backend ---
  { task: "Implementar autenticação em uma API", baseEffort: 50, baseReward: 120, baseXp: 30, tech: "javascript_be" },
  { task: "Desenvolver uma API REST", baseEffort: 200, baseReward: 1200, baseXp: 300, tech: "nodejs", requiredRank: "Desenvolvedor Pleno" },
  { task: "Implementar um servidor GraphQL", baseEffort: 300, baseReward: 2000, baseXp: 500, tech: "graphql", requiredRank: "Desenvolvedor Sênior" },
  { task: "Otimizar a performance de renderização de um app React", baseEffort: 400, baseReward: 2500, baseXp: 600, tech: "react", requiredRank: "Desenvolvedor Sênior" },
  { task: "Liderar a arquitetura de um sistema distribuído", baseEffort: 1000, baseReward: 10000, baseXp: 2000, tech: "nodejs", requiredRank: "Arquiteto de Software" },
  { task: "Criar um cluster Kubernetes para um microserviço", baseEffort: 1500, baseReward: 15000, baseXp: 3000, tech: "kubernetes", requiredRank: "Arquiteto de Software" },
  { task: "Gerenciar uma migração de API legada para GraphQL", baseEffort: 1200, baseReward: 12000, baseXp: 2500, tech: "graphql", requiredRank: "Líder Técnico" },

  // --- White Hat ---
  { task: "Analisar um dump de tráfego de rede", baseEffort: 60, baseReward: 150, baseXp: 40, tech: "networking_wh" },
  { task: "Realizar uma auditoria de segurança em um servidor Linux", baseEffort: 220, baseReward: 1400, baseXp: 350, tech: "linux_wh", requiredRank: "Desenvolvedor Júnior" },
  { task: "Escrever um script para detectar tentativas de login suspeitas", baseEffort: 350, baseReward: 2200, baseXp: 550, tech: "scripting_wh", requiredRank: "Desenvolvedor Pleno" },
  { task: "Identificar uma nova família de malware com regras Yara", baseEffort: 700, baseReward: 6000, baseXp: 1200, tech: "yara", requiredRank: "Desenvolvedor Sênior" },
  { task: "Criar um relatório de inteligência sobre um grupo de hackers", baseEffort: 1400, baseReward: 14000, baseXp: 2800, tech: "threat_intel", requiredRank: "Arquiteto de Software" },
  { task: "Fazer engenharia reversa em um ransomware para criar um decodificador", baseEffort: 2500, baseReward: 30000, baseXp: 6000, tech: "reverse_engineering", requiredRank: "Líder Técnico" },

  // --- Black Hat ---
  { task: "Configurar um proxy para mascarar o tráfego de rede", baseEffort: 70, baseReward: 180, baseXp: 20, tech: "networking_bh" },
  { task: "Escalar privilégios em um servidor Linux mal configurado", baseEffort: 280, baseReward: 1800, baseXp: 150, tech: "linux_bh", requiredRank: "Desenvolvedor Júnior", isHighRisk: true },
  { task: "Desenvolver um script para colher credenciais de login", baseEffort: 400, baseReward: 3000, baseXp: 250, tech: "scripting_bh", requiredRank: "Desenvolvedor Pleno", isHighRisk: true },
  { task: "Criar um ransomware e vendê-lo na dark web", baseEffort: 800, baseReward: 15000, baseXp: 800, tech: "malware_dev", requiredRank: "Desenvolvedor Sênior", isHighRisk: true },
  { task: "Vender uma vulnerabilidade 0-day recém descoberta", baseEffort: 1600, baseReward: 50000, baseXp: 2000, tech: "zero_day", requiredRank: "Arquiteto de Software", isHighRisk: true },
  { task: "Lançar um ataque DDoS contra uma grande corporação", baseEffort: 3000, baseReward: 100000, baseXp: 4000, tech: "ddos", requiredRank: "Líder Técnico", isHighRisk: true },
  
  // --- Shared ---
  { task: "Conteinerizar uma aplicação legada para deploy", baseEffort: 500, baseReward: 4000, baseXp: 800, tech: "docker", requiredRank: "Desenvolvedor Sênior" },
];

export const gameEvents: GameEvent[] = [
    {
        id: "market_crash",
        title: "Queda na Bolsa de Tecnologia!",
        description: "Uma correção no mercado de ações de tecnologia fez com que seus investimentos perdessem valor. O que você faz?",
        type: "choice",
        options: [
            { text: "Vender tudo! (-10% dinheiro)", effects: { money: -0.10 } },
            { text: "Manter e torcer... (50/50)", effects: { money: Math.random() < 0.5 ? -0.25 : 0 } }
        ]
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
    {
        id: "traced",
        title: "Rastreado!",
        description: "Sua última atividade ilegal foi rastreada pelas autoridades. Você recebeu uma multa pesada para evitar a prisão.",
        type: "negative",
        effects: { money: -0.25 }, // Lose 25% of money
        career: "blackhat"
    }
];


const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const generateNewProject = (ownedTechs: string[], currentRank: string, upgrades: Record<string, number>, career: string | null): Project => {
  const currentRankIndex = ranks.findIndex(r => r.name === currentRank);
  
  // Filter projects by career (or show general projects)
  const availableTasksByCareer = projectTasks.filter(p => {
    const techDetails = technologies.find(t => t.id === p.tech);
    if (!techDetails?.career) return false; // Should not happen if data is correct
    if (Array.isArray(techDetails.career)) {
        return techDetails.career.includes(career!);
    }
    return techDetails.career === career;
  });

  const availableTasksByTech = availableTasksByCareer.filter(p => ownedTechs.includes(p.tech));
  
  const availableTasksByRank = availableTasksByTech.filter(p => {
    if (!p.requiredRank) return true;
    const requiredRankIndex = ranks.findIndex(r => r.name === p.requiredRank);
    return currentRankIndex >= requiredRankIndex;
  });

  const taskTemplate = getRandomElement(availableTasksByRank.length > 0 ? availableTasksByRank : [projectTasks[0]]);
  
  const levelMultiplier = ownedTechs.length + currentRankIndex;
  
  const company = `${getRandomElement(companyNameParts1)} ${getRandomElement(companyNameParts2)} ${getRandomElement(companyNameParts3)}`;

  let effort = taskTemplate.baseEffort * (1 + levelMultiplier * 0.2);
  const optimizationLevel = upgrades['optimizationMaster'] || 0;
  if(optimizationLevel > 0) {
      const optimizationUpgrade = getUpgradeById('optimizationMaster');
      const projectTech = taskTemplate.tech;
      if(optimizationUpgrade && (projectTech === 'nodejs' || projectTech === 'graphql')) {
          effort *= (1 - optimizationUpgrade.levels[optimizationLevel - 1].effect);
      }
  }

  return {
    company,
    task: taskTemplate.task,
    effort,
    reward: taskTemplate.baseReward * (1 + levelMultiplier * 0.3),
    xp: taskTemplate.baseXp * (1 + levelMultiplier * 0.25),
    progress: 0,
    techRequirement: taskTemplate.tech,
    isHighRisk: taskTemplate.isHighRisk || false
  };
};

export const generateRandomEvent = (careerId?: string | null, luckBonus: number = 0): GameEvent => {
    // Re-roll the 50/50 chance for the market crash event every time it's generated
    const marketCrashEvent = gameEvents.find(e => e.id === 'market_crash');
    if (marketCrashEvent && marketCrashEvent.options) {
        marketCrashEvent.options[1].effects.money = Math.random() < 0.5 ? -0.25 : 0;
    }
    
    let potentialEvents = gameEvents;
    // Filter out blackhat trace event, it's special
    potentialEvents = potentialEvents.filter(e => e.id !== 'traced');

    const careerSpecificEvents = careerId ? potentialEvents.filter(e => e.career === careerId || !e.career) : potentialEvents.filter(e => !e.career);

    if (careerSpecificEvents.length > 0) {
        return getRandomElement(careerSpecificEvents);
    }
    // Fallback to any event if no career-specific one is found
    return getRandomElement(potentialEvents);
}

export const getEventById = (id: string): GameEvent | undefined => {
    return gameEvents.find(e => e.id === id);
}

export const getTechnologyById = (id: string): Technology | undefined => {
  return technologies.find(t => t.id === id);
};

export const getUpgradeById = (id: string): Upgrade | undefined => {
    return upgrades.find(u => u.id === id);
};

export const getOfficeItemById = (id: string): OfficeItem | undefined => {
    return officeItems.find(i => i.id === id);
};

export const getRank = (xp: number): string => {
    return ranks.slice().reverse().find(r => xp >= r.xpRequired)?.name || ranks[0].name;
}

    

    