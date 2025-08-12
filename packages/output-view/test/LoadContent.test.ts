import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'

import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import { MockRpc } from '@lvce-editor/rpc'

test('loadContent returns a new state with expected properties', async () => {
  RendererWorker.set(
    MockRpc.create({
      commandMap: {},
      invoke() {
        return 'test content'
      },
    }),
  )
  const state = createDefaultState()
  const savedState = {}
  const result = await loadContent(state, savedState)
  expect(result).toMatchObject({
    message: expect.any(String),
    filterValue: '',
    inputSource: expect.any(Number),
    listItems: ['test content'],
    collapsedUris: [],
  })
})
