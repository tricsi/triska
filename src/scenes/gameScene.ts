import { TEntity, addChild, createEntity, on, X } from "../modules"
import { COLOR_BLACK } from "../config"
import { foreshadowValues, initHud, addHudValues, setHudValues } from "./hudScene"
import {
    hideCard,
    cardConfig,
    initCard,
    setCard,
    showCard,
    setCardRotate,
    getCardRotete,
    isCardHover
} from "./cardScene"
import { drawCard, getResultCard } from "../logic"
import POINTER from "../modules/input/pointer"
import { initParticle, startParticle } from "../prefabs/particle"
import { initInfo, setDays } from "./infoScene"

const gameScene: TEntity = createEntity(["game", , [
    ["bg", { p: [[-36, -64, 72, 128]], c: COLOR_BLACK }]
]])

let isAnimate: boolean,
    isEnded: boolean = true,
    isDown: number = 0,
    startX: number = 0

export function initGame() {
    on("up", onUp)
    on("down", onDown)
    on("pointer", onPointer)
    addChild(gameScene, initParticle(), 0)
    addChild(gameScene, initHud(), 1)
    addChild(gameScene, initInfo(), 2)
    addChild(gameScene, initCard(), 3)
    setCard(drawCard())
    return gameScene
}

function onDown() {
    if (isAnimate || !isCardHover()) return
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
        return
    }
    
    isAnimate = true
    await hideCard(rotate)
    let result
    if (isEnded) {
        setDays(0)
        setHudValues([5, 5, 5, 5])
    } else {
        const values = addHudValues(cardConfig[rotate] as number[])
        result = getResultCard(values)
    }
    isEnded = !!result
    if (isEnded) {
        startParticle()
    } else {
        setDays()
        result = drawCard()
    }
    setCard(result)
    await showCard()
    isAnimate = false
}
