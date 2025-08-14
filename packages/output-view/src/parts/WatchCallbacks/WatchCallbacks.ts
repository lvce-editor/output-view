const watchCallbacks = Object.create(null)

export const registerWatchCallback = (id: number, fn: () => void): void => {
  watchCallbacks[id] = fn
}

export const executeWatchCallBack = (id: number): void => {
  watchCallbacks[id]()
}

export const unregisterWatchCallback = (id: number): void => {
  delete watchCallbacks[id]
}
