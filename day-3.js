import { readFileSync } from "node:fs";

const input = readFileSync("./day-3.txt").toString();

// mul(X,Y), where X and Y are each 1-3 digit numbers
const mulPattern = {
  0: (s) => s === "m",
  1: (s) => s === "u",
  2: (s) => s === "l",
  3: (s) => s === "(",
  4: (s) => `${s}`.match(/^\d{1,3}$/),
  5: (s) => s === ",",
  6: (s) => `${s}`.match(/^\d{1,3}$/),
  7: (s) => s === ")",
};

const doPattern = {
  0: (s) => s === "d",
  1: (s) => s === "o",
  2: (s) => s === "(",
  3: (s) => s === ")",
};

const dontPattern = {
  0: (s) => s === "d",
  1: (s) => s === "o",
  2: (s) => s === "n",
  3: (s) => s === "'",
  4: (s) => s === "t",
  5: (s) => s === "(",
  6: (s) => s === ")",
};

const mulChars = Array(7).fill(0);
const doChars = Array(4);
const dontChars = Array(7);
let mulPointer = 0;
let doPointer = 0;
let dontPointer = 0;
let isEnabled = true;
let result = 0;

for (let i of input) {
  checkCondition(i);
  if (!isEnabled) continue;
  if (mulPointer > Object.keys(mulPattern).length - 1) {
    result += Number(mulChars[4]) * Number(mulChars[6]);
    mulChars.fill(0);
    mulPointer = 0;
    if (mulPattern[mulPointer](i)) {
      mulChars[mulPointer] = i;
      mulPointer++;
    }
    continue;
  }
  if (mulPattern[mulPointer](i)) {
    if (mulPointer !== 4 && mulPointer !== 6) {
      mulChars[mulPointer] = i;
      mulPointer++;
      continue;
    } else {
      mulChars[mulPointer] += i;
      continue;
    }
  } else {
    if (mulPointer === 4 || mulPointer === 6) {
      if (mulPattern[mulPointer + 1](i)) {
        mulChars[++mulPointer] = i;
        mulPointer++;
        continue;
      }
    }
    mulChars.fill(0);
    mulPointer = 0;
  }
}

function checkCondition(char) {
  if (doPointer > Object.keys(doPattern).length - 1) {
    doPointer = 0;
    isEnabled = true;
    doChars.fill();
  } else {
    if (doPattern[doPointer](char)) {
      doChars[doPointer] = char;
      doPointer++;
    } else {
      doChars.fill();
      doPointer = 0;
    }
  }

  if (dontPointer > Object.keys(dontPattern).length - 1) {
    dontPointer = 0;
    isEnabled = false;
    dontChars.fill();
  } else {
    if (dontPattern[dontPointer](char)) {
      dontChars[dontPointer] = char;
      dontPointer++;
    } else {
      dontChars.fill();
      dontPointer = 0;
    }
  }
}

console.log({ result });
