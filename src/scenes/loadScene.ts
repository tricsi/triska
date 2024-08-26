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
    play,
    TSoundProps,
    wave,
    music,
    mixer
} from "../modules"
import { FONT } from "../config"
import { initGame } from "./gameScene"

const loadScene = createEntity([
    "loader", , [
        ["title", { t:[,[0, -20], .7], x: [FONT, "Superstitious\nStory", 1, 1] }],
        ["text", { t:[,[0, 20],.5], x: [FONT, "click to start", 1, 1] }]
    ]
])

export function initLoad() {
    on("down", onDown)
    return loadScene
}

async function onDown() {
    off("down", onDown)
    setText(getChild(loadScene, "text"), "Loading...")

    await audio()
    await sound("tap", ["custom", 0.03, [1, 0]], 220)
    //await loadMusic()

    await timer(1, (t) => setAlpha(loadScene, 1 - t))

    const parent = getParent(loadScene)
    removeChild(parent, loadScene)
    addChild(parent, initGame())
}

async function loadMusic() {
    const mid: TSoundProps = ["sawtooth", 0.3, [1, 0.5]]
    const chip: TSoundProps = [
        wave((n) => (4 / (n * Math.PI)) * Math.sin(Math.PI * n * 0.18)),
        0.3,
        [1, 0.3]
    ]
    const cord: TSoundProps = [[1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1], 0.3, [0.5, 1, 0.5]]
    await music("theme", [
        [
            mid,
            "8|8|12e4e3,1gb4gb3,1,1gb4gb3,1,12e4e3,4|2|4e4,2g4,1e4,1g4,4gb4,4f4,4e4,2g4,1e4,1g4,1gb4,1,1gb4,1,4f4|2|12e4e3,1gb4gb3,1,1gb4gb3,1,12e4e3,4",
            0.2
        ],
        [cord, "8|4|8a2e3,4e3b3,2eb3bb3,2d3a3|12", 0.2],
        [chip, "1a1,1e2,1c2,1e2,1a1,1e2,1c2,1e2,1a1,1eb2,1b1,1eb2,1a1,1f2,1bb1,1f2|14", 0.2]
    ])
    mixer("music", 0.05)
    play("theme", true, "music")
}

