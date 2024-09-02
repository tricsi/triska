import { PTC } from "../config"
import {
    addChild,
    createEntity,
    getChildren,
    getPosition,
    irnd,
    pull,
    removeChild,
    rnd,
    schedule,
    setColor,
    setPosition,
    TEntity,
    Y
} from "../modules"

const looseParticle = createEntity(["loose", { t: [, [-36, -64]] }])
const pool: TEntity[] = []

let seq: number = 1

export function initParticle() {
    schedule(() => {
        getChildren(looseParticle).forEach((child) => {
            const pos = getPosition(child)
            if (pos[Y] > 128) {
                removeChild(looseParticle, child)
                pool.push(child)
            }
        })
    })
    return looseParticle
}

function createParticle() {
    const particle = pull(pool, () =>
        createEntity([
            "p" + seq++,
            {
                b: [, [0, irnd(50) + 50]],
                t: [[1.5, 1.5], , rnd() * 0.5 + 0.5],
                s: PTC
            }
        ])
    )
    const grey = rnd()
    setColor(particle, [grey, grey, grey])
    setPosition(particle, irnd(72), -irnd(20))
    return particle
}

export function startParticle(count = 50) {
    for (let i = 0; i < count; i++) {
        addChild(looseParticle, createParticle())
    }
}
