import { TypographyP } from "./typography";
import Seperator from "./Seperator";
import KebabCostLabel from "./kebabCostLabel";
import { calculatePrestigeCost } from "@/lib/utils";
import { GameData, GameFunctions } from "@/lib/types";
import CustomButton from "./button";

export default function PrestigeButton({
  functions,
  data,
}: {
  functions: GameFunctions;
  data: GameData;
}) {
  return (
    <div className="bg-orange-200 p-4 pb-8 relative overflow-clip">
      <TypographyP>
        Prestige multiplies the amount of kebabs you make per each click and per
        second and provides a research point.
      </TypographyP>
      <br></br>
      <CustomButton
        functions={functions}
        func2call={() => {
          console.log("skibidi");
          functions.doPrestige();
        }}
      >
        Prestige{" "}
        <KebabCostLabel
          owned={data.kebabs}
          cost={calculatePrestigeCost(data.basePrestigeCost, data.prestiges)}
        />
      </CustomButton>
      <Seperator
        width={640}
        height={16}
        bottom={0}
        left={0}
        orientation="horizontal"
      />
      <Seperator width={16} height={640} bottom={0} right={0} />
    </div>
  );
}
