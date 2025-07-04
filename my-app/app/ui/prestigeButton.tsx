import { TypographyP } from "./typography";
import Seperator from "./Seperator";
import CostLabel from "./costLabel";
import { calculatePrestigeCost } from "@/lib/utils";
import { GameData, GameFunctions } from "@/lib/types";

export default function PrestigeButton({
  functions,
  data,
}: {
  functions: GameFunctions;
  data: GameData;
}) {
  return (
    <div className="bg-orange-200 p-4 pb-8 relative overflow-clip">
      <TypographyP>
        Prestige multiplies the amount of kebabs you make per each click and per
        second.
      </TypographyP>
      <br></br>
      <button onClick={() => {
        console.log("skibidi")
        functions.doPrestige()
      }} className="border cursor-pointer border-black bg-blue-100 p-4 py-2 rounded flex gap-4 items-center">
        Prestige{" "}
        <CostLabel
          owned={data.kebabs}
          cost={calculatePrestigeCost(data.basePrestigeCost, data.prestiges)}
        />
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
