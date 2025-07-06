import { GameFunctions, GameData } from "@/lib/types";
import { TypographyH2, TypographyP } from "./typography";

import Seperator from "./Seperator";

export default function Achievements({
  functions,
  data,
}: {
  functions: GameFunctions;
  data: GameData;
}) {
  return (
    <div>
      {data.achievements.map((a) => {
        return (
          <div key={a.id} className="pt-8 p-4 bg-orange-200 relative">
            <div className="flex justify-between items-center">
              <TypographyH2>{a.name}</TypographyH2>
              <TypographyH2>
                <span
                  className="opacity-70"
                  style={{ color: a.completed ? "green" : "red" }}
                >
                  {a.completed ? "✓" : "✕"}
                </span>
              </TypographyH2>
            </div>
            <TypographyP>{a.description}</TypographyP>
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
