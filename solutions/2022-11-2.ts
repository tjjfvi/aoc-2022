import { aoc, solution, test } from "../host.ts";
import { _, add, allGens, arr, asc, dbg, dsc, groupBy, mult, raceGens, repeatTillConst, toNum } from "./helpers.ts";

aoc(2022, 11, 2);

// prettier-ignore
test`

Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1


`({
  part1: 10605,
  part2: 2713310158,
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

  const monkeys = input.split("\n\n").map((m) => {
    let lines = m.split("\n");
    const items = lines[1].split(": ")[1].split(", ").map((x) => +x);
    const fn: (x: number) => number = new Function("old", "return " + lines[2].split("= ")[1]) as any;
    const test = +lines[3].split("by ")[1];
    const t = +lines[4].split("monkey ")[1];
    const f = +lines[5].split("monkey ")[1];
    return { items, fn, test, t, f, n: 0 };
  });

  const n = monkeys.map((x) => x.test).reduce(mult, 1);

  for (let r = 0; r < 10000; r++) {
    for (let i = 0; i < monkeys.length; i++) {
      const monkey = monkeys[i];
      for (let worry of monkey.items.splice(0, monkey.items.length)) {
        monkey.n++;
        worry = monkey.fn(worry);
        worry %= n;
        // worry = (worry / 3) | 0;
        let to = worry % monkey.test == 0 ? monkey.t : monkey.f;
        monkeys[to].items.push(worry);
      }
    }
  }

  return (monkeys.map((x) => x.n).sort(dsc((x) => x)).slice(0, 2).reduce(mult, 1));

  return 0;
});
