import { setFrame } from "./../modules/entity/components/sprite"
import {
    PI,
    TEntity,
    TEntityProps,
    TEvent,
    addChild,
    createEntity,
    getChild,
    on,
    play,
    schedule,
    setAlpha,
    setRotate,
    timer
} from "../modules"
import {
    COLOR_BLACK,
    COLOR_GREEN,
    COLOR_GREY_3,
    COLOR_RED,
    COLOR_WHITE,
    FONT,
    ICO
} from "../config"
import { createButton, isButtonActive } from "../prefabs/button"
import { initHud } from "./hudScene"

const gamePrefab: TEntityProps = [
    "game",
    ,
    [
        ["no", { t: [, [-15, 52]] }, createButton(0, COLOR_RED)],
        ["ok", { t: [, [15, 52]] }, createButton(1, COLOR_GREEN)],
        ["card", { t: [[33, 128], [0, 84]]}, [
            ["ico", { t: [[7, 7], [32, 32], 3], s: ICO, c: COLOR_BLACK }],
            [
                "txt",
                { t: [, [32, 68], 0.5], x: [FONT, "Four-leaf\nClover", 1, 1], c: COLOR_BLACK }
            ],
            ["bg", { p: [[1, 1, 64, 82]], c: COLOR_WHITE }],
            ["frame", { p: [[0, 0, 66, 84]], c: COLOR_GREY_3 }]
        ]],
        ["bg", { p: [[-36, -64, 72, 128]], c: COLOR_BLACK }]
    ]
]

let gameScene: TEntity
let buttons: TEntity[]
let hover: number
let card: TEntity
let isAnimate: boolean

export function initGame() {
    schedule(onUpdate)
    on("up", onClick)
    on("down", onDown)
    gameScene = createEntity(gamePrefab)
    addChild(gameScene, initHud(), 0)
    buttons = [getChild(gameScene, "no"), getChild(gameScene, "ok")]
    card = getChild(gameScene, "card")
    setCard(2)
    return gameScene
}

function setCard(icon: number) {
    setFrame(getChild(card, "ico"), icon)
}

async function animateCard(direction: number) {
    isAnimate = true
    const angle = (direction - 0.5) * PI
    await timer(0.4, (t) => setRotate(card, t * t * angle))
    setRotate(card, 0)
    await timer(0.2, (t) => setAlpha(card, t * t))
    isAnimate = false
}

function onUpdate() {
    hover = -1
    buttons.forEach((button, index) => {
        const isActive = !isAnimate && isButtonActive(button)
        if (isActive) {
            hover = index
        }
        setAlpha(button, isActive ? 1 : 0.7)
    })
}

function onDown([code]: TEvent<string>) {
    onUpdate()
    if (code !== "Mouse0" || hover < 0 || isAnimate) return
    const angle = hover * 0.2 - 0.1
    setRotate(buttons[hover], angle)
}

function onClick([code]: TEvent<string>) {
    onUpdate()
    buttons.forEach((button) => setRotate(button, 0))
    if (code !== "Mouse0" || hover < 0 || isAnimate) return
    animateCard(hover)
    play("tap")
}
