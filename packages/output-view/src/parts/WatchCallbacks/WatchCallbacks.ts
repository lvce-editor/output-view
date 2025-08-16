const watchCallbacks = Object.create(null)

export const registerWatchCallback = (id: number, fn: (watchId: number) => Promise<void>): void => {
  watchCallbacks[id] = fn
}

export const executeWatchCallBack = (id: number): void => {
  watchCallbacks[id](id)
}

export const unregisterWatchCallback = (id: number): void => {
  delete watchCallbacks[id]
}

export const clearWatchCallbacks = (): void => {
  const keys = Object.keys(watchCallbacks)
  for (const key of keys) {
    unregisterWatchCallback(Number.parseInt(key))
  }
}
