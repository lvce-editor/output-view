/* eslint-disable unicorn/prefer-https */
import { test, expect } from '@jest/globals'
import { getLinkMatch } from '../src/parts/GetLinkMatch/GetLinkMatch.ts'

test('getLinkMatch - no link returns null', () => {
  expect(getLinkMatch('hello world')).toBeNull()
})

test('getLinkMatch - http link', () => {
  expect(getLinkMatch('see http://example.com now')).toBe('http://example.com')
})

test('getLinkMatch - https link excludes trailing punctuation', () => {
  expect(getLinkMatch('go to https://example.com!')).toBe('https://example.com')
})

test('getLinkMatch - file link', () => {
  expect(getLinkMatch('open file:///tmp/log.txt please')).toBe('file:///tmp/log.txt')
})

test('getLinkMatch - lvce stack trace link', () => {
  expect(getLinkMatch('at load$1 (lvce://-/537bcf0/packages/renderer-process/dist/rendererProcessMain.js:8726:11)')).toBe(
    'lvce://-/537bcf0/packages/renderer-process/dist/rendererProcessMain.js:8726:11',
  )
})

test('getLinkMatch - lvce oss stack trace link', () => {
  expect(getLinkMatch('at load$1 (lvce-oss://-/packages/renderer-process/dist/rendererProcessMain.js:8726:11)')).toBe(
    'lvce-oss://-/packages/renderer-process/dist/rendererProcessMain.js:8726:11',
  )
})
