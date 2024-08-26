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
    [2,  "a four-leaf clover", () => [[-1,1,0,0],[1,-1,1,0]], COLOR_WHITE],
    [6,  "a black cat", () => [[0,0,0,0],[0,0,0,0]], COLOR_BLACK],
    [7,  "a white rabbit", () => [[0,0,0,0],[0,0,0,0]], COLOR_WHITE],
    [8,  "a toad", () => [[0,0,0,0],[0,0,0,0]], COLOR_WHITE],
    [9,  "the full moon", () => [[0,1,0,-2],[0,1,0,1]], COLOR_WHITE],
    [10, "the ace of spades", () => [[0,0,0,0],[0,0,0,0]], COLOR_BLACK],
    [11, "the king of clubs", () => [[0,0,0,0],[0,0,0,0]], COLOR_BLACK],
    [12, "the quuen of harts", () => [[0,0,0,0],[0,0,0,0]], COLOR_WHITE],
    [13, "the jack of diamonds", () => [[0,0,0,0],[0,0,0,0]], COLOR_WHITE],
    [14, "the salt", () => [[0,0,0,0],[0,0,0,0]], COLOR_WHITE],
    [15, "the horseshoe", () => [[0,0,0,0],[0,0,0,0]], COLOR_BLACK],
    [16, "it is 13th of", () => [[0,0,0,0],[0,0,0,0]], COLOR_BLACK],
    [17, "you got mail", () => [[0,0,0,0],[0,0,0,0]], COLOR_BLACK],
    [18, "during your travel", () => [[0,0,0,0],[0,0,0,0]], COLOR_WHITE],
    [19, "the lucky coin", () => [[0,0,0,0],[0,0,0,0]], COLOR_WHITE],
    [20, "your horoscope", () => [[0,0,0,0],[0,0,0,0]], COLOR_BLACK],
]