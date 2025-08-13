import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { VError } from '@lvce-editor/verror'
import * as SendMessagePortToFileSystemWorker from '../src/parts/SendMessagePortToFileSystemWorker/SendMessagePortToFileSystemWorker.ts'
import * as CreateFileSystemWorkerRpc from '../src/parts/CreateFileSystemWorkerRpc/CreateFileSystemWorkerRpc.ts'

test('createFileSystemWorkerRpc - wraps error', async () => {
  const original = SendMessagePortToFileSystemWorker.sendMessagePortToFileSystemWorker
  // simulate failure by throwing from send
  // @ts-expect-error temporary override
  SendMessagePortToFileSystemWorker.sendMessagePortToFileSystemWorker = () => {
    throw new Error('no port')
  }
  await expect(CreateFileSystemWorkerRpc.createFileSystemWorkerRpc()).rejects.toBeInstanceOf(VError)
  // restore
  SendMessagePortToFileSystemWorker.sendMessagePortToFileSystemWorker = original
})


