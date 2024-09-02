import { TEntity, addChild, createEntity, on, X } from "../modules"
import { COLOR_BLACK } from "../config"
import { foreshadowValues, initHud, addHudValues, setHudValues, getHudValues } from "./hudScene"
import {
    hideCard,
    cardConfig,
    initCard,
    setCard,
    showCard,
    setCardRotate,
    getCardRotete
} from "./cardScene"
import { drawCard, getResultCard } from "../logic"
import POINTER from "../modules/input/pointer"

const gameScene: TEntity = createEntity([
    "game",
    ,
    [
        ["bg", { p: [[-36, -64, 72, 128]], c: COLOR_BLACK }]
    ]
])

let isAnimate: boolean
let isDown: number = 0
let startX: number = 0

export function initGame() {
    on("up", onUp)
    on("down", onDown)
    on("pointer", onPointer)
    addChild(gameScene, initHud(), 0)
    addChild(gameScene, initCard(), 1)
    setCard(drawCard())
    return gameScene
}

function onDown() {
    if (isAnimate) return
    isDown = 1
    startX = POINTER[X]
    onPointer()
}

function onPointer() {
    if (isDown) {
        const rotate = (POINTER[X] - startX) / 300
        setCardRotate(rotate)
    }
    const rotate: number = getCardRotete()
    if (rotate < 0) {
        setHudValues()
        return
    }
    foreshadowValues(...(cardConfig[rotate] as number[]))
}

async function onUp() {
    isDown = 0
    const rotate: number = getCardRotete()
    if (rotate < 0) {
        setCardRotate(0)
        setHudValues()
        return
    }

    isAnimate = true
    addHudValues(cardConfig[rotate] as number[], 0.5)
    await hideCard(rotate)
    const values = getHudValues()
    const card = getResultCard(values) || drawCard()
    setCard(card)
    await showCard()
    isAnimate = false
}
