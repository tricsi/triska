import { on } from "./event"
import { DOC } from "./utils"

export type TTask = (delta: number) => void

/** TTimerProp [scale, stop] */
export type TTimerProp = [number, number?]

/** TTaskData [Callback, Weight, FPS, Time] */
type TTaskData = [TTask, number, number, number]

export const SCHEDULER = { scale: 1, fps: 60, time: now() }
const TASKS: TTaskData[] = []

function setTime(task: TTaskData, time = now()) {
    return (task[3] = time)
}

function reset() {
    TASKS.forEach((task) => setTime(task))
}

export function now(): number {
    return performance.now() / 1000
}

export function update() {
    requestAnimationFrame(update)
    SCHEDULER.time = now()
    for (const task of TASKS) {
        const [callback, , fixed, last] = task
        let delta = SCHEDULER.time - last
        if (delta < fixed) {
            continue
        }
        setTime(task, SCHEDULER.time)
        while (fixed && delta > fixed) {
            callback(fixed * SCHEDULER.scale)
            delta -= fixed
        }
        callback(delta * SCHEDULER.scale)
    }
}

export function schedule(task: TTask, weight = 0, fps = SCHEDULER.fps) {
    TASKS.push([task, weight, fps ? 1 / fps : 0, now()])
    TASKS.sort((a, b) => a[1] - b[1])
}

export function unschedule(callback: TTask) {
    for (let i = TASKS.length - 1; i >= 0; i--) {
        if (TASKS[i][0] === callback) {
            TASKS.splice(i, 1)
        }
    }
}

export function timer(
    sec: number,
    update?: (t: number, i: number) => void,
    loop: number = 0,
    prop: TTimerProp = [1]
): Promise<void> {
    return new Promise<void>((resolve) => {
        let time = sec
        let index = 0
        const callback = (delta: number) => {
            const [scale, stop] = prop
            time -= delta * scale
            while (time <= 0 && index < loop - 1) {
                time += sec
                update?.(0, ++index)
            }
            if (time <= 0 || stop) {
                unschedule(callback)
                update?.(1, index)
                resolve()
            } else {
                update?.(1 - time / sec, index)
            }
        }
        schedule(callback, 0, SCHEDULER.fps)
        callback(0)
    })
}

on("visibilitychange", () => DOC.hidden || reset(), DOC)
