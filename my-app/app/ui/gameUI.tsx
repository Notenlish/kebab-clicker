import { GameData,GameFunctions } from "@/lib/types";
import Kebab from "./kebab";
import GeneratorStore from "./GeneratorStore";
import GeneratorVisuals from "./GeneratorVisuals";

export default function GameUI({ functions,data }: { functions:GameFunctions, data: GameData }) {
  return <div className="min-h-screen grid grid-cols-3 gap-4 bg-yellow-900">
    <div>
      <Kebab functions={functions} data={data}></Kebab>
    </div>
    <GeneratorVisuals functions={functions} data={data} />
    <GeneratorStore functions={functions} data={data} />
  </div>;
}
