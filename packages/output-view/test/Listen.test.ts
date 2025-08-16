import { expect, test } from '@jest/globals'
import { mockWorkerGlobalRpc } from '@lvce-editor/rpc'
import { listen } from '../src/parts/Listen/Listen.ts'
import * as RpcRegistry from '@lvce-editor/rpc-registry'

test('listen', async () => {
  const { start, dispose } = mockWorkerGlobalRpc()
  const listenPromise = listen()
  start()
  await listenPromise
  expect(RpcRegistry.get(RpcRegistry.RpcId.RendererWorker)).toBeDefined()
  dispose()
})
