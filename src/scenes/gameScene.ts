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
    isCardHover
} from "./cardScene"
import { drawCard, getResultCard, shuffleDeck } from "../logic"
import POINTER from "../modules/input/pointer"
import { initParticle, startParticle } from "../prefabs/particle"
import { initInfo, setDays, setInfoText } from "./infoScene"

const gameScene: TEntity = createEntity(["game", , [
    ["bg", { p: [[-36, -64, 72, 128]], c: COLOR_BLACK }]
]])

let isAnimate: boolean,
    isTutorial: boolean = true,
    isEnded: boolean = true,
    isDown: number = 0,
    startX: number = 0,
    musicSrc: AudioBufferSourceNode

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
    await timer(0.3, t => setAlpha(gameScene, t))
    await timer(0.3, t => setCardRotate(t * t / 5))
    await timer(0.5)
    await timer(0.6, t => setCardRotate(0.2 - (t * t / 2.5)))
    await timer(0.5)
    await timer(0.3, t => setCardRotate((t * t / 5) - 0.2))
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

function gameOver() {
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
}

async function onUp() {
    isDown = 0
    const rotate: number = getCardRotete()
    if (rotate < 0) {
        setCardRotate(0)
        return
    }
    
    if (!musicSrc) {
        mixer("music", 0.1, mixer("master"))
        musicSrc = play("theme", true, "music")
    }

    isAnimate = true
    await hideCard(rotate)
    if (isTutorial && rotate > 0) {
        isTutorial = false
        shuffleDeck()
    }
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
        gameOver()
    } else {
        result = drawCard(() => isTutorial = false)
        isTutorial || setDays()
    }
    setCard(result)
    await showCard()
    isAnimate = false
}
