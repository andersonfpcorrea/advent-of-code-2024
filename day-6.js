import { readFileSync } from "node:fs";

const input = readFileSync("./day-6.txt").toString().split("\n");

const UP = "UP";
const RIGHT = "RIGHT";
const DOWN = "DOWN";
const LEFT = "LEFT";
const directions = {
  [UP]: {
    current: UP,
    next: RIGHT,
    getNextTurnLocation: (currLocation) => [
      currLocation[0],
      currLocation[1] + 1,
    ],
    getNextAheadLocation: (currLocation) => [
      currLocation[0] - 1,
      currLocation[1],
    ],
  },
  [DOWN]: {
    current: DOWN,
    next: LEFT,
    getNextTurnLocation: (currLocation) => [
      currLocation[0],
      currLocation[1] - 1,
    ],
    getNextAheadLocation: (currLocation) => [
      currLocation[0] + 1,
      currLocation[1],
    ],
  },
  [LEFT]: {
    current: LEFT,
    next: UP,
    getNextTurnLocation: (currLocation) => [
      currLocation[0] - 1,
      currLocation[1],
    ],
    getNextAheadLocation: (currLocation) => [
      currLocation[0],
      currLocation[1] - 1,
    ],
  },
  [RIGHT]: {
    current: RIGHT,
    next: DOWN,
    getNextTurnLocation: (currLocation) => [
      currLocation[0] + 1,
      currLocation[1],
    ],
    getNextAheadLocation: (currLocation) => [
      currLocation[0],
      currLocation[1] + 1,
    ],
  },
};
const mapSymbols = { OBSTACLE: "#", FREE_SPACE: ".", INITIAL_POSITION: "^" };

const situationMatrix = [];
const guardPosition = { location: [], heading: directions.UP };
const distinctPositions = new Set();

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (j === 0) situationMatrix[i] = [];
    situationMatrix[i][j] = input[i][j];
    if (input[i][j] === "^") {
      guardPosition.location.push(i, j);
      distinctPositions.add(`${i}:${j}`);
    }
  }
}

while (true) {
  const nextTurnPostion = guardPosition.heading.getNextTurnLocation(
    guardPosition.location
  );
  const nextAheadPosition = guardPosition.heading.getNextAheadLocation(
    guardPosition.location
  );
  try {
    if (
      [mapSymbols.FREE_SPACE, mapSymbols.INITIAL_POSITION].includes(
        situationMatrix[nextAheadPosition[0]][nextAheadPosition[1]]
      )
    ) {
      guardPosition.location = nextAheadPosition;
      distinctPositions.add(`${nextAheadPosition[0]}:${nextAheadPosition[1]}`);
      continue;
    } else if (
      situationMatrix[nextAheadPosition[0]][nextAheadPosition[1]] ===
      mapSymbols.OBSTACLE
    ) {
      guardPosition.location = nextTurnPostion;
      guardPosition.heading = directions[guardPosition.heading.next];
      distinctPositions.add(
        `${guardPosition.location[0]}:${guardPosition.location[1]}`
      );
      continue;
    } else break;
  } catch (e) {
    break;
  }
}

console.log({ distinctPositions: distinctPositions.size });
