import { readFileSync } from "node:fs";

const inputBuffer = readFileSync("./day-1.txt");

const left = [];
const right = [];

inputBuffer
  .toString()
  .split("\n")
  .forEach((line) => {
    const [l, r] = line.split("   ");
    left.push(+l);
    right.push(+r);
  });

left.sort();
right.sort();

let sum = 0;

for (let i = 0; i < left.length; i++) {
  sum += Math.abs(right[i] - left[i]);
}

console.log({ sum });
