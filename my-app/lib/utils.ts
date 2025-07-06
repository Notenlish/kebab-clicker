import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { GameData, GameFunctions } from "./types";

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

export function ultimateUpgradeCost(
  data: GameData,
  functions: GameFunctions,
  baseCost: number,
  owned: number,
) {
  let mul = 1;

  if (
    functions.hasResearched(functions.findResearch("Customer Loyalty Program"))
  ) {
    mul = 0.95;
  }

  return Math.round(baseCost * 1.2 ** owned * mul);
}

export function ultimateKebabsPerSecond(
  data: GameData,
  functions: GameFunctions,
) {
  let mul = 1;

  if (functions.hasResearched(functions.findResearch("Automated Slicing"))) {
    mul = 1.1;
  }
  if (
    functions.hasResearched(
      functions.findResearch("Secret Ingredient Discovery"),
    )
  ) {
    mul *= 1.05;
  }

  return data.kebabsPerSecond * data.prestigeKebabMultiplier * mul;
}

export function ultimateKebabsPerClick(
  data: GameData,
  functions: GameFunctions,
) {
  let mul = 1;

  if (functions.hasResearched(functions.findResearch("Golden Kebab"))) {
    mul *= 2;
  }

  if (
    functions.hasResearched(
      functions.findResearch("Advanced Grilling Techniques"),
    )
  ) {
    mul *= 1.25;
  }

  if (
    functions.hasResearched(
      functions.findResearch("Secret Ingredient Discovery"),
    )
  ) {
    mul *= 1.05;
  }

  return data.kebabsPerClick * data.prestigeKebabMultiplier * mul;
}
