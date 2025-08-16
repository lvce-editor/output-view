import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as RpcRegistry from '@lvce-editor/rpc-registry'
import { initializeExtensionHost } from '../src/parts/InitializeExtensionHostWorker/InitializeExtensionHostWorker.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('initializeExtensionHostWorker registers RPC', async () => {
  const invokeAndTransfer = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      throw new Error(`unexpected method ${method}`)
    },
    invokeAndTransfer,
  })
  RendererWorker.set(mockRpc)
  await initializeExtensionHost()
  expect(invokeAndTransfer).toHaveBeenCalledTimes(1)
  expect(invokeAndTransfer).toHaveBeenCalledWith(
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker',
    expect.any(MessagePort),
    'HandleMessagePort.handleMessagePort2',
    0,
  )
  const rpc = RpcRegistry.get(RpcRegistry.RpcId.ExtensionHostWorker)
  expect(rpc).toBeDefined()
  await rpc.dispose()
})
