import Image from "next/image";

import gsap from "gsap";
import { useEffect, createRef, RefObject, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";

interface RollItem {
  ref: RefObject<HTMLImageElement | null>; // Or whatever DOM element type you expect, e.g., HTMLCanvasElement
  xpos: number;
  ypos: number;
  index: number;
}

export default function KebabRollsBg() {
  const containerRef = useRef(null);
  const [rolls, setRolls] = useState<RollItem[]>([]);
  const [boundingRect, setBoundingRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    for (let i = 0; i < 15; i++) {
      const newRef = createRef<HTMLImageElement>();
      const newRoll: RollItem = {
        ref: newRef,
        xpos: Math.random() - 0.07,
        ypos: Math.random(),
        index: i,
      };
      setRolls((prevRolls) => [...prevRolls, newRoll]);
    }
  }, []);

  useGSAP(
    () => {
      for (let i = 0; i < rolls.length; i++) {
        const roll = rolls[i];

        if (!boundingRect) {
          return;
        }

        const startX = roll.xpos * boundingRect.width;
        const startY = roll.ypos * boundingRect?.height; // Assuming startY is always 0 based on your calculation
        const endY = boundingRect.height;
        const duration = 5; // seconds
        const progress = (roll.ypos - startY) / boundingRect.height;

        const tl = gsap.timeline();
        tl.fromTo(
          roll.ref.current,
          { x: startX, y: "-110%" },
          { x: startX, y: endY, duration: duration, ease: "none", repeat: -1 },
        );
        tl.seek(progress * duration);
        tl.play();

        const duration2 = 1.5;
        const tl2 = gsap.timeline();
        tl2.fromTo(
          roll.ref.current,
          {
            rotateZ: -180,
          },
          {
            rotateZ: 180,
            ease: "none",
            repeat: -1,
            yoyo: false,
            duration: duration2,
          },
        );
        tl2.seek(progress * duration2);
        tl2.play();
        // how do I specify at which second of the animation its in(progress)
      }
    },
    { dependencies: [rolls, boundingRect], scope: containerRef },
  );

  useEffect(() => {
    // @ts-expect-error ...
    setBoundingRect(containerRef.current?.getBoundingClientRect());
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full -translate-y-4 -z-10 h-full absolute"
    >
      {rolls.map((roll, _i) => (
        <Image
          key={_i}
          src="./kebab-roll.png"
          alt=""
          ref={roll.ref}
          width="48"
          height="64"
          style={{
            position: "absolute",
          }}
        />
      ))}
    </div>
  );
}
