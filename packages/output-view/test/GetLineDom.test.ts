import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getLineDom } from '../src/parts/GetLineDom/GetLineDom.ts'
import * as LinePartType from '../src/parts/LinePartType/LinePartType.ts'

test('getLineDom - returns parent div and text node', () => {
  const result = getLineDom([{ type: LinePartType.Text, value: 'hello' }])

  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: 'Line',
    childCount: 1,
  })
  expect(result[1]).toEqual({
    type: 12,
    text: 'hello',
    childCount: 0,
  })
})

test('getLineDom - renders link as anchor node with text', () => {
  const result = getLineDom([
    { type: LinePartType.Text, value: 'see ' },
    { type: LinePartType.Link, value: 'https://example.com' },
  ])
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: 'Line',
    childCount: 3,
  })
  expect(result[1]).toEqual({ type: 12, text: 'see ', childCount: 0 })
  expect(result[2]).toEqual({ type: VirtualDomElements.A, href: 'https://example.com', target: '_blank', rel: 'noopener noreferrer', childCount: 1 })
  expect(result[3]).toEqual({ type: 12, text: 'https://example.com', childCount: 0 })
})

test('getLineDom - highlights filter matches in text parts', () => {
  const result = getLineDom([{ type: LinePartType.Text, value: 'hello hello' }], 'lo')
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: 'Line',
    childCount: 6,
  })
  // Sequence: he + <span>lo</span> + hel + <span>lo</span>
  expect(result[1]).toEqual({ type: 12, text: 'hel', childCount: 0 })
  expect(result[2]).toEqual({ type: VirtualDomElements.Span, className: 'Highlight', childCount: 1 })
  expect(result[3]).toEqual({ type: 12, text: 'lo', childCount: 0 })
  expect(result[4]).toEqual({ type: 12, text: ' hel', childCount: 0 })
  expect(result[5]).toEqual({ type: VirtualDomElements.Span, className: 'Highlight', childCount: 1 })
  expect(result[6]).toEqual({ type: 12, text: 'lo', childCount: 0 })
})
