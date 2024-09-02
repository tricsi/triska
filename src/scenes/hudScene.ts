import { add, copy, createEntity, getChildren, setColor, TEntity } from "../modules"

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

export async function foreshadowValues(...newValues: number[]) {
    icons.forEach((icon, i) => {
        const color = (values[i] + newValues[i]) / 10
        setColor(icon, [color, color, color])
    })
}

export function getHudValues(): number[] {
    return [...values]
}

export async function setHudValues(newValues: number [] = values) {
    copy(values, newValues)
    icons.forEach((icon, i) => {
        let color = values[i] / 10
        setColor(icon, [color, color, color])
    })
}

export async function addHudValues(newValues: number []) {
    setHudValues(add(values, newValues))
}
