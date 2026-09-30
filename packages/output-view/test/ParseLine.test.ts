import { expect, test } from '@jest/globals'
import * as LinePartType from '../src/parts/LinePartType/LinePartType.ts'
import { parseLine } from '../src/parts/ParseLine/ParseLine.ts'

test('parseLine - renders an lvce stack frame as a source link', () => {
  expect(parseLine('    at load$1 (lvce://-/537bcf0/packages/renderer-process/dist/rendererProcessMain.js:8726:11)')).toEqual([
    { type: LinePartType.Text, value: '    at load$1 (' },
    {
      className: 'OutputSourceLink',
      columnNumber: 11,
      label: 'lvce://-/537bcf0/packages/renderer-process/dist/rendererProcessMain.js:8726:11',
      lineNumber: 8726,
      type: LinePartType.Link,
      value: 'lvce://-/537bcf0/packages/renderer-process/dist/rendererProcessMain.js',
    },
    { type: LinePartType.Text, value: ')' },
  ])
})

test('parseLine - renders a file stack frame as a source link', () => {
  expect(parseLine('    at load$1 (file:///tmp/a%20b.js:8726:11)')).toEqual([
    { type: LinePartType.Text, value: '    at load$1 (' },
    {
      className: 'OutputSourceLink',
      columnNumber: 11,
      label: 'file:///tmp/a%20b.js:8726:11',
      lineNumber: 8726,
      type: LinePartType.Link,
      value: 'file:///tmp/a%20b.js',
    },
    { type: LinePartType.Text, value: ')' },
  ])
})

test('parseLine - renders plain file links as source links', () => {
  expect(parseLine('see file:///tmp/a%20b.js')).toEqual([
    { type: LinePartType.Text, value: 'see ' },
    {
      className: 'OutputSourceLink',
      label: 'file:///tmp/a%20b.js',
      type: LinePartType.Link,
      value: 'file:///tmp/a%20b.js',
    },
  ])
})

test('parseLine - keeps ordinary web links as external links', () => {
  expect(parseLine('see https://example.com.')).toEqual([
    { type: LinePartType.Text, value: 'see ' },
    { type: LinePartType.Link, value: 'https://example.com' },
    { type: LinePartType.Text, value: '.' },
  ])
})

test('parseLine - preserves link-looking content as plain text when linkification is disabled', () => {
  expect(parseLine('Starting Dev Containers for file:///workspace/project', false)).toEqual([
    { type: LinePartType.Text, value: 'Starting Dev Containers for file:///workspace/project' },
  ])
})
