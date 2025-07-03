"use client";
import { ReactNode } from "react";
import GameUI from "./gameUI";
import { GameData, GameFunctions } from "@/lib/types";

import { useEffect, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

function emptyData() {
  return {
    kebabs: 0,
  };
}

export default function Game() {
  const [data, setData] = useState<GameData>(emptyData());

  const functions: GameFunctions = {
    addKebab: (amount: number) => {
      const newData = { ...data, kebabs: data.kebabs + amount };
      setData(newData);
    },
  };

  function startGame() {
    const newData = { ...data, kebabs: 0 };
    setData(newData);
  }

  useEffect(() => {
    startGame();
  }, []);
  return <GameUI functions={functions} data={data}></GameUI>;
}
