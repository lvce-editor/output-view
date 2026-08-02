import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createExtensionManagementWorkerRpc } from '../src/parts/CreateExtensionManagementWorkerRpc/CreateExtensionManagementWorkerRpc.ts'

test('createExtensionManagementWorkerRpc creates rpc successfully', async () => {
  using _mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionManagementWorker': () => undefined,
  })

  const rpc = await createExtensionManagementWorkerRpc()

  expect(rpc).toBeDefined()
  await rpc.dispose()
})
