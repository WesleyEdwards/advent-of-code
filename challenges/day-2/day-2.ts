import fs from "node:fs";

type Color = "red" | "green" | "blue";
type GameSet = {
  howMany: number;
  color: Color;
};

type Game = {
  id: number;
  sets: GameSet[];
};

const maxColors: Record<Color, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

function possibleGames(games: Game[]) {
  const possibleGames = games.reduce((acc: number, currGame: Game) => {
    if (currGame.sets.every((set) => set.howMany <= maxColors[set.color])) {
      acc += currGame.id;
    }
    return acc;
  }, 0);
  console.log("Possible Games ", possibleGames);
}

function powerOfGame(game: Game) {
  const { blue, green, red } = game.sets.reduce<Record<Color, number>>(
    (acc, { color, howMany }) => ({
      ...acc,
      [color]: Math.max(acc[color], howMany),
    }),
    { red: 0, green: 0, blue: 0 }
  );
  return blue * green * red;
}

function getPowers(games: Game[]) {
  const totalPower = games.reduce<number>(
    (acc, curr) => acc + powerOfGame(curr),
    0
  );
  console.log("Powers ", totalPower);
}

export function day2() {
  fs.readFile(
    "./challenges/day-2/game-all.txt",
    "utf8",
    (err: any, data: any) => {
      if (err) return console.error(err);

      const lines: string[] = data.split("\n");

      const games: Game[] = lines.map((line) => {
        const [gameString, sets] = line.split(":");
        const gameId = +gameString.replace("Game ", "");
        const setList = sets.split(";").map((s) => {
          const colors: GameSet[] = s.split(",").map((numAndColor) => {
            const [num, color] = numAndColor.trim().split(" ");
            return { howMany: +num, color } as GameSet;
          });
          return colors;
        });
        return { id: gameId, sets: setList.flat() };
      });

      possibleGames(games);
      getPowers(games);
    }
  );
}
