import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { GameData } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculatePrestigeCost(
  basePrestigeCost: number,
  prestiges: number,
) {
  return Math.round(basePrestigeCost * 1.3 ** prestiges);
}

export function roundToNthDecimal(value: number, decimals: number) {
  // @ts-expect-error ...
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

// TODO: do the sauce innovation, efficient delivery routes and secret ingredient discovery stuff.
// todo: skibidi
export function ultimateUpgradeCost(
  data: GameData,
  baseCost: number,
  owned: number,
) {
  let mul = 1;
  if (
    data.researches.filter((e) => e.name == "Customer Loyalty Program")[0]
      .researched
  ) {
    mul = 0.95;
  }
  return Math.round(baseCost * 1.2 ** owned * mul);
}

export function ultimateKebabsPerSecond(data: GameData) {
  let mul = 1;
  if (
    data.researches.filter((e) => e.name == "Automated Slicing")[0].researched
  ) {
    mul = 1.1;
  }
  return data.kebabsPerSecond * data.prestigeKebabMultiplier * mul;
}

export function ultimateKebabsPerClick(data: GameData) {
  let mul = 1;
  if (data.researches.filter((e) => e.name == "Golden Kebab")[0].researched) {
    mul *= 2;
  }
  if (
    data.researches.filter((e) => e.name == "Advanced Grilling Techniques")[0]
      .researched
  ) {
    mul *= 1.25;
  }
  return data.kebabsPerClick * data.prestigeKebabMultiplier * mul;
}
