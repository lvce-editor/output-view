import { test, expect } from '@jest/globals'
import { removeElement } from '../src/parts/Arrays/Arrays.ts'

test('removeElement removes an element from the array', () => {
  const input = [1, 2, 3, 4]
  const result = removeElement(input, 3)
  expect(result).toEqual([1, 2, 4])
})

test('removeElement returns the same array if element not found', () => {
  const input = [1, 2, 3, 4]
  const result = removeElement(input, 5)
  expect(result).toEqual([1, 2, 3, 4])
})

test('removeElement removes only the first occurrence', () => {
  const input = [1, 2, 3, 2, 4]
  const result = removeElement(input, 2)
  expect(result).toEqual([1, 3, 2, 4])
})
