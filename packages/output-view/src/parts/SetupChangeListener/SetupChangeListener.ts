import { FileSystemWorker } from '@lvce-editor/rpc-registry'
import * as WatchCallbacks from '../WatchCallbacks/WatchCallbacks.ts'

export const setupChangeListener = async (uri: string): Promise<void> => {
  const watchId = Math.random()
  WatchCallbacks.registerWatchCallback(watchId, (): void => {
    // TODO
    // console.log('channel changed')
  })
  // @ts-ignore
  await FileSystemWorker.invoke(/* OutputChannel.open */ 'FileSystem.watchFile', watchId, /* path */ uri)
}
