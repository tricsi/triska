import { COLOR_BLACK, COLOR_WHITE } from "../config"
import { irnd } from "../modules"

export type TCardConfig = [number[], number[], string?, string?, string?]
export type TCard = [number, string, () => TCardConfig, number[]?, number?]

const fourLeafClover = (): TCardConfig => [
    [[-1, 1, 0, 0], [1, -1, 1, 0], "is at your shoe", "leave", "take"],
    [[-1, 1, 0, 0], [1, -1, 0, 0], "lay on your desk", "leave", "take"]
][irnd(1)] as TCardConfig

const blackCat = (): TCardConfig =>[
    [[0, 0, 0, -1], [1, 0, 0, 1], "wants to be your\nfriend", "leave", "pet"],
    [[0, -1, 0, 0], [-1, 0, 0, 0], "crosses the road", "turn back", "go on"]
][irnd(1)] as TCardConfig

const whiteRabbit = (): TCardConfig =>[
    [[0, 1, 0, 0], [0, -1, 0, 0], "show up", "leave", "follow"],
    [[0, 1, 1, 0], [0, 0, -1, -1], "in the pet shop", "watch", "buy"],
][irnd(1)] as TCardConfig

const fullMoon = (): TCardConfig => [
    [[0, 1, 0, -1], [0, 1, 0, 1], "rising", "observe", "wonder"],
    [[0, 0, 1, 0], [0, -1, -1, 0], "wakes you up", "sleep", "stay awake"],
    [[1, 1, 0, 0], [0, -1, 1, 0], "rising at noon", "be brave", "be careful"],
][irnd(2)] as TCardConfig

const moneyToad = (): TCardConfig =>[
    [[0, -1, 0, 1], [1, 1, 0, -1], "sit next to you", "leave", "stay"],
    [[0, 1, 0, 0], [0, -1, 1, 0], "show up", "leave", "follow"],
][irnd(1)] as TCardConfig

const aceOfSpades = (): TCardConfig => [
    [[1, 0, 0, 0], [-1, 0, 0, 0], "is in your hand", "fold", "raise"],
    [[-1, 0, 0, 0], [1, 0, 0, 0], "is on the desk", "call", "raise"],
][0] as TCardConfig

const kingOfClubs = (): TCardConfig => [
    [[0, 0, -1, 0], [0, 0, 1, 0], "is in your hand", "fold", "raise"],
    [[0, 0, 1, 0], [0, 0, -1, 0], "is on the desk", "call", "raise"],
][0] as TCardConfig

const queenOfHearts = (): TCardConfig => [
    [[0, 0, 0, -1], [0, 0, 0, 1], "is in your hand", "fold", "raise"],
    [[0, 0, 0, 1], [0, 0, 0, -1], "is on the desk", "call", "raise"],
][0] as TCardConfig

const jackOfDiamonds = (): TCardConfig => [
    [[0, -1, 0, 0], [0, 1, 0, 0], "is in your hand", "fold", "raise"],
    [[0, 1, 0, 0], [0, -1, 0, 0], "is on the desk", "call", "raise"],
][0] as TCardConfig

const nothing = (): TCardConfig => [
    [[0, 0, 0, 0], [0, 0, 0, 0]]
][0] as TCardConfig

export const PLAY_CARDS: TCard[] = [
    [2, "a four-leaf clover", fourLeafClover, , 2],
    [6, "a black cat", blackCat, COLOR_BLACK, 2],
    [7, "a white rabbit", whiteRabbit],
    [8, "a toad", moneyToad, COLOR_WHITE],
    [9, "the full moon", fullMoon, , 2],
    [10, "the ace of spades", aceOfSpades, COLOR_BLACK],
    [11, "the king of clubs", kingOfClubs, COLOR_BLACK],
    [12, "the queen of harts", queenOfHearts],
    [13, "the jack of diamonds", jackOfDiamonds],
    // [14, "the salt", nothing],
    // [15, "the horseshoe", nothing, COLOR_BLACK],
    // [16, "it is 13th of", nothing, COLOR_BLACK],
    // [17, "you got mail", nothing, COLOR_BLACK],
    // [18, "during your travel", nothing],
    // [19, "the lucky coin", nothing],
    // [20, "your horoscope", nothing, COLOR_BLACK]
]

export const LOSE_CARDS: TCard[] = [
    [2, "you are cursed", nothing, COLOR_BLACK],
    [3, "lost your mind", nothing, COLOR_BLACK],
    [4, "money goes", nothing, COLOR_BLACK],
    [5, "bye my love", nothing, COLOR_BLACK]
]

export const WIN_CARDS: TCard[] = [
    [2, "lucky bastard", nothing],
    [3, "too real", nothing],
    [4, "richie rich", nothing],
    [5, "white wedding", nothing]
]
