"use client";
import { ReactNode } from "react";
import GameUI from "./gameUI";
import { GameData, GameFunctions } from "@/lib/types";

import { useEffect, useCallback, useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

function emptyData() {
  return {
    kebabs: 0,
    rank: "None",
    rankId: 0,
  };
}

const ranksData = [
  {
    name: "None",
    requiredKebabs: 0,
    rankId: 0,
  },
  {
    name: "Apprentice Assembler",
    requiredKebabs: 10, // 200
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

//

export default function Game() {
  const [data, setData] = useState<GameData>(emptyData());
  const dataRef = useRef(data);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const addKebab = useCallback((amount: number) => {
    setData((prevData) => ({ ...prevData, kebabs: prevData.kebabs + amount }));
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
    determineRank: determineRank, // This determineRank is primarily for direct calls, not the interval
  };

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Call the determineRank function which now uses the ref to get the latest data
      determineRank();
    }, 1000); // Check every second

    // Cleanup the interval when the component unmounts or this effect re-runs
    return () => clearInterval(intervalId);
  }, [determineRank]); // Re-create interval if determineRank changes (which it won't due to useCallback)

  const startGame = useCallback(() => {
    setData(emptyData());
  }, []); // No dependencies

  return <GameUI functions={functions} data={data}></GameUI>;
}
