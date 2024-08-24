export type TEvent<T = any> = [T, string]
export type TListener = (event?: TEvent) => void
export type TListeners = Map<string, Set<TListener>>

const defaultListeners: TListeners = new Map<string, Set<TListener>>()

function parse(event: string) {
    return event
        .replace(/[^-_\w]+/, " ")
        .trim()
        .split(" ")
        .filter((v) => !!v)
}

export function on(
    event: string,
    listener: TListener | EventListenerOrEventListenerObject,
    listeners: any = defaultListeners
) {
    for (const name of parse(event)) {
        listeners instanceof Map
            ? listeners.get(name)?.add(listener) ||
              listeners.set(name, new Set<TListener>().add(listener as TListener))
            : listeners.addEventListener(name, listener, false)
    }
    return on
}

export function off(
    event: string,
    listener: TListener | EventListenerOrEventListenerObject,
    listeners: any = defaultListeners
) {
    for (const name of parse(event)) {
        listeners instanceof Map
            ? listeners.get(name)?.delete(listener)
            : listeners.removeEventListener(name, listener, false)
    }
    return off
}

export function emit(name: string, data?: any, listeners: any = defaultListeners) {
    const event: TEvent = [data, name]
    listeners.get("all")?.forEach((listener: TListener) => listener(event))
    listeners.get(name)?.forEach((listener: TListener) => listener(event))
    return emit
}
