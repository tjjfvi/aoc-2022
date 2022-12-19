import { aoc, solution, test } from "../host.ts";
import { _, add, allGens, arr, asc, dbg, dsc, groupBy, mult, raceGens, repeatTillConst, toNum } from "./helpers.ts";

aoc(2022, 12, 2);

// prettier-ignore
test`

Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi


`({
  part1: 31,
  part2: 29,
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

  const heights = input.splitm(
    "\n",
    "",
    (x) => x === x.toUpperCase() ? x === "S" ? 0 : 25 : x.charCodeAt(0) - "a".charCodeAt(0),
  );

  const end = input.splitm("\n", "").flatMap((x, i) => x.map((x, j) => x === "E" ? [i, j] as const : null)).find((
    x,
  ) => x)!;

  return Math.min(
    ...input.splitm("\n", "").flatMap((x, i) => x.map((x, j) => x === "S" || x === "a" ? [i, j] as const : null))
      .filter((x) => x).map((x) => measure(dbg(x!))),
  );

  function measure(start: readonly [number, number]) {
    let reached = new Set<string>();
    const locs = [[start, "." as string, 0 as number] as const];

    let map = input.splitm("\n", "");

    let current;
    while (current = locs.shift()) {
      let [[i, j], s, l] = current;
      if ([i, j] + "" === end + "") return l;
      if (reached.has([i, j] + "")) continue;
      map[i][j] = s;
      reached.add([i, j] + "");
      // console.log(i, j, l);
      let h = heights[i][j];
      if (l !== 0 && h === 0) continue;
      for (let [i2, j2, s2] of [[i + 1, j, "^"], [i - 1, j, "v"], [i, j + 1, "<"], [i, j - 1, ">"]] as const) {
        let h2 = heights[i2]?.[j2];
        if (h2 == undefined) continue;
        if (h2 > h + 1) continue;
        locs.push([[i2, j2], s2, l + 1]);
      }
    }

    console.log(map.map((x) => x.join("")).join("\n"));

    return Infinity;
  }
});
