import { copy, createEntity, getChildren, set, setColor, TEntity, TEntityProps, timer } from "../modules"

const hudPrefab: TEntityProps = ["hud", { t: [, [0, -54]] }, [
    ["luck", { s: ["ico", 14, 14, 0, 2], t: [[7, 7], [-26, 0]] }],
    ["brain", { s: ["ico", 14, 14, 0, 3], t: [[7, 7], [-9, 0]] }],
    ["money", { s: ["ico", 14, 14, 0, 4], t: [[7, 7], [9, 0]] }],
    ["life", { s: ["ico", 14, 14, 0, 5], t: [[7, 7], [26, 0]] }]
]]

let icons: TEntity[]
let values: number[] = [0, 0, 0, 0]

export async function updateHudValues(newValues: number [], time = 1) {
    const oldValues = [...values]
    copy(values, newValues)
    await timer(time, (t) => {
        icons.forEach((icon, i) => {
            let value = (newValues[i] - oldValues[i]) * t + oldValues[i]
            setColor(icon, [value, value, value])
        })
    })
}

export function initHud() {
    const hudScene = createEntity(hudPrefab)
    icons = getChildren(hudScene)
    updateHudValues([.5, .5, .5, .5], 0)
    return hudScene
}
