import type { ReadPendingResult } from '../ReadPendingResult/ReadPendingResult.ts'
import * as FileSystemWorker from '../FileSystemWorker/FileSystemWorker.ts'
import * as SharedProcess from '../SharedProcess/SharedProcess.ts'
import * as WatchCallbacks from '../WatchCallbacks/WatchCallbacks.ts'

export class OutputChannel extends EventTarget {
  public readonly uri: string
  public readonly watchId: number

  public constructor(uri: string) {
    super()
    this.uri = uri
    this.watchId = Math.random()
  }

  public async open(): Promise<void> {
    WatchCallbacks.registerWatchCallback(this.watchId, (): void => {
      // TODO
      // console.log('channel changed')
    })
    // @ts-ignore
    await FileSystemWorker.invoke(/* OutputChannel.open */ 'FileSystem.watchFile', this.watchId, /* path */ this.uri)
    await FileSystemWorker.invoke(/* OutputChannel.open */ 'FileSystem.readFile', /* path */ this.uri)
  }

  public async close(): Promise<void> {
    WatchCallbacks.unregisterWatchCallback(this.watchId)
    await SharedProcess.invoke(/* OutputChannel.close */ 'FileSystem.unwatch', /* id */ this.watchId)
  }

  public emitDidChange(): void {
    this.dispatchEvent(new Event('change'))
  }

  public onDidChange(listener: () => void): () => void {
    const wrapped = (): void => listener()
    this.addEventListener('change', wrapped)
    return () => this.removeEventListener('change', wrapped)
  }

  public async readPending(): Promise<ReadPendingResult> {
    return SharedProcess.invoke(/* OutputChannel.readPending */ 'OutputChannel.readPending', this.uri)
  }
}
