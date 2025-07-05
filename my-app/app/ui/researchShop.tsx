import { GameData, GameFunctions } from "@/lib/types";
import Seperator from "./Seperator";
import ResearchCostLabel from "./researctCostLabel";
import { TypographyH2, TypographyP } from "./typography";

export default function ResearchShop({
  functions,
  data,
}: {
  functions: GameFunctions;
  data: GameData;
}) {
  return (
    <div>
      {data.researches.map((e, _i) => {
        return (
          <div
            key={e.id}
            className="flex flex-col gap-6 p-4 bg-orange-200 relative"
          >
            <div className="flex gap-4 mt-4 items-center justify-between">
              <TypographyH2>{e.name}</TypographyH2>
              <TypographyH2>
                <span className="opacity-50">{e.researched ? "✓" : "✕"}</span>
              </TypographyH2>
            </div>
            <TypographyP>{e.description}</TypographyP>
            <button
              onClick={() => {
                functions.researchUpgrade(e);
              }}
              className="cursor-pointer flex w-fit gap-4 items-center p-4 border border-black rounded bg-neutral-50"
            >
              Research{" "}
              <ResearchCostLabel
                owned={data.researchPoints}
                cost={e.cost}
              ></ResearchCostLabel>
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
      })}
    </div>
  );
}
