/** eslint-disable @typescript-eslint/no-unused-vars */
import { GameData, GameFunctions } from "@/lib/types";
import Image from "next/image";
import { TypographyH2, TypographyP } from "./typography";
import KebabCostLabel from "./kebabCostLabel";
import { ultimateUpgradeCost } from "@/lib/utils";

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
      {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        data.generators.map((e, i) => {
          const cost = ultimateUpgradeCost(data, e.baseCost, e.owned);
          return (
            <div key={e.id} className="h-60 p-4 bg-orange-200 relative">
              <div className="flex gap-4 mt-4 items-center justify-between">
                <Image
                  alt={e.name}
                  src={e.buttonImage}
                  width={48}
                  height={48}
                />
                <TypographyH2>{e.name}</TypographyH2>
                <TypographyH2>
                  <span className="opacity-50">{e.owned}</span>
                </TypographyH2>
              </div>
              <TypographyP>{e.description}</TypographyP>
              <button
                className="flex gap-4 rounded items-center px-4 py-2 cursor-pointer bg-neutral-50 border border-black"
                onClick={() => {
                  functions.buyGenerator(e);
                }}
              >
                Buy <KebabCostLabel owned={data.kebabs} cost={cost} />
              </button>
              <Seperator
                width={1080}
                height={16}
                left={0}
                bottom={-16}
                orientation="horizontal"
              />
            </div>
          );
        })
      }
    </div>
  );
}
