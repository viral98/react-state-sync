import { useSyncExternalStore } from 'react'
interface ServerStoreState<T> {
  [key: string]: T
}
export interface CreateStoreReturn<T> {
  getState: () => ServerStoreState<T>
  setState: (newState: ServerStoreState<T>) => void
  subscribe: (listener: (state: ServerStoreState<T>) => void) => () => boolean
  serverInitialize: (initialServerState: ServerStoreState<T>) => void
  getServerState: () => ServerStoreState<T>
  useStore: <SelectorOutput>(
    selector: (state: ServerStoreState<T>) => SelectorOutput
  ) => SelectorOutput
}
export default function createServerStore<T>(
  initialState: ServerStoreState<T>
): CreateStoreReturn<T> {
  let currentState = initialState
  const listeners = new Set<(state: ServerStoreState<T>) => void>()
  let serverState: ServerStoreState<T> | null = null
  const subscribe = (listener: (state: ServerStoreState<T>) => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  return {
    getState: () => currentState,
    setState: (newState: ServerStoreState<T>) => {
      currentState = newState
      listeners.forEach((listener) => listener(currentState))
    },
    subscribe,
    serverInitialize: (initialServerState: ServerStoreState<T>) => {
      if (!serverState) {
        currentState = initialServerState
        serverState = initialServerState
      }
    },
    getServerState: () => serverState ?? initialState,
    useStore: <SelectorOutput>(
      selector: (state: ServerStoreState<T>) => SelectorOutput
    ): SelectorOutput =>
      useSyncExternalStore(
        subscribe,
        () => selector(currentState),
        () => selector(serverState ?? initialState)
      )
  }
}
