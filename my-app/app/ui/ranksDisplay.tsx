import { GameData } from "@/lib/types";

import Seperator from "./Seperator";
import { TypographyH2, TypographyP } from "./typography";

export default function RanksDisplay({ data }: { data: GameData }) {
  return (
    <div className="flex flex-col relative">
      {data.ranks.map((r, i) => {
        const got = data.rankId >= r.rankId;
        let text = "";
        if (data.rankId > r.rankId) {
          text = "You already got this rank.";
        }
        if (data.rankId == r.rankId) {
          text = "You are currently at this rank.";
        }
        if (data.rankId < r.rankId) {
          text = "You have yet to get this rank.";
        }
        return (
          <div className="bg-orange-200 p-4 relative" key={i}>
            <div className="flex justify-between items-center">
              <TypographyH2>{r.name}</TypographyH2>
              <TypographyH2>
                <span
                  className="opacity-70"
                  style={{ color: got ? "green" : "red" }}
                >
                  {got ? "✓" : "✕"}
                </span>
              </TypographyH2>
            </div>
            <TypographyP>
              Requires <b>{r.requiredKebabs} kebabs</b>
              <br></br>
              {text}
            </TypographyP>
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
