import { expect, test } from '@jest/globals'
import { createMockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { VError } from '@lvce-editor/verror'
import * as CreateFileSystemWorkerRpc from '../src/parts/CreateFileSystemWorkerRpc/CreateFileSystemWorkerRpc.ts'

test('createFileSystemWorkerRpc - wraps error', async () => {
  const mockRpc = createMockRpc({
    commandMap: {
      'SendMessagePortToExtensionHostWorker.sendMessagePortToFileSystemWorker': () => {
        throw new Error('no port')
      },
    },
  })
  RendererWorker.set(mockRpc)
  await expect(CreateFileSystemWorkerRpc.createFileSystemWorkerRpc()).rejects.toBeInstanceOf(VError)
  const fallbackRpc = createMockRpc({
    commandMap: {
      'FileSystem.readFile': () => '',
    },
  })
  RendererWorker.set(fallbackRpc)
})
