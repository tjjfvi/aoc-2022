import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
const env = config();

import clipboard from "https://deno.land/x/clipboard@v0.0.2/mod.ts";

let year: number;
let day: number;
let part: 1 | 2;
let puzzleDrop: Promise<void> = Promise.reject();
puzzleDrop.catch(() => {});
let input: Promise<string>;
let solutionFn: (input: string) => Promise<Answer>;
const tests: [string, Answer?, Answer?][] = [];

type Answer = number | string;

export function aoc(_year: number, _day: number, _part: 1 | 2) {
  if (year) throw new Error("aoc already called");
  year = _year;
  day = _day;
  part = _part;
  const puzzleDropTime = Date.UTC(year, 11, day, 5, 0, 1, 0);
  if (Date.now() > puzzleDropTime) {
    puzzleDrop = Promise.resolve();
  } else {
    puzzleDrop = new Promise((r) => setTimeout(r, puzzleDropTime - Date.now()));
  }
  input = getPuzzleInput();
}

async function getPuzzleInput() {
  if (input) return await input;
  try {
    const input = await Deno.readTextFile(`data/${year}/${day}/input`);
    if (input.trim()) return input;
  } catch { /**/ }
  await Deno.mkdir(`data/${year}/${day}`, { recursive: true });
  await puzzleDrop;
  const inputStr = (
    await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
      headers: {
        COOKIE: `session=${env.TOKEN}`,
      },
    }).then((r) => r.text())
  ).trim();
  await Deno.writeTextFile(`data/${year}/${day}/input`, inputStr);
  return inputStr;
}

export function test(inputArr: TemplateStringsArray) {
  return ({ part1, part2 }: { part1?: Answer; part2?: Answer }) => {
    const inputStr = inputArr.join("").trim();
    if (!inputStr) return;
    tests.push([inputStr, part1, part2]);
  };
}

export function solution(cb: typeof solutionFn) {
  solutionFn = cb;
}

function clear() {
  Deno.stdout.writeSync(new TextEncoder().encode("\u001b[3J\u001b[1J"));
  console.clear();
}

setTimeout(async () => {
  if (!year || !day) throw new Error("aoc not called");
  if (!solution) throw new Error("solution not called");
  await puzzleDrop;
  let testN = 0;
  for (const [i, test] of tests.entries()) {
    if (test[part] === undefined) continue;
    testN++;
    clear();
    console.log(` --- Test ${i} ---\n`);
    let output;
    try {
      output = await solutionFn(test[0]);
    } catch (e) {
      console.error(e);
      return;
    }
    if (output !== test[part]) {
      console.error(
        `\nTest ${i} failed:\n  Expected: ${test[part]}\n  Got: ${output}`,
      );
      return;
    }
  }
  clear();
  console.log(` --- Real Input ---\n`);
  let output;
  try {
    output = await solutionFn(await input);
  } catch (e) {
    console.error(e);
    return;
  }
  console.log(
    `\n${testN} test(s) passed (${tests.length - testN} skipped).\nOutput: ${output}`,
  );
  clipboard.writeText(output.toString());
}, 0);

clear();
