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
    console.log(audioData);
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
    const updated: Achievement[] = [];
    if (data.KebabClicks >= 10) {
      const achievement: Achievement = functions.findAchivement("First Bite");
      if (achievement) {
        achievement.completed = true;
      }
      updated.push(achievement);
    }
    if (data.KebabClicks >= 100) {
      const achievement = functions.findAchivement("Kebab Interest");
      if (achievement) {
        achievement.completed = true;
      }
      updated.push(achievement);
    }
    if (data.KebabClicks >= 1000) {
      const achievement = functions.findAchivement("Kebab Enthusiast");
      if (achievement) {
        achievement.completed = true;
      }
      updated.push(achievement);
    }
    if (data.kebabs >= 5000) {
      const achievement = functions.findAchivement("Humble Beginnings");
      if (achievement) {
        achievement.completed = true;
      }
      updated.push(achievement);
    }
    if (data.kebabs >= 50_000) {
      const achievement = functions.findAchivement("Kebab Empire");
      if (achievement) {
        achievement.completed = true;
      }
      updated.push(achievement);
    }
    if (functions.findGenerator("Grill Assistant").owned > 0) {
      const achievement = functions.findAchivement("Assistant Manager");
      if (achievement) {
        achievement.completed = true;
      }
      updated.push(achievement);
    }
    if (functions.findGenerator("Sauce Bot").owned > 0) {
      const achievement = functions.findAchivement("Saucy Business");
      if (achievement) {
        achievement.completed = true;
      }
      updated.push(achievement);
    }
    if (functions.findGenerator("Kebab Delivery Scooter").owned > 0) {
      const achievement = functions.findAchivement("On the Road");
      if (achievement) {
        achievement.completed = true;
      }
      updated.push(achievement);
    }
    if (data.researches.find((r) => r.researched)) {
      const achievement = functions.findAchivement("Research Pioneer");
      if (achievement) {
        achievement.completed = true;
      }
      updated.push(achievement);
    }
    if (data.researches.filter((r) => r.researched).length >= 5) {
      const achievement = functions.findAchivement("Knowledge Seeker");
      if (achievement) {
        achievement.completed = true;
      }
      updated.push(achievement);
    }
    if (data.prestigedAmount > 0) {
      const achievement = functions.findAchivement("Prestigious Kebab");
      if (achievement) {
        achievement.completed = true;
      }
      updated.push(achievement);
    }
    if (data.prestigedAmount >= 5) {
      const achievement = functions.findAchivement("Prestige Master");
      if (achievement) {
        achievement.completed = true;
      }
      updated.push(achievement);
    }
    if (functions.hasResearched(findResearch("Golden Kebab"))) {
      const achievement = functions.findAchivement("Golden Touch");
      if (achievement) {
        achievement.completed = true;
      }
      updated.push(achievement);
    }
    if (functions.findGenerator("Kebab Shop").owned > 0) {
      const achievement = functions.findAchivement("Franchising");
      if (achievement) {
        achievement.completed = true;
      }
      updated.push(achievement);
    }
    if (functions.findGenerator("Kebab Delivery Scooter").owned >= 10) {
      const achievement = functions.findAchivement("Full Fleet");
      if (achievement) {
        achievement.completed = true;
      }
      updated.push(achievement);
    }
    if (functions.findGenerator("Sauce Bot").owned >= 25) {
      const achievement = functions.findAchivement("Secret Sauce Revealed!");
      if (achievement) {
        achievement.completed = true;
      }
      updated.push(achievement);
    }
    if (functions.findGenerator("Grill Assistant").owned >= 100) {
      const achievement = functions.findAchivement("Mini Army");
      if (achievement) {
        achievement.completed = true;
      }
      updated.push(achievement);
    }
    if (data.researches.find((r) => !r.researched)) {
      // unlock all research
      const achievement = functions.findAchivement("Kebab Connoisseur");
      console.log("ALL RESEARCHS HAVE BEEN DONE.");
      if (achievement) {
        achievement.completed = true;
      }
      updated.push(achievement);
    }
    if (data.kebabsPerSecond >= 305_000) {
      const achievement = functions.findAchivement("Solve World Hunger");
      if (achievement) {
        achievement.completed = true;
      }
      updated.push(achievement);
    }

    // get all achievements that havent been completed.
    const old = dataRef.current.achievements.filter((o) => {
      const found = updated.find((item) => item.name === o.name);
      return found !== undefined;
    });
    console.log("OLDDDD", old);

    const newAchievements: Achievement[] = [...old, ...updated];
    setData((prevData) => ({ ...prevData, achievements: newAchievements }));
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
    console.log("LOADING DATA", saveData);
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
