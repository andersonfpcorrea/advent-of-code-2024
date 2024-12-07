import { readFileSync } from "node:fs";

const [rules, updates] = readFileSync("./day-5.txt")
  .toString()
  .split("\n\n")
  .map((e) => e.split("\n"));

let middlePagesSum = 0;

/** @type {{[x: string]: {after: string[]; before: string[]}}} */
const rulesMap = {};

/** @type {string[][]} */
const incorrectlyOrdered = [];

/**
 * @param {string[]} pages
 * @returns {{isCorrect: boolean; failedIndexes: [string, string]}}
 */
function hasRightOrder(pages) {
  let isCorrect = true;
  const failedIndexes = [];
  for (let i = 0; i < pages.length; i++) {
    if (failedIndexes.length) break;
    for (let j = 0; j < pages.length; j++) {
      if (i === j) continue;
      if (j > i && rulesMap[pages[i]]["after"].includes(pages[j])) {
        isCorrect = false;
        failedIndexes.push(i, j);
        break;
      }
      if (j < i && rulesMap[pages[i]]["before"].includes(pages[j])) {
        isCorrect = false;
        failedIndexes.push(i, j);
        break;
      }
    }
  }
  return { isCorrect, failedIndexes };
}

/** Create rulesMap object */
rules.forEach((r) => {
  const [left, right] = r.split("|");
  if (!rulesMap[left]) rulesMap[left] = { before: [], after: [] };
  if (!rulesMap[right]) rulesMap[right] = { before: [], after: [] };
  rulesMap[left]["before"].push(right);
  rulesMap[right]["after"].push(left);
});

/** Calculate middlePagesSum */
updates.forEach((update) => {
  const pages = update.split(",");
  if (hasRightOrder(pages).isCorrect)
    middlePagesSum += Number(pages[(pages.length - 1) / 2]);
  else incorrectlyOrdered.push(pages);
});

console.log({ middlePagesSum });

// part 2
let secondSum = 0;
incorrectlyOrdered.forEach((pages) => {
  let isFixed = false;
  let pagesCopy = [...pages];
  while (!isFixed) {
    const { failedIndexes, isCorrect } = hasRightOrder(pagesCopy);
    if (isCorrect) {
      isFixed = true;
      secondSum += Number(pagesCopy[(pagesCopy.length - 1) / 2]);
      break;
    } else {
      const [a, b] = failedIndexes;
      const aElement = pagesCopy[a];
      const bElement = pagesCopy[b];
      pagesCopy[a] = bElement;
      pagesCopy[b] = aElement;
    }
  }
});

console.log({ secondSum });
