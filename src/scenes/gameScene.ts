import {
    TEntity,
    TEntityProps,
    TEvent,
    createEntity,
    getChild,
    on,
    play,
    schedule,
    setAlpha,
    setRotate
} from "../modules"
import { COLOR_BLACK, COLOR_GREEN, COLOR_RED } from "../config"
import { createButton, isButtonActive } from "../prefabs/button"

const gamePrefab: TEntityProps = [
    "game",
    ,
    [
        ["no", { t: [, [-25, 100], 2] }, createButton(0, COLOR_RED)],
        ["ok", { t: [, [25, 100], 2] }, createButton(1, COLOR_GREEN)],
        ["bg", { c: COLOR_BLACK, p: [[0, 0, 144, 56]] }]
    ]
]

let gameScene: TEntity
let buttons: TEntity[]
let hover: number

function onUpdate() {
    hover = -1
    buttons.forEach((button, index) => {
        const isActive = isButtonActive(button)
        if (isActive) {
            hover = index
        }
        setAlpha(button, isActive ? 1 : 0.7)
    })
}

function onDown([code]: TEvent<string>) {
    onUpdate()
    if (code !== "Mouse0" || hover < 0) return
    setRotate(buttons[hover], hover * 0.2 - 0.1)
}

function onClick([code]: TEvent<string>) {
    onUpdate()
    if (code !== "Mouse0" || hover < 0) return
    buttons.forEach((button) => {
        setRotate(button, 0)
    })
    play("tap")
}

export function initGame() {
    schedule(onUpdate)
    on("up", onClick)
    on("down", onDown)
    gameScene = createEntity(gamePrefab)
    buttons = [getChild(gameScene, "no"), getChild(gameScene, "ok")]
    return gameScene
}
