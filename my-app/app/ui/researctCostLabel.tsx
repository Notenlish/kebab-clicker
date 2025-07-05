import Image from "next/image";
import { TypographyH4 } from "./typography";

export default function ResearchCostLabel({
  owned,
  cost,
}: {
  owned: number;
  cost: number;
}) {
  return (
    <div className="flex gap-2 items-center">
      <Image
        alt=""
        width={24}
        height={24}
        className=""
        src="./research-point.png"
      />
      <TypographyH4>
        {owned >= cost ? (
          <span className="text-green-500">{cost}</span>
        ) : (
          <span className="text-red-500">{cost}</span>
        )}
      </TypographyH4>
    </div>
  );
}
