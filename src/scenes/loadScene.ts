import { MOBILE } from './../modules/utils';
import {
    audio,
    addChild,
    createEntity,
    getChild,
    getParent,
    off,
    on,
    setAlpha,
    setText,
    removeChild,
    timer,
    sound,
    TSoundProps,
    wave,
    music,
    TTimerToken,
    DOC,
    mixer,
    fullscreen
} from "../modules"
import { FONT } from "../config"
import { initGame } from "./gameScene"

const loadScene = createEntity([
    "loader", , [
        ["title", { t:[,[0, -20], .7], x: [FONT, , 1, 1] }],
        ["text", { t:[,[0, 20],.5], x: [FONT, "click to start", 1, 1] }]
    ]
])

const titleStr = "Superstitious\nStory"
const title = getChild(loadScene, "title")
const text = getChild(loadScene, "text")
const introProps: TTimerToken = [1, 0]
const fs = async () => MOBILE && fullscreen()

export function initLoad() {
    intro()
    return loadScene
}

async function intro() {
    setAlpha(text, 0)
    on("up", onClick)
    await timer(0.12, (t, i) => t || setText(title, titleStr.substring(0, i + 1)), titleStr.length, introProps)
    setText(title, titleStr)
    await timer(0.3, t => setAlpha(text, t), 1, introProps)
}

async function onClick() {
    off("up", onClick)
    introProps[1] = 1
    setText(getChild(loadScene, "text"), "Loading...")

    await audio()
    await fs()
    on("up", fs)
    on("visibilitychange", () => mixer("master", DOC.hidden ? 0 : 1), DOC)
    await sound("swipe", ["custom", 0.2, [0, 0.5, 0]], [110, 220, 110])
    await sound("end", ["custom", 2.5, [0, 0.5, 0.2, 0]], 440)
    await loadMusic()
    await timer(1, (t) => setAlpha(loadScene, 1 - t))

    const parent = getParent(loadScene)
    removeChild(parent, loadScene)
    addChild(parent, initGame())
}

async function loadMusic() {
    const drum: TSoundProps = ["custom", 0.5, [4, 0]]
    const bass: TSoundProps = ["sawtooth", 0.3, [.7, 0.1]]
    const chip: TSoundProps = [wave((n) => (4 / (n * Math.PI)) * Math.sin(Math.PI * n * 0.18)), 0.3, [1, 0.3, 0.1]]
    const cord: TSoundProps = [[1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1], 0.3, [0.1, 0.5, 0.1]]
    await music("theme", [
        [drum, "1e3,3,1e3,3|4|1e3,1,1e4,1,1e3,1,1e4,1|12", 0.4],
        [bass, "32|1|1e1,1c2,1e2,5g2,1b1,1e2,1g2,5b2,1c2,1e2,1g2,5c3,1e1,1b1,1e2,5g2|3", 0.4],
        [cord, "8e2c3e3g3,8b2e3g3b3,8c3e3g3c4,8e2b2e3g3|4", 0.4],
        [chip, "64,8e3,1e3,1d3,1b2,4,1g2,7a2,1g2,7b2,1e2,8e3,1e3,1d3,1b2,4,1g2,7a2,1g2,8e2", 0.4]
    ])
}

