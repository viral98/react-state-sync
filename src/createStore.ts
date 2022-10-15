import { useSyncExternalStore } from 'react'
export interface DefaultObject {
  id: string
}
export type StoreState<T> = T & DefaultObject

export default function createStore<StoreState>(initialState: StoreState) {
  let currentState = initialState
  const listeners = new Set<(state: StoreState) => void>()
  let serverState: StoreState | null = null
  const subscribe = (listener: (state: StoreState) => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  return {
    getState: () => currentState,
    setState: (newState: StoreState) => {
      currentState = newState
      listeners.forEach((listener) => listener(currentState))
    },
    subscribe,
    serverInitialize: (initialServerState: StoreState) => {
      if (!serverState) {
        currentState = initialServerState
        serverState = initialServerState
      }
    },
    getServerState: () => serverState ?? initialState,
    useStore: <SelectorOutput>(selector: (state: StoreState) => SelectorOutput): SelectorOutput =>
      useSyncExternalStore(
        subscribe,
        () => selector(currentState),
        () => selector(serverState ?? initialState)
      )
  }
}
