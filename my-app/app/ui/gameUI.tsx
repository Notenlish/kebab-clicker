import { GameData,GameFunctions } from "@/lib/types";
import Kebab from "./kebab";

export default function GameUI({ functions,data }: { functions:GameFunctions, data: GameData }) {
  return <div className="min-h-screen grid grid-cols-3 gap-4 bg-yellow-900">
    <div>
      <Kebab functions={functions} data={data}></Kebab>
    </div>
    <div>a</div>
    <div>a</div>
  </div>;
}
