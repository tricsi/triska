import { TCard } from './../prefabs/cards';
import { COLOR_BLACK, COLOR_GREY, COLOR_WHITE, FONT, ICO } from "../config";
import { abs, createEntity, getChild, getRotate, irnd, isHover, max, min, PI, play, setAlpha, setColor, setFrame, setRotate, setScale, setText, TEntity, timer } from "../modules";
import { TCardConfig } from "../prefabs/cards";

const cardScene: TEntity = createEntity([
    "card", { t: [[33, 128], [0, 86]]}, [
        ["ico", { t: [[7, 7], [33, 32], 2.5], s: ICO, c: COLOR_BLACK }],
        ["txt", { t: [, [33, 66], 0.5], x: [FONT, , 1, 1, 1, 2] }],
        ["no", { t: [, [64, 2], .5], x: [FONT, "no", 2] }],
        ["ok", { t: [, [2, 2], .5], x: [FONT, "ok", 0] }],
        ["bg", { p: [[1, 1, 64, 82]] }],
        ["frame", { p: [[0, 0, 66, 84]], c: COLOR_GREY }]
    ]
])
const cardBg = getChild(cardScene, "bg")
const cardTxt = getChild(cardScene, "txt")
const cardIcon = getChild(cardScene, "ico")
const cardHints = [getChild(cardScene, "no"), getChild(cardScene, "ok")]
const HINT_ALPHA = 0

export const isCardHover = () => isHover(getChild(cardScene, "bg"))

export let cardConfig: TCardConfig

export function initCard() {
    return cardScene
}

export function setCard([icon,  text, config, color = COLOR_WHITE]: TCard) {
    const [r, g, b] = color
    const grey = (r + g + b) / 3
    const bgColor = grey >= .5 ? COLOR_BLACK : COLOR_WHITE
    const txtColor = grey >= .5 ? COLOR_WHITE : COLOR_BLACK
    const cardConfigs = config()
    cardConfig = cardConfigs[irnd(cardConfigs.length - 1)]
    setText(cardTxt, [text, cardConfig[2]].join("\n"))
    setFrame(cardIcon, icon)
    setColor(cardIcon, color)
    setColor(cardBg, bgColor)
    setColor(cardTxt,txtColor)
    cardHints.forEach((hint, i) => {
        setText(hint, cardConfig[i + 3]  as string)
        setColor(hint, txtColor)
        setAlpha(hint, HINT_ALPHA)
    })
}

export function getCardRotete(threshold: number = 0.1): number {
    if (getRotate(cardScene) < -threshold) return 0
    if (getRotate(cardScene) > threshold) return 1
    return -1
}

export async function highlightHint(idx: number) {
    await timer(0.5, t => setScale(cardHints[idx], min(1 - abs(t - 0.5), 0.7)))
}

export function setCardRotate(angle: number) {
    angle = min(max(angle, -1), 1)
    setAlpha(cardHints[0], min(max(-angle * 4 + HINT_ALPHA, 0), 1))
    setAlpha(cardHints[1], min(max(angle * 4 + HINT_ALPHA, 0), 1))
    setRotate(cardScene, angle)
}

export async function hideCard(direction: number) {
    const from = getRotate(cardScene)
    const to = (direction - 0.5) * PI
    play("swipe")
    await timer(0.4, (t) => setRotate(cardScene, t * t * (to - from) + from))
}

export async function showCard() {
    setRotate(cardScene, 0)
    await timer(0.2, (t) => setAlpha(cardScene, t * t))
}
