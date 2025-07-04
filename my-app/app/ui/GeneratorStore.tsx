import { GameData, GameFunctions } from "@/lib/types";
import Image from "next/image";
import { TypographyH2, TypographyP } from "./typography";
import CostLabel from "./costLabel";
import { calculateCostOfGenerator } from "@/lib/utils";

import Seperator from "./Seperator";

export default function GeneratorStore({
  functions,
  data,
}: {
  functions: GameFunctions;
  data: GameData;
}) {
  return (
    <div className="flex flex-col relative">
      {data.generators.map((e, i) => {
        const cost = calculateCostOfGenerator(e.baseCost, e.owned)
        return (
          <div key={e.id} className="h-60 p-4 bg-orange-200 relative">
            <div className="flex gap-4 mt-4 items-center justify-between">
              <Image alt={e.name} src={e.buttonImage} width={48} height={48} />
              <TypographyH2>{e.name}</TypographyH2>
              <TypographyH2>
                <span className="opacity-50">{e.owned}</span>
              </TypographyH2>
            </div>
            <TypographyP>{e.description}</TypographyP>
            <button className="flex gap-4 items-center px-4 cursor-pointer border border-black" onClick={() => {
              functions.buyGenerator(e)
            }}>
              Buy
              <CostLabel owned={data.kebabs} cost={cost} />
            </button>
            <Seperator width={1080} height={16} left={0} bottom={-16} orientation="horizontal" />
          </div>
        );
      })}
    </div>
  );
}
