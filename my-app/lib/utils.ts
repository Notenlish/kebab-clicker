import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateCostOfGenerator(baseCost: number, owned: number) {
  return Math.round(baseCost * 1.2 ** owned);
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

export function ultimateKebabsPerSecond(kebabsPerSecond:number, prestigeKebabMultiplier:number) {
  return kebabsPerSecond * prestigeKebabMultiplier
}

export function ultimateKebabsPerClick(kebabsPerClick:number, prestigeKebabMultiplier:number) {
  return kebabsPerClick * prestigeKebabMultiplier
}


