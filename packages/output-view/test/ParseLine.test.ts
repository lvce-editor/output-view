import { expect, test } from '@jest/globals'
import * as LinePartType from '../src/parts/LinePartType/LinePartType.ts'
import { parseLine } from '../src/parts/ParseLine/ParseLine.ts'

test('parseLine - renders an lvce stack frame as a source link', () => {
  expect(parseLine('    at load$1 (lvce://-/537bcf0/packages/renderer-process/dist/rendererProcessMain.js:8726:11)')).toEqual([
    { type: LinePartType.Text, value: '    at load$1 (' },
    {
      className: 'OutputSourceLink',
      label: 'lvce://-/537bcf0/packages/renderer-process/dist/rendererProcessMain.js:8726:11',
      type: LinePartType.Link,
      value: 'lvce://-/537bcf0/packages/renderer-process/dist/rendererProcessMain.js',
    },
    { type: LinePartType.Text, value: ')' },
  ])
})

test('parseLine - keeps ordinary web links as external links', () => {
  expect(parseLine('see https://example.com.')).toEqual([
    { type: LinePartType.Text, value: 'see ' },
    { type: LinePartType.Link, value: 'https://example.com' },
    { type: LinePartType.Text, value: '.' },
  ])
})
