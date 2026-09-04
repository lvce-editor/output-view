import { expect, test } from '@jest/globals'
import * as RpcRegistry from '@lvce-editor/rpc-registry'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { initializeExtensionManagementWorker } from '../src/parts/InitializeExtensionManagementWorker/InitializeExtensionManagementWorker.ts'

test('initializeExtensionManagementWorker registers lazy RPC', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionManagementWorker': () => undefined,
  })
  await initializeExtensionManagementWorker()
  expect(mockRpc.invocations).toEqual([])
  const rpc = RpcRegistry.get(RpcRegistry.RpcId.ExtensionManagementWorker)
  expect(rpc).toBeDefined()
  await rpc.dispose()
})
