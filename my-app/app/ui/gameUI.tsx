import { GameData, GameFunctions } from "@/lib/types";
import Kebab from "./kebab";
import GeneratorStore from "./GeneratorStore";
import GeneratorVisuals from "./GeneratorVisuals";
import Stats from "./stats";
import PrestigeButton from "./prestigeButton";
import HandleStorage from "./handleStorage";

export default function GameUI({
  functions,
  data,
}: {
  functions: GameFunctions;
  data: GameData;
}) {
  return (
    <div className="min-h-screen grid grid-cols-3 bg-yellow-900 overflow-clip">
      <div className="">
        <Kebab functions={functions} data={data} />
        <Stats functions={functions} data={data} />
        <PrestigeButton functions={functions} data={data} />
        <HandleStorage functions={functions} data={data} />
      </div>
      <GeneratorVisuals functions={functions} data={data} />
      <GeneratorStore functions={functions} data={data} />
    </div>
  );
}
