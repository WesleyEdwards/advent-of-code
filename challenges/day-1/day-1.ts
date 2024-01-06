import fs from "node:fs";

const numberMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

type NumberString = keyof typeof numberMap;

function findNumberReverse(line: string, fromRight: boolean) {
  const lineArray = line.trim().split("");
  return lineArray[fromRight ? "reduceRight" : "reduce"]<number | null>(
    (num, curr, i, arr) => {
      if (num !== null) return num;
      if (curr.charCodeAt(0) >= 48 && curr.charCodeAt(0) <= 57) {
        return +curr;
      }

      const numberInMap: NumberString | undefined = Object.keys(numberMap).find(
        (numString) => arr.slice(i, i + numString.length).join("") === numString
      ) as NumberString | undefined;

      return numberInMap ? numberMap[numberInMap] : null;
    },
    null
  );
}

export function day1() {
  fs.readFile("./challenges/day-1/data.txt", "utf8", (_: any, data: any) => {
    const lines: string[] = data.split("\n");
    const sumOfAll = lines.reduce<number>((sum, currLine) => {
      const first = findNumberReverse(currLine, false);
      const last = findNumberReverse(currLine, true);
      return sum + +`${first}${last}`;
    }, 0);
    console.log(sumOfAll);
  });
}
