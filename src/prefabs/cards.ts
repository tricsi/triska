import { COLOR_BLACK, COLOR_WHITE } from "../config"

export type TCardConfig = [number[], number[], string?, string?, string?]
export type TCard = [number, string, () => TCardConfig, number[]]

export const CARDS: TCard[] = [
    [2, "a four-leaf clover", fourLeafCloverCard, COLOR_WHITE],
    [6, "a black cat", nothingCard, COLOR_BLACK],
    [7, "a white rabbit", nothingCard, COLOR_WHITE],
    [8, "a toad", nothingCard, COLOR_WHITE],
    [9, "the full moon", fullMoonCard, COLOR_WHITE],
    [10, "the ace of spades", nothingCard, COLOR_BLACK],
    [11, "the king of clubs", nothingCard, COLOR_BLACK],
    [12, "the quuen of harts", nothingCard, COLOR_WHITE],
    [13, "the jack of diamonds", nothingCard, COLOR_WHITE],
    [14, "the salt", nothingCard, COLOR_WHITE],
    [15, "the horseshoe", nothingCard, COLOR_BLACK],
    [16, "it is 13th of", nothingCard, COLOR_BLACK],
    [17, "you got mail", nothingCard, COLOR_BLACK],
    [18, "during your travel", nothingCard, COLOR_WHITE],
    [19, "the lucky coin", nothingCard, COLOR_WHITE],
    [20, "your horoscope", nothingCard, COLOR_BLACK]
]

function nothingCard(): TCardConfig {
    return [
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
}

function fullMoonCard(): TCardConfig {
    return [
        [0, 1, 0, -2],
        [0, 1, 0, 1]
    ]
}

function fourLeafCloverCard(): TCardConfig {
    return [
        [-1, 1, 0, 0],
        [1, -1, 1, 0],
        "lay on your desk",
        "leave it",
        "take it"
    ]
}
