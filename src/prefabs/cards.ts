import { COLOR_BLACK } from "../config"
import { irnd, session } from "../modules"

export type TCardConfig = [number[], number[], string?, string?, string?]
export type TCard = [number|number[], string, () => TCardConfig[], number[]?]

const fourLeafClover = (): TCardConfig[] => [
    [[-2, 0, 0, 0], [2, 0, 0, 0], "is at your feet", "leave", "pick"],
    [[-1, 0, 0, 0], [1, 0, 0, 0], "lay on your desk", "leave", "take"]
]

const blackCat = (): TCardConfig[] =>[
    [[-1, 0, 0, -1], [2, 0, 0, 1], "wants to be your\nfriend", "leave", "pet"],
    [[0, -1, 0, 0], [-2, 0, 0, 0], "crosses the road", "turn\nback", "go on"]
]

const whiteRabbit = (): TCardConfig[] =>[
    [[0, 1, 0, 0], [0, -1, 0, 0], "show up", "leave", "follow"],
    [[0, 1, 1, 0], [0, 0, -1, -1], "in the pet shop", "pet", "buy"],
]

const fullMoon = (): TCardConfig[] => [
    [[0, 2, 0, -1], [0, 1, 0, 2], "rising", "observe", "wonder"],
    [[0, 1, 1, 0], [0, -1, -1, 0], "wakes you up", "sleep", "awake"],
    [[0, -1, 0, -1], [0, 0, 0, 2], "rising at noon", "careful", "brave"],
]

const moneyToad = (): TCardConfig[] =>[
    [[0, -1, 0, 1], [1, 0, 1, -1], "sit next to you", "leave", "stay"],
    [[0, 1, 0, 0], [0, -1, 1, 0], "show up", "leave", "follow"],
]

const aceOfSpades = (): TCardConfig[] => [
    [[2, 0, 0, 0], [-2, 0, 0, 0], "is in your hand", "fold", "raise"],
    [[1, 0, 0, 0], [-1, 0, 0, 0], "is on the table", "fold", "call"],
]

const kingOfClubs = (): TCardConfig[] => [
    [[0, -2, 0, 0], [0, 2, 0, 0], "is in your hand", "fold", "raise"],
    [[0, -1, 0, 0], [0, 1, 0, 0], "is on the table", "fold", "call"],
]

const queenOfHearts = (): TCardConfig[] => [
    [[0, 0, 0, -2], [0, 0, 0, 2], "is in your hand", "fold", "raise"],
    [[0, 0, 0, -1], [0, 0, 0, 1], "is on the table", "fold", "call"],
]

const jackOfDiamonds = (): TCardConfig[] => [
    [[0, 0, -2, 0], [0, 0, 2, 0], "is in your hand", "fold", "raise"],
    [[0, 0, -1, 0], [0, 0, 1, 0], "is on the table", "fold", "call"],
]

const theSalt = (): TCardConfig[] => [
    [[0, 1, 0, 1], [0, -1, 0, -1], "spilled out", "clean", "leave"],
]

const horseshoe = (): TCardConfig[] => [
    [[1, 0, 1, 0], [-1, 0, -1, 0], "is in your way", "throw", "keep"],
]

const thirteen = (): TCardConfig[] => [
    [[0, -1, 0, 0], [-1, 0, 0, 0], [
        "january", "februray", "marc", "april", "may", "june", "july", "august", "september", "october", "november", "december"
    ][irnd(11)], "stay in\nbed", "never\nmind"],
]

const youGotMail = (): TCardConfig[] => [
    [[0, 1, 1, 0], [0, 0, -1, 0], "from a noble heir\nwho makes you rich", "spam", "send money"],
    [[0, 1, 1, 0], [0, 0, -2, 0], "from your bank to\nchange password", "keep", "change"],
    [[0, 1, 0, 0], [0, -1, 0, 0], "from your friend\nto forward 100 times", "hoax", "forward"],
]

const travel = (): TCardConfig[] => [
    [[1, 0, 0, -2], [-1, 0, 0, 2], "you sit in the 13th\nrow of the plane", "worry", "relax"],
    [[0, 0, 1, -1], [0, 0, -1, 1], "you got room on\nthe 13th floor", "complain", "accept"],
]

