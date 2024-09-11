import { add, copy, createEntity, getChildren, kill, on, PI, setColor, setScale, sin, TEntity, TEvent, timer, TTimerToken } from "../modules"

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
let token: TTimerToken

export function initHud() {
    setHudValues()
    on("help", ([page]: TEvent<number>) => intro(page))
    return hudScene
}

async function intro(page: number) {
    setHudValues()
    token && kill(token)
    switch (page) {
        case 1:
            token = [1, 0]
            await timer(0.5, (t, i) => {
                const tt = 1 - t * t;
                setScale(icons[i % icons.length], tt * 0.2 + 1)
            }, 12, token)
            break
        case 2:
            token = [1, 0]
            await timer(1, (t) => {
                const tt = sin(PI * 2 * t) / 2 + 0.5;
                icons.forEach(icon => setColor(icon, [tt, tt, tt]))
            }, 3, token)
            break
        }
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
