import { test, expect } from '@jest/globals'
import { isFileNotFoundError } from '../src/parts/IsFileNotFoundError/IsFileNotFoundError.ts'

class FakeError {
  message: string
  constructor(message: string) {
    this.message = message
  }
}

test('isFileNotFoundError - true when message contains pattern', () => {
  const err = new FakeError('File not found: /tmp/x')
  expect(isFileNotFoundError(err)).toBe(true)
})

test('isFileNotFoundError - false when message different', () => {
  const err = new FakeError('Permission denied')
  expect(isFileNotFoundError(err)).toBe(false)
})
