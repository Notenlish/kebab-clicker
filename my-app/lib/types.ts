export type Rank = string;

export type GameData = {
  kebabs: number;
  rank: string;
  rankId: number;
};

export type GameFunctions = {
  addKebab: (amount: number) => void;
  determineRank: () => void;
  changeRank: (newRankId: number) => void;
};
