import {
    TEntity,
    TEntityProps,
    TEvent,
    addChild,
    createEntity,
    getChild,
    on,
    play,
    setAlpha,
    setRotate,
} from "../modules"
import { CARDS, COLOR_BLACK } from "../config"
import { createButton, isButtonActive } from "../prefabs/button"
import { foreshadowValues, initHud, addHudValues, setHudValues } from "./hudScene"
import { animateCard, cardValues, initCard, setCard } from "./cardScene"

const gamePrefab: TEntityProps = ["game", , [
    ["no", { t: [, [-15, 52]] }, createButton(0)],
    ["ok", { t: [, [15, 52]] }, createButton(1)],
    ["bg", { p: [[-36, -64, 72, 128]], c: COLOR_BLACK }]
]]

let gameScene: TEntity
let buttons: TEntity[]
let hover: number
let isAnimate: boolean

export function initGame() {
    on("up", onUp)
    on("down", onPointer)
    on("pointer", onPointer)
    gameScene = createEntity(gamePrefab)
    addChild(gameScene, initHud(), 2)
    addChild(gameScene, initCard(), 3)
    buttons = [getChild(gameScene, "no"), getChild(gameScene, "ok")]
    setCard(...CARDS[0])
    return gameScene
}

function onPointer() {
    hover = buttons.reduce((value, button, index) => {
        const isActive = !isAnimate && isButtonActive(button)
        return isActive ? index : value
    }, -1)
    if (hover < 0) {
        buttons.forEach((button) => setRotate(button, 0))
        setHudValues()
        return
    }
    foreshadowValues(...cardValues[hover])
    const angle = hover * 0.2 - 0.1
    setRotate(buttons[hover], angle)
}

async function onUp([code]: TEvent<string>) {
    if (code !== "Mouse0" || hover < 0 || isAnimate) {
        setHudValues()
        return
    }
    buttons.forEach((button) => setRotate(button, 0))
    addHudValues(cardValues[hover], .5)
    play("tap")
    isAnimate = true
    await animateCard(hover)
    isAnimate = false
}
