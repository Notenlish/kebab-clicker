export type Rank = string;

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
};

export type GameData = {
  kebabs: number;
  rank: string;
  rankId: number;
  generators: GeneratorData[];
  kebabsPerSecond: number;
  kebabsPerClick: number;
  prestiges: number;
  prestigeKebabMultiplier: number;
  basePrestigeCost: number;
  playedFor: number;
};

export type GameFunctions = {
  addKebab: (amount: number) => void;
  determineRank: () => void;
  changeRank: (newRankId: number) => void;
  buyGenerator: (gen: GeneratorData) => void;
  autoKebabProduction: () => void;
  playedForAdd: () => void;
  doPrestige: () => void;
};
