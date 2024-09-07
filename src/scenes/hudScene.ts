import { abs, add, copy, createEntity, getChildren, setColor, setScale, TEntity, timer } from "../modules"

const hudScene: TEntity = createEntity([
    "hud", { t: [, [0, -54]] }, [
        ["luck", { s: ["ico", 14, 14, 0, 0], t: [[7, 7], [-26, 0]] }],
        ["brain", { s: ["ico", 14, 14, 0, 1], t: [[7, 7], [-9, 0]] }],
        ["money", { s: ["ico", 14, 14, 0, 2], t: [[7, 7], [9, 0]] }],
        ["life", { s: ["ico", 14, 14, 0, 3], t: [[7, 7], [26, 0]] }]
    ]
])

let icons: TEntity[] = getChildren(hudScene)
let values: number[] = [5, 5, 5, 5]

export function initHud() {
    setHudValues()
    return hudScene
}

export function foreshadowValues(...newValues: number[]) {
    icons.forEach((icon, i) => {
        setScale(icon, newValues[i] ? 1.2 : 1)
    })
}

export function setHudValues(newValues: number [] = values) {
    copy(values, newValues)
    icons.forEach((icon, i) => {
        let color = values[i] / 10
        setColor(icon, [color, color, color])
        setScale(icon, 1)
    })
}

export function addHudValues(newValues: number []): number[] {
    setHudValues(add(values, newValues))
    return [...values]
}
