export function arr(length: number): number[];
export function arr<T>(length: number, fn: (index: number) => T): T[];
export function arr(
  length: number,
  fn: (index: number) => unknown = (i) => i,
): unknown[] {
  return [...Array(length)].map((_, i) => fn(i));
}

export function asc<T>(map: (x: T) => number): (x: T, y: T) => number {
  return (a, b) => map(a) - map(b);
}

export function dsc<T>(map: (x: T) => number): (x: T, y: T) => number {
  return (a, b) => map(b) - map(a);
}

export function groupBy<T, G>(
  arr: T[],
  group: (val: T, index: number, arr: T[]) => G,
) {
  let map = new Map<G, T[]>();
  for (const [i, val] of arr.entries()) {
    let g = group(val, i, arr);
    let grp = map.get(g) ?? [];
    map.set(g, grp);
    grp.push(val);
  }
  return [...map.entries()];
}

export function add(a: number, b: number) {
  return a + b;
}

export function mult(a: number, b: number) {
  return a * b;
}

export function raceGens<T>(gens: Generator<void, T, undefined>[]) {
  for (let i = 0; true; i++, i %= gens.length) {
    const result = gens[i].next();
    if (result.done) return result.value;
  }
}

export function allGens<T>(gens: Generator<void, T, undefined>[]) {
  const values = Array(gens.length);
  let completed = 0;
  for (let i = 0; completed < gens.length; i++, i %= gens.length) {
    const gen = gens[i];
    if (!gen) continue;
    const result = gen.next();
    if (!result.done) continue;
    values[i] = result.value;
    completed++;
    delete gens[i];
    i--;
  }
  return values;
}

export const repeatTillConst = <T>(x: T, f: (x: T) => T): T => {
  let last = x;
  let cur = f(x);
  while (cur !== last) {
    last = cur;
    cur = f(cur);
  }
  return cur;
};

let dbgMode = true;

const _dbg = <T>(x: T, ...y: unknown[]): T => {
  if (dbgMode) console.log(x, ...y);
  return x;
};

_dbg.x = <T>(x: T, ..._: unknown[]) => x;

Object.defineProperties(_dbg, {
  true: {
    get: () => {
      dbgMode = true;
    },
  },
  false: {
    get: () => {
      dbgMode = false;
    },
  },
});

export const dbg = _dbg as typeof _dbg & Record<"true" | "false", undefined>;

Object.prototype._ = function (fn) {
  return fn(this);
};

declare global {
  interface Object {
    _<T, U>(this: T, fn: (val: T) => U): U;
  }
}

export function _<T>(x: () => T): T {
  return x();
}

export function toNum(x: string): number {
  return +x;
}

type SplitM<T extends unknown[], U = string> = T extends [unknown, ...infer T]
  ? SplitM<T, U>[]
  : T extends [] ? U
  : U | SplitM<T, U>[];

type UnsplitM<T extends unknown[], U extends SplitM<T, unknown>> = T extends [
  unknown,
  ...infer T,
] ? SplitM<T, U extends (infer X)[] ? X : unknown>
  : T extends [] ? U
  : unknown;

declare global {
  interface String {
    splitm<T extends (string | RegExp)[] | []>(...splits: T): SplitM<T>;
    splitm<T extends (string | RegExp)[] | [], U>(
      ...splits: [...splits: T, fn: (value: string) => U]
    ): SplitM<T, U>;
  }
  interface Array<T> {
    joinm<T extends (string | RegExp)[] | []>(
      this: SplitM<T, string | number>,
      ...joins: T
    ): string[];
    joinm<T extends string[] | [], U extends SplitM<T, unknown>>(
      this: U,
      fn: (value: UnsplitM<T, U>) => string,
      ...joins: T
    ): string[];
  }
}

String.prototype.splitm = function (this: any, ...args: any[]) {
  if (args.length === 0) return this;
  if (args.length === 1 && typeof args[0] === "function") return args[0](this);
  return this.split(args[0]).map((x: any) => x.splitm(...args.slice(1)));
};

Array.prototype.joinm = function (this: any, ...args: any[]) {
  if (args.length === 0) return this;
  if (args.length === 1 && typeof args[0] === "function") return args[0](this);
  return this.map((x: any) => x.joinm(...args.slice(0, -1))).join(
    args[args.length - 1],
  );
};

declare global {
  interface Array<T> {
    last(): T;
    lastw(): { v: T };
    ind(n: number): T;
    indw(n: number): { v: T };
  }
}

Array.prototype.last = function () {
  return this.ind(-1);
};

Array.prototype.lastw = function () {
  return this.indw(-1);
};

Array.prototype.ind = function (n) {
  n = ((n % this.length) + this.length) % this.length;
  return this[n];
};

Array.prototype.indw = function (n) {
  n = ((n % this.length) + this.length) % this.length;
  let arr = this;
  return {
    get v() {
      return arr[n];
    },
    set v(val) {
      arr[n] = val;
    },
  };
};

declare global {
  interface String {
    parseInt(base?: number): number;
    toNum(): number;
  }
}

String.prototype.parseInt = function (this: string, base = 10) {
  return parseInt(this, base);
};

String.prototype.toNum = function (this: string) {
  return +this;
};

declare global {
  interface Array<T> {
    /** @deprecated */
    unshift(): number;
  }
}
