import {
    TEntity,
    TEvent,
    addChild,
    createEntity,
    getChild,
    on,
    play,
    setRotate
} from "../modules"
import { COLOR_BLACK } from "../config"
import { createButton, isButtonActive } from "../prefabs/button"
import { foreshadowValues, initHud, addHudValues, setHudValues } from "./hudScene"
import { hideCard, cardConfig, initCard, setCard, showCard } from "./cardScene"
import { drawCard } from "../logic"

const gameScene: TEntity = createEntity(["game", , [
    ["no", { t: [, [-15, 52]] }, createButton(0)],
    ["ok", { t: [, [15, 52]] }, createButton(1)],
    ["bg", { p: [[-36, -64, 72, 128]], c: COLOR_BLACK }]
]])

let buttons: TEntity[] = [getChild(gameScene, "no"), getChild(gameScene, "ok")]
let hover: number
let isAnimate: boolean

export function initGame() {
    on("up", onUp)
    on("down", onPointer)
    on("pointer", onPointer)
    addChild(gameScene, initHud(), 2)
    addChild(gameScene, initCard(), 3)
    setCard(...drawCard())
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
    foreshadowValues(...(cardConfig[hover] as number[]))
    const angle = hover * 0.2 - 0.1
    setRotate(buttons[hover], angle)
}

async function onUp([code]: TEvent<string>) {
    if (code !== "Mouse0" || hover < 0 || isAnimate) {
        setHudValues()
        return
    }
    buttons.forEach((button) => setRotate(button, 0))
    addHudValues(cardConfig[hover] as number[], 0.5)
    play("tap")
    isAnimate = true
    await hideCard(hover)
    setCard(...drawCard())
    await showCard()
    isAnimate = false
}
