import { useGSAP } from "@gsap/react";
import { useState, useEffect, useRef } from "react";

import { GameFunctions, GameData } from "@/lib/types";

import Image from "next/image";

import { ClickFx } from "@/lib/types";
import useMousePosition from "./mousePos";

export default function KebabFx({
  functions,
  data,
  clickFxs,
}: {
  functions: GameFunctions;
  data: GameData;
  clickFxs: ClickFx[];
}) {
  const mousePosition = useMousePosition();
  const [boundingRect, setBoundingRect] = useState<DOMRect | null>(null);
  const containerRef = useRef(null);


  useGSAP(
    () => {
      for (let i = 0; i < clickFxs.length; i++) {
        const fx = clickFxs[i];

        if (!boundingRect) {
          return;
        }
        
        // when user clicks, its supposed to spawn in click Fx particles and then animate them first going up a little then going down using gsap.
      }
    },
    { dependencies: [boundingRect], scope: containerRef },
  );

  return (
    <div ref={containerRef} className="w-full absolute h-full">
      {clickFxs.map((e, i) => {
        return (
          <Image key={i} alt="" width={32} height={32} src="./kebab-roll.png" />
        );
      })}
    </div>
  );
}
