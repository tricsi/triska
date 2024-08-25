import { createSprite } from "./modules"

export const PTC = createSprite("ptc", 3, 3, 1)
export const ICO = createSprite("ico", 14, 14)
export const FONT = createSprite("font", 5, 7)
export const CENTER = [36, 64]
export const COLOR_BLACK = [0, 0, 0, 1]
export const COLOR_WHITE = [1, 1, 1, 1]
export const COLOR_GREY = [0.5, 0.5, 0.5]
export const COLOR_RED = [1, 0, 0]
export const COLOR_GREEN = [0, 1, 0]
export const COLOR_DEBUG = [0, 1, 1, 0.5]

export const CARDS: [number, string, () => number[][], number[]][] = [
    [2, "You have found a\nFour-leaf Clover", () => [[-1,1,0,0],[1,-1,1,0]], COLOR_WHITE],
    [6, "Black Cat", () => [[0,0,0,0],[0,0,0,0]], COLOR_BLACK],
    [6, "White Cat", () => [[0,0,0,0],[0,0,0,0]], COLOR_WHITE],
    [9, "Full Moon", () => [[0,0,0,0],[0,0,0,0]], COLOR_WHITE],
]