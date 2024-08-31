import { COLOR_BLACK, COLOR_WHITE } from "../config"
import { irnd } from "../modules"

export type TCardConfig = [number[], number[], string?, string?, string?]
export type TCard = [number, string, () => TCardConfig[], number[]?]

const fourLeafClover = (): TCardConfig[] => [
    [[-2, 0, 0, 0], [2, 0, 0, 0], "is at your shoe", "leave", "take"],
    [[-1, 0, 0, 0], [1, 0, 0, 0], "lay on your desk", "leave", "take"]
]

const blackCat = (): TCardConfig[] =>[
    [[-1, 0, 0, -1], [1, 0, 0, 1], "wants to be your\nfriend", "leave", "pet"],
    [[0, -1, 0, 0], [-1, 0, 0, 0], "crosses the road", "turn back", "go on"]
]

const whiteRabbit = (): TCardConfig[] =>[
    [[0, 1, 0, 0], [0, -1, 0, 0], "show up", "leave", "follow"],
    [[0, 1, 1, 0], [0, 0, -1, -1], "in the pet shop", "pet", "buy"],
]

const fullMoon = (): TCardConfig[] => [
    [[0, 1, 0, -1], [0, 1, 0, 1], "rising", "observe", "wonder"],
    [[0, 0, 1, 0], [0, -1, -1, 0], "wakes you up", "sleep", "stay awake"],
    [[0, -1, 1, 0], [1, 1, 0, 0], "rising at noon", "be careful", "be brave"],
]

const moneyToad = (): TCardConfig[] =>[
    [[0, -1, 0, 1], [1, 1, 0, -1], "sit next to you", "leave", "stay"],
    [[0, 1, 0, 0], [0, -1, 1, 0], "show up", "leave", "follow"],
]

const aceOfSpades = (): TCardConfig[] => [
    [[1, 0, 0, 0], [-1, 0, 0, 0], "is in your hand", "fold", "raise"],
    [[-1, 0, 0, 0], [1, 0, 0, 0], "is on the table", "call", "raise"],
]

const kingOfClubs = (): TCardConfig[] => [
    [[0, 0, -1, 0], [0, 0, 1, 0], "is in your hand", "fold", "raise"],
    [[0, 0, 1, 0], [0, 0, -1, 0], "is on the table", "call", "raise"],
]

const queenOfHearts = (): TCardConfig[] => [
    [[0, 0, 0, -1], [0, 0, 0, 1], "is in your hand", "fold", "raise"],
    [[0, 0, 0, 1], [0, 0, 0, -1], "is on the table", "call", "raise"],
]

const jackOfDiamonds = (): TCardConfig[] => [
    [[0, -1, 0, 0], [0, 1, 0, 0], "is in your hand", "fold", "raise"],
    [[0, 1, 0, 0], [0, -1, 0, 0], "is on the table", "call", "raise"],
]

const theSalt = (): TCardConfig[] => [
    [[0, 1, 0, 1], [0, -1, 0, -1], "spill out", "clean", "geather"],
]

const horseshoe = (): TCardConfig[] => [
    [[1, 0, 0, 0], [-1, 0, 0, 0], "is in your way", "throw", "keep"],
]

const thirteen = (): TCardConfig[] => [
    [[0, -1, 0, 0], [-1, 0, 0, 0], [
        "january", "februray", "marc", "april", "may", "june", "july", "august", "september", "october", "november", "december"
    ][irnd(11)], "stay in bed", "never mind"],
]

const youGotMail = (): TCardConfig[] => [
    [[0, 0, 1, 0], [0, 0, -1, 0], "from a nigerian noble\nwho makes you rich", "trash", "send money"],
    [[0, 0, 2, 0], [0, 0, -2, 0], "from your bank to\nchange password", "keep", "change"],
    [[0, 1, 0, 0], [0, -1, 0, 0], "from your friend\nto wish you luck", "reply", "forward"],
]

const travel = (): TCardConfig[] => [
    [[0, -1, 0, 0], [0, 1, 0, 0], "you sit in the 13th\nrow of the plane", "worry", "relax"],
    [[1, -1, 0, 0], [0, 1, -1, 0], "you got room on\nthe 13th floor", "complain", "accept"],
]

const luckyCoin = (): TCardConfig[] => [
    [[0, 0, irnd(4) - 3, 0], [0, 0, irnd(4) - 3, 0], "give you a fortune", "heads", "tails"],
]

const horoscope = (): TCardConfig[] => [
    [[0, 0, irnd(2) - 1, 0], [0, -1, irnd(2) - 1, 0], "promise luck\nin business", "forget", "believe"],
    [[0, 0, 0, irnd(2) - 1], [0, -1, 0, irnd(2) - 1], "promise luck\nin love", "forget", "believe"],
]

const nothing = (): TCardConfig[] => [
    [[0, 0, 0, 0], [0, 0, 0, 0]],
]

export const PLAY_CARDS: TCard[] = [
    [2, "a four-leaf clover", fourLeafClover],
    [6, "a black cat", blackCat, COLOR_BLACK],
    [7, "a white rabbit", whiteRabbit],
    [8, "a toad", moneyToad],
    [9, "the full moon", fullMoon],
    [10, "the ace of spades", aceOfSpades, COLOR_BLACK],
    [11, "the king of clubs", kingOfClubs, COLOR_BLACK],
    [12, "the queen of harts", queenOfHearts],
    [13, "the jack of diamonds", jackOfDiamonds],
    [14, "the salt", theSalt],
    [15, "a horseshoe", horseshoe, COLOR_BLACK],
    [16, "it is 13th of", thirteen, COLOR_BLACK],
    [17, "you got mail", youGotMail, COLOR_BLACK],
    [18, "during your travel", travel],
    [19, "the lucky coin", luckyCoin],
    [20, "your horoscope", horoscope, COLOR_BLACK]
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
