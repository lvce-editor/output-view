import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'

test('loadContent returns a new state with expected properties', async () => {
  FileSystemWorker.set(
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
