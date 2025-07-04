import Image from "next/image";
import { TypographyH4 } from "./typography";
export default function CostLabel({
  owned,
  cost,
}: {
  owned: number;
  cost: number;
}) {
  return (
    <div className="flex gap-4 items-center">
      <Image
        alt=""
        width={16}
        height={16}
        className="rotate-z-45"
        src="/kebab-roll.png"
      />
      {/* if owned is more or equal to cost, make it green. otherwise red. */}
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
