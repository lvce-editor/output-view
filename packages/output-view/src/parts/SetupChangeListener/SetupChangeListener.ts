import { FileSystemWorker, RpcId } from '@lvce-editor/rpc-registry'
import { handleFileChange } from '../HandleFileChange/HandleFileChange.ts'
import * as WatchCallbacks from '../WatchCallbacks/WatchCallbacks.ts'

export const setupChangeListener = async (oldWatchId: number, newWatchId: number, uri: string): Promise<void> => {
  try {
    if (oldWatchId) {
      WatchCallbacks.unregisterWatchCallback(oldWatchId)
      await FileSystemWorker.unwatchFile(oldWatchId)
    }
    // TODO dispose old watcher
    const rpcId = RpcId.OutputWorker
    WatchCallbacks.registerWatchCallback(newWatchId, handleFileChange)
    await FileSystemWorker.watchFile(newWatchId, uri, rpcId)
  } catch {
    // ignore
  }
}
