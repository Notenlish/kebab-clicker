import { GameData, GameFunctions } from "@/lib/types";
import Image from "next/image";

import Seperator from "./Seperator";

export default function GeneratorVisuals({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  functions,
  data,
}: {
  functions: GameFunctions;
  data: GameData;
}) {
  return (
    <div className="flex flex-col overflow-clip relative">
      {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        data.generators.map((e, _) => {
        return (
          <div className="relative w-full h-60" key={e.id}>
            <Image
              className="absolute left-0 top-0 max-h-60"
              src={e.backgroundImage}
              alt=""
              width={1280}
              height={720}
            />
            {Array.from({ length: e.owned }).map((_, i) => {
              const left_cls = `${16 + i * 24}px`;
              return (
                <Image
                  src={e.unitImage}
                  alt=""
                  style={{ left: left_cls }}
                  className={`absolute z-10 top-12 ${left_cls}`}
                  width="64"
                  height="128"
                  key={i}
                ></Image>
              );
            })}
            <Seperator
              orientation="horizontal"
              width={640}
              height={16}
              bottom={-16}
              left={0}
            />
          </div>
        );
      })}
      <Seperator width={16} height={1920} right={0} top={0} />
    </div>
  );
}
