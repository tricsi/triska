import { COLOR_BLACK, COLOR_GREY, COLOR_WHITE, FONT, ICO } from "../config";
import { createEntity, getChild, PI, setAlpha, setColor, setFrame, setRotate, setText, TEntity, TEntityProps, timer } from "../modules";

const cardPrefab: TEntityProps = ["card", { t: [[33, 128], [0, 84]]}, [
    ["ico", { t: [[7, 7], [32, 32], 3], s: ICO, c: COLOR_BLACK }],
    ["txt", { t: [, [32, 68], 0.5], x: [FONT, , 1, 1], c: COLOR_BLACK }],
    ["bg", { p: [[1, 1, 64, 82]], c: COLOR_WHITE }],
    ["frame", { p: [[0, 0, 66, 84]], c: COLOR_GREY }]
]]

let cardScene: TEntity
export let cardValues: number[][]

export function initCard() {
    cardScene = createEntity(cardPrefab)
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
    setColor(cardBg, grey > .5 ? COLOR_BLACK : COLOR_WHITE)
    setColor(cardTxt, grey > .5 ? COLOR_WHITE : COLOR_BLACK)
    cardValues = values()
}

export async function animateCard(direction: number) {
    const angle = (direction - 0.5) * PI
    await timer(0.4, (t) => setRotate(cardScene, t * t * angle))
    setRotate(cardScene, 0)
    await timer(0.2, (t) => setAlpha(cardScene, t * t))
}
