import { aoc, solution, test } from "../host.ts";
import { _, add, allGens, arr, asc, dbg, dsc, groupBy, mult, raceGens, repeatTillConst, toNum } from "./helpers.ts";

aoc(2022, 3, 1);

// prettier-ignore
test`

vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw


`({
  part1: 157,
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

  return input.split("\n").map((x) =>
    x.split("").map((x) => " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(x))
  ).map((x) => [x.slice(0, x.length / 2), x.slice(x.length / 2)]).map(([a, b]) => a.find((x) => b.includes(x))!).flat()
    .reduce(add, 0);

  return 0;
});
