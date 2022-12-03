import { aoc, solution, test } from "../host.ts";
import { _, add, allGens, arr, asc, dbg, dsc, groupBy, mult, raceGens, repeatTillConst, toNum } from "./helpers.ts";

aoc(2022, 1, 2);

// prettier-ignore
test`

1000
2000
3000

4000

5000
6000

7000
8000
9000

10000


`({
  part1: 24000,
  part2: 45000,
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

  return input.splitm("\n\n", "\n", parseInt).map((x) => x.reduce(add, 0)).sort((a, b) => b - a).slice(0, 3).reduce(
    add,
    0,
  );
});
