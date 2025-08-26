import { test, expect } from '@jest/globals'
import { getLinkMatch } from '../src/parts/GetLinkMatch/GetLinkMatch.ts'

test('getLinkMatch - no link returns null', () => {
  expect(getLinkMatch('hello world')).toBeNull()
})

test('getLinkMatch - http link', () => {
  expect(getLinkMatch('see http://example.com now')).toBe('http://example.com')
})

test.skip('getLinkMatch - https link', () => {
  expect(getLinkMatch('go to https://example.com!')).toBe('https://example.com!'.slice(0, 'https://example.com'.length))
})

test('getLinkMatch - file link', () => {
  expect(getLinkMatch('open file:///tmp/log.txt please')).toBe('file:///tmp/log.txt')
})
