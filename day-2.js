import { readFileSync } from "node:fs";

const inputBuffer = readFileSync("./day-2.txt");

let safeReports = 0;

inputBuffer
  .toString()
  .split("\n")
  .forEach((report) => {
    let isSafe = true;
    const lvs = report.split(" ");
    if (
      !lvs.every((e, index, arr) => {
        if (index === 0) return true;
        else return e > arr[index - 1] || e > arr[index - 1];
      })
    ) {
      isSafe = false;
      return;
    }
    for (let i = 1; i < lvs.length; i++) {
      const diff = Math.abs(lvs[i - 1] - lvs[i]);
      if (diff < 1 || diff > 3) {
        isSafe = false;
        break;
      }
    }
  });

console.log({ safeReports });
