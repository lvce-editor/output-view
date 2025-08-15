import { FileSystemWorker } from '@lvce-editor/rpc-registry'
import * as OutputStates from '../OutputStates/OutputStates.ts'
import * as WatchCallbacks from '../WatchCallbacks/WatchCallbacks.ts'

const handleChange = (watchId: number): void => {
  // console.log('channel changed', watchId)
  const keys = OutputStates.getKeys()
  for (const key of keys) {
    const instance = OutputStates.get(key)
    if (instance.newState.watchId) {
      // TODO update this instance
    }
  }
}

export const setupChangeListener = async (uri: string): Promise<void> => {
  try {
    const watchId = Math.random()
    const rpcId = 7001
    WatchCallbacks.registerWatchCallback(watchId, handleChange)
    // @ts-ignore
    await FileSystemWorker.invoke(/* OutputChannel.open */ 'FileSystem.watchFile', watchId, /* path */ uri, rpcId)
  } catch {
    // ignore
  }
}
