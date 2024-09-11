import { FONT } from "../config"
import { createEntity, getChild, setText, session, storage } from "../modules"

let hiScore = storage("score")

const infoScene = createEntity(["info", {t: [, [0, 49]]}, [
    ["days", { x: [FONT, hiScore ? "hi: " + hiScore : "", 1] }]]
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
    setInfoText(value ? "day " + value : "")
    session("day", value)
    daysNum = value
}
