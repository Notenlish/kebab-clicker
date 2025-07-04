"use client";
import { ranksData } from "@/lib/data";
import GameUI from "./gameUI";
import { GameData, GameFunctions, GeneratorData } from "@/lib/types";

import { useEffect, useCallback, useRef, useState } from "react";
import { possibleGenerators } from "@/lib/data";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { calculateCostOfGenerator } from "@/lib/utils";
gsap.registerPlugin(useGSAP);

function emptyData() {
  return {
    kebabs: 0,
    rank: "None",
    rankId: 0,
    generators: possibleGenerators,
    kebabsPerSecond: 0,
    kebabsPerClick: 100000,
  } as GameData;
}

//

export default function Game() {
  const [data, setData] = useState<GameData>(emptyData());
  const dataRef = useRef(data);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const buyGenerator = useCallback(
    (gen: GeneratorData) => {
      console.log("trying to buy generator", gen);
      const cost = calculateCostOfGenerator(gen.baseCost, gen.owned);
      console.log("calculated cost", cost);
      console.log(data.kebabs);
      if (data.kebabs >= cost) {
        gen.owned += 1;
        const newKebabs = (data.kebabs -= cost);

        const newKebabsPerSecond =
          data.kebabsPerSecond + gen.automaticProduction;
        const newKebabsPerClick = data.kebabsPerClick + gen.baseProduction;

        const newGenerators = [...data.generators];
        console.log("Added 1 generator");
        setData((prevData) => ({
          ...prevData,
          kebabs: newKebabs,
          kebabsPerSecond: newKebabsPerSecond,
          kebabsPerClick: newKebabsPerClick,
          generators: newGenerators,
        }));
      }
    },
    [data.kebabs],
  );

  const addKebab = useCallback((amount: number) => {
    setData((prevData) => ({ ...prevData, kebabs: prevData.kebabs + amount }));
  }, []);

  const autoKebabProduction = useCallback(() => {
    setData((prevData) => ({
      ...prevData,
      kebabs: prevData.kebabs + prevData.kebabsPerSecond,
    }));
  }, []);

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

  const functions: GameFunctions = {
    addKebab: addKebab,
    changeRank: changeRank,
    buyGenerator: buyGenerator,
    determineRank: determineRank, // This determineRank is primarily for direct calls, not the interval
    autoKebabProduction: autoKebabProduction,
  };

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // since it uses ref, it will get latest data
      determineRank();
      autoKebabProduction()
    }, 1000);

    // Cleanup the interval when the component unmounts or this effect re-runs
    return () => clearInterval(intervalId);
  }, [determineRank]); // Re-create interval if determineRank changes (which it won't due to useCallback)

  const startGame = useCallback(() => {
    setData(emptyData());
  }, []);

  return <GameUI functions={functions} data={data}></GameUI>;
}
