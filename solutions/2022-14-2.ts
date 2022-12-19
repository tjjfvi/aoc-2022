import { aoc, solution, test } from "../host.ts";
import { _, add, allGens, arr, asc, dbg, dsc, groupBy, mult, raceGens, repeatTillConst, toNum } from "./helpers.ts";

aoc(2022, 14, 2);

// prettier-ignore
test`

498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9


`({
  part1: 24,
  part2: 93,
});

// prettier-ignore
test`

`({
  part1: -1,
  part2: -1,
});

// prettier-ignore
test`

`({
  part1: -1,
  part2: -1,
});

solution(async (input) => {
  dbg.x(input);

  const field: string[][] = [];

  input.split("\n").map((x) =>
    x.splitm(" -> ", ",", parseInt).map((x) => x.reverse()).map((x, i, a) => [x, a[i + 1]]).slice(0, -1)
  ).flat().map((x) => drawLine(...x as [any, any]));

  field[field.length + 1] = Array(10000).fill("#");

  let n = 0;

  print();

  while (drip()) {
    n++;
    print();
  }

  return n;

  function print() {
    // console.log([...field].map((x) => [...x ?? []].map((a) => a ?? " ").slice(490).join("")).join("\n"));
  }

  function drip() {
    let s = [0, 500];
    if (get(s)) return false;
    while (true) {
      if (s[0] > field.length) throw "fell off";
      // console.log(s);
      if (!get([s[0] + 1, s[1]])) {
        s[0] += 1;
      } else if (!get([s[0] + 1, s[1] - 1])) {
        s[0] += 1;
        s[1] -= 1;
      } else if (!get([s[0] + 1, s[1] + 1])) {
        s[0] += 1;
        s[1] += 1;
      } else {
        break;
      }
    }
    (field[s[0]] ??= [])[s[1]] = "o";
    return true;
  }

  function get(x: number[]) {
    return field[x[0]]?.[x[1]];
  }

  function drawLine(s: number[], e: number[]) {
    do {
      (field[s[0]] ??= [])[s[1]] = "#";
      s[0] += Math.sign(e[0] - s[0]);
      s[1] += Math.sign(e[1] - s[1]);
    } while (s + "" !== e + "");
    (field[s[0]] ??= [])[s[1]] = "#";
  }

  return 0;
});
