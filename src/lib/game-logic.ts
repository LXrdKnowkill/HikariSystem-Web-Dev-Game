export interface Technology {
  id: string;
  name: string;
  description: string;
  cost: number;
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

export const technologies: Technology[] = [
  { id: "html", name: "HTML", description: "The backbone of the web.", cost: 0 },
  { id: "css", name: "CSS", description: "Make things look pretty.", cost: 50 },
  { id: "javascript", name: "JavaScript", description: "Add interactivity to websites.", cost: 200 },
  { id: "react", name: "React", description: "A powerful component-based library.", cost: 1000 },
  { id: "tailwind", name: "Tailwind CSS", description: "A utility-first CSS framework.", cost: 800 },
  { id: "typescript", name: "TypeScript", description: "JavaScript with static types.", cost: 1500 },
  { id: "nextjs", name: "Next.js", description: "The React framework for production.", cost: 2500 },
  { id: "nodejs", name: "Node.js", description: "Run JavaScript on the server.", cost: 2000 },
  { id: "graphql", name: "GraphQL", description: "A modern way to build APIs.", cost: 3000 },
];

const companyNameParts1 = ["Blue", "Red", "Green", "Quantum", "Hyper", "Stellar", "Lunar", "Solar"];
const companyNameParts2 = ["Pixel", "Code", "Logic", "Data", "Solutions", "Dynamics", "Innovations", "Ventures"];
const companyNameParts3 = ["LLC", "Inc.", "Group", "Co."];

const projectTasks = [
  { task: "Build a landing page", baseEffort: 10, baseReward: 20, baseXp: 5, tech: "html" },
  { task: "Style a corporate website", baseEffort: 20, baseReward: 40, baseXp: 10, tech: "css" },
  { task: "Create an interactive gallery", baseEffort: 40, baseReward: 100, baseXp: 25, tech: "javascript" },
  { task: "Develop a single-page application", baseEffort: 100, baseReward: 500, baseXp: 150, tech: "react" },
  { task: "Refactor CSS with a utility framework", baseEffort: 80, baseReward: 400, baseXp: 120, tech: "tailwind" },
  { task: "Migrate a JS codebase to be type-safe", baseEffort: 150, baseReward: 800, baseXp: 200, tech: "typescript" },
  { task: "Build a full-stack application", baseEffort: 250, baseReward: 1500, baseXp: 400, tech: "nextjs" },
  { task: "Develop a REST API", baseEffort: 200, baseReward: 1200, baseXp: 300, tech: "nodejs" },
  { task: "Implement a GraphQL server", baseEffort: 300, baseReward: 2000, baseXp: 500, tech: "graphql" },
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

export const getTechnologyById = (id: string): Technology | undefined => {
  return technologies.find(t => t.id === id);
};
