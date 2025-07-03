import { GameData, GameFunctions } from "@/lib/types";
import { TypographyH1 } from "./typography";
import Image from "next/image";

import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

export default function Kebab({
  functions,
  data,
}: {
  functions: GameFunctions;
  data: GameData;
}) {
  const counterRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        counterRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" },
      );
    },
    { dependencies: [data.kebabs], scope: counterRef },
  );

  return (
    <div className="flex flex-col justify-center">
      <TypographyH1>KEBAB STORE</TypographyH1>
      <div
        className="w-full aspect-auto"
        onClick={() => {
          functions.addKebab(1);
        }}
      >
        <Image src="/kebab.png" alt="kebab" width="256" height="512" />
      </div>
      <div ref={counterRef}>Kebabs: {data.kebabs}</div>
    </div>
  );
}
