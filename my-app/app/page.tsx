import Image from "next/image";
import Game from "./ui/game";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="min-h-screen">
        <Game></Game>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
