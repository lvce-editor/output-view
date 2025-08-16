import { expect, test } from '@jest/globals'
import { mockWorkerGlobalRpc } from '@lvce-editor/rpc'
import * as RpcRegistry from '@lvce-editor/rpc-registry'
import { listen } from '../src/parts/Listen/Listen.ts'

test('listen', async () => {
  const { start, dispose } = mockWorkerGlobalRpc()
  const listenPromise = listen()
  start()
  await listenPromise
  expect(RpcRegistry.get(RpcRegistry.RpcId.RendererWorker)).toBeDefined()
  dispose()
})
