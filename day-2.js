import { readFileSync } from "node:fs";

const inputBuffer = readFileSync("./day-2.txt");

const INCREASING = 1;
const DECREASING = 0;

let safeReports = 0;

inputBuffer
  .toString()
  .split("\n")
  .forEach((reportLine) => {
    const report = reportLine.split(" ").map(Number);
    if (isSafeReport(report)) return safeReports++;
    report.some((_, index) => {
      const tentative = report.filter((_, i) => i !== index);
      if (isSafeReport(tentative)) {
        return ++safeReports;
      }
    });
  });

/**
 * @param {number[]} report
 */
function isSafeReport(report) {
  let order;
  let isSafe = false;
  for (let i = 1; i < report.length; i++) {
    const diff = Math.abs(report[i] - report[i - 1]);
    if (diff < 1 || diff > 3) {
      isSafe = false;
      break;
    }
    if (i === 1) {
      order = report[i] > report[i - 1] ? INCREASING : DECREASING;
      continue;
    }
    if (report[i] > report[i - 1] && order !== INCREASING) {
      isSafe = false;
      break;
    }
    if (report[i] < report[i - 1] && order !== DECREASING) {
      isSafe = false;
      break;
    }
    isSafe = true;
  }
  return isSafe;
}

console.log({ safeReports });
