import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as RpcRegistry from '@lvce-editor/rpc-registry'
import { initializeFileSystemWorker } from '../src/parts/InitializeFileSystemWorker/InitializeFileSystemWorker.ts'
import { RendererWorker } from '@lvce-editor/rpc-registry'

test('initializeFileSystemWorker registers FileSystemWorker RPC', async () => {
  const invokeAndTransfer = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      throw new Error(`unexpected method ${method}`)
    },
    invokeAndTransfer,
  })
  RendererWorker.set(mockRpc)
  await initializeFileSystemWorker()
  expect(invokeAndTransfer).toHaveBeenCalledTimes(1)
  expect(invokeAndTransfer).toHaveBeenCalledWith(
    'SendMessagePortToExtensionHostWorker.sendMessagePortToFileSystemWorker',
    expect.any(MessagePort),
    'FileSystem.handleMessagePort',
    RpcRegistry.RpcId.OutputWorker,
  )
  const rpc = RpcRegistry.get(RpcRegistry.RpcId.FileSystemWorker)
  expect(rpc).toBeDefined()
  await rpc.dispose()
})
