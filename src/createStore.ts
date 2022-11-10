import { useSyncExternalStore } from 'react'
export interface DefaultObject {
  _id: string
}
export type StoreState<T> = T & DefaultObject

export interface CreateStoreReturn<StoreState> {
  getState: () => StoreState[]
  setState: (newState: StoreState[]) => void
  subscribe: (listener: (state: StoreState[]) => void) => () => boolean
  serverInitialize: (initialServerState: StoreState[]) => void
  getServerState: () => StoreState[]
  useStore: <SelectorOutput>(selector: (state: StoreState[]) => SelectorOutput) => SelectorOutput
}
export default function createStore<StoreState>(
  initialState: StoreState[]
): CreateStoreReturn<StoreState> {
  let currentState = initialState
  const listeners = new Set<(state: StoreState[]) => void>()
  let serverState: StoreState[] | null = null
  const subscribe = (listener: (state: StoreState[]) => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  return {
    getState: () => currentState,
    setState: (newState: StoreState[]) => {
      currentState = newState
      listeners.forEach((listener) => listener(currentState))
    },
    subscribe,
    serverInitialize: (initialServerState: StoreState[]) => {
      if (!serverState) {
        currentState = initialServerState
        serverState = initialServerState
      }
    },
    getServerState: () => serverState ?? initialState,
    useStore: <SelectorOutput>(selector: (state: StoreState[]) => SelectorOutput): SelectorOutput =>
      useSyncExternalStore(
        subscribe,
        () => selector(currentState),
        () => selector(serverState ?? initialState)
      )
  }
}
