import { aoc, solution, test } from "../host.ts";
import { _, add, allGens, arr, asc, dbg, dsc, groupBy, mult, raceGens, repeatTillConst, toNum } from "./helpers.ts";

aoc(2022, 9, 1);

// prettier-ignore
test`

R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2


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

  const tails = new Set<string>();
  const head: [number, number] = [0, 0];
  const tail: [number, number] = [0, 0];

  for (const [dir, cnt] of input.splitm("\n", " ")) {
    for (let i = 0; i < +cnt; i++) {
      head[0] += { R: 1, L: -1, D: 0, U: 0 }[dir]!;
      head[1] += { R: 0, L: 0, D: -1, U: 1 }[dir]!;
      if (Math.hypot(head[0] - tail[0], head[1] - tail[1]) > 1.5) {
        if (tail[1] === head[1]) {
          tail[0] = tail[0] + (head[0] - tail[0]) / 2;
        } else if (tail[0] === head[0]) {
          tail[1] = tail[1] + (head[1] - tail[1]) / 2;
        } else {
          tail[0] += Math.sign(head[0] - tail[0]);
          tail[1] += Math.sign(head[1] - tail[1]);
        }
      }
      dbg(head, tail);
      tails.add(tail + "");
    }
  }

  return tails.size;
});
