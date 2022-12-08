import { aoc, solution, test } from "../host.ts";
import { _, add, allGens, arr, asc, dbg, dsc, groupBy, mult, raceGens, repeatTillConst, toNum } from "./helpers.ts";

aoc(2022, 8, 2);

// prettier-ignore
test`

30373
25512
65332
33549
35390


`({
  part1: 21,
  part2: 8,
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

  return trees.map((x, i) => x.map((_, j) => score(i, j))).flat().sort(dsc((x) => x))[0];

  function score(i: number, j: number) {
    const h = trees[i][j];
    return _score(trees[i].slice(0, j).reverse(), h) * _score(trees[i].slice(j + 1), h) *
      _score(trees.slice(0, i).map((x) => x[j]).reverse(), h) * _score(trees.slice(i + 1).map((x) => x[j]), h);
  }

  function _score(x: number[], h: number) {
    return (x.findIndex((a) => a >= h) + 1) || x.length;
  }

  return 0;
});
