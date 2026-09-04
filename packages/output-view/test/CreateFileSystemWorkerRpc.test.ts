import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { VError } from '@lvce-editor/verror'
import * as CreateFileSystemWorkerRpc from '../src/parts/CreateFileSystemWorkerRpc/CreateFileSystemWorkerRpc.ts'

test('createFileSystemWorkerRpc - wraps error', async () => {
  using _mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToFileSystemWorker': () => {
      throw new Error('no port')
    },
  })
  await expect(CreateFileSystemWorkerRpc.createFileSystemWorkerRpc()).rejects.toBeInstanceOf(VError)
})
