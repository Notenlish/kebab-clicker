import {
  GeneratorData,
  GameData,
  ResearchData,
  Achievement,
  Rank,
} from "./types";

export function emptyData() {
  return {
    ...newPrestigeOverride(),
    playedFor: 0,
    prestiges: 0,
    basePrestigeCost: 1000,
    prestigeKebabMultiplier: 1,
    researchPoints: 0,
    researches: possibleResearches,
    achievements: possibleAchievements,
    KebabClicks: 0,
    prestigedAmount: 0,
    ranks: ranksData,
  } as GameData;
}

export function newPrestigeOverride() {
  return {
    kebabs: 0,
    kebabClicks: 0,
    rank: "None",
    rankId: 0,
    generators: possibleGenerators,
    kebabsPerSecond: 0,
    kebabsPerClick: 1,
  };
}

export const possibleAchievements: Achievement[] = [
  {
    id: 0,
    name: "First Bite",
    description: "Click the kebab 10 times.",
    completed: false,
  },
  {
    id: 1,
    name: "Kebab Interest",
    description: "Click the kebab 100 times.",
    completed: false,
  },
  {
    id: 2,
    name: "Kebab Enthusiast",
    description: "Click the kebab 1,000 times.",
    completed: false,
  },
  {
    id: 3,
    name: "Humble Beginnings",
    description: "Have over 5,000 kebabs",
    completed: false,
  },
  {
    id: 4,
    name: "Kebab Empire",
    description: "Have over 50,000 kebabs",
    completed: false,
  },
  {
    id: 5,
    name: "Assistant Manager",
    description: "Purchase your first Grill Assistant.",
    completed: false,
  },
  {
    id: 6,
    name: "Saucy Business",
    description: "Purchase your first Sauce Bot.",
    completed: false,
  },
  {
    id: 7,
    name: "On the Road",
    description: "Purchase your first Kebab Delivery Scooter.",
    completed: false,
  },
  {
    id: 8,
    name: "Research Pioneer",
    description: "Complete your first research.",
    completed: false,
  },
  {
    id: 9,
    name: "Knowledge Seeker",
    description: "Complete a total of 5 different researches.",
    completed: false,
  },
  {
    id: 10,
    name: "Prestigious Kebab",
    description: "Prestige for the first time",
    completed: false,
  },
  {
    id: 11,
    name: "Prestige Master",
    description: "Prestige 5 times.",
    completed: false,
  },
  {
    id: 12,
    name: "Golden Touch",
    description: "Research 'Golden Kebab'.",
    completed: false,
  },
  {
    id: 13,
    name: "Franchising",
    description: "Buy your first Kebab Shop.",
    completed: false,
  },
  {
    id: 14,
    name: "Full Fleet",
    description: "Own 10 delivery scooters",
    completed: false,
  },
  {
    id: 15,
    name: "Secret Sauce Revealed!",
    description: "Own 25 Sauce Bots.",
    completed: false,
  },
  {
    id: 16,
    name: "Mini Army",
    description: "Own 100 grill assistants",
    completed: false,
  },
  {
    id: 17,
    name: "Kebab Connoisseur",
    description: "Unlock all research options.",
    completed: false,
  },
  {
    id: 18,
    name: "Solve World Hunger",
    description: "Reach 305,000 Kebabs per second(KPS).",
    completed: false,
  },
  {
    id: 19,
    name: "The Legend of the Döner",
    description: "Have at least 1 Turkish Kebab Master",
    completed: false,
  },
  {
    id: 20,
    name: "Salt It",
    description: "Reach the rank: 'Salt Bae'.",
    completed: false,
  },
  {
    id: 21,
    name: "Organized Döner Crime",
    description: "Reach the rank: 'Kebab Kingpin'.",
    completed: false,
  },
  {
    id: 22,
    name: "Ottoman Empire is Back",
    description: "Reach the rank: 'Turkish Kebab Sultan'.",
    completed: false,
  },
];

