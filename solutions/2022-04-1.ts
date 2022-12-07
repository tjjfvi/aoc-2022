import { aoc, solution, test } from "../host.ts";
import { _, add, allGens, arr, asc, dbg, dsc, groupBy, mult, raceGens, repeatTillConst, toNum } from "./helpers.ts";

aoc(2022, 4, 1);

// prettier-ignore
test`

2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8

`({
  part1: 2,
  part2: -1,
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

  return dbg(input.splitm("\n", ",", "-", parseInt)).filter(([[a, b], [c, d]]) => a <= c && d <= b || c <= a && b <= d)
    .length;

  return 0;
});
