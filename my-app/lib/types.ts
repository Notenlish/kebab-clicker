export type Rank = string;

export type Achievement = {
  name: string;
  id: number;
  description: string;
  completed: boolean;
};

export type ResearchData = {
  name: string;
  cost: number;
  description: string;
  researched: boolean;
  id: number;
};

export type GeneratorData = {
  name: string;
  baseProduction: number;
  automaticProduction: number;
  baseCost: number;
  backgroundImage: string;
  unitImage: string;
  buttonImage: string;
  owned: number;
  id: number;
  description: string;
  multiplier: number;
};

export type GameData = {
  kebabs: number;
  rank: string;
  rankId: number;
  generators: GeneratorData[];
  kebabsPerSecond: number;
  kebabsPerClick: number;
  KebabClicks: number;
  prestiges: number;
  prestigedAmount: number;
  prestigeKebabMultiplier: number;
  basePrestigeCost: number;
  playedFor: number;
  researchPoints: number;
  researches: ResearchData[];
  achievements: Achievement[];
};

export type GameFunctions = {
  addKebab: () => void;
  determineRank: () => void;
  changeRank: (newRankId: number) => void;
  buyGenerator: (gen: GeneratorData) => void;
  autoKebabProduction: () => void;
  playedForAdd: () => void;
  doPrestige: () => void;
  loadData: (saveData: object) => void;
  startGame: () => void;
  researchUpgrade: (res: ResearchData) => void;
  setFxAnimated: (fx: ClickFx) => void;
  setClickFxs: (a: ClickFx[]) => void;
  hasResearched: (r: ResearchData) => boolean;
  findResearch: (name: string) => ResearchData;
  findAchivement: (name: string) => Achievement | undefined;
  findGenerator: (name: string) => GeneratorData | undefined;
  playSound: (name: string) => void;
};

export interface ClickFx {
  x: number;
  y: number;
  id: number;
  timestamp: number;
  animated: boolean;
}
