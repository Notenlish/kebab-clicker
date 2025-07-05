"use client";
import { newPrestigeOverride, ranksData } from "@/lib/data";
import GameUI from "./gameUI";
import {
  GameData,
  GameFunctions,
  GeneratorData,
  ResearchData,
} from "@/lib/types";

import { useEffect, useCallback, useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ultimateUpgradeCost, calculatePrestigeCost } from "@/lib/utils";
gsap.registerPlugin(useGSAP);
import { emptyData } from "@/lib/data";

export default function Game() {
  const [data, setData] = useState<GameData>(emptyData());
  const dataRef = useRef(data);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const researchUpgrade = useCallback((res: ResearchData) => {
    const currentResearchPoints = dataRef.current.researchPoints;

    if (!res.researched && currentResearchPoints >= res.cost) {
      const newResearch = { ...res, researched: true } as ResearchData;
      const newResearchPoints = currentResearchPoints - res.cost;

      // remove the old research item
      const newResearches = [...dataRef.current.researches].filter(
        (e) => e.id != res.id,
      );

      setData((prevData) => ({
        ...prevData,
        researches: [...newResearches, newResearch],
        researchPoints: newResearchPoints,
      }));
    }
  }, []);

  const buyGenerator = useCallback(
    (gen: GeneratorData) => {
      const cost = ultimateUpgradeCost(data, gen.baseCost, gen.owned);
      if (data.kebabs >= cost) {
        gen.owned += 1;
        const newKebabs = data.kebabs - cost;

        const newKebabsPerSecond =
          data.kebabsPerSecond + gen.automaticProduction;
        const newKebabsPerClick = data.kebabsPerClick + gen.baseProduction;

        const newGenerators = [...data.generators];
        setData((prevData) => ({
          ...prevData,
          kebabs: newKebabs,
          kebabsPerSecond: newKebabsPerSecond,
          kebabsPerClick: newKebabsPerClick,
          generators: newGenerators,
        }));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data.kebabs],
  );

  const addKebab = useCallback((amount: number) => {
    setData((prevData) => ({
      ...prevData,
      kebabs: prevData.kebabs + amount * prevData.prestigeKebabMultiplier,
    }));
  }, []);

  const autoKebabProduction = useCallback(() => {
    setData((prevData) => ({
      ...prevData,
      kebabs:
        prevData.kebabs +
        prevData.kebabsPerSecond * prevData.prestigeKebabMultiplier,
    }));
  }, []);

  const playedForAdd = useCallback(() => {
    setData((prevData) => ({ ...prevData, playedFor: prevData.playedFor + 1 }));
  }, []);

  const doPrestige = useCallback(() => {
    const cost = calculatePrestigeCost(data.basePrestigeCost, data.prestiges);
    if (data.kebabs >= cost) {
      const newPrestiges = data.prestiges + 1;
      const newBaseMultiplier = 1.2 ** newPrestiges;
      const newResearchPoints = data.researchPoints + 1;
      setData((prevData) => ({
        ...prevData,
        ...newPrestigeOverride(),
        prestiges: newPrestiges,
        prestigeKebabMultiplier: newBaseMultiplier,
        researchPoints: newResearchPoints,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculatePrestigeCost, data.kebabs]);

  const changeRank = useCallback((newRankId: number) => {
    const nextRank = ranksData[newRankId];
    setData((prevData) => ({
      ...prevData,
      rank: nextRank.name,
      rankId: nextRank.rankId,
    }));
  }, []);

  const determineRank = useCallback(() => {
    // Access the latest data from the ref
    const currentData = dataRef.current;

    // if not max level
    if (currentData.rankId < ranksData.length - 1) {
      const nextRank = ranksData[currentData.rankId + 1];
      if (currentData.kebabs >= nextRank.requiredKebabs) {
        changeRank(nextRank.rankId);
      }
    }
  }, [changeRank]);

  const loadData = useCallback((saveData: object) => {
    console.log("LOADING DATA", saveData);
    setData(saveData as GameData);
  }, []);

  const startGame = useCallback(() => {
    setData(emptyData());
  }, []);

  const functions: GameFunctions = {
    addKebab: addKebab,
    changeRank: changeRank,
    buyGenerator: buyGenerator,
    determineRank: determineRank, // This determineRank is primarily for direct calls, not the interval
    autoKebabProduction: autoKebabProduction,
    playedForAdd: playedForAdd,
    doPrestige: doPrestige,
    loadData: loadData,
    startGame: startGame,
    researchUpgrade: researchUpgrade,
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // since it uses ref, it will get latest data
      determineRank();
      autoKebabProduction();
      playedForAdd();
    }, 1000);

    // Cleanup the interval when the component unmounts or this effect re-runs
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [determineRank]); // Re-create interval if determineRank changes (which it won't due to useCallback)

  return <GameUI functions={functions} data={data}></GameUI>;
}
