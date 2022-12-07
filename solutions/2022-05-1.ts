import { aoc, solution, test } from "../host.ts";
import { _, add, allGens, arr, asc, dbg, dsc, groupBy, mult, raceGens, repeatTillConst, toNum } from "./helpers.ts";

aoc(2022, 5, 1);

// prettier-ignore
test`
.
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2


`({
  part1: "CMZ",
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
  input = input.slice(2);

  const [boxes, dirs] = input.split("\n\n");

  const rows = boxes.split("\n").map((x) => x.split(/(.{3}) /g).filter((x) => x).map((x) => x[1]));

  const stacks = rows[0].map((_, i) => rows.map((x) => x[i]).reverse().filter((x) => x.trim()).slice(1));

  dbg(stacks);

  for (const line of dirs.split("\n")) {
    const [cnt, from, to] = line.split(" ").map((x) => +x).filter((x) => x);
    for (let i = 0; i < cnt; i++) {
      stacks[to - 1].push(stacks[from - 1].pop()!);
    }
  }

  return dbg(stacks.map((x) => x.at(-1)).join(""));
});
