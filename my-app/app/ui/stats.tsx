import { TypographyP } from "./typography";
import Seperator from "./Seperator";
import { roundToNthDecimal } from "@/lib/utils";

import { GameFunctions, GameData } from "@/lib/types";

export default function Stats({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  functions,
  data,
}: {
  functions: GameFunctions;
  data: GameData;
}) {
  return (
    <div className="bg-orange-200 p-4 pb-8 relative overflow-clip">
      <TypographyP>
        Prestiges: <b>{data.prestiges}</b>
        <br></br>
        Prestige multiplier:{" "}
        <b>{roundToNthDecimal(data.prestigeKebabMultiplier, 4)}</b>
        <br></br>
        Played for: <b>{data.playedFor} seconds</b>
        <br></br>
        Research Points: <b>{data.researchPoints}</b>
      </TypographyP>
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
