import { TEntity, addChild, createEntity, on, X, play, mixer, timer, setAlpha } from "../modules"
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
    isCardHover,
    highlightHint
} from "./cardScene"
import { drawCard, getResultCard } from "../logic"
import POINTER from "../modules/input/pointer"
import { initParticle, startParticle } from "../prefabs/particle"
import { initInfo, setDays, setInfoText } from "./infoScene"

const gameScene: TEntity = createEntity(["game", , [
    ["bg", { p: [[-36, -64, 72, 128]], c: COLOR_BLACK }]
]])

let isAnimate: boolean,
    musicSrc: AudioBufferSourceNode,
    isEnded: boolean = true,
    isDown: number = 0,
    startX: number = 0

export function initGame() {
    addChild(gameScene, initParticle(), 0)
    addChild(gameScene, initHud(), 1)
    addChild(gameScene, initInfo(), 2)
    addChild(gameScene, initCard(), 3)
    setCard(drawCard())
    intro()
    return gameScene
}

async function intro() {
    await timer(0.5, t => setAlpha(gameScene, t))
    await timer(0.5, t => setCardRotate(t * t / 5))
    await highlightHint(1)
    await timer(.7, t => setCardRotate(0.2 - (t * t / 2.5)))
    await highlightHint(0)
    await timer(0.5, t => setCardRotate((t * t / 5) - 0.2))
    on("up", onUp)
    on("down", onDown)
    on("pointer", onPointer)
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
    
    if (!musicSrc) {
        musicSrc = play("theme", true, "music")
        musicSrc && mixer("music", 0.1)
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
        play("end")
        setInfoText("")
        startParticle()
        if (musicSrc) {
            timer(0.3, (t) => {
                mixer("music", (1 - t) * 0.1)
            }).then(() => {
                musicSrc.stop()
                musicSrc = null
            })
        }
    } else {
        setDays()
        result = drawCard()
    }
    setCard(result)
    await showCard()
    isAnimate = false
}
