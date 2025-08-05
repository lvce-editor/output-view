import { expect, test } from '@jest/globals'
import { create } from '../src/parts/Create/Create.ts'
import { get } from '../src/parts/OutputStates/OutputStates.ts'

test('create initializes state with correct default values', () => {
  const id = 123
  const uri = 'test://uri'
  const x = 100
  const y = 200
  const width = 300
  const height = 400
  create(id, uri, x, y, width, height, '')
  const stateTuple = get(id)
  expect(stateTuple).toBeDefined()
})
