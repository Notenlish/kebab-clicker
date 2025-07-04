import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateCostOfGenerator(baseCost:number, owned:number) {
  return Math.round(baseCost * (1.2 ** owned))
}