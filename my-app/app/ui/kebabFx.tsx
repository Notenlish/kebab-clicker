import { useGSAP } from "@gsap/react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

import { GameFunctions } from "@/lib/types";

import Image from "next/image";

import { ClickFx } from "@/lib/types";

export default function KebabFx({
  functions,
  clickFxs,
}: {
  functions: GameFunctions;
  clickFxs: ClickFx[];
}) {
  const kebabRollSize = 32;

  const [boundingRect, setBoundingRect] = useState<DOMRect | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const imageRefs = useRef<Map<number, HTMLImageElement>>(new Map()); // 5
  const animatedFxIds = useRef<Set<number>>(new Set()); // 6

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
      const newClickFxs = clickFxs.filter((fx) => !fx.animated);

      newClickFxs.forEach((fx) => {
        fx.animated = true;
        const imgElement = imageRefs.current.get(fx.id);
        if (imgElement) {
          // add it to the currently animated fx ids
          animatedFxIds.current.add(fx.id);

          const startX = fx.x - kebabRollSize / 2 - boundingRect.left;
          const startY = fx.y - kebabRollSize - boundingRect.top;

          gsap.killTweensOf(imgElement); // prevent conflicts

          functions.setFxAnimated(fx);

          const startRot = Math.random() * 90 - 45;

          const tl = gsap.timeline();
          tl.fromTo(
            imgElement,
            {
              x: startX,
              y: startY,
              opacity: 1,
              scale: 0.4,
              rotation: startRot,
            },
            {
              y: startY - 50,
              x: startX + (Math.random() - 0.5) * 50,
              opacity: 0.9,
              scale: 0.9,
              rotation: Math.random() * 180 - 90,
              duration: 0.3,
              ease: "power2.out",
              onComplete: () => {
                animatedFxIds.current.delete(fx.id); // Only remove when animation ends
              },
            },
          );
          tl.to(imgElement, {
            y: startY + 100,
            x: startX + (Math.random() - 0.5) * 100,
            opacity: 0,
            scale: 0.5,
            rotation: Math.random() * 360,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {},
          });
        }
      });
    },
    { dependencies: [clickFxs, boundingRect], scope: containerRef },
  );

  return (
    <div ref={containerRef} className="w-full absolute h-full">
      {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
      {clickFxs.map((fx, i) => {
        return (
          <Image
            key={fx.id}
            ref={(el) => {
              if (el) {
                imageRefs.current.set(fx.id, el);
              } else {
                imageRefs.current.delete(fx.id);
                // ALSO NEW: Remove from animatedFxIds when element unmounts
                animatedFxIds.current.delete(fx.id);
              }
            }}
            alt=""
            width={kebabRollSize}
            height={kebabRollSize}
            src="./kebab-roll.png"
            style={{
              zIndex: 20,
              position: "absolute",
              pointerEvents: "none",
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}
    </div>
  );
}
