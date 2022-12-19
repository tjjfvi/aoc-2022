import { aoc, solution, test } from "../host.ts";
import { _, add, allGens, arr, asc, dbg, dsc, groupBy, mult, raceGens, repeatTillConst, toNum } from "./helpers.ts";

aoc(2022, 13, 1);

// prettier-ignore
test`

[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]


`({
  part1: 13,
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

  const pairs = input.splitm("\n\n", "\n", JSON.parse);
  return (pairs.flatMap((x, i) => cmp(...x as [T, T]) < 0 ? [i + 1] : [])).reduce(add, 0);

  type T = number | T[];
  function cmp(x: T, y: T): number {
    if (typeof x === "number" && typeof y === "number") {
      console.log("compare", x, y);
      return x - y;
    }
    if (typeof x === "number") x = Array(1).fill(x);
    if (typeof y === "number") y = Array(1).fill(y);
    for (let i = 0; i < x.length && i < y.length; i++) {
      let c = cmp(x[i], y[i]);
      if (c) return c;
    }
    return x.length - y.length;
  }

  return 0;
});
