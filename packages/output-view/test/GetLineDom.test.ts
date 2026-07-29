import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getLineDom } from '../src/parts/GetLineDom/GetLineDom.ts'
import * as LinePartType from '../src/parts/LinePartType/LinePartType.ts'

test('getLineDom - returns parent div and text node', () => {
  const result = getLineDom([{ type: LinePartType.Text, value: 'hello' }])

  expect(result[0]).toEqual({
    childCount: 1,
    className: 'Line',
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    childCount: 0,
    text: 'hello',
    type: 12,
  })
})

test('getLineDom - renders link as anchor node with text', () => {
  const result = getLineDom([
    { type: LinePartType.Text, value: 'see ' },
    { type: LinePartType.Link, value: 'https://example.com' },
  ])
  expect(result[0]).toEqual({
    childCount: 2,
    className: 'Line',
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({ childCount: 0, text: 'see ', type: 12 })
  expect(result[2]).toEqual({ childCount: 1, href: 'https://example.com', rel: 'noopener noreferrer', target: '_blank', type: VirtualDomElements.A })
  expect(result[3]).toEqual({ childCount: 0, text: 'https://example.com', type: 12 })
})

test('getLineDom - renders warning level, repeat count, and shortened source link', () => {
  const result = getLineDom([
    { type: LinePartType.RepeatCount, value: '4' },
    { type: LinePartType.LogLevel, value: 'warning' },
    { type: LinePartType.Text, value: 'cannot execute viewlet command' },
    { type: LinePartType.Text, value: ' ' },
    {
      className: 'OutputSourceLink',
      label: 'rendererWorkerMain.js:4496',
      type: LinePartType.Link,
      value: 'lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:4496',
    },
  ])

  expect(result).toEqual([
    { childCount: 5, className: 'Line warning', type: VirtualDomElements.Div },
    { childCount: 1, className: 'OutputRepeatCount', type: VirtualDomElements.Span },
    { childCount: 0, text: '4', type: 12 },
    { childCount: 0, text: ' ', type: 12 },
    { childCount: 0, text: 'cannot execute viewlet command', type: 12 },
    { childCount: 0, text: ' ', type: 12 },
    {
      childCount: 1,
      className: 'OutputSourceLink',
      href: 'lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:4496',
      rel: 'noopener noreferrer',
      target: '_blank',
      type: VirtualDomElements.A,
    },
    { childCount: 0, text: 'rendererWorkerMain.js:4496', type: 12 },
  ])
})

test('getLineDom - does not render timestamp metadata', () => {
  const result = getLineDom([
    { type: LinePartType.LogLevel, value: 'error' },
    { type: LinePartType.Text, value: 'failed' },
  ])

  expect(result).toEqual([
    { childCount: 1, className: 'Line error', type: VirtualDomElements.Div },
    { childCount: 0, text: 'failed', type: 12 },
  ])
})
