"use client";

import { GameData, GameFunctions } from "@/lib/types";
import Kebab from "./kebab";
import GeneratorStore from "./GeneratorStore";
import GeneratorVisuals from "./GeneratorVisuals";
import Stats from "./stats";
import PrestigeButton from "./prestigeButton";
import HandleStorage from "./handleStorage";
import ResearchShop from "./researchShop";

import { useState } from "react";

export default function GameUI({
  functions,
  data,
}: {
  functions: GameFunctions;
  data: GameData;
}) {
  const [rightMenu, setRightMenu] = useState<"generatorStore" | "researchShop">(
    "generatorStore",
  );

  return (
    <div className="min-h-screen grid grid-cols-3 bg-yellow-900 overflow-clip">
      <div className="">
        <Kebab functions={functions} data={data} />
        <Stats functions={functions} data={data} />
        <PrestigeButton functions={functions} data={data} />
        <HandleStorage functions={functions} data={data} />
      </div>
      <GeneratorVisuals functions={functions} data={data} />
      <div className="h-full w-full">
        <button
          className="m-2 rounded cursor-pointer border border-black p-4 bg-white"
          onClick={() => {
            if (rightMenu == "generatorStore") {
              setRightMenu("researchShop");
              console.log("CHANGED TO RESEARCH SHHOP");
            } else {
              setRightMenu("generatorStore");
            }
          }}
        >
          {rightMenu == "generatorStore" ? "Research Shop" : "Generator Store"}
        </button>
        {rightMenu == "generatorStore" ? (
          <GeneratorStore functions={functions} data={data} />
        ) : (
          <ResearchShop functions={functions} data={data} />
        )}
      </div>
    </div>
  );
}
