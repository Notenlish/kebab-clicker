import { GeneratorData } from "./types";
export const possibleGenerators: GeneratorData[] = [
  {
    name: "Grill Assistant",
    unitImage: "/generators/grill-assistant.png",
    buttonImage: "/generators/grill-assistant-head.png",
    baseCost: 50,
    baseProduction: 1,
    automaticProduction: 0,
    backgroundImage: "/generators/grillbg.png",
    owned: 0,
    id: 0,
    description: "A teenager flipping skewers part-time after school.",
  },
  {
    name: "Sauce Bot",
    unitImage: "/generators/sauce-bot.png",
    buttonImage: "/generators/sauce-bot-head.png",
    baseCost: 250,
    baseProduction: 1,
    automaticProduction: 1,
    backgroundImage: "/generators/botbg.png",
    owned: 0,
    id: 1,
    description:
      "Automatically dispenses secret sauce on each kebab for extra flavor.",
  },
  /*
  grill assistant
  sauce bot
  kebab delivery scooter
  kebab shop
  turkish kebab master
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
    requiredKebabs: 100_000,
    rankId: 4,
  },
  {
    name: "Salt Bae",
    requiredKebabs: 1_000_000,
    rankId: 5,
  },
  {
    name: "Doner Man",
    requiredKebabs: 10_000_000,
    rankId: 6,
  },
  {
    name: "Kebab Kingpin",
    requiredKebabs: 100_000_000,
    rankId: 7,
  },
  {
    name: "Supreme Skewered",
    requiredKebabs: 1_000_000_000,
    rankId: 8,
  },
  {
    name: "Turkish Kebab Sultan",
    requiredKebabs: 50_000_000_000,
    rankId: 9,
  },
].sort((a, b) => a.rankId - b.rankId);
