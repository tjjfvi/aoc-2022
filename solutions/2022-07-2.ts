import { aoc, solution, test } from "../host.ts";
import { _, add, allGens, arr, asc, dbg, dsc, groupBy, mult, raceGens, repeatTillConst, toNum } from "./helpers.ts";

aoc(2022, 7, 2);

// prettier-ignore
test`

$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k

`({
  part1: 95437,
  part2: 24933642,
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

  type Path = string[];
  let path: Path = [];
  let dirs: Path[] = [[]];
  let files: [Path, number][] = [];

  for (const [cmd, ...result] of input.splitm("$ ", "\n", " ")) {
    if (!cmd[0]) continue;
    if (cmd[0] === "cd") {
      if (cmd[1] === "/") path = [];
      else if (cmd[1] === "..") path = path.slice(0, -1);
      else path = [...path, cmd[1]];
      continue;
    }
    for (const [size, name] of result) {
      if (size === "") continue;
      if (size === "dir") {
        dirs.push([...path, name]);
        continue;
      }
      files.push([[...path, name], +size]);
    }
  }

  const total = 70000000;
  const goalUnused = 30000000;

  const used = files.map((x) => x[1]).reduce(add, 0);

  const goalDelete = goalUnused - (total - used);

  dbg(dirs);
  return dirs.map((path) => files.filter(([p2]) => path.every((x, i) => p2[i] === x)).map((x) => x[1]).reduce(add, 0))
    .sort(asc((x) => x)).filter((x) => x >= goalDelete)[0];

  return 0;
});
