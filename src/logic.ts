import { COLOR_WHITE } from "./config";
import { add, floor, max, min, random, round } from "./modules";
import { PLAY_CARDS, TCard } from "./prefabs/cards";

let cardDeck: TCard[] = []

export function isGameOver(values: number[]): number {
    for (let i = 0; i < values.length; i++) {
        const value = values[i];
        if (value <= 0 || value >= 10) {
            return i
        }
    }
    return -1
}

export function drawCard(): TCard {
    if (!cardDeck.length) shuffleDeck()
    const index = floor(random() * cardDeck.length)
    const card = cardDeck.splice(index, 1)[0]
    return card
}

function shuffleDeck() {
    for (let i = 0; i < PLAY_CARDS.length; i++) {
        const [ico, name, config, color = COLOR_WHITE, count = 1] = PLAY_CARDS[i]
        for (let j = 0; j < count; j++) {
            cardDeck.push([ico, name, config, color, count])
        }
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
        const [, , cardConfig] = drawCard()
        let result = -1
        let count = 0
        do {
            add(values, cardConfig()[round(random())] as number[])
            result = isGameOver(values)
            count++
        } while (result < 0)
        sumRound += count
        minRound = min(count, minRound)
        maxRound = max(count, maxRound)
        values[result] <= 0 ? lose[result]++ : wins[result]++
    }
    console.log("win..:", ...wins.map(value => round(value / runs * 100)))
    console.log("lose.:", ...lose.map(value => round(value / runs * 100)))
    console.log("round:", minRound, round(sumRound/runs) , maxRound)
}

debugLogic()