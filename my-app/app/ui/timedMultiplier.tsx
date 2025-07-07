import { GameData, GameFunctions } from "@/lib/types";
import Image from "next/image";
import { useEffect, RefObject, useState, useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface pos {
  x: number;
  y: number;
}

export default function TimedMultiplierComponent({
  data,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  functions,
  containerRef,
}: {
  data: GameData;
  functions: GameFunctions;
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  const [boundingRect, setBoundingRect] = useState<DOMRect | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const updateBoundingRect = () => {
      if (containerRef.current) {
        setBoundingRect(containerRef.current.getBoundingClientRect());
      }
    };
    updateBoundingRect(); // Initial

    window.addEventListener("resize", updateBoundingRect);
    window.addEventListener("scroll", updateBoundingRect, true);

    return () => {
      window.removeEventListener("resize", updateBoundingRect);
      window.removeEventListener("scroll", updateBoundingRect, true);
    };
  }, []);

  useGSAP(
    () => {
      if (!boundingRect) {
        return;
      }
      const tl = gsap.timeline();
      tl.fromTo(
        imgRef.current,
        { rotation: 0, duration: 2.0 },
        {
          rotation: 360,
          duration: 2.0,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
        },
      );
    },
    {
      dependencies: [data.timedMultiplier, boundingRect],
      scope: containerRef,
    },
  );

  const [pos, setPos] = useState<pos | null>();
  useEffect(() => {
    if (!data.timedMultiplier || !boundingRect) return;

    const x =
      boundingRect?.left +
      boundingRect?.width * 0.1 +
      boundingRect?.width * 0.8 * Math.random();
    const y =
      boundingRect?.top +
      boundingRect?.height * 0.1 +
      boundingRect?.height * 0.8 * Math.random();
    console.log(boundingRect, x, y);
    setPos({ x: x, y: y });
  }, [data.timedMultiplier]);

  return (
    <div
      className="absolute z-30"
      style={{ left: pos?.x || 0, top: pos?.y || 0 }}
    >
      {data.timedMultiplier && pos ? (
        <Image
          className="cursor-pointer"
          ref={imgRef}
          width={48}
          height={48}
          alt=""
          style={{
            transform: "translate(-50%, -50%)",
            left: pos.x,
            top: pos.y,
          }}
          src={data.timedMultiplier?.image}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
