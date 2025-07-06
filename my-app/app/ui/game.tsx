"use client";
import { newPrestigeOverride, ranksData } from "@/lib/data";
import GameUI from "./gameUI";
import {
  GameData,
  GameFunctions,
  GeneratorData,
  ResearchData,
  ClickFx,
  Achievement,
} from "@/lib/types";

import { toast } from "sonner";

import { useEffect, useCallback, useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ultimateUpgradeCost,
  calculatePrestigeCost,
  ultimateKebabsPerSecond,
  ultimateKebabsPerClick,
} from "@/lib/utils";
gsap.registerPlugin(useGSAP);
import { emptyData } from "@/lib/data";

interface AudioData {
  achievement: HTMLAudioElement;
  kebabClick: HTMLAudioElement;
  buttonClick: HTMLAudioElement;
}

export default function Game() {
  const [audioData, setAudioData] = useState<AudioData>();
  const audioRef = useRef(audioData);
  const [data, setData] = useState<GameData>(emptyData());
  const dataRef = useRef(data);
  const [clickFxs, setClickFxs] = useState<ClickFx[]>([]);

  useEffect(() => {
    audioRef.current = audioData;
  }, [audioData]);

  useEffect(() => {
    const kebabsound = new Audio("./kebabClick.wav");
    kebabsound.volume = 0.3;
    setAudioData({
      achievement: new Audio("./achievement.wav"),
      kebabClick: kebabsound,
      buttonClick: new Audio("./buttonClick.wav"),
    });
  }, []);

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
      const cost = ultimateUpgradeCost(
        data,
        functions,
        gen.baseCost,
        gen.owned,
      );
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
    audioRef.current?.kebabClick.play();
    setData((prevData) => ({
      ...prevData,
      kebabs:
        prevData.kebabs + ultimateKebabsPerClick(dataRef.current, functions),
      KebabClicks: prevData.KebabClicks + 1,
    }));
  }, []);

  const autoKebabProduction = useCallback(() => {
    setData((prevData) => ({
      ...prevData,
      kebabs:
        prevData.kebabs + ultimateKebabsPerSecond(dataRef.current, functions),
    }));
  }, []);

  // Achievements
  const checkAchievements = () => {
    // a mutable copy of the current achievements so its not directly modifying the state prematurely,
    const allAchievements: Achievement[] = dataRef.current.achievements.map(
      (a) => ({ ...a }),
    );

    const setAchievementCompleted = (name: string) => {
      const achievementToUpdate = allAchievements.find((a) => a.name === name);
      if (achievementToUpdate) {
        // Only mark as complete if not already completed
        if (!achievementToUpdate.completed) {
          achievementToUpdate.completed = true;
          toast(achievementToUpdate.name, {
            description: achievementToUpdate.description,
            
            className: "bg-red-600 text-neutral-900 border border-red-700",
          });
        }
      }
    };

    // Kebab Clicks achievements
    if (dataRef.current.KebabClicks >= 10) {
      setAchievementCompleted("First Bite");
    }
    if (dataRef.current.KebabClicks >= 100) {
      setAchievementCompleted("Kebab Interest");
    }
    if (dataRef.current.KebabClicks >= 1000) {
      setAchievementCompleted("Kebab Enthusiast");
    }

    // Kebabs Produced achievements
    if (dataRef.current.kebabs >= 5000) {
      setAchievementCompleted("Humble Beginnings");
    }
    if (dataRef.current.kebabs >= 50_000) {
      setAchievementCompleted("Kebab Empire");
    }

    // Generator ownership achievements
    if (functions.findGenerator("Grill Assistant").owned > 0) {
      setAchievementCompleted("Assistant Manager");
    }
    if (functions.findGenerator("Sauce Bot").owned > 0) {
      setAchievementCompleted("Saucy Business");
    }
    if (functions.findGenerator("Kebab Delivery Scooter").owned > 0) {
      setAchievementCompleted("On the Road");
    }
    if (functions.findGenerator("Kebab Shop").owned > 0) {
      setAchievementCompleted("Franchising");
    }

    // Generator quantity achievements
    if (functions.findGenerator("Kebab Delivery Scooter").owned >= 10) {
      setAchievementCompleted("Full Fleet");
    }
    if (functions.findGenerator("Sauce Bot").owned >= 25) {
      setAchievementCompleted("Secret Sauce Revealed!");
    }
    if (functions.findGenerator("Grill Assistant").owned >= 100) {
      setAchievementCompleted("Mini Army");
    }

    // Research achievements
    // check if *any* meet the condition
    if (dataRef.current.researches.some((r) => r.researched)) {
      setAchievementCompleted("Research Pioneer");
    }
    if (dataRef.current.researches.filter((r) => r.researched).length >= 5) {
      setAchievementCompleted("Knowledge Seeker");
    }
    if (!dataRef.current.researches.find((r) => !r.researched)) {
      setAchievementCompleted("Kebab Connoisseur");
      console.log("ALL RESEARCHES HAVE BEEN DONE.");
    }
    if (functions.hasResearched(functions.findResearch("Golden Kebab"))) {
      setAchievementCompleted("Golden Touch");
    }

    // Prestige achievements
    if (dataRef.current.prestigedAmount > 0) {
      setAchievementCompleted("Prestigious Kebab");
    }
    if (dataRef.current.prestigedAmount >= 5) {
      setAchievementCompleted("Prestige Master");
    }

    // Kebabs Per Second achievement
    if (dataRef.current.kebabsPerSecond >= 305_000) {
      setAchievementCompleted("Solve World Hunger");
    }

    setData((prevData) => ({ ...prevData, achievements: allAchievements }));
  };

  const playedForAdd = useCallback(() => {
    // add 1 second.
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
        prestigedAmount: prevData.prestigedAmount + 1,
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
    // console.log("LOADING DATA", saveData);
    setData(saveData as GameData);
  }, []);

  const startGame = useCallback(() => {
    setData(emptyData());
  }, []);

  const setFxAnimated = useCallback(
    (fx: ClickFx) => {
      const newAnimatedFx = { ...fx, animated: true } as ClickFx;
      const excludedFxs = clickFxs.filter((f) => fx.id != f.id);
      const newFxs = [...excludedFxs, newAnimatedFx];
      setClickFxs(newFxs);
    },
    [clickFxs],
  );

  const findAchivement = useCallback((name: string) => {
    return dataRef.current.achievements.find((a) => a.name == name);
  }, []);
  const findGenerator = useCallback((name: string) => {
    return dataRef.current.generators.find((g) => g.name == name);
  }, []);

  const hasResearched = useCallback((r: ResearchData) => {
    if (
      dataRef.current.researches.find(
        (el: ResearchData) => el.researched && el.name == r.name,
      )
    ) {
      return true;
    } else {
      return false;
    }
  }, []);

  const findResearch = useCallback((name: string) => {
    // @ts-expect-error ...
    const r: ResearchData = dataRef.current.researches.find(
      (el: ResearchData) => el.name == name,
    );
    return r;
  }, []);

  const playSound = useCallback((name: string) => {
    // @ts-expect-error ...
    const a: HTMLAudioElement = audioRef.current[name];
    a.play();
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
    setFxAnimated: setFxAnimated,
    setClickFxs: setClickFxs,
    hasResearched: hasResearched,
    findResearch: findResearch,
    findAchivement: findAchivement,
    findGenerator: findGenerator,
    playSound: playSound,
  };

  const recalculateKPS_KPC = () => {
    let kebabsPerSecond = 0;
    let kebabsPerClick = 100;

    dataRef.current.generators.forEach((g) => {
      let mul = g.multiplier;
      if (
        g.name == "Sauce Bot" &&
        hasResearched(findResearch("Sauce Innovation"))
      ) {
        mul *= 2;
      }
      if (
        g.name == "Kebab Delivery Scooter" &&
        hasResearched(findResearch("Efficient Delivery Routes"))
      ) {
        mul *= 1.2;
      }

      kebabsPerClick += mul * (g.owned * g.baseProduction);
      kebabsPerSecond += mul * (g.owned * g.automaticProduction);
      setData((prevData) => ({
        ...prevData,
        kebabsPerClick: kebabsPerClick,
        kebabsPerSecond: kebabsPerSecond,
      }));
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // since it uses ref, it will get latest data
      determineRank();
      autoKebabProduction();
      playedForAdd();
      recalculateKPS_KPC();
      checkAchievements();
    }, 1000);

    // Cleanup the interval when the component unmounts or this effect re-runs
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [determineRank]); // Re-create interval if determineRank changes (which it won't due to useCallback)

  return (
    <GameUI clickFxs={clickFxs} functions={functions} data={data}></GameUI>
  );
}
