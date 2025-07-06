import { GameFunctions } from "@/lib/types";
import { ReactNode } from "react";

export default function CustomButton({
  functions,
  func2call,
  children,
}: {
  functions: GameFunctions;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  func2call: Function | (() => void);
  children: ReactNode;
}) {
  return (
    <button
      onClick={() => {
        func2call();
        functions.playSound("buttonClick");
      }}
      className="cursor-pointer flex w-fit gap-4 items-center p-4 border border-black rounded bg-neutral-50"
    >
      {children}
    </button>
  );
}
