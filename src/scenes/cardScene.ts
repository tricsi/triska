import { COLOR_BLACK, COLOR_GREY, COLOR_WHITE, FONT, ICO } from "../config";
import { createEntity, getChild, PI, setAlpha, setColor, setFrame, setRotate, setText, TEntity, timer } from "../modules";

const cardScene: TEntity = createEntity([
    "card", { t: [[33, 128], [0, 84]]}, [
        ["ico", { t: [[7, 7], [33, 32], 2.5], s: ICO, c: COLOR_BLACK }],
        ["txt", { t: [, [33, 68], 0.5], x: [FONT, , 1, 1, 1, 2], c: COLOR_BLACK }],
        ["bg", { p: [[1, 1, 64, 82]], c: COLOR_WHITE }],
        ["frame", { p: [[0, 0, 66, 84]], c: COLOR_GREY }]
    ]
])

export let cardValues: number[][]

export function initCard() {
    return cardScene
}

export function setCard(icon: number, text: string, values: () => number[][], color: number[] = COLOR_BLACK) {
    const [r, g, b] = color
    const grey = (r + g + b) / 3
    const cardBg = getChild(cardScene, "bg")
    const cardTxt = getChild(cardScene, "txt")
    const cardIcon = getChild(cardScene, "ico")
    setText(cardTxt, text)
    setFrame(cardIcon, icon)
    setColor(cardIcon, color)
    setColor(cardBg, grey >= .5 ? COLOR_BLACK : COLOR_WHITE)
    setColor(cardTxt, grey >= .5 ? COLOR_WHITE : COLOR_BLACK)
    cardValues = values()
}

export async function hideCard(direction: number) {
    const angle = (direction - 0.5) * PI
    await timer(0.4, (t) => setRotate(cardScene, t * t * angle))
}

export async function showCard() {
    setRotate(cardScene, 0)
    await timer(0.2, (t) => setAlpha(cardScene, t * t))
}
