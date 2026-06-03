import { expect, jest, test } from '@jest/globals'
import { createMockRpc } from '@lvce-editor/rpc'
import * as RpcRegistry from '@lvce-editor/rpc-registry'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { initializeExtensionHost } from '../src/parts/InitializeExtensionHostWorker/InitializeExtensionHostWorker.ts'

test('initializeExtensionHostWorker registers RPC', async () => {
  const invokeAndTransfer = jest.fn()
  const mockRpc = createMockRpc({
    commandMap: {
      'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker': invokeAndTransfer,
    },
  })
  RendererWorker.set(mockRpc)
  await initializeExtensionHost()
  expect(invokeAndTransfer).toHaveBeenCalledTimes(1)
  expect(mockRpc.invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker', expect.any(MessagePort), 'HandleMessagePort.handleMessagePort2', 0],
  ])
  expect(invokeAndTransfer).toHaveBeenCalledWith(expect.any(MessagePort), 'HandleMessagePort.handleMessagePort2', 0)
  const rpc = RpcRegistry.get(RpcRegistry.RpcId.ExtensionHostWorker)
  expect(rpc).toBeDefined()
  await rpc.dispose()
})
