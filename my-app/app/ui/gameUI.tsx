"use client";

import { ClickFx, GameData, GameFunctions } from "@/lib/types";
import Kebab from "./kebab";
import GeneratorStore from "./GeneratorStore";
import GeneratorVisuals from "./GeneratorVisuals";
import Stats from "./stats";
import PrestigeButton from "./prestigeButton";
import HandleStorage from "./handleStorage";
import ResearchShop from "./researchShop";

import { useState } from "react";
import CustomButton from "./button";

import Achievements from "./achievements";
import RanksDisplay from "./ranksDisplay";

export default function GameUI({
  functions,
  data,
  clickFxs,
}: {
  functions: GameFunctions;
  data: GameData;
  clickFxs: ClickFx[];
}) {
  const possibleMenu = ["Store", "Research", "Achievements", "Rank Display"];
  const [rightMenu, setRightMenu] = useState<number>(0);

  return (
    <div className="min-h-screen grid grid-cols-3 bg-yellow-900 overflow-clip">
      <div className="">
        <Kebab clickFxs={clickFxs} functions={functions} data={data} />
        <Stats functions={functions} data={data} />
        <PrestigeButton functions={functions} data={data} />
        <HandleStorage functions={functions} data={data} />
      </div>
      <GeneratorVisuals functions={functions} data={data} />
      <div className="h-full w-full">
        <div className="m-2">
          <CustomButton
            functions={functions}
            func2call={() => {
              setRightMenu((rightMenu + 1) % possibleMenu.length);
            }}
          >
            {possibleMenu[rightMenu]}
          </CustomButton>
        </div>
        {rightMenu == 0 ? (
          <GeneratorStore functions={functions} data={data} />
        ) : rightMenu == 1 ? (
          <ResearchShop functions={functions} data={data} />
        ) : rightMenu == 2 ? (
          <Achievements data={data} functions={functions} />
        ) : (
          <RanksDisplay data={data} />
        )}
      </div>
    </div>
  );
}
