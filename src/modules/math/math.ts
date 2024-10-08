export const X = 0
export const Y = 1
export const Z = 2
export const W = 3

export const R = 0
export const G = 1
export const B = 2
export const A = 3

export const { abs, ceil, cos, floor, max, min, pow, random, round, sign, sin, sqrt, PI } = Math

export function each(
    out: number[],
    obj: number[],
    callback: (v: number, i: number) => number,
): number[] {
    obj.forEach((v, i) => i < out.length && (out[i] = callback(v, i)))
    return out
}

export const eq = (obj: number | number[], value: number = 0) =>
    obj instanceof Array ? obj.find((v) => v !== value) === undefined : obj === value

export const copy = (out: number[], obj: number[]) => each(out, obj, (v) => v)

export const set = (out: number[], ...obj: number[]) => copy(out, obj)

export const add = (obj1: number[], obj2: number[], out: number[] = obj1) =>
    each(out, obj2, (v, i) => obj1[i] + v)

export const sub = (obj1: number[], obj2: number[], out: number[] = obj1) =>
    each(out, obj2, (v, i) => obj1[i] - v)

export const div = (obj1: number[], obj2: number[], out: number[] = obj1) =>
    each(out, obj2, (v, i) => obj1[i] / v)

export const multiply = (obj1: number[], obj2: number[], out: number[] = obj1) =>
    each(out, obj2, (v, i) => obj1[i] * v)

export const scale = (obj: number[], value: number, out: number[] = obj) =>
    each(out, obj, (v) => v * value)

export const reverse = (obj: number[], out: number[] = obj) => each(out, obj, (v) => -v)

export const hex = (value: string) =>
    new Float32Array(4).fill(1).map((v, i) => (value.length <= i ? v : parseInt(value[i], 16) / 15))

export const irnd = (max: number, seed: number = 0) => rnd(max, seed, 1)

export function rnd(max: number = 1, seed: number = 0, rounded: number = 0): number {
    if (max <= 0) {
        return max
    }
    const mod = 233280
    rnd.seed = (rnd.seed * 9301 + 49297) % mod
    seed = seed ? rnd.seed * seed % mod : rnd.seed
    let value = (seed / mod) * max
    return rounded ? round(value) : value
}

rnd.seed = random()