const luckyCoin = (): TCardConfig[] => [
    [[irnd(2), 0, 0, 0], [irnd(2), 0, 0, 0], "give you\nluck", "heads", "tails"],
    [[0, irnd(2), 0, 0], [0, irnd(2), 0, 0], "give you\nwisdom", "heads", "tails"],
    [[0, 0, irnd(2), 0], [0, 0, irnd(2), 0], "give you\nmoney", "heads", "tails"],
    [[0, 0, 0, irnd(2)], [0, 0, 0, irnd(2)], "give you\nlove", "heads", "tails"],
]

const horoscope = (): TCardConfig[] => [
    [[irnd(4) - 2, 1, 0, 0], [irnd(4) - 2, -1, 0, 0], "promise luck\nin life", "forget", "believe"],
    [[0, 1, irnd(4) - 2, 0], [0, -1, irnd(4) - 2, 0], "promise luck\nin business", "forget", "believe"],
    [[0, 1, 0, irnd(4) - 2], [0, -1, 0, irnd(4) - 2], "promise luck\nin love", "forget", "believe"],
]

const fortuneTeller = (): TCardConfig[] => [
    [[0, 1, 0, 1], [-1, -1, 0, 0], "see bad omens", "forget", "believe"],
    [[0, -1, 0, 0], [2, 0, 0, 1], "see luck and fame", "pfff", "yeah"],
]

const tarotCards = (): TCardConfig[] => [
    [[0, -1, 0, 0], [0, 1, 0, 0], "reveal a stranger", "fear", "curious"],
    [[0, -2, 0, 0], [2, 0, 0, 1], "show certain death", "aaargh", "nonsense"],
    [[0, 0, 0, -1], [0, 0, 0, 1], "promise love", "why", "lovely"],
]

const luckyDice = (): TCardConfig[] => [
    [[0, 0, 0, 0], [-2, -2, -2, -2], "roll one", "hmm", "oh no"],
    [[0, 0, 0, 0], [-1, -1, -1, -1], "roll two", "hmm", "shit"],
    [[0, 0, 0, 0], [0, 0, 0, 0], "roll three", "hmm", "ok"],
    [[0, 0, 0, 0], [0, 0, 0, 0], "roll four", "hmm", "ok"],
    [[0, 0, 0, 0], [1, 1, 1, 1], "roll five", "hmm", "great"],
    [[0, 0, 0, 0], [2, 2, 2, 2], "roll six", "hmm", "yeah"],
]

const balanceSign = (): TCardConfig[] => [
    [[0, 1, 0, 0], [0, 1, 0, 0], "calls you", "deny", "agree"],
    [[0, 0, 0, 0], [0, -2, 0, 0], "is in danger", "afk", "act"],
    [[0, 2, 0, 0], [0, 0, 0, 2], "help you", "understand", "feel"],
]
const onDayNumber = (): TCardConfig[] => [
    [[0, 0, 0, 0], [0, 0, 0, 0], "on day " + session("day"), "again", "play"]
]

const tutorial = (end = 0): () => TCardConfig[] => () => [
    [[0, 0, 0, 0], [0, 0, 0, 0], ,end ? "play" : "help", "play"],
]

export const INFO_CARDS: TCard[] = [
    [19, "swipe\nleft or right", tutorial()],
    [[0, 1, 2, 3], "balance the\naspects of life\n\nluck, mind, money\nand love", tutorial()],
    [23, "avoid light\nand darkness", tutorial(), COLOR_BLACK],
    [14, "survive all\ngood and bad days", tutorial()],
    [0, "good luck!", tutorial(1), COLOR_BLACK],
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
    [18, "your horoscope", horoscope, COLOR_BLACK],
    [20, "the fortune teller", fortuneTeller],
    [21, "the tarot cards", tarotCards],
    [22, "your lucky dice", luckyDice],
    [23, "the balance", balanceSign]
]

export const LOSE_CARDS: TCard[] = [
    [0, "you feel cursed", onDayNumber],
    [1, "lost your mind", onDayNumber],
    [2, "all money gone", onDayNumber],
    [3, "you broke up", onDayNumber]
]

export const WIN_CARDS: TCard[] = [
    [0, "won the lottery", onDayNumber, COLOR_BLACK],
    [1, "got rid of\ntriskaidekaphobia", onDayNumber, COLOR_BLACK],
    [2, "retired", onDayNumber, COLOR_BLACK],
    [3, "got married", onDayNumber, COLOR_BLACK]
]
