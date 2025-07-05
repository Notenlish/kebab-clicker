import Image from "next/image";
export default function Seperator({
  left,
  right,
  top,
  height,
  width,
  bottom,
  orientation = "vertical",
}: {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  height: number;
  width: number;
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <Image
      className="absolute z-10 bg-repeat"
      src={orientation == "vertical" ? "./wall.png" : "./wall-horizontal.png"}
      alt=""
      style={{
        width: width,
        height: height,
        left: left,
        top: top,
        bottom: bottom,
        right: right,
      }}
      width={width}
      height={height}
    />
  );
}
