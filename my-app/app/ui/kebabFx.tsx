import { useGSAP } from "@gsap/react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap"; // Import gsap

import { GameFunctions, GameData } from "@/lib/types";
import Image from "next/image";
import { ClickFx } from "@/lib/types";
import useMousePosition from "./mousePos"; // Assuming this hook provides accurate mouse coordinates

export default function KebabFx({
  functions,
  data,
  clickFxs,
}: {
  functions: GameFunctions;
  data: GameData;
  clickFxs: ClickFx[];
}) {
  const kebabRollSize = 32;

  const mousePosition = useMousePosition();
  const [boundingRect, setBoundingRect] = useState<DOMRect | null>(null);
  const containerRef = useRef<HTMLDivElement>(null); // Specify HTMLDivElement for type safety
  // Use a ref to store a map of image elements for direct GSAP targeting
  const imageRefs = useRef<Map<number, HTMLImageElement>>(new Map());

  // Effect to set the bounding rectangle of the container
  useEffect(() => {
    if (containerRef.current) {
      setBoundingRect(containerRef.current.getBoundingClientRect());
    }
  }, []);

  useGSAP(
    () => {
      // Animate new click effects
      clickFxs.forEach((fx) => {
        const imageElement = imageRefs.current.get(fx.id); // Use a unique ID for each clickFx

        if (!boundingRect || !imageElement) {
          return;
        }

        // Position the particle at the click location relative to the container
        // mousePosition.x and mousePosition.y should be clientX/Y
        //const startX = fx.x - boundingRect.left;
        const startX = fx.x - kebabRollSize / 2 - boundingRect.left;
        const startY = fx.y - kebabRollSize - boundingRect.top;

        gsap.fromTo(
          imageElement,
          {
            x: startX,
            y: startY,
            opacity: 1,
            scale: 0.5,
          },
          {
            y: startY - 50, // Move up
            opacity: 1,
            scale: 1,
            duration: 50,
            ease: "power2.out",
            onComplete: () => {
              // Optionally remove the element from the DOM or hide it after animation
              // For now, we rely on React re-rendering and removing old clickFxs
            },
          },
        );

        // Additional animation for "going down" after going up a little
        gsap.to(imageElement, {
          y: startY + 100, // Move down further
          opacity: 1,
          duration: 10,
          ease: "power1.in",
          delay: 0.3, // Start this animation after the initial "up" motion begins to settle
          overwrite: true, // Ensure this animation can override previous tweens if needed
        });
      });
    },
    { dependencies: [clickFxs, boundingRect], scope: containerRef },
  );

  return (
    <div ref={containerRef} className="w-full absolute h-full overflow-hidden">
      {clickFxs.map((fx) => (
        <Image
          key={fx.id} // Use fx.id as the key
          ref={(el) => {
            if (el) {
              imageRefs.current.set(fx.id, el);
            } else {
              imageRefs.current.delete(fx.id); // Clean up on unmount
            }
          }}
          alt=""
          width={kebabRollSize}
          height={kebabRollSize}
          src="./kebab-roll.png"
          className="absolute z-20" // Ensure image can be absolutely positioned
          style={{ pointerEvents: "none" }} // Prevent image from interfering with clicks
        />
      ))}
    </div>
  );
}
