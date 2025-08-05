import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'

test('loadContent returns a new state with expected properties', async () => {
  const state = createDefaultState()
  const savedState = {}
  const result = await loadContent(state, savedState)
  expect(result).toMatchObject({
    problems: [],
    message: expect.any(String),
    viewMode: expect.any(Number),
    filterValue: '',
    inputSource: expect.any(Number),
    filteredProblems: [],
    listItems: [],
    collapsedUris: [],
  })
})
