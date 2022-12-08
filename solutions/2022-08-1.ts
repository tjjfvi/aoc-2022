import { aoc, solution, test } from "../host.ts";
import { _, add, allGens, arr, asc, dbg, dsc, groupBy, mult, raceGens, repeatTillConst, toNum } from "./helpers.ts";

aoc(2022, 8, 1);

// prettier-ignore
test`

30373
25512
65332
33549
35390


`({
  part1: 21,
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

  const trees = input.splitm("\n", "", parseInt);

  return trees.map((x, i) => x.filter((_, j) => isVisible(i, j)).length).reduce(add, 0);

  function isVisible(i: number, j: number) {
    const h = trees[i][j];
    return trees[i].slice(0, j).every((x) => x < h) || trees[i].slice(j + 1).every((x) => x < h) ||
      trees.slice(0, i).every((x) => x[j] < h) || trees.slice(i + 1).every((x) => x[j] < h);
  }

  return 0;
});
