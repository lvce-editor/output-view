import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { VError } from '@lvce-editor/verror'
import * as CreateFileSystemWorkerRpc from '../src/parts/CreateFileSystemWorkerRpc/CreateFileSystemWorkerRpc.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('createFileSystemWorkerRpc - wraps error', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    // send will be used by TransferMessagePortRpcParent within create
    invoke: () => {
      throw new Error('no port')
    },
    invokeAndTransfer: () => {
      throw new Error('no port')
    },
  })
  RendererWorker.set(mockRpc)
  await expect(CreateFileSystemWorkerRpc.createFileSystemWorkerRpc()).rejects.toBeInstanceOf(VError)
})
