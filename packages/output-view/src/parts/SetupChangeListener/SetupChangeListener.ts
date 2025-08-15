import { FileSystemWorker, RpcId } from '@lvce-editor/rpc-registry'
import { handleFileChange } from '../HandleFileChange/HandleFileChange.ts'
import * as WatchCallbacks from '../WatchCallbacks/WatchCallbacks.ts'

export const setupChangeListener = async (watchId: number, uri: string): Promise<void> => {
  try {
    const rpcId = RpcId.OutputWorker
    WatchCallbacks.registerWatchCallback(watchId, handleFileChange)
    // @ts-ignore
    await FileSystemWorker.invoke(/* OutputChannel.open */ 'FileSystem.watchFile', watchId, /* path */ uri, rpcId)
  } catch {
    // ignore
  }
}
