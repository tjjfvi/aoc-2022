import { aoc, solution, test } from "../host.ts";
import { _, add, allGens, arr, asc, dbg, dsc, groupBy, mult, raceGens, repeatTillConst, toNum } from "./helpers.ts";

aoc(2022, 6, 1);

// prettier-ignore
test`

mjqjpqmgbljsphdztnvjfqwrcgsmlb

`({
  part1: 7,
  part2: -1,
});

// prettier-ignore
test`

bvwbjplbgvbhsrlpgdmjqwftvncz

`({
  part1: 5,
  part2: -1,
});

// prettier-ignore
test`

nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg

`({
  part1: 10,
  part2: -1,
});

solution(async (input) => {
  dbg.x(input);

  for (let i = 0; i < input.length; i++) {
    if (new Set(input.slice(i - 4, i)).size === 4) return i;
  }

  return 0;
});
