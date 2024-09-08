import { TCard } from './../prefabs/cards';
import { COLOR_BLACK, COLOR_GREY, COLOR_LIGHT, COLOR_WHITE, FONT, ICO } from "../config";
import { createEntity, getChild, getRotate, irnd, isHover, max, min, PI, play, playAnim, setAlpha, setColor, setFrame, setRotate, setScale, setText, setTracks, stopAnim, TEntity, timer } from "../modules";
import { TCardConfig } from "../prefabs/cards";

const HINT_ALPHA = 0
const HINT_SCALE = 0.5

const cardScene: TEntity = createEntity([
    "card", { t: [[33, 128], [0, 86]]}, [
        ["ico", { t: [[7, 7], [33, 32], 2.5], s: ICO, a: [[0]], c: COLOR_BLACK }],
        ["txt", { t: [, [33, 68], 0.5], x: [FONT, , 1, 1, 1, 2] }],
        ["no", { t: [, [64, 2], HINT_SCALE], x: [FONT, "no", 2] }],
        ["ok", { t: [, [2, 2], HINT_SCALE], x: [FONT, "ok", 0] }],
        ["bg", { p: [[1, 1, 64, 82]] }],
        ["frame", { p: [[0, 0, 66, 84]], c: COLOR_GREY }]
    ]
])
const cardBg = getChild(cardScene, "bg")
const cardTxt = getChild(cardScene, "txt")
const cardIcon = getChild(cardScene, "ico")
const cardHints = [getChild(cardScene, "no"), getChild(cardScene, "ok")]

export const isCardHover = () => isHover(getChild(cardScene, "bg"))

export let cardConfig: TCardConfig

export function initCard() {
    return cardScene
}

export function setCard([icons,  text, config, color = COLOR_LIGHT]: TCard) {
    const [r, g, b] = color
    const grey = (r + g + b) / 3
    const bgColor = grey >= .5 ? COLOR_BLACK : COLOR_LIGHT
    const txtColor = grey >= .5 ? COLOR_LIGHT : COLOR_BLACK
    const cardConfigs = config()
    const isAnimate = typeof icons !== "number"
    cardConfig = cardConfigs[irnd(cardConfigs.length - 1)]
    setText(cardTxt, [text, cardConfig[2]].join("\n"))
    setTracks(cardIcon,  isAnimate ? [...icons] : [icons])
    isAnimate ? playAnim(cardIcon, [0, 0, 1]) : stopAnim(cardIcon)
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

export function setCardRotate(angle: number) {
    let cardAngle = min(max(angle, -1), 1),
        yesAlpha = min(max(angle * 4 + HINT_ALPHA, 0), 1),
        noAlpha = min(max(-cardAngle * 4 + HINT_ALPHA, 0), 1)
    setAlpha(cardHints[0], noAlpha)
    setAlpha(cardHints[1], yesAlpha)
    setScale(cardHints[0], min(max(noAlpha, HINT_SCALE), 0.8))
    setScale(cardHints[1], min(max(yesAlpha, HINT_SCALE), 0.8))
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
    setScale(cardHints[0], HINT_SCALE)
    setScale(cardHints[1], HINT_SCALE)
    await timer(0.2, (t) => setAlpha(cardScene, t * t))
}
