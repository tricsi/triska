import { add, floor, irnd, max, min, random, round } from "./modules"
import { INFO_CARDS, LOSE_CARDS, PLAY_CARDS, TCard, WIN_CARDS } from "./prefabs/cards"

let cardDeck: TCard[] = [...INFO_CARDS]

export function isGameOver(values: number[]): number {
    for (let i = 0; i < values.length; i++) {
        const value = values[i]
        if (value <= 0 || value >= 10) {
            return i
        }
    }
    return -1
}

export function getResultCard(values: number[]): TCard {
    for (let i = 0; i < values.length; i++) {
        const value = values[i]
        if (value >= 10) return WIN_CARDS[i]
        if (value <= 0) return LOSE_CARDS[i]
    }
    return null
}

export function drawCard(onShuffle?: () => void): TCard {
    if (!cardDeck.length) {
        shuffleDeck()
        onShuffle?.()
    }
    return cardDeck.shift()
}

export function shuffleDeck() {
    cardDeck = [...PLAY_CARDS]
    let idx = cardDeck.length;
    while (idx > 0) {
        let rand = floor(random() * idx--);
        [cardDeck[idx], cardDeck[rand]] = [cardDeck[rand], cardDeck[idx]];
    }
}

function debugLogic() {
    const wins = [0, 0, 0, 0]
    const lose = [0, 0, 0, 0]
    const runs = 100000
    let minRound = Number.MAX_SAFE_INTEGER
    let maxRound = Number.MIN_SAFE_INTEGER
    let sumRound = 0
    for (let i = 0; i < runs; i++) {
        const values = [5, 5, 5, 5]
        let result = -1
        let count = 0
        shuffleDeck()
        do {
            const [, , cardConfig] = drawCard()
            const configs = cardConfig()
            const config = configs[irnd(configs.length - 1)]
            add(values, config[irnd(1)] as number[])
            result = isGameOver(values)
            count++
        } while (result < 0)
        sumRound += count
        minRound = min(count, minRound)
        maxRound = max(count, maxRound)
        values[result] <= 0 ? lose[result]++ : wins[result]++
    }
    console.log("win..:", ...wins.map((value) => round((value / runs) * 100)))
    console.log("lose.:", ...lose.map((value) => round((value / runs) * 100)))
    console.log("round:", minRound, round(sumRound / runs), maxRound)
}

//debugLogic()
