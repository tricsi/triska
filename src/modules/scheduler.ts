import { on } from "./event"
import { DOC } from "./utils"

export type TTask = (delta: number) => void

/** TTimerProp [scale, skip] */
export type TTimerToken = [number, number?, TTask?]

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
    token: TTimerToken = [1]
): Promise<void> {
    return new Promise<void>((resolve) => {
        let time = sec
        let index = 0
        token[2] = (delta: number) => {
            const [scale, skip] = token
            time -= delta * scale
            while (time <= 0 && index < loop - 1) {
                time += sec
                update?.(0, ++index)
            }
            if (time <= 0 || skip) {
                unschedule(token[2])
                update?.(1, index)
                resolve()
            } else {
                update?.(1 - time / sec, index)
            }
        }
        schedule(token[2], 0, SCHEDULER.fps)
        token[2](0)
    })
}

export function kill(props: TTimerToken, force = false) {
    props[1] = 1
    force && unschedule(props[2])
}

on("visibilitychange", () => DOC.hidden || reset(), DOC)
