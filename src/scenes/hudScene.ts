import { add, copy, createEntity, getChildren, setColor, TEntity, TEntityProps, timer } from "../modules"

const hudPrefab: TEntityProps = ["hud", { t: [, [0, -54]] }, [
    ["luck", { s: ["ico", 14, 14, 0, 2], t: [[7, 7], [-26, 0]] }],
    ["brain", { s: ["ico", 14, 14, 0, 3], t: [[7, 7], [-9, 0]] }],
    ["money", { s: ["ico", 14, 14, 0, 4], t: [[7, 7], [9, 0]] }],
    ["life", { s: ["ico", 14, 14, 0, 5], t: [[7, 7], [26, 0]] }]
]]

let icons: TEntity[]
let values: number[] = [5, 5, 5, 5]

export async function foreshadowValues(...newValues: number[]) {
    icons.forEach((icon, i) => {
        const color = (values[i] + newValues[i]) / 10
        setColor(icon, [color, color, color])
    })
}

export async function addHudValues(newValues: number [], time = 0) {
    const oldValues = [...values]
    add(values, newValues)
    await timer(time, (t) => {
        icons.forEach((icon, i) => {
            let color = (values[i] - oldValues[i]) * t
            color += oldValues[i]
            color /= 10
            setColor(icon, [color, color, color])
        })
    })
}

export async function setHudValues(newValues: number [] = values) {
    copy(values, newValues)
    icons.forEach((icon, i) => {
        let color = values[i] / 10
        setColor(icon, [color, color, color])
    })
}

export function initHud() {
    const hudScene = createEntity(hudPrefab)
    icons = getChildren(hudScene)
    setHudValues([5, 5, 5, 5])
    return hudScene
}
