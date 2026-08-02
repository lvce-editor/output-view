import { expect, test } from '@jest/globals'
import * as RpcRegistry from '@lvce-editor/rpc-registry'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { initializeFileSystemWorker } from '../src/parts/InitializeFileSystemWorker/InitializeFileSystemWorker.ts'

test('initializeFileSystemWorker registers FileSystemWorker RPC', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToFileSystemWorker': () => undefined,
  })
  await initializeFileSystemWorker()
  expect(mockRpc.invocations).toEqual([
    [
      'SendMessagePortToExtensionHostWorker.sendMessagePortToFileSystemWorker',
      expect.any(MessagePort),
      'FileSystem.handleMessagePort',
      RpcRegistry.RpcId.OutputWorker,
    ],
  ])
  const rpc = RpcRegistry.get(RpcRegistry.RpcId.FileSystemWorker)
  expect(rpc).toBeDefined()
  await rpc.dispose()
})
