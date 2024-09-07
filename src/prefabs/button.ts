import { TEntity, TEntityProps, getChild, isHover } from "../modules"
import { COLOR_BLACK, COLOR_WHITE } from "../config"

export function createButton(
    icon: number,
    back: number[] = COLOR_WHITE,
    color: number[] = COLOR_BLACK,
): TEntityProps[] {
    return [
        ["txt", {
            c: color,
            t: [[7, 7]],
            s: ["ico", 14, 14, 0, icon]
        }],
        ["bg", {
            c: back,
            t: [[8, 8]],
            p: [[0, 0, 16, 16]]
        }]
    ]
}

export const isButtonActive = (entity: TEntity) => isHover(getChild(entity, "bg"))
