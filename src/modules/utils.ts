export const DOC = document
export const BODY = DOC.body
export const MOBILE = navigator.userAgent
    .toLowerCase()
    .match(/android|iphone|ipad|ipod/)
    ?.shift()

export function $<T = Element>(query: string, element: Element | Document = DOC): T | undefined {
    return element.querySelector(query) as T | undefined
}

export function pull<T>(items: T[], factory: () => T): T {
    return items.pop() || factory()
}

export async function fullscreen(element = BODY) {
    return DOC.fullscreenElement || (await element.requestFullscreen())
}

export function storage<T = any>(name: string, value?: T, store: Storage = localStorage): T | null {
    const { prefix = "" } = BODY.dataset
    name = prefix + name
    if (value !== undefined) {
        value !== null ? store.setItem(name, JSON.stringify(value)) : store.removeItem(name)
        return value
    }
    try {
        const item = store.getItem(name)
        if (item) {
            return JSON.parse(item) as T
        }
    } catch (_) {}
    return null
}

export function session<T = any>(
    name: string,
    value?: T,
    store: Storage = sessionStorage
): T | null {
    return storage(name, value, store)
}
