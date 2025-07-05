"use client";

import { useEffect } from "react";
import { GameFunctions, GameData } from "@/lib/types";

import Seperator from "./Seperator";
import { useRouter } from "next/navigation";

export default function HandleStorage({
  functions,
  data,
}: {
  functions: GameFunctions;
  data: GameData;
}) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const savedDataRaw = localStorage.getItem("gameData");
      console.log("FOUND SAVED DATA");
      if (savedDataRaw) {
        const savedData = JSON.parse(savedDataRaw);
        functions.loadData(savedData);
        console.log("LOADED SAVED DATA", savedData);
      } else {
        functions.startGame();
        console.log("NO save data found, starting new game!");
      }
    }
  }, []);

  useEffect(() => {
    /*
     */
    if (typeof window !== "undefined" && window.localStorage) {
      // saving data
      const rawSave = JSON.stringify(data);
      localStorage.setItem("gameData", rawSave);
    }
  }, [data.playedFor]);

  const resetSave = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem("gameData");
      functions.startGame();
      console.log("Reset the save file.");
    }
  };

  return (
    <div className="bg-orange-200 py-4 pb-8 relative overflow-clip">
      <button
        onClick={() => {
          resetSave();
        }}
        className="ml-4 bg-neutral-50 rounded cursor-pointer border border-black white p-4"
      >
        Reset Save
      </button>
      <Seperator
        width={640}
        height={16}
        bottom={0}
        left={0}
        orientation="horizontal"
      />
      <Seperator width={16} height={640} bottom={0} right={0} />
    </div>
  );
}
