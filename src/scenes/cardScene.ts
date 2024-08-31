import { COLOR_BLACK, COLOR_GREY, COLOR_WHITE, FONT, ICO } from "../config";
import { createEntity, getChild, PI, setAlpha, setColor, setFrame, setRotate, setText, setVisible, TEntity, timer } from "../modules";
import { TCardConfig } from "../prefabs/cards";

const cardScene: TEntity = createEntity([
    "card", { t: [[33, 128], [0, 84]]}, [
        ["ico", { t: [[7, 7], [33, 32], 2.5], s: ICO, c: COLOR_BLACK }],
        ["txt", { t: [, [33, 64], 0.5], x: [FONT, , 1, 1, 1, 2] }],
        ["no", { t: [, [2, 82], .4], x: [FONT, "no", 0, 2] }],
        ["ok", { t: [, [64, 82], .4], x: [FONT, "ok", 2, 2] }],
        ["bg", { p: [[1, 1, 64, 82]] }],
        ["frame", { p: [[0, 0, 66, 84]], c: COLOR_GREY }]
    ]
])
const cardBg = getChild(cardScene, "bg")
const cardTxt = getChild(cardScene, "txt")
const cardIcon = getChild(cardScene, "ico")
const cardHints = [getChild(cardScene, "no"), getChild(cardScene, "ok")]

export let cardConfig: TCardConfig

export function initCard() {
    return cardScene
}

export function setCard(icon: number, text: string, config: () => TCardConfig, color: number[] = COLOR_BLACK) {
    const [r, g, b] = color
    const grey = (r + g + b) / 3
    const bgColor = grey >= .5 ? COLOR_BLACK : COLOR_WHITE
    const txtColor = grey >= .5 ? COLOR_WHITE : COLOR_BLACK
    cardConfig = config()
    setText(cardTxt, `${text}\n${cardConfig[2] || ""}`)
    setFrame(cardIcon, icon)
    setColor(cardIcon, color)
    setColor(cardBg, bgColor)
    setColor(cardTxt,txtColor)
    cardHints.forEach((hint, i) => {
        setText(hint, cardConfig[i + 3]  as string)
        setColor(hint, txtColor)
    })
}

export async function hideCard(direction: number) {
    const angle = (direction - 0.5) * PI
    await timer(0.4, (t) => setRotate(cardScene, t * t * angle))
}

export async function showCard() {
    setRotate(cardScene, 0)
    await timer(0.2, (t) => setAlpha(cardScene, t * t))
}
