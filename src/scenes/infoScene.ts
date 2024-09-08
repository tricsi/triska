import { FONT } from "../config"
import { createEntity, getChild, setText, storage } from "../modules"

const infoScene = createEntity(["info", {t: [, [0, 49]]}, [
    ["days", { x: [FONT, "wake up", 1] }]]
])
const days = getChild(infoScene, "days")

let daysNum: number

export function initInfo() {
    return infoScene
}

export function setInfoText(text: string) {
    setText(days, text)
}

export function setDays(value: number = daysNum + 1) {
    setInfoText("day " + value)
    storage("day", value)
    daysNum = value
}

export function getDays(): number {
    return daysNum
}
