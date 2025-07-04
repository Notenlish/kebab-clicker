import { GameData, GameFunctions } from "@/lib/types";
import Image from "next/image";

export default function GeneratorVisuals({
  functions,
  data,
}: {
  functions: GameFunctions;
  data: GameData;
}) {
  return (
    <div className="flex flex-col overflow-clip">
      {data.generators.map((e, _) => {
        return (
          <div className="relative w-full h-80" key={e.id}>
            <Image
              className="absolute left-0 top-0 max-h-80"
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
                  style={{ left: left_cls}}
                  className={`absolute z-10 top-12 ${left_cls}`}
                  width="64"
                  height="128"
                  key={i}
                ></Image>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
