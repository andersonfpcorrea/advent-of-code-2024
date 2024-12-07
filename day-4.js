import { readFileSync } from "node:fs";

const input = readFileSync("./day-4.txt")
  .toString()
  .split("\n")
  .map((line) => line.split(""));

/**
 * Part 1
 */

const XMAS = "XMAS";

let xmasCounter = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (input[i][j] !== "X") continue;
    else {
      // check ahead
      if (j <= input[i].length - 4) {
        const t = `${input[i][j]}${input[i][j + 1]}${input[i][j + 2]}${
          input[i][j + 3]
        }`;
        if (t === XMAS) xmasCounter++;
      }
      // check behind
      if (j >= 3) {
        const t = `${input[i][j]}${input[i][j - 1]}${input[i][j - 2]}${
          input[i][j - 3]
        }`;
        if (t === XMAS) xmasCounter++;
      }
      // check down
      if (i <= input.length - 4) {
        const t = `${input[i][j]}${input[i + 1][j]}${input[i + 2][j]}${
          input[i + 3][j]
        }`;
        if (t === XMAS) xmasCounter++;
      }
      // check up
      if (i >= 3) {
        const t = `${input[i][j]}${input[i - 1][j]}${input[i - 2][j]}${
          input[i - 3][j]
        }`;
        if (t === XMAS) xmasCounter++;
      }
      // check top left
      if (i >= 3 && j >= 3) {
        const t = `${input[i][j]}${input[i - 1][j - 1]}${input[i - 2][j - 2]}${
          input[i - 3][j - 3]
        }`;
        if (t === XMAS) xmasCounter++;
      }
      // check top right
      if (i >= 3 && j <= input[i].length - 4) {
        const t = `${input[i][j]}${input[i - 1][j + 1]}${input[i - 2][j + 2]}${
          input[i - 3][j + 3]
        }`;
        if (t === XMAS) xmasCounter++;
      }
      // check down left
      if (i <= input.length - 4 && j >= 3) {
        const t = `${input[i][j]}${input[i + 1][j - 1]}${input[i + 2][j - 2]}${
          input[i + 3][j - 3]
        }`;
        if (t === XMAS) xmasCounter++;
      }
      // check down right
      if (i <= input.length - 4 && j <= input[i].length - 4) {
        const t = `${input[i][j]}${input[i + 1][j + 1]}${input[i + 2][j + 2]}${
          input[i + 3][j + 3]
        }`;
        if (t === XMAS) xmasCounter++;
      }
    }
  }
}

console.log({ xmasCounter });

/**
 * Part 2
 */

const MAS = "MAS";

let masCounter = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (
      i === 0 ||
      j === 0 ||
      j === input[i].length - 1 ||
      i === input.length - 1
    )
      continue;
    if (input[i][j] !== "A") continue;
    else {
      const topLeft = `${input[i - 1][j - 1]}`;
      const downRight = `${input[i + 1][j + 1]}`;
      const topRight = `${input[i - 1][j + 1]}`;
      const downLeft = `${input[i + 1][j - 1]}`;
      const diagonalOne = `${topLeft}A${downRight}`;
      const diagonalOneReversed = diagonalOne.split("").reverse().join("");
      const diagonalTwo = `${topRight}A${downLeft}`;
      const diagonalTwoReversed = diagonalTwo.split("").reverse().join("");
      if (
        (diagonalOne === MAS || diagonalOneReversed === MAS) &&
        (diagonalTwo === MAS || diagonalTwoReversed === MAS)
      )
        masCounter++;
    }
  }
}

console.log({ masCounter });
