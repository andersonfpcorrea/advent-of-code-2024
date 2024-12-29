import { read, readFileSync } from "node:fs";

const input = readFileSync("./day-7.txt")
  .toString()
  .split("\n")
  .map((e) => e.split(": "));

function isValidEquation(line) {
  const numbers = line.split(" ");
  const possibilities = numbers.length - 1 * 2;
  const possibleEquations = Array.from({ length: possibilities }, (_, i) =>
    Array(line.length - 1)
  );
  for (let i = 0; i < possibleEquations.length; i++) {
    for (let j = 0; j < possibleEquations[i].length; j++) {}
  }
}
