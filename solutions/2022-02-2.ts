import { aoc, solution, test } from "../host.ts";
import { _, add, allGens, arr, asc, dbg, dsc, groupBy, mult, raceGens, repeatTillConst, toNum } from "./helpers.ts";

aoc(2022, 2, 2);

// prettier-ignore
test`

A Y
B X
C Z

`({
  part1: 15,
  part2: 12,
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

  const guide = input.splitm("\n", " ");
  dbg(guide);

  return guide.map(([a, b]) => ["ABC".indexOf(a), "XYZ".indexOf(b)]).map(([a, b]) =>
    dbg(1 + b * 3 + (b === 1 ? a : b ? (a + 1) % 3 : (a + 2) % 3))
  ).reduce(add, 0);
});
