import { FONT } from "../config"
import { createEntity, getChild, setText, session, storage } from "../modules"

let hiScore = storage("score") || 0

const infoScene = createEntity(["info", {t: [, [0, 49]]}, [
    ["days", { x: [FONT, hiScore ? `hi ${hiScore} days` : "", 1] }]]
])
const days = getChild(infoScene, "days")

let daysNum: number

export function initInfo() {
    return infoScene
}

function setInfoText(text: string) {
    setText(days, text)
}

export function setDays(value: number = daysNum + 1) {
    setInfoText(value ? "day " + value : "")
    session("day", value)
    daysNum = value
}

export function setResultInfo() {
    setInfoText("")
    if (hiScore < daysNum) {
        hiScore = daysNum
        storage("score", hiScore)
        setInfoText("new record!")
    }
}