export const possibleResearches: ResearchData[] = [
  {
    name: "Golden Kebab",
    description: "This golden kebab will double your Kebabs per click(KPC).",
    cost: 1,
    researched: false,
    id: 0,
  },
  {
    name: "Automated Slicing",
    description: "Increases Kebab per second (KPS) from all sources by 10%.",
    cost: 2,
    researched: false,
    id: 1,
  },
  {
    name: "Advanced Grilling Techniques",
    description: "Increases Kebabs per click (KPC) by 25%.",
    cost: 2,
    researched: false,
    id: 2,
  },
  {
    name: "Customer Loyalty Program",
    description: "Reduces the cost of all future upgrades by 5%.",
    cost: 1,
    researched: false,
    id: 3,
  },
  {
    name: "Sauce Innovation",
    description: "Doubles the effectiveness of 'Sauce Bot' upgrades.",
    cost: 1,
    researched: false,
    id: 4,
  },
  {
    name: "Efficient Delivery Routes",
    description:
      "Increases the speed and capacity of 'Kebab Delivery Scooter' by 20%.",
    cost: 1,
    researched: false,
    id: 5,
  },
  {
    name: "Secret Ingredient Discovery",
    description: "Provides a permanent 10% bonus to all Kebab production.",
    cost: 3,
    researched: false,
    id: 6,
  },
  {
    name: "Steel Skewers",
    description: "Increases kebabs per click by 5%.",
    cost: 3,
    researched: false,
    id: 7,
  },
];

export const possibleGenerators: GeneratorData[] = [
  {
    name: "Grill Assistant",
    unitImage: "./generators/grill-assistant.png",
    buttonImage: "./generators/grill-assistant-head.png",
    baseCost: 50,
    baseProduction: 1,
    automaticProduction: 0,
    backgroundImage: "./generators/grillbg.png",
    owned: 0,
    id: 0,
    description: "A teenager flipping skewers part-time after school.",
    multiplier: 1,
  },
  {
    name: "Sauce Bot",
    unitImage: "./generators/sauce-bot.png",
    buttonImage: "./generators/sauce-bot-head.png",
    baseCost: 250,
    baseProduction: 1,
    automaticProduction: 1,
    backgroundImage: "./generators/botbg.png",
    owned: 0,
    id: 1,
    description:
      "Automatically dispenses secret sauce on each kebab for extra flavor.",
    multiplier: 1,
  },
  {
    name: "Kebab Delivery Scooter",
    unitImage: "./generators/scooter.png",
    buttonImage: "./generators/scooter-small.png",
    baseCost: 1000,
    baseProduction: 0,
    automaticProduction: 5,
    backgroundImage: "./generators/scooterBG.png",
    owned: 0,
    id: 2,
    description: "Delivers tasty kebabs to people.",
    multiplier: 1,
  },
  {
    name: "Kebab Shop",
    unitImage: "./generators/kebab-shop.png",
    buttonImage: "./generators/kebab-shop-small.png",
    baseCost: 5000,
    baseProduction: 10,
    automaticProduction: 40,
    backgroundImage: "./generators/kebab-shopBG.png",
    owned: 0,
    id: 3,
    description: "Delivers tasty kebabs to people.",
    multiplier: 1,
  },
  {
    name: "Turkish Kebab Master",
    unitImage: "./generators/turkish-kebab-man.png",
    buttonImage: "./generators/turkish-kebab-man-head.png",
    baseCost: 40_000,
    baseProduction: 50,
    automaticProduction: 150,
    backgroundImage: "./generators/turkish-kebab-manBG.png",
    owned: 0,
    id: 4,
    description: "An old master at making Kebab.",
    multiplier: 1,
  },
  /*
  auto griller 3000
  meat synthesizer
  infinite skewer
  alien grill tech
  kebab empire hq
  */
];

export const ranksData = [
  {
    name: "None",
    requiredKebabs: 0,
    rankId: 0,
  },
  {
    name: "Apprentice Assembler",
    requiredKebabs: 200, // 200
    rankId: 1,
  },
  {
    name: "Skewer Specialist",
    requiredKebabs: 2_000,
    rankId: 2,
  },
  {
    name: "Sauce Sensei",
    requiredKebabs: 10_000,
    rankId: 3,
  },
  {
    name: "Grill Guru",
    requiredKebabs: 50_000,
    rankId: 4,
  },
  {
    name: "Salt Bae",
    requiredKebabs: 200_000,
    rankId: 5,
  },
  {
    name: "Döner Man",
    requiredKebabs: 500_000,
    rankId: 6,
  },
  {
    name: "Kebab Kingpin",
    requiredKebabs: 1_000_000,
    rankId: 7,
  },
  {
    name: "Supreme Skewerd",
    requiredKebabs: 10_000_000,
    rankId: 8,
  },
  {
    name: "Turkish Kebab Sultan",
    requiredKebabs: 100_000_000,
    rankId: 9,
  },
].sort((a, b) => a.rankId - b.rankId);
