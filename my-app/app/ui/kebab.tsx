import { GameData, GameFunctions } from "@/lib/types";
import { TypographyH2 } from "./typography";
import Image from "next/image";

import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import KebabRollsBg from "./rollsBg";

export default function Kebab({
  functions,
  data,
}: {
  functions: GameFunctions;
  data: GameData;
}) {
  const counterRef = useRef(null);
  const kebabRef = useRef(null);
  const rankTextRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        counterRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" },
      );
      gsap.fromTo(
        kebabRef.current,
        { scale: 1.1 },
        { scale: 1, duration: 0.2, ease: "circ.out" },
      );
    },
    { dependencies: [data.kebabs], scope: counterRef },
  );

  useGSAP(
    () => {
      gsap.fromTo(
        rankTextRef.current,
        { scale: 1.05, rotateZ: 5 },
        {
          scale: 1,
          rotateZ: -5,
          duration: 0.3,
          ease: "circ.inOut",
          repeat: -1,
          yoyo: true,
        },
      );
    },
    { dependencies: [], scope: rankTextRef },
  );

  return (
    <div className="flex overflow-clip z-10 flex-col items-center justify-start min-h-screen bg-[#e1bd85] relative">
      <KebabRollsBg></KebabRollsBg>
      <br />
      <TypographyH2>
        <div>Rank: </div>
        <div className="text-red-700" ref={rankTextRef}>
          {data.rank}
        </div>
      </TypographyH2>
      <br />
      <div className="w-full aspect-auto grid place-content-center">
        <Image
          onClick={() => {
            functions.addKebab(data.kebabsPerClick);
          }}
          className="cursor-pointer"
          ref={kebabRef}
          src="/kebab.png"
          alt="kebab"
          width="256"
          height="512"
        />
      </div>
      <br />
      <div className="flex-col z-10 flex items-center relative w-full h-full">
        <div className="top-0 left-0 bg-white opacity-30 w-full h-full absolute -z-10">.</div>
        <div ref={counterRef}>Kebabs: {data.kebabs}</div>
        <div>Kebabs per click: {data.kebabsPerClick}</div>
        <div>Kebabs per second: {data.kebabsPerSecond}</div>
      </div>
    </div>
  );
}
