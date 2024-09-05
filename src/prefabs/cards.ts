import { COLOR_BLACK } from "../config"
import { irnd } from "../modules"

export type TCardConfig = [number[], number[], string?, string?, string?]
export type TCard = [number, string, () => TCardConfig[], number[]?]

const fourLeafClover = (): TCardConfig[] => [
    [[-2, 0, 0, 0], [2, 0, 0, 0], "is at your feet", "leave", "pick"],
    [[-1, 0, 0, 0], [1, 0, 0, 0], "lay on your desk", "leave", "take"]
]

const blackCat = (): TCardConfig[] =>[
    [[-1, 0, 0, -1], [2, 0, 0, 1], "wants to be your\nfriend", "leave", "pet"],
    [[0, -1, 0, 0], [-2, 0, 0, 0], "crosses the road", "turn back", "go on"]
]

const whiteRabbit = (): TCardConfig[] =>[
    [[0, 1, 0, 0], [0, -1, 0, 0], "show up", "leave", "follow"],
    [[0, 1, 1, 0], [0, 0, -1, -1], "in the pet shop", "pet", "buy"],
]

const fullMoon = (): TCardConfig[] => [
    [[0, 2, 0, -1], [0, 1, 0, 2], "rising", "observe", "wonder"],
    [[0, 0, 1, 0], [0, -1, -1, 0], "wakes you up", "sleep", "stay awake"],
    [[0, -1, 0, -1], [0, 0, 0, 2], "rising at noon", "be careful", "be brave"],
]

const moneyToad = (): TCardConfig[] =>[
    [[0, -1, 0, 1], [1, 0, 1, -1], "sit next to you", "leave", "stay"],
    [[0, 1, 0, 0], [0, -1, 1, 0], "show up", "leave", "follow"],
]

const aceOfSpades = (): TCardConfig[] => [
    [[2, 0, 0, 0], [-2, 0, 0, 0], "is in your hand", "fold", "raise"],
    [[-1, 0, 0, 0], [1, 0, 0, 0], "is on the table", "call", "raise"],
]

const kingOfClubs = (): TCardConfig[] => [
    [[0, -2, 0, 0], [0, 2, 0, 0], "is in your hand", "fold", "raise"],
    [[0, 1, 0, 0], [0, -1, 0, 0], "is on the table", "call", "raise"],
]

const queenOfHearts = (): TCardConfig[] => [
    [[0, 0, 0, -2], [0, 0, 0, 2], "is in your hand", "fold", "raise"],
    [[0, 0, 0, 1], [0, 0, 0, -1], "is on the table", "fold", "call"],
]

const jackOfDiamonds = (): TCardConfig[] => [
    [[0, 0, -2, 0], [0, 0, 2, 0], "is in your hand", "fold", "raise"],
    [[0, 0, 1, 0], [0, 0, -1, 0], "is on the table", "fold", "call"],
]

const theSalt = (): TCardConfig[] => [
    [[0, 1, 0, 1], [0, -1, 0, -1], "spill out", "clean", "geather"],
]

const horseshoe = (): TCardConfig[] => [
    [[1, 0, 1, 0], [-1, 0, -1, 0], "is in your way", "throw", "keep"],
]

const thirteen = (): TCardConfig[] => [
    [[0, -1, 0, 0], [-1, 0, 0, 0], [
        "january", "februray", "marc", "april", "may", "june", "july", "august", "september", "october", "november", "december"
    ][irnd(11)], "stay in bed", "never mind"],
]

const youGotMail = (): TCardConfig[] => [
    [[0, 2, 1, 0], [0, 0, -1, 0], "from a nigerian noble\nwho makes you rich", "trash", "send money"],
    [[0, 2, 2, 0], [0, 0, -2, 0], "from your bank to\nchange password", "keep", "change"],
    [[0, 2, 0, 0], [0, -1, 0, 0], "from your friend\nto wish you luck", "reply", "forward"],
]

const travel = (): TCardConfig[] => [
    [[1, 0, 0, -2], [-1, 0, 0, 2], "you sit in the 13th\nrow of the plane", "worry", "relax"],
    [[0, 0, 1, -1], [0, 0, -1, 1], "you got room on\nthe 13th floor", "complain", "accept"],
]

const luckyCoin = (): TCardConfig[] => [
    [[0, 0, irnd(4) - 3, 0], [0, 0, irnd(4) - 3, 0], "give you a fortune", "heads", "tails"],
]

const horoscope = (): TCardConfig[] => [
    [[0, 0, irnd(4) - 2, 0], [0, 0, irnd(4) - 2, 0], "promise luck\nin business", "forget", "believe"],
    [[0, 0, 0, irnd(4) - 2], [0, 0, 0, irnd(4) - 2], "promise luck\nin love", "forget", "believe"],
]

const tutorial = (): TCardConfig[] => [
    [[0, 0, 0, 0], [0, 0, 0, 0], , "help", "play"],
]

const nothing = (): TCardConfig[] => [
    [[0, 0, 0, 0], [0, 0, 0, 0]],
]

export const INFO_CARDS: TCard[] = [
    [19, "swipe\n\nleft or right", tutorial],
]

export const PLAY_CARDS: TCard[] = [
    [0, "a four-leaf clover", fourLeafClover],
    [4, "a black cat", blackCat, COLOR_BLACK],
    [5, "a white rabbit", whiteRabbit],
    [6, "a toad", moneyToad],
    [7, "the full moon", fullMoon],
    [8, "the ace of spades", aceOfSpades, COLOR_BLACK],
    [9, "the king of clubs", kingOfClubs, COLOR_BLACK],
    [10, "the queen of harts", queenOfHearts],
    [11, "the jack of diamonds", jackOfDiamonds],
    [12, "the salt", theSalt],
    [13, "a horseshoe", horseshoe, COLOR_BLACK],
    [14, "it is 13th of", thirteen, COLOR_BLACK],
    [15, "you got mail", youGotMail, COLOR_BLACK],
    [16, "during your travel", travel],
    [17, "the lucky coin", luckyCoin],
    [18, "your horoscope", horoscope, COLOR_BLACK]
]

export const LOSE_CARDS: TCard[] = [
    [0, "you are cursed", nothing],
    [1, "lost your mind", nothing],
    [2, "money goes", nothing],
    [3, "bye my love", nothing]
]

export const WIN_CARDS: TCard[] = [
    [0, "lucky bastard", nothing, COLOR_BLACK],
    [1, "too real\nto be good", nothing, COLOR_BLACK],
    [2, "richie rich\nis in your debt", nothing, COLOR_BLACK],
    [3, "white wedding", nothing, COLOR_BLACK]
]